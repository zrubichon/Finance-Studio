-- Atomic paper-trading ledger and cash accounting.
-- Applied to production as migration add_atomic_paper_trading.

alter table public.paper_portfolios
  add column if not exists cash_balance numeric;

update public.paper_portfolios
set cash_balance = starting_cash
where cash_balance is null;

alter table public.paper_portfolios
  alter column cash_balance set default 100000,
  alter column cash_balance set not null;

create unique index if not exists paper_positions_portfolio_symbol_asset_uidx
  on public.paper_positions(portfolio_id, upper(symbol), asset_class);

create table if not exists public.paper_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  portfolio_id uuid not null references public.paper_portfolios(id) on delete cascade,
  symbol text not null,
  asset_class text not null check (asset_class = any (array['equity','etf','bond','fx','commodity','crypto','option','cash']::text[])),
  side text not null check (side in ('buy','sell')),
  quantity numeric not null check (quantity > 0),
  price numeric not null check (price > 0),
  notional numeric not null check (notional > 0),
  realized_pnl numeric not null default 0,
  price_as_of timestamptz not null,
  price_source text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_paper_transactions_user_created
  on public.paper_transactions(user_id, created_at desc);

create index if not exists idx_paper_transactions_portfolio_created
  on public.paper_transactions(portfolio_id, created_at desc);

alter table public.paper_transactions enable row level security;

revoke all on table public.paper_transactions from anon;
grant select, insert on table public.paper_transactions to authenticated;

create policy "paper_transactions_select_own"
on public.paper_transactions for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "paper_transactions_insert_own"
on public.paper_transactions for insert
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

create or replace function public.execute_paper_trade(
  p_portfolio_id uuid,
  p_symbol text,
  p_asset_class text,
  p_side text,
  p_quantity numeric,
  p_price numeric,
  p_price_as_of timestamptz,
  p_price_source text
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_portfolio public.paper_portfolios%rowtype;
  v_position public.paper_positions%rowtype;
  v_has_position boolean := false;
  v_notional numeric;
  v_new_quantity numeric;
  v_new_average numeric;
  v_realized numeric := 0;
  v_transaction_id uuid;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;

  p_symbol := upper(trim(p_symbol));
  p_asset_class := lower(trim(p_asset_class));
  p_side := lower(trim(p_side));

  if p_symbol = '' then raise exception 'INVALID_SYMBOL'; end if;
  if p_side not in ('buy','sell') then raise exception 'INVALID_SIDE'; end if;
  if p_asset_class not in ('equity','etf','bond','fx','commodity','crypto','option','cash') then
    raise exception 'INVALID_ASSET_CLASS';
  end if;
  if p_quantity is null or p_quantity <= 0 or p_price is null or p_price <= 0 then
    raise exception 'INVALID_TRADE';
  end if;

  select * into v_portfolio
  from public.paper_portfolios
  where id = p_portfolio_id and user_id = v_uid
  for update;

  if not found then raise exception 'PORTFOLIO_NOT_FOUND'; end if;

  v_notional := round(p_quantity * p_price, 8);

  select * into v_position
  from public.paper_positions
  where portfolio_id = p_portfolio_id
    and upper(symbol) = p_symbol
    and asset_class = p_asset_class
  for update;

  v_has_position := found;

  if p_side = 'buy' then
    if v_portfolio.cash_balance < v_notional then
      raise exception 'INSUFFICIENT_CASH';
    end if;

    if v_has_position then
      v_new_quantity := v_position.quantity + p_quantity;
      v_new_average := ((v_position.quantity * coalesce(v_position.average_cost, 0)) + v_notional) / v_new_quantity;

      update public.paper_positions
      set quantity = v_new_quantity,
          average_cost = v_new_average,
          updated_at = now()
      where id = v_position.id;
    else
      insert into public.paper_positions (
        portfolio_id, symbol, asset_class, quantity, average_cost
      ) values (
        p_portfolio_id, p_symbol, p_asset_class, p_quantity, p_price
      );
    end if;

    update public.paper_portfolios
    set cash_balance = cash_balance - v_notional,
        updated_at = now()
    where id = p_portfolio_id;
  else
    if not v_has_position or v_position.quantity < p_quantity then
      raise exception 'INSUFFICIENT_POSITION';
    end if;

    v_realized := round((p_price - coalesce(v_position.average_cost, p_price)) * p_quantity, 8);
    v_new_quantity := v_position.quantity - p_quantity;

    if v_new_quantity = 0 then
      delete from public.paper_positions where id = v_position.id;
    else
      update public.paper_positions
      set quantity = v_new_quantity,
          updated_at = now()
      where id = v_position.id;
    end if;

    update public.paper_portfolios
    set cash_balance = cash_balance + v_notional,
        updated_at = now()
    where id = p_portfolio_id;
  end if;

  insert into public.paper_transactions (
    user_id, portfolio_id, symbol, asset_class, side, quantity, price, notional,
    realized_pnl, price_as_of, price_source
  ) values (
    v_uid, p_portfolio_id, p_symbol, p_asset_class, p_side, p_quantity, p_price,
    v_notional, v_realized, p_price_as_of, p_price_source
  )
  returning id into v_transaction_id;

  return jsonb_build_object(
    'transaction_id', v_transaction_id,
    'symbol', p_symbol,
    'side', p_side,
    'quantity', p_quantity,
    'price', p_price,
    'notional', v_notional,
    'realized_pnl', v_realized
  );
end;
$$;

revoke all on function public.execute_paper_trade(uuid,text,text,text,numeric,numeric,timestamptz,text) from public;
grant execute on function public.execute_paper_trade(uuid,text,text,text,numeric,numeric,timestamptz,text) to authenticated;
