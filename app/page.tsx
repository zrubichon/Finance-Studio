import FinanceStudioHomeV2 from "@/components/finance-studio-home-v2";
import HomeDashboardController from "@/components/home-dashboard-controller";
import DailyFinanceDashboard from "@/components/daily-finance-dashboard";
import ConceptLensDashboardGuide from "@/components/concept-lens-dashboard-guide";

export default function Home() {
  return (
    <>
      <FinanceStudioHomeV2 />
      <HomeDashboardController />
      <section className="section-main product-section-main">
        <ConceptLensDashboardGuide />
        <DailyFinanceDashboard />
      </section>
    </>
  );
}
