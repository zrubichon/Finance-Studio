"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { professorHref } from "@/lib/learning-bridge";

function localDayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

type Concept = {
  titleEn: string;
  titleFr: string;
  lesson: string;
  definitionEn: string;
  definitionFr: string;
  whyEn: string;
  whyFr: string;
  mechanismEn: string;
  mechanismFr: string;
  formula: string;
  legendEn: string[];
  legendFr: string[];
  exampleEn: string;
  exampleFr: string;
  mistakeEn: string;
  mistakeFr: string;
  interviewEn: string;
  interviewFr: string;
  investingEn: string;
  investingFr: string;
  questionEn: string;
  questionFr: string;
  answer: string;
  hintEn: string;
  hintFr: string;
  correctionEn: string;
  correctionFr: string;
};

const concepts: Concept[] = [
  {
    titleEn: "WACC (Weighted Average Cost of Capital)",
    titleFr: "WACC (Weighted Average Cost of Capital / coût moyen pondéré du capital)",
    lesson: "year-3-dcf-valuation",
    definitionEn: "WACC is the average return required by all providers of capital, including shareholders and lenders.",
    definitionFr: "Le WACC est le rendement moyen exigé par l’ensemble des apporteurs de capitaux, notamment les actionnaires et les prêteurs.",
    whyEn: "It is often used as the discount rate in a DCF (Discounted Cash Flow) model because it reflects the cost of financing the whole business.",
    whyFr: "Il est souvent utilisé comme taux d’actualisation dans un DCF (Discounted Cash Flow / actualisation des flux de trésorerie) car il reflète le coût de financement de l’entreprise.",
    mechanismEn: "Weight the cost of equity and the after-tax cost of debt by their share of the company’s capital structure. A higher WACC makes future cash flows worth less today and therefore lowers valuation, all else equal.",
    mechanismFr: "Pondère le coût des capitaux propres et le coût de la dette après impôt selon leur poids dans la structure de capital. Un WACC plus élevé réduit la valeur actuelle des cash flows futurs et donc la valorisation, toutes choses égales par ailleurs.",
    formula: "WACC = (E / (D + E) × Re) + (D / (D + E) × Rd × (1 − T))",
    legendEn: ["E = Equity value / value financed by shareholders", "D = Debt", "Re = Cost of equity / required return for shareholders", "Rd = Pre-tax cost of debt", "T = Corporate tax rate", "After-tax cost of debt = Rd × (1 − T)"],
    legendFr: ["E = Equity value / valeur financée par les actionnaires", "D = Dette", "Re = Cost of equity / rendement exigé par les actionnaires", "Rd = Coût de la dette avant impôt", "T = Taux d’impôt sur les sociétés", "Coût de la dette après impôt = Rd × (1 − T)"],
    exampleEn: "If the cost of equity is 10%, the after-tax cost of debt is 5%, and the company is financed with 70% equity and 30% debt, WACC = (70% × 10%) + (30% × 5%) = 7.0% + 1.5% = 8.5%.",
    exampleFr: "Si le coût des capitaux propres est de 10 %, le coût de la dette après impôt de 5 %, et l’entreprise financée à 70 % par equity et 30 % par dette, WACC = (70 % × 10 %) + (30 % × 5 %) = 7,0 % + 1,5 % = 8,5 %.",
    mistakeEn: "Common mistake: using the pre-tax cost of debt directly. In a standard WACC calculation, debt is normally adjusted for the tax shield.",
    mistakeFr: "Erreur fréquente : utiliser directement le coût de la dette avant impôt. Dans un calcul standard du WACC, la dette est généralement ajustée pour l’avantage fiscal.",
    interviewEn: "Interview angle: explain what WACC represents, why it discounts unlevered free cash flow, and why a higher WACC reduces a DCF valuation.",
    interviewFr: "Angle entretien : explique ce que représente le WACC, pourquoi il actualise l’unlevered free cash flow et pourquoi un WACC plus élevé réduit une valorisation DCF.",
    investingEn: "Investing angle: companies with long-duration cash flows are especially sensitive to changes in discount rates. A higher required return can compress valuation multiples even if earnings do not change immediately.",
    investingFr: "Angle investing : les entreprises avec des cash flows lointains sont particulièrement sensibles aux changements de taux d’actualisation. Un rendement exigé plus élevé peut comprimer les multiples même sans changement immédiat des bénéfices.",
    questionEn: "A company is financed with 80% equity at a 9% cost and 20% debt at a 5% after-tax cost. What is WACC?",
    questionFr: "Une entreprise est financée à 80 % par equity coûtant 9 % et 20 % par dette coûtant 5 % après impôt. Quel est le WACC ?",
    answer: "8.2%",
    hintEn: "Calculate each weighted contribution: 80% × 9%, then 20% × 5%.",
    hintFr: "Calcule chaque contribution pondérée : 80 % × 9 %, puis 20 % × 5 %.",
    correctionEn: "80% × 9% = 7.2% and 20% × 5% = 1.0%. Total WACC = 8.2%.",
    correctionFr: "80 % × 9 % = 7,2 % et 20 % × 5 % = 1,0 %. WACC total = 8,2 %.",
  },
  {
    titleEn: "EV (Enterprise Value) vs Equity Value",
    titleFr: "EV (Enterprise Value / valeur d’entreprise) vs Equity Value",
    lesson: "year-1-company-valuation-basics",
    definitionEn: "Equity Value is the value attributable to common shareholders. Enterprise Value measures the value of the operating business available to all capital providers.",
    definitionFr: "L’Equity Value est la valeur revenant aux actionnaires ordinaires. L’Enterprise Value mesure la valeur de l’activité opérationnelle disponible pour tous les apporteurs de capitaux.",
    whyEn: "The distinction lets you match the correct valuation numerator with the correct financial metric and compare companies with different financing structures.",
    whyFr: "Cette distinction permet d’associer le bon numérateur de valorisation au bon indicateur financier et de comparer des entreprises ayant des structures de financement différentes.",
    mechanismEn: "Start with Equity Value, add debt because lenders also finance the enterprise, and subtract cash because excess cash reduces the net price paid for operations.",
    mechanismFr: "Pars de l’Equity Value, ajoute la dette car les prêteurs financent aussi l’entreprise, puis retire le cash car le cash excédentaire réduit le prix net payé pour l’activité.",
    formula: "EV = Equity Value + Debt − Cash",
    legendEn: ["EV = Enterprise Value", "Equity Value = value attributable to common shareholders", "Debt = interest-bearing financing claims", "Cash = excess cash and cash equivalents, simplified here"],
    legendFr: ["EV = Enterprise Value / valeur d’entreprise", "Equity Value = valeur revenant aux actionnaires ordinaires", "Debt = dette portant intérêt", "Cash = cash excédentaire et équivalents de trésorerie, version simplifiée"],
    exampleEn: "Equity Value is 800 M$, Debt is 300 M$, and Cash is 100 M$. EV = 800 M$ + 300 M$ − 100 M$ = 1.0 B$. If EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) is 100 M$, EV / EBITDA = 10.0×.",
    exampleFr: "L’Equity Value est de 800 M$, la dette de 300 M$ et le cash de 100 M$. EV = 800 M$ + 300 M$ − 100 M$ = 1,0 B$. Si l’EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) est de 100 M$, EV / EBITDA = 10,0×.",
    mistakeEn: "Common mistake: pairing Equity Value with EBITDA. EBITDA belongs to all capital providers, so EV / EBITDA is the internally consistent multiple.",
    mistakeFr: "Erreur fréquente : associer Equity Value à l’EBITDA. L’EBITDA appartient à tous les apporteurs de capitaux, donc EV / EBITDA est le multiple cohérent.",
    interviewEn: "Interview angle: be able to bridge both directions and explain why debt is added and cash is subtracted rather than simply memorizing the formula.",
    interviewFr: "Angle entretien : maîtrise le bridge dans les deux sens et explique pourquoi on ajoute la dette et retire le cash au lieu de mémoriser seulement la formule.",
    investingEn: "Investing angle: two companies with identical market capitalizations can have very different Enterprise Values if one carries much more net debt.",
    investingFr: "Angle investing : deux entreprises avec la même capitalisation boursière peuvent avoir des Enterprise Values très différentes si l’une porte beaucoup plus de dette nette.",
    questionEn: "A company has 1.2 B$ of Equity Value, 450 M$ of Debt and 150 M$ of Cash. What is Enterprise Value?",
    questionFr: "Une entreprise a 1,2 B$ d’Equity Value, 450 M$ de dette et 150 M$ de cash. Quelle est son Enterprise Value ?",
    answer: "1.5 B$",
    hintEn: "Add Debt and subtract Cash.",
    hintFr: "Ajoute la dette et retire le cash.",
    correctionEn: "1.2 B$ + 0.45 B$ − 0.15 B$ = 1.5 B$.",
    correctionFr: "1,2 B$ + 0,45 B$ − 0,15 B$ = 1,5 B$.",
  },
  {
    titleEn: "Duration: why bond prices move when yields move",
    titleFr: "Duration : pourquoi le prix des obligations bouge avec les yields",
    lesson: "year-2-duration-convexity",
    definitionEn: "Duration measures how sensitive a bond’s price is to a change in yield, to a first-order approximation.",
    definitionFr: "La duration mesure la sensibilité du prix d’une obligation à une variation de yield, en approximation de premier ordre.",
    whyEn: "It is one of the fastest ways to translate a rates move into an approximate bond-price impact and is central to fixed-income risk management.",
    whyFr: "C’est l’un des moyens les plus rapides de traduire un mouvement de taux en impact approximatif sur le prix d’une obligation et un outil central de gestion du risque obligataire.",
    mechanismEn: "When market yields rise, fixed coupons become relatively less attractive, so existing bond prices fall. Longer duration means greater sensitivity.",
    mechanismFr: "Quand les yields de marché montent, les coupons fixes deviennent relativement moins attractifs, donc les prix des obligations existantes baissent. Une duration plus longue signifie une sensibilité plus forte.",
    formula: "ΔPrice ≈ −Duration × ΔYield",
    legendEn: ["ΔPrice = approximate percentage change in bond price", "Duration = first-order interest-rate sensitivity", "ΔYield = change in yield expressed in percentage points", "bps = basis points / points de base; 100 bps = 1.00 percentage point"],
    legendFr: ["ΔPrice = variation approximative du prix de l’obligation", "Duration = sensibilité de premier ordre aux taux", "ΔYield = variation du yield en points de pourcentage", "bps = basis points / points de base ; 100 bps = 1,00 point de pourcentage"],
    exampleEn: "A bond with duration 5 faces a +40 bps yield move. 40 bps = 0.40%, so estimated price impact ≈ −5 × 0.40% = −2.0%.",
    exampleFr: "Une obligation de duration 5 subit une hausse de yield de +40 bps. 40 bps = 0,40 %, donc l’impact estimé ≈ −5 × 0,40 % = −2,0 %.",
    mistakeEn: "Common mistake: forgetting to convert basis points into percentage points before multiplying by duration.",
    mistakeFr: "Erreur fréquente : oublier de convertir les basis points en points de pourcentage avant de multiplier par la duration.",
    interviewEn: "Interview angle: explain the inverse bond price/yield relationship first, then use duration for the numerical estimate and mention convexity as a refinement.",
    interviewFr: "Angle entretien : explique d’abord la relation inverse prix/yield, puis utilise la duration pour l’estimation numérique et mentionne la convexité comme amélioration.",
    investingEn: "Investing angle: a portfolio with higher duration should move more when yields change, which matters when positioning for rate cuts or rate hikes.",
    investingFr: "Angle investing : un portefeuille avec une duration plus élevée bougera davantage quand les yields changent, ce qui compte pour se positionner sur des baisses ou hausses de taux.",
    questionEn: "A bond has duration 7 and yields rise by 25 bps. Estimate the first-order price move.",
    questionFr: "Une obligation a une duration de 7 et les yields montent de 25 bps. Estime le mouvement de prix au premier ordre.",
    answer: "−1.75%",
    hintEn: "25 bps = 0.25%. Multiply by 7 and reverse the sign.",
    hintFr: "25 bps = 0,25 %. Multiplie par 7 puis inverse le signe.",
    correctionEn: "−7 × 0.25% = −1.75%. Convexity can improve the estimate for larger yield moves.",
    correctionFr: "−7 × 0,25 % = −1,75 %. La convexité peut améliorer l’estimation pour de plus grands mouvements de yield.",
  },
  {
    titleEn: "Yield curve: what 2s10s tells you",
    titleFr: "Yield curve : ce que le 2s10s te dit",
    lesson: "year-2-yield-curve",
    definitionEn: "The 2s10s spread compares the 10-year US Treasury yield with the 2-year yield and gives a simple measure of the yield-curve slope.",
    definitionFr: "Le spread 2s10s compare le yield du Treasury US 10 ans avec le yield 2 ans et donne une mesure simple de la pente de la courbe.",
    whyEn: "The 2-year yield is highly sensitive to Federal Reserve expectations, while the 10-year also reflects longer-run growth, inflation and term premium.",
    whyFr: "Le yield 2 ans est très sensible aux anticipations de Federal Reserve, tandis que le 10 ans reflète aussi croissance, inflation de long terme et prime de terme.",
    mechanismEn: "A curve steepens when the gap between long and short yields widens and flattens when the gap narrows. A negative 2s10s spread means the curve is inverted between those maturities.",
    mechanismFr: "La courbe se steepen lorsque l’écart entre taux longs et courts s’élargit et se flatten lorsqu’il se réduit. Un spread 2s10s négatif signifie que la courbe est inversée entre ces maturités.",
    formula: "2s10s = 10Y yield − 2Y yield",
    legendEn: ["2Y = 2-year US Treasury yield", "10Y = 10-year US Treasury yield", "2s10s = slope between the 2-year and 10-year yields", "bps = basis points / points de base"],
    legendFr: ["2Y = yield du Treasury US 2 ans", "10Y = yield du Treasury US 10 ans", "2s10s = pente entre les yields 2 ans et 10 ans", "bps = basis points / points de base"],
    exampleEn: "If 2Y = 4.20% and 10Y = 4.70%, 2s10s = +50 bps. If the 2Y falls to 3.90% while the 10Y stays at 4.70%, the curve steepens to +80 bps.",
    exampleFr: "Si le 2Y = 4,20 % et le 10Y = 4,70 %, le 2s10s = +50 bps. Si le 2Y baisse à 3,90 % et le 10Y reste à 4,70 %, la courbe se steepen à +80 bps.",
    mistakeEn: "Common mistake: treating an inverted curve as a precise recession clock. It is a signal about relative rate expectations, not a guaranteed timetable.",
    mistakeFr: "Erreur fréquente : traiter une courbe inversée comme une horloge précise de récession. C’est un signal sur les anticipations relatives de taux, pas un calendrier garanti.",
    interviewEn: "Interview angle: distinguish bull/bear steepening and flattening by saying which part of the curve moved and in which direction.",
    interviewFr: "Angle entretien : distingue bull/bear steepening et flattening en précisant quelle partie de la courbe a bougé et dans quelle direction.",
    investingEn: "Investing angle: curve shape can influence duration trades, bank earnings, recession positioning and relative value across maturities.",
    investingFr: "Angle investing : la forme de la courbe peut influencer les trades de duration, les résultats bancaires, le positionnement récession et la valeur relative entre maturités.",
    questionEn: "The 2Y yield is 4.10% and the 10Y yield is 4.55%. What is the 2s10s spread?",
    questionFr: "Le yield 2Y est à 4,10 % et le yield 10Y à 4,55 %. Quel est le spread 2s10s ?",
    answer: "+45 bps",
    hintEn: "Subtract the 2Y yield from the 10Y yield.",
    hintFr: "Soustrais le yield 2Y du yield 10Y.",
    correctionEn: "4.55% − 4.10% = 0.45 percentage point = +45 bps.",
    correctionFr: "4,55 % − 4,10 % = 0,45 point de pourcentage = +45 bps.",
  },
  {
    titleEn: "Implied upside and target prices",
    titleFr: "Upside implicite et target prices",
    lesson: "year-1-stocks-bonds-etfs-funds",
    definitionEn: "Implied upside measures the percentage gain from today’s share price to an analyst’s target price.",
    definitionFr: "L’upside implicite mesure le gain en pourcentage entre le prix actuel de l’action et le target price d’un analyste.",
    whyEn: "A target price becomes decision-useful only after you translate it into a potential return and compare that return with the risk of the thesis.",
    whyFr: "Un target price devient utile pour la décision seulement après l’avoir transformé en rendement potentiel et comparé ce rendement au risque de la thèse.",
    mechanismEn: "Use the current share price as the denominator because that is the capital invested today. The target price is the future valuation outcome under your assumptions.",
    mechanismFr: "Utilise le prix actuel comme dénominateur car c’est le capital investi aujourd’hui. Le target price représente la valeur future selon tes hypothèses.",
    formula: "Upside = (Target Price − Current Price) / Current Price",
    legendEn: ["Target Price = estimated future share value", "Current Price = share price today", "Upside = expected percentage gain if the target is reached"],
    legendFr: ["Target Price = valeur future estimée de l’action", "Current Price = prix actuel de l’action", "Upside = gain en pourcentage si le target est atteint"],
    exampleEn: "An 80 $ current price and a 100 $ target imply (100 − 80) / 80 = 25% upside.",
    exampleFr: "Un prix actuel de 80 $ et un target de 100 $ impliquent (100 − 80) / 80 = 25 % d’upside.",
    mistakeEn: "Common mistake: dividing by the target price instead of the current price.",
    mistakeFr: "Erreur fréquente : diviser par le target price au lieu du prix actuel.",
    interviewEn: "Interview angle: state the target, implied upside, catalysts, risks and the assumptions that could make the target wrong.",
    interviewFr: "Angle entretien : donne le target, l’upside implicite, les catalyseurs, les risques et les hypothèses qui pourraient rendre le target faux.",
    investingEn: "Investing angle: upside alone is not enough. Compare the potential return with downside, probability and the time needed for the thesis to play out.",
    investingFr: "Angle investing : l’upside seul ne suffit pas. Compare le rendement potentiel au downside, à la probabilité et au temps nécessaire pour que la thèse se réalise.",
    questionEn: "A stock trades at 64 $ and your target price is 76.80 $. What is the implied upside?",
    questionFr: "Une action cote 64 $ et ton target price est 76,80 $. Quel est l’upside implicite ?",
    answer: "20%",
    hintEn: "Calculate the 12.80 $ gain relative to the 64 $ current price.",
    hintFr: "Calcule le gain de 12,80 $ par rapport au prix actuel de 64 $.",
    correctionEn: "(76.80 − 64) / 64 = 12.80 / 64 = 20%. Then ask whether 20% is enough compensation for the forecast risk.",
    correctionFr: "(76,80 − 64) / 64 = 12,80 / 64 = 20 %. Demande ensuite si 20 % rémunère suffisamment le risque de prévision.",
  },
  {
    titleEn: "Revenue growth: reading the real driver",
    titleFr: "Revenue growth : lire le vrai moteur de croissance",
    lesson: "year-2-financial-statement-analysis",
    definitionEn: "Revenue growth measures how quickly a company’s sales increase or decrease over a period.",
    definitionFr: "Le revenue growth mesure la vitesse à laquelle les ventes d’une entreprise augmentent ou diminuent sur une période.",
    whyEn: "Sales growth can come from higher volume, higher prices, acquisitions or foreign-exchange effects, and those drivers can have very different implications for future earnings quality.",
    whyFr: "La croissance des ventes peut venir des volumes, des prix, d’acquisitions ou des effets de change, et ces moteurs peuvent avoir des implications très différentes pour la qualité future des bénéfices.",
    mechanismEn: "Compare current revenue with prior-period revenue, then decompose the change into volume, price, mix and inorganic growth whenever possible.",
    mechanismFr: "Compare le revenue actuel à celui de la période précédente, puis décompose le changement entre volume, prix, mix et croissance externe quand c’est possible.",
    formula: "Revenue growth = (Current Revenue − Prior Revenue) / Prior Revenue",
    legendEn: ["Current Revenue = sales in the current period", "Prior Revenue = sales in the comparison period", "Revenue growth = percentage change in sales"],
    legendFr: ["Current Revenue = ventes de la période actuelle", "Prior Revenue = ventes de la période de comparaison", "Revenue growth = variation en pourcentage des ventes"],
    exampleEn: "Revenue rises from 400 M$ to 460 M$. Growth = (460 − 400) / 400 = 15%. If most of the increase comes from price rather than volume, the sustainability question is different.",
    exampleFr: "Le revenue passe de 400 M$ à 460 M$. Croissance = (460 − 400) / 400 = 15 %. Si la hausse vient surtout des prix plutôt que des volumes, la question de durabilité est différente.",
    mistakeEn: "Common mistake: assuming all revenue growth is equally valuable without checking margins, cash conversion and the source of growth.",
    mistakeFr: "Erreur fréquente : supposer que toute croissance du revenue a la même valeur sans vérifier les marges, la conversion en cash et la source de la croissance.",
    interviewEn: "Interview angle: explain both the growth rate and the driver—price, volume, mix or acquisitions—then connect it to margins and free cash flow.",
    interviewFr: "Angle entretien : explique le taux de croissance et son moteur — prix, volume, mix ou acquisitions — puis relie-le aux marges et au free cash flow.",
    investingEn: "Investing angle: recurring volume-led growth with stable margins may deserve a different valuation from acquisition-driven growth with weak cash conversion.",
    investingFr: "Angle investing : une croissance récurrente tirée par les volumes avec marges stables peut mériter une valorisation différente d’une croissance par acquisitions avec faible conversion en cash.",
    questionEn: "Revenue rises from 500 M$ to 575 M$. What is revenue growth?",
    questionFr: "Le revenue passe de 500 M$ à 575 M$. Quel est le revenue growth ?",
    answer: "15%",
    hintEn: "The increase is 75 M$. Divide it by the original 500 M$.",
    hintFr: "La hausse est de 75 M$. Divise-la par les 500 M$ de départ.",
    correctionEn: "(575 M$ − 500 M$) / 500 M$ = 75 / 500 = 15%.",
    correctionFr: "(575 M$ − 500 M$) / 500 M$ = 75 / 500 = 15 %.",
  },
  {
    titleEn: "P/E (Price-to-Earnings ratio) vs EV / EBITDA",
    titleFr: "P/E (Price-to-Earnings ratio) vs EV / EBITDA",
    lesson: "year-3-equity-research",
    definitionEn: "P/E compares Equity Value with net income attributable to shareholders. EV / EBITDA compares Enterprise Value with EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization).",
    definitionFr: "Le P/E compare l’Equity Value au net income revenant aux actionnaires. EV / EBITDA compare l’Enterprise Value à l’EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization).",
    whyEn: "The two multiples answer different questions and are affected differently by leverage, taxes and capital structure.",
    whyFr: "Les deux multiples répondent à des questions différentes et sont affectés différemment par l’endettement, les impôts et la structure de capital.",
    mechanismEn: "Use an Equity Value numerator with an equity-level denominator such as net income. Use Enterprise Value with an operating metric available before interest such as EBITDA.",
    mechanismFr: "Utilise un numérateur Equity Value avec un dénominateur au niveau actionnaire comme le net income. Utilise Enterprise Value avec un indicateur opérationnel avant intérêts comme l’EBITDA.",
    formula: "P/E = Price per Share / Earnings per Share · EV / EBITDA = Enterprise Value / EBITDA",
    legendEn: ["P/E = Price-to-Earnings ratio", "Earnings per Share = net income attributable to common shareholders divided by diluted shares", "EV = Enterprise Value", "EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization"],
    legendFr: ["P/E = Price-to-Earnings ratio / cours sur bénéfice", "Earnings per Share = net income revenant aux actionnaires ordinaires divisé par le nombre d’actions diluées", "EV = Enterprise Value", "EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization"],
    exampleEn: "If Enterprise Value is 1.0 B$ and EBITDA is 100 M$, EV / EBITDA = 10.0×. If a 20 $ share earns 2 $ per share, P/E = 10.0×.",
    exampleFr: "Si l’Enterprise Value est de 1,0 B$ et l’EBITDA de 100 M$, EV / EBITDA = 10,0×. Si une action à 20 $ génère 2 $ de bénéfice par action, P/E = 10,0×.",
    mistakeEn: "Common mistake: comparing multiples mechanically without understanding differences in leverage, accounting, growth and margins.",
    mistakeFr: "Erreur fréquente : comparer les multiples mécaniquement sans comprendre les différences d’endettement, de comptabilité, de croissance et de marges.",
    interviewEn: "Interview angle: explain why EV / EBITDA is capital-structure neutral relative to P/E and when each multiple is more useful.",
    interviewFr: "Angle entretien : explique pourquoi EV / EBITDA est plus neutre vis-à-vis de la structure de capital que P/E et quand chaque multiple est le plus utile.",
    investingEn: "Investing angle: a low multiple is not automatically cheap. It may reflect weak growth, cyclicality, high risk or falling earnings expectations.",
    investingFr: "Angle investing : un multiple faible n’est pas automatiquement bon marché. Il peut refléter une faible croissance, de la cyclicité, un risque élevé ou des attentes de bénéfices en baisse.",
    questionEn: "Enterprise Value is 2.4 B$ and EBITDA is 240 M$. What is EV / EBITDA?",
    questionFr: "L’Enterprise Value est de 2,4 B$ et l’EBITDA de 240 M$. Quel est EV / EBITDA ?",
    answer: "10.0×",
    hintEn: "Convert both values to the same unit, then divide 2.4 B$ by 0.24 B$.",
    hintFr: "Convertis les deux valeurs dans la même unité, puis divise 2,4 B$ par 0,24 B$.",
    correctionEn: "2.4 B$ / 0.24 B$ = 10.0×.",
    correctionFr: "2,4 B$ / 0,24 B$ = 10,0×.",
  },
  {
    titleEn: "Portfolio return: weighted averages",
    titleFr: "Rendement de portefeuille : moyenne pondérée",
    lesson: "year-1-portfolio-basics",
    definitionEn: "Portfolio return is the weighted average of the returns of the assets held in the portfolio.",
    definitionFr: "Le rendement d’un portefeuille est la moyenne pondérée des rendements des actifs détenus.",
    whyEn: "It is the basic logic behind asset allocation, performance attribution and understanding which positions drive portfolio results.",
    whyFr: "C’est la logique de base derrière l’allocation d’actifs, l’attribution de performance et l’identification des positions qui expliquent le résultat du portefeuille.",
    mechanismEn: "Multiply each asset return by its portfolio weight, then add all contributions.",
    mechanismFr: "Multiplie le rendement de chaque actif par son poids dans le portefeuille, puis additionne toutes les contributions.",
    formula: "Portfolio Return = Σ(weight × asset return)",
    legendEn: ["weight = percentage of portfolio invested in the asset", "asset return = return of that asset over the period", "Σ = sum of all asset contributions"],
    legendFr: ["weight = pourcentage du portefeuille investi dans l’actif", "asset return = rendement de cet actif sur la période", "Σ = somme de toutes les contributions"],
    exampleEn: "60% equities returning 8% and 40% bonds returning 3% gives 0.60 × 8% + 0.40 × 3% = 6.0%.",
    exampleFr: "60 % d’actions rapportant 8 % et 40 % d’obligations rapportant 3 % donnent 0,60 × 8 % + 0,40 × 3 % = 6,0 %.",
    mistakeEn: "Common mistake: averaging asset returns without weighting them by the amount of capital invested.",
    mistakeFr: "Erreur fréquente : faire une moyenne simple des rendements sans les pondérer par le capital investi.",
    interviewEn: "Interview angle: show each contribution separately so the interviewer can follow the arithmetic and the allocation logic.",
    interviewFr: "Angle entretien : montre chaque contribution séparément pour que le recruteur puisse suivre le calcul et la logique d’allocation.",
    investingEn: "Investing angle: a small high-return position may contribute less than a large modest-return position. Contribution matters as much as headline return.",
    investingFr: "Angle investing : une petite position à fort rendement peut contribuer moins qu’une grande position au rendement modeste. La contribution compte autant que le rendement affiché.",
    questionEn: "A portfolio is 70% equities returning 6% and 30% bonds returning 2%. What is total return?",
    questionFr: "Un portefeuille est composé à 70 % d’actions rapportant 6 % et 30 % d’obligations rapportant 2 %. Quel est le rendement total ?",
    answer: "4.8%",
    hintEn: "Calculate each contribution separately, then add them.",
    hintFr: "Calcule chaque contribution séparément puis additionne-les.",
    correctionEn: "0.70 × 6% = 4.2% and 0.30 × 2% = 0.6%; total = 4.8%.",
    correctionFr: "0,70 × 6 % = 4,2 % et 0,30 × 2 % = 0,6 % ; total = 4,8 %.",
  },
];

export default function ChallengePage() {
  const { isFrench, text } = useLanguage();
  const params = useSearchParams();
  const role = params.get("role") || "Finance";
  const headline = params.get("headline");
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const concept = useMemo(() => {
    const seed = [...localDayKey()].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return concepts.find(item => item.titleEn === params.get("concept") || item.titleFr === params.get("concept")) || concepts.find(item => item.lesson === params.get("lesson")) || concepts[seed % concepts.length];
  }, [params]);

  const professorLink = professorHref({
    lessonSlug: concept.lesson,
    question: `Teach me today's FinanceStudio challenge concept step by step, with definition, intuition, formula legend, a worked example, common mistake, interview angle, investing angle and one verification question: ${concept.titleEn}`,
    source: "lesson",
  });

  const legend = isFrench ? concept.legendFr : concept.legendEn;

  return (
    <main className="daily-challenge-page">
      <Link href="/" className="challenge-close" aria-label={text("Close challenge", "Fermer le challenge")}>×</Link>
      <section className="daily-challenge-wrap">
        <header className="daily-challenge-hero">
          <div>
            <span className="mini-label">{text("DAILY FINANCE CHALLENGE", "CHALLENGE FINANCE DU JOUR")}</span>
            <h1>{isFrench ? concept.titleFr : concept.titleEn}</h1>
            <p>{text("One concept per day. Learn the mechanism, see a worked example, calculate it yourself, then turn it into interview and investing reasoning.", "Un concept par jour. Comprends le mécanisme, regarde un exemple corrigé, calcule toi-même puis transforme-le en raisonnement entretien et investissement.")}</p>
          </div>
          <div className="daily-concept-chip">{text("Today’s concept", "Concept du jour")}</div>
        </header>

        <section className="challenge-roadmap">
          <article><b>1</b><span>{text("Understand the concept", "Comprendre le concept")}</span></article>
          <article><b>2</b><span>{text("Read the worked example", "Lire l’exemple corrigé")}</span></article>
          <article><b>3</b><span>{text("Do the calculation", "Faire le calcul")}</span></article>
          <article><b>4</b><span>{text("Check the correction", "Vérifier la correction")}</span></article>
          <article><b>5</b><span>{text("Explain it in an interview", "L’expliquer en entretien")}</span></article>
          <article><b>6</b><span>{text("Turn it into investing", "Le transformer en implication investing")}</span></article>
        </section>

        <section className="challenge-grid-wide">
          <article className="challenge-learning-card">
            <span className="mini-label">01 · {text("DEFINITION & WHY THIS MATTERS", "DÉFINITION & POURQUOI C’EST IMPORTANT")}</span>
            <h2>{text("Definition", "Définition")}</h2>
            <p>{isFrench ? concept.definitionFr : concept.definitionEn}</p>
            <h3>{text("Why it matters", "Pourquoi c’est important")}</h3>
            <p>{isFrench ? concept.whyFr : concept.whyEn}</p>
            {headline && <div className="challenge-context-note"><strong>{text("Context", "Contexte")}</strong><span>{headline}</span></div>}
          </article>
          <article className="challenge-learning-card">
            <span className="mini-label">02 · {text("MECHANISM", "MÉCANISME")}</span>
            <p>{isFrench ? concept.mechanismFr : concept.mechanismEn}</p>
            <div className="challenge-formula">{concept.formula}</div>
            <div className="challenge-formula-legend">
              <strong>{text("Formula legend", "Légende de la formule")}</strong>
              {legend.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        </section>

        <article className="challenge-learning-card challenge-worked-example">
          <span className="mini-label">03 · {text("WORKED EXAMPLE", "EXEMPLE CORRIGÉ")}</span>
          <h2>{text("See the logic before doing it yourself", "Comprends la logique avant de le faire toi-même")}</h2>
          <p>{isFrench ? concept.exampleFr : concept.exampleEn}</p>
          <div className="challenge-common-mistake"><strong>{text("Common mistake", "Erreur fréquente")}</strong><p>{isFrench ? concept.mistakeFr : concept.mistakeEn}</p></div>
          <div className="chip-row">
            <Link className="chip" href={`/university/${concept.lesson}`}>{text("Open related lesson", "Ouvrir le cours lié")}</Link>
            <Link className="chip" href={professorLink}>{text("Ask AI Professor", "Demander au Professeur IA")}</Link>
          </div>
        </article>

        <article className="challenge-learning-card challenge-practice-card">
          <span className="mini-label">04 · {text("YOUR TURN", "À TOI")}</span>
          <h2>{isFrench ? concept.questionFr : concept.questionEn}</h2>
          <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={text("Write the answer and one sentence explaining your reasoning…", "Écris la réponse et une phrase expliquant ton raisonnement…")} />
          <div className="chip-row">
            <button type="button" className="chip" onClick={() => setShowHint((value) => !value)}>{showHint ? text("Hide hint", "Masquer l’indice") : text("Show hint", "Voir un indice")}</button>
            <button type="button" className="chip active" onClick={() => setSubmitted(true)}>{text("Check the correction", "Vérifier la correction")}</button>
          </div>
          {showHint && <div className="challenge-feedback"><strong>{text("Hint", "Indice")}</strong><p>{isFrench ? concept.hintFr : concept.hintEn}</p></div>}
          {submitted && <div className="challenge-correction"><strong>{text("Reference answer", "Réponse de référence")}: {concept.answer}</strong><p>{isFrench ? concept.correctionFr : concept.correctionEn}</p></div>}
        </article>

        <section className="challenge-grid-wide">
          <article className="challenge-learning-card">
            <span className="mini-label">05 · {text("INTERVIEW ANGLE", "ANGLE ENTRETIEN")}</span>
            <h2>{text("Explain the concept in 60 seconds", "Explique le concept en 60 secondes")}</h2>
            <p>{isFrench ? concept.interviewFr : concept.interviewEn}</p>
            <p>{text(`Target role: ${role}. Define the concept, explain the mechanism, use today's numerical example, then finish with one limitation or caveat.`, `Métier cible : ${role}. Définis le concept, explique le mécanisme, utilise l’exemple chiffré du jour puis termine avec une limite ou un caveat.`)}</p>
            <Link className="full-button" href={`/interview?${new URLSearchParams({ track: role, concept: concept.titleEn, lesson: concept.lesson, source: "daily-challenge", question: `Explain ${concept.titleEn} in an interview-ready way with a numerical example and one caveat.` }).toString()}`}>{text("Practice this interview answer", "Pratiquer cette réponse")} →</Link>
          </article>
          <article className="challenge-learning-card">
            <span className="mini-label">06 · {text("INVESTING ANGLE", "ANGLE INVESTING")}</span>
            <h2>{text("Turn knowledge into a testable view", "Transforme la connaissance en vue testable")}</h2>
            <p>{isFrench ? concept.investingFr : concept.investingEn}</p>
            <p>{text("Ask: what variable changes, which asset or company reacts, what is the expected direction, and what data point would invalidate the thesis?", "Demande-toi : quelle variable change, quel actif ou quelle entreprise réagit, quelle direction est attendue et quelle donnée invaliderait la thèse ?")}</p>
            <Link className="full-button inverse" href={`/investing?${new URLSearchParams({ source: "daily-challenge", concept: concept.titleEn, lesson: concept.lesson, catalyst: concept.titleEn, thesis: `Build a testable investment thesis from today's concept: ${concept.titleEn}.` }).toString()}`}>{text("Build a thesis", "Construire une thèse")} →</Link>
          </article>
        </section>

        <footer className="challenge-finish-bar">
          <div><strong>{text("Finished?", "Terminé ?")}</strong><span>{text("If you can explain the concept without looking, the loop is complete.", "Si tu peux expliquer le concept sans regarder, la boucle est terminée.")}</span></div>
          <Link href="/" className="chip active">{text("Back to dashboard", "Retour au dashboard")} →</Link>
        </footer>
      </section>
    </main>
  );
}
