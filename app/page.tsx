import FinanceStudioHomeV2 from "@/components/finance-studio-home-v2";
import DailyFinanceDashboard from "@/components/daily-finance-dashboard";
import ConceptLensDashboardGuide from "@/components/concept-lens-dashboard-guide";
import HomeCareerGuide from "@/components/home-career-guide";

export default function Home() {
  return (
    <>
      <FinanceStudioHomeV2 />
      <section className="section-main product-section-main">
        <HomeCareerGuide />
        <ConceptLensDashboardGuide />
        <DailyFinanceDashboard />
      </section>
    </>
  );
}