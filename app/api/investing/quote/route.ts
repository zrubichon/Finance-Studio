import { NextRequest, NextResponse } from "next/server";
import {
  getInstrumentQuote,
  type InvestableAssetClass,
} from "@/lib/providers/instrument-data";

const assetClasses = new Set<InvestableAssetClass>([
  "equity",
  "etf",
  "bond",
  "fx",
  "commodity",
  "crypto",
  "option",
]);

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = (request.nextUrl.searchParams.get("symbol") ?? "").trim();
  const assetClass = request.nextUrl.searchParams.get("assetClass") as InvestableAssetClass | null;

  if (!symbol || !assetClass || !assetClasses.has(assetClass)) {
    return NextResponse.json(
      { error: "A valid symbol and assetClass are required." },
      { status: 400 },
    );
  }

  const result = await getInstrumentQuote(symbol, assetClass);

  if (!result.quote) {
    return NextResponse.json(
      {
        error: result.provider.message,
        provider: result.provider,
      },
      { status: result.provider.status === "needs_configuration" ? 503 : 404 },
    );
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
