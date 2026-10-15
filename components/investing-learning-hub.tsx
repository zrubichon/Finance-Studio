"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

const path = [
  ["1. Understand instruments", "1. Comprendre les instruments", "/university/year-1-stocks-bonds-etfs-funds"],
  ["2. Learn portfolio basics", "2. Apprendre les bases portefeuille", "/university/year-1-portfolio-basics"],
  ["3. Understand macro transmission", "3. Comprendre la transmission macro", "/university/year-1-macroeconomics-for-markets"],
  ["4. Learn valuation", "4. Apprendre la valorisation", "/university/year-2-equity-valuation"],
  ["5. Learn rates and duration", "5. Apprendre taux et duration", "/university/year-2-fixed-income-yield-curves"],
  ["6. Learn risk", "6. Apprendre la gestion du risque", "/university/year-3-risk-management"],
];

export default function InvestingLearningHub() {
  const { isFrench, text } = useLanguage();
  const params = useSearchParams();
  const concept = params.get("concept") || "";
  const lesson = params.get("lesson") || "";
  const thesisSeed = params.get("thesis") || "";
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function coach() {
    setLoading(true); setAnswer("");
    try {
      const response = await fetch("/api/professor", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({
        language:isFrench?"FR":"EN", mode:"Professional", action:"markets", lessonSlug:lesson || null,
        message:isFrench
          ? `Agis comme coach d'investissement pédagogique. Le concept appris juste avant est : ${concept || "le concept sélectionné"}. Point de départ : ${thesisSeed || "aucune thèse préremplie"}. Guide-moi étape par étape pour construire UNE THÈSE TESTABLE, pas une recommandation personnalisée. Structure : mécanisme économique/financier, univers d'actifs ou entreprises concernés, hypothèse, catalyst, données à vérifier, valorisation ou mesure pertinente, scénario base/bull/bear, risques, critère d'invalidation, sizing conceptuel, horizon, et journal de décision. Explique tous les termes et donne un exemple facile puis un exemple plus professionnel.`
          : `Act as an educational investing coach. The concept just learned is: ${concept || "the selected concept"}. Starting point: ${thesisSeed || "no prefilled thesis"}. Guide me step by step to build a TESTABLE THESIS, not personalized investment advice. Structure: financial/economic mechanism, relevant asset/company universe, hypothesis, catalyst, evidence to verify, valuation or relevant measure, base/bull/bear cases, risks, invalidation test, conceptual sizing, time horizon, and decision journal. Define every term and give an easy example plus a more professional example.`,
      })});
      const payload = await response.json() as { answer?: string };
      setAnswer(payload.answer || text("AI coach unavailable right now.", "Coach IA temporairement indisponible."));
    } catch { setAnswer(text("AI coach unavailable right now.", "Coach IA temporairement indisponible.")); }
    finally { setLoading(false); }
  }

  return (
    <section className="workspace-stack investing-learning-hub">
      {concept && <section className="news-blueprint-panel"><span className="mini-label">{text("FROM TODAY'S CHALLENGE", "DEPUIS LE CHALLENGE DU JOUR")}</span><h2>{concept}</h2><p>{text("You arrived here from a specific concept, so the lab should not start from a blank page. Use the coach below to translate that concept into a falsifiable investing thesis.", "Tu arrives ici depuis un concept précis : le lab ne doit donc pas repartir d’une page blanche. Utilise le coach ci-dessous pour transformer ce concept en thèse d’investissement falsifiable.")}</p><button className="full-button" type="button" onClick={() => void coach()} disabled={loading}>{loading ? text("Building guidance…", "Création du guide…") : text("Build my concept-specific thesis guide", "Créer mon guide de thèse lié au concept")} →</button>{answer && <div className="dictionary-ai-sheet">{answer}</div>}</section>}

      <section className="news-blueprint-panel"><span className="mini-label">{text("WHAT INVESTING LAB IS FOR", "À QUOI SERT INVESTING LAB")}</span><h2>{text("A training environment for process, not a place to guess prices", "Un environnement d’entraînement au processus, pas un endroit pour deviner les prix")}</h2><p className="explanation-copy">{text("The goal is to learn how to move from information to a thesis, from a thesis to a portfolio decision, then review whether the reasoning was good even when the outcome was noisy. Start with education, use virtual capital, document assumptions and define what would prove you wrong before you act.", "Le but est d’apprendre à passer de l’information à une thèse, puis de la thèse à une décision de portefeuille, et enfin d’évaluer la qualité du raisonnement même quand le résultat est bruité. Commence par apprendre, utilise du capital virtuel, documente les hypothèses et définis ce qui te donnerait tort avant d’agir.")}</p></section>

      <section className="analysis-grid">
        <article className="analysis-card"><span className="mini-label">01 · THESIS</span><h3>{text("What do you believe?", "Quelle est ton hypothèse ?")}</h3><p>{text("State the mechanism and the expected direction. Avoid vague statements such as 'the company is good'.", "Énonce le mécanisme et la direction attendue. Évite les phrases vagues comme « l’entreprise est bonne ».")}</p></article>
        <article className="analysis-card"><span className="mini-label">02 · EVIDENCE</span><h3>{text("What would confirm it?", "Quelles preuves la confirment ?")}</h3><p>{text("Identify data, earnings drivers, valuation, macro variables and catalysts that can be observed.", "Identifie données, drivers d’earnings, valorisation, variables macro et catalyseurs observables.")}</p></article>
        <article className="analysis-card"><span className="mini-label">03 · RISK</span><h3>{text("What proves you wrong?", "Qu’est-ce qui te donne tort ?")}</h3><p>{text("Define downside, invalidation conditions, liquidity risk and what is already priced in.", "Définis downside, conditions d’invalidation, risque de liquidité et ce qui est déjà pricé.")}</p></article>
      </section>

      <section className="market-course-strip"><span className="mini-label">{text("BEGINNER → STRONG INVESTOR LEARNING PATH", "PARCOURS DÉBUTANT → INVESTISSEUR SOLIDE")}</span><div className="market-course-links">{path.map(([en,fr,href]) => <Link key={href} href={href}>{isFrench?fr:en} →</Link>)}</div></section>
    </section>
  );
}
