"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const lessons = [
  ["Market structure", "Structure de marché", "/university/year-1-financial-system-market-structure"],
  ["Macroeconomics for markets", "Macroéconomie pour les marchés", "/university/year-1-macroeconomics-for-markets"],
  ["Money, banking & central banks", "Monnaie, banques & banques centrales", "/university/year-1-money-banking-central-banks"],
  ["Fixed income & yield curves", "Obligations & courbes de taux", "/university/year-2-fixed-income-yield-curves"],
  ["Yield curve", "Yield curve / courbe des taux", "/university/year-2-yield-curve"],
  ["FX & international finance", "FX & finance internationale", "/university/year-2-fx-international-finance"],
  ["Equity valuation", "Valorisation actions", "/university/year-2-equity-valuation"],
  ["Options & option Greeks", "Options & Greeks", "/university/year-2-options-option-greeks"],
  ["Credit analysis", "Analyse crédit", "/university/year-3-credit-analysis"],
];

export default function MarketLearningHub() {
  const { isFrench, text } = useLanguage();
  return (
    <section className="workspace-stack market-learning-hub">
      <section className="news-blueprint-panel">
        <div className="panel-heading"><div><span className="mini-label">{text("LEARN BEFORE YOU INTERPRET", "APPRENDRE AVANT D’INTERPRÉTER")}</span><h2>{text("How this market map works — from institutions to the number on screen", "Comment fonctionne cette Market Map — des institutions au chiffre affiché")}</h2></div></div>
        <p className="explanation-copy">{text(
          "The table is not a collection of isolated prices. Every observation comes from a market, an institution or a data provider, has a timestamp, and is driven by expectations, flows, liquidity and policy. FinanceStudio shows the latest observation returned by each connected provider; that can be daily, delayed or intraday depending on the series. Always read the 'as of' date before calling a move 'today'.",
          "Ces tableaux ne sont pas une collection de prix isolés. Chaque observation vient d’un marché, d’une institution ou d’un fournisseur, possède une date et dépend des anticipations, flux, liquidité et politiques publiques. FinanceStudio affiche la dernière observation renvoyée par chaque source connectée : elle peut être quotidienne, retardée ou intraday selon la série. Lis toujours la date « as of » avant de qualifier un mouvement d’actuel.")}</p>
      </section>

      <section className="analysis-grid">
        <article className="analysis-card"><span className="mini-label">{text("CONNECTED SOURCES", "SOURCES CONNECTÉES")}</span><h3>FRED</h3><p>{text("FRED is the Federal Reserve Bank of St. Louis economic database. FinanceStudio currently uses public FRED series for a large part of US rates, indices, volatility, commodities and credit reference data. FRED is a data distribution source: it may republish observations originating from other institutions and it is not a real-time exchange feed.", "FRED est la base économique de la Federal Reserve Bank of St. Louis. FinanceStudio utilise actuellement des séries publiques FRED pour une grande partie des taux US, indices, volatilité, matières premières et crédit. FRED distribue des données ; ce n’est pas un flux d’exchange temps réel.")}</p></article>
        <article className="analysis-card"><span className="mini-label">{text("CONNECTED SOURCES", "SOURCES CONNECTÉES")}</span><h3>European Central Bank</h3><p>{text("The European Central Bank public feed supplies the connected euro-area/FX observations used here. A source being 'live' means the FinanceStudio connector is working; it does not mean every underlying series changes every second.", "Le flux public de la Banque centrale européenne fournit les observations connectées liées à la zone euro/FX. Une source « live » signifie que le connecteur FinanceStudio fonctionne ; cela ne signifie pas que chaque série change chaque seconde.")}</p></article>
        <article className="analysis-card"><span className="mini-label">{text("PRIMARY INSTITUTIONS", "INSTITUTIONS PRIMAIRES")}</span><h3>{text("Fed, ECB, BLS, Treasury and exchanges", "Fed, ECB, BLS, Treasury et exchanges")}</h3><p>{text("The Federal Reserve sets US monetary policy; the ECB does the same for the euro area. The US Bureau of Labor Statistics (BLS) publishes major releases such as CPI and employment data. The US Treasury issues government debt. Exchanges and dealer markets are where prices are formed through orders, quotes and transactions. These institutions are important to understand even when they are not direct FinanceStudio data connectors.", "La Federal Reserve décide de la politique monétaire américaine ; la BCE joue ce rôle dans la zone euro. Le Bureau of Labor Statistics (BLS) publie notamment le CPI et les données d’emploi. Le US Treasury émet la dette publique. Les exchanges et marchés de dealers forment les prix via ordres, quotes et transactions. Ces institutions sont essentielles même lorsqu’elles ne sont pas des connecteurs directs FinanceStudio.")}</p></article>
      </section>

      <section className="news-blueprint-panel">
        <span className="mini-label">{text("QUICK MARKET LANGUAGE", "LANGAGE DE MARCHÉ ESSENTIEL")}</span>
        <div className="analysis-grid">
          <article className="analysis-card"><h3>10Y−2Y / 2s10s</h3><p>{text("10Y−2Y means the 10-year US Treasury yield minus the 2-year yield. If 10Y = 5.20% and 2Y = 4.80%, the spread is +0.40 percentage point = +40 bps. A negative result means this section of the curve is inverted.", "10Y−2Y signifie yield Treasury US 10 ans moins yield 2 ans. Si 10Y = 5,20 % et 2Y = 4,80 %, le spread vaut +0,40 point = +40 bps. Un résultat négatif signifie que cette partie de la courbe est inversée.")}</p></article>
          <article className="analysis-card"><h3>bps</h3><p>{text("bps means basis points. 100 bps = 1.00 percentage point; 25 bps = 0.25 point. Basis points prevent ambiguity when discussing changes in yields, policy rates and spreads.", "bps signifie basis points / points de base. 100 bps = 1,00 point de pourcentage ; 25 bps = 0,25 point. Les bps évitent l’ambiguïté lorsqu’on parle de variations de taux ou de spreads.")}</p></article>
          <article className="analysis-card"><h3>IG / HY / OAS</h3><p>{text("IG = Investment Grade; HY = High Yield. OAS = Option-Adjusted Spread, a credit spread measure designed to compare compensation for credit risk after adjusting for embedded options. Wider spreads usually mean investors demand more compensation for risk.", "IG = Investment Grade ; HY = High Yield. OAS = Option-Adjusted Spread, une mesure de spread de crédit ajustée des options intégrées. Des spreads plus larges indiquent généralement une rémunération du risque exigée plus élevée.")}</p></article>
        </div>
      </section>

      <section className="news-blueprint-panel">
        <span className="mini-label">{text("WHO MOVES MARKETS?", "QUI FAIT BOUGER LES MARCHÉS ?")}</span>
        <h2>{text("Price formation is the interaction of information, expectations and orders", "La formation des prix vient de l’interaction entre information, anticipations et ordres")}</h2>
        <div className="analysis-grid">
          <article className="analysis-card"><h3>{text("Central banks & governments", "Banques centrales & États")}</h3><p>{text("Policy rates, balance-sheet policy, fiscal deficits, debt issuance and regulation change the price of money and the supply of securities.", "Taux directeurs, bilan des banques centrales, déficits, émissions de dette et régulation modifient le prix de l’argent et l’offre de titres.")}</p></article>
          <article className="analysis-card"><h3>{text("Data releases", "Publications de données")}</h3><p>{text("CPI, payrolls, GDP and surveys matter because they change what investors expect central banks, companies and consumers to do next. The surprise versus consensus often matters more than the absolute number.", "CPI, emploi, PIB et enquêtes comptent car ils modifient les anticipations. La surprise par rapport au consensus compte souvent davantage que le niveau absolu.")}</p></article>
          <article className="analysis-card"><h3>{text("Investors, dealers & liquidity", "Investisseurs, dealers & liquidité")}</h3><p>{text("Asset managers, banks, hedge funds, pensions, insurers, corporates, retail traders and algorithms submit orders. Market makers quote prices and manage inventory. Thin liquidity can amplify a move even without a major new fundamental fact.", "Asset managers, banques, hedge funds, fonds de pension, assureurs, entreprises, particuliers et algorithmes passent des ordres. Les market makers cotent et gèrent leur inventory. Une faible liquidité peut amplifier un mouvement.")}</p></article>
        </div>
      </section>

      <section className="market-course-strip">
        <span className="mini-label">{text("COURSES TO TAKE BEFORE GOING DEEPER", "COURS À FAIRE AVANT D’ALLER PLUS LOIN")}</span>
        <p>{text("You do not need to finish all of them before using Markets. Use these links as a learning map whenever a number or relationship is unclear.", "Tu n’as pas besoin de tous les terminer avant d’utiliser Markets. Utilise-les comme carte d’apprentissage dès qu’un chiffre ou une relation n’est pas clair.")}</p>
        <div className="market-course-links">
          {lessons.map(([en, fr, href]) => <Link key={href} href={href}>{isFrench ? fr : en} →</Link>)}
        </div>
      </section>
    </section>
  );
}
