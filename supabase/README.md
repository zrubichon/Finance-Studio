# FinanceStudio Supabase

This folder contains the database foundation for accounts, preferences, learning progress, interview attempts and the virtual investing lab.

## Core migration

`migrations/0001_finance_studio_core.sql` creates:

- `profiles`
- `user_preferences`
- `course_progress`
- `concept_mastery`
- `quiz_attempts`
- `interview_attempts`
- `saved_items`
- `user_activity_days`
- `paper_portfolios`
- `paper_positions`
- `investment_theses`

Row Level Security is enabled on every user-owned table. Policies restrict access to the authenticated user, including portfolio-position access through portfolio ownership.

A signup trigger creates a profile, preferences row and default paper portfolio for every new authenticated user.

## Application environment

The app expects:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Use the modern publishable key rather than committing any secret service-role key. Environment values belong in local/Vercel environment configuration, never in Git.

## Release rule

After applying a migration, run Supabase security and performance advisors, then run the GitHub typecheck/build workflow before considering the change ready.
