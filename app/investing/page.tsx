import SectionLayout from "@/components/section-layout";
import InvestingLab from "@/components/investing-lab";

export default function InvestingPage() {
  return (
    <SectionLayout
      activeSlug="investing"
      eyebrow={{ en: "INVESTING LAB · SIMULATION ONLY", fr: "LABORATOIRE D’INVESTISSEMENT · SIMULATION UNIQUEMENT" }}
      title={{ en: "Learn investing by making decisions, documenting them and reviewing the outcome.", fr: "Apprends à investir en prenant des décisions, en les documentant puis en analysant le résultat." }}
      description={{
        en: "The lab is designed around virtual capital only. It teaches portfolio construction, security analysis, risk, attribution and disciplined decision-making without requiring real-money trading.",
        fr: "Le laboratoire utilise uniquement du capital virtuel. Il enseigne la construction de portefeuille / portfolio construction, l’analyse de titres / security analysis, le risque / risk, l’attribution de performance / performance attribution et une prise de décision disciplinée sans utiliser d’argent réel.",
      }}
    >
      <InvestingLab />
    </SectionLayout>
  );
}
