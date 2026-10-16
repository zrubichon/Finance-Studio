import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/providers/market-data";
import { getPublicFredQuotes } from "@/lib/providers/fred-public-market-data";

export const revalidate = 60;

export async function GET() {
  const [data, publicFred] = await Promise.all([
    getMarketData(),
    getPublicFredQuotes(),
  ]);

  const unique = new Map(data.quotes.map(quote=>[`${quote.category}:${quote.label}`,quote]));
  for (const quote of publicFred.quotes) {
    const key = `${quote.category}:${quote.label}`;
    const existing = unique.get(key);
    if (!existing || quote.asOf >= existing.asOf) unique.set(key,quote);
  }
  const providers = data.providers.map(provider => provider.id === "fred" && publicFred.quotes.length ? publicFred.provider : provider);

  return NextResponse.json({
    ...data,
    updatedAt: new Date().toISOString(),
    quotes: [...unique.values()],
    providers,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=180",
    },
  });
}
