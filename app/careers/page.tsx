"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SectionLayout from "@/components/section-layout";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";

type Localized = { en: string; fr: string };
type CareerRole = { role: Localized; mission: Localized; knowledge: Localized[] };
type CareerGroup = { group: Localized; roles: CareerRole[] };
type CareerStage = { key: string; title: Localized; timing: Localized; focus: Localized };

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

export default function CareersPage() {
  const { isFrench, text } = useLanguage();
  const local = (value: Localized) => (isFrench ? value.fr : value.en);
  const [userId, setUserId] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [targetStage, setTargetStage] = useState("");
  const [savingTarget, setSavingTarget] = useState(false);
  const [targetStatus, setTargetStatus] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadTarget() {
      const storedStage = window.localStorage.getItem("finance-studio-career-stage") ?? "";
      if (mounted) setTargetStage(storedStage);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;
      setUserId(user.id);
      const { data } = await supabase.from("profiles").select("target_role").eq("user_id", user.id).maybeSingle();
      if (mounted) setTargetRole(data?.target_role ?? "");
    }
    void loadTarget();
    return () => { mounted = false; };
  }, []);

  async function saveTargetRole(role: string) {
    if (!userId || savingTarget) return;
    setSavingTarget(true);
    setTargetStatus("");
    const supabase = createClient();
    const { error } = await supabase.from("profiles").update({ target_role: role, updated_at: new Date().toISOString() }).eq("user_id", userId);
    if (error) setTargetStatus(text("Your target role could not be saved.", "Ton métier cible n'a pas pu être enregistré."));
    else {
      setTargetRole(role);
      setTargetStatus(text(`${role} is now your target role.`, `${role} est maintenant ton métier cible.`));
    }
    setSavingTarget(false);
  }

  function chooseStage(stage: string) {
    setTargetStage(stage);
    if (stage) window.localStorage.setItem("finance-studio-career-stage", stage);
    else window.localStorage.removeItem("finance-studio-career-stage");
  }

  async function clearEverything() {
    if (savingTarget) return;
    setSavingTarget(true);
    setTargetStatus("");
    window.localStorage.removeItem("finance-studio-career-stage");
    setTargetStage("");
    if (userId) {
      const supabase = createClient();
      const { error } = await supabase.from("profiles").update({ target_role: null, updated_at: new Date().toISOString() }).eq("user_id", userId);
      if (error) {
        setTargetStatus(text("The target role could not be cleared.", "Le métier cible n'a pas pu être effacé."));
        setSavingTarget(false);
        return;
      }
    }
    setTargetRole("");
    setTargetStatus(text("Career preferences cleared. You now have no selected target.", "Préférences carrière effacées. Tu n'as maintenant aucun métier cible sélectionné."));
    setSavingTarget(false);
  }

  return (
    <SectionLayout activeSlug="careers" eyebrow={{ en: "CAREERS IN FINANCE", fr: "MÉTIERS DE LA FINANCE" }} title={{ en: "Choose a career by understanding the work, not just the job title.", fr: "Choisis un métier en comprenant le travail réel, pas seulement l'intitulé du poste." }} description={{ en: "Compare finance paths, the knowledge each role demands and the seniority stage you are targeting. FinanceStudio can then personalize learning and interview practice around that choice.", fr: "Compare les métiers de la finance, les connaissances exigées et le niveau de séniorité visé. FinanceStudio peut ensuite personnaliser l'apprentissage et les entretiens autour de ce choix." }}>
      <div className="workspace-stack career-v2">
        <section className="career-selection-summary">
          <div>
            <span className="mini-label">{text("YOUR CAREER TARGET", "TON OBJECTIF CARRIÈRE")}</span>
            <h2>{targetRole || text("No target role selected", "Aucun métier sélectionné")}</h2>
            <p>{targetStage ? `${text("Stage", "Niveau")} · ${local(stages.find((stage) => stage.key === targetStage)?.title ?? { en: targetStage, fr: targetStage })}` : text("No career stage selected", "Aucun niveau de carrière sélectionné")}</p>
            {targetStatus ? <p className="inline-status" role="status">{targetStatus}</p> : null}
          </div>
          <div className="career-summary-actions">
            {!userId ? <Link className="full-button" href="/login">{text("Sign in to save", "Se connecter pour sauvegarder")} →</Link> : null}
            <button className="secondary-danger-button" type="button" disabled={savingTarget || (!targetRole && !targetStage)} onClick={() => void clearEverything()}>{text("Clear everything", "Tout effacer")}</button>
          </div>
        </section>

        <section className="career-stage-panel">
          <div className="panel-heading"><div><span className="mini-label">{text("CAREER STAGE", "NIVEAU DE CARRIÈRE")}</span><h2>{text("Where are you trying to enter the ladder?", "À quel niveau veux-tu entrer dans la hiérarchie ?")}</h2></div><span className="connection-badge">{text("From internship to MD", "Du stage au MD")}</span></div>
          <div className="career-stage-grid">
            {stages.map((stage) => <button key={stage.key} type="button" className={targetStage === stage.key ? "career-stage-card selected" : "career-stage-card"} onClick={() => chooseStage(targetStage === stage.key ? "" : stage.key)}><span>{local(stage.timing)}</span><strong>{local(stage.title)}</strong><p>{local(stage.focus)}</p></button>)}
          </div>
        </section>

        {careerGroups.map((group) => (
          <section className="career-group" key={group.group.en}>
            <div className="panel-heading"><div><span className="mini-label">{text("CAREER FAMILY", "FAMILLE DE MÉTIERS")}</span><h2>{local(group.group)}</h2></div><span className="connection-badge">{group.roles.length} {text("paths", "parcours")}</span></div>
            <div className="role-grid role-grid-v2">
              {group.roles.map((item) => {
                const selected = targetRole === item.role.en;
                return <article className={selected ? "role-card selected" : "role-card"} key={item.role.en}>
                  <div className="role-card-copy"><span className="mini-label">{selected ? text("CURRENT TARGET", "OBJECTIF ACTUEL") : text("ROLE", "MÉTIER")}</span><h3>{local(item.role)}</h3><p>{local(item.mission)}</p></div>
                  <div className="role-knowledge-block"><span className="control-label">{text("KNOWLEDGE TO MASTER", "CONNAISSANCES À MAÎTRISER")}</span><div className="role-knowledge-chips">{item.knowledge.map((knowledge) => <span key={knowledge.en}>{local(knowledge)}</span>)}</div></div>
                  <div className="role-card-actions">{userId ? <button className={selected ? "career-target-button selected" : "career-target-button"} type="button" disabled={savingTarget} onClick={() => selected ? void clearEverything() : void saveTargetRole(item.role.en)}>{selected ? text("Remove target role", "Retirer ce métier cible") : text("Set as target role", "Choisir comme métier cible")}</button> : <Link className="career-target-button" href="/login">{text("Sign in to select", "Se connecter pour choisir")}</Link>}</div>
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
