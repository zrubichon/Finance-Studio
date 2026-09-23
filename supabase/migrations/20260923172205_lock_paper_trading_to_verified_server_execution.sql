revoke all
on table public.paper_portfolios,
         public.paper_positions,
         public.paper_transactions,
         public.paper_portfolio_snapshots
from anon, authenticated;

grant select
on table public.paper_portfolios,
         public.paper_positions,
         public.paper_transactions,
         public.paper_portfolio_snapshots
to authenticated;

drop policy if exists "portfolio_all_own"
on public.paper_portfolios;

create policy "portfolio_select_own"
on public.paper_portfolios
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "positions_insert_own_portfolio"
on public.paper_positions;
drop policy if exists "positions_update_own_portfolio"
on public.paper_positions;
drop policy if exists "positions_delete_own_portfolio"
on public.paper_positions;

drop policy if exists "paper_transactions_insert_own"
on public.paper_transactions;

drop policy if exists "paper_portfolio_snapshots_insert_own"
on public.paper_portfolio_snapshots;
drop policy if exists "paper_portfolio_snapshots_update_own"
on public.paper_portfolio_snapshots;

drop function if exists public.execute_paper_trade(
  uuid,text,text,text,numeric,numeric,timestamptz,text
);
