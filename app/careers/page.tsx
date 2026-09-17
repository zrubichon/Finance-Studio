"use client";

import SectionLayout from "@/components/section-layout";
import { useLanguage } from "@/components/language-provider";

type Localized = { en: string; fr: string };

const careerGroups: { group: Localized; roles: { role: Localized; mission: Localized; knowledge: Localized[] }[] }[] = [
  {
    group: { en: "Markets & Investing", fr: "Marchés & Investissement / Markets & Investing" },
    roles: [
      { role: { en: "Sales & Trading", fr: "Sales & Trading / vente et trading" }, mission: { en: "Price risk, execute client flow and understand how macro information moves markets.", fr: "Pricer le risque / price risk, exécuter les flux clients / client flow et comprendre comment l’information macro fait bouger les marchés." }, knowledge: [{ en: "Rates", fr: "Taux / rates" }, { en: "FX", fr: "Devises / FX" }, { en: "Credit", fr: "Crédit / credit" }, { en: "Equities", fr: "Actions / equities" }, { en: "Derivatives", fr: "Produits dérivés / derivatives" }, { en: "Market microstructure", fr: "Microstructure de marché / market microstructure" }] },
      { role: { en: "Asset Management", fr: "Gestion d’actifs / asset management" }, mission: { en: "Allocate capital, research securities and build portfolios around client objectives and risk budgets.", fr: "Allouer le capital, analyser les titres / securities et construire des portefeuilles autour des objectifs clients et des budgets de risque / risk budgets." }, knowledge: [{ en: "Portfolio theory", fr: "Théorie de portefeuille / portfolio theory" }, { en: "Valuation", fr: "Valorisation / valuation" }, { en: "Macro", fr: "Macro" }, { en: "Risk", fr: "Risque / risk" }, { en: "Performance attribution", fr: "Attribution de performance / performance attribution" }, { en: "Research", fr: "Recherche / research" }] },
      { role: { en: "Equity Research", fr: "Recherche actions / equity research" }, mission: { en: "Develop differentiated views on companies, earnings and valuation, then communicate the investment case clearly.", fr: "Développer une opinion différenciante sur les entreprises, leurs résultats / earnings et leur valorisation, puis communiquer clairement le cas d’investissement / investment case." }, knowledge: [{ en: "Accounting", fr: "Comptabilité / accounting" }, { en: "Valuation", fr: "Valorisation / valuation" }, { en: "Industry research", fr: "Recherche sectorielle / industry research" }, { en: "Modeling", fr: "Modélisation / modeling" }, { en: "Earnings", fr: "Résultats / earnings" }, { en: "Writing", fr: "Rédaction / writing" }] },
      { role: { en: "Hedge Funds", fr: "Hedge funds" }, mission: { en: "Generate and manage investment ideas with explicit catalysts, downside cases and portfolio-level risk constraints.", fr: "Générer et gérer des idées d’investissement avec des catalyseurs explicites, des scénarios baissiers / downside cases et des contraintes de risque au niveau du portefeuille." }, knowledge: [{ en: "Security analysis", fr: "Analyse de titres / security analysis" }, { en: "Catalysts", fr: "Catalyseurs / catalysts" }, { en: "Risk", fr: "Risque / risk" }, { en: "Derivatives", fr: "Produits dérivés / derivatives" }, { en: "Macro", fr: "Macro" }, { en: "Position sizing", fr: "Dimensionnement de position / position sizing" }] },
    ],
  },
  {
    group: { en: "Deals & Private Capital", fr: "Transactions & Capital privé / Deals & Private Capital" },
    roles: [
      { role: { en: "Investment Banking", fr: "Banque d’investissement / investment banking" }, mission: { en: "Advise companies on M&A, capital raising and strategic transactions while building rigorous financial analysis.", fr: "Conseiller les entreprises sur les M&A / fusions-acquisitions, les levées de capitaux / capital raising et les transactions stratégiques avec une analyse financière rigoureuse." }, knowledge: [{ en: "Accounting", fr: "Comptabilité / accounting" }, { en: "DCF", fr: "DCF / discounted cash flow" }, { en: "Comps", fr: "Comparables / comps" }, { en: "M&A", fr: "Fusions-acquisitions / M&A" }, { en: "Debt", fr: "Dette / debt" }, { en: "Financial modeling", fr: "Modélisation financière / financial modeling" }] },
      { role: { en: "Private Equity", fr: "Capital-investissement / private equity" }, mission: { en: "Acquire businesses, use leverage thoughtfully and create value through operations, capital structure and exit strategy.", fr: "Acquérir des entreprises, utiliser l’effet de levier / leverage avec discipline et créer de la valeur via les opérations, la structure du capital / capital structure et la stratégie de sortie / exit strategy." }, knowledge: [{ en: "LBO", fr: "LBO / leveraged buyout" }, { en: "Debt capacity", fr: "Capacité d’endettement / debt capacity" }, { en: "Cash flow", fr: "Flux de trésorerie / cash flow" }, { en: "Valuation", fr: "Valorisation / valuation" }, { en: "IRR / MOIC", fr: "IRR / MOIC" }, { en: "Due diligence", fr: "Due diligence / audit d’acquisition" }] },
      { role: { en: "Venture Capital", fr: "Capital-risque / venture capital" }, mission: { en: "Evaluate early-stage companies, markets, founders and asymmetric upside with limited historical financial data.", fr: "Évaluer des entreprises early-stage, leurs marchés, leurs fondateurs et leur potentiel asymétrique avec peu de données financières historiques." }, knowledge: [{ en: "Market sizing", fr: "Taille de marché / market sizing" }, { en: "Unit economics", fr: "Économie unitaire / unit economics" }, { en: "Cap tables", fr: "Tables de capitalisation / cap tables" }, { en: "Product", fr: "Produit / product" }, { en: "Growth", fr: "Croissance / growth" }, { en: "Portfolio construction", fr: "Construction de portefeuille / portfolio construction" }] },
    ],
  },
  {
    group: { en: "Clients, Companies & Risk", fr: "Clients, Entreprises & Risque / Clients, Companies & Risk" },
    roles: [
      { role: { en: "Wealth Management", fr: "Gestion de fortune / wealth management" }, mission: { en: "Translate financial markets into long-term plans that fit a client’s goals, constraints and behavior.", fr: "Transformer les marchés financiers en plans de long terme adaptés aux objectifs, contraintes et comportements du client." }, knowledge: [{ en: "Asset allocation", fr: "Allocation d’actifs / asset allocation" }, { en: "Tax awareness", fr: "Fiscalité / tax awareness" }, { en: "Risk profiling", fr: "Profilage du risque / risk profiling" }, { en: "Client communication", fr: "Communication client" }, { en: "Retirement", fr: "Retraite / retirement" }, { en: "Estate basics", fr: "Bases patrimoniales / estate basics" }] },
      { role: { en: "Corporate Finance / FP&A", fr: "Finance d’entreprise / Corporate Finance & FP&A" }, mission: { en: "Help a company plan, budget, allocate capital and understand the financial consequences of operating decisions.", fr: "Aider une entreprise à planifier, budgéter, allouer son capital et comprendre les conséquences financières de ses décisions opérationnelles." }, knowledge: [{ en: "Budgeting", fr: "Budgétisation / budgeting" }, { en: "Forecasting", fr: "Prévisions / forecasting" }, { en: "KPIs", fr: "Indicateurs / KPIs" }, { en: "Cash flow", fr: "Flux de trésorerie / cash flow" }, { en: "Variance analysis", fr: "Analyse des écarts / variance analysis" }, { en: "Capital allocation", fr: "Allocation du capital / capital allocation" }] },
      { role: { en: "Risk Management", fr: "Gestion des risques / risk management" }, mission: { en: "Measure, challenge and monitor market, credit, liquidity and operational risks before losses become surprises.", fr: "Mesurer, challenger et surveiller les risques de marché, crédit, liquidité / liquidity et opérationnels avant qu’ils ne deviennent des pertes inattendues." }, knowledge: [{ en: "VaR", fr: "VaR / value at risk" }, { en: "Stress tests", fr: "Tests de résistance / stress tests" }, { en: "Credit risk", fr: "Risque de crédit / credit risk" }, { en: "Liquidity", fr: "Liquidité / liquidity" }, { en: "Limits", fr: "Limites / limits" }, { en: "Scenario analysis", fr: "Analyse de scénarios / scenario analysis" }] },
    ],
  },
];

const recruitingStack: Localized[] = [
  { en: "Understand what the team actually does", fr: "Comprendre ce que l’équipe fait réellement" },
  { en: "Master the technical foundation for that role", fr: "Maîtriser les fondamentaux techniques du métier" },
  { en: "Know current markets and one recent relevant event", fr: "Connaître les marchés actuels et au moins un événement récent pertinent" },
  { en: "Prepare behavioral stories with evidence", fr: "Préparer des exemples comportementaux / behavioral stories avec des preuves" },
  { en: "Practice concise answers under follow-up pressure", fr: "S’entraîner à répondre de façon concise sous la pression des relances / follow-ups" },
  { en: "Build role-specific vocabulary in English and French", fr: "Construire le vocabulaire spécifique au métier en français / English" },
];

export default function CareersPage() {
  const { isFrench, text } = useLanguage();
  const local = (value: Localized) => isFrench ? value.fr : value.en;

  return (
    <SectionLayout
      activeSlug="careers"
      eyebrow={{ en: "CAREERS IN FINANCE", fr: "MÉTIERS DE LA FINANCE" }}
      title={{ en: "Choose a career by understanding the work, not just the job title.", fr: "Choisis un métier en comprenant le travail réel, pas seulement l’intitulé du poste." }}
      description={{ en: "Each path connects day-to-day responsibilities, technical knowledge, market awareness, recruiting expectations and the exact FinanceStudio modules you should master before interviewing.", fr: "Chaque parcours relie les responsabilités quotidiennes, les connaissances techniques, la culture marché / market awareness, les attentes de recrutement et les modules FinanceStudio à maîtriser avant un entretien." }}
    >
      <div className="workspace-stack">
        <section className="career-intro-grid">
          <article className="career-principle-card"><span className="mini-label">{text("ROLE MAP", "CARTE DES MÉTIERS")}</span><h2>{text("Markets, deals, investing, clients and control functions", "Marchés, transactions / deals, investissement, clients et fonctions de contrôle")}</h2><p>{text("FinanceStudio separates careers by the decisions you make, the clients you serve and the risks you own so that similar-sounding roles do not blur together.", "FinanceStudio distingue les métiers selon les décisions prises, les clients servis et les risques gérés afin que des postes aux noms proches ne soient pas confondus.")}</p></article>
          <article className="career-principle-card"><span className="mini-label">{text("LEARNING PATH", "PARCOURS D’APPRENTISSAGE")}</span><h2>{text("Every role links back to the curriculum", "Chaque métier est relié au programme")}</h2><p>{text("Your career target will prioritize the courses, quizzes, news and interview questions that matter most for that path.", "Ton métier cible permettra de prioriser les cours, quiz, actualités et questions d’entretien les plus utiles pour ce parcours.")}</p></article>
        </section>

        {careerGroups.map((group) => <section className="career-group" key={group.group.en}><div className="panel-heading"><div><span className="mini-label">{text("CAREER FAMILY", "FAMILLE DE MÉTIERS")}</span><h2>{local(group.group)}</h2></div><span className="connection-badge">{isFrench ? `${group.roles.length} parcours` : `${group.roles.length} paths`}</span></div><div className="role-grid">{group.roles.map((item) => <article className="role-card" key={item.role.en}><h3>{local(item.role)}</h3><p>{local(item.mission)}</p><span className="control-label">{text("KNOWLEDGE TO MASTER", "CONNAISSANCES À MAÎTRISER")}</span><div className="skill-chip-row">{item.knowledge.map((skill) => <span key={skill.en}>{local(skill)}</span>)}</div></article>)}</div></section>)}

        <section className="career-recruiting-panel"><div><span className="mini-label">{text("RECRUITING SYSTEM", "SYSTÈME DE PRÉPARATION AU RECRUTEMENT")}</span><h2>{text("From “I want a finance job” to interview-ready", "De « je veux travailler en finance » à prêt pour l’entretien / interview-ready")}</h2><p>{text("The platform turns a target role into a concrete preparation sequence rather than a random list of concepts.", "La plateforme transforme un métier cible en séquence de préparation concrète plutôt qu’en liste aléatoire de concepts.")}</p></div><div className="numbered-checklist">{recruitingStack.map((item, index) => <div key={item.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{local(item)}</strong></div>)}</div></section>
      </div>
    </SectionLayout>
  );
}
