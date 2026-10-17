import {after} from "next/server";
import {newsAnalysis} from "@/lib/news-analysis";
import { NextRequest, NextResponse } from "next/server";
import {
  getNewsData,
  isNewsCategory,
  type NewsCategory,
} from "@/lib/providers/news-data";

export const revalidate = 300;
export const maxDuration=180;

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("category");
  const category: NewsCategory = isNewsCategory(requested)
    ? requested
    : "all";

  const data = await getNewsData(category);

  // Prepare the lead story without delaying the feed. The same persistent cache
  // serves the modal, article and subsequent visitors; no browser-side paid polling.
  const lead=data.items[0];
  if(lead)after(async()=>{try{await newsAnalysis(lead.url,lead.title,request.nextUrl.searchParams.get('language')==='FR'?'FR':'EN');}catch{/* Keep the feed available if generation or credits are unavailable. */}});
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
      "X-FinanceStudio-News-Mode": "hourly-archive",
    },
  });
}
