create extension if not exists pg_net;
create extension if not exists pg_cron;

create table if not exists public.news_archive (
  id uuid primary key default gen_random_uuid(),
  url text not null unique,
  title text not null,
  domain text not null default '',
  source_country text not null default '',
  source_language text not null default '',
  image_url text,
  source_quality text not null check (source_quality in ('established','external')),
  topics text[] not null default '{}',
  provider text not null default 'gdelt',
  source_seen_at timestamptz not null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news_archive enable row level security;

revoke all on table public.news_archive from anon, authenticated;
grant select on table public.news_archive to anon, authenticated;

drop policy if exists "news_archive_public_read" on public.news_archive;
create policy "news_archive_public_read"
on public.news_archive
for select
to anon, authenticated
using (true);

create index if not exists news_archive_source_seen_at_idx
  on public.news_archive (source_seen_at desc);

create index if not exists news_archive_topics_gin_idx
  on public.news_archive using gin (topics);

create table if not exists public.news_ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  status text not null check (status in ('success','error')),
  fetched_count integer not null default 0,
  archived_count integer not null default 0,
  error_message text,
  created_at timestamptz not null default now()
);

alter table public.news_ingestion_runs enable row level security;
revoke all on table public.news_ingestion_runs from anon, authenticated;

do $$
begin
  if not exists (
    select 1 from vault.secrets
    where name = 'financestudio_news_ingest_cron'
  ) then
    perform vault.create_secret(
      encode(extensions.gen_random_bytes(32), 'hex'),
      'financestudio_news_ingest_cron',
      'FinanceStudio private token used only by Supabase Cron to invoke news-ingest'
    );
  end if;
end
$$;

create or replace function public.verify_news_ingest_secret(p_secret text)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from vault.decrypted_secrets
    where name = 'financestudio_news_ingest_cron'
      and decrypted_secret = p_secret
  );
$$;

revoke all on function public.verify_news_ingest_secret(text)
from public, anon, authenticated;

grant execute on function public.verify_news_ingest_secret(text)
to service_role;

select cron.schedule(
  'financestudio-news-ingest-hourly',
  '7 * * * *',
  $cron$
    select net.http_post(
      url := 'https://dvlyugrardcryqegtwfn.supabase.co/functions/v1/news-ingest',
      headers := jsonb_build_object(
        'Content-Type','application/json',
        'x-financestudio-cron-secret',
        (select decrypted_secret
         from vault.decrypted_secrets
         where name='financestudio_news_ingest_cron'
         limit 1)
      ),
      body := jsonb_build_object(
        'source','supabase-cron',
        'scheduled_at',now()
      ),
      timeout_milliseconds := 30000
    ) as request_id;
  $cron$
);
