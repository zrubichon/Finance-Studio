export type LearningBridgeInput = {
  title?: string;
  topics?: string[];
  assets?: string[];
};

export type LearningRecommendation = {
  slug: string;
  titleEn: string;
  titleFr: string;
  reasonEn: string;
  reasonFr: string;
};

const recommendations: Array<{
  keywords: string[];
  topics?: string[];
  assets?: string[];
  recommendation: LearningRecommendation;
}> = [
  {
    keywords: ["fed", "ecb", "central bank", "rate decision", "monetary policy", "inflation", "cpi", "jobs", "payroll", "growth", "gdp"],
    topics: ["macro", "central-banks"],
    recommendation: {
      slug: "year-1-macroeconomics-for-markets",
      titleEn: "Macroeconomics for Markets",
      titleFr: "Macroéconomie pour les marchés",
      reasonEn: "Connect macro data and policy expectations to rates, FX, equities and credit.",
      reasonFr: "Relie les données macro et les attentes de politique monétaire aux taux, FX, actions et crédit.",
    },
  },
  {
    keywords: ["yield", "treasury", "bond", "sovereign", "curve", "duration", "rates"],
    assets: ["rates", "bonds", "treasuries", "sovereign debt"],
    recommendation: {
      slug: "year-2-fixed-income-yield-curves",
      titleEn: "Fixed Income & Yield Curves",
      titleFr: "Fixed Income & courbes de taux",
      reasonEn: "Understand how yields, curves, policy expectations and bond prices interact.",
      reasonFr: "Comprends comment yields, courbes, attentes de politique et prix obligataires interagissent.",
    },
  },
  {
    keywords: ["currency", "dollar", "euro", "yen", "fx", "foreign exchange"],
    assets: ["fx", "currencies", "usd", "eur", "jpy"],
    recommendation: {
      slug: "year-2-fx-international-finance",
      titleEn: "FX & International Finance",
      titleFr: "FX & finance internationale",
      reasonEn: "Connect rate differentials, capital flows and macro surprises to currencies.",
      reasonFr: "Relie différentiels de taux, flux de capitaux et surprises macro aux devises.",
    },
  },
  {
    keywords: ["option", "volatility", "vix", "implied volatility", "gamma", "delta", "vega"],
    assets: ["volatility", "options"],
    recommendation: {
      slug: "year-2-options-option-greeks",
      titleEn: "Options & Option Greeks",
      titleFr: "Options & Greeks",
      reasonEn: "Translate volatility and nonlinear market moves into delta, gamma, vega and hedging intuition.",
      reasonFr: "Traduis volatilité et mouvements non linéaires en intuition delta, gamma, vega et hedging.",
    },
  },
  {
    keywords: ["earnings", "revenue", "margin", "guidance", "equity", "stock", "shares"],
    topics: ["companies"],
    assets: ["equities", "stocks"],
    recommendation: {
      slug: "year-3-equity-research",
      titleEn: "Equity Research",
      titleFr: "Equity Research",
      reasonEn: "Turn company news into an earnings, expectations, valuation and catalyst framework.",
      reasonFr: "Transforme l’actualité d’entreprise en framework earnings, attentes, valorisation et catalysts.",
    },
  },
  {
    keywords: ["merger", "acquisition", "takeover", "m&a", "ipo", "capital raise", "deal"],
    topics: ["companies"],
    recommendation: {
      slug: "year-3-investment-banking",
      titleEn: "Investment Banking",
      titleFr: "Investment Banking",
      reasonEn: "Understand transaction logic, valuation, financing and deal execution.",
      reasonFr: "Comprends logique de transaction, valorisation, financement et exécution d’un deal.",
    },
  },
  {
    keywords: ["credit spread", "default", "rating", "high yield", "investment grade", "debt"],
    assets: ["credit", "corporate bonds"],
    recommendation: {
      slug: "year-3-credit-analysis",
      titleEn: "Credit Analysis",
      titleFr: "Analyse crédit",
      reasonEn: "Connect leverage, cash generation, spreads and downside protection.",
      reasonFr: "Relie levier, génération de cash, spreads et protection contre le downside.",
    },
  },
  {
    keywords: ["portfolio", "allocation", "fund", "asset manager", "flows", "positioning"],
    recommendation: {
      slug: "year-3-asset-management",
      titleEn: "Asset Management",
      titleFr: "Asset Management",
      reasonEn: "Frame market news through positioning, benchmark risk, portfolio construction and expected return.",
      reasonFr: "Lis l’actualité via positioning, benchmark risk, construction de portefeuille et rendement attendu.",
    },
  },
  {
    keywords: ["regulation", "regulator", "sec", "antitrust", "rule", "law", "policy"],
    topics: ["policy"],
    recommendation: {
      slug: "year-4-regulation-ethics",
      titleEn: "Regulation & Ethics",
      titleFr: "Réglementation & éthique",
      reasonEn: "Connect regulatory change to incentives, market structure, conduct and financial risk.",
      reasonFr: "Relie changement réglementaire, incitations, market structure, conduite et risque financier.",
    },
  },
  {
    keywords: ["geopolit", "war", "sanction", "tariff", "trade tension", "oil", "energy"],
    topics: ["geopolitics"],
    recommendation: {
      slug: "year-4-macro-trading-frameworks",
      titleEn: "Macro Trading Frameworks",
      titleFr: "Frameworks de macro trading",
      reasonEn: "Map geopolitical shocks through growth, inflation, policy, commodities, FX and risk premia.",
      reasonFr: "Cartographie les chocs géopolitiques via croissance, inflation, politique, commodities, FX et risk premia.",
    },
  },
];

const fallbackRecommendation: LearningRecommendation = {
  slug: "year-1-reading-financial-news",
  titleEn: "Reading Financial News",
  titleFr: "Lire et comprendre l’actualité financière",
  reasonEn: "Use a repeatable framework to separate facts, expectations, transmission, price action and next catalysts.",
  reasonFr: "Utilise un framework répétable pour séparer faits, attentes, transmission, price action et prochains catalysts.",
};

function normalize(values: string[] | undefined) {
  return (values ?? []).map((value) => value.toLowerCase());
}

export function recommendLesson(input: LearningBridgeInput): LearningRecommendation {
  const title = (input.title ?? "").toLowerCase();
  const topics = normalize(input.topics);
  const assets = normalize(input.assets);

  let best: { score: number; recommendation: LearningRecommendation } | null = null;

  for (const candidate of recommendations) {
    let score = 0;
    for (const keyword of candidate.keywords) {
      if (title.includes(keyword)) score += 3;
    }
    for (const topic of candidate.topics ?? []) {
      if (topics.includes(topic.toLowerCase())) score += 2;
    }
    for (const asset of candidate.assets ?? []) {
      if (assets.some((value) => value.includes(asset.toLowerCase()) || asset.toLowerCase().includes(value))) score += 2;
    }

    if (!best || score > best.score) best = { score, recommendation: candidate.recommendation };
  }

  return best && best.score > 0 ? best.recommendation : fallbackRecommendation;
}

export function professorHref(params: {
  lessonSlug: string;
  question: string;
  source?: "lesson" | "news";
}) {
  const query = new URLSearchParams({
    lesson: params.lessonSlug,
    question: params.question,
  });
  if (params.source) query.set("source", params.source);
  return `/professor?${query.toString()}`;
}
