"use client";

import { useEffect } from "react";

type Level = "Beginner" | "Intermediate" | "Professional";
type Quote = {
  id: string;
  label: string;
  category: string;
  region: string;
  value: number;
  previousValue?: number;
  change?: number | null;
  changePercent: number | null;
  unit: "" | "%" | "$" | "bps";
  asOf: string;
  source: string;
};
type MarketPayload = {
  updatedAt: string;
  quotes: Quote[];
  providers: Array<{ id: string; label: string; status: string; message: string }>;
};

type LearningBrief = {
  en: {
    title: string;
    summary: string;
    term: string;
    why: string;
    example: string;
    watch: string;
    formula: string;
    flow: string[];
  };
  fr: {
    title: string;
    summary: string;
    term: string;
    why: string;
    example: string;
    watch: string;
    formula: string;
    flow: string[];
  };
};

const briefs: LearningBrief[] = [
  {
    en: {
      title: "What a stock price really represents",
      summary: "A share price is the market's current estimate of the value of future cash flows available to shareholders. Growth expectations can raise that value, while higher risk or discount rates can reduce it.",
      term: "equity value / shareholder value",
      why: "Two companies with similar current profits can trade at very different prices because investors may expect different growth, margins, risk or capital needs.",
      example: "If expected future cash flows rise while the required return stays unchanged, the present value of the company usually rises. If the discount rate rises, the same future cash flows are worth less today.",
      watch: "Watch earnings expectations, margins, interest rates, risk sentiment and valuation multiples such as P/E or EV/EBITDA.",
      formula: "Equity value ≈ Present value of future cash flows to shareholders",
      flow: ["Future cash flows", "Growth expectations", "Risk / discount rate", "Share price"],
    },
    fr: {
      title: "Ce que représente vraiment le prix d'une action",
      summary: "Le prix d'une action correspond à l'estimation actuelle du marché de la valeur des cash flows futurs revenant aux actionnaires. Une croissance attendue plus forte peut augmenter cette valeur, tandis qu'un risque ou un taux d'actualisation plus élevé peut la réduire.",
      term: "equity value / valeur pour l'actionnaire",
      why: "Deux entreprises avec des profits actuels proches peuvent avoir des prix très différents si le marché anticipe une croissance, des marges, un risque ou des besoins en capital différents.",
      example: "Si les cash flows futurs attendus augmentent et que le rendement exigé ne change pas, la valeur actuelle de l'entreprise augmente généralement. Si le discount rate monte, les mêmes cash flows valent moins aujourd'hui.",
      watch: "Surveille earnings, marges, taux d'intérêt, sentiment de risque et multiples de valorisation comme P/E ou EV/EBITDA.",
      formula: "Equity value ≈ Valeur actuelle des cash flows futurs pour les actionnaires",
      flow: ["Cash flows futurs", "Croissance attendue", "Risque / discount rate", "Prix de l'action"],
    },
  },
  {
    en: {
      title: "Why bond prices move opposite to yields",
      summary: "A bond promises fixed cash flows. When market yields rise, newly issued bonds offer higher returns, so the price of an older lower-yield bond must fall to remain competitive.",
      term: "yield / bond yield",
      why: "This inverse relationship is central to fixed income, portfolio risk, bank balance sheets and valuation because government yields also influence discount rates across markets.",
      example: "A bond with duration 5 will lose roughly 5% in price if its yield rises by 1 percentage point, before convexity effects.",
      watch: "Watch central-bank expectations, inflation, growth data, Treasury supply and the 2Y/10Y curve.",
      formula: "Approx. price change ≈ −Duration × Yield change",
      flow: ["Market yield ↑", "Old coupon unchanged", "Relative appeal ↓", "Bond price ↓"],
    },
    fr: {
      title: "Pourquoi les obligations baissent quand les yields montent",
      summary: "Une obligation promet des flux fixes. Quand les rendements de marché montent, les nouvelles obligations offrent de meilleurs rendements : le prix des anciennes obligations doit donc baisser pour rester compétitif.",
      term: "yield / rendement obligataire",
      why: "Cette relation inverse est fondamentale en fixed income, en gestion de portefeuille, pour les banques et pour la valorisation car les taux souverains influencent aussi les discount rates.",
      example: "Une obligation de duration 5 perd environ 5 % si son yield monte de 1 point de pourcentage, avant l'effet de convexité.",
      watch: "Surveille les anticipations de banques centrales, l'inflation, la croissance, l'offre de Treasuries et la courbe 2Y/10Y.",
      formula: "Variation de prix ≈ −Duration × Variation du yield",
      flow: ["Yield de marché ↑", "Coupon inchangé", "Attractivité relative ↓", "Prix obligation ↓"],
    },
  },
  {
    en: {
      title: "How inflation moves markets",
      summary: "Inflation matters because it changes expected central-bank policy, real purchasing power, company costs and the discount rate used to value future cash flows.",
      term: "inflation expectations",
      why: "Markets react not only to whether inflation is high or low, but to the surprise versus expectations and what that changes about future policy.",
      example: "A hotter-than-expected CPI can push short-term yields higher, strengthen the currency and pressure long-duration equities if investors expect policy to stay tighter for longer.",
      watch: "Headline/core CPI, PCE, wage growth, inflation expectations and central-bank language.",
      formula: "Real rate ≈ Nominal rate − Expected inflation",
      flow: ["Inflation surprise", "Policy expectations", "Discount rates / FX", "Asset repricing"],
    },
    fr: {
      title: "Comment l'inflation déplace les marchés",
      summary: "L'inflation compte parce qu'elle modifie les anticipations de politique monétaire, le pouvoir d'achat réel, les coûts des entreprises et le taux d'actualisation utilisé pour valoriser les cash flows futurs.",
      term: "inflation expectations / anticipations d'inflation",
      why: "Les marchés réagissent surtout à la surprise par rapport aux attentes et à ce que cela change pour la politique monétaire future.",
      example: "Un CPI supérieur aux attentes peut faire monter les taux courts, renforcer la devise et peser sur les actions de longue duration si le marché anticipe des taux élevés plus longtemps.",
      watch: "CPI headline/core, PCE, salaires, anticipations d'inflation et communication des banques centrales.",
      formula: "Taux réel ≈ Taux nominal − Inflation anticipée",
      flow: ["Surprise inflation", "Anticipations de taux", "Taux / FX", "Repricing des actifs"],
    },
  },
  {
    en: {
      title: "Revenue, EBITDA and profit are not the same thing",
      summary: "Revenue measures sales. EBITDA approximates operating earnings before interest, taxes, depreciation and amortization. Net income is what remains after more expenses are included.",
      term: "operating margin / marge opérationnelle",
      why: "A company can grow revenue quickly and still destroy value if margins collapse, capital intensity rises or financing costs become too high.",
      example: "$100 of revenue with a 20% EBITDA margin gives $20 of EBITDA. If the margin falls to 15%, EBITDA falls to $15 even if revenue is unchanged.",
      watch: "Revenue growth, gross margin, EBITDA margin, capex, working capital and interest expense.",
      formula: "EBITDA margin = EBITDA ÷ Revenue",
      flow: ["Revenue", "Operating costs", "EBITDA / EBIT", "Net income / FCF"],
    },
    fr: {
      title: "Revenue, EBITDA et profit ne sont pas la même chose",
      summary: "Le revenue mesure les ventes. L'EBITDA approxime le résultat opérationnel avant intérêts, impôts, dépréciation et amortissement. Le net income intègre davantage de charges.",
      term: "operating margin / marge opérationnelle",
      why: "Une entreprise peut faire croître fortement ses ventes tout en détruisant de la valeur si les marges chutent, si le capex augmente ou si le coût du financement devient trop élevé.",
      example: "100 $ de revenue avec une marge EBITDA de 20 % donnent 20 $ d'EBITDA. Si la marge tombe à 15 %, l'EBITDA tombe à 15 $ même avec un revenue inchangé.",
      watch: "Croissance du revenue, gross margin, marge EBITDA, capex, working capital et interest expense.",
      formula: "Marge EBITDA = EBITDA ÷ Revenue",
      flow: ["Revenue", "Coûts opérationnels", "EBITDA / EBIT", "Net income / FCF"],
    },
  },
  {
    en: {
      title: "What the yield curve tells you",
      summary: "The yield curve compares interest rates across maturities. Its shape reflects expectations for policy, inflation, growth and term premium.",
      term: "yield curve / courbe des taux",
      why: "The curve is one of the fastest ways to see how the market separates near-term central-bank policy from longer-term macro expectations.",
      example: "If the 2-year yield is 4.80% and the 10-year is 5.20%, the 2s10s spread is +40 bps, meaning the curve is upward sloping between those maturities.",
      watch: "2Y, 10Y and 30Y yields, curve steepening/flattening, inflation and fiscal supply.",
      formula: "2s10s spread = 10Y yield − 2Y yield",
      flow: ["Macro expectations", "Short rates", "Long rates", "Curve shape"],
    },
    fr: {
      title: "Ce que la yield curve te dit",
      summary: "La courbe des taux compare les rendements selon les maturités. Sa forme reflète les anticipations de politique monétaire, d'inflation, de croissance et de term premium.",
      term: "yield curve / courbe des taux",
      why: "La courbe permet de voir rapidement comment le marché distingue la politique de banque centrale à court terme des attentes macro à long terme.",
      example: "Si le 2 ans vaut 4,80 % et le 10 ans 5,20 %, le spread 2s10s vaut +40 bps : la courbe est pentue entre ces maturités.",
      watch: "Yields 2Y, 10Y, 30Y, steepening/flattening, inflation et offre obligataire publique.",
      formula: "Spread 2s10s = Yield 10Y − Yield 2Y",
      flow: ["Attentes macro", "Taux courts", "Taux longs", "Forme de courbe"],
    },
  },
  {
    en: {
      title: "Enterprise value versus equity value",
      summary: "Equity value belongs to shareholders. Enterprise value measures the value of the operating business available to all capital providers, so debt and cash matter in the bridge.",
      term: "enterprise value / EV",
      why: "Bankers and investors use EV when comparing operating businesses because companies can have very different financing structures.",
      example: "If equity value is $800m, debt is $300m and cash is $100m, enterprise value is about $1.0bn.",
      watch: "Net debt, leases, minority interests, pensions and non-operating assets when building a precise EV bridge.",
      formula: "EV ≈ Equity value + Debt − Cash",
      flow: ["Equity value", "+ Debt", "− Cash", "Enterprise value"],
    },
    fr: {
      title: "Enterprise value versus equity value",
      summary: "L'equity value appartient aux actionnaires. L'enterprise value mesure la valeur de l'activité opérationnelle pour l'ensemble des apporteurs de capitaux : dette et cash entrent donc dans le bridge.",
      term: "enterprise value / EV",
      why: "Les bankers et investisseurs utilisent l'EV pour comparer les activités opérationnelles même lorsque les structures de financement sont très différentes.",
      example: "Avec 800 M$ d'equity value, 300 M$ de dette et 100 M$ de cash, l'enterprise value est d'environ 1,0 Md$.",
      watch: "Net debt, leases, minority interests, pensions et actifs non opérationnels pour un bridge EV précis.",
      formula: "EV ≈ Equity value + Dette − Cash",
      flow: ["Equity value", "+ Dette", "− Cash", "Enterprise value"],
    },
  },
];

function safeGet(key: string) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function safeSet(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { /* optional preference */ }
}
function formatValue(quote: Quote) {
  if (quote.unit === "%") return `${quote.value.toFixed(2)}%`;
  if (quote.unit === "$") return `$${quote.value.toFixed(2)}`;
  if (quote.unit === "bps") return `${quote.value.toFixed(0)} bps`;
  if (quote.category === "FX") return quote.value >= 100 ? quote.value.toFixed(2) : quote.value.toFixed(4);
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(quote.value);
}
function ageLabel(asOf: string, french: boolean) {
  const date = new Date(`${asOf}T00:00:00`);
  if (Number.isNaN(date.getTime())) return asOf;
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86_400_000));
  if (days === 0) return french ? "aujourd'hui" : "today";
  if (days === 1) return french ? "hier" : "yesterday";
  return french ? `il y a ${days} j` : `${days}d ago`;
}

function marketInterpretation(quote: Quote, french: boolean) {
  const ch = quote.changePercent ?? 0;
  const direction = ch > 0 ? "up" : ch < 0 ? "down" : "flat";
  const en: Record<string, string> = {
    Equities: direction === "up" ? "Equities are gaining, which can signal improving risk appetite or stronger earnings expectations." : direction === "down" ? "Equities are under pressure, which can reflect weaker growth expectations, tighter financial conditions or risk-off positioning." : "Equities are broadly stable; focus on sector dispersion and upcoming catalysts.",
    Rates: direction === "up" ? "Yields are moving higher, which tightens discount rates and can pressure rate-sensitive assets." : direction === "down" ? "Yields are moving lower, easing discount-rate pressure and often supporting longer-duration assets." : "Rates are stable; curve shape and upcoming macro data matter more than the latest move.",
    Volatility: direction === "up" ? "Volatility is rising, usually signaling greater demand for protection and more uncertainty." : "Volatility is contained, suggesting calmer risk pricing for now.",
    FX: "FX moves reflect relative rates, growth expectations and capital flows between two economies.",
    Commodities: direction === "up" ? "Commodity prices are rising, which can affect inflation expectations and sector earnings." : "Commodity prices are softer, which can reduce inflation pressure but weigh on producers.",
    Credit: direction === "up" ? "Credit spreads are wider, a sign investors are demanding more compensation for risk." : direction === "down" ? "Credit spreads are tighter, usually consistent with stronger risk appetite." : "Credit spreads are stable; watch defaults, refinancing conditions and macro risk.",
  };
  const fr: Record<string, string> = {
    Equities: direction === "up" ? "Les actions progressent, ce qui peut signaler un meilleur appétit pour le risque ou des attentes de résultats plus fortes." : direction === "down" ? "Les actions sont sous pression, ce qui peut refléter des attentes de croissance plus faibles, des conditions financières plus strictes ou un mouvement risk-off." : "Les actions sont globalement stables ; regarde surtout les écarts entre secteurs et les prochains catalyseurs.",
    Rates: direction === "up" ? "Les yields montent, ce qui augmente les discount rates et peut peser sur les actifs sensibles aux taux." : direction === "down" ? "Les yields baissent, ce qui réduit la pression des discount rates et soutient souvent les actifs de longue duration." : "Les taux sont stables ; la forme de la courbe et les prochaines données macro comptent davantage.",
    Volatility: direction === "up" ? "La volatilité augmente, signe d'une demande de protection plus forte et d'une incertitude plus élevée." : "La volatilité reste contenue, ce qui indique un pricing du risque plus calme pour le moment.",
    FX: "Les mouvements FX reflètent surtout les différentiels de taux, de croissance et les flux de capitaux entre deux économies.",
    Commodities: direction === "up" ? "Les matières premières montent, ce qui peut influencer l'inflation et les résultats des secteurs producteurs." : "Les matières premières baissent, ce qui peut réduire la pression inflationniste mais peser sur les producteurs.",
    Credit: direction === "up" ? "Les spreads de crédit s'élargissent : les investisseurs demandent davantage de rémunération pour le risque." : direction === "down" ? "Les spreads de crédit se resserrent, généralement cohérents avec un meilleur appétit pour le risque." : "Les spreads sont stables ; surveille défauts, refinancement et risque macro.",
  };
  return (french ? fr : en)[quote.category] ?? (french ? "Observe le mouvement, son catalyseur et ce qui pourrait l'invalider." : "Focus on the move, its catalyst and what could invalidate it.");
}

export default function HomeDashboardController() {
  useEffect(() => {
    let stopped = false;
    let marketTimer: ReturnType<typeof setInterval> | null = null;
    let briefTimer: ReturnType<typeof setInterval> | null = null;

    const app = document.querySelector<HTMLElement>(".app-shell");
    const sidebar = app?.querySelector<HTMLElement>(".sidebar");

    function setCollapsed(collapsed: boolean) {
      if (!app) return;
      app.classList.toggle("sidebar-collapsed", collapsed);
      safeSet("finance-studio-sidebar-collapsed", collapsed ? "1" : "0");
      const button = sidebar?.querySelector<HTMLButtonElement>(".sidebar-collapse-toggle");
      if (button) {
        button.setAttribute("aria-expanded", collapsed ? "false" : "true");
        button.title = collapsed ? "Open sidebar" : "Close sidebar";
        button.textContent = collapsed ? "›" : "‹";
      }
    }

    if (sidebar && !sidebar.querySelector(".sidebar-collapse-toggle")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sidebar-collapse-toggle";
      button.setAttribute("aria-label", "Open or close navigation");
      button.addEventListener("click", () => setCollapsed(!app?.classList.contains("sidebar-collapsed")));
      sidebar.appendChild(button);
    }
    setCollapsed(safeGet("finance-studio-sidebar-collapsed") === "1");

    function applyBrief() {
      const card = document.querySelector<HTMLElement>(".daily-card");
      if (!card) return;
      const french = document.documentElement.lang === "fr";
      const saved = safeGet("finance-studio-level") as Level | null;
      const level: Level = saved === "Intermediate" || saved === "Professional" ? saved : "Beginner";
      const index = Math.floor(Date.now() / 3_600_000) % briefs.length;
      const base = briefs[index][french ? "fr" : "en"];
      const depthSuffix = level === "Intermediate"
        ? (french ? " À ce niveau, demande-toi aussi ce qui était déjà pricé et quel effet de second ordre peut apparaître." : " At this level, also ask what was already priced in and what second-order effect could appear.")
        : level === "Professional"
          ? (french ? " À ce niveau, ajoute le positionnement, la valeur relative, les scénarios et l'impact sur le risk/reward." : " At this level, add positioning, relative value, scenarios and the impact on risk/reward.")
          : "";

      const eyebrow = card.querySelector<HTMLElement>(".eyebrow");
      const title = card.querySelector<HTMLElement>("h2");
      const body = card.querySelector<HTMLElement>(".daily-copy");
      const term = card.querySelector<HTMLElement>(".concept-strip strong");
      if (eyebrow) eyebrow.textContent = french ? "HOURLY LEARNING BRIEF · MIS À JOUR CHAQUE HEURE" : "HOURLY LEARNING BRIEF · UPDATES EACH HOUR";
      if (title) title.textContent = base.title;
      if (body) body.textContent = base.summary + depthSuffix;
      if (term) term.textContent = base.term;

      const flowLabels = card.querySelectorAll<HTMLElement>(".flow-diagram div small");
      flowLabels.forEach((node, i) => { if (base.flow[i]) node.textContent = base.flow[i]; });

      let detail = card.querySelector<HTMLElement>(".learning-detail-grid");
      if (!detail) {
        detail = document.createElement("div");
        detail.className = "learning-detail-grid";
        card.querySelector(".flow-diagram")?.after(detail);
      }
      detail.innerHTML = "";
      const items = [
        [french ? "POURQUOI C'EST IMPORTANT" : "WHY IT MATTERS", base.why],
        [french ? "EXEMPLE" : "EXAMPLE", base.example],
        [french ? "À SURVEILLER" : "WHAT TO WATCH", base.watch],
        [french ? "FORMULE / INTUITION" : "FORMULA / INTUITION", base.formula],
      ];
      for (const [label, copy] of items) {
        const block = document.createElement("article");
        const small = document.createElement("span");
        const p = document.createElement("p");
        small.textContent = label;
        p.textContent = copy;
        block.append(small, p);
        detail.appendChild(block);
      }

      let time = card.querySelector<HTMLElement>(".hourly-update-note");
      if (!time) {
        time = document.createElement("small");
        time.className = "hourly-update-note";
        card.querySelector(".card-actions")?.before(time);
      }
      time.textContent = french
        ? `Sujet actif jusqu'à ${String((new Date().getHours() + 1) % 24).padStart(2, "0")}:00 · niveau ${level}`
        : `Current topic until ${String((new Date().getHours() + 1) % 24).padStart(2, "0")}:00 · ${level} depth`;
    }

    async function refreshMarkets() {
      try {
        const response = await fetch(`/api/markets?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) return;
        const payload = await response.json() as MarketPayload;
        if (stopped) return;
        const card = document.querySelector<HTMLElement>(".markets-card");
        if (!card) return;
        const french = document.documentElement.lang === "fr";
        const quotes = payload.quotes ?? [];
        const byCategory = new Map<string, Quote[]>();
        for (const quote of quotes) {
          const list = byCategory.get(quote.category) ?? [];
          list.push(quote);
          byCategory.set(quote.category, list);
        }

        const grid = card.querySelector<HTMLElement>(".market-grid") ?? document.createElement("div");
        grid.className = "market-grid market-grid-rich";
        grid.innerHTML = "";
        if (!grid.parentElement) card.querySelector(".markets-head")?.after(grid);

        for (const [category, categoryQuotes] of byCategory) {
          const group = document.createElement("div");
          group.className = "market-group market-group-rich";
          const heading = document.createElement("div");
          heading.className = "market-group-heading";
          const h3 = document.createElement("h3");
          h3.textContent = category;
          const count = document.createElement("span");
          count.textContent = `${categoryQuotes.length} ${french ? "séries" : "series"}`;
          heading.append(h3, count);
          group.appendChild(heading);

          for (const quote of categoryQuotes.slice(0, 5)) {
            const row = document.createElement("div");
            row.className = "market-row market-row-rich";
            const left = document.createElement("div");
            const label = document.createElement("strong");
            const meta = document.createElement("small");
            label.textContent = quote.label;
            meta.textContent = `${quote.region} · ${ageLabel(quote.asOf, french)}`;
            left.append(label, meta);
            const right = document.createElement("div");
            const value = document.createElement("b");
            const move = document.createElement("span");
            value.textContent = formatValue(quote);
            if(quote.unit === "%" && typeof quote.change === "number") move.textContent = `${quote.change >= 0 ? "+" : ""}${(quote.change*100).toFixed(1)} bps`;
            else if (quote.changePercent === null) move.textContent = "—";
            else move.textContent = `${quote.changePercent > 0 ? "+" : ""}${quote.changePercent.toFixed(2)}%`;
            move.className = quote.changePercent === null ? "flat" : quote.changePercent > 0 ? "up" : quote.changePercent < 0 ? "down" : "flat";
            right.append(value, move);
            row.append(left, right);
            group.appendChild(row);
          }
          grid.appendChild(group);
        }

        const movers = quotes.filter(q => q.changePercent !== null && q.unit !== "%" && q.category !== "Volatility").sort((a, b) => Math.abs(b.changePercent ?? 0) - Math.abs(a.changePercent ?? 0));
        const biggest = movers[0];
        const y2 = quotes.find(q => q.label === "US 2Y");
        const y10 = quotes.find(q => q.label === "US 10Y");
        const vix = quotes.find(q => q.label === "VIX");
        const spx = quotes.find(q => q.label === "S&P 500");
        const curve = y2 && y10 ? (y10.value - y2.value) * 100 : null;

        let summary = card.querySelector<HTMLElement>(".market-intelligence-strip");
        if (!summary) {
          summary = document.createElement("div");
          summary.className = "market-intelligence-strip";
          grid.before(summary);
        }
        summary.innerHTML = "";
        const cards: Array<[string, string, string]> = [
          [french ? "PLUS GROS MOUVEMENT" : "BIGGEST MOVE", biggest ? `${biggest.label} ${biggest.changePercent && biggest.changePercent > 0 ? "+" : ""}${biggest?.changePercent?.toFixed(2) ?? "—"}%` : "—", biggest ? marketInterpretation(biggest, french) : ""],
          [french ? "COURBE US 2Y/10Y" : "US 2Y/10Y CURVE", curve === null ? "—" : `${curve >= 0 ? "+" : ""}${curve.toFixed(0)} bps`, curve === null ? "" : (french ? (curve > 0 ? "Courbe positive entre 2 et 10 ans." : "Courbe inversée entre 2 et 10 ans.") : (curve > 0 ? "Positive slope between 2Y and 10Y." : "Inverted between 2Y and 10Y."))],
          [french ? "RISK TONE" : "RISK TONE", `${spx ? `S&P ${spx.changePercent && spx.changePercent > 0 ? "+" : ""}${spx?.changePercent?.toFixed(2) ?? "—"}%` : "S&P —"} · ${vix ? `VIX ${vix.value.toFixed(1)}` : "VIX —"}`, french ? "Combine actions + volatilité pour lire le sentiment, pas un seul chiffre." : "Read equities and volatility together rather than relying on one number."],
          [french ? "ACTUALISATION" : "REFRESH", new Date(payload.updatedAt).toLocaleTimeString(french ? "fr-FR" : "en-US", { hour: "2-digit", minute: "2-digit" }), french ? "Données rechargées automatiquement toutes les minutes ; chaque série conserve sa vraie date d'observation." : "Data reloads automatically every minute; each series keeps its real observation date."],
        ];
        for (const [label, value, copy] of cards) {
          const block = document.createElement("article");
          const mini = document.createElement("span");
          const strong = document.createElement("strong");
          const p = document.createElement("p");
          mini.textContent = label;
          strong.textContent = value;
          p.textContent = copy;
          block.append(mini, strong, p);
          summary.appendChild(block);
        }

        const status = card.querySelector<HTMLElement>(".feed-status");
        if (status) {
          const live = payload.providers.filter(p => p.status === "live").length;
          status.innerHTML = `<span class="status-dot"></span>${live} ${french ? "sources actives" : "live providers"}`;
        }

        const note = card.querySelector<HTMLElement>(".data-note:last-of-type");
        if (note) note.textContent = french
          ? "Valeurs = dernières observations publiées par chaque fournisseur. Certaines séries macro/obligataires ne sont pas intraday ; leur date exacte est affichée ligne par ligne."
          : "Values are the latest observations published by each provider. Some macro/rates series are not intraday; each row shows its exact observation date.";
      } catch {
        // Existing server-rendered snapshot remains visible if refresh fails.
      }
    }

    applyBrief();
    void refreshMarkets();
    briefTimer = setInterval(applyBrief, 30_000);
    marketTimer = setInterval(() => void refreshMarkets(), 60_000);
    window.addEventListener("finance-studio-language-change", applyBrief);

    return () => {
      stopped = true;
      if (briefTimer) clearInterval(briefTimer);
      if (marketTimer) clearInterval(marketTimer);
      window.removeEventListener("finance-studio-language-change", applyBrief);
    };
  }, []);

  return null;
}
