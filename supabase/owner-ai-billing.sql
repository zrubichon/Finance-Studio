create table private.ai_credit_snapshots (
  hour_slot timestamptz primary key,
  observed_at timestamptz not null,
  balance_usd numeric(20,8) not null,
  total_used_usd numeric(20,8) not null check (total_used_usd >= 0)
);
alter table private.ai_credit_snapshots enable row level security;
revoke all on private.ai_credit_snapshots from public, anon, authenticated;
grant usage on schema private to service_role;
grant select, insert, update on private.ai_credit_snapshots to service_role;

create or replace function public.finance_record_ai_snapshot(p_balance numeric, p_total_used numeric)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare observed timestamptz := now();
begin
  if p_balance is null or p_total_used is null or p_balance::text in ('NaN','Infinity','-Infinity') or
     p_total_used::text in ('NaN','Infinity','-Infinity') or p_total_used < 0 or
     abs(p_balance) > 1000000000 or p_total_used > 1000000000 then
    raise exception 'Invalid credit values';
  end if;
  insert into private.ai_credit_snapshots(hour_slot, observed_at, balance_usd, total_used_usd)
  values(date_trunc('hour', observed), observed, p_balance, p_total_used)
  on conflict(hour_slot) do update set observed_at=excluded.observed_at,
    balance_usd=excluded.balance_usd, total_used_usd=excluded.total_used_usd;
  return jsonb_build_object('observedAt', observed, 'balance', p_balance, 'totalUsed', p_total_used);
end; $$;
revoke all on function public.finance_record_ai_snapshot(numeric,numeric) from public, anon, authenticated;
grant execute on function public.finance_record_ai_snapshot(numeric,numeric) to service_role;

create or replace function public.finance_admin_ai_history()
returns jsonb language plpgsql stable security definer set search_path='' as $$
begin
  if not public.finance_admin_access() or auth.uid() <> 'b60fe531-9163-4b79-874c-b2910d99ac6e'::uuid then
    raise insufficient_privilege using message='Administrator access required';
  end if;
  return coalesce((select jsonb_agg(jsonb_build_object('observedAt',observed_at,
    'balance',balance_usd,'totalUsed',total_used_usd) order by observed_at)
    from private.ai_credit_snapshots where observed_at > now()-interval '90 days'), '[]'::jsonb);
end; $$;
revoke all on function public.finance_admin_ai_history() from public, anon;
grant execute on function public.finance_admin_ai_history() to authenticated;
