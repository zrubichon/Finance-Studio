create or replace function public.execute_verified_paper_trade(
  p_user_id uuid,
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
set search_path = ''
as $function$
declare
  v_portfolio public.paper_portfolios%rowtype;
  v_position public.paper_positions%rowtype;
  v_has_position boolean := false;
  v_notional numeric;
  v_new_quantity numeric;
  v_new_average numeric;
  v_realized numeric := 0;
  v_transaction_id uuid;
begin
  if current_user <> 'service_role' then
    raise exception 'SERVICE_ROLE_REQUIRED';
  end if;

  if p_user_id is null then
    raise exception 'USER_REQUIRED';
  end if;

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

  select *
  into v_portfolio
  from public.paper_portfolios
  where id = p_portfolio_id
    and user_id = p_user_id
  for update;

  if not found then
    raise exception 'PORTFOLIO_NOT_FOUND';
  end if;

  v_notional := round(p_quantity * p_price, 8);

  select *
  into v_position
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
      v_new_average :=
        ((v_position.quantity * coalesce(v_position.average_cost, 0)) + v_notional)
        / v_new_quantity;

      update public.paper_positions
      set quantity = v_new_quantity,
          average_cost = v_new_average,
          updated_at = now()
      where id = v_position.id;
    else
      insert into public.paper_positions (
        portfolio_id,
        symbol,
        asset_class,
        quantity,
        average_cost
      ) values (
        p_portfolio_id,
        p_symbol,
        p_asset_class,
        p_quantity,
        p_price
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

    v_realized := round(
      (p_price - coalesce(v_position.average_cost, p_price)) * p_quantity,
      8
    );
    v_new_quantity := v_position.quantity - p_quantity;

    if v_new_quantity = 0 then
      delete from public.paper_positions
      where id = v_position.id;
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
    user_id,
    portfolio_id,
    symbol,
    asset_class,
    side,
    quantity,
    price,
    notional,
    realized_pnl,
    price_as_of,
    price_source
  ) values (
    p_user_id,
    p_portfolio_id,
    p_symbol,
    p_asset_class,
    p_side,
    p_quantity,
    p_price,
    v_notional,
    v_realized,
    p_price_as_of,
    p_price_source
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
$function$;

revoke all on function public.execute_verified_paper_trade(
  uuid,uuid,text,text,text,numeric,numeric,timestamptz,text
) from public, anon, authenticated;

grant execute on function public.execute_verified_paper_trade(
  uuid,uuid,text,text,text,numeric,numeric,timestamptz,text
) to service_role;
