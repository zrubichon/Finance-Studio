// Supabase's publishable key is designed for browser use. Row-level security,
// not the publishable key itself, protects private user data. Environment
// variables take priority so preview/production projects can diverge later.

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://dvlyugrardcryqegtwfn.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_xD1hDfBtoPDyNZVL9nfqZw_Wh6RzEZC";
