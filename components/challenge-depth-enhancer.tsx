"use client";

import { useEffect } from "react";

type Extra = { easy: string; harder: string; use: string; impact: string; formula?: string; legend?: string[] };
const extras: Record<string, { en: Extra; fr: Extra }> = {
  "WACC (Weighted Average Cost of Capital)": {
    en: { easy: "Easy intuition: WACC is the blended minimum return expected by the people financing the business. If a company is 70% equity funded at 10% and 30% debt funded at a 5% after-tax cost, its blended financing cost is 8.5%.", harder: "Harder case: if market rates rise, the cost of debt may increase and the risk-free component of the cost of equity may also rise. Even with unchanged forecasts, a DCF can fall because the denominator used to discount future cash flows is higher. Test sensitivities rather than treating WACC as one perfect number.", use: "Used in DCF valuation, capital budgeting, hurdle-rate discussions and sensitivity analysis. Analysts often build a WACC range rather than relying on one point estimate.", impact: "Higher WACC usually lowers present values and can compress valuation multiples; lower WACC does the opposite, all else equal.", formula: "WACC = E/(D+E) × Re + D/(D+E) × Rd × (1−T)", legend: ["E = Equity Value", "D = Debt", "Re = cost of equity", "Rd = pre-tax cost of debt", "T = corporate tax rate"] },
    fr: { easy: "Intuition simple : le WACC est le rendement minimum moyen exigé par ceux qui financent l’entreprise. Avec 70 % d’equity à 10 % et 30 % de dette à 5 % après impôt, le coût moyen est 8,5 %.", harder: "Cas plus difficile : si les taux de marché montent, le coût de la dette peut monter et la composante sans risque du cost of equity aussi. Même avec des forecasts inchangés, un DCF peut baisser car le taux d’actualisation augmente. Il faut donc tester des sensibilités.", use: "Utilisé en DCF, capital budgeting, hurdle rates et analyses de sensibilité. Les analystes travaillent souvent avec une fourchette de WACC.", impact: "Un WACC plus élevé réduit généralement les valeurs actuelles et peut comprimer les multiples, toutes choses égales par ailleurs.", formula: "WACC = E/(D+E) × Re + D/(D+E) × Rd × (1−T)", legend: ["E = Equity Value", "D = dette", "Re = coût des capitaux propres", "Rd = coût de la dette avant impôt", "T = taux d’impôt"] },
  },
  "EV (Enterprise Value) vs Equity Value": {
    en: { easy: "Easy intuition: Equity Value belongs to common shareholders; Enterprise Value represents the operating business financed by both shareholders and lenders. That is why debt is added and excess cash is subtracted in the simplified bridge.", harder: "Harder case: real deal bridges can also adjust for leases, preferred stock, minority interests, pensions and non-operating assets. Two companies with the same market capitalization can therefore have very different Enterprise Values and leverage profiles.", use: "Used in transaction valuation, trading comparables, precedent transactions and the bridge from a per-share equity price to total operating value.", impact: "Using the wrong numerator with the wrong earnings metric creates inconsistent multiples. EV pairs naturally with EBITDA; Equity Value pairs with net income or EPS.", formula: "EV = Equity Value + Debt − Cash", legend: ["EV = Enterprise Value", "Debt = interest-bearing financing claims", "Cash = excess cash/cash equivalents in the simplified bridge"] },
    fr: { easy: "Intuition simple : l’Equity Value appartient aux actionnaires ordinaires ; l’Enterprise Value représente l’activité financée par actionnaires et prêteurs. On ajoute donc la dette et on retire le cash excédentaire.", harder: "Cas plus difficile : un bridge de transaction réel peut aussi ajuster leases, preferred stock, minority interests, pensions et actifs non opérationnels. Deux sociétés avec la même market cap peuvent donc avoir des EV très différentes.", use: "Utilisé en valorisation de transactions, comparables boursiers, precedent transactions et bridge entre prix par action et valeur opérationnelle.", impact: "Mélanger mauvais numérateur et mauvais indicateur produit un multiple incohérent. EV va avec EBITDA ; Equity Value avec net income ou EPS.", formula: "EV = Equity Value + Dette − Cash", legend: ["EV = Enterprise Value", "Debt = dette portant intérêt", "Cash = trésorerie excédentaire dans le bridge simplifié"] },
  },
  "Duration: why bond prices move when yields move": {
    en: { easy: "A duration of 5 means a 1 percentage-point rise in yield implies roughly a 5% price fall before convexity. A 25 bps rise therefore implies about −1.25%.", harder: "Compare two bonds: duration 2 and duration 9. A +50 bps yield shock gives approximately −1% versus −4.5%. The second bond carries much more rate sensitivity even if both have the same credit quality.", use: "Used for bond risk, portfolio hedging, asset-liability management and positioning around central-bank or inflation scenarios.", impact: "Long-duration bonds and many growth equities are particularly sensitive to higher long-term discount rates.", formula: "ΔPrice ≈ −Duration × ΔYield", legend: ["ΔPrice = approximate % price move", "Duration = first-order rate sensitivity", "ΔYield = yield change in percentage points", "100 bps = 1.00 percentage point"] },
    fr: { easy: "Une duration de 5 signifie qu’une hausse de yield de 1 point implique environ −5 % de prix avant convexité. +25 bps implique donc environ −1,25 %.", harder: "Compare duration 2 et duration 9. Un choc de +50 bps donne environ −1 % contre −4,5 %. La deuxième obligation porte beaucoup plus de risque de taux.", use: "Utilisé pour mesurer le risque obligataire, hedger un portefeuille, gérer actifs/passifs et se positionner autour des banques centrales.", impact: "Les obligations longue duration et de nombreuses growth stocks sont particulièrement sensibles aux taux longs plus élevés.", formula: "ΔPrix ≈ −Duration × ΔYield", legend: ["ΔPrix = mouvement approximatif", "Duration = sensibilité de premier ordre", "ΔYield = variation en points de pourcentage", "100 bps = 1,00 point"] },
  },
  "Yield curve: what 2s10s tells you": {
    en: { easy: "If 2Y = 4.10% and 10Y = 4.55%, 2s10s = +45 bps. Positive means the 10-year yield is above the 2-year at those maturities.", harder: "If 2Y rises 20 bps but 10Y rises 60 bps, the curve bear-steepens: yields rise and the long end rises faster. That can reflect stronger growth/inflation expectations, Treasury supply or a higher term premium rather than a simple Fed repricing.", use: "Used to interpret monetary-policy expectations, recession risk, relative-value trades, bank margins and duration positioning.", impact: "Curve changes can affect banks, bond portfolios, FX and equity discount rates. Never use inversion as a precise recession clock.", formula: "2s10s = 10Y Treasury yield − 2Y Treasury yield", legend: ["2Y = 2-year Treasury yield", "10Y = 10-year Treasury yield", "bps = basis points", "Steepening = spread widens; flattening = spread narrows"] },
    fr: { easy: "Si 2Y = 4,10 % et 10Y = 4,55 %, 2s10s = +45 bps. Positif signifie que le yield 10 ans est au-dessus du 2 ans.", harder: "Si le 2Y monte de 20 bps mais le 10Y de 60 bps, la courbe fait un bear steepening : les yields montent et le long terme monte plus vite. Cela peut venir de croissance/inflation, de l’offre de Treasuries ou d’une term premium plus élevée.", use: "Utilisé pour interpréter politique monétaire, risque de récession, relative value, marges bancaires et duration.", impact: "La courbe influence banques, obligations, FX et discount rates. Une inversion n’est pas une horloge de récession précise.", formula: "2s10s = yield Treasury 10Y − yield Treasury 2Y", legend: ["2Y = Treasury 2 ans", "10Y = Treasury 10 ans", "bps = points de base", "Steepening = spread s’élargit ; flattening = spread se réduit"] },
  },
};

function generic(title: string, french: boolean): Extra {
  return french ? {
    easy: `Commence par reformuler « ${title} » avec tes propres mots, puis fais un exemple numérique très simple.`,
    harder: "Ajoute ensuite un scénario où deux variables changent en même temps et explique quelle hypothèse domine le résultat.",
    use: "Demande toujours : où ce concept est-il utilisé en valorisation, marchés, analyse d’entreprise ou gestion de portefeuille ?",
    impact: "Termine par la chaîne causale : variable → mécanisme → actif/entreprise → décision → risque d’invalidation.",
  } : {
    easy: `First restate “${title}” in your own words, then build one very simple numerical example.`,
    harder: "Then add a scenario where two variables change at the same time and explain which assumption dominates the result.",
    use: "Always ask where the concept is used in valuation, markets, company analysis or portfolio management.",
    impact: "Finish with the causal chain: variable → mechanism → asset/company → decision → invalidation risk.",
  };
}

function enhance() {
  const page = document.querySelector<HTMLElement>(".daily-challenge-page");
  if (!page || page.querySelector(".challenge-depth-extra")) return;
  const title = page.querySelector<HTMLElement>(".daily-challenge-hero h1")?.textContent?.trim();
  if (!title) return;
  const french = document.documentElement.lang === "fr";
  const data = (extras[title]?.[french ? "fr" : "en"] ?? generic(title, french));
  const worked = page.querySelector<HTMLElement>(".challenge-worked-example");
  if (!worked) return;
  const section = document.createElement("section");
  section.className = "challenge-grid-wide challenge-depth-extra";
  const cards = [
    [french ? "EXEMPLE FACILE DÉCOMPOSÉ" : "EASY EXAMPLE — STEP BY STEP", data.easy],
    [french ? "EXEMPLE PLUS DIFFICILE" : "HARDER EXAMPLE", data.harder],
    [french ? "À QUOI ÇA SERT ?" : "WHAT IS IT USED FOR?", data.use],
    [french ? "IMPACTS ET TRANSMISSION" : "IMPACTS & TRANSMISSION", data.impact],
  ];
  cards.forEach(([label, copy]) => {
    const article = document.createElement("article"); article.className = "challenge-learning-card";
    const span = document.createElement("span"); span.className = "mini-label"; span.textContent = label;
    const p = document.createElement("p"); p.textContent = copy;
    article.append(span, p); section.appendChild(article);
  });
  if (data.formula) {
    const article = document.createElement("article"); article.className = "challenge-learning-card";
    article.innerHTML = `<span class="mini-label">${french ? "FORMULE & LÉGENDE" : "FORMULA & LEGEND"}</span><div class="challenge-formula"></div><div class="challenge-formula-legend"><strong>${french ? "Légende" : "Legend"}</strong></div>`;
    const formula = article.querySelector<HTMLElement>(".challenge-formula"); if (formula) formula.textContent = data.formula;
    const legend = article.querySelector<HTMLElement>(".challenge-formula-legend"); data.legend?.forEach(line => { const s = document.createElement("span"); s.textContent = line; legend?.appendChild(s); });
    section.appendChild(article);
  }
  worked.insertAdjacentElement("afterend", section);
}

export default function ChallengeDepthEnhancer() {
  useEffect(() => {
    enhance();
    const timer = window.setInterval(enhance, 1000);
    window.addEventListener("finance-studio-language-change", enhance);
    return () => { window.clearInterval(timer); window.removeEventListener("finance-studio-language-change", enhance); };
  }, []);
  return null;
}
