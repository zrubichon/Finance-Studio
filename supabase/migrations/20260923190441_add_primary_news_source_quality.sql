alter table public.news_archive
  drop constraint if exists news_archive_source_quality_check;

alter table public.news_archive
  add constraint news_archive_source_quality_check
  check (source_quality in ('primary','established','external'));
