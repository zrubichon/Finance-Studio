export type Track =
  | "Investment Banking"
  | "Sales & Trading"
  | "Asset Management"
  | "Wealth Management"
  | "Private Equity"
  | "Equity Research";

export type Bilingual = { en: string; fr: string };

export type InterviewQuestion = {
  question: Bilingual;
  tests: Bilingual;
  framework: Bilingual[];
  followUp: Bilingual;
};

export const interviewTracks: { key: Track; fr: string }[] = [
  { key: "Investment Banking", fr: "Banque d’investissement / investment banking" },
  { key: "Sales & Trading", fr: "Sales & Trading / vente et trading" },
  { key: "Asset Management", fr: "Gestion d’actifs / asset management" },
  { key: "Wealth Management", fr: "Gestion de fortune / wealth management" },
  { key: "Private Equity", fr: "Capital-investissement / private equity" },
  { key: "Equity Research", fr: "Recherche actions / equity research" },
];

export const interviewQuestions: Record<Track, InterviewQuestion> = {
  "Investment Banking": {
    question: {
      en: "Walk me through a DCF.",
      fr: "Explique-moi un DCF / discounted cash flow.",
    },
    tests: {
      en: "Valuation logic, enterprise/equity value bridge, discounting and ability to structure a technical answer.",
      fr: "Logique de valorisation / valuation, passage valeur d’entreprise / enterprise value vers valeur des capitaux propres / equity value, actualisation / discounting et capacité à structurer une réponse technique.",
    },
    framework: [
      { en: "Forecast unlevered free cash flow", fr: "Prévoir le flux de trésorerie disponible non endetté / unlevered free cash flow" },
      { en: "Estimate WACC", fr: "Estimer le WACC / coût moyen pondéré du capital" },
      { en: "Calculate terminal value", fr: "Calculer la valeur terminale / terminal value" },
      { en: "Discount cash flows to present value", fr: "Actualiser les flux de trésorerie / discount cash flows" },
      { en: "Derive enterprise value", fr: "Déduire la valeur d’entreprise / enterprise value" },
      { en: "Bridge to equity value", fr: "Passer à la valeur des capitaux propres / equity value" },
    ],
    followUp: {
      en: "What happens to a DCF valuation if WACC rises by 100 bps?",
      fr: "Que se passe-t-il pour la valorisation DCF si le WACC augmente de 100 points de base / basis points ?",
    },
  },
  "Sales & Trading": {
    question: {
      en: "The US 10-year yield rises sharply after CPI. Walk me through the cross-asset impact.",
      fr: "Le rendement du Treasury US 10 ans / US 10-year yield monte fortement après le CPI. Explique l’impact multi-actifs / cross-asset.",
    },
    tests: {
      en: "Rates intuition, expectations, equity duration, FX, positioning and ability to separate first-order from second-order effects.",
      fr: "Intuition sur les taux / rates, anticipations / expectations, duration des actions / equity duration, devises / FX, positionnement et capacité à distinguer les effets de premier et second ordre.",
    },
    framework: [
      { en: "Identify the CPI surprise", fr: "Identifier la surprise du CPI / inflation report" },
      { en: "Translate it into Fed expectations", fr: "La traduire en anticipations Fed / Fed expectations" },
      { en: "Explain the Treasury move", fr: "Expliquer le mouvement des Treasuries" },
      { en: "Discuss USD reaction", fr: "Analyser la réaction du dollar / USD" },
      { en: "Discuss equity sectors", fr: "Analyser les secteurs actions / equity sectors" },
      { en: "State what could reverse the move", fr: "Identifier ce qui pourrait inverser le mouvement" },
    ],
    followUp: {
      en: "Why might equities rally even if yields initially rise?",
      fr: "Pourquoi les actions / equities pourraient-elles monter même si les rendements / yields augmentent d’abord ?",
    },
  },
  "Asset Management": {
    question: {
      en: "You have $10 million to invest. How would you build the portfolio?",
      fr: "Tu as 10 millions de dollars à investir. Comment construirais-tu le portefeuille / portfolio ?",
    },
    tests: {
      en: "Objectives, risk budget, asset allocation, diversification, liquidity and disciplined reasoning rather than stock picking alone.",
      fr: "Objectifs, budget de risque / risk budget, allocation d’actifs / asset allocation, diversification, liquidité / liquidity et raisonnement discipliné plutôt qu’un simple stock picking.",
    },
    framework: [
      { en: "Define objective and horizon", fr: "Définir l’objectif et l’horizon" },
      { en: "Set risk and liquidity constraints", fr: "Fixer les contraintes de risque et de liquidité / liquidity" },
      { en: "Choose strategic asset allocation", fr: "Choisir l’allocation stratégique / strategic asset allocation" },
      { en: "Select implementation vehicles", fr: "Choisir les véhicules d’investissement / implementation vehicles" },
      { en: "Define rebalancing rules", fr: "Définir les règles de rééquilibrage / rebalancing" },
      { en: "State key risks", fr: "Présenter les principaux risques / key risks" },
    ],
    followUp: {
      en: "How would your answer change if inflation remains structurally high?",
      fr: "Comment ta réponse changerait-elle si l’inflation restait structurellement élevée ?",
    },
  },
  "Wealth Management": {
    question: {
      en: "A client wants high returns but says they cannot tolerate losses. How do you respond?",
      fr: "Un client veut un rendement élevé / high return mais dit ne tolérer aucune perte. Comment réponds-tu ?",
    },
    tests: {
      en: "Client discovery, suitability, risk communication, behavioral finance and ability to explain trade-offs clearly.",
      fr: "Découverte client / client discovery, adéquation / suitability, communication du risque, finance comportementale / behavioral finance et capacité à expliquer clairement les compromis / trade-offs.",
    },
    framework: [
      { en: "Clarify goals", fr: "Clarifier les objectifs" },
      { en: "Separate risk capacity from risk tolerance", fr: "Distinguer capacité de risque / risk capacity et tolérance au risque / risk tolerance" },
      { en: "Explain return/risk trade-off", fr: "Expliquer le compromis rendement-risque / return-risk trade-off" },
      { en: "Propose scenarios", fr: "Proposer des scénarios" },
      { en: "Build an appropriate allocation", fr: "Construire une allocation adaptée / appropriate allocation" },
      { en: "Document and review", fr: "Documenter et revoir régulièrement" },
    ],
    followUp: {
      en: "How would you explain drawdown risk to a non-financial client?",
      fr: "Comment expliquerais-tu le risque de baisse maximale / drawdown risk à un client non financier ?",
    },
  },
  "Private Equity": {
    question: {
      en: "What makes a company attractive for an LBO?",
      fr: "Qu’est-ce qui rend une entreprise attractive pour un LBO / leveraged buyout ?",
    },
    tests: {
      en: "Cash-flow quality, leverage capacity, entry valuation, operational upside and exit assumptions.",
      fr: "Qualité des flux de trésorerie / cash flows, capacité d’endettement / leverage capacity, valorisation d’entrée / entry valuation, potentiel opérationnel et hypothèses de sortie / exit assumptions.",
    },
    framework: [
      { en: "Stable cash flow", fr: "Flux de trésorerie stable / stable cash flow" },
      { en: "Defensible business model", fr: "Modèle économique défendable / defensible business model" },
      { en: "Debt capacity", fr: "Capacité d’endettement / debt capacity" },
      { en: "Attractive entry valuation", fr: "Valorisation d’entrée attractive / entry valuation" },
      { en: "Operational improvement", fr: "Amélioration opérationnelle / operational improvement" },
      { en: "Credible exit pathways", fr: "Scénarios de sortie crédibles / exit pathways" },
    ],
    followUp: {
      en: "Which variable can have the largest impact on IRR?",
      fr: "Quelle variable peut avoir le plus grand impact sur l’IRR / taux de rendement interne ?",
    },
  },
  "Equity Research": {
    question: {
      en: "Pitch me a stock in three minutes.",
      fr: "Présente-moi une action / stock pitch en trois minutes.",
    },
    tests: {
      en: "Thesis construction, valuation, catalysts, risks and concise communication.",
      fr: "Construction de thèse / investment thesis, valorisation / valuation, catalyseurs / catalysts, risques et communication concise.",
    },
    framework: [
      { en: "One-line recommendation", fr: "Recommandation en une phrase / one-line recommendation" },
      { en: "Business model", fr: "Modèle économique / business model" },
      { en: "Variant thesis", fr: "Thèse différenciante / variant thesis" },
      { en: "Valuation", fr: "Valorisation / valuation" },
      { en: "Catalysts", fr: "Catalyseurs / catalysts" },
      { en: "Risks and disconfirming evidence", fr: "Risques et éléments invalidant la thèse / disconfirming evidence" },
    ],
    followUp: {
      en: "What would make you change your recommendation?",
      fr: "Qu’est-ce qui te ferait changer de recommandation ?",
    },
  },
};

export function interviewQuestionKey(track: Track) {
  return track
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function isInterviewTrack(value: unknown): value is Track {
  return typeof value === "string" && interviewTracks.some((track) => track.key === value);
}
