import SectionLayout from "@/components/section-layout";
import MarketsWorkspace from "@/components/markets-workspace";

export default function MarketsPage() {
  return (
    <SectionLayout
      activeSlug="markets"
      eyebrow={{ en: "GLOBAL MARKETS", fr: "MARCHÉS MONDIAUX / GLOBAL MARKETS" }}
      title={{ en: "See the market. Understand the mechanism.", fr: "Voir le marché. Comprendre le mécanisme." }}
      description={{
        en: "Track equities, rates, FX, commodities, volatility and credit with a teaching layer that explains why each move matters.",
        fr: "Suis les actions / equities, les taux / rates, les devises / FX, les matières premières / commodities, la volatilité / volatility et le crédit / credit avec une couche pédagogique qui explique pourquoi chaque mouvement compte.",
      }}
    >
      <MarketsWorkspace />
    </SectionLayout>
  );
}
