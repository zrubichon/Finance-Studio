-- Daily snapshots for paper-portfolio performance history.
-- Applied to production as migration add_paper_portfolio_snapshots.

create table if not exists public.paper_portfolio_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  portfolio_id uuid not null references public.paper_portfolios(id) on delete cascade,
  snapshot_date date not null,
  cash_balance numeric not null,
  market_value numeric not null,
  total_equity numeric not null,
  total_pnl numeric not null,
  return_percent numeric not null,
  priced_positions integer not null default 0,
  total_positions integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (portfolio_id, snapshot_date)
);

create index if not exists idx_paper_portfolio_snapshots_user_date
  on public.paper_portfolio_snapshots(user_id, snapshot_date desc);

create index if not exists idx_paper_portfolio_snapshots_portfolio_date
  on public.paper_portfolio_snapshots(portfolio_id, snapshot_date desc);

alter table public.paper_portfolio_snapshots enable row level security;

revoke all on table public.paper_portfolio_snapshots from anon;
grant select, insert, update on table public.paper_portfolio_snapshots to authenticated;

create policy "paper_portfolio_snapshots_select_own"
on public.paper_portfolio_snapshots for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "paper_portfolio_snapshots_insert_own"
on public.paper_portfolio_snapshots for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1
    from public.paper_portfolios p
    where p.id = portfolio_id
      and p.user_id = (select auth.uid())
  )
);

create policy "paper_portfolio_snapshots_update_own"
on public.paper_portfolio_snapshots for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
