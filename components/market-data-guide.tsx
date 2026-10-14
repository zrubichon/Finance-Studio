"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const guides = [
  {
    key: "equities",
    titleEn: "Equities: S&P 500, Nasdaq and sectors",
    titleFr: "Actions : S&P 500, Nasdaq et secteurs",
    whatEn: "The S&P 500 is a broad index of large US companies. The Nasdaq is more concentrated in technology and growth companies, so it is often more sensitive to changes in discount rates.",
    whatFr: "Le S&P 500 est un indice large de grandes entreprises américaines. Le Nasdaq est davantage concentré sur la technologie et les valeurs de croissance, donc souvent plus sensible aux changements de taux d’actualisation.",
    whyEn: "Equity indices help you read growth expectations, earnings expectations and risk appetite across the market.",
    whyFr: "Les indices actions aident à lire les anticipations de croissance, de bénéfices et l’appétit pour le risque.",
    readEn: "A rise can reflect stronger earnings expectations, lower discount rates or better risk sentiment. A fall can reflect weaker growth, lower earnings expectations, higher yields or broader risk aversion.",
    readFr: "Une hausse peut refléter de meilleures attentes de bénéfices, des taux d’actualisation plus faibles ou un meilleur sentiment de risque. Une baisse peut refléter une croissance plus faible, des bénéfices attendus plus faibles, des yields plus élevés ou davantage d’aversion au risque.",
    impactEn: "Higher yields often pressure long-duration growth stocks more than banks, energy or other value sectors. Always look at sector dispersion rather than only the headline index.",
    impactFr: "Des yields plus élevés pénalisent souvent davantage les actions de croissance à longue duration que les banques, l’énergie ou d’autres secteurs value. Regarde toujours la dispersion sectorielle, pas seulement l’indice global.",
    href: "/university/equity-valuation",
  },
  {
    key: "rates",
    titleEn: "Rates: 2-year and 10-year US Treasury yields",
    titleFr: "Taux : rendements Treasury US 2 ans et 10 ans",
    whatEn: "The 2-year US Treasury yield is highly sensitive to Federal Reserve policy expectations. The 10-year yield also reflects longer-run growth, inflation expectations and the term premium.",
    whatFr: "Le rendement du Treasury US 2 ans est très sensible aux anticipations de politique de la Federal Reserve. Le 10 ans reflète aussi la croissance de long terme, les anticipations d’inflation et la prime de terme.",
    whyEn: "Rates are a core transmission channel because they influence borrowing costs, bond prices, currencies and the discount rates used in valuation.",
    whyFr: "Les taux sont un canal de transmission central car ils influencent les coûts d’emprunt, les prix obligataires, les devises et les taux d’actualisation utilisés en valorisation.",
    readEn: "When yields rise, bond prices fall. A sharp move in the 2-year yield often means the market changed its view of the future policy-rate path. A 20 bps (basis points / points de base) rise equals 0.20 percentage point.",
    readFr: "Quand les yields montent, le prix des obligations baisse. Un mouvement marqué du 2 ans signifie souvent que le marché a changé sa vision de la trajectoire future des taux directeurs. Une hausse de 20 bps (basis points / points de base) correspond à 0,20 point de pourcentage.",
    impactEn: "Higher yields can tighten financial conditions, support the US dollar and reduce equity valuations by increasing discount rates.",
    impactFr: "Des yields plus élevés peuvent resserrer les conditions financières, soutenir le dollar US et réduire les valorisations actions en augmentant les taux d’actualisation.",
    href: "/university/fixed-income-yield-curves",
  },
  {
    key: "curve",
    titleEn: "Yield curve: 2s10s, steepening, flattening and inversion",
    titleFr: "Courbe des taux : 2s10s, steepening, flattening et inversion",
    whatEn: "The 2s10s spread is the 10-year Treasury yield minus the 2-year Treasury yield. It measures the slope between a short and a long maturity.",
    whatFr: "Le spread 2s10s correspond au yield du Treasury 10 ans moins celui du Treasury 2 ans. Il mesure la pente entre une maturité courte et une maturité longue.",
    whyEn: "The curve helps separate near-term central-bank expectations from longer-term views on growth, inflation and term premium.",
    whyFr: "La courbe aide à distinguer les anticipations de banque centrale à court terme des vues de plus long terme sur croissance, inflation et prime de terme.",
    readEn: "A more positive spread means a steeper curve. A negative spread means inversion. A bull steepener usually means yields fall with short rates falling faster. A bear steepener usually means yields rise with long rates rising faster.",
    readFr: "Un spread plus positif signifie une courbe plus pentue. Un spread négatif signifie une inversion. Un bull steepener signifie généralement que les yields baissent avec des taux courts qui baissent plus vite. Un bear steepener signifie généralement que les yields montent avec des taux longs qui montent plus vite.",
    impactEn: "Curve moves can affect bank margins, duration positioning, recession expectations and relative value across maturities.",
    impactFr: "Les mouvements de courbe peuvent affecter les marges bancaires, le positionnement en duration, les anticipations de récession et la valeur relative entre maturités.",
    href: "/university/fixed-income-yield-curves",
  },
  {
    key: "fx",
    titleEn: "FX (Foreign Exchange): EUR/USD and the US dollar",
    titleFr: "FX (Foreign Exchange / marché des changes) : EUR/USD et dollar US",
    whatEn: "EUR/USD tells you how many US dollars are needed to buy one euro. If EUR/USD falls, the US dollar is strengthening against the euro.",
    whatFr: "EUR/USD indique combien de dollars US sont nécessaires pour acheter un euro. Si EUR/USD baisse, le dollar US se renforce face à l’euro.",
    whyEn: "Currencies connect relative interest rates, growth expectations, capital flows and risk sentiment across countries.",
    whyFr: "Les devises relient les taux d’intérêt relatifs, les anticipations de croissance, les flux de capitaux et le sentiment de risque entre pays.",
    readEn: "A stronger US dollar can come from higher relative US yields, stronger US growth expectations or a flight to safety. The opposite can weaken the dollar.",
    readFr: "Un dollar US plus fort peut venir de rendements US relatifs plus élevés, de meilleures anticipations de croissance américaine ou d’une recherche de sécurité. L’inverse peut affaiblir le dollar.",
    impactEn: "A stronger dollar can tighten global financial conditions, affect multinational earnings, weigh on some commodities and pressure emerging markets with dollar debt.",
    impactFr: "Un dollar plus fort peut resserrer les conditions financières mondiales, affecter les bénéfices des multinationales, peser sur certaines matières premières et mettre sous pression les marchés émergents endettés en dollars.",
    href: "/university/fx-international-finance",
  },
  {
    key: "volatility",
    titleEn: "Volatility: VIX (Cboe Volatility Index)",
    titleFr: "Volatilité : VIX (Cboe Volatility Index)",
    whatEn: "The VIX is an options-implied measure of expected S&P 500 volatility over roughly the next 30 days.",
    whatFr: "Le VIX est une mesure issue des options de la volatilité attendue du S&P 500 sur environ les 30 prochains jours.",
    whyEn: "It helps show how much uncertainty and demand for downside protection is priced into equity options.",
    whyFr: "Il aide à voir combien d’incertitude et de demande de protection contre la baisse sont intégrées dans les options actions.",
    readEn: "A rising VIX usually means investors are paying more for protection or expect larger market swings. A falling VIX usually signals calmer risk pricing.",
    readFr: "Un VIX en hausse signifie généralement que les investisseurs paient davantage pour se protéger ou anticipent de plus grands mouvements. Un VIX en baisse signale généralement un pricing du risque plus calme.",
    impactEn: "Use it with equities, credit and rates. A high VIX alone does not tell you exactly where the market will go next.",
    impactFr: "Utilise-le avec les actions, le crédit et les taux. Un VIX élevé ne dit pas à lui seul exactement où le marché ira ensuite.",
    href: "/university/options-option-greeks",
  },
  {
    key: "commodities",
    titleEn: "Commodities: oil, gold and natural gas",
    titleFr: "Matières premières : pétrole, or et gaz naturel",
    whatEn: "Commodity prices depend on physical supply and demand, inventories, geopolitics, currencies and macro expectations.",
    whatFr: "Les prix des matières premières dépendent de l’offre et de la demande physiques, des stocks, de la géopolitique, des devises et des anticipations macroéconomiques.",
    whyEn: "Commodities can reveal information about inflation pressure, global activity, supply shocks and risk demand.",
    whyFr: "Les matières premières peuvent donner des informations sur la pression inflationniste, l’activité mondiale, les chocs d’offre et la demande de protection.",
    readEn: "Oil often reacts to growth and supply shocks. Gold is sensitive to real yields, the US dollar and safe-haven demand. Natural gas is especially sensitive to weather, storage and regional infrastructure.",
    readFr: "Le pétrole réagit souvent à la croissance et aux chocs d’offre. L’or est sensible aux taux réels, au dollar US et à la demande de refuge. Le gaz naturel est particulièrement sensible à la météo, aux stocks et aux infrastructures régionales.",
    impactEn: "Commodity moves can feed into inflation, company margins, sector earnings and central-bank expectations.",
    impactFr: "Les mouvements des matières premières peuvent se transmettre à l’inflation, aux marges des entreprises, aux bénéfices sectoriels et aux anticipations de banques centrales.",
    href: "/university/macroeconomics-markets",
  },
  {
    key: "credit",
    titleEn: "Credit: Investment Grade, High Yield and credit spreads",
    titleFr: "Crédit : Investment Grade, High Yield et spreads de crédit",
    whatEn: "A credit spread is the extra yield a corporate bond offers above a comparable government bond. Investment Grade refers to higher-rated issuers; High Yield refers to lower-rated and riskier issuers.",
    whatFr: "Un spread de crédit est le rendement supplémentaire offert par une obligation d’entreprise par rapport à une obligation d’État comparable. Investment Grade désigne les émetteurs mieux notés ; High Yield désigne les émetteurs moins bien notés et plus risqués.",
    whyEn: "Spreads show how much compensation investors demand for default, liquidity and broader economic risk.",
    whyFr: "Les spreads montrent combien de rémunération les investisseurs exigent pour le risque de défaut, de liquidité et le risque économique général.",
    readEn: "Wider spreads usually mean the market is demanding more compensation for risk. Tighter spreads usually signal stronger risk appetite or greater confidence in corporate credit quality.",
    readFr: "Des spreads plus larges signifient généralement que le marché exige davantage de rémunération pour le risque. Des spreads plus serrés signalent souvent un meilleur appétit pour le risque ou davantage de confiance dans la qualité du crédit des entreprises.",
    impactEn: "Credit spreads affect corporate funding costs, refinancing risk, leveraged finance and equity valuations.",
    impactFr: "Les spreads de crédit affectent le coût de financement des entreprises, le risque de refinancement, la leveraged finance et les valorisations actions.",
    href: "/university/credit-analysis",
  },
];

export default function MarketDataGuide() {
  const { isFrench, text } = useLanguage();
  return (
    <div className="workspace-stack">
      <section className="market-overview-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("HOW TO READ THE MARKET MAP", "COMMENT LIRE LA MARKET MAP")}</span>
            <h2>{text("Turn every number into a market story", "Transformer chaque chiffre en histoire de marché")}</h2>
          </div>
        </div>
        <p className="explanation-copy">{text(
          "Use the same sequence every time: What is it? Why does it matter? What changed? How should I interpret the move? What can it affect next?",
          "Utilise toujours la même séquence : qu’est-ce que c’est ? Pourquoi c’est important ? Qu’est-ce qui a changé ? Comment interpréter le mouvement ? Qu’est-ce que cela peut affecter ensuite ?",
        )}</p>
      </section>

      <section className="analysis-grid">
        {guides.map((guide) => (
          <article className="analysis-card" key={guide.key}>
            <span className="mini-label">{isFrench ? guide.titleFr : guide.titleEn}</span>
            <h3>{text("What it is", "Ce que c’est")}</h3>
            <p>{isFrench ? guide.whatFr : guide.whatEn}</p>
            <h3>{text("Why it matters", "Pourquoi c’est important")}</h3>
            <p>{isFrench ? guide.whyFr : guide.whyEn}</p>
            <h3>{text("How to interpret a move", "Comment interpréter un mouvement")}</h3>
            <p>{isFrench ? guide.readFr : guide.readEn}</p>
            <h3>{text("What it can impact", "Ce que cela peut impacter")}</h3>
            <p>{isFrench ? guide.impactFr : guide.impactEn}</p>
            <Link href={guide.href}>{text("Open related lessons", "Voir les cours liés")} →</Link>
          </article>
        ))}
      </section>

      <section className="coverage-panel">
        <span className="mini-label">{text("QUICK LEGEND", "LÉGENDE RAPIDE")}</span>
        <h3>{text("Common market abbreviations", "Abréviations de marché courantes")}</h3>
        <p><strong>FX</strong> = Foreign Exchange / marché des changes · <strong>VIX</strong> = Cboe Volatility Index · <strong>bps</strong> = basis points / points de base · <strong>IG</strong> = Investment Grade · <strong>HY</strong> = High Yield.</p>
      </section>
    </div>
  );
}
