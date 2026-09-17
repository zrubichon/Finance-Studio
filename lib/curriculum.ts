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
  domain: CurriculumDomain;
};

export type CurriculumYear = {
  year: string;
  name: string;
  outcome: string;
  modules: CurriculumModule[];
};

export const curriculumYears: CurriculumYear[] = [
  {
    year: "Year 1",
    name: "Foundations",
    outcome: "Understand the financial system, core instruments, accounting language, economics and quantitative foundations.",
    modules: [
      { title: "Financial system & market structure", domain: "Markets & Instruments" },
      { title: "Stocks, bonds, ETFs & funds", domain: "Markets & Instruments" },
      { title: "Money, banking & central banks", domain: "Macro & Economics" },
      { title: "Time value of money", domain: "Corporate Finance & Valuation" },
      { title: "Risk, return & diversification", domain: "Portfolio & Risk" },
      { title: "Microeconomics for finance", domain: "Macro & Economics" },
      { title: "Macroeconomics for markets", domain: "Macro & Economics" },
      { title: "Financial accounting I", domain: "Accounting & Statements" },
      { title: "Statistics & probability", domain: "Portfolio & Risk" },
      { title: "Excel foundations for finance", domain: "Corporate Finance & Valuation" },
      { title: "Financial vocabulary FR ↔ EN", domain: "Professional Vocabulary" },
      { title: "Reading financial news", domain: "Interview Readiness" },
    ],
  },
  {
    year: "Year 2",
    name: "Core Finance",
    outcome: "Build the technical core used in valuation, portfolio analysis, fixed income, derivatives and corporate finance.",
    modules: [
      { title: "Corporate finance", domain: "Corporate Finance & Valuation" },
      { title: "Financial statement analysis", domain: "Accounting & Statements" },
      { title: "Equity valuation", domain: "Corporate Finance & Valuation" },
      { title: "DCF & relative valuation", domain: "Corporate Finance & Valuation" },
      { title: "Fixed income & yield curves", domain: "Markets & Instruments" },
      { title: "Duration & convexity", domain: "Markets & Instruments" },
      { title: "Portfolio theory & CAPM", domain: "Portfolio & Risk" },
      { title: "Derivatives foundations", domain: "Derivatives" },
      { title: "Options & option Greeks", domain: "Derivatives" },
      { title: "FX & international finance", domain: "Markets & Instruments" },
      { title: "Econometrics foundations", domain: "Macro & Economics" },
      { title: "Financial modeling I", domain: "Corporate Finance & Valuation" },
    ],
  },
  {
    year: "Year 3",
    name: "Applied Finance",
    outcome: "Apply core theory to professional roles, real securities, transactions and market decisions.",
    modules: [
      { title: "Investment banking", domain: "Interview Readiness" },
      { title: "Sales & Trading", domain: "Interview Readiness" },
      { title: "Asset management", domain: "Portfolio & Risk" },
      { title: "Wealth management", domain: "Portfolio & Risk" },
      { title: "Equity research", domain: "Markets & Instruments" },
      { title: "Credit analysis", domain: "Markets & Instruments" },
      { title: "Private equity", domain: "Corporate Finance & Valuation" },
      { title: "Venture capital", domain: "Corporate Finance & Valuation" },
      { title: "Risk management", domain: "Portfolio & Risk" },
      { title: "M&A analysis", domain: "Corporate Finance & Valuation" },
      { title: "Financial modeling II", domain: "Corporate Finance & Valuation" },
      { title: "Real-company case studies", domain: "Interview Readiness" },
    ],
  },
  {
    year: "Year 4",
    name: "Professional Finance",
    outcome: "Reach interview-ready and analyst-level fluency in advanced products, strategy and professional decision-making.",
    modules: [
      { title: "Advanced valuation", domain: "Corporate Finance & Valuation" },
      { title: "Leveraged finance", domain: "Corporate Finance & Valuation" },
      { title: "Advanced fixed income", domain: "Markets & Instruments" },
      { title: "Advanced derivatives", domain: "Derivatives" },
      { title: "Macro trading frameworks", domain: "Macro & Economics" },
      { title: "Hedge funds & alternatives", domain: "Portfolio & Risk" },
      { title: "Portfolio construction", domain: "Portfolio & Risk" },
      { title: "Behavioral finance", domain: "Portfolio & Risk" },
      { title: "Structured products", domain: "Derivatives" },
      { title: "Regulation & ethics", domain: "Professional Vocabulary" },
      { title: "Professional market communication", domain: "Professional Vocabulary" },
      { title: "Capstone investment / deal case", domain: "Interview Readiness" },
    ],
  },
];

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
