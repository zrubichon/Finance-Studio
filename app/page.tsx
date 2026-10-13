import FinanceStudioHomeV2 from "@/components/finance-studio-home-v2";
import DailyFinanceDashboard from "@/components/daily-finance-dashboard";

export default function Home() {
  return (
    <>
      <FinanceStudioHomeV2 />
      <section className="section-main product-section-main">
        <DailyFinanceDashboard />
      </section>
    </>
  );
}
