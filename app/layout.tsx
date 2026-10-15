import type { Metadata } from "next";
import { cookies } from "next/headers";
import ThemeBootstrap from "@/components/theme-bootstrap";
import LanguageProvider, { type Language } from "@/components/language-provider";
import ActivityTracker from "@/components/activity-tracker";
import FinanceNotationStandards from "@/components/finance-notation-standards";
import ConceptLens from "@/components/concept-lens";
import "./globals.css";
import "./product.css";
import "./phase-two.css";
import "./auth.css";
import "./account-overrides.css";
import "./phase-three.css";
import "./course.css";
import "./dashboard-upgrades.css";
import "./home-dashboard-v2.css";
import "./home-dashboard-polish.css";
import "./home-dashboard-final.css";
import "./challenge-daily.css";
import "./comprehensive-polish.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const isFrench = cookieStore.get("finance-studio-language")?.value === "FR";

  return {
    title: isFrench ? "FinanceStudio — Apprendre la finance en profondeur" : "FinanceStudio — Learn finance deeply",
    description: isFrench
      ? "Une plateforme bilingue d’apprentissage de la finance, d’intelligence de marché et de préparation aux entretiens / interviews."
      : "A bilingual finance learning, market intelligence and interview-preparation platform.",
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("finance-studio-language")?.value;
  const initialLanguage: Language = cookieLanguage === "FR" ? "FR" : "EN";

  return (
    <html lang={initialLanguage === "FR" ? "fr" : "en"}>
      <body>
        <LanguageProvider initialLanguage={initialLanguage}>
          <ThemeBootstrap />
          <ActivityTracker />
          <FinanceNotationStandards />
          <ConceptLens />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
