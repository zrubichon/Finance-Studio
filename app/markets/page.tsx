import SectionLayout from "@/components/section-layout";
import MarketsWorkspace from "@/components/markets-workspace";

export default function MarketsPage() {
  return (
    <SectionLayout
      activeSlug="markets"
      eyebrow="GLOBAL MARKETS"
      title="See the move. Understand the mechanism."
      description="A global cross-asset dashboard designed to teach the relationship between equities, rates, FX, commodities, volatility and credit. Live values will only appear once an authorized provider is connected."
    >
      <MarketsWorkspace />
    </SectionLayout>
  );
}
