"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SectionLayout from "@/components/section-layout";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";

type Localized = { en: string; fr: string };
type CareerRole = { role: Localized; mission: Localized; knowledge: Localized[] };
type CareerGroup = { group: Localized; roles: CareerRole[] };
type CareerStage = { key: string; title: Localized; timing: Localized; focus: Localized };
type Guidance = { courses: Localized[]; vocabulary: Localized[]; interview: Localized; portfolio: Localized };

const careerGroups: CareerGroup[] = [
  {
    group: { en: "Markets & Investing", fr: "Marchés & investissement" },
    roles: [
      { role: { en: "Sales & Trading", fr: "Sales & Trading" }, mission: { en: "Price risk, execute client flow and understand how macro information moves markets.", fr: "Pricer le risque, exécuter les flux clients et comprendre comment l'information macro fait bouger les marchés." }, knowledge: [{ en: "Rates", fr: "Taux" }, { en: "FX", fr: "Devises / FX" }, { en: "Credit", fr: "Crédit" }, { en: "Equities", fr: "Actions" }, { en: "Derivatives", fr: "Produits dérivés" }, { en: "Market microstructure", fr: "Microstructure de marché" }] },
      { role: { en: "Asset Management", fr: "Gestion d'actifs" }, mission: { en: "Allocate capital, research securities and build portfolios around client objectives and risk budgets.", fr: "Allouer le capital, analyser les titres et construire des portefeuilles autour des objectifs clients et des budgets de risque." }, knowledge: [{ en: "Portfolio theory", fr: "Théorie de portefeuille" }, { en: "Valuation", fr: "Valorisation" }, { en: "Macro", fr: "Macro" }, { en: "Risk", fr: "Risque" }, { en: "Performance attribution", fr: "Attribution de performance" }, { en: "Research", fr: "Recherche" }] },
      { role: { en: "Equity Research", fr: "Recherche actions" }, mission: { en: "Develop differentiated views on companies, earnings and valuation, then communicate the investment case clearly.", fr: "Développer une opinion différenciante sur les entreprises, leurs résultats et leur valorisation, puis communiquer clairement la thèse d'investissement." }, knowledge: [{ en: "Accounting", fr: "Comptabilité" }, { en: "Valuation", fr: "Valorisation" }, { en: "Industry research", fr: "Recherche sectorielle" }, { en: "Modeling", fr: "Modélisation" }, { en: "Earnings", fr: "Résultats" }, { en: "Writing", fr: "Rédaction" }] },
      { role: { en: "Hedge Funds", fr: "Hedge Funds" }, mission: { en: "Generate and manage investment ideas with explicit catalysts, downside cases and portfolio-level risk constraints.", fr: "Générer et gérer des idées d'investissement avec des catalyseurs, scénarios baissiers et contraintes de risque explicites." }, knowledge: [{ en: "Security analysis", fr: "Analyse de titres" }, { en: "Catalysts", fr: "Catalyseurs" }, { en: "Risk", fr: "Risque" }, { en: "Derivatives", fr: "Produits dérivés" }, { en: "Macro", fr: "Macro" }, { en: "Position sizing", fr: "Taille de position" }] },
    ],
  },
  {
    group: { en: "Deals & Private Capital", fr: "Transactions & capital privé" },
    roles: [
      { role: { en: "Investment Banking", fr: "Banque d'investissement" }, mission: { en: "Advise companies on M&A, capital raising and strategic transactions while building rigorous financial analysis.", fr: "Conseiller les entreprises sur les M&A, levées de capitaux et transactions stratégiques avec une analyse financière rigoureuse." }, knowledge: [{ en: "Accounting", fr: "Comptabilité" }, { en: "DCF", fr: "DCF" }, { en: "Comps", fr: "Comparables" }, { en: "M&A", fr: "Fusions-acquisitions" }, { en: "Debt", fr: "Dette" }, { en: "Financial modeling", fr: "Modélisation financière" }] },
      { role: { en: "Private Equity", fr: "Private Equity" }, mission: { en: "Acquire businesses, use leverage thoughtfully and create value through operations, capital structure and exit strategy.", fr: "Acquérir des entreprises, utiliser l'effet de levier avec discipline et créer de la valeur via les opérations, la structure du capital et la sortie." }, knowledge: [{ en: "LBO", fr: "LBO" }, { en: "Debt capacity", fr: "Capacité d'endettement" }, { en: "Cash flow", fr: "Flux de trésorerie" }, { en: "Valuation", fr: "Valorisation" }, { en: "IRR / MOIC", fr: "IRR / MOIC" }, { en: "Due diligence", fr: "Due diligence" }] },
      { role: { en: "Venture Capital", fr: "Venture Capital" }, mission: { en: "Evaluate early-stage companies, markets, founders and asymmetric upside with limited historical financial data.", fr: "Évaluer les entreprises early-stage, leurs marchés, fondateurs et potentiel asymétrique avec peu de données financières historiques." }, knowledge: [{ en: "Market sizing", fr: "Taille de marché" }, { en: "Unit economics", fr: "Économie unitaire" }, { en: "Cap tables", fr: "Tables de capitalisation" }, { en: "Product", fr: "Produit" }, { en: "Growth", fr: "Croissance" }, { en: "Portfolio construction", fr: "Construction de portefeuille" }] },
    ],
  },
  {
    group: { en: "Clients, Companies & Risk", fr: "Clients, entreprises & risque" },
    roles: [
      { role: { en: "Wealth Management", fr: "Gestion de fortune" }, mission: { en: "Translate financial markets into long-term plans that fit a client's goals, constraints and behavior.", fr: "Transformer les marchés financiers en plans de long terme adaptés aux objectifs, contraintes et comportements du client." }, knowledge: [{ en: "Asset allocation", fr: "Allocation d'actifs" }, { en: "Tax awareness", fr: "Fiscalité" }, { en: "Risk profiling", fr: "Profil de risque" }, { en: "Client communication", fr: "Communication client" }, { en: "Retirement", fr: "Retraite" }, { en: "Estate basics", fr: "Bases patrimoniales" }] },
      { role: { en: "Corporate Finance / FP&A", fr: "Finance d'entreprise / FP&A" }, mission: { en: "Help a company plan, budget, allocate capital and understand the financial consequences of operating decisions.", fr: "Aider une entreprise à planifier, budgéter, allouer son capital et comprendre les conséquences financières de ses décisions opérationnelles." }, knowledge: [{ en: "Budgeting", fr: "Budgétisation" }, { en: "Forecasting", fr: "Prévisions" }, { en: "KPIs", fr: "KPIs" }, { en: "Cash flow", fr: "Flux de trésorerie" }, { en: "Variance analysis", fr: "Analyse des écarts" }, { en: "Capital allocation", fr: "Allocation du capital" }] },
      { role: { en: "Risk Management", fr: "Gestion des risques" }, mission: { en: "Measure, challenge and monitor market, credit, liquidity and operational risks before losses become surprises.", fr: "Mesurer, challenger et surveiller les risques de marché, crédit, liquidité et opérationnels avant qu'ils ne deviennent des pertes inattendues." }, knowledge: [{ en: "VaR", fr: "VaR" }, { en: "Stress tests", fr: "Stress tests" }, { en: "Credit risk", fr: "Risque de crédit" }, { en: "Liquidity", fr: "Liquidité" }, { en: "Limits", fr: "Limites" }, { en: "Scenario analysis", fr: "Analyse de scénarios" }] },
    ],
  },
];

const stages: CareerStage[] = [
  { key: "intern", title: { en: "Intern / Summer Analyst", fr: "Stage / Summer Analyst" }, timing: { en: "Student", fr: "Étudiant" }, focus: { en: "Learn the desk, build technical foundations, execute carefully and ask strong questions.", fr: "Découvrir l'équipe, construire les bases techniques, exécuter avec rigueur et poser de bonnes questions." } },
  { key: "analyst", title: { en: "Analyst", fr: "Analyst / Analyste" }, timing: { en: "Entry level", fr: "Début de carrière" }, focus: { en: "Own analysis, models, research and execution details. Accuracy and speed matter enormously.", fr: "Prendre en charge analyses, modèles, recherche et détails d'exécution. Précision et vitesse sont essentielles." } },
  { key: "associate", title: { en: "Associate", fr: "Associate" }, timing: { en: "Early career", fr: "Début / milieu de carrière" }, focus: { en: "Review analyst work, manage workstreams and start owning client or investment communication.", fr: "Revoir le travail des analysts, gérer des workstreams et commencer à porter la communication client ou investissement." } },
  { key: "vp", title: { en: "Vice President", fr: "Vice President / VP" }, timing: { en: "Mid-career", fr: "Milieu de carrière" }, focus: { en: "Coordinate teams, challenge judgment, manage execution and translate senior strategy into deliverables.", fr: "Coordonner les équipes, challenger le jugement, gérer l'exécution et transformer la stratégie senior en livrables." } },
  { key: "director", title: { en: "Director / Executive Director", fr: "Director / Executive Director" }, timing: { en: "Senior", fr: "Senior" }, focus: { en: "Originate ideas or business, manage senior relationships and make higher-stakes judgment calls.", fr: "Originer des idées ou du business, gérer les relations senior et prendre des décisions à plus fort enjeu." } },
  { key: "md", title: { en: "Managing Director", fr: "Managing Director / MD" }, timing: { en: "Leadership", fr: "Direction" }, focus: { en: "Own major relationships, franchise strategy, revenue or investment accountability and senior risk decisions.", fr: "Porter les relations majeures, la stratégie, la responsabilité commerciale ou d'investissement et les décisions de risque senior." } },
];

const guidanceByRole: Record<string, Guidance> = {
  "Sales & Trading": {
    courses: [{ en: "Rates & yield curves", fr: "Taux & courbe des taux" }, { en: "FX & macro transmission", fr: "FX & transmission macro" }, { en: "Derivatives", fr: "Produits dérivés" }, { en: "Market microstructure", fr: "Microstructure de marché" }],
    vocabulary: [{ en: "bid / ask", fr: "bid / ask" }, { en: "spread", fr: "spread" }, { en: "duration", fr: "duration" }, { en: "yield curve", fr: "courbe des taux" }, { en: "implied volatility", fr: "volatilité implicite" }],
    interview: { en: "Market view, transmission logic, mental math and risk intuition.", fr: "Vue de marché, chaîne de transmission, calcul mental et intuition du risque." },
    portfolio: { en: "Build a macro trade with entry level, catalyst, invalidation and risk limit.", fr: "Construis un trade macro avec niveau d'entrée, catalyseur, invalidation et limite de risque." },
  },
  "Asset Management": {
    courses: [{ en: "Portfolio theory", fr: "Théorie de portefeuille" }, { en: "Valuation", fr: "Valorisation" }, { en: "Macro & asset allocation", fr: "Macro & allocation d'actifs" }, { en: "Risk management", fr: "Gestion du risque" }],
    vocabulary: [{ en: "alpha", fr: "alpha" }, { en: "beta", fr: "bêta" }, { en: "Sharpe ratio", fr: "ratio de Sharpe" }, { en: "drawdown", fr: "drawdown" }, { en: "asset allocation", fr: "allocation d'actifs" }],
    interview: { en: "Investment process, portfolio construction and one well-defended stock or asset idea.", fr: "Processus d'investissement, construction de portefeuille et une idée d'investissement bien défendue." },
    portfolio: { en: "Write an investment thesis and explain sizing, diversification and downside.", fr: "Rédige une thèse d'investissement et explique la taille de position, la diversification et le downside." },
  },
  "Equity Research": {
    courses: [{ en: "Accounting", fr: "Comptabilité" }, { en: "Financial statement analysis", fr: "Analyse des états financiers" }, { en: "Valuation & DCF", fr: "Valorisation & DCF" }, { en: "Earnings analysis", fr: "Analyse des résultats" }],
    vocabulary: [{ en: "EPS", fr: "BPA" }, { en: "EBITDA", fr: "EBITDA" }, { en: "DCF", fr: "DCF" }, { en: "multiple", fr: "multiple" }, { en: "margin expansion", fr: "expansion des marges" }],
    interview: { en: "Accounting links, valuation, earnings drivers and a concise stock pitch.", fr: "Liens comptables, valorisation, moteurs des résultats et pitch action concis." },
    portfolio: { en: "Build a stock thesis with earnings assumptions, catalyst and bear case.", fr: "Construis une thèse action avec hypothèses de résultats, catalyseur et scénario baissier." },
  },
  "Hedge Funds": {
    courses: [{ en: "Security analysis", fr: "Analyse de titres" }, { en: "Catalysts", fr: "Catalyseurs" }, { en: "Long / short", fr: "Long / short" }, { en: "Portfolio risk", fr: "Risque portefeuille" }],
    vocabulary: [{ en: "catalyst", fr: "catalyseur" }, { en: "mispricing", fr: "mauvaise valorisation" }, { en: "downside", fr: "downside" }, { en: "position sizing", fr: "taille de position" }, { en: "risk / reward", fr: "risque / rendement" }],
    interview: { en: "Variant perception, catalysts, downside and what would make you change your mind.", fr: "Opinion différenciante, catalyseurs, downside et ce qui te ferait changer d'avis." },
    portfolio: { en: "Build a long or short thesis with explicit invalidation and position sizing.", fr: "Construis une thèse long ou short avec invalidation explicite et taille de position." },
  },
  "Investment Banking": {
    courses: [{ en: "Accounting", fr: "Comptabilité" }, { en: "Valuation", fr: "Valorisation" }, { en: "DCF & comps", fr: "DCF & comparables" }, { en: "M&A fundamentals", fr: "Bases des M&A" }],
    vocabulary: [{ en: "enterprise value", fr: "valeur d'entreprise" }, { en: "equity value", fr: "valeur des capitaux propres" }, { en: "accretion / dilution", fr: "relution / dilution" }, { en: "WACC", fr: "CMPC / WACC" }, { en: "synergies", fr: "synergies" }],
    interview: { en: "Accounting, valuation, deal logic and concise behavioral answers.", fr: "Comptabilité, valorisation, logique de transaction et réponses comportementales concises." },
    portfolio: { en: "Use the decision sheet to practice company analysis before valuation work.", fr: "Utilise la fiche de décision pour pratiquer l'analyse d'entreprise avant la valorisation." },
  },
  "Wealth Management": {
    courses: [{ en: "Asset allocation", fr: "Allocation d'actifs" }, { en: "Risk profiling", fr: "Profil de risque" }, { en: "Bonds & equities", fr: "Obligations & actions" }, { en: "Portfolio construction", fr: "Construction de portefeuille" }],
    vocabulary: [{ en: "risk tolerance", fr: "tolérance au risque" }, { en: "time horizon", fr: "horizon" }, { en: "diversification", fr: "diversification" }, { en: "yield", fr: "rendement" }, { en: "drawdown", fr: "drawdown" }],
    interview: { en: "Client communication, market awareness and matching portfolios to goals.", fr: "Communication client, culture marché et adéquation du portefeuille aux objectifs." },
    portfolio: { en: "Build a diversified client portfolio and justify each allocation.", fr: "Construis un portefeuille client diversifié et justifie chaque allocation." },
  },
};

const defaultGuidance: Guidance = {
  courses: [{ en: "Accounting foundations", fr: "Bases de comptabilité" }, { en: "Valuation", fr: "Valorisation" }, { en: "Markets", fr: "Marchés" }, { en: "Risk", fr: "Risque" }],
  vocabulary: [{ en: "cash flow", fr: "flux de trésorerie" }, { en: "valuation", fr: "valorisation" }, { en: "risk", fr: "risque" }, { en: "return", fr: "rendement" }],
  interview: { en: "Fundamentals, motivation and role-specific reasoning.", fr: "Fondamentaux, motivation et raisonnement spécifique au métier." },
  portfolio: { en: "Apply the role's logic to one concrete finance case.", fr: "Applique la logique du métier à un cas financier concret." },
};

export default function CareersPage() {
  const { isFrench, text } = useLanguage();
  const local = (value: Localized) => (isFrench ? value.fr : value.en);
  const [userId, setUserId] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [targetStage, setTargetStage] = useState("");
  const [savingTarget, setSavingTarget] = useState(false);
  const [targetStatus, setTargetStatus] = useState("");
  const guidance = useMemo(() => guidanceByRole[targetRole] ?? defaultGuidance, [targetRole]);

  useEffect(() => {
    let mounted = true;
    async function loadTarget() {
      const storedStage = window.localStorage.getItem("finance-studio-career-stage") ?? "";
      const storedRole = window.localStorage.getItem("finance-studio-target-role") ?? "";
      if (mounted) { setTargetStage(storedStage); setTargetRole(storedRole); }
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;
      setUserId(user.id);
      const { data } = await supabase.from("profiles").select("target_role").eq("user_id", user.id).maybeSingle();
      const accountRole = data?.target_role ?? storedRole;
      if (mounted) setTargetRole(accountRole);
      if (accountRole) window.localStorage.setItem("finance-studio-target-role", accountRole);
    }
    void loadTarget();
    return () => { mounted = false; };
  }, []);

  async function saveTargetRole(role: string) {
    if (savingTarget) return;
    setSavingTarget(true);
    setTargetStatus("");
    setTargetRole(role);
    window.localStorage.setItem("finance-studio-target-role", role);
    window.dispatchEvent(new CustomEvent("finance-studio-career-change", { detail: { role, stage: targetStage } }));
    if (userId) {
      const supabase = createClient();
      const { error } = await supabase.from("profiles").update({ target_role: role, updated_at: new Date().toISOString() }).eq("user_id", userId);
      if (error) setTargetStatus(text("Saved on this device, but your account target could not be updated.", "Enregistré sur cet appareil, mais ton compte n'a pas pu être mis à jour."));
      else setTargetStatus(text(`${role} is now your target role across FinanceStudio.`, `${role} est maintenant ton métier cible dans FinanceStudio.`));
    } else {
      setTargetStatus(text(`${role} is now your local target. Sign in to sync it to your account.`, `${role} est maintenant ton objectif sur cet appareil. Connecte-toi pour le synchroniser.`));
    }
    setSavingTarget(false);
  }

  function chooseStage(stage: string) {
    setTargetStage(stage);
    if (stage) window.localStorage.setItem("finance-studio-career-stage", stage);
    else window.localStorage.removeItem("finance-studio-career-stage");
    window.dispatchEvent(new CustomEvent("finance-studio-career-change", { detail: { role: targetRole, stage } }));
  }

  async function clearEverything() {
    if (savingTarget) return;
    setSavingTarget(true);
    setTargetStatus("");
    window.localStorage.removeItem("finance-studio-career-stage");
    window.localStorage.removeItem("finance-studio-target-role");
    setTargetStage("");
    if (userId) {
      const supabase = createClient();
      const { error } = await supabase.from("profiles").update({ target_role: null, updated_at: new Date().toISOString() }).eq("user_id", userId);
      if (error) {
        setTargetStatus(text("The target role could not be cleared from your account.", "Le métier cible n'a pas pu être effacé de ton compte."));
        setSavingTarget(false);
        return;
      }
    }
    setTargetRole("");
    window.dispatchEvent(new CustomEvent("finance-studio-career-change", { detail: { role: "", stage: "" } }));
    setTargetStatus(text("Career preferences cleared.", "Préférences carrière effacées."));
    setSavingTarget(false);
  }

  return (
    <SectionLayout activeSlug="careers" eyebrow={{ en: "CAREERS IN FINANCE", fr: "MÉTIERS DE LA FINANCE" }} title={{ en: "Choose a career by understanding the work, not just the job title.", fr: "Choisis un métier en comprenant le travail réel, pas seulement l'intitulé du poste." }} description={{ en: "Your choice now changes recommended learning, vocabulary, interview practice and Portfolio Lab guidance across FinanceStudio.", fr: "Ton choix modifie maintenant les cours recommandés, le vocabulaire, les entretiens et les conseils du Portfolio Lab dans FinanceStudio." }}>
      <div className="workspace-stack career-v2">
        <section className="career-selection-summary">
          <div>
            <span className="mini-label">{text("YOUR CAREER TARGET", "TON OBJECTIF CARRIÈRE")}</span>
            <h2>{targetRole || text("No target role selected", "Aucun métier sélectionné")}</h2>
            <p>{targetStage ? `${text("Stage", "Niveau")} · ${local(stages.find((stage) => stage.key === targetStage)?.title ?? { en: targetStage, fr: targetStage })}` : text("No career stage selected", "Aucun niveau de carrière sélectionné")}</p>
            {targetStatus ? <p className="inline-status" role="status">{targetStatus}</p> : null}
          </div>
          <div className="career-summary-actions">
            {!userId ? <Link className="full-button" href="/login">{text("Sign in to sync", "Se connecter pour synchroniser")} →</Link> : null}
            <button className="secondary-danger-button" type="button" disabled={savingTarget || (!targetRole && !targetStage)} onClick={() => void clearEverything()}>{text("Clear everything", "Tout effacer")}</button>
          </div>
        </section>

        {targetRole ? <section className="career-personalized-path">
          <div className="panel-heading"><div><span className="mini-label">{targetStage === "intern" ? text("SUMMER ANALYST PATH", "PARCOURS SUMMER ANALYST") : text("PERSONALIZED PATH", "PARCOURS PERSONNALISÉ")}</span><h2>{text(`What FinanceStudio will prioritize for ${targetRole}`, `Ce que FinanceStudio va prioriser pour ${targetRole}`)}</h2></div><span className="connection-badge">{text("Applied across the app", "Appliqué dans toute l'app")}</span></div>
          {targetStage === "intern" ? <p>{text("Summer Analyst mode keeps the bar high on fundamentals, motivation, structured thinking and commercial awareness while avoiding senior-level expectations.", "Le mode Summer Analyst reste exigeant sur les fondamentaux, la motivation, le raisonnement structuré et la culture marché, sans attendre une expérience de senior.")}</p> : null}
          <div className="career-path-grid">
            <article><span className="control-label">{text("COURSES FIRST", "COURS PRIORITAIRES")}</span><h3>{text("Recommended learning order", "Ordre d'apprentissage conseillé")}</h3><ul>{guidance.courses.map((item) => <li key={item.en}>{local(item)}</li>)}</ul><Link href="/university">{text("Open University", "Ouvrir University")} →</Link></article>
            <article><span className="control-label">{text("VOCABULARY", "VOCABULAIRE")}</span><h3>{text("Terms to master", "Termes à maîtriser")}</h3><ul>{guidance.vocabulary.map((item) => <li key={item.en}><Link href={`/dictionary?q=${encodeURIComponent(item.en)}`}>{local(item)}</Link></li>)}</ul></article>
            <article><span className="control-label">{text("INTERVIEW", "ENTRETIEN")}</span><h3>{text("What practice will emphasize", "Ce que l'entraînement va privilégier")}</h3><p>{local(guidance.interview)}</p><Link href="/interview">{text("Practice now", "S'entraîner")} →</Link></article>
            <article><span className="control-label">{text("PORTFOLIO LAB", "PORTFOLIO LAB")}</span><h3>{text("Applied exercise", "Exercice appliqué")}</h3><p>{local(guidance.portfolio)}</p><Link href="/portfolio">{text("Open Portfolio Lab", "Ouvrir Portfolio Lab")} →</Link></article>
          </div>
        </section> : null}

        <section className="career-stage-panel">
          <div className="panel-heading"><div><span className="mini-label">{text("CAREER STAGE", "NIVEAU DE CARRIÈRE")}</span><h2>{text("Where are you trying to enter the ladder?", "À quel niveau veux-tu entrer dans la hiérarchie ?")}</h2></div><span className="connection-badge">{text("From internship to MD", "Du stage au MD")}</span></div>
          <div className="career-stage-grid">
            {stages.map((stage) => <button key={stage.key} type="button" className={targetStage === stage.key ? "career-stage-card selected" : "career-stage-card"} onClick={() => chooseStage(targetStage === stage.key ? "" : stage.key)}><span>{local(stage.timing)}</span><strong>{local(stage.title)}</strong><p>{local(stage.focus)}</p></button>)}
          </div>
        </section>

        {targetStage === "intern" ? <section className="career-personalized-path"><span className="mini-label">{text("SUMMER ANALYST TRACKS", "PARCOURS SUMMER ANALYST")}</span><h2>{text("Pick the desk you are recruiting for", "Choisis l'équipe pour laquelle tu candidates")}</h2><div className="related-row">{["Investment Banking", "Sales & Trading", "Asset Management", "Equity Research", "Wealth Management"].map((role) => <button key={role} type="button" className={targetRole === role ? "chip active" : "chip"} onClick={() => void saveTargetRole(role)}>Summer Analyst · {role}</button>)}</div></section> : null}

        {careerGroups.map((group) => (
          <section className="career-group" key={group.group.en}>
            <div className="panel-heading"><div><span className="mini-label">{text("CAREER FAMILY", "FAMILLE DE MÉTIERS")}</span><h2>{local(group.group)}</h2></div><span className="connection-badge">{group.roles.length} {text("paths", "parcours")}</span></div>
            <div className="role-grid role-grid-v2">
              {group.roles.map((item) => {
                const selected = targetRole === item.role.en;
                return <article className={selected ? "role-card selected" : "role-card"} key={item.role.en}>
                  <div className="role-card-copy"><span className="mini-label">{selected ? text("CURRENT TARGET", "OBJECTIF ACTUEL") : text("ROLE", "MÉTIER")}</span><h3>{local(item.role)}</h3><p>{local(item.mission)}</p></div>
                  <div className="role-knowledge-block"><span className="control-label">{text("KNOWLEDGE TO MASTER", "CONNAISSANCES À MAÎTRISER")}</span><div className="role-knowledge-chips">{item.knowledge.map((knowledge) => <span key={knowledge.en}>{local(knowledge)}</span>)}</div></div>
                  <div className="role-card-actions"><button className={selected ? "career-target-button selected" : "career-target-button"} type="button" disabled={savingTarget} onClick={() => selected ? void clearEverything() : void saveTargetRole(item.role.en)}>{selected ? text("Remove target role", "Retirer ce métier cible") : text("Set as target role", "Choisir comme métier cible")}</button></div>
                </article>;
              })}
            </div>
          </section>
        ))}

        <section className="career-recruiting-panel"><span className="mini-label">{text("HOW TO USE THIS PAGE", "COMMENT UTILISER CETTE PAGE")}</span><h2>{text("Role tells you what to learn. Stage tells you the depth expected.", "Le métier indique quoi apprendre. Le niveau indique jusqu'où aller.")}</h2><p>{text("An intern is expected to show foundations, curiosity and careful execution. An analyst must own the analysis. As seniority rises, judgment, communication, risk ownership and relationship management become increasingly important.", "Un stagiaire doit montrer de bonnes bases, de la curiosité et une exécution rigoureuse. Un analyst doit maîtriser l'analyse. Plus on monte en séniorité, plus le jugement, la communication, la gestion du risque et des relations deviennent importants.")}</p></section>
      </div>
    </SectionLayout>
  );
}