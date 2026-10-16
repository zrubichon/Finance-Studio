import {notFound} from "next/navigation";
import SectionLayout from "@/components/section-layout";
import MarketAcademy from "@/components/market-academy";
import {marketChapters} from "@/lib/market-academy";
export default async function MarketChapterPage({params}:{params:Promise<{chapter:string}>}) {
  const {chapter}=await params;const item=marketChapters.find(c=>c.id===chapter);if(!item)notFound();
  return <SectionLayout activeSlug="markets" eyebrow={{en:"MARKET ACADEMY",fr:"ACADÉMIE DES MARCHÉS"}} title={item.title} description={item.goal}><MarketAcademy chapterId={item.id}/></SectionLayout>;
}
