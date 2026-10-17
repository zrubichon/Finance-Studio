create table public.learner_settings (
 user_id uuid primary key references auth.users(id) on delete cascade,
 goal text not null check (goal in ('foundations','markets','interviews')),
 daily_minutes integer not null check (daily_minutes in (10,20,30)),
 target_role text not null, explanation_level text not null check(explanation_level in ('beginner','intermediate','professional')),
 updated_at timestamptz not null default now()
);
alter table public.learner_settings enable row level security;
revoke all on public.learner_settings from anon;
grant select,insert,update on public.learner_settings to authenticated;
create policy own_settings_read on public.learner_settings for select to authenticated using ((select auth.uid())=user_id);
create policy own_settings_insert on public.learner_settings for insert to authenticated with check ((select auth.uid())=user_id);
create policy own_settings_update on public.learner_settings for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create or replace function public.record_learning_result(p_concept_key text,p_correct boolean)
returns jsonb language plpgsql security invoker set search_path=public as $$
declare r public.concept_mastery; new_score integer;
begin
 if auth.uid() is null or length(p_concept_key)>240 or length(p_concept_key)<1 then raise exception 'Invalid learning result'; end if;
 insert into public.concept_mastery(user_id,concept_key,mastery_score,attempts,last_reviewed_at,next_review_at,updated_at)
 values(auth.uid(),p_concept_key,case when p_correct then 100 else 0 end,1,now(),now()+case when p_correct then interval '7 days' else interval '1 day' end,now())
 on conflict(user_id,concept_key) do update set
 mastery_score=round(concept_mastery.mastery_score*0.6+(case when p_correct then 100 else 0 end)*0.4),
 attempts=concept_mastery.attempts+1,last_reviewed_at=now(),updated_at=now(),
 next_review_at=now()+case when not p_correct then interval '1 day' when concept_mastery.mastery_score>=80 then interval '14 days' when concept_mastery.mastery_score>=50 then interval '7 days' else interval '2 days' end
 returning * into r;
 return jsonb_build_object('concept_key',r.concept_key,'mastery_score',r.mastery_score,'attempts',r.attempts,'next_review_at',r.next_review_at);
end; $$;
revoke all on function public.record_learning_result(text,boolean) from public,anon;
grant execute on function public.record_learning_result(text,boolean) to authenticated;
