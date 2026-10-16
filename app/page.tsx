import FinanceStudioHomeV2 from "@/components/finance-studio-home-v2";
import HomeDashboardController from "@/components/home-dashboard-controller";
import HomeLearningDepth from "@/components/home-learning-depth";
import HomeLearningDepthV2 from "@/components/home-learning-depth-v2";
import HomeContentStandards from "@/components/home-content-standards";
import DailyFinanceDashboard from "@/components/daily-finance-dashboard";
import ConceptLensDashboardGuide from "@/components/concept-lens-dashboard-guide";
import HomeNewsCarousel from "@/components/home-news-carousel";

export default function Home() {
  return (
    <>
      <FinanceStudioHomeV2 />
      <HomeDashboardController />
      <HomeLearningDepth />
      <HomeLearningDepthV2 />
      <HomeContentStandards />
      <section className="section-main product-section-main home-followup-section">
        <HomeNewsCarousel />
        <ConceptLensDashboardGuide />
        <DailyFinanceDashboard />
      </section>
    </>
  );
}
