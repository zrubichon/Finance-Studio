revoke truncate, references, trigger
on table public.paper_portfolio_snapshots,
         public.paper_transactions,
         public.professor_messages,
         public.professor_sessions
from authenticated;

revoke delete
on table public.paper_portfolio_snapshots
from authenticated;

revoke update, delete
on table public.paper_transactions
from authenticated;

revoke update
on table public.professor_messages
from authenticated;

revoke execute
on function public.execute_paper_trade(
  uuid, text, text, text, numeric, numeric, timestamptz, text
)
from anon, public;

grant execute
on function public.execute_paper_trade(
  uuid, text, text, text, numeric, numeric, timestamptz, text
)
to authenticated, service_role;

alter function public.execute_paper_trade(
  uuid, text, text, text, numeric, numeric, timestamptz, text
)
set search_path = '';
