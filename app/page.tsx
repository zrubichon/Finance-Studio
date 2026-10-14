import FinanceStudioHomeV2 from "@/components/finance-studio-home-v2";
import HomeDashboardController from "@/components/home-dashboard-controller";
import HomeLearningDepth from "@/components/home-learning-depth";
import HomeTeachingEnhancements from "@/components/home-teaching-enhancements";
import HomeContentStandards from "@/components/home-content-standards";
import DailyFinanceDashboard from "@/components/daily-finance-dashboard";
import ConceptLensDashboardGuide from "@/components/concept-lens-dashboard-guide";

export default function Home() {
  return (
    <>
      <FinanceStudioHomeV2 />
      <HomeDashboardController />
      <HomeLearningDepth />
      <HomeTeachingEnhancements />
      <HomeContentStandards />
      <section className="section-main product-section-main home-followup-section">
        <ConceptLensDashboardGuide />
        <DailyFinanceDashboard />
      </section>
    </>
  );
}
