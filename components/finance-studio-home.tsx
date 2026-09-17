"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";

type Level = "Beginner" | "Intermediate" | "Professional";
type Language = "EN" | "FR";
type Theme = "classic" | "girl" | "terminal";

const levelCopy: Record<Level, { title: string; explanation: string; term: string }> = {
  Beginner: {
    title: "Why rates change everything",
    explanation:
      "Interest rates influence the cost of money. When rates rise, borrowing becomes more expensive, future company profits are discounted more heavily, and bond prices can fall. The important part is not memorizing the direction — it is understanding the transmission chain.",
    term: "discount rate / taux d’actualisation",
  },
  Intermediate: {
    title: "How policy rates transmit into asset prices",
    explanation:
      "A higher policy-rate path can lift short-dated yields, tighten financial conditions and raise discount rates used in valuation. The impact differs by duration, balance-sheet sensitivity and the market’s prior expectations.",
    term: "financial conditions / conditions financières",
  },
  Professional: {
    title: "Policy transmission, duration and repricing",
    explanation:
      "A hawkish repricing typically pressures front-end rates first, can flatten or invert curves, tightens discount-rate assumptions and changes cross-asset relative value. The magnitude depends on positioning, terminal-rate expectations and whether the move was already priced.",
    term: "hawkish repricing / réévaluation restrictive",
  },
};

const languageCopy: Record<Language, { greeting: string; subtitle: string; daily: string; market: string; learn: string; interview: string; professor: string }> = {
  EN: {
    greeting: "Your finance command center",
    subtitle: "Learn the market, understand the why, and train for finance interviews — from zero to professional depth.",
    daily: "Today's learning brief",
    market: "Market map",
    learn: "Continue learning",
    interview: "Interview drill",
    professor: "Ask AI Professor",
  },
  FR: {
    greeting: "Ton centre de commande finance",
    subtitle: "Comprends les marchés, apprends le pourquoi et prépare tes entretiens — de zéro jusqu’au niveau professionnel.",
    daily: "Brief d’apprentissage du jour",
    market: "Carte des marchés / market map",
    learn: "Continuer à apprendre / continue learning",
    interview: "Entraînement entretien / interview drill",
    professor: "Demander au professeur IA / Ask AI Professor",
  },
};

const marketGroups = [
  { name: "Equities", items: ["S&P 500", "Nasdaq", "STOXX 600", "CAC 40", "Nikkei 225"] },
  { name: "Rates", items: ["US 2Y", "US 10Y", "US 30Y", "Bund 10Y", "2s10s"] },
  { name: "FX", items: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CNY"] },
  { name: "Commodities", items: ["WTI", "Brent", "Gold", "Copper"] },
];

export default function FinanceStudioHome() {
  const [language, setLanguage] = useState<Language>("EN");
  const [level, setLevel] = useState<Level>("Beginner");
  const [theme, setTheme] = useState<Theme>("classic");
  const [today, setToday] = useState("");
  const copy = languageCopy[language];
  const lesson = levelCopy[level];

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
  }, [theme]);
  useEffect(() => {
    window.localStorage.setItem("finance-studio-language", language);
  }, [language]);
  useEffect(() => {
    window.localStorage.setItem("finance-studio-level", level);
  }, [level]);

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat(language === "FR" ? "fr-FR" : "en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(new Date())
    );
  }, [language]);

  return (
    <main className={`app-shell theme-${theme}`}>
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <p className="sidebar-kicker">LEARN · MARKETS · CAREERS</p>
        <nav className="primary-nav" aria-label="FinanceStudio navigation">
          <Link className="nav-link active" href="/"><span>⌂</span>Home</Link>
          {navItems.map((item) => (
            <Link className="nav-link" href={`/${item.slug}`} key={item.slug}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="progress-ring" aria-label="12 percent of foundation curriculum completed"><span>12%</span></div>
          <div><strong>Foundation track</strong><p>8 concepts mastered</p></div>
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
              {(["EN", "FR"] as Language[]).map((item) => (
                <button className={language === item ? "selected" : ""} onClick={() => setLanguage(item)} key={item}>{item}</button>
              ))}
            </div>
            <button className="profile-chip" type="button"><span>ZR</span><b>Student</b></button>
          </div>
        </header>

        <section className="toolbar-card">
          <div>
            <span className="toolbar-label">EXPLANATION MODE</span>
            <div className="level-selector">
              {(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => (
                <button className={level === item ? "selected" : ""} onClick={() => setLevel(item)} key={item}>{item}</button>
              ))}
            </div>
          </div>
          <div className="theme-picker">
            <span className="toolbar-label">WORKSPACE</span>
            <div className="theme-buttons">
              <button aria-label="Classic finance theme" className={theme === "classic" ? "active" : ""} onClick={() => setTheme("classic")}><span className="swatch classic" />Classic</button>
              <button aria-label="Finance girl theme" className={theme === "girl" ? "active" : ""} onClick={() => setTheme("girl")}><span className="swatch girl" />Finance Girl</button>
              <button aria-label="Wall Street theme" className={theme === "terminal" ? "active" : ""} onClick={() => setTheme("terminal")}><span className="swatch terminal" />Wall Street</button>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="daily-card card span-7">
            <div className="card-head">
              <div><span className="eyebrow">{copy.daily.toUpperCase()}</span><h2>{lesson.title}</h2></div>
              <span className="pill">8 min</span>
            </div>
            <p className="daily-copy">{lesson.explanation}</p>
            <div className="concept-strip"><span>Key term</span><strong>{lesson.term}</strong></div>
            <div className="flow-diagram" aria-label="Simplified finance transmission chain">
              <div><small>Policy rate</small><strong>↑</strong></div><span>→</span>
              <div><small>Borrowing cost</small><strong>↑</strong></div><span>→</span>
              <div><small>Discount rate</small><strong>↑</strong></div><span>→</span>
              <div><small>Valuation pressure</small><strong>↑</strong></div>
            </div>
            <div className="card-actions"><Link href="/university">Open full lesson <span>→</span></Link><button type="button">Save concept</button></div>
          </article>

          <article className="card span-5 interview-card">
            <div className="card-head"><div><span className="eyebrow">{copy.interview.toUpperCase()}</span><h2>Walk me through a DCF.</h2></div><span className="pill accent">IB</span></div>
            <p>Structure your answer from free cash flow to terminal value, enterprise value and equity value.</p>
            <div className="answer-framework">
              <div><span>1</span><p><strong>Forecast FCF</strong><br />Build operating assumptions.</p></div>
              <div><span>2</span><p><strong>Discount</strong><br />Use WACC for unlevered FCF.</p></div>
              <div><span>3</span><p><strong>Bridge to equity</strong><br />Adjust enterprise value for net debt.</p></div>
            </div>
            <Link className="full-button" href="/interview">Start answer practice →</Link>
          </article>

          <article className="card span-12 markets-card">
            <div className="card-head markets-head"><div><span className="eyebrow">{copy.market.toUpperCase()}</span><h2>Global dashboard</h2></div><div className="feed-status"><span className="status-dot" />Data provider layer ready to connect</div></div>
            <div className="market-grid">
              {marketGroups.map((group) => (
                <div className="market-group" key={group.name}>
                  <h3>{group.name}</h3>
                  {group.items.map((item) => <div className="market-row" key={item}><span>{item}</span><em>Live feed</em></div>)}
                </div>
              ))}
            </div>
            <p className="data-note">The interface intentionally does not display invented prices. Production market values will come from licensed or official data sources.</p>
          </article>

          <article className="card span-4 learning-card">
            <div className="card-head"><div><span className="eyebrow">{copy.learn.toUpperCase()}</span><h2>Year 1 · Foundations</h2></div><span className="pill">12%</span></div>
            <div className="course-progress"><span style={{ width: "12%" }} /></div>
            <div className="lesson-list">
              <div><span className="check">✓</span><p><strong>What is a financial market?</strong><small>Completed</small></p></div>
              <div><span className="lesson-index">09</span><p><strong>Time value of money</strong><small>Next · 18 min</small></p></div>
              <div><span className="lesson-index">10</span><p><strong>Risk vs return</strong><small>Locked prerequisite</small></p></div>
            </div>
            <Link href="/university">View curriculum →</Link>
          </article>

          <article className="card span-4 news-card">
            <div className="card-head"><div><span className="eyebrow">FINANCE INTELLIGENCE</span><h2>How every story will be explained</h2></div></div>
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
            <span className="eyebrow">{copy.professor.toUpperCase()}</span>
            <h2>“I still don't understand duration.”</h2>
            <p>Ask for a simpler explanation, a numerical proof, a visual model or an interview-ready answer — without losing the underlying knowledge.</p>
            <div className="professor-options"><span>Explain simply</span><span>Use numbers</span><span>Draw it</span><span>Interview mode</span></div>
            <Link className="full-button inverse" href="/professor">Open AI Professor →</Link>
          </article>
        </section>
      </section>
    </main>
  );
}
