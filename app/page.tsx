import FinanceStudioHomeV2 from "@/components/finance-studio-home-v2";
import HomeContentStandards from "@/components/home-content-standards";
import DailyFinanceDashboard from "@/components/daily-finance-dashboard";
import ConceptLensDashboardGuide from "@/components/concept-lens-dashboard-guide";
import HomeNewsCarousel from "@/components/home-news-carousel";

export default function Home() {
  return (
    <>
      <FinanceStudioHomeV2 />
      <HomeContentStandards />
      <section className="section-main product-section-main home-followup-section">
        <HomeNewsCarousel />
        <ConceptLensDashboardGuide />
        <DailyFinanceDashboard />
      </section>
    </>
  );
}
