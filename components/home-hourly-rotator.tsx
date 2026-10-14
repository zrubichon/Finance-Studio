"use client";

import { useEffect } from "react";

type Level = "Beginner" | "Intermediate" | "Professional";
type Brief = {
  en: { title: string; body: string; term: string; flow: string[] };
  fr: { title: string; body: string; term: string; flow: string[] };
};

type InterviewVariant = {
  en: string;
  fr: string;
  stepsEn: string[];
  stepsFr: string[];
  wantsEn: string;
  wantsFr: string;
  mistakeEn: string;
  mistakeFr: string;
};

const briefs: Record<Level, Brief[]> = {
  Beginner: [
    { en: { title: "Why bond prices move opposite to yields", body: "A bond promises fixed cash flows. When market yields rise, new bonds offer better returns, so the price of an existing lower-yield bond must fall to stay competitive.", term: "yield / rendement", flow: ["Market yield ↑", "Old coupon unchanged", "Existing bond less attractive", "Bond price ↓"] }, fr: { title: "Pourquoi le prix des obligations baisse quand les yields montent", body: "Une obligation promet des flux fixes. Quand les rendements de marché montent, les nouvelles obligations deviennent plus attractives : le prix d’une ancienne obligation doit donc baisser pour rester compétitif.", term: "rendement / yield", flow: ["Yield de marché ↑", "Coupon inchangé", "Ancienne obligation moins attractive", "Prix de l’obligation ↓"] } },
    { en: { title: "What a stock price actually represents", body: "A stock price reflects what investors are willing to pay today for a share of a company’s future profits and cash flows, adjusted for risk and expectations.", term: "equity value / valeur des capitaux propres", flow: ["Future cash flows", "Growth expectations", "Risk / discount rate", "Share price"] }, fr: { title: "Ce que représente vraiment le prix d’une action", body: "Le prix d’une action reflète ce que les investisseurs acceptent de payer aujourd’hui pour une part des profits et cash flows futurs de l’entreprise, ajustés du risque et des anticipations.", term: "valeur des capitaux propres / equity value", flow: ["Cash flows futurs", "Anticipations de croissance", "Risque / discount rate", "Prix de l’action"] } },
    { en: { title: "How inflation reaches markets", body: "Inflation can change central-bank expectations, interest rates, company costs and consumer demand. Markets react to the whole chain, not only to the inflation number.", term: "inflation expectations / anticipations d’inflation", flow: ["Inflation surprise", "Rate expectations", "Financing conditions", "Asset prices"] }, fr: { title: "Comment l’inflation se transmet aux marchés", body: "L’inflation peut modifier les anticipations de banque centrale, les taux, les coûts des entreprises et la demande. Les marchés réagissent à toute la chaîne, pas seulement au chiffre d’inflation.", term: "anticipations d’inflation / inflation expectations", flow: ["Surprise inflation", "Anticipations de taux", "Conditions financières", "Prix des actifs"] } },
    { en: { title: "Revenue is not profit", body: "Revenue is the money a company earns from selling goods or services. Profit is what remains after costs and expenses. Strong revenue growth does not automatically mean strong profit growth.", term: "margin / marge", flow: ["Revenue", "Costs", "Operating profit", "Net income"] }, fr: { title: "Le chiffre d’affaires n’est pas le profit", body: "Le chiffre d’affaires correspond aux ventes. Le profit est ce qu’il reste après les coûts et dépenses. Une forte croissance des ventes ne garantit donc pas une forte croissance du profit.", term: "marge / margin", flow: ["Chiffre d’affaires", "Coûts", "Résultat opérationnel", "Résultat net"] } },
    { en: { title: "Why diversification matters", body: "Diversification reduces the damage one position can do to the whole portfolio. It works best when assets do not all react the same way to the same shock.", term: "correlation / corrélation", flow: ["Different assets", "Different drivers", "Lower concentration", "Smoother portfolio risk"] }, fr: { title: "Pourquoi la diversification est importante", body: "La diversification réduit l’impact qu’une seule position peut avoir sur tout le portefeuille. Elle fonctionne surtout quand les actifs ne réagissent pas tous de la même manière au même choc.", term: "corrélation / correlation", flow: ["Actifs différents", "Drivers différents", "Moins de concentration", "Risque plus lissé"] } },
    { en: { title: "What a basis point means", body: "One basis point is 0.01 percentage point. A move from 4.00% to 4.25% is a 25-basis-point move, not a 25% increase in the rate.", term: "basis point / point de base", flow: ["1 bp", "0.01 percentage point", "100 bps", "1.00 percentage point"] }, fr: { title: "Ce qu’est un basis point", body: "Un point de base vaut 0,01 point de pourcentage. Passer de 4,00 % à 4,25 % correspond à +25 bps, pas à +25 % du taux.", term: "point de base / basis point", flow: ["1 bp", "0,01 point de %", "100 bps", "1,00 point de %"] } },
    { en: { title: "Enterprise value vs equity value", body: "Equity value belongs to shareholders. Enterprise value reflects the value of the operating business available to all capital providers, so debt and cash matter in the bridge.", term: "enterprise value / valeur d’entreprise", flow: ["Equity value", "+ debt", "− cash", "Enterprise value"] }, fr: { title: "Enterprise value vs equity value", body: "L’equity value appartient aux actionnaires. L’enterprise value reflète la valeur de l’activité pour tous les apporteurs de capitaux : la dette et le cash interviennent donc dans le passage de l’une à l’autre.", term: "valeur d’entreprise / enterprise value", flow: ["Equity value", "+ dette", "− cash", "Enterprise value"] } },
    { en: { title: "Why currencies move", body: "Currencies react to relative interest rates, growth expectations, inflation, risk sentiment and capital flows. FX is always a comparison between two economies.", term: "FX / foreign exchange", flow: ["Relative rates", "Relative growth", "Capital flows", "Exchange rate"] }, fr: { title: "Pourquoi les devises bougent", body: "Les devises réagissent aux écarts de taux, de croissance, d’inflation, au sentiment de risque et aux flux de capitaux. Le FX compare toujours deux économies.", term: "FX / marché des changes", flow: ["Écarts de taux", "Écarts de croissance", "Flux de capitaux", "Taux de change"] } },
  ],
  Intermediate: [],
  Professional: [],
};
briefs.Intermediate = briefs.Beginner.map((brief) => ({ en: { ...brief.en, body: `${brief.en.body} At intermediate level, focus on what was already priced in and on second-order effects.` }, fr: { ...brief.fr, body: `${brief.fr.body} Au niveau intermédiaire, concentre-toi aussi sur ce qui était déjà pricé et sur les effets de second ordre.` } }));
briefs.Professional = briefs.Beginner.map((brief) => ({ en: { ...brief.en, body: `${brief.en.body} At professional depth, frame the transmission through positioning, relative value, convexity and scenario-dependent repricing.` }, fr: { ...brief.fr, body: `${brief.fr.body} Au niveau professionnel, analyse aussi le positionnement, la valeur relative, la convexité et les scénarios de repricing.` } }));

const interviews: Record<string, InterviewVariant[]> = {
  IB: [
    { en: "Walk me through a DCF and tell me what can make it wrong.", fr: "Explique-moi un DCF et ce qui peut rendre la valorisation fausse.", stepsEn: ["Forecast unlevered FCF", "Estimate WACC", "Calculate terminal value", "Discount to present", "Bridge EV to equity value"], stepsFr: ["Prévoir l’unlevered FCF", "Estimer le WACC", "Calculer la terminal value", "Actualiser les flux", "Passer d’EV à equity value"], wantsEn: "Structured valuation logic and awareness of assumptions.", wantsFr: "Une logique de valorisation structurée et la maîtrise des hypothèses.", mistakeEn: "Listing formulas without explaining the economic logic.", mistakeFr: "Réciter des formules sans expliquer la logique économique." },
    { en: "Why might two similar companies trade at different EBITDA multiples?", fr: "Pourquoi deux entreprises similaires peuvent-elles avoir des multiples d’EBITDA différents ?", stepsEn: ["Growth", "Margins", "Risk", "Capital intensity", "Market expectations"], stepsFr: ["Croissance", "Marges", "Risque", "Intensité capitalistique", "Anticipations du marché"], wantsEn: "Connect business quality to valuation.", wantsFr: "Relier la qualité du business à la valorisation.", mistakeEn: "Saying only that one company is 'better'.", mistakeFr: "Dire seulement qu’une entreprise est « meilleure »." },
    { en: "A company issues debt to repurchase shares. What changes?", fr: "Une entreprise émet de la dette pour racheter ses actions. Qu’est-ce qui change ?", stepsEn: ["Cash/debt bridge", "Share count", "EPS", "Leverage", "Valuation/risk"], stepsFr: ["Bridge cash/dette", "Nombre d’actions", "EPS", "Leverage", "Valorisation/risque"], wantsEn: "Understand capital structure, not just EPS accretion.", wantsFr: "Comprendre la structure de capital, pas seulement l’EPS.", mistakeEn: "Assuming EPS accretion automatically creates value.", mistakeFr: "Supposer qu’un EPS accretive crée automatiquement de la valeur." },
    { en: "What happens to a DCF if WACC rises by 100 bps?", fr: "Que se passe-t-il dans un DCF si le WACC monte de 100 bps ?", stepsEn: ["Discount factor rises", "PV of FCF falls", "Terminal value falls", "EV falls", "Sensitivity depends on duration"], stepsFr: ["Discount factor ↑", "PV des FCF ↓", "Terminal value ↓", "EV ↓", "Sensibilité liée à la duration"], wantsEn: "Direction first, then explain sensitivity.", wantsFr: "Donner d’abord la direction puis expliquer la sensibilité.", mistakeEn: "Giving a fixed percentage decline without assumptions.", mistakeFr: "Donner une baisse fixe en % sans hypothèses." },
  ],
  "S&T": [], AM: [], WM: [], PE: [], ER: [],
};

const genericInterview: InterviewVariant[] = [
  { en: "What is the biggest market driver right now and how does it transmit across assets?", fr: "Quel est le principal driver de marché actuellement et comment se transmet-il entre les actifs ?", stepsEn: ["State the driver", "Explain first-order move", "Explain second-order move", "Say what is priced in", "Name the invalidation trigger"], stepsFr: ["Nommer le driver", "Effet de premier ordre", "Effet de second ordre", "Ce qui est déjà pricé", "Facteur d’invalidation"], wantsEn: "A causal chain, not a list of headlines.", wantsFr: "Une chaîne causale, pas une liste de news.", mistakeEn: "Describing moves without explaining why.", mistakeFr: "Décrire les mouvements sans expliquer pourquoi." },
  { en: "Pitch an investment idea in 90 seconds.", fr: "Présente une idée d’investissement en 90 secondes.", stepsEn: ["Recommendation", "Variant thesis", "Valuation", "Catalyst", "Risk/invalidation"], stepsFr: ["Recommandation", "Thèse différenciante", "Valorisation", "Catalyseur", "Risque/invalidation"], wantsEn: "A concise, testable thesis.", wantsFr: "Une thèse concise et testable.", mistakeEn: "Giving a company description instead of a thesis.", mistakeFr: "Décrire l’entreprise au lieu de défendre une thèse." },
  { en: "How would you explain a 50 bp rate move to a client or senior banker?", fr: "Comment expliquerais-tu un mouvement de taux de 50 bps à un client ou senior banker ?", stepsEn: ["Define 50 bps", "Identify cause", "Explain price impact", "Connect to valuation", "State uncertainty"], stepsFr: ["Définir 50 bps", "Identifier la cause", "Expliquer l’impact prix", "Relier à la valorisation", "Présenter l’incertitude"], wantsEn: "Technical accuracy in plain language.", wantsFr: "Précision technique avec un langage simple.", mistakeEn: "Using jargon without translating it.", mistakeFr: "Utiliser du jargon sans l’expliquer." },
  { en: "Tell me about a market view you would change your mind on. What data would invalidate it?", fr: "Donne une vue de marché sur laquelle tu pourrais changer d’avis. Quelle donnée l’invaliderait ?", stepsEn: ["State view", "Give evidence", "Name catalyst", "Name risk", "Set invalidation rule"], stepsFr: ["Donner la vue", "Donner les preuves", "Nommer le catalyseur", "Nommer le risque", "Fixer l’invalidation"], wantsEn: "Disciplined thinking rather than certainty.", wantsFr: "Un raisonnement discipliné plutôt qu’une certitude.", mistakeEn: "Defending a view with no falsifiable trigger.", mistakeFr: "Défendre une vue sans critère d’invalidation." },
];

for (const key of ["S&T", "AM", "WM", "PE", "ER"]) interviews[key] = genericInterview;

function formatValue(quote: { value: number; unit: string; category: string }) {
  if (quote.unit === "%") return `${quote.value.toFixed(2)}%`;
  if (quote.unit === "$") return `$${quote.value.toFixed(2)}`;
  if (quote.unit === "bps") return `${quote.value.toFixed(0)} bps`;
  if (quote.category === "FX") return quote.value >= 100 ? quote.value.toFixed(2) : quote.value.toFixed(4);
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(quote.value);
}

export default function HomeHourlyRotator() {
  useEffect(() => {
    let stopped = false;

    const isFrench = () => document.documentElement.lang === "fr";
    const hourIndex = () => Math.floor(Date.now() / 3_600_000);

    function applyBrief() {
      const card = document.querySelector<HTMLElement>(".daily-card");
      if (!card) return;
      const saved = window.localStorage.getItem("finance-studio-level") as Level | null;
      const level: Level = saved === "Intermediate" || saved === "Professional" ? saved : "Beginner";
      const brief = briefs[level][hourIndex() % briefs[level].length];
      const copy = isFrench() ? brief.fr : brief.en;
      const eyebrow = card.querySelector<HTMLElement>(".eyebrow");
      const title = card.querySelector<HTMLElement>("h2");
      const body = card.querySelector<HTMLElement>(".daily-copy");
      const term = card.querySelector<HTMLElement>(".concept-strip strong");
      if (eyebrow) eyebrow.textContent = isFrench() ? "BRIEF D’APPRENTISSAGE HORAIRE" : "HOURLY LEARNING BRIEF";
      if (title) title.textContent = copy.title;
      if (body) body.textContent = copy.body;
      if (term) term.textContent = copy.term;
      const flowLabels = card.querySelectorAll<HTMLElement>(".flow-diagram div small");
      flowLabels.forEach((node, index) => { if (copy.flow[index]) node.textContent = copy.flow[index]; });
    }

    function applyInterview() {
      const card = document.querySelector<HTMLElement>(".interview-card");
      if (!card) return;
      const badge = card.querySelector<HTMLElement>(".pill.accent")?.textContent?.trim() || "IB";
      const bank = interviews[badge] || genericInterview;
      const variant = bank[(hourIndex() + 1) % bank.length];
      const title = card.querySelector<HTMLElement>("h2");
      if (title) title.textContent = isFrench() ? variant.fr : variant.en;
      const framework = card.querySelector<HTMLElement>(".answer-framework");
      if (framework) {
        framework.replaceChildren(...(isFrench() ? variant.stepsFr : variant.stepsEn).map((step, index) => {
          const row = document.createElement("div");
          const number = document.createElement("span");
          number.textContent = String(index + 1);
          const p = document.createElement("p");
          const strong = document.createElement("strong");
          strong.textContent = step;
          p.appendChild(strong);
          row.append(number, p);
          return row;
        }));
      }

      let guidance = card.querySelector<HTMLElement>(".hourly-interview-guidance");
      if (!guidance) {
        guidance = document.createElement("div");
        guidance.className = "hourly-interview-guidance";
        framework?.after(guidance);
      }
      guidance.innerHTML = "";
      const wants = document.createElement("p");
      wants.textContent = `${isFrench() ? "Ce que l’interviewer cherche" : "What the interviewer wants"}: ${isFrench() ? variant.wantsFr : variant.wantsEn}`;
      const mistake = document.createElement("p");
      mistake.textContent = `${isFrench() ? "Erreur fréquente" : "Common mistake"}: ${isFrench() ? variant.mistakeFr : variant.mistakeEn}`;
      guidance.append(wants, mistake);
    }

    async function refreshMarkets() {
      try {
        const response = await fetch("/api/markets", { cache: "no-store" });
        if (!response.ok || stopped) return;
        const payload = await response.json() as { quotes?: Array<{ id: string; label: string; category: string; value: number; changePercent: number | null; unit: string }>; providers?: Array<{ status: string }> };
        const quotes = payload.quotes || [];
        const groups = new Map<string, typeof quotes>();
        for (const quote of quotes) {
          const current = groups.get(quote.category) || [];
          if (current.length < 4) current.push(quote);
          groups.set(quote.category, current);
        }
        const grid = document.querySelector<HTMLElement>(".markets-card .market-grid");
        if (!grid || !groups.size) return;
        grid.replaceChildren(...Array.from(groups.entries()).slice(0, 5).map(([category, items]) => {
          const group = document.createElement("div");
          group.className = "market-group";
          const h3 = document.createElement("h3");
          h3.textContent = category;
          group.appendChild(h3);
          for (const quote of items) {
            const row = document.createElement("div");
            row.className = "market-row";
            const label = document.createElement("span");
            label.textContent = quote.label;
            const value = document.createElement("em");
            value.textContent = `${formatValue(quote)}${quote.changePercent !== null ? ` · ${quote.changePercent > 0 ? "+" : ""}${quote.changePercent.toFixed(2)}%` : ""}`;
            row.append(label, value);
            group.appendChild(row);
          }
          return group;
        }));
      } catch {
        // Existing React-rendered market data remains visible.
      }
    }

    function applyAll() {
      applyBrief();
      applyInterview();
    }

    applyAll();
    void refreshMarkets();
    const shortInterval = window.setInterval(applyAll, 30_000);
    const marketInterval = window.setInterval(() => void refreshMarkets(), 300_000);
    const onClick = () => window.setTimeout(applyAll, 50);
    document.addEventListener("click", onClick, true);

    return () => {
      stopped = true;
      window.clearInterval(shortInterval);
      window.clearInterval(marketInterval);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
