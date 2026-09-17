-- Supabase advisor remediation: avoid per-row auth.uid() re-evaluation and cover portfolio FK.

create index if not exists idx_investment_theses_portfolio on public.investment_theses(portfolio_id);

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using ((select auth.uid()) = user_id);
create policy "profiles_insert_own" on public.profiles for insert with check ((select auth.uid()) = user_id);
create policy "profiles_update_own" on public.profiles for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "preferences_all_own" on public.user_preferences;
create policy "preferences_all_own" on public.user_preferences for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "course_progress_all_own" on public.course_progress;
create policy "course_progress_all_own" on public.course_progress for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "concept_mastery_all_own" on public.concept_mastery;
create policy "concept_mastery_all_own" on public.concept_mastery for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "quiz_attempts_all_own" on public.quiz_attempts;
create policy "quiz_attempts_all_own" on public.quiz_attempts for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "interview_attempts_all_own" on public.interview_attempts;
create policy "interview_attempts_all_own" on public.interview_attempts for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "saved_items_all_own" on public.saved_items;
create policy "saved_items_all_own" on public.saved_items for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "activity_all_own" on public.user_activity_days;
create policy "activity_all_own" on public.user_activity_days for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "portfolio_all_own" on public.paper_portfolios;
create policy "portfolio_all_own" on public.paper_portfolios for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "theses_all_own" on public.investment_theses;
create policy "theses_all_own" on public.investment_theses for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "positions_select_own_portfolio" on public.paper_positions;
drop policy if exists "positions_insert_own_portfolio" on public.paper_positions;
drop policy if exists "positions_update_own_portfolio" on public.paper_positions;
drop policy if exists "positions_delete_own_portfolio" on public.paper_positions;

create policy "positions_select_own_portfolio" on public.paper_positions
for select using (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())
));

create policy "positions_insert_own_portfolio" on public.paper_positions
for insert with check (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())
));

create policy "positions_update_own_portfolio" on public.paper_positions
for update using (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())
)) with check (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())
));

create policy "positions_delete_own_portfolio" on public.paper_positions
for delete using (exists (
  select 1 from public.paper_portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())
));
