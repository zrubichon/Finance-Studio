import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/providers/market-data";

export const revalidate = 300;

export async function GET() {
  const data = await getMarketData();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
