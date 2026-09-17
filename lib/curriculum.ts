export type CurriculumDomain =
  | "Markets & Instruments"
  | "Accounting & Statements"
  | "Corporate Finance & Valuation"
  | "Portfolio & Risk"
  | "Derivatives"
  | "Macro & Economics"
  | "Interview Readiness"
  | "Professional Vocabulary";

export type CurriculumModule = {
  title: string;
  titleFr: string;
  domain: CurriculumDomain;
};

export type CurriculumYear = {
  year: string;
  yearFr: string;
  name: string;
  nameFr: string;
  outcome: string;
  outcomeFr: string;
  modules: CurriculumModule[];
};

export const curriculumYears: CurriculumYear[] = [
  {
    year: "Year 1",
    yearFr: "Année 1",
    name: "Foundations",
    nameFr: "Fondations",
    outcome: "Understand the financial system, core instruments, accounting language, economics and quantitative foundations.",
    outcomeFr: "Comprendre le système financier, les instruments fondamentaux, le langage comptable / accounting, l’économie et les bases quantitatives.",
    modules: [
      { title: "Financial system & market structure", titleFr: "Système financier & structure de marché / market structure", domain: "Markets & Instruments" },
      { title: "Stocks, bonds, ETFs & funds", titleFr: "Actions / stocks, obligations / bonds, ETF & fonds", domain: "Markets & Instruments" },
      { title: "Money, banking & central banks", titleFr: "Monnaie, banques & banques centrales / central banks", domain: "Macro & Economics" },
      { title: "Time value of money", titleFr: "Valeur temps de l’argent / time value of money", domain: "Corporate Finance & Valuation" },
      { title: "Risk, return & diversification", titleFr: "Risque / risk, rendement / return & diversification", domain: "Portfolio & Risk" },
      { title: "Microeconomics for finance", titleFr: "Microéconomie pour la finance / microeconomics", domain: "Macro & Economics" },
      { title: "Macroeconomics for markets", titleFr: "Macroéconomie pour les marchés / macroeconomics", domain: "Macro & Economics" },
      { title: "Financial accounting I", titleFr: "Comptabilité financière I / financial accounting", domain: "Accounting & Statements" },
      { title: "Statistics & probability", titleFr: "Statistiques & probabilités / statistics & probability", domain: "Portfolio & Risk" },
      { title: "Excel foundations for finance", titleFr: "Fondamentaux Excel pour la finance", domain: "Corporate Finance & Valuation" },
      { title: "Financial vocabulary FR ↔ EN", titleFr: "Vocabulaire financier FR ↔ EN", domain: "Professional Vocabulary" },
      { title: "Reading financial news", titleFr: "Lire et comprendre l’actualité financière / financial news", domain: "Interview Readiness" },
    ],
  },
  {
    year: "Year 2",
    yearFr: "Année 2",
    name: "Core Finance",
    nameFr: "Finance fondamentale / Core Finance",
    outcome: "Build the technical core used in valuation, portfolio analysis, fixed income, derivatives and corporate finance.",
    outcomeFr: "Construire le socle technique utilisé en valorisation / valuation, analyse de portefeuille / portfolio analysis, obligations / fixed income, produits dérivés / derivatives et finance d’entreprise / corporate finance.",
    modules: [
      { title: "Corporate finance", titleFr: "Finance d’entreprise / corporate finance", domain: "Corporate Finance & Valuation" },
      { title: "Financial statement analysis", titleFr: "Analyse des états financiers / financial statement analysis", domain: "Accounting & Statements" },
      { title: "Equity valuation", titleFr: "Valorisation des actions / equity valuation", domain: "Corporate Finance & Valuation" },
      { title: "DCF & relative valuation", titleFr: "DCF / discounted cash flow & valorisation relative / relative valuation", domain: "Corporate Finance & Valuation" },
      { title: "Fixed income & yield curves", titleFr: "Obligations / fixed income & courbes des taux / yield curves", domain: "Markets & Instruments" },
      { title: "Duration & convexity", titleFr: "Duration & convexité / convexity", domain: "Markets & Instruments" },
      { title: "Portfolio theory & CAPM", titleFr: "Théorie de portefeuille / portfolio theory & CAPM", domain: "Portfolio & Risk" },
      { title: "Derivatives foundations", titleFr: "Fondamentaux des produits dérivés / derivatives", domain: "Derivatives" },
      { title: "Options & option Greeks", titleFr: "Options & grecques / option Greeks", domain: "Derivatives" },
      { title: "FX & international finance", titleFr: "Devises / FX & finance internationale", domain: "Markets & Instruments" },
      { title: "Econometrics foundations", titleFr: "Fondamentaux de l’économétrie / econometrics", domain: "Macro & Economics" },
      { title: "Financial modeling I", titleFr: "Modélisation financière I / financial modeling", domain: "Corporate Finance & Valuation" },
    ],
  },
  {
    year: "Year 3",
    yearFr: "Année 3",
    name: "Applied Finance",
    nameFr: "Finance appliquée / Applied Finance",
    outcome: "Apply core theory to professional roles, real securities, transactions and market decisions.",
    outcomeFr: "Appliquer la théorie aux métiers, aux titres financiers / securities, aux transactions et aux décisions de marché réelles.",
    modules: [
      { title: "Investment banking", titleFr: "Banque d’investissement / investment banking", domain: "Interview Readiness" },
      { title: "Sales & Trading", titleFr: "Sales & Trading / vente et trading", domain: "Interview Readiness" },
      { title: "Asset management", titleFr: "Gestion d’actifs / asset management", domain: "Portfolio & Risk" },
      { title: "Wealth management", titleFr: "Gestion de fortune / wealth management", domain: "Portfolio & Risk" },
      { title: "Equity research", titleFr: "Recherche actions / equity research", domain: "Markets & Instruments" },
      { title: "Credit analysis", titleFr: "Analyse crédit / credit analysis", domain: "Markets & Instruments" },
      { title: "Private equity", titleFr: "Capital-investissement / private equity", domain: "Corporate Finance & Valuation" },
      { title: "Venture capital", titleFr: "Capital-risque / venture capital", domain: "Corporate Finance & Valuation" },
      { title: "Risk management", titleFr: "Gestion des risques / risk management", domain: "Portfolio & Risk" },
      { title: "M&A analysis", titleFr: "Analyse M&A / fusions-acquisitions", domain: "Corporate Finance & Valuation" },
      { title: "Financial modeling II", titleFr: "Modélisation financière II / financial modeling", domain: "Corporate Finance & Valuation" },
      { title: "Real-company case studies", titleFr: "Études de cas d’entreprises réelles / case studies", domain: "Interview Readiness" },
    ],
  },
  {
    year: "Year 4",
    yearFr: "Année 4",
    name: "Professional Finance",
    nameFr: "Finance professionnelle / Professional Finance",
    outcome: "Reach interview-ready and analyst-level fluency in advanced products, strategy and professional decision-making.",
    outcomeFr: "Atteindre un niveau prêt pour les entretiens / interview-ready et proche d’un analyste sur les produits avancés, la stratégie et la prise de décision professionnelle.",
    modules: [
      { title: "Advanced valuation", titleFr: "Valorisation avancée / advanced valuation", domain: "Corporate Finance & Valuation" },
      { title: "Leveraged finance", titleFr: "Finance à effet de levier / leveraged finance", domain: "Corporate Finance & Valuation" },
      { title: "Advanced fixed income", titleFr: "Obligations avancées / advanced fixed income", domain: "Markets & Instruments" },
      { title: "Advanced derivatives", titleFr: "Produits dérivés avancés / advanced derivatives", domain: "Derivatives" },
      { title: "Macro trading frameworks", titleFr: "Cadres de trading macro / macro trading frameworks", domain: "Macro & Economics" },
      { title: "Hedge funds & alternatives", titleFr: "Hedge funds & investissements alternatifs / alternatives", domain: "Portfolio & Risk" },
      { title: "Portfolio construction", titleFr: "Construction de portefeuille / portfolio construction", domain: "Portfolio & Risk" },
      { title: "Behavioral finance", titleFr: "Finance comportementale / behavioral finance", domain: "Portfolio & Risk" },
      { title: "Structured products", titleFr: "Produits structurés / structured products", domain: "Derivatives" },
      { title: "Regulation & ethics", titleFr: "Réglementation / regulation & éthique / ethics", domain: "Professional Vocabulary" },
      { title: "Professional market communication", titleFr: "Communication professionnelle de marché / market communication", domain: "Professional Vocabulary" },
      { title: "Capstone investment / deal case", titleFr: "Cas final d’investissement / deal case", domain: "Interview Readiness" },
    ],
  },
];

export const domainLabelsFr: Record<CurriculumDomain, string> = {
  "Markets & Instruments": "Marchés & instruments / markets & instruments",
  "Accounting & Statements": "Comptabilité & états financiers / accounting & statements",
  "Corporate Finance & Valuation": "Finance d’entreprise & valorisation / corporate finance & valuation",
  "Portfolio & Risk": "Portefeuille & risque / portfolio & risk",
  Derivatives: "Produits dérivés / derivatives",
  "Macro & Economics": "Macro & économie / macro & economics",
  "Interview Readiness": "Préparation entretien / interview readiness",
  "Professional Vocabulary": "Vocabulaire professionnel / professional vocabulary",
};

export const domainDescriptions: Record<CurriculumDomain, string> = {
  "Markets & Instruments": "Equities, fixed income, FX, commodities and market structure",
  "Accounting & Statements": "Income statement, balance sheet, cash flow and analysis",
  "Corporate Finance & Valuation": "TVM, WACC, DCF, comps, capital structure and M&A",
  "Portfolio & Risk": "Diversification, CAPM, allocation, attribution and risk measures",
  Derivatives: "Forwards, futures, options, Greeks and hedging",
  "Macro & Economics": "Inflation, growth, central banks, cycles and cross-asset links",
  "Interview Readiness": "Technical, behavioral, markets, math and case practice",
  "Professional Vocabulary": "Bilingual English/French finance terminology",
};

export const domainDescriptionsFr: Record<CurriculumDomain, string> = {
  "Markets & Instruments": "Actions / equities, obligations / fixed income, devises / FX, matières premières / commodities et structure de marché / market structure",
  "Accounting & Statements": "Compte de résultat / income statement, bilan / balance sheet, flux de trésorerie / cash flow et analyse",
  "Corporate Finance & Valuation": "TVM, WACC, DCF, comparables / comps, structure du capital / capital structure et M&A",
  "Portfolio & Risk": "Diversification, CAPM, allocation, attribution et mesures de risque / risk measures",
  Derivatives: "Forwards, futures, options, grecques / Greeks et couverture / hedging",
  "Macro & Economics": "Inflation, croissance / growth, banques centrales / central banks, cycles et liens multi-actifs / cross-asset",
  "Interview Readiness": "Questions techniques, comportementales / behavioral, marchés, calcul et études de cas / cases",
  "Professional Vocabulary": "Terminologie financière bilingue français / English",
};

export function moduleSlug(year: string, title: string) {
  return `${year}-${title}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function allCurriculumModules() {
  return curriculumYears.flatMap((year) =>
    year.modules.map((module) => ({ ...module, year: year.year, yearName: year.name, slug: moduleSlug(year.year, module.title) }))
  );
}
