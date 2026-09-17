-- FinanceStudio core data model
-- Designed for Supabase Postgres + Auth.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'en' check (preferred_language in ('en','fr')),
  explanation_level text not null default 'beginner' check (explanation_level in ('beginner','intermediate','professional')),
  target_role text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'classic' check (theme in ('classic','girl','terminal')),
  accent_color text,
  card_radius integer not null default 22 check (card_radius between 0 and 40),
  market_regions text[] not null default array['global','usa','europe']::text[],
  dashboard_modules jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  status text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  last_opened_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_slug)
);

create table if not exists public.concept_mastery (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  concept_key text not null,
  mastery_score integer not null default 0 check (mastery_score between 0 and 100),
  attempts integer not null default 0 check (attempts >= 0),
  last_reviewed_at timestamptz,
  next_review_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, concept_key)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_key text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0 and score <= total),
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.interview_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null,
  question_key text not null,
  answer_text text,
  evaluation jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('lesson','concept','news','career','interview_question','market')),
  item_key text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_key)
);

create table if not exists public.user_activity_days (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  activity_count integer not null default 1 check (activity_count > 0),
  primary key (user_id, activity_date)
);

create table if not exists public.paper_portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Main Portfolio',
  base_currency text not null default 'USD',
  starting_cash numeric(18,2) not null default 100000,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.paper_positions (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.paper_portfolios(id) on delete cascade,
  symbol text not null,
  asset_class text not null check (asset_class in ('equity','etf','bond','fx','commodity','crypto','option','cash')),
  quantity numeric(24,8) not null,
  average_cost numeric(24,8),
  opened_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (portfolio_id, symbol, asset_class)
);

create table if not exists public.investment_theses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  portfolio_id uuid references public.paper_portfolios(id) on delete cascade,
  symbol text not null,
  thesis text not null,
  valuation_or_macro_assumption text,
  catalyst text,
  time_horizon text,
  invalidation_condition text,
  downside_case text,
  portfolio_risk_note text,
  review_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_course_progress_user on public.course_progress(user_id);
create index if not exists idx_mastery_user on public.concept_mastery(user_id);
create index if not exists idx_quiz_user_created on public.quiz_attempts(user_id, created_at desc);
create index if not exists idx_interview_user_created on public.interview_attempts(user_id, created_at desc);
create index if not exists idx_saved_user_type on public.saved_items(user_id, item_type);
create index if not exists idx_portfolio_user on public.paper_portfolios(user_id);
create index if not exists idx_thesis_user on public.investment_theses(user_id);

alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.course_progress enable row level security;
alter table public.concept_mastery enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.interview_attempts enable row level security;
alter table public.saved_items enable row level security;
alter table public.user_activity_days enable row level security;
alter table public.paper_portfolios enable row level security;
alter table public.paper_positions enable row level security;
alter table public.investment_theses enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = user_id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "preferences_all_own" on public.user_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "course_progress_all_own" on public.course_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "concept_mastery_all_own" on public.concept_mastery for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "quiz_attempts_all_own" on public.quiz_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "interview_attempts_all_own" on public.interview_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "saved_items_all_own" on public.saved_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "activity_all_own" on public.user_activity_days for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "portfolio_all_own" on public.paper_portfolios for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "theses_all_own" on public.investment_theses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "positions_select_own_portfolio" on public.paper_positions
for select using (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = auth.uid()
));

create policy "positions_insert_own_portfolio" on public.paper_positions
for insert with check (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = auth.uid()
));

create policy "positions_update_own_portfolio" on public.paper_positions
for update using (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = auth.uid()
)) with check (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = auth.uid()
));

create policy "positions_delete_own_portfolio" on public.paper_positions
for delete using (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = auth.uid()
));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)))
  on conflict (user_id) do nothing;

  insert into public.user_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.paper_portfolios (user_id, name)
  values (new.id, 'Main Portfolio');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
