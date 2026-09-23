do $$
declare
  current_schema text;
begin
  select n.nspname
  into current_schema
  from pg_extension e
  join pg_namespace n on n.oid=e.extnamespace
  where e.extname='pg_net';

  if current_schema = 'public' then
    create schema if not exists extensions;
    drop extension pg_net;
    create extension pg_net with schema extensions;
  end if;
end
$$;

drop policy if exists "news_ingestion_runs_no_public_access"
on public.news_ingestion_runs;

create policy "news_ingestion_runs_no_public_access"
on public.news_ingestion_runs
for all
to anon, authenticated
using (false)
with check (false);
