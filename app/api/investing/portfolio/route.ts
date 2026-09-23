import { NextRequest, NextResponse } from "next/server";
import {
  getInstrumentQuote,
  type InvestableAssetClass,
} from "@/lib/providers/instrument-data";
import { createClient } from "@/lib/supabase/server";
import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const [
    {
      data: { user },
    },
    {
      data: { session },
    },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.auth.getSession(),
  ]);

  if (!user || !session?.access_token) {
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

  let { data: portfolio } = await portfolioQuery
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!portfolio) {
    const ensureResponse = await fetch(
      `${SUPABASE_URL}/functions/v1/paper-trade`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "ensure_portfolio" }),
        cache: "no-store",
      },
    );

    if (!ensureResponse.ok) {
      const ensurePayload = await ensureResponse.json().catch(() => null);
      return NextResponse.json(
        {
          error:
            ensurePayload?.error ||
            "Paper portfolio could not be initialized securely.",
          code:
            ensurePayload?.code || "PORTFOLIO_INITIALIZATION_FAILED",
        },
        { status: ensureResponse.status },
      );
    }

    const { data: ensuredPortfolio } = await supabase
      .from("paper_portfolios")
      .select(
        "id,name,base_currency,starting_cash,cash_balance,created_at,updated_at",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!ensuredPortfolio) {
      return NextResponse.json(
        {
          error: "Paper portfolio could not be initialized securely.",
          code: "PORTFOLIO_INITIALIZATION_FAILED",
        },
        { status: 500 },
      );
    }

    portfolio = ensuredPortfolio;
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
          valuation_status: "unpriced" as const,
          provider: pricing.provider,
        };
      }

      if (
        pricing.quote.currency &&
        pricing.quote.currency !== portfolio.base_currency
      ) {
        return {
          ...position,
          quantity,
          average_cost: averageCost,
          quote: pricing.quote,
          current_value: null,
          unrealized_pnl: null,
          valuation_status: "currency_mismatch" as const,
          provider: {
            ...pricing.provider,
            status: "unsupported",
            message:
              `Quote currency ${pricing.quote.currency} does not match portfolio base currency ${portfolio.base_currency}.`,
          },
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
        valuation_status: "priced" as const,
        provider: pricing.provider,
      };
    }),
  );

  const fullCoverage = pricedPositions.every(
    (position) => position.valuation_status === "priced",
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

  if (
    fullCoverage &&
    marketValue !== null &&
    totalEquity !== null &&
    totalPnl !== null &&
    returnPercent !== null
  ) {
    await fetch(`${SUPABASE_URL}/functions/v1/paper-trade`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "refresh_snapshot",
        portfolioId: portfolio.id,
      }),
      cache: "no-store",
    }).catch(() => null);
  }

  const { data: historyRows } = await supabase
    .from("paper_portfolio_snapshots")
    .select("snapshot_date,cash_balance,market_value,total_equity,total_pnl,return_percent,priced_positions,total_positions")
    .eq("portfolio_id", portfolio.id)
    .order("snapshot_date", { ascending: false })
    .limit(30);

  const history = (historyRows ?? [])
    .map((row) => ({
      snapshot_date: row.snapshot_date,
      cash_balance: Number(row.cash_balance),
      market_value: Number(row.market_value),
      total_equity: Number(row.total_equity),
      total_pnl: Number(row.total_pnl),
      return_percent: Number(row.return_percent),
      priced_positions: Number(row.priced_positions ?? 0),
      total_positions: Number(row.total_positions ?? 0),
    }))
    .reverse();

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
      pricedPositions: pricedPositions.filter(
        (position) => position.valuation_status === "priced",
      ).length,
      totalPositions: pricedPositions.length,
      marketValue,
      totalEquity,
      totalPnl,
      returnPercent,
      realizedPnl,
    },
    history,
    attribution: (() => {
      const bySymbol = new Map<
        string,
        {
          symbol: string;
          assetClass: string;
          realizedPnl: number;
          unrealizedPnl: number;
          currentValue: number | null;
          contributionPercent: number | null;
          valuationStatus: string;
        }
      >();

      for (const transaction of transactionsResult.data ?? []) {
        const key = `${transaction.symbol}::${transaction.asset_class}`;
        const current = bySymbol.get(key) ?? {
          symbol: transaction.symbol,
          assetClass: transaction.asset_class,
          realizedPnl: 0,
          unrealizedPnl: 0,
          currentValue: null,
          contributionPercent: null,
          valuationStatus: "closed",
        };
        current.realizedPnl += Number(transaction.realized_pnl ?? 0);
        bySymbol.set(key, current);
      }

      for (const position of pricedPositions) {
        const key = `${position.symbol}::${position.asset_class}`;
        const current = bySymbol.get(key) ?? {
          symbol: position.symbol,
          assetClass: position.asset_class,
          realizedPnl: 0,
          unrealizedPnl: 0,
          currentValue: null,
          contributionPercent: null,
          valuationStatus: position.valuation_status,
        };

        current.unrealizedPnl = Number(position.unrealized_pnl ?? 0);
        current.currentValue =
          position.current_value === null
            ? null
            : Number(position.current_value);
        current.valuationStatus = position.valuation_status;
        bySymbol.set(key, current);
      }

      return [...bySymbol.values()]
        .map((item) => {
          const pnl = item.realizedPnl + item.unrealizedPnl;
          return {
            ...item,
            totalPnl: pnl,
            contributionPercent:
              startingCash === 0 ? null : (pnl / startingCash) * 100,
          };
        })
        .sort((a, b) => Math.abs(b.totalPnl) - Math.abs(a.totalPnl));
    })(),
  });
}
