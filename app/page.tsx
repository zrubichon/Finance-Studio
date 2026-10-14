import FinanceStudioHomeV2 from "@/components/finance-studio-home-v2";
import HomeHourlyRotator from "@/components/home-hourly-rotator";
import DailyFinanceDashboard from "@/components/daily-finance-dashboard";
import ConceptLensDashboardGuide from "@/components/concept-lens-dashboard-guide";

export default function Home() {
  return (
    <>
      <FinanceStudioHomeV2 />
      <HomeHourlyRotator />
      <section className="section-main product-section-main">
        <ConceptLensDashboardGuide />
        <DailyFinanceDashboard />
      </section>
    </>
  );
}
