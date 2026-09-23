create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
declare
  selected_language text;
begin
  selected_language := case
    when lower(coalesce(new.raw_user_meta_data ->> 'preferred_language', '')) = 'fr' then 'fr'
    else 'en'
  end;

  insert into public.profiles (user_id, display_name, preferred_language)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', pg_catalog.split_part(new.email, '@', 1)),
    selected_language
  )
  on conflict (user_id) do nothing;

  insert into public.user_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.paper_portfolios (user_id, name)
  values (new.id, 'Main Portfolio');

  return new;
end;
$function$;
