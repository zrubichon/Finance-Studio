"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Region = "Global" | "USA" | "Europe" | "UK" | "Asia" | "China" | "Japan" | "Emerging Markets";
type Mode = "Beginner" | "Intermediate" | "Professional";

const regions: Region[] = ["Global", "USA", "Europe", "UK", "Asia", "China", "Japan", "Emerging Markets"];
const modes: Mode[] = ["Beginner", "Intermediate", "Professional"];

const marketUniverse = [
  { en: "Equities", fr: "Actions / equities", instruments: ["S&P 500", "Nasdaq 100", "Russell 2000", "STOXX Europe 600", "CAC 40", "DAX", "FTSE 100", "Nikkei 225", "Hang Seng", "MSCI EM"] },
  { en: "Rates", fr: "Taux / rates", instruments: ["Fed Funds", "US 2Y", "US 10Y", "US 30Y", "2s10s", "ECB Deposit Rate", "Bund 10Y", "UK Gilt 10Y", "Japan 10Y"] },
  { en: "FX", fr: "Devises / FX", instruments: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "USD/CNY", "AUD/USD", "DXY"] },
  { en: "Commodities", fr: "Matières premières / commodities", instruments: ["WTI", "Brent", "Natural Gas", "Gold", "Silver", "Copper"] },
  { en: "Volatility & Credit", fr: "Volatilité & Crédit / volatility & credit", instruments: ["VIX", "US IG spreads", "US HY spreads", "Europe IG spreads", "Europe HY spreads"] },
  { en: "Digital Assets", fr: "Actifs numériques / digital assets", instruments: ["Bitcoin", "Ether"] },
];

const explanation: Record<Mode, { en: string; fr: string }> = {
  Beginner: {
    en: "A market move is useful only if you understand the chain behind it. FinanceStudio will explain the trigger, the asset reaction, the mechanism, and the vocabulary step by step.",
    fr: "Un mouvement de marché n’est utile que si tu comprends la chaîne qui l’explique. FinanceStudio détaille le déclencheur / trigger, la réaction de l’actif, le mécanisme et le vocabulaire étape par étape.",
  },
  Intermediate: {
    en: "Moves are interpreted through expectations, positioning, macro data, policy transmission and cross-asset relationships — not only by looking at whether a price is up or down.",
    fr: "Les mouvements sont interprétés à travers les anticipations / expectations, le positionnement / positioning, les données macro, la transmission de politique monétaire / policy transmission et les relations entre classes d’actifs / cross-asset — pas seulement selon qu’un prix monte ou baisse.",
  },
  Professional: {
    en: "The professional layer focuses on repricing versus consensus, curve and spread dynamics, cross-asset relative value, positioning, liquidity and the catalysts capable of invalidating the current market narrative.",
    fr: "Le niveau professionnel se concentre sur le repricing par rapport au consensus, la dynamique de courbe / curve et de spreads, la valeur relative entre actifs / cross-asset relative value, le positionnement, la liquidité / liquidity et les catalyseurs capables d’invalider le scénario de marché actuel.",
  },
};

export default function MarketsWorkspace() {
  const { isFrench, text } = useLanguage();
  const [region, setRegion] = useState<Region>("Global");
  const [mode, setMode] = useState<Mode>("Beginner");

  const regionLabel = (value: Region) => {
    if (!isFrench) return value;
    if (value === "Global") return "Monde";
    if (value === "UK") return "Royaume-Uni";
    if (value === "Asia") return "Asie";
    if (value === "China") return "Chine";
    if (value === "Japan") return "Japon";
    if (value === "Emerging Markets") return "Marchés émergents / emerging markets";
    return value;
  };

  const modeLabel = (value: Mode) => !isFrench ? value : value === "Beginner" ? "Débutant" : value === "Intermediate" ? "Intermédiaire" : "Professionnel";

  const regionNote = useMemo(() => {
    if (region === "Global") return text("Global view with USA + Europe priority", "Vue mondiale avec priorité USA + Europe");
    return text(`${region} focus — global context remains visible`, `Focus ${regionLabel(region)} — le contexte mondial reste visible`);
  }, [region, isFrench, text]);

  return (
    <div className="workspace-stack">
      <section className="control-panel">
        <div>
          <span className="control-label">{text("REGION", "RÉGION")}</span>
          <div className="chip-row">
            {regions.map((item) => (
              <button className={region === item ? "chip active" : "chip"} onClick={() => setRegion(item)} key={item} type="button">{regionLabel(item)}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="control-label">{text("EXPLANATION MODE", "MODE D’EXPLICATION")}</span>
          <div className="chip-row">
            {modes.map((item) => (
              <button className={mode === item ? "chip active" : "chip"} onClick={() => setMode(item)} key={item} type="button">{modeLabel(item)}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="market-overview-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{regionNote}</span>
            <h2>{text("Cross-asset market map", "Carte multi-actifs / cross-asset market map")}</h2>
          </div>
          <span className="connection-badge"><span className="status-dot" /> {text("provider connection pending", "connexion au fournisseur en attente")}</span>
        </div>
        <p className="explanation-copy">{isFrench ? explanation[mode].fr : explanation[mode].en}</p>
        <div className="market-universe-grid">
          {marketUniverse.map((bucket) => (
            <article className="market-universe-card" key={bucket.en}>
              <h3>{isFrench ? bucket.fr : bucket.en}</h3>
              <div className="instrument-list">
                {bucket.instruments.map((instrument) => (
                  <div key={instrument}>
                    <span>{instrument}</span>
                    <em>{text("Awaiting licensed feed", "En attente d’un flux licencié / licensed feed")}</em>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="analysis-grid">
        <article className="analysis-card">
          <span className="mini-label">01 · {text("WHAT CHANGED?", "QU’EST-CE QUI A CHANGÉ ?")}</span>
          <h3>{text("Move before narrative", "Le mouvement avant le récit")}</h3>
          <p>{text("Identify the asset, magnitude, time window and whether the move is unusual relative to recent volatility.", "Identifie l’actif, l’amplitude du mouvement, la fenêtre temporelle et détermine s’il est inhabituel par rapport à la volatilité récente / recent volatility.")}</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">02 · {text("WHY?", "POURQUOI ?")}</span>
          <h3>{text("Find the transmission chain", "Trouver la chaîne de transmission / transmission chain")}</h3>
          <p>{text("Connect macro data, central banks, earnings, geopolitics, positioning and liquidity to the price action.", "Relie les données macro, banques centrales / central banks, résultats / earnings, géopolitique, positionnement et liquidité / liquidity au mouvement de prix / price action.")}</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">03 · {text("WHAT NEXT?", "ET ENSUITE ?")}</span>
          <h3>{text("Define catalysts", "Identifier les catalyseurs / catalysts")}</h3>
          <p>{text("List the next releases, speeches, earnings or technical levels that could confirm or invalidate the move.", "Liste les prochaines publications, interventions, résultats / earnings ou niveaux techniques pouvant confirmer ou invalider le mouvement.")}</p>
        </article>
      </section>
    </div>
  );
}
