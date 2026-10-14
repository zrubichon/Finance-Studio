import type { Metadata } from "next";
import { cookies } from "next/headers";
import ThemeBootstrap from "@/components/theme-bootstrap";
import ConceptLens from "@/components/concept-lens";
import SidebarController from "@/components/sidebar-controller";
import InvestingInstantCoach from "@/components/investing-instant-coach";
import SessionKeeper from "@/components/session-keeper";
import DeploymentSync from "@/components/deployment-sync";
import LanguageProvider, { type Language } from "@/components/language-provider";
import "./globals.css";
import "./product.css";
import "./phase-two.css";
import "./auth.css";
import "./phase-three.css";
import "./course.css";
import "./readability.css";
import "./concept-lens.css";
import "./polish-v2.css";
import "./investing-v2.css";
import "./polish-v3.css";

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
          <SessionKeeper />
          <DeploymentSync />
          <ThemeBootstrap />
          <SidebarController />
          <InvestingInstantCoach />
          {children}
          <ConceptLens />
        </LanguageProvider>
      </body>
    </html>
  );
}
