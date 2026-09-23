import { NextRequest, NextResponse } from "next/server";
import {
  getNewsData,
  isNewsCategory,
  type NewsCategory,
} from "@/lib/providers/news-data";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("category");
  const category: NewsCategory = isNewsCategory(requested)
    ? requested
    : "all";

  const data = await getNewsData(category);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
      "X-FinanceStudio-News-Mode": "hourly-archive",
    },
  });
}
