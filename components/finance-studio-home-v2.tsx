"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";

type Level = "Beginner" | "Intermediate" | "Professional";
type Language = "EN" | "FR";
type Theme = "classic" | "girl" | "terminal";

const lessonCopy: Record<Level, { title: string; body: string; term: string }> = {
  Beginner: {
    title: "Why rates change everything",
    body: "Interest rates affect the cost of money. Higher rates can make borrowing more expensive, change bond prices and reduce the present value of future company cash flows. The goal is to understand the chain, not memorize one market direction.",
    term: "discount rate / taux d’actualisation",
  },
  Intermediate: {
    title: "How policy rates transmit into asset prices",
    body: "A higher expected policy-rate path can lift short-dated yields, tighten financial conditions and increase discount rates used in valuation. The effect depends on duration, balance-sheet sensitivity and what markets had already priced.",
    term: "financial conditions / conditions financières",
  },
  Professional: {
    title: "Policy transmission, duration and repricing",
    body: "A hawkish repricing often pressures front-end rates first, changes curve shape, tightens discount-rate assumptions and alters cross-asset relative value. Positioning, terminal-rate expectations and prior pricing determine the magnitude.",
    term: "hawkish repricing / réévaluation restrictive",
  },
};

const languageCopy = {
  EN: {
    greeting: "Your finance command center",
    subtitle: "Learn the market, understand the why, and train for finance interviews — from zero to professional depth.",
    start: "Start your finance path",
  },
  FR: {
    greeting: "Ton centre de commande finance",
    subtitle: "Comprends les marchés, apprends le pourquoi et prépare tes entretiens — de zéro jusqu’au niveau professionnel.",
    start: "Commencer ton parcours finance",
  },
} as const;

const marketGroups = [
  { name: "Equities", items: ["S&P 500", "Nasdaq", "STOXX 600", "CAC 40", "Nikkei 225"] },
  { name: "Rates", items: ["US 2Y", "US 10Y", "US 30Y", "Bund 10Y", "2s10s"] },
  { name: "FX", items: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CNY"] },
  { name: "Commodities", items: ["WTI", "Brent", "Gold", "Copper"] },
];

export default function FinanceStudioHomeV2() {
  const [language, setLanguage] = useState<Language>("EN");
  const [level, setLevel] = useState<Level>("Beginner");
  const [theme, setTheme] = useState<Theme>("classic");
  const [today, setToday] = useState("");
  const copy = languageCopy[language];
  const lesson = lessonCopy[level];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("finance-studio-theme") as Theme | null;
    const savedLanguage = window.localStorage.getItem("finance-studio-language") as Language | null;
    const savedLevel = window.localStorage.getItem("finance-studio-level") as Level | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedLevel) setLevel(savedLevel);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("finance-studio-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => window.localStorage.setItem("finance-studio-language", language), [language]);
  useEffect(() => window.localStorage.setItem("finance-studio-level", level), [level]);

  useEffect(() => {
    setToday(new Intl.DateTimeFormat(language === "FR" ? "fr-FR" : "en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date()));
  }, [language]);

  return (
    <main className={`app-shell theme-${theme}`}>
      <aside className="sidebar">
        <Link className="brand" href="/"><span className="brand-mark">FS</span><span>FinanceStudio</span></Link>
        <p className="sidebar-kicker">LEARN · MARKETS · CAREERS</p>
        <nav className="primary-nav" aria-label="FinanceStudio navigation">
          <Link className="nav-link active" href="/"><span>⌂</span>Home</Link>
          {navItems.map((item) => <Link className="nav-link" href={`/${item.slug}`} key={item.slug}><span>{item.icon}</span>{item.label}</Link>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="progress-ring" aria-label="No saved curriculum progress yet"><span>0%</span></div>
          <div><strong>Foundation track</strong><p>No saved progress yet</p></div>
        </div>
      </aside>

      <section className="main-canvas">
        <header className="topbar">
          <div>
            <p className="date-line">{today}</p>
            <h1>{copy.greeting}</h1>
            <p className="hero-subtitle">{copy.subtitle}</p>
          </div>
          <div className="top-controls">
            <div className="segmented" aria-label="Language selector">
              {(["EN", "FR"] as Language[]).map((item) => <button className={language === item ? "selected" : ""} onClick={() => setLanguage(item)} key={item}>{item}</button>)}
            </div>
            <Link className="profile-chip" href="/progress"><span>FS</span><b>Progress</b></Link>
          </div>
        </header>

        <section className="toolbar-card">
          <div>
            <span className="toolbar-label">EXPLANATION MODE</span>
            <div className="level-selector">
              {(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => <button className={level === item ? "selected" : ""} onClick={() => setLevel(item)} key={item}>{item}</button>)}
            </div>
          </div>
          <div className="theme-picker">
            <span className="toolbar-label">WORKSPACE</span>
            <div className="theme-buttons">
              <button className={theme === "classic" ? "active" : ""} onClick={() => setTheme("classic")}><span className="swatch classic" />Classic</button>
              <button className={theme === "girl" ? "active" : ""} onClick={() => setTheme("girl")}><span className="swatch girl" />Finance Girl</button>
              <button className={theme === "terminal" ? "active" : ""} onClick={() => setTheme("terminal")}><span className="swatch terminal" />Wall Street</button>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="daily-card card span-7">
            <div className="card-head"><div><span className="eyebrow">TODAY'S LEARNING BRIEF</span><h2>{lesson.title}</h2></div><span className="pill">8 min</span></div>
            <p className="daily-copy">{lesson.body}</p>
            <div className="concept-strip"><span>Key term</span><strong>{lesson.term}</strong></div>
            <div className="flow-diagram" aria-label="Simplified finance transmission chain">
              <div><small>Policy rate</small><strong>↑</strong></div><span>→</span>
              <div><small>Borrowing cost</small><strong>↑</strong></div><span>→</span>
              <div><small>Discount rate</small><strong>↑</strong></div><span>→</span>
              <div><small>Valuation pressure</small><strong>↑</strong></div>
            </div>
            <div className="card-actions"><Link href="/university">Open Finance University <span>→</span></Link><Link href="/dictionary">Open dictionary</Link></div>
          </article>

          <article className="card span-5 interview-card">
            <div className="card-head"><div><span className="eyebrow">INTERVIEW DRILL</span><h2>Walk me through a DCF.</h2></div><span className="pill accent">IB</span></div>
            <p>Practice technical structure first, then add detail only when the interviewer asks.</p>
            <div className="answer-framework">
              <div><span>1</span><p><strong>Forecast FCF</strong><br />Build operating assumptions.</p></div>
              <div><span>2</span><p><strong>Discount</strong><br />Use WACC for unlevered FCF.</p></div>
              <div><span>3</span><p><strong>Bridge to equity</strong><br />Adjust enterprise value for net debt.</p></div>
            </div>
            <Link className="full-button" href="/interview">Start interview practice →</Link>
          </article>

          <article className="card span-12 markets-card">
            <div className="card-head markets-head"><div><span className="eyebrow">MARKET MAP</span><h2>Global dashboard</h2></div><div className="feed-status"><span className="status-dot" />Waiting for licensed / official live feeds</div></div>
            <div className="market-grid">
              {marketGroups.map((group) => <div className="market-group" key={group.name}><h3>{group.name}</h3>{group.items.map((item) => <div className="market-row" key={item}><span>{item}</span><em>Live feed pending</em></div>)}</div>)}
            </div>
            <p className="data-note">No invented market values are shown. Live prices will appear only after an authorized provider is connected.</p>
          </article>

          <article className="card span-4 learning-card">
            <div className="card-head"><div><span className="eyebrow">{copy.start.toUpperCase()}</span><h2>Year 1 · Foundations</h2></div><span className="pill">0%</span></div>
            <div className="course-progress"><span style={{ width: "0%" }} /></div>
            <div className="lesson-list">
              <div><span className="lesson-index">01</span><p><strong>Financial system & market structure</strong><small>Start here</small></p></div>
              <div><span className="lesson-index">02</span><p><strong>Stocks, bonds, ETFs & funds</strong><small>Next module</small></p></div>
              <div><span className="lesson-index">03</span><p><strong>Money, banking & central banks</strong><small>Then continue sequentially</small></p></div>
            </div>
            <Link href="/university">View curriculum →</Link>
          </article>

          <article className="card span-4 news-card">
            <div className="card-head"><div><span className="eyebrow">FINANCE INTELLIGENCE</span><h2>News should teach, not just notify.</h2></div></div>
            <div className="news-stack">
              <div><span>01</span><p><strong>What happened?</strong><small>Facts, timing, actors.</small></p></div>
              <div><span>02</span><p><strong>Why?</strong><small>Drivers and causal chain.</small></p></div>
              <div><span>03</span><p><strong>Market reaction</strong><small>Cross-asset impact.</small></p></div>
              <div><span>04</span><p><strong>What next?</strong><small>Catalysts and scenarios.</small></p></div>
            </div>
            <Link href="/news">Open News & Analysis →</Link>
          </article>

          <article className="card span-4 professor-card">
            <div className="professor-orb">✦</div>
            <span className="eyebrow">AI PROFESSOR</span>
            <h2>“I still don't understand duration.”</h2>
            <p>Switch explanation depth, examples and professional vocabulary while keeping the underlying concept complete.</p>
            <div className="professor-options"><span>Explain simply</span><span>Use numbers</span><span>Formula</span><span>Interview mode</span></div>
            <Link className="full-button inverse" href="/professor">Open AI Professor →</Link>
          </article>
        </section>
      </section>
    </main>
  );
}
