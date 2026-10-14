import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const { data: portfolio, error: portfolioError } = await supabase
    .from("paper_portfolios")
    .select("id,starting_cash")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (portfolioError) return NextResponse.json({ error: "Could not load your paper portfolio." }, { status: 500 });
  if (!portfolio) return NextResponse.json({ ok: true, reset: false });

  const portfolioId = portfolio.id;
  const startingCash = Number(portfolio.starting_cash);

  const results = await Promise.all([
    supabase.from("paper_transactions").delete().eq("portfolio_id", portfolioId),
    supabase.from("paper_positions").delete().eq("portfolio_id", portfolioId),
    supabase.from("paper_portfolio_snapshots").delete().eq("portfolio_id", portfolioId),
    supabase.from("investment_theses").delete().eq("user_id", user.id),
  ]);

  const firstError = results.find((result) => result.error)?.error;
  if (firstError) {
    return NextResponse.json({ error: "The simulation could not be fully reset. Nothing was faked or overwritten after the failure." }, { status: 500 });
  }

  const { error: resetError } = await supabase
    .from("paper_portfolios")
    .update({ cash_balance: startingCash, updated_at: new Date().toISOString() })
    .eq("id", portfolioId)
    .eq("user_id", user.id);

  if (resetError) return NextResponse.json({ error: "Positions were cleared, but virtual cash could not be reset." }, { status: 500 });

  return NextResponse.json({ ok: true, reset: true, startingCash });
}
