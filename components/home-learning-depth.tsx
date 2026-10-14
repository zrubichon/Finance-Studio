"use client";

import { useEffect } from "react";

type Depth = {
  lessonEn: string;
  lessonFr: string;
  appliedEn: string;
  appliedFr: string;
  mistakeEn: string;
  mistakeFr: string;
  interviewEn: string;
  interviewFr: string;
};

const depthByTitle: Record<string, Depth> = {
  "What a stock price really represents": {
    lessonEn: "Think of a stock as a claim on future shareholder cash flows. The market continuously updates three big inputs: how much cash the company may generate, how quickly it may grow, and what return investors require for taking the risk. Price changes are therefore changes in expectations, not simply reactions to current profit.",
    lessonFr: "Pense une action comme un droit sur les cash flows futurs revenant aux actionnaires. Le marché met constamment à jour trois éléments : le cash futur attendu, la vitesse de croissance et le rendement exigé pour supporter le risque. Un changement de prix reflète donc surtout un changement d’anticipations.",
    appliedEn: "Example: a company is expected to generate $10 per share of future cash flows. If investors become more confident about growth, they may value those cash flows at a higher multiple. If rates rise instead, the required return can rise and the same cash flows become worth less today.",
    appliedFr: "Exemple : une entreprise devrait générer 10 $ par action de cash flows futurs. Si le marché devient plus confiant sur la croissance, il peut payer un multiple plus élevé. Si les taux montent, le rendement exigé peut monter et les mêmes cash flows valent moins aujourd’hui.",
    mistakeEn: "Common mistake: assuming a good company must always be a good stock. A great business can still be overpriced if expectations are already too high.",
    mistakeFr: "Erreur fréquente : croire qu’une bonne entreprise est automatiquement une bonne action. Une excellente entreprise peut rester survalorisée si les attentes sont déjà trop élevées.",
    interviewEn: "Interview link: explain a stock move through earnings expectations, valuation multiple and discount rate — not with a single headline.",
    interviewFr: "Lien entretien : explique un mouvement d’action avec les attentes de résultats, le multiple de valorisation et le discount rate, pas avec un seul titre de news.",
  },
  "Why bond prices move opposite to yields": {
    lessonEn: "A bond's coupon is fixed, but the market's required yield changes. When new bonds offer higher yields, an older bond with a lower coupon becomes less attractive. Its price falls until its return becomes competitive. Duration measures how sensitive that price is to yield changes.",
    lessonFr: "Le coupon d’une obligation est fixe, mais le rendement exigé par le marché change. Quand les nouvelles obligations offrent un yield plus élevé, une ancienne obligation devient moins attractive. Son prix baisse jusqu’à redevenir compétitif. La duration mesure cette sensibilité.",
    appliedEn: "Example: duration = 5 and yields rise by 0.40 percentage point. Approximate price move = −5 × 0.40% = −2.0%, before convexity.",
    appliedFr: "Exemple : duration = 5 et le yield monte de 0,40 point. Variation approximative du prix = −5 × 0,40 % = −2,0 %, avant convexité.",
    mistakeEn: "Common mistake: confusing coupon, current yield and yield to maturity. They answer different questions.",
    mistakeFr: "Erreur fréquente : confondre coupon, current yield et yield to maturity. Ils ne mesurent pas la même chose.",
    interviewEn: "Interview link: be able to explain why a hawkish central bank can hurt long-duration bonds and growth stocks at the same time.",
    interviewFr: "Lien entretien : sois capable d’expliquer pourquoi une banque centrale hawkish peut pénaliser à la fois les obligations longue duration et les actions de croissance.",
  },
  "How inflation moves markets": {
    lessonEn: "Inflation changes markets through several channels at once: central-bank policy, real purchasing power, company input costs and discount rates. The key market question is usually not whether inflation is high, but whether it is higher or lower than expected and what that changes about future policy.",
    lessonFr: "L’inflation agit par plusieurs canaux : politique monétaire, pouvoir d’achat réel, coûts des entreprises et discount rates. La vraie question de marché est souvent la surprise par rapport aux attentes et ce qu’elle change pour la politique future.",
    appliedEn: "Example: CPI expected at 2.8%, released at 3.2%. Traders may price fewer rate cuts, pushing short yields up; the currency can strengthen while rate-sensitive equities come under pressure.",
    appliedFr: "Exemple : CPI attendu à 2,8 %, publié à 3,2 %. Le marché peut anticiper moins de baisses de taux, faire monter les taux courts, renforcer la devise et peser sur les actions sensibles aux taux.",
    mistakeEn: "Common mistake: treating inflation as automatically bearish for every asset. The reaction depends on expectations, growth and positioning.",
    mistakeFr: "Erreur fréquente : penser que l’inflation est automatiquement négative pour tous les actifs. La réaction dépend des attentes, de la croissance et du positionnement.",
    interviewEn: "Interview link: always connect macro surprise → policy expectations → rates/FX → equities/credit.",
    interviewFr: "Lien entretien : relie toujours surprise macro → attentes de politique → taux/FX → actions/crédit.",
  },
  "Revenue, EBITDA and profit are not the same thing": {
    lessonEn: "Revenue tells you how much a company sells. EBITDA shows operating profitability before financing, tax and non-cash D&A. Net income goes further down the income statement. Free cash flow then adjusts for capital expenditure and working capital, which is why profit and cash generation can diverge.",
    lessonFr: "Le revenue mesure les ventes. L’EBITDA mesure la profitabilité opérationnelle avant financement, impôts et D&A. Le net income descend plus bas dans le compte de résultat. Le free cash flow ajuste ensuite capex et working capital : profit et cash peuvent donc diverger.",
    appliedEn: "Example: revenue = $500m, EBITDA margin = 20% → EBITDA = $100m. If margin falls to 15%, EBITDA becomes $75m even if sales are unchanged.",
    appliedFr: "Exemple : revenue = 500 M$, marge EBITDA = 20 % → EBITDA = 100 M$. Si la marge tombe à 15 %, l’EBITDA devient 75 M$ même si les ventes ne changent pas.",
    mistakeEn: "Common mistake: comparing companies only on revenue growth while ignoring margin quality and cash conversion.",
    mistakeFr: "Erreur fréquente : comparer les entreprises uniquement sur la croissance du revenue sans regarder la qualité des marges ni la conversion en cash.",
    interviewEn: "Interview link: explain how higher revenue can still lead to lower valuation if margins or free cash flow deteriorate.",
    interviewFr: "Lien entretien : explique comment un revenue en hausse peut quand même conduire à une valorisation plus basse si les marges ou le free cash flow se dégradent.",
  },
  "What the yield curve tells you": {
    lessonEn: "The curve is not one interest rate; it is a map of yields across maturities. Short yields are heavily influenced by expected central-bank policy. Longer yields also reflect inflation, growth, fiscal supply and term premium. Changes in slope can therefore carry information about the macro outlook.",
    lessonFr: "La yield curve n’est pas un seul taux : c’est une carte des yields selon les maturités. Les taux courts dépendent beaucoup des attentes de banque centrale. Les taux longs intègrent aussi inflation, croissance, offre obligataire et term premium.",
    appliedEn: "Example: 2Y = 4.80%, 10Y = 5.20%. 2s10s = +40 bps. If the 2Y falls to 4.40% while 10Y stays at 5.20%, the curve steepens to +80 bps.",
    appliedFr: "Exemple : 2Y = 4,80 %, 10Y = 5,20 %. Le 2s10s = +40 bps. Si le 2Y tombe à 4,40 % et le 10Y reste à 5,20 %, la courbe se steepen à +80 bps.",
    mistakeEn: "Common mistake: assuming an inverted curve predicts an immediate recession with certainty. It is a signal, not a clock.",
    mistakeFr: "Erreur fréquente : croire qu’une courbe inversée prédit avec certitude une récession immédiate. C’est un signal, pas une horloge.",
    interviewEn: "Interview link: describe whether a move is bull/bear steepening or flattening and what drove the short and long ends.",
    interviewFr: "Lien entretien : décris si le mouvement est bull/bear steepening ou flattening et ce qui bouge sur le court et le long terme.",
  },
  "Enterprise value versus equity value": {
    lessonEn: "Equity value is the market value of the shareholders' claim. Enterprise value represents the value of the operating business before deciding how that business is financed. That is why you add debt and subtract cash: debt holders also finance the enterprise, while excess cash is a non-operating asset that reduces the net price paid for the operations.",
    lessonFr: "L’equity value est la valeur de la part revenant aux actionnaires. L’enterprise value représente la valeur de l’activité opérationnelle avant de tenir compte de son financement. On ajoute donc la dette et on retire le cash : la dette finance aussi l’entreprise, tandis que le cash excédentaire réduit le prix net payé pour les opérations.",
    appliedEn: "Applied example: Equity value = $800m, debt = $300m, cash = $100m. EV = 800 + 300 − 100 = $1.0bn. If EBITDA is $100m, EV/EBITDA = 10.0x. This lets you compare the operating business with peers that may use different amounts of debt.",
    appliedFr: "Exemple appliqué : Equity value = 800 M$, dette = 300 M$, cash = 100 M$. EV = 800 + 300 − 100 = 1,0 Md$. Si l’EBITDA = 100 M$, EV/EBITDA = 10,0x. Cela permet de comparer l’activité avec des pairs ayant des niveaux de dette différents.",
    mistakeEn: "Common mistake: using equity value with EBITDA. EBITDA belongs to all capital providers, so EV/EBITDA is the internally consistent multiple; P/E pairs equity value with net income.",
    mistakeFr: "Erreur fréquente : utiliser equity value avec EBITDA. L’EBITDA appartient à tous les apporteurs de capitaux, donc EV/EBITDA est cohérent ; P/E associe equity value et net income.",
    interviewEn: "Interview link: know the bridge both directions — EV → equity value and equity value → EV — and explain why cash is subtracted and debt added.",
    interviewFr: "Lien entretien : maîtrise le bridge dans les deux sens — EV → equity value et equity value → EV — et explique pourquoi on retire le cash et ajoute la dette.",
  },
};

function applyDepth() {
  const card = document.querySelector<HTMLElement>(".daily-card");
  if (!card) return;
  const title = card.querySelector("h2")?.textContent?.trim() ?? "";
  const data = depthByTitle[title];
  if (!data) return;
  const french = document.documentElement.lang === "fr";

  let section = card.querySelector<HTMLElement>(".hourly-deep-lesson");
  if (!section) {
    section = document.createElement("section");
    section.className = "hourly-deep-lesson";
    card.querySelector(".hourly-update-note")?.before(section);
  }

  const renderKey = `${title}|${french ? "fr" : "en"}`;
  if (section.dataset.renderKey === renderKey) return;
  section.dataset.renderKey = renderKey;
  section.innerHTML = "";

  const items = [
    [french ? "MINI-LEÇON" : "MINI LESSON", french ? data.lessonFr : data.lessonEn, "lesson"],
    [french ? "EXEMPLE APPLIQUÉ" : "APPLIED EXAMPLE", french ? data.appliedFr : data.appliedEn, "applied"],
    [french ? "ERREUR FRÉQUENTE" : "COMMON MISTAKE", french ? data.mistakeFr : data.mistakeEn, "mistake"],
    [french ? "CONNEXION ENTRETIEN" : "INTERVIEW CONNECTION", french ? data.interviewFr : data.interviewEn, "interview"],
  ];

  for (const [label, copy, kind] of items) {
    const article = document.createElement("article");
    article.className = `deep-lesson-block ${kind}`;
    const heading = document.createElement("span");
    const p = document.createElement("p");
    heading.textContent = label;
    p.textContent = copy;
    article.append(heading, p);
    section.appendChild(article);
  }
}

export default function HomeLearningDepth() {
  useEffect(() => {
    applyDepth();
    const timer = window.setInterval(applyDepth, 1_000);
    window.addEventListener("finance-studio-language-change", applyDepth);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("finance-studio-language-change", applyDepth);
    };
  }, []);
  return null;
}
