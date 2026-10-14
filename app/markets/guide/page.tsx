import SectionLayout from "@/components/section-layout";
import MarketDataGuide from "@/components/market-data-guide";

export default function MarketGuidePage() {
  return (
    <SectionLayout
      activeSlug="markets"
      eyebrow={{ en: "MARKET MAP GUIDE", fr: "GUIDE DE LA MARKET MAP" }}
      title={{ en: "Understand these data", fr: "Comprendre ces données" }}
      description={{
        en: "Learn what each market indicator means, why it matters, how to read a move and what it can affect next.",
        fr: "Apprends ce que signifie chaque indicateur, pourquoi il est important, comment lire un mouvement et ce qu’il peut affecter ensuite.",
      }}
    >
      <MarketDataGuide />
    </SectionLayout>
  );
}
