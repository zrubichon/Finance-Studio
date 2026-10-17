-- Backend-only library: no direct browser reads or writes, no user/profile data.
create table public.shared_ai_backend_config (
 id boolean primary key default true check(id), token_sha256 text not null check(length(token_sha256)=64)
);
create table public.shared_ai_cards (
 cache_key text primary key check(cache_key ~ '^[a-f0-9]{64}$'),
 scope text not null check(scope in ('study','news')),
 status text not null default 'pending' check(status in ('pending','ready')),
 payload jsonb, lease_id uuid not null default gen_random_uuid(),
 lease_until timestamptz not null default (now()+interval '5 minutes'),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check (status <> 'ready' or (payload is not null and jsonb_typeof(payload)='object'))
);
alter table public.shared_ai_cards enable row level security;
alter table public.shared_ai_backend_config enable row level security;
revoke all on public.shared_ai_cards,public.shared_ai_backend_config from public,anon,authenticated;
grant all on public.shared_ai_cards to service_role;
grant select on public.shared_ai_backend_config to service_role;
-- An atomic lease ensures two app instances do not pay for the same generation.
create function public.claim_shared_ai_card(p_key text,p_scope text) returns jsonb
language plpgsql security invoker set search_path = '' as $$
declare r public.shared_ai_cards; token uuid:=gen_random_uuid();
begin
 insert into public.shared_ai_cards(cache_key,scope,lease_id) values(p_key,p_scope,token)
 on conflict(cache_key) do nothing;
 select * into r from public.shared_ai_cards where cache_key=p_key for update;
 if r.scope<>p_scope then raise exception 'scope mismatch'; end if;
 if r.status='ready' then return jsonb_build_object('state','ready','payload',r.payload); end if;
 if r.lease_id=token then return jsonb_build_object('state','owned','lease',token); end if;
 if r.lease_until<now() then
  update public.shared_ai_cards set lease_id=token,lease_until=now()+interval '5 minutes',updated_at=now() where cache_key=p_key;
  return jsonb_build_object('state','owned','lease',token);
 end if;
 return jsonb_build_object('state','pending');
end $$;
revoke all on function public.claim_shared_ai_card(text,text) from public,anon,authenticated;
grant execute on function public.claim_shared_ai_card(text,text) to service_role;
