import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/providers/market-data";
import { getPublicFredQuotes } from "@/lib/providers/fred-public-market-data";

export const revalidate = 300;

export async function GET() {
  const [data, publicFred] = await Promise.all([
    getMarketData(),
    getPublicFredQuotes(),
  ]);

  const existingIds = new Set(data.quotes.map((quote) => quote.id.replace(/^fred-public-/, "")));
  const fallbackQuotes = publicFred.quotes.filter((quote) => {
    const normalized = quote.id.replace(/^fred-public-/, "");
    return !existingIds.has(normalized);
  });

  const providers = data.providers.map((provider) =>
    provider.id === "fred" && provider.status === "needs_configuration"
      ? publicFred.provider
      : provider,
  );

  return NextResponse.json({
    ...data,
    updatedAt: new Date().toISOString(),
    quotes: [...data.quotes, ...fallbackQuotes],
    providers,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
