import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "@/lib/supabase/config";

type Side = "buy" | "sell";
type AssetClass =
  | "equity"
  | "etf"
  | "bond"
  | "fx"
  | "commodity"
  | "crypto"
  | "option";

const assetClasses = new Set<AssetClass>([
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
  const assetClass = body?.assetClass as AssetClass | undefined;
  const side = body?.side as Side | undefined;
  const quantity = Number(body?.quantity);

  if (
    !portfolioId ||
    !symbol ||
    !assetClass ||
    !assetClasses.has(assetClass) ||
    (side !== "buy" && side !== "sell") ||
    !Number.isFinite(quantity) ||
    quantity <= 0 ||
    quantity > 1_000_000_000
  ) {
    return NextResponse.json(
      { error: "Invalid paper trade request." },
      { status: 400 },
    );
  }

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
    return NextResponse.json(
      { error: "Sign in required.", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  const edgeResponse = await fetch(
    `${SUPABASE_URL}/functions/v1/paper-trade`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "trade",
        portfolioId,
        symbol,
        assetClass,
        side,
        quantity,
      }),
      cache: "no-store",
    },
  );

  const payload = await edgeResponse.json().catch(() => ({
    error: "Secure paper execution returned an unreadable response.",
    code: "SECURE_EXECUTION_ERROR",
  }));

  return NextResponse.json(payload, { status: edgeResponse.status });
}
