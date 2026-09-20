import { NextRequest, NextResponse } from "next/server";
import {
  getInstrumentQuote,
  isQuoteFreshEnoughForPaperTrade,
  quoteAgeHours,
  type InvestableAssetClass,
} from "@/lib/providers/instrument-data";
import { createClient } from "@/lib/supabase/server";

type Side = "buy" | "sell";

const assetClasses = new Set<InvestableAssetClass>([
  "equity",
  "etf",
  "bond",
  "fx",
  "commodity",
  "crypto",
  "option",
]);

function cleanSymbol(value: unknown) {
  return typeof value === "string"
    ? value.trim().toUpperCase().slice(0, 32)
    : "";
}

function errorStatus(message: string) {
  if (message.includes("INSUFFICIENT_CASH")) return 409;
  if (message.includes("INSUFFICIENT_POSITION")) return 409;
  if (message.includes("PORTFOLIO_NOT_FOUND")) return 404;
  if (message.includes("AUTH_REQUIRED")) return 401;
  return 400;
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    portfolioId?: unknown;
    symbol?: unknown;
    assetClass?: unknown;
    side?: unknown;
    quantity?: unknown;
  } | null;

  const portfolioId =
    typeof body?.portfolioId === "string" ? body.portfolioId.trim() : "";
  const symbol = cleanSymbol(body?.symbol);
  const assetClass = body?.assetClass as InvestableAssetClass | undefined;
  const side = body?.side as Side | undefined;
  const quantity = Number(body?.quantity);

  if (
    !portfolioId ||
    !symbol ||
    !assetClass ||
    !assetClasses.has(assetClass) ||
    (side !== "buy" && side !== "sell") ||
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    return NextResponse.json(
      { error: "Invalid paper trade request." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { data: portfolio } = await supabase
    .from("paper_portfolios")
    .select("id")
    .eq("id", portfolioId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!portfolio) {
    return NextResponse.json(
      { error: "Paper portfolio not found." },
      { status: 404 },
    );
  }

  const pricing = await getInstrumentQuote(symbol, assetClass);

  if (!pricing.quote) {
    return NextResponse.json(
      {
        error: pricing.provider.message,
        code: "PRICE_UNAVAILABLE",
        provider: pricing.provider,
      },
      { status: pricing.provider.status === "needs_configuration" ? 503 : 409 },
    );
  }

  if (!isQuoteFreshEnoughForPaperTrade(pricing.quote)) {
    return NextResponse.json(
      {
        error: "The latest verified provider price is too old for a new simulated trade.",
        code: "STALE_PRICE",
        quoteAgeHours: quoteAgeHours(pricing.quote),
        quote: pricing.quote,
      },
      { status: 409 },
    );
  }

  const { data, error } = await supabase.rpc("execute_paper_trade", {
    p_portfolio_id: portfolioId,
    p_symbol: pricing.quote.symbol,
    p_asset_class: assetClass,
    p_side: side,
    p_quantity: quantity,
    p_price: pricing.quote.price,
    p_price_as_of: pricing.quote.asOf,
    p_price_source: pricing.quote.source,
  });

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.message,
      },
      { status: errorStatus(error.message) },
    );
  }

  const [{ data: updatedPortfolio }, { data: updatedPosition }] =
    await Promise.all([
      supabase
        .from("paper_portfolios")
        .select("id,name,base_currency,starting_cash,cash_balance")
        .eq("id", portfolioId)
        .single(),
      supabase
        .from("paper_positions")
        .select("id,symbol,asset_class,quantity,average_cost,updated_at")
        .eq("portfolio_id", portfolioId)
        .eq("symbol", pricing.quote.symbol)
        .eq("asset_class", assetClass)
        .maybeSingle(),
    ]);

  return NextResponse.json({
    trade: data,
    quote: pricing.quote,
    portfolio: updatedPortfolio,
    position: updatedPosition,
  });
}
