"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";

const rolePriorities: Record<string, { en: string[]; fr: string[] }> = {
  "Sales & Trading": {
    en: ["Rates, FX and macro transmission", "Market microstructure and derivatives", "Daily market-view practice"],
    fr: ["Taux, FX et transmission macro", "Microstructure de marché et dérivés", "Pratique quotidienne d'une vue de marché"],
  },
  "Asset Management": {
    en: ["Portfolio theory and valuation", "Macro and asset allocation", "One investment thesis with explicit risk"],
    fr: ["Théorie de portefeuille et valorisation", "Macro et allocation d'actifs", "Une thèse d'investissement avec risque explicite"],
  },
  "Equity Research": {
    en: ["Accounting and financial statements", "Valuation and earnings analysis", "Build a concise stock pitch"],
    fr: ["Comptabilité et états financiers", "Valorisation et analyse des résultats", "Construire un pitch action concis"],
  },
  "Investment Banking": {
    en: ["Accounting foundations", "Valuation: DCF and comparables", "Technical + behavioral interview drills"],
    fr: ["Bases de comptabilité", "Valorisation : DCF et comparables", "Entretiens techniques + comportementaux"],
  },
  "Wealth Management": {
    en: ["Asset allocation and risk profiling", "Bonds, equities and portfolio construction", "Client communication practice"],
    fr: ["Allocation d'actifs et profil de risque", "Obligations, actions et construction de portefeuille", "Pratique de communication client"],
  },
};

export default function HomeCareerGuide() {
  const { isFrench, text } = useLanguage();
  const [role, setRole] = useState("");
  const [stage, setStage] = useState("");

  useEffect(() => {
    let active = true;
    const sync = () => {
      if (!active) return;
      setRole(window.localStorage.getItem("finance-studio-target-role") ?? "");
      setStage(window.localStorage.getItem("finance-studio-career-stage") ?? "");
    };
    sync();
    window.addEventListener("finance-studio-career-change", sync as EventListener);

    async function hydrateAccount() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !active) return;
        const { data } = await supabase.from("profiles").select("target_role").eq("user_id", user.id).maybeSingle();
        if (data?.target_role && active) {
          setRole(data.target_role);
          window.localStorage.setItem("finance-studio-target-role", data.target_role);
        }
      } catch {}
    }
    void hydrateAccount();
    return () => {
      active = false;
      window.removeEventListener("finance-studio-career-change", sync as EventListener);
    };
  }, []);

  if (!role && !stage) return null;

  const priorities = rolePriorities[role] ?? {
    en: ["Finance foundations", "Role-specific vocabulary", "Interview and applied case practice"],
    fr: ["Fondamentaux de la finance", "Vocabulaire spécifique au métier", "Entretiens et cas pratiques"],
  };
  const list = isFrench ? priorities.fr : priorities.en;
  const summer = stage === "intern";

  return (
    <section className="home-career-guide">
      <div className="panel-heading">
        <div>
          <span className="mini-label">{summer ? text("SUMMER ANALYST NEXT STEPS", "PROCHAINES ÉTAPES SUMMER ANALYST") : text("YOUR CAREER PATH", "TON PARCOURS CARRIÈRE")}</span>
          <h2>{role || text("Career preparation", "Préparation carrière")}</h2>
          <p>{summer
            ? text("FinanceStudio is prioritizing internship-ready fundamentals, interview practice and applied examples.", "FinanceStudio priorise les fondamentaux utiles en stage, les entretiens et les exemples appliqués.")
            : text("Your dashboard now reflects the target selected in Careers.", "Ton dashboard reflète maintenant l'objectif choisi dans Carrières.")}</p>
        </div>
        <Link className="chip" href="/careers">{text("Edit target", "Modifier l'objectif")}</Link>
      </div>
      <div className="home-career-next-grid">
        {list.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>)}
        {summer ? <article><span>04</span><strong>{text("Practice fit, motivation and commercial awareness", "Travailler fit, motivation et culture marché")}</strong></article> : null}
        {summer ? <article><span>05</span><strong>{text("Build one sample investment or valuation case", "Construire un cas exemple d'investissement ou de valorisation")}</strong></article> : null}
      </div>
      <div className="related-row">
        <Link href="/university">{text("Recommended courses", "Cours recommandés")} →</Link>
        <Link href="/dictionary">{text("Role vocabulary", "Vocabulaire du métier")} →</Link>
        <Link href="/interview">{text("Interview practice", "Entraînement entretien")} →</Link>
        <Link href="/investing">{text("Applied case", "Cas appliqué")} →</Link>
      </div>
    </section>
  );
}