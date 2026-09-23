drop policy if exists "positions_select_own_portfolio"
on public.paper_positions;

create policy "positions_select_own_portfolio"
on public.paper_positions
for select
to authenticated
using (
  exists (
    select 1
    from public.paper_portfolios p
    where p.id = paper_positions.portfolio_id
      and p.user_id = (select auth.uid())
  )
);
