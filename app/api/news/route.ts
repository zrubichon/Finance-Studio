import { NextRequest, NextResponse } from "next/server";
import {
  getNewsData,
  isNewsCategory,
  type NewsCategory,
} from "@/lib/providers/news-data";

export const revalidate = 1800;

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("category");
  const category: NewsCategory = isNewsCategory(requested)
    ? requested
    : "markets";

  const data = await getNewsData(category);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
