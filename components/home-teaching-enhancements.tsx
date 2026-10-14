"use client";

import { useEffect } from "react";

function answerForStep(step: string, french: boolean): string {
  const s = step.toLowerCase();

  if (s.includes("cpi") || s.includes("inflation")) {
    return french
      ? "Réponse modèle : compare d’abord le CPI publié au consensus, car le marché réagit surtout à la surprise. Exemple : 3,2 % publié contre 2,8 % attendu = surprise de +0,4 point. Cela suggère une inflation plus persistante que prévu, donc potentiellement une Fed plus hawkish. Ensuite précise ce qui était déjà pricé : si le marché attendait déjà un chiffre élevé, la réaction peut être limitée."
      : "Model answer: first compare the actual CPI print with consensus because markets react mainly to the surprise. Example: 3.2% actual versus 2.8% expected = a +0.4 percentage-point surprise. That suggests inflation is more persistent than expected and can push the Fed in a more hawkish direction. Then explain what was already priced in: if investors already expected a hot print, the market reaction may be smaller.";
  }

  if (s.includes("fed") || s.includes("policy") || s.includes("central bank")) {
    return french
      ? "Réponse modèle : une inflation plus forte que prévu réduit généralement la probabilité de baisses de taux rapides. Le marché peut donc repousser les cuts, en prévoir moins, ou anticiper des taux élevés plus longtemps. Cette révision touche souvent d’abord le 2Y Treasury, très sensible au chemin attendu des Fed Funds. Le point important est le changement d’anticipation, pas seulement le niveau absolu des taux."
      : "Model answer: hotter-than-expected inflation usually reduces the probability of rapid rate cuts. Markets may push cuts further out, price fewer cuts, or expect rates to stay higher for longer. This repricing often hits the 2-year Treasury first because it is highly sensitive to the expected Fed Funds path. The key point is the change in expectations, not just the absolute level of rates.";
  }

  if (s.includes("treasury") || s.includes("yield") || s.includes("rates")) {
    return french
      ? "Réponse modèle : si le marché anticipe une Fed plus restrictive, les Treasury yields montent généralement et les prix obligataires baissent. Le 2Y réagit surtout aux attentes de Fed ; le 10Y reflète aussi croissance, inflation de long terme, offre de Treasuries et term premium. Compare le mouvement du 2Y et du 10Y pour voir si le repricing est principalement monétaire ou plus largement macro."
      : "Model answer: if investors expect a more restrictive Fed, Treasury yields usually rise and bond prices fall. The 2-year reacts mainly to Fed expectations, while the 10-year also reflects long-run inflation, growth, Treasury supply and term premium. Compare the 2Y and 10Y moves to judge whether the repricing is mainly monetary-policy driven or broader macro.";
  }

  if (s.includes("forecast") || s.includes("cash flow")) {
    return french
      ? "Réponse modèle : dans un DCF, projette d’abord le revenue à partir des volumes, prix ou croissance du marché, puis applique des hypothèses de marge pour obtenir l’EBIT. Après impôts opérationnels, ajoute D&A, retire capex et variation du working capital pour obtenir l’unlevered free cash flow. Ce cash flow appartient à tous les apporteurs de capitaux, donc il sera actualisé au WACC."
      : "Model answer: in a DCF, first forecast revenue using volume, pricing or market-growth assumptions, then apply margin assumptions to derive EBIT. After operating taxes, add back D&A, subtract capex and the change in working capital to reach unlevered free cash flow. This cash flow belongs to all capital providers, so it is discounted using WACC.";
  }

  if (s.includes("wacc") || s.includes("discount")) {
    return french
      ? "Réponse modèle : le WACC est le rendement exigé par l’ensemble des apporteurs de capitaux. Il combine le cost of equity et le cost of debt après impôt, pondérés par leur poids dans la structure de capital. Plus le WACC est élevé, plus les cash flows futurs sont fortement actualisés et plus l’enterprise value baisse. Il doit rester cohérent avec le risque et la devise des cash flows."
      : "Model answer: WACC is the return required by all capital providers. It combines the cost of equity and after-tax cost of debt, weighted by their share of the capital structure. A higher WACC discounts future cash flows more heavily and lowers enterprise value. It should stay consistent with the risk and currency of the cash flows being valued.";
  }

  if (s.includes("terminal")) {
    return french
      ? "Réponse modèle : la terminal value représente tous les cash flows au-delà de la période de prévision explicite. Tu peux utiliser Gordon Growth — FCF final × (1+g) / (WACC−g) — ou un exit multiple appliqué à une métrique comme EBITDA. Comme elle représente souvent une grande part du DCF, teste toujours la sensibilité au WACC, au taux de croissance et au multiple."
      : "Model answer: terminal value represents all cash flows beyond the explicit forecast period. You can use Gordon Growth — final FCF × (1+g) / (WACC−g) — or an exit multiple applied to a metric such as EBITDA. Because terminal value often represents a large share of DCF value, always test sensitivity to WACC, growth and the exit multiple.";
  }

  if (s.includes("equity") || s.includes("stock")) {
    return french
      ? "Réponse modèle : des yields plus élevés augmentent le discount rate utilisé pour valoriser les cash flows futurs. Toutes choses égales par ailleurs, cela réduit leur valeur actuelle et peut comprimer les multiples. Les actions de croissance sont souvent plus sensibles car une plus grande part de leur valeur dépend de cash flows éloignés. Vérifie toutefois si de meilleures perspectives de croissance compensent la hausse des taux."
      : "Model answer: higher yields increase the discount rate used to value future cash flows. All else equal, that reduces present values and can compress valuation multiples. Growth stocks are often more sensitive because more of their value depends on distant cash flows. However, check whether stronger growth expectations offset the rate move.";
  }

  if (s.includes("fx") || s.includes("dollar") || s.includes("currency")) {
    return french
      ? "Réponse modèle : si les taux américains montent relativement aux taux étrangers, les actifs en dollars peuvent devenir plus attractifs et soutenir le dollar. Mais le FX est relatif : compare toujours les anticipations de taux et de croissance des deux économies. Le positionnement et le risk-off peuvent aussi renforcer ou inverser le mouvement."
      : "Model answer: if US rates rise relative to foreign rates, dollar assets can become more attractive and support the dollar. But FX is relative: always compare rate and growth expectations in both economies. Positioning and risk-off demand can also strengthen or reverse the move.";
  }

  if (s.includes("credit") || s.includes("spread")) {
    return french
      ? "Réponse modèle : un choc qui maintient les taux élevés augmente le coût de financement et peut réduire la marge de sécurité des entreprises. Si le risque macro augmente, les investisseurs demandent davantage de compensation et les credit spreads peuvent s’élargir. Le high yield est généralement plus sensible que l’investment grade."
      : "Model answer: a shock that keeps rates high raises corporate funding costs and can reduce financial cushions. If macro risk rises, investors demand more compensation and credit spreads can widen. High yield is generally more sensitive than investment grade.";
  }

  return french
    ? "Réponse modèle : définis d’abord le mécanisme, puis déroule la chaîne cause → anticipation → prix d’actif. Ajoute un chiffre ou une comparaison quand c’est possible, puis termine par le principal risque au scénario ou par ce qui pourrait déjà être pricé dans le marché."
    : "Model answer: first define the mechanism, then walk through the chain from cause → expectations → asset prices. Add a number or comparison whenever possible, then finish with the main risk to the scenario or what may already be priced into the market.";
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

function enhanceAppliedExample() {
  const card = document.querySelector<HTMLElement>(".daily-card");
  if (!card) return;
  const title = card.querySelector("h2")?.textContent?.trim() ?? "";
  const applied = card.querySelector<HTMLElement>(".deep-lesson-block.applied");
  if (!applied || title !== "Enterprise value versus equity value") return;

  const french = document.documentElement.lang === "fr";
  let breakdown = applied.querySelector<HTMLElement>(".applied-breakdown");
  if (!breakdown) {
    breakdown = document.createElement("div");
    breakdown.className = "applied-breakdown";
    applied.appendChild(breakdown);
  }

  const items = french
    ? [
        ["1 · Equity value = 800 M$", "C’est la valeur de marché des actions, donc la part de valeur qui revient aux actionnaires."],
        ["2 · + Dette = 300 M$", "On ajoute la dette car l’enterprise value mesure la valeur de l’activité avant de décider comment elle est financée. Les prêteurs ont eux aussi financé cette activité."],
        ["3 · − Cash = 100 M$", "On retire le cash excédentaire car un acquéreur qui paie l’entreprise récupère aussi ce cash. Il réduit donc le prix net payé pour les opérations."],
        ["4 · EV = 1,0 Md$", "Calcul : 800 + 300 − 100 = 1 000 M$. C’est la valeur économique de l’activité opérationnelle pour l’ensemble des apporteurs de capitaux."],
      ]
    : [
        ["1 · Equity value = $800m", "This is the market value of the shares, so it represents the value belonging to common shareholders."],
        ["2 · + Debt = $300m", "Debt is added because enterprise value measures the operating business before deciding how it is financed. Lenders also financed that business."],
        ["3 · − Cash = $100m", "Excess cash is subtracted because an acquirer buying the company also receives that cash. It reduces the net price paid for the operations."],
        ["4 · EV = $1.0bn", "Calculation: 800 + 300 − 100 = 1,000m. This is the economic value of the operating business available to all capital providers."],
      ];

  breakdown.innerHTML = "";
  for (const [heading, copy] of items) {
    const box = document.createElement("div");
    const strong = document.createElement("strong");
    const p = document.createElement("p");
    strong.textContent = heading;
    p.textContent = copy;
    box.append(strong, p);
    breakdown.appendChild(box);
  }

  let consequence = applied.querySelector<HTMLElement>(".applied-consequence");
  if (!consequence) {
    consequence = document.createElement("p");
    consequence.className = "applied-consequence";
    applied.appendChild(consequence);
  }

  consequence.textContent = french
    ? "Conséquence pour la valorisation : si l’EBITDA est de 100 M$, alors EV/EBITDA = 1 000 / 100 = 10,0x. Ce multiple compare la valeur de toute l’activité à un résultat opérationnel disponible avant intérêts. C’est pour cela qu’EV/EBITDA est cohérent, alors que P/E utilise equity value et net income. Deux sociétés avec le même EBITDA peuvent avoir des equity values très différentes si leur dette et leur cash diffèrent, mais leur EV permet une comparaison plus propre de l’activité elle-même."
    : "Valuation consequence: if EBITDA is $100m, EV/EBITDA = 1,000 / 100 = 10.0x. This multiple compares the value of the whole operating business with an operating earnings measure before interest. That is why EV/EBITDA is internally consistent, while P/E pairs equity value with net income. Two companies with the same EBITDA can have very different equity values because their debt and cash differ, but EV gives a cleaner comparison of the underlying operations.";
}

function enhance() {
  enhanceInterview();
  enhanceAppliedExample();
}

export default function HomeTeachingEnhancements() {
  useEffect(() => {
    enhance();
    const timer = window.setInterval(enhance, 1_000);
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
