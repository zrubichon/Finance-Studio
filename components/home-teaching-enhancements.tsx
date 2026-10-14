"use client";

import { useEffect } from "react";

function answerForStep(step: string, french: boolean): string {
  const s = step.toLowerCase();

  if (s.includes("cpi") || s.includes("inflation")) {
    return french
      ? "Réponse modèle : commence par comparer le CPI publié au consensus, car le marché réagit surtout à la surprise et non au chiffre isolé. Par exemple, un CPI à 3,2 % contre 2,8 % attendu représente une surprise de +0,4 point. Cela indique une inflation plus persistante que prévu et peut rendre la Fed plus hawkish. Le point clé en entretien est de préciser que si un chiffre élevé était déjà anticipé, la réaction de marché peut être limitée."
      : "Model answer: start by comparing the actual CPI print with consensus because markets react mainly to the surprise, not the isolated number. For example, 3.2% CPI versus 2.8% expected is a +0.4 percentage-point surprise. That suggests inflation is more persistent than investors expected and can push the Fed in a more hawkish direction. In an interview, add that if a hot print was already priced in, the market reaction can still be limited.";
  }

  if (s.includes("fed") || s.includes("policy") || s.includes("central bank")) {
    return french
      ? "Réponse modèle : une inflation supérieure aux attentes réduit généralement la probabilité de baisses de taux rapides. Le marché peut donc reporter les cuts, en prévoir moins, ou anticiper un taux directeur plus élevé plus longtemps. Cette révision touche d’abord les maturités courtes comme le 2Y, très sensibles aux anticipations de Fed. Ensuite, regarde ce qui était déjà pricé : c’est le changement d’anticipation qui compte."
      : "Model answer: hotter-than-expected inflation usually reduces the probability of rapid rate cuts. The market may push cuts further out, price fewer cuts, or expect the policy rate to stay higher for longer. That repricing normally hits short maturities such as the 2-year Treasury first because they are highly sensitive to Fed expectations. Then check what was already priced: the change in expectations is what matters.";
  }

  if (s.includes("treasury") || s.includes("yield") || s.includes("rates")) {
    return french
      ? "Réponse modèle : si le marché anticipe une Fed plus restrictive, les yields des Treasuries ont tendance à monter et les prix obligataires à baisser. Le 2Y réagit fortement au chemin attendu des Fed Funds ; le 10Y intègre aussi croissance, inflation de long terme, offre de Treasuries et term premium. Compare donc 2Y et 10Y pour savoir si le mouvement est surtout monétaire ou plus largement macro. Une hausse des yields resserre aussi les conditions financières."
      : "Model answer: if investors expect a more restrictive Fed, Treasury yields usually rise and bond prices fall. The 2-year yield reacts strongly to the expected Fed Funds path, while the 10-year also reflects long-run inflation, growth, Treasury supply and term premium. Compare the 2Y and 10Y moves to judge whether the repricing is mainly monetary-policy driven or broader macro. Higher yields also tighten financial conditions.";
  }

  if (s.includes("equity") || s.includes("stock")) {
    return french
      ? "Réponse modèle : des yields plus élevés augmentent le discount rate utilisé pour valoriser les cash flows futurs. Toutes choses égales par ailleurs, cela réduit leur valeur actuelle et peut comprimer les multiples de valorisation. Les actions de croissance et longue duration sont souvent plus sensibles car une plus grande part de leur valeur dépend de cash flows éloignés. Vérifie cependant si de meilleures perspectives de croissance compensent la hausse des taux."
      : "Model answer: higher yields increase the discount rate used to value future cash flows. All else equal, that lowers present values and can compress valuation multiples. Growth and long-duration equities are often more sensitive because more of their value depends on cash flows far in the future. However, check whether stronger growth expectations are offsetting the rate move.";
  }

  if (s.includes("fx") || s.includes("dollar") || s.includes("currency")) {
    return french
      ? "Réponse modèle : si les taux américains montent relativement aux taux étrangers, les actifs en dollars peuvent devenir plus attractifs. Les flux de capitaux peuvent alors soutenir le dollar. Mais le FX dépend d’un différentiel : il faut comparer les anticipations de taux et de croissance des deux économies, pas regarder les États-Unis seuls. Le positionnement et le risk-off peuvent aussi renforcer ou inverser le mouvement."
      : "Model answer: if US rates rise relative to foreign rates, dollar assets can become more attractive and capital flows may support the dollar. But FX is a relative market, so compare rate and growth expectations in both economies rather than looking at the US alone. Positioning and risk-off demand can also strengthen or reverse the move.";
  }

  if (s.includes("credit") || s.includes("spread")) {
    return french
      ? "Réponse modèle : un choc inflationniste qui maintient les taux élevés augmente le coût de financement des entreprises et peut réduire leur marge de sécurité. Si le risque macro augmente, les investisseurs demandent davantage de compensation et les credit spreads peuvent s’élargir. Les émetteurs high yield sont généralement plus sensibles que l’investment grade. Surveille aussi défauts, refinancement et liquidité."
      : "Model answer: an inflation shock that keeps rates high raises corporate funding costs and can reduce financial cushions. If macro risk increases, investors demand more compensation and credit spreads can widen. High-yield issuers are generally more sensitive than investment-grade companies. Also watch defaults, refinancing needs and liquidity.";
  }

  if (s.includes("forecast") || s.includes("cash flow")) {
    return french
      ? "Réponse modèle : dans un DCF, commence par projeter le revenue et les marges pour obtenir l’EBIT, puis applique les taxes opérationnelles. Ajoute D&A, retire capex et variation de working capital pour arriver à l’unlevered free cash flow. L’objectif est de mesurer le cash généré par l’activité avant les décisions de financement, afin qu’il soit cohérent avec un discount au WACC."
      : "Model answer: in a DCF, start by forecasting revenue and margins to derive EBIT, then apply operating taxes. Add back D&A, subtract capex and the change in working capital to reach unlevered free cash flow. The goal is to measure cash generated by operations before financing decisions so it can be discounted consistently using WACC.";
  }

  if (s.includes("wacc") || s.includes("discount")) {
    return french
      ? "Réponse modèle : le WACC représente le rendement exigé par l’ensemble des apporteurs de capitaux. Il combine le cost of equity et le cost of debt après impôt, pondérés par leur poids dans la structure de capital. Plus le WACC est élevé, plus les cash flows futurs sont fortement actualisés et plus la valeur d’entreprise baisse. Il doit être cohérent avec le risque et la devise des cash flows."
      : "Model answer: WACC is the return required by all capital providers. It combines the cost of equity and after-tax cost of debt, weighted by their share of the capital structure. A higher WACC discounts future cash flows more heavily and lowers enterprise value. It should be consistent with the risk and currency of the cash flows being valued.";
  }

  if (s.includes("terminal")) {
    return french
      ? "Réponse modèle : la terminal value représente la valeur de tous les cash flows au-delà de la période de prévision explicite. Tu peux utiliser Gordon Growth, avec un taux de croissance soutenable à long terme, ou un exit multiple basé sur des comparables. Comme elle représente souvent une grande part du DCF, teste toujours la sensibilité au WACC, au growth rate ou au multiple."
      : "Model answer: terminal value represents all cash flows beyond the explicit forecast period. You can use Gordon Growth with a sustainable long-run growth rate, or an exit multiple based on comparable companies. Because terminal value often represents a large share of DCF value, always test sensitivity to WACC, growth rate or the exit multiple.";
  }

  return french
    ? "Réponse modèle : commence par définir précisément le mécanisme demandé, puis déroule la chaîne cause → anticipation → prix d’actif. Ajoute un exemple chiffré ou une comparaison quand c’est possible. Termine par le principal risque à ton scénario ou par ce qui pourrait déjà être pricé dans le marché. Cette structure montre que tu comprends le raisonnement plutôt que de réciter une direction de marché."
    : "Model answer: first define the mechanism precisely, then walk through the chain from cause → expectations → asset prices. Add a number or comparison whenever possible. Finish with the main risk to your view or what may already be priced into the market. This structure shows that you understand the reasoning rather than simply memorizing a market direction.";
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
      answer = document.createElement("span");
      answer.className = "interview-step-answer";
      row.querySelector("p")?.appendChild(answer);
    }

    const next = answerForStep(label, french);
    if (answer.textContent !== next) answer.textContent = next;
  });
}

export default function HomeTeachingEnhancements() {
  useEffect(() => {
    enhanceInterview();
    const timer = window.setInterval(enhanceInterview, 1_000);
    const onLanguage = () => window.setTimeout(enhanceInterview, 0);
    window.addEventListener("finance-studio-language-change", onLanguage);
    window.addEventListener("focus", enhanceInterview);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("finance-studio-language-change", onLanguage);
      window.removeEventListener("focus", enhanceInterview);
    };
  }, []);

  return null;
}
