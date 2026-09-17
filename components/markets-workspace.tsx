"use client";

import { useMemo, useState } from "react";

type Region = "Global" | "USA" | "Europe" | "UK" | "Asia" | "China" | "Japan" | "Emerging Markets";
type Mode = "Beginner" | "Intermediate" | "Professional";

const regions: Region[] = ["Global", "USA", "Europe", "UK", "Asia", "China", "Japan", "Emerging Markets"];
const modes: Mode[] = ["Beginner", "Intermediate", "Professional"];

const marketUniverse = [
  { group: "Equities", instruments: ["S&P 500", "Nasdaq 100", "Russell 2000", "STOXX Europe 600", "CAC 40", "DAX", "FTSE 100", "Nikkei 225", "Hang Seng", "MSCI EM"] },
  { group: "Rates", instruments: ["Fed Funds", "US 2Y", "US 10Y", "US 30Y", "2s10s", "ECB Deposit Rate", "Bund 10Y", "UK Gilt 10Y", "Japan 10Y"] },
  { group: "FX", instruments: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "USD/CNY", "AUD/USD", "DXY"] },
  { group: "Commodities", instruments: ["WTI", "Brent", "Natural Gas", "Gold", "Silver", "Copper"] },
  { group: "Volatility & Credit", instruments: ["VIX", "US IG spreads", "US HY spreads", "Europe IG spreads", "Europe HY spreads"] },
  { group: "Digital Assets", instruments: ["Bitcoin", "Ether"] },
];

const explanation: Record<Mode, string> = {
  Beginner: "A market move is useful only if you understand the chain behind it. FinanceStudio will explain the trigger, the asset reaction, the mechanism, and the vocabulary step by step.",
  Intermediate: "Moves are interpreted through expectations, positioning, macro data, policy transmission and cross-asset relationships — not only by looking at whether a price is up or down.",
  Professional: "The professional layer focuses on repricing versus consensus, curve and spread dynamics, cross-asset relative value, positioning, liquidity and the catalysts capable of invalidating the current market narrative.",
};

export default function MarketsWorkspace() {
  const [region, setRegion] = useState<Region>("Global");
  const [mode, setMode] = useState<Mode>("Beginner");

  const regionNote = useMemo(() => {
    if (region === "Global") return "Global view with USA + Europe priority";
    return `${region} focus — global context remains visible`;
  }, [region]);

  return (
    <div className="workspace-stack">
      <section className="control-panel">
        <div>
          <span className="control-label">REGION</span>
          <div className="chip-row">
            {regions.map((item) => (
              <button className={region === item ? "chip active" : "chip"} onClick={() => setRegion(item)} key={item} type="button">{item}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="control-label">EXPLANATION MODE</span>
          <div className="chip-row">
            {modes.map((item) => (
              <button className={mode === item ? "chip active" : "chip"} onClick={() => setMode(item)} key={item} type="button">{item}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="market-overview-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{regionNote}</span>
            <h2>Cross-asset market map</h2>
          </div>
          <span className="connection-badge"><span className="status-dot" /> provider connection pending</span>
        </div>
        <p className="explanation-copy">{explanation[mode]}</p>
        <div className="market-universe-grid">
          {marketUniverse.map((bucket) => (
            <article className="market-universe-card" key={bucket.group}>
              <h3>{bucket.group}</h3>
              <div className="instrument-list">
                {bucket.instruments.map((instrument) => (
                  <div key={instrument}>
                    <span>{instrument}</span>
                    <em>Awaiting licensed feed</em>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="analysis-grid">
        <article className="analysis-card">
          <span className="mini-label">01 · WHAT CHANGED?</span>
          <h3>Move before narrative</h3>
          <p>Identify the asset, magnitude, time window and whether the move is unusual relative to recent volatility.</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">02 · WHY?</span>
          <h3>Find the transmission chain</h3>
          <p>Connect macro data, central banks, earnings, geopolitics, positioning and liquidity to the price action.</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">03 · WHAT NEXT?</span>
          <h3>Define catalysts</h3>
          <p>List the next releases, speeches, earnings or technical levels that could confirm or invalidate the move.</p>
        </article>
      </section>
    </div>
  );
}
