import SectionLayout from "@/components/section-layout";
import InvestingContextBridge from "@/components/investing-context-bridge";
import InvestingLabV2 from "@/components/investing-lab-v2";

export default function InvestingPage() {
  return (
    <SectionLayout
      activeSlug="investing"
      eyebrow={{ en: "INVESTING LAB · PAPER SIMULATION", fr: "LABORATOIRE D'INVESTISSEMENT · SIMULATION" }}
      title={{ en: "Invest like an analyst: observe, reason, simulate, review.", fr: "Investis comme un analyste : observe, raisonne, simule, puis analyse." }}
      description={{
        en: "Use verified provider prices, document the logic before the trade, receive live AI coaching while you build the thesis, execute with virtual capital and review the result without risking real money.",
        fr: "Utilise des prix vérifiés par les fournisseurs, documente ton raisonnement avant l'ordre, reçois un coaching IA pendant que tu construis ta thèse, exécute avec du capital virtuel puis analyse le résultat sans risquer d'argent réel.",
      }}
    >
      <InvestingContextBridge />
      <InvestingLabV2 />
    </SectionLayout>
  );
}
