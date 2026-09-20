import { NextRequest, NextResponse } from "next/server";
import {
  getInstrumentQuote,
  type InvestableAssetClass,
} from "@/lib/providers/instrument-data";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const requestedId = request.nextUrl.searchParams.get("portfolioId");

  let portfolioQuery = supabase
    .from("paper_portfolios")
    .select("id,name,base_currency,starting_cash,cash_balance,created_at,updated_at")
    .eq("user_id", user.id);

  if (requestedId) {
    portfolioQuery = portfolioQuery.eq("id", requestedId);
  }

  const { data: portfolio } = await portfolioQuery
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!portfolio) {
    return NextResponse.json(
      { error: "Paper portfolio not found." },
      { status: 404 },
    );
  }

  const [positionsResult, transactionsResult, pnlResult] = await Promise.all([
    supabase
      .from("paper_positions")
      .select("id,symbol,asset_class,quantity,average_cost,opened_at,updated_at")
      .eq("portfolio_id", portfolio.id)
      .order("opened_at", { ascending: true }),
    supabase
      .from("paper_transactions")
      .select("id,symbol,asset_class,side,quantity,price,notional,realized_pnl,price_as_of,price_source,created_at")
      .eq("portfolio_id", portfolio.id)
      .order("created_at", { ascending: false })
      .limit(25),
    supabase
      .from("paper_transactions")
      .select("realized_pnl")
      .eq("portfolio_id", portfolio.id),
  ]);

  const rawPositions = positionsResult.data ?? [];

  const pricedPositions = await Promise.all(
    rawPositions.map(async (position) => {
      const quantity = Number(position.quantity);
      const averageCost = Number(position.average_cost);
      const pricing = await getInstrumentQuote(
        position.symbol,
        position.asset_class as InvestableAssetClass,
      );

      if (!pricing.quote) {
        return {
          ...position,
          quantity,
          average_cost: averageCost,
          quote: null,
          current_value: null,
          unrealized_pnl: null,
          provider: pricing.provider,
        };
      }

      const currentValue = quantity * pricing.quote.price;
      const unrealizedPnl = (pricing.quote.price - averageCost) * quantity;

      return {
        ...position,
        quantity,
        average_cost: averageCost,
        quote: pricing.quote,
        current_value: currentValue,
        unrealized_pnl: unrealizedPnl,
        provider: pricing.provider,
      };
    }),
  );

  const fullCoverage = pricedPositions.every(
    (position) => position.quote !== null,
  );

  const marketValue = fullCoverage
    ? pricedPositions.reduce(
        (sum, position) => sum + Number(position.current_value ?? 0),
        0,
      )
    : null;

  const cashBalance = Number(portfolio.cash_balance);
  const startingCash = Number(portfolio.starting_cash);
  const totalEquity = marketValue === null ? null : cashBalance + marketValue;
  const totalPnl = totalEquity === null ? null : totalEquity - startingCash;
  const returnPercent =
    totalPnl === null || startingCash === 0
      ? null
      : (totalPnl / startingCash) * 100;

  const realizedPnl = (pnlResult.data ?? []).reduce(
    (sum, row) => sum + Number(row.realized_pnl ?? 0),
    0,
  );

  return NextResponse.json({
    portfolio: {
      ...portfolio,
      starting_cash: startingCash,
      cash_balance: cashBalance,
    },
    positions: pricedPositions,
    transactions: transactionsResult.data ?? [],
    metrics: {
      fullCoverage,
      pricedPositions: pricedPositions.filter((position) => position.quote).length,
      totalPositions: pricedPositions.length,
      marketValue,
      totalEquity,
      totalPnl,
      returnPercent,
      realizedPnl,
    },
  });
}
