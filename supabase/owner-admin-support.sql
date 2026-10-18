create schema if not exists private;
create table private.finance_site_admins(user_id uuid primary key references auth.users(id) on delete cascade);
alter table private.finance_site_admins enable row level security;
revoke all on private.finance_site_admins from public,anon,authenticated;
insert into private.finance_site_admins(user_id) select id from auth.users where lower(email)='zoe.rubichon@gmail.com' and email_confirmed_at is not null;
create table public.site_issue_reports(id uuid primary key default gen_random_uuid(),user_id uuid references auth.users(id) on delete set null,category text not null,page text not null,message text not null,reply_email text,created_at timestamptz not null default now());
alter table public.site_issue_reports enable row level security;
revoke all on public.site_issue_reports from public,anon,authenticated;
create index site_issue_reports_created_idx on public.site_issue_reports(created_at desc);
create or replace function public.finance_admin_access() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from private.finance_site_admins where user_id=(select auth.uid())); $$;
revoke all on function public.finance_admin_access() from public,anon;
grant execute on function public.finance_admin_access() to authenticated;
create or replace function public.finance_admin_directory(p_search text default '',p_page integer default 0) returns jsonb language plpgsql security definer set search_path='' as $$
declare result jsonb; begin
 if not public.finance_admin_access() then raise insufficient_privilege using message='Administrator access required'; end if;
 select jsonb_build_object('total',(select count(*) from auth.users),'confirmed',(select count(*) from auth.users where email_confirmed_at is not null),'new_this_week',(select count(*) from auth.users where created_at>now()-interval '7 days'),'matching',(select count(*) from auth.users u left join public.profiles p on p.user_id=u.id where coalesce(u.email,'') ilike '%'||left(p_search,120)||'%' or coalesce(p.display_name,'') ilike '%'||left(p_search,120)||'%'),'users',coalesce((select jsonb_agg(row_to_json(r)) from (select u.email,p.display_name,u.created_at,u.last_sign_in_at,(u.email_confirmed_at is not null) as confirmed,p.target_role from auth.users u left join public.profiles p on p.user_id=u.id where coalesce(u.email,'') ilike '%'||left(p_search,120)||'%' or coalesce(p.display_name,'') ilike '%'||left(p_search,120)||'%' order by u.created_at desc limit 50 offset greatest(0,least(p_page,2000))*50) r),'[]'::jsonb),'reports',coalesce((select jsonb_agg(row_to_json(r)) from (select id,category,page,message,reply_email,created_at from public.site_issue_reports order by created_at desc limit 30) r),'[]'::jsonb)) into result;
 return result;
end; $$;
revoke all on function public.finance_admin_directory(text,integer) from public,anon;
grant execute on function public.finance_admin_directory(text,integer) to authenticated;
create or replace function public.submit_site_issue(p_category text,p_page text,p_message text,p_reply_email text default null) returns uuid language plpgsql security definer set search_path='' as $$
declare report_id uuid; begin
 if p_category not in ('display','account','data','learning','ai','other') or length(trim(p_message))<15 or length(p_message)>3000 or left(p_page,1)<>'/' or length(p_page)>240 or coalesce(length(p_reply_email),0)>254 then raise exception 'Invalid report'; end if;
 if (select count(*) from public.site_issue_reports where created_at>now()-interval '1 hour' and user_id is not distinct from auth.uid()) >= (case when auth.uid() is null then 20 else 5 end) then raise exception 'Report limit reached. Please retry later'; end if;
 insert into public.site_issue_reports(user_id,category,page,message,reply_email) values(auth.uid(),p_category,p_page,trim(p_message),nullif(p_reply_email,'')) returning id into report_id; return report_id;
end; $$;
revoke all on function public.submit_site_issue(text,text,text,text) from public;
grant execute on function public.submit_site_issue(text,text,text,text) to anon,authenticated;
