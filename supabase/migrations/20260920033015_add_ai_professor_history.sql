-- Persist AI Professor tutoring sessions and messages.
-- Applied to production as migration 20260920033015 add_ai_professor_history.

create table if not exists public.professor_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text,
  mode text not null default 'Beginner' check (mode in ('Beginner','Intermediate','Professional')),
  language text not null default 'EN' check (language in ('EN','FR')),
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.professor_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.professor_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null check (char_length(content) between 1 and 12000),
  model text,
  created_at timestamptz not null default now()
);

create index if not exists idx_professor_sessions_user_updated
  on public.professor_sessions(user_id, updated_at desc);

create index if not exists idx_professor_messages_session_created
  on public.professor_messages(session_id, created_at);

create index if not exists idx_professor_messages_user
  on public.professor_messages(user_id);

alter table public.professor_sessions enable row level security;
alter table public.professor_messages enable row level security;

revoke all on table public.professor_sessions from anon;
revoke all on table public.professor_messages from anon;
grant select, insert, update, delete on table public.professor_sessions to authenticated;
grant select, insert, update, delete on table public.professor_messages to authenticated;

create policy "professor_sessions_select_own"
on public.professor_sessions for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "professor_sessions_insert_own"
on public.professor_sessions for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "professor_sessions_update_own"
on public.professor_sessions for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "professor_sessions_delete_own"
on public.professor_sessions for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "professor_messages_select_own"
on public.professor_messages for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "professor_messages_insert_own"
on public.professor_messages for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.professor_sessions s
    where s.id = session_id
      and s.user_id = (select auth.uid())
  )
);

create policy "professor_messages_delete_own"
on public.professor_messages for delete
to authenticated
using ((select auth.uid()) = user_id);
