"use client";

import { useEffect } from "react";

type Level = "Beginner" | "Intermediate" | "Professional";

const briefs: Record<Level, Array<{ en: [string,string,string]; fr: [string,string,string] }>> = {
  Beginner: [
    { en:["Why bond prices move opposite to yields","When market yields rise, existing fixed coupons become less attractive, so bond prices fall.","yield / rendement"], fr:["Pourquoi le prix des obligations baisse quand les yields montent","Quand les yields montent, les anciens coupons fixes deviennent moins attractifs : leur prix baisse.","rendement / yield"] },
    { en:["What a stock price represents","A share price reflects expectations for future cash flows, growth and risk.","equity value / valeur des capitaux propres"], fr:["Ce que représente le prix d’une action","Le prix reflète les anticipations de cash flows, de croissance et de risque.","valeur des capitaux propres / equity value"] },
    { en:["How inflation reaches markets","Inflation can change rate expectations, financing conditions and company margins.","inflation expectations / anticipations d’inflation"], fr:["Comment l’inflation atteint les marchés","L’inflation peut modifier les anticipations de taux, les conditions de financement et les marges.","anticipations d’inflation / inflation expectations"] },
    { en:["Enterprise value vs equity value","Enterprise value includes the operating business for all capital providers; equity value belongs to shareholders.","enterprise value / valeur d’entreprise"], fr:["Enterprise value vs equity value","L’enterprise value mesure l’activité pour tous les apporteurs de capitaux ; l’equity value revient aux actionnaires.","valeur d’entreprise / enterprise value"] },
  ],
  Intermediate: [],
  Professional: [],
};
briefs.Intermediate = briefs.Beginner.map((b)=>({en:[b.en[0],`${b.en[1]} Focus on what was already priced in and second-order effects.`,b.en[2]],fr:[b.fr[0],`${b.fr[1]} Analyse aussi ce qui était déjà pricé et les effets de second ordre.`,b.fr[2]]}));
briefs.Professional = briefs.Beginner.map((b)=>({en:[b.en[0],`${b.en[1]} Frame the move through positioning, relative value and scenario-dependent repricing.`,b.en[2]],fr:[b.fr[0],`${b.fr[1]} Analyse aussi le positionnement, la valeur relative et les scénarios de repricing.`,b.fr[2]]}));

const interviewQuestions = [
  ["Walk me through a DCF and tell me what can make it wrong.","Explain a DCF and what can invalidate the valuation."],
  ["Why can two similar companies trade at different EBITDA multiples?","Connect growth, margins, risk and expectations to valuation."],
  ["What happens to a DCF if WACC rises by 100 bps?","Give the direction first, then explain why the sensitivity differs by duration."],
  ["Pitch one market view and explain what would invalidate it.","Give a causal chain, a catalyst and a falsifiable invalidation trigger."],
];

function safeRead(key: string) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

export default function HomeHourlyRotator() {
  useEffect(() => {
    let cancelled = false;

    async function refreshMarkets() {
      try {
        const response = await fetch("/api/markets", { cache: "no-store" });
        if (!response.ok || cancelled) return;
        const payload = await response.json();
        const grid = document.querySelector<HTMLElement>(".markets-card .market-grid");
        if (!grid || !Array.isArray(payload?.quotes)) return;
        const grouped = new Map<string, any[]>();
        for (const quote of payload.quotes) {
          const arr = grouped.get(quote.category) ?? [];
          if (arr.length < 4) arr.push(quote);
          grouped.set(quote.category, arr);
        }
        const groups = [...grouped.entries()].slice(0,5);
        if (!groups.length) return;
        grid.innerHTML = groups.map(([name, quotes]) => `<div class="market-group"><h3>${name}</h3>${quotes.map((q:any)=>`<div class="market-row"><span>${q.label}</span><em>${q.unit === "%" ? `${Number(q.value).toFixed(2)}%` : q.unit === "$" ? `$${Number(q.value).toFixed(2)}` : q.unit === "bps" ? `${Number(q.value).toFixed(0)} bps` : Number(q.value).toFixed(q.category === "FX" ? 4 : 2)}</em></div>`).join("")}</div>`).join("");
      } catch {
        // Keep the server-rendered market card if the provider is unavailable.
      }
    }

    function apply() {
      const hour = Math.floor(Date.now() / 3_600_000);
      const isFr = document.documentElement.lang === "fr";
      const saved = safeRead("finance-studio-level");
      const level: Level = saved === "Intermediate" || saved === "Professional" ? saved : "Beginner";
      const brief = briefs[level][hour % briefs[level].length];
      const copy = isFr ? brief.fr : brief.en;
      const card = document.querySelector<HTMLElement>(".daily-card");
      if (card) {
        const eyebrow = card.querySelector<HTMLElement>(".eyebrow");
        const title = card.querySelector<HTMLElement>("h2");
        const body = card.querySelector<HTMLElement>(".daily-copy");
        const term = card.querySelector<HTMLElement>(".concept-strip strong");
        if (eyebrow) eyebrow.textContent = isFr ? "BRIEF D’APPRENTISSAGE HORAIRE" : "HOURLY LEARNING BRIEF";
        if (title) title.textContent = copy[0];
        if (body) body.textContent = copy[1];
        if (term) term.textContent = copy[2];
      }
      const interview = document.querySelector<HTMLElement>(".interview-card");
      if (interview) {
        const variant = interviewQuestions[hour % interviewQuestions.length];
        const title = interview.querySelector<HTMLElement>("h2");
        const body = interview.querySelector<HTMLElement>(":scope > p");
        if (title) title.textContent = variant[0];
        if (body) body.textContent = variant[1];
      }
    }

    apply();
    void refreshMarkets();
    const uiTimer = window.setInterval(apply, 30_000);
    const marketTimer = window.setInterval(refreshMarkets, 300_000);
    return () => {
      cancelled = true;
      window.clearInterval(uiTimer);
      window.clearInterval(marketTimer);
    };
  }, []);

  return null;
}
