"use client";

import { useEffect } from "react";

type Topic = {
  lesson: string;
  easy: string;
  advanced: string;
  formula?: string;
  legend?: string[];
  related: Array<{ label: string; href: string }>;
};

const topics: Record<string, { en: Topic; fr: Topic }> = {
  "What a stock price really represents": {
    en: {
      lesson: "A stock price is the market's current estimate of what one share of a business is worth. It is not simply today's profit divided by the number of shares. Investors are continuously updating expectations for future revenue, margins, free cash flow, growth, risk and the return they require. This is why a company can report good results and still fall: the results may have been good in absolute terms but weaker than what was already priced in. The two forces to keep in mind are expected cash flows and the discount rate. Higher expected future cash flows tend to support value; a higher required return tends to reduce the present value of those cash flows. Valuation multiples such as P/E (Price-to-Earnings ratio) are shorthand summaries of these expectations, not independent laws of value.",
      easy: "Easy example: suppose investors expected earnings of 5$ per share and were willing to pay 20× earnings. A simplified implied value is 100$ per share. If expected earnings rise to 5.50$ while the multiple stays 20×, the implied value becomes 110$. Now change only the required return: if rates rise and investors are only willing to pay 17×, the same 5.50$ earnings imply 93.50$. The business improved, yet the stock can still fall because the valuation multiple compressed.",
      advanced: "Harder interpretation: separate the earnings revision from the multiple revision. If a stock moves +8%, ask how much came from higher expected earnings, lower discount rates, better terminal growth, lower perceived risk or positioning. This is the same discipline used in equity research and asset management: price = expectations, not just fundamentals in isolation.",
      formula: "Simplified valuation = Expected earnings per share × P/E multiple",
      legend: ["P/E = Price-to-Earnings ratio", "Earnings per share = net income attributable to common shareholders ÷ diluted shares", "Multiple = how much investors are willing to pay per unit of earnings"],
      related: [{ label: "Stocks, bonds, ETFs & funds", href: "/university/year-1-stocks-bonds-etfs-funds" }, { label: "Equity valuation", href: "/university/year-2-equity-valuation" }],
    },
    fr: {
      lesson: "Le prix d’une action représente l’estimation actuelle du marché de la valeur d’une part de l’entreprise. Ce n’est pas simplement le bénéfice du jour divisé par le nombre d’actions. Les investisseurs mettent en permanence à jour leurs anticipations de chiffre d’affaires, marges, free cash flow, croissance, risque et rendement exigé. C’est pour cela qu’une entreprise peut publier de bons résultats et pourtant baisser : les résultats peuvent être bons en absolu mais inférieurs à ce qui était déjà intégré dans le prix. Retenir deux forces : les cash flows futurs attendus et le taux d’actualisation. Des cash flows attendus plus élevés soutiennent généralement la valeur ; un rendement exigé plus élevé réduit leur valeur actuelle. Les multiples comme P/E (Price-to-Earnings ratio) résument ces attentes.",
      easy: "Exemple facile : le marché attend 5 $ de bénéfice par action et accepte de payer 20× les bénéfices. La valeur simplifiée est 100 $. Si le bénéfice attendu passe à 5,50 $ avec le même multiple, elle devient 110 $. Mais si les taux montent et que le multiple tombe à 17×, 5,50 $ × 17 = 93,50 $. L’entreprise peut donc s’améliorer alors que l’action baisse à cause de la compression du multiple.",
      advanced: "Interprétation plus avancée : sépare toujours la révision des bénéfices de la révision du multiple. Pour un mouvement de +8 %, demande-toi quelle partie vient de meilleurs bénéfices attendus, d’un discount rate plus faible, d’une meilleure croissance terminale, d’un risque perçu plus faible ou du positionnement de marché.",
      formula: "Valorisation simplifiée = bénéfice attendu par action × multiple P/E",
      legend: ["P/E = Price-to-Earnings ratio", "Bénéfice par action = net income attribuable aux actionnaires ÷ nombre d’actions diluées", "Multiple = prix accepté par les investisseurs pour une unité de bénéfice"],
      related: [{ label: "Stocks, bonds, ETFs & funds", href: "/university/year-1-stocks-bonds-etfs-funds" }, { label: "Equity valuation", href: "/university/year-2-equity-valuation" }],
    },
  },
  "Why bond prices move opposite to yields": {
    en: {
      lesson: "A conventional fixed-rate bond promises fixed cash flows: coupons plus principal repayment. Its market price must adjust when the yield investors require changes. If newly issued bonds offer 5% while an older bond effectively offers only 3% at par, buyers will not pay the same price for the older bond; its price falls until its expected return becomes competitive. This creates the inverse price-yield relationship. Duration measures first-order sensitivity to a yield change, while convexity improves the estimate for larger moves. Do not confuse coupon rate, current yield and yield to maturity: the coupon is contractual, current yield is coupon divided by price, and yield to maturity is the discount rate that equates the present value of all promised cash flows with the bond price.",
      easy: "Easy example: duration = 5 and the bond yield rises by 40 bps (basis points). Because 100 bps = 1.00 percentage point, 40 bps = 0.40%. Approximate price change = −5 × 0.40% = −2.0%. So a bond worth 100 could move to roughly 98 before convexity and other effects.",
      advanced: "Harder example: compare two bonds with durations of 2 and 9 when yields rise 50 bps. The first loses roughly 1%; the second roughly 4.5%. This is why long-duration portfolios and growth equities can both be sensitive to a sharp rise in long-term yields: more of their value depends on distant cash flows.",
      formula: "ΔPrice ≈ −Duration × ΔYield",
      legend: ["ΔPrice = approximate percentage change in bond price", "Duration = first-order sensitivity to interest rates", "ΔYield = yield change expressed in percentage points", "bps = basis points; 100 bps = 1.00 percentage point"],
      related: [{ label: "Fixed income & yield curves", href: "/university/year-2-fixed-income-yield-curves" }, { label: "Duration & convexity", href: "/university/year-2-duration-convexity" }],
    },
    fr: {
      lesson: "Une obligation classique à taux fixe promet des cash flows fixes : coupons puis remboursement du principal. Son prix de marché doit donc s’ajuster quand le rendement exigé par les investisseurs change. Si de nouvelles obligations offrent 5 % alors qu’une ancienne offre économiquement moins, personne ne paiera le même prix pour l’ancienne ; son prix baisse jusqu’à ce que son rendement redevienne compétitif. D’où la relation inverse prix-yield. La duration mesure la sensibilité de premier ordre et la convexité améliore l’estimation pour les grands mouvements. Ne confonds pas coupon, current yield et yield to maturity.",
      easy: "Exemple facile : duration = 5 et hausse du yield de 40 bps (basis points / points de base). 100 bps = 1,00 point de pourcentage, donc 40 bps = 0,40 %. Variation approximative du prix = −5 × 0,40 % = −2,0 %. Une obligation à 100 pourrait donc valoir environ 98 avant ajustement de convexité.",
      advanced: "Exemple plus difficile : compare une obligation de duration 2 et une de duration 9 avec une hausse de 50 bps. La première perd environ 1 %, la seconde environ 4,5 %. Cela explique pourquoi les portefeuilles longue duration réagissent beaucoup plus aux changements de taux.",
      formula: "ΔPrix ≈ −Duration × ΔYield",
      legend: ["ΔPrix = variation approximative du prix", "Duration = sensibilité de premier ordre aux taux", "ΔYield = variation du rendement en points de pourcentage", "bps = basis points / points de base ; 100 bps = 1,00 point"],
      related: [{ label: "Fixed income & yield curves", href: "/university/year-2-fixed-income-yield-curves" }, { label: "Duration & convexity", href: "/university/year-2-duration-convexity" }],
    },
  },
  "How inflation moves markets": {
    en: {
      lesson: "Inflation matters because it changes purchasing power, company costs, central-bank policy expectations and discount rates. Markets usually react most strongly to the surprise versus consensus, not simply to whether inflation is 'high'. CPI (Consumer Price Index) is one major inflation measure. A hotter-than-expected CPI can make investors price a more hawkish Federal Reserve: fewer or later cuts, or a higher expected policy path. That repricing can lift short-term Treasury yields, influence the 10-year yield, support the US dollar through relative-rate differentials and pressure assets whose valuations depend heavily on distant cash flows. The exact reaction still depends on growth expectations, positioning and what was already priced in.",
      easy: "Easy example: consensus CPI is 3.0%, actual CPI is 3.3%. The +0.3 percentage-point upside surprise may cause traders to reduce expected rate cuts. If the market had priced three cuts and now prices only one or two, front-end yields can rise quickly. A stronger dollar and weaker growth equities are plausible second-round effects, not automatic rules.",
      advanced: "Harder example: headline CPI is hot but core services inflation slows and growth data weakens. The market may initially sell bonds, then reverse if investors conclude the underlying inflation trend is improving. Always decompose the release, compare it with expectations, and ask which component changes the policy path.",
      formula: "Inflation surprise = Actual release − Consensus expectation",
      legend: ["CPI = Consumer Price Index", "Consensus = median/average market expectation before the release", "Hawkish = policy stance favoring tighter financial conditions", "Dovish = policy stance favoring easier financial conditions"],
      related: [{ label: "Macroeconomics for markets", href: "/university/year-1-macroeconomics-for-markets" }, { label: "Money, banking & central banks", href: "/university/year-1-money-banking-central-banks" }],
    },
    fr: {
      lesson: "L’inflation compte car elle modifie le pouvoir d’achat, les coûts des entreprises, les anticipations de politique monétaire et les discount rates. Le marché réagit surtout à la surprise par rapport au consensus, pas seulement au fait que l’inflation soit « élevée ». Le CPI (Consumer Price Index) est une mesure majeure. Un CPI supérieur aux attentes peut faire anticiper une Federal Reserve plus hawkish : moins de baisses de taux, plus tardives, ou une trajectoire de taux plus élevée. Cela peut faire monter les yields courts, influencer le 10 ans, soutenir le dollar et peser sur les actifs sensibles aux taux. Mais la réaction dépend aussi de la croissance, du positionnement et de ce qui était déjà pricé.",
      easy: "Exemple facile : CPI attendu à 3,0 %, publié à 3,3 %. La surprise de +0,3 point peut conduire le marché à retirer des baisses de taux de ses anticipations. Si trois cuts étaient pricés et qu’il n’en reste qu’un ou deux, les yields courts peuvent monter rapidement.",
      advanced: "Exemple plus difficile : le headline CPI est fort mais l’inflation des services ralentit et les données de croissance se dégradent. Les obligations peuvent d’abord baisser puis se reprendre si le marché estime que la tendance sous-jacente s’améliore. Il faut donc décomposer la publication.",
      formula: "Surprise d’inflation = chiffre publié − consensus attendu",
      legend: ["CPI = Consumer Price Index", "Consensus = attente du marché avant la publication", "Hawkish = politique plus restrictive", "Dovish = politique plus accommodante"],
      related: [{ label: "Macroeconomics for markets", href: "/university/year-1-macroeconomics-for-markets" }, { label: "Money, banking & central banks", href: "/university/year-1-money-banking-central-banks" }],
    },
  },
  "Revenue, EBITDA and profit are not the same thing": {
    en: {
      lesson: "Revenue is the top-line value of goods and services sold. EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) is a measure of operating profitability before financing, taxes and D&A. EBIT goes one step further by subtracting depreciation and amortization. Net income then incorporates interest, taxes and other items. Free cash flow is different again because accounting profit is not cash: capital expenditure, working capital and non-cash charges matter. Understanding these layers prevents a common valuation error: comparing a metric that belongs to all capital providers with a value that belongs only to equity holders.",
      easy: "Easy example: revenue = 500 M$, EBITDA margin = 20%, so EBITDA = 100 M$. If revenue stays 500 M$ but the margin falls to 15%, EBITDA falls to 75 M$. Sales are unchanged, but operating economics deteriorated.",
      advanced: "Harder example: EBITDA rises from 100 M$ to 115 M$, but capital expenditure jumps from 20 M$ to 60 M$ and working capital consumes another 15 M$. Accounting operating performance improved, yet cash conversion may worsen sharply. This matters for debt repayment capacity and DCF (Discounted Cash Flow) valuation.",
      formula: "EBITDA margin = EBITDA ÷ Revenue",
      legend: ["Revenue = sales / chiffre d’affaires", "EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization", "Capex = capital expenditure / dépenses d’investissement", "Free cash flow = cash generated after operating and investment needs"],
      related: [{ label: "Financial Accounting I", href: "/university/year-1-financial-accounting-i" }, { label: "Company valuation basics", href: "/university/year-1-company-valuation-basics" }],
    },
    fr: {
      lesson: "Le revenue correspond au chiffre d’affaires. L’EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) mesure la profitabilité opérationnelle avant financement, impôts et D&A. L’EBIT retranche ensuite depreciation et amortization. Le net income intègre ensuite intérêts, impôts et autres éléments. Le free cash flow est encore différent car le bénéfice comptable n’est pas du cash : capex, working capital et charges non cash comptent. Comprendre ces étages évite les erreurs de valorisation.",
      easy: "Exemple facile : revenue = 500 M$, marge EBITDA = 20 %, donc EBITDA = 100 M$. Si les ventes restent 500 M$ mais la marge tombe à 15 %, l’EBITDA tombe à 75 M$. Le chiffre d’affaires ne change pas, mais l’économie opérationnelle se dégrade.",
      advanced: "Exemple plus difficile : EBITDA passe de 100 M$ à 115 M$, mais le capex passe de 20 M$ à 60 M$ et le working capital consomme 15 M$. Le résultat opérationnel s’améliore mais la conversion en cash peut se dégrader fortement.",
      formula: "Marge EBITDA = EBITDA ÷ Revenue",
      legend: ["Revenue = chiffre d’affaires", "EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization", "Capex = capital expenditure / dépenses d’investissement", "Free cash flow = cash disponible après besoins opérationnels et investissements"],
      related: [{ label: "Financial Accounting I", href: "/university/year-1-financial-accounting-i" }, { label: "Company valuation basics", href: "/university/year-1-company-valuation-basics" }],
    },
  },
  "What the yield curve tells you": {
    en: {
      lesson: "The yield curve is a map of interest rates across maturities. The 2-year Treasury yield is strongly influenced by expectations for Federal Reserve policy over the next few years. The 10-year Treasury yield also reflects expected growth, inflation, future short rates, Treasury supply and the term premium investors require for holding longer maturities. The 2s10s or 10Y−2Y spread is simply the 10-year yield minus the 2-year yield. A positive number means the 10-year yield is above the 2-year; a negative number means that part of the curve is inverted. A steepening means the gap widens; flattening means it narrows. Then ask whether yields themselves rose or fell: that distinguishes bull versus bear moves.",
      easy: "Easy example: 2Y = 4.80% and 10Y = 5.20%. 10Y−2Y = 0.40 percentage point = +40 bps. If 2Y falls to 4.40% while 10Y stays 5.20%, the spread becomes +80 bps: a bull steepener because short yields fell and the curve steepened.",
      advanced: "Harder example: 2Y rises from 4.0% to 4.2%, but 10Y rises from 4.3% to 4.9%. The spread widens from +30 bps to +70 bps while yields rise: a bear steepener. That can reflect higher long-run inflation, stronger growth expectations, fiscal supply or a rising term premium rather than simply a change in the next Fed meeting.",
      formula: "2s10s = 10-year Treasury yield − 2-year Treasury yield",
      legend: ["2Y = US 2-year Treasury yield", "10Y = US 10-year Treasury yield", "bps = basis points; 100 bps = 1.00 percentage point", "Inversion = short yield above long yield for the chosen maturities"],
      related: [{ label: "Yield curve", href: "/university/year-2-yield-curve" }, { label: "Fixed income & yield curves", href: "/university/year-2-fixed-income-yield-curves" }],
    },
    fr: {
      lesson: "La yield curve est une carte des taux selon les maturités. Le Treasury 2 ans reflète fortement les anticipations de politique de la Federal Reserve. Le 10 ans reflète aussi la croissance, l’inflation, les taux courts futurs, l’offre de Treasuries et la term premium. Le spread 2s10s ou 10Y−2Y correspond simplement au yield 10 ans moins le yield 2 ans. Positif : le 10 ans est au-dessus du 2 ans ; négatif : cette partie de la courbe est inversée. Steepening = écart qui s’élargit ; flattening = écart qui se réduit. Ensuite regarde si les yields montent ou baissent pour distinguer bull et bear moves.",
      easy: "Exemple facile : 2Y = 4,80 % et 10Y = 5,20 %. 10Y−2Y = 0,40 point = +40 bps. Si le 2Y tombe à 4,40 % et le 10Y reste à 5,20 %, le spread devient +80 bps : bull steepener car les taux courts baissent et la courbe se pentifie.",
      advanced: "Exemple plus difficile : 2Y passe de 4,0 % à 4,2 %, tandis que le 10Y passe de 4,3 % à 4,9 %. Le spread passe de +30 à +70 bps avec des yields en hausse : bear steepener. Cela peut signaler une term premium ou des anticipations de croissance/inflation plus élevées.",
      formula: "2s10s = yield Treasury 10 ans − yield Treasury 2 ans",
      legend: ["2Y = yield Treasury US 2 ans", "10Y = yield Treasury US 10 ans", "bps = basis points / points de base ; 100 bps = 1,00 point", "Inversion = taux court supérieur au taux long sur les maturités comparées"],
      related: [{ label: "Yield curve", href: "/university/year-2-yield-curve" }, { label: "Fixed income & yield curves", href: "/university/year-2-fixed-income-yield-curves" }],
    },
  },
  "Enterprise value versus equity value": {
    en: {
      lesson: "Equity Value is the value attributable to common shareholders. EV (Enterprise Value) represents the value of the operating business available to all capital providers. The simplified bridge adds debt because a buyer of the enterprise effectively assumes or repays financing claims, and subtracts cash because excess cash reduces the net purchase price. This distinction determines which valuation multiple is internally consistent: EV pairs naturally with metrics before interest such as EBITDA, while Equity Value pairs with metrics after interest such as net income. In real transactions the bridge can also include preferred stock, minority interests, leases, pensions and other adjustments.",
      easy: "Easy example: Equity Value = 800 M$, Debt = 300 M$, Cash = 100 M$. EV = 800 + 300 − 100 = 1.0 B$. If EBITDA is 100 M$, EV/EBITDA = 10.0×. The ratio compares operating value with an operating earnings metric.",
      advanced: "Harder example: two companies both have Equity Value of 1.0 B$. Company A has 50 M$ net cash; Company B has 600 M$ net debt. Their EVs are roughly 950 M$ and 1.6 B$ respectively. Looking only at market capitalization would hide a major difference in the total economic value and financing burden of the businesses.",
      formula: "EV = Equity Value + Debt − Cash",
      legend: ["EV = Enterprise Value", "Equity Value = value attributable to common shareholders", "Debt = interest-bearing financing claims", "Cash = cash and equivalents subtracted in the simplified bridge", "EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization"],
      related: [{ label: "Company valuation basics", href: "/university/year-1-company-valuation-basics" }, { label: "DCF valuation", href: "/university/year-3-dcf-valuation" }],
    },
    fr: {
      lesson: "L’Equity Value est la valeur revenant aux actionnaires ordinaires. L’EV (Enterprise Value) représente la valeur de l’activité opérationnelle disponible pour tous les apporteurs de capitaux. Le bridge simplifié ajoute la dette car un acheteur de l’entreprise reprend ou rembourse ces créances, et retire le cash car l’excédent de trésorerie réduit le prix net payé. Cette distinction détermine les multiples cohérents : EV avec EBITDA, Equity Value avec net income. Dans une transaction réelle, on peut aussi ajuster preferred stock, minority interests, leases, pensions et autres éléments.",
      easy: "Exemple facile : Equity Value = 800 M$, dette = 300 M$, cash = 100 M$. EV = 800 + 300 − 100 = 1,0 B$. Si EBITDA = 100 M$, EV/EBITDA = 10,0×.",
      advanced: "Exemple plus difficile : deux entreprises valent chacune 1,0 B$ en Equity Value. A a 50 M$ de net cash ; B a 600 M$ de net debt. Leurs EV sont environ 950 M$ et 1,6 B$. La seule capitalisation boursière cacherait donc une différence majeure de structure financière.",
      formula: "EV = Equity Value + Dette − Cash",
      legend: ["EV = Enterprise Value", "Equity Value = valeur revenant aux actionnaires", "Debt = créances de financement portant intérêt", "Cash = trésorerie retirée dans le bridge simplifié", "EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization"],
      related: [{ label: "Company valuation basics", href: "/university/year-1-company-valuation-basics" }, { label: "DCF valuation", href: "/university/year-3-dcf-valuation" }],
    },
  },
};

function enhance() {
  const card = document.querySelector<HTMLElement>(".daily-card");
  if (!card) return;
  const title = card.querySelector("h2")?.textContent?.trim() || "";
  const bilingual = topics[title];
  if (!bilingual) return;
  const french = document.documentElement.lang === "fr";
  const data = french ? bilingual.fr : bilingual.en;
  const section = card.querySelector<HTMLElement>(".hourly-deep-lesson");
  if (!section || section.dataset.deepV2 === `${title}|${french}`) return;
  section.dataset.deepV2 = `${title}|${french}`;
  const blocks = section.querySelectorAll<HTMLElement>(".deep-lesson-block");
  const lesson = Array.from(blocks).find((node) => node.classList.contains("lesson"));
  const applied = Array.from(blocks).find((node) => node.classList.contains("applied"));
  if (lesson) {
    const p = lesson.querySelector("p");
    if (p) p.textContent = data.lesson;
    if (data.formula && !lesson.querySelector(".hourly-formula-box")) {
      const box = document.createElement("div");
      box.className = "hourly-formula-box";
      const code = document.createElement("code");
      code.textContent = data.formula;
      box.appendChild(code);
      if (data.legend?.length) {
        const legend = document.createElement("div");
        legend.className = "hourly-formula-legend";
        data.legend.forEach((line) => { const span = document.createElement("span"); span.textContent = line; legend.appendChild(span); });
        box.appendChild(legend);
      }
      lesson.appendChild(box);
    }
  }
  if (applied) {
    const p = applied.querySelector("p");
    if (p) p.textContent = data.easy;
    let advanced = applied.querySelector<HTMLElement>(".hourly-advanced-example");
    if (!advanced) {
      advanced = document.createElement("p");
      advanced.className = "hourly-advanced-example";
      applied.appendChild(advanced);
    }
    advanced.textContent = `${french ? "Exemple plus avancé : " : "Harder example: "}${data.advanced}`;
  }

  const actions = card.querySelector<HTMLElement>(".card-actions");
  if (actions) {
    const firstLink = actions.querySelector<HTMLAnchorElement>("a");
    if (firstLink) {
      firstLink.href = data.related[0].href;
      firstLink.textContent = french ? "Ouvrir le cours lié →" : "Open the related lesson →";
    }
    let links = card.querySelector<HTMLElement>(".hourly-topic-links");
    if (!links) {
      links = document.createElement("div");
      links.className = "hourly-topic-links";
      actions.before(links);
    }
    links.innerHTML = "";
    data.related.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = `${item.label} →`;
      links!.appendChild(a);
    });
  }
}

export default function HomeLearningDepthV2() {
  useEffect(() => {
    const timer = window.setInterval(enhance, 700);
    enhance();
    window.addEventListener("finance-studio-language-change", enhance);
    return () => { window.clearInterval(timer); window.removeEventListener("finance-studio-language-change", enhance); };
  }, []);
  return null;
}
