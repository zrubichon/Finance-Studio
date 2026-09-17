import SectionLayout from "@/components/section-layout";
import InvestingLab from "@/components/investing-lab";

export default function InvestingPage() {
  return (
    <SectionLayout
      activeSlug="investing"
      eyebrow="INVESTING LAB · SIMULATION ONLY"
      title="Learn investing by making decisions, documenting them and reviewing the outcome."
      description="The lab uses virtual capital only. It teaches portfolio construction, security analysis, risk, attribution and disciplined decision-making without real-money trading."
    >
      <InvestingLab />
    </SectionLayout>
  );
}
