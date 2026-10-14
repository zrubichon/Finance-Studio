"use client";

import { useEffect } from "react";

type Copy = { en: string; fr: string };

const appliedContext: Record<string, Copy> = {
  "What the yield curve tells you": {
    en: "What the numbers mean: 2Y = the annual yield investors require to lend to the US government for 2 years; 10Y = the equivalent yield for 10 years. The 2s10s spread is simply 10Y minus 2Y. At 5.20% − 4.80% = +0.40%, the curve is +40 bps. If the 2Y falls to 4.40% while the 10Y stays at 5.20%, the spread becomes +80 bps: the curve steepens because the gap between long and short yields has widened. Why it matters: the 2Y reacts strongly to expected Fed policy, while the 10Y also reflects longer-term inflation, growth, Treasury supply and term premium. A steepening therefore tells you which part of the macro outlook is being repriced.",
    fr: "Ce que représentent les chiffres : le 2Y est le rendement annuel demandé pour prêter au gouvernement américain pendant 2 ans ; le 10Y est le rendement équivalent sur 10 ans. Le spread 2s10s = 10Y − 2Y. Donc 5,20 % − 4,80 % = +0,40 %, soit +40 bps. Si le 2Y baisse à 4,40 % alors que le 10Y reste à 5,20 %, le spread passe à +80 bps : la courbe se steepen car l’écart entre taux long et taux court augmente. Pourquoi c’est important : le 2Y réagit surtout aux anticipations de Fed, alors que le 10Y intègre aussi inflation de long terme, croissance, offre de Treasuries et term premium. Le steepening montre donc quelle partie du scénario macro est en train d’être repricée.",
  },
  "Enterprise value versus equity value": {
    en: "What the numbers mean: $800m equity value is the market value belonging to shareholders. $300m debt represents financing that must also be supported by the operating business. $100m cash is subtracted because excess cash lowers the net price paid for the operations. EV = 800 + 300 − 100 = $1.0bn. If EBITDA is $100m, EV/EBITDA = 10.0x: investors are valuing the operating business at ten times this operating earnings measure. Why it matters: using EV removes much of the distortion created by different debt levels, so peer comparisons are more meaningful.",
    fr: "Ce que représentent les chiffres : 800 M$ d’equity value correspondent à la valeur de marché revenant aux actionnaires. Les 300 M$ de dette sont un financement que l’activité doit aussi supporter. Les 100 M$ de cash sont retirés car ce cash réduit le prix net payé pour l’activité. EV = 800 + 300 − 100 = 1,0 Md$. Avec 100 M$ d’EBITDA, EV/EBITDA = 10,0x : le marché valorise l’activité opérationnelle à dix fois cet indicateur de résultat. Pourquoi c’est important : l’EV réduit la distorsion créée par des niveaux de dette différents et permet de mieux comparer les entreprises.",
  },
  "Why bond prices move opposite to yields": {
    en: "What the numbers mean: duration 5 means the bond price is roughly 5% sensitive to a 1 percentage-point move in yield. A +0.40 percentage-point yield move therefore implies about −5 × 0.40% = −2.0% price impact. Why: the bond's coupon has not changed, but new market yields are now higher, so the old bond must become cheaper to offer a competitive return.",
    fr: "Ce que représentent les chiffres : une duration de 5 signifie qu’une variation de 1 point de pourcentage du yield produit environ 5 % de variation inverse du prix. Une hausse de +0,40 point donne donc environ −5 × 0,40 % = −2,0 %. Pourquoi : le coupon de l’obligation n’a pas changé, mais les nouveaux rendements de marché sont plus élevés ; l’ancienne obligation doit donc devenir moins chère pour redevenir compétitive.",
  },
  "How inflation moves markets": {
    en: "What the numbers mean: if consensus expected CPI at 2.8% and the release is 3.2%, the surprise is +0.4 percentage point. Markets care about this gap because asset prices already reflected the 2.8% expectation. A hotter print can make traders expect fewer Fed cuts or higher rates for longer, which can lift Treasury yields, support the dollar and pressure long-duration equities.",
    fr: "Ce que représentent les chiffres : si le consensus attendait un CPI à 2,8 % et que la publication sort à 3,2 %, la surprise est de +0,4 point. Le marché regarde surtout cet écart car les prix incorporaient déjà l’attente de 2,8 %. Une inflation plus forte peut faire anticiper moins de baisses de taux ou des taux élevés plus longtemps, ce qui peut faire monter les Treasuries yields, soutenir le dollar et peser sur les actions de longue duration.",
  },
  "Revenue, EBITDA and profit are not the same thing": {
    en: "What the numbers mean: $500m revenue is total sales. A 20% EBITDA margin means $20 of EBITDA for every $100 of sales, so EBITDA = $100m. At a 15% margin, EBITDA falls to $75m even with identical revenue. Why it matters: investors care not only about how much a company sells, but how efficiently those sales become operating profit and eventually cash flow.",
    fr: "Ce que représentent les chiffres : 500 M$ de revenue correspondent aux ventes totales. Une marge EBITDA de 20 % signifie 20 $ d’EBITDA pour 100 $ de ventes, donc 100 M$ d’EBITDA. À 15 % de marge, l’EBITDA tombe à 75 M$ même avec le même revenue. Pourquoi c’est important : les investisseurs regardent non seulement les ventes, mais aussi l’efficacité avec laquelle elles deviennent profit opérationnel puis cash flow.",
  },
  "What a stock price really represents": {
    en: "What the numbers mean: the $10 is not today's accounting profit; it represents an illustrative amount of future shareholder cash flow. Investors translate expected future cash into a value today using growth assumptions and a required return. Stronger growth can raise value, while a higher required return or discount rate lowers the present value of the same future cash flows.",
    fr: "Ce que représentent les chiffres : les 10 $ ne sont pas simplement le bénéfice comptable actuel ; ils représentent ici un montant illustratif de cash flows futurs pour l’actionnaire. Le marché transforme ce cash futur en valeur aujourd’hui à l’aide d’hypothèses de croissance et d’un rendement exigé. Une croissance plus forte peut augmenter la valeur, alors qu’un discount rate plus élevé réduit la valeur actuelle des mêmes cash flows.",
  },
};

function answerForStep(step: string, french: boolean): string {
  const s = step.toLowerCase();
  if (s.includes("cpi") || s.includes("inflation")) {
    return french
      ? "Réponse simple : compare le chiffre publié au consensus. Si le CPI sort au-dessus des attentes, c’est une surprise inflationniste positive et généralement plus hawkish pour les taux."
      : "Simple answer: compare the actual CPI print with consensus. If CPI is above expectations, it is a positive inflation surprise and usually more hawkish for rates.";
  }
  if (s.includes("fed") || s.includes("policy") || s.includes("central bank")) {
    return french
      ? "Réponse simple : une inflation plus forte peut pousser le marché à anticiper moins de baisses de taux, ou des taux élevés plus longtemps."
      : "Simple answer: hotter inflation can make the market price fewer rate cuts, or higher rates for longer.";
  }
  if (s.includes("treasury") || s.includes("yield") || s.includes("rates")) {
    return french
      ? "Réponse simple : si les taux Fed attendus montent, les yields des Treasuries ont tendance à monter aussi, surtout sur les maturités courtes ; le prix des obligations baisse."
      : "Simple answer: if expected Fed rates rise, Treasury yields usually rise too, especially at the front end; bond prices fall.";
  }
  if (s.includes("equity") || s.includes("stock")) {
    return french
      ? "Réponse simple : des yields plus élevés augmentent le discount rate, donc les actions — surtout les valeurs de croissance — peuvent subir une pression de valorisation."
      : "Simple answer: higher yields raise the discount rate, so equities — especially growth stocks — can face valuation pressure.";
  }
  if (s.includes("fx") || s.includes("dollar") || s.includes("currency")) {
    return french
      ? "Réponse simple : si les taux américains deviennent relativement plus attractifs, le dollar peut se renforcer car les capitaux recherchent ce rendement supérieur."
      : "Simple answer: if US rates become relatively more attractive, the dollar can strengthen as capital seeks the higher yield.";
  }
  if (s.includes("credit") || s.includes("spread")) {
    return french
      ? "Réponse simple : si le choc augmente l’incertitude ou resserre les conditions financières, les credit spreads peuvent s’élargir car les investisseurs demandent plus de rémunération pour le risque."
      : "Simple answer: if the shock raises uncertainty or tightens financial conditions, credit spreads can widen because investors demand more compensation for risk.";
  }
  if (s.includes("forecast") || s.includes("cash flow")) {
    return french
      ? "Réponse simple : projette les principaux revenus, marges, impôts, capex et working capital pour arriver au free cash flow opérationnel."
      : "Simple answer: forecast revenue, margins, taxes, capex and working capital to arrive at operating free cash flow.";
  }
  if (s.includes("wacc") || s.includes("discount")) {
    return french
      ? "Réponse simple : le WACC est le rendement exigé par les apporteurs de capitaux ; il sert à ramener les cash flows futurs à leur valeur d’aujourd’hui."
      : "Simple answer: WACC is the return required by capital providers; it discounts future cash flows back to today's value.";
  }
  if (s.includes("terminal")) {
    return french
      ? "Réponse simple : la terminal value estime la valeur de l’entreprise après la période de prévision explicite, souvent avec Gordon Growth ou un exit multiple."
      : "Simple answer: terminal value estimates the company's value after the explicit forecast period, usually with Gordon Growth or an exit multiple.";
  }
  return french
    ? "Réponse simple : explique d’abord le mécanisme principal, puis donne l’impact marché et termine par ce qui pourrait invalider ton scénario."
    : "Simple answer: explain the main mechanism first, then the market impact, and finish with what could invalidate your view.";
}

function enhanceAppliedExample() {
  const card = document.querySelector<HTMLElement>(".daily-card");
  if (!card) return;
  const title = card.querySelector("h2")?.textContent?.trim() ?? "";
  const context = appliedContext[title];
  if (!context) return;
  const applied = card.querySelector<HTMLElement>(".deep-lesson-block.applied");
  if (!applied) return;
  const french = document.documentElement.lang === "fr";
  let extra = applied.querySelector<HTMLElement>(".applied-context-extra");
  if (!extra) {
    extra = document.createElement("p");
    extra.className = "applied-context-extra";
    applied.appendChild(extra);
  }
  const next = french ? context.fr : context.en;
  if (extra.textContent !== next) extra.textContent = next;
}

function enhanceInterview() {
  const card = document.querySelector<HTMLElement>(".interview-card");
  if (!card) return;
  const french = document.documentElement.lang === "fr";
  card.querySelectorAll<HTMLElement>(".answer-framework > div").forEach((row) => {
    const label = row.querySelector("strong")?.textContent?.trim() ?? "";
    if (!label) return;
    let answer = row.querySelector<HTMLElement>(".interview-step-answer");
    if (!answer) {
      answer = document.createElement("small");
      answer.className = "interview-step-answer";
      row.querySelector("p")?.appendChild(answer);
    }
    const next = answerForStep(label, french);
    if (answer.textContent !== next) answer.textContent = next;
  });
}

function enhance() {
  enhanceAppliedExample();
  enhanceInterview();
}

export default function HomeTeachingEnhancements() {
  useEffect(() => {
    enhance();
    const timer = window.setInterval(enhance, 1500);
    const onLanguage = () => window.setTimeout(enhance, 0);
    window.addEventListener("finance-studio-language-change", onLanguage);
    window.addEventListener("focus", enhance);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("finance-studio-language-change", onLanguage);
      window.removeEventListener("focus", enhance);
    };
  }, []);
  return null;
}
