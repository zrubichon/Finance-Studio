"use client";
import StudyNotebook from "./study-notebook";

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
  const [hypothesis,setHypothesis] = useState("");
  const [evidence,setEvidence] = useState("");
  const [risk,setRisk] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function coach() {
    setLoading(true); setAnswer("");
    try {
      const draftContext = `Learner draft: hypothesis=${hypothesis}; supporting evidence=${evidence}; invalidation/risk=${risk}. Treat these as unverified learner assumptions. Current observations must be verified in Markets.`;
      const response = await fetch("/api/professor", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({
        responseStyle: "study", language:isFrench?"FR":"EN", mode:"Professional", action:"markets", lessonSlug:lesson || null,
        message:draftContext + (isFrench
          ? `Agis comme coach d'investissement pédagogique. Le concept appris juste avant est : ${concept || "le concept sélectionné"}. Point de départ : ${thesisSeed || "aucune thèse préremplie"}. Guide-moi étape par étape pour construire UNE THÈSE TESTABLE, pas une recommandation personnalisée. Structure : mécanisme économique/financier, univers d'actifs ou entreprises concernés, hypothèse, catalyst, données à vérifier, valorisation ou mesure pertinente, scénario base/bull/bear, risques, critère d'invalidation, sizing conceptuel, horizon, et journal de décision. Explique tous les termes et donne un exemple facile puis un exemple plus professionnel.`
          : `Act as an educational investing coach. The concept just learned is: ${concept || "the selected concept"}. Starting point: ${thesisSeed || "no prefilled thesis"}. Guide me step by step to build a TESTABLE THESIS, not personalized investment advice. Structure: financial/economic mechanism, relevant asset/company universe, hypothesis, catalyst, evidence to verify, valuation or relevant measure, base/bull/bear cases, risks, invalidation test, conceptual sizing, time horizon, and decision journal. Define every term and give an easy example plus a more professional example.`),
      })});
      const payload = await response.json() as { answer?: string; error?: string };
      setAnswer(payload.answer || payload.error || text("AI coach unavailable right now.", "Coach IA temporairement indisponible."));
    } catch { setAnswer(text("AI coach unavailable right now.", "Coach IA temporairement indisponible.")); }
    finally { setLoading(false); }
  }

  return (
    <section className="workspace-stack investing-learning-hub">
      <section className="market-course-strip market-course-priority"><span className="mini-label">{text("BEGINNER → STRONG INVESTOR LEARNING PATH", "PARCOURS DÉBUTANT → INVESTISSEUR SOLIDE")}</span><div className="market-course-links">{path.map(([en,fr,href]) => <Link key={href} href={href}>{isFrench?fr:en} →</Link>)}</div></section>
      <nav className="investing-steps" aria-label={text("Lab steps","Étapes du laboratoire")}><a href="/markets/guide">01 · {text("Learn","Apprendre")}</a><a href="/markets">02 · {text("Observe","Observer")}</a><a href="#investing-thesis-coach">03 · {text("Build a thesis","Construire une thèse")}</a><a href="#investing-simulator">04 · {text("Simulate & review","Simuler et revoir")}</a></nav>
      <section className="investing-start" id="investing-thesis-coach"><span className="mini-label">{text("START HERE · GUIDED INVESTING","COMMENCER ICI · INVESTISSEMENT GUIDÉ")}</span><h2>{text("Learn → observe → build a thesis → simulate → review","Apprendre → observer → formuler → simuler → revoir")}</h2><p>{text("Begin with the market module. Then compare real observations, identify your assumptions and ask the coach to challenge your reasoning before using virtual capital.","Commence par le module marchés. Compare ensuite les observations réelles, identifie tes hypothèses et demande au coach de critiquer ton raisonnement avant d’utiliser le capital virtuel.")}</p><div className="news-story-actions"><Link href="/markets/guide">{text("Learn markets · 12 chapters","Apprendre les marchés · 12 chapitres")} →</Link><Link href="/markets">{text("Explore all market observations","Explorer toutes les observations")} →</Link><a href="#investing-simulator">{text("Open the simulator","Ouvrir le simulateur")} ↓</a></div>
      <label>{text("My hypothesis","Mon hypothèse")}<textarea value={hypothesis} onChange={e=>setHypothesis(e.target.value)} placeholder={text("Which asset, what mechanism, over what horizon?","Quel actif, quel mécanisme, sur quel horizon ?")}/></label><label>{text("Evidence to verify","Preuves à vérifier")}<textarea value={evidence} onChange={e=>setEvidence(e.target.value)} placeholder={text("Source, date, valuation or relevant data","Source, date, valorisation ou données pertinentes")}/></label><label>{text("What would prove me wrong?","Qu’est-ce qui me donnerait tort ?")}<textarea value={risk} onChange={e=>setRisk(e.target.value)} placeholder={text("A specific falsifiable condition","Une condition précise et réfutable")}/></label>
      <button className="full-button" type="button" disabled={loading} onClick={()=>void coach()}>{loading?text("Preparing your coaching dossier…","Préparation du dossier…"):text("Ask the AI coach to review my reasoning","Demander au coach IA de revoir mon raisonnement")} →</button>{!concept && answer && <StudyNotebook content={answer}/>}</section>
      {concept && <section className="news-blueprint-panel"><span className="mini-label">{text("FROM TODAY'S CHALLENGE", "DEPUIS LE CHALLENGE DU JOUR")}</span><h2>{concept}</h2><p>{text("You arrived here from a specific concept, so the lab should not start from a blank page. Use the coach below to translate that concept into a falsifiable investing thesis.", "Tu arrives ici depuis un concept précis : le lab ne doit donc pas repartir d’une page blanche. Utilise le coach ci-dessous pour transformer ce concept en thèse d’investissement falsifiable.")}</p><button className="full-button" type="button" onClick={() => void coach()} disabled={loading}>{loading ? text("Building guidance…", "Création du guide…") : text("Build my concept-specific thesis guide", "Créer mon guide de thèse lié au concept")} →</button>{answer && <StudyNotebook content={answer} />}</section>}

      <details className="investing-method"><summary>{text("Understand the method: thesis, evidence and risk","Comprendre la méthode : thèse, preuves et risque")}</summary>
      <section className="news-blueprint-panel"><span className="mini-label">{text("WHAT INVESTING LAB IS FOR", "À QUOI SERT INVESTING LAB")}</span><h2>{text("A training environment for process, not a place to guess prices", "Un environnement d’entraînement au processus, pas un endroit pour deviner les prix")}</h2><p className="explanation-copy">{text("The goal is to learn how to move from information to a thesis, from a thesis to a portfolio decision, then review whether the reasoning was good even when the outcome was noisy. Start with education, use virtual capital, document assumptions and define what would prove you wrong before you act.", "Le but est d’apprendre à passer de l’information à une thèse, puis de la thèse à une décision de portefeuille, et enfin d’évaluer la qualité du raisonnement même quand le résultat est bruité. Commence par apprendre, utilise du capital virtuel, documente les hypothèses et définis ce qui te donnerait tort avant d’agir.")}</p></section>

      <section className="analysis-grid">
        <article className="analysis-card"><span className="mini-label">01 · THESIS</span><h3>{text("What do you believe?", "Quelle est ton hypothèse ?")}</h3><p>{text("State the mechanism and the expected direction. Avoid vague statements such as 'the company is good'.", "Énonce le mécanisme et la direction attendue. Évite les phrases vagues comme « l’entreprise est bonne ».")}</p></article>
        <article className="analysis-card"><span className="mini-label">02 · EVIDENCE</span><h3>{text("What would confirm it?", "Quelles preuves la confirment ?")}</h3><p>{text("Identify data, earnings drivers, valuation, macro variables and catalysts that can be observed.", "Identifie données, drivers d’earnings, valorisation, variables macro et catalyseurs observables.")}</p></article>
        <article className="analysis-card"><span className="mini-label">03 · RISK</span><h3>{text("What proves you wrong?", "Qu’est-ce qui te donne tort ?")}</h3><p>{text("Define downside, invalidation conditions, liquidity risk and what is already priced in.", "Définis downside, conditions d’invalidation, risque de liquidité et ce qui est déjà pricé.")}</p></article>
      </section>


      </details>
    </section>
  );
}
