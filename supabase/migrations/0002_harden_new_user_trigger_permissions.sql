-- Prevent API callers from invoking the auth trigger function directly.
-- The trigger on auth.users can still execute it when a user is created.

revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;
