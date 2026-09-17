revoke all privileges on table
  public.profiles,
  public.user_preferences,
  public.course_progress,
  public.concept_mastery,
  public.quiz_attempts,
  public.interview_attempts,
  public.saved_items,
  public.user_activity_days,
  public.paper_portfolios,
  public.paper_positions,
  public.investment_theses
from anon;

revoke all privileges on table
  public.profiles,
  public.user_preferences,
  public.course_progress,
  public.concept_mastery,
  public.quiz_attempts,
  public.interview_attempts,
  public.saved_items,
  public.user_activity_days,
  public.paper_portfolios,
  public.paper_positions,
  public.investment_theses
from authenticated;

grant select, insert, update on table public.profiles to authenticated;
grant select, insert, update on table public.user_preferences to authenticated;
grant select, insert, update, delete on table public.course_progress to authenticated;
grant select, insert, update, delete on table public.concept_mastery to authenticated;
grant select, insert on table public.quiz_attempts to authenticated;
grant select, insert on table public.interview_attempts to authenticated;
grant select, insert, update, delete on table public.saved_items to authenticated;
grant select, insert, update, delete on table public.user_activity_days to authenticated;
grant select, insert, update, delete on table public.paper_portfolios to authenticated;
grant select, insert, update, delete on table public.paper_positions to authenticated;
grant select, insert, update, delete on table public.investment_theses to authenticated;
