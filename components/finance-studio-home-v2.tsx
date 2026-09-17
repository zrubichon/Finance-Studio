"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

type Level = "Beginner" | "Intermediate" | "Professional";
type Theme = "classic" | "girl" | "terminal";

const lessonCopy: Record<Level, { en: { title: string; body: string; term: string }; fr: { title: string; body: string; term: string } }> = {
  Beginner: {
    en: {
      title: "Why rates change everything",
      body: "Interest rates affect the cost of money. Higher rates can make borrowing more expensive, change bond prices and reduce the present value of future company cash flows. The goal is to understand the chain, not memorize one market direction.",
      term: "discount rate / taux d’actualisation",
    },
    fr: {
      title: "Pourquoi les taux changent tout",
      body: "Les taux d’intérêt / interest rates influencent le coût de l’argent. Des taux plus élevés peuvent rendre l’emprunt plus cher, faire varier le prix des obligations / bonds et réduire la valeur actuelle des flux de trésorerie futurs / future cash flows. L’objectif est de comprendre la chaîne de transmission, pas de mémoriser une direction de marché.",
      term: "taux d’actualisation / discount rate",
    },
  },
  Intermediate: {
    en: {
      title: "How policy rates transmit into asset prices",
      body: "A higher expected policy-rate path can lift short-dated yields, tighten financial conditions and increase discount rates used in valuation. The effect depends on duration, balance-sheet sensitivity and what markets had already priced.",
      term: "financial conditions / conditions financières",
    },
    fr: {
      title: "Comment les taux directeurs se transmettent aux prix des actifs",
      body: "Une trajectoire attendue plus élevée des taux directeurs / policy rates peut faire monter les rendements courts / short-dated yields, resserrer les conditions financières / financial conditions et augmenter les taux d’actualisation utilisés en valorisation / valuation. L’effet dépend de la duration, de la sensibilité du bilan / balance sheet et de ce qui était déjà intégré dans les prix / priced in.",
      term: "conditions financières / financial conditions",
    },
  },
  Professional: {
    en: {
      title: "Policy transmission, duration and repricing",
      body: "A hawkish repricing often pressures front-end rates first, changes curve shape, tightens discount-rate assumptions and alters cross-asset relative value. Positioning, terminal-rate expectations and prior pricing determine the magnitude.",
      term: "hawkish repricing / réévaluation restrictive",
    },
    fr: {
      title: "Transmission monétaire, duration et repricing",
      body: "Un repricing restrictif / hawkish repricing met souvent d’abord sous pression les taux courts / front-end rates, modifie la forme de la courbe des taux / yield curve, relève les hypothèses de taux d’actualisation / discount rate et change la valeur relative entre classes d’actifs / cross-asset relative value. Le positionnement, le taux terminal anticipé / terminal rate et ce qui était déjà pricé déterminent l’ampleur du mouvement.",
      term: "réévaluation restrictive / hawkish repricing",
    },
  },
};

const marketGroups = [
  { en: "Equities", fr: "Actions / equities", items: ["S&P 500", "Nasdaq", "STOXX 600", "CAC 40", "Nikkei 225"] },
  { en: "Rates", fr: "Taux / rates", items: ["US 2Y", "US 10Y", "US 30Y", "Bund 10Y", "2s10s"] },
  { en: "FX", fr: "Devises / FX", items: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CNY"] },
  { en: "Commodities", fr: "Matières premières / commodities", items: ["WTI", "Brent", "Gold", "Copper"] },
];

export default function FinanceStudioHomeV2() {
  const { language, setLanguage, isFrench, text } = useLanguage();
  const [level, setLevel] = useState<Level>("Beginner");
  const [theme, setTheme] = useState<Theme>("classic");
  const [today, setToday] = useState("");
  const lesson = lessonCopy[level][isFrench ? "fr" : "en"];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("finance-studio-theme") as Theme | null;
    const savedLevel = window.localStorage.getItem("finance-studio-level") as Level | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLevel) setLevel(savedLevel);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("finance-studio-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => window.localStorage.setItem("finance-studio-level", level), [level]);

  useEffect(() => {
    setToday(new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date()));
  }, [isFrench]);

  const levelLabel = (value: Level) => {
    if (!isFrench) return value;
    return value === "Beginner" ? "Débutant" : value === "Intermediate" ? "Intermédiaire" : "Professionnel";
  };

  return (
    <main className={`app-shell theme-${theme}`}>
      <aside className="sidebar">
        <Link className="brand" href="/"><span className="brand-mark">FS</span><span>FinanceStudio</span></Link>
        <p className="sidebar-kicker">{text("LEARN · MARKETS · CAREERS", "APPRENDRE · MARCHÉS · MÉTIERS")}</p>
        <nav className="primary-nav" aria-label={text("FinanceStudio navigation", "Navigation FinanceStudio")}>
          <Link className="nav-link active" href="/"><span>⌂</span>{text("Home", "Accueil")}</Link>
          {navItems.map((item) => <Link className="nav-link" href={`/${item.slug}`} key={item.slug}><span>{item.icon}</span>{isFrench ? item.labelFr : item.label}</Link>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="progress-ring" aria-label={text("No saved curriculum progress yet", "Aucune progression enregistrée pour le moment")}><span>0%</span></div>
          <div><strong>{text("Foundation track", "Parcours Fondations")}</strong><p>{text("No saved progress yet", "Aucune progression enregistrée")}</p></div>
        </div>
      </aside>

      <section className="main-canvas">
        <header className="topbar">
          <div>
            <p className="date-line">{today}</p>
            <h1>{text("Your finance command center", "Ton centre de commande finance")}</h1>
            <p className="hero-subtitle">{text(
              "Learn the market, understand the why, and train for finance interviews — from zero to professional depth.",
              "Apprends les marchés, comprends le pourquoi et prépare tes entretiens en finance — de zéro jusqu’au niveau professionnel."
            )}</p>
          </div>
          <div className="top-controls">
            <div className="segmented" aria-label={text("Language selector", "Sélecteur de langue")}>
              {(["EN", "FR"] as const).map((item) => <button className={language === item ? "selected" : ""} onClick={() => setLanguage(item)} key={item} type="button">{item}</button>)}
            </div>
            <Link className="profile-chip" href="/progress"><span>FS</span><b>{text("Progress", "Progression")}</b></Link>
          </div>
        </header>

        <section className="toolbar-card">
          <div>
            <span className="toolbar-label">{text("EXPLANATION MODE", "MODE D’EXPLICATION")}</span>
            <div className="level-selector">
              {(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => <button className={level === item ? "selected" : ""} onClick={() => setLevel(item)} key={item} type="button">{levelLabel(item)}</button>)}
            </div>
          </div>
          <div className="theme-picker">
            <span className="toolbar-label">{text("WORKSPACE", "ESPACE DE TRAVAIL")}</span>
            <div className="theme-buttons">
              <button className={theme === "classic" ? "active" : ""} onClick={() => setTheme("classic")} type="button"><span className="swatch classic" />{text("Classic", "Classique")}</button>
              <button className={theme === "girl" ? "active" : ""} onClick={() => setTheme("girl")} type="button"><span className="swatch girl" />Finance Girl</button>
              <button className={theme === "terminal" ? "active" : ""} onClick={() => setTheme("terminal")} type="button"><span className="swatch terminal" />Wall Street</button>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="daily-card card span-7">
            <div className="card-head"><div><span className="eyebrow">{text("TODAY'S LEARNING BRIEF", "BRIEF D’APPRENTISSAGE DU JOUR")}</span><h2>{lesson.title}</h2></div><span className="pill">8 min</span></div>
            <p className="daily-copy">{lesson.body}</p>
            <div className="concept-strip"><span>{text("Key term", "Terme clé")}</span><strong>{lesson.term}</strong></div>
            <div className="flow-diagram" aria-label={text("Simplified finance transmission chain", "Chaîne simplifiée de transmission financière")}>
              <div><small>{text("Policy rate", "Taux directeur / policy rate")}</small><strong>↑</strong></div><span>→</span>
              <div><small>{text("Borrowing cost", "Coût d’emprunt / borrowing cost")}</small><strong>↑</strong></div><span>→</span>
              <div><small>{text("Discount rate", "Taux d’actualisation / discount rate")}</small><strong>↑</strong></div><span>→</span>
              <div><small>{text("Valuation pressure", "Pression sur la valorisation / valuation")}</small><strong>↑</strong></div>
            </div>
            <div className="card-actions"><Link href="/university">{text("Open Finance University", "Ouvrir l’Université de Finance")} <span>→</span></Link><Link href="/dictionary">{text("Open dictionary", "Ouvrir le dictionnaire")}</Link></div>
          </article>

          <article className="card span-5 interview-card">
            <div className="card-head"><div><span className="eyebrow">{text("INTERVIEW DRILL", "ENTRAÎNEMENT ENTRETIEN")}</span><h2>{text("Walk me through a DCF.", "Explique-moi un DCF / discounted cash flow.")}</h2></div><span className="pill accent">IB</span></div>
            <p>{text("Practice technical structure first, then add detail only when the interviewer asks.", "Travaille d’abord la structure technique, puis ajoute du détail seulement lorsque le recruteur le demande.")}</p>
            <div className="answer-framework">
              <div><span>1</span><p><strong>{text("Forecast FCF", "Prévoir le FCF / free cash flow")}</strong><br />{text("Build operating assumptions.", "Construire les hypothèses opérationnelles / operating assumptions.")}</p></div>
              <div><span>2</span><p><strong>{text("Discount", "Actualiser / discount")}</strong><br />{text("Use WACC for unlevered FCF.", "Utiliser le WACC pour le FCF non endetté / unlevered FCF.")}</p></div>
              <div><span>3</span><p><strong>{text("Bridge to equity", "Passer à la valeur des capitaux propres / equity value")}</strong><br />{text("Adjust enterprise value for net debt.", "Ajuster la valeur d’entreprise / enterprise value de la dette nette / net debt.")}</p></div>
            </div>
            <Link className="full-button" href="/interview">{text("Start interview practice", "Commencer l’entraînement entretien")} →</Link>
          </article>

          <article className="card span-12 markets-card">
            <div className="card-head markets-head"><div><span className="eyebrow">{text("MARKET MAP", "CARTE DES MARCHÉS / MARKET MAP")}</span><h2>{text("Global dashboard", "Tableau de bord mondial")}</h2></div><div className="feed-status"><span className="status-dot" />{text("Waiting for licensed / official live feeds", "En attente de flux temps réel / live feeds licenciés ou officiels")}</div></div>
            <div className="market-grid">
              {marketGroups.map((group) => <div className="market-group" key={group.en}><h3>{isFrench ? group.fr : group.en}</h3>{group.items.map((item) => <div className="market-row" key={item}><span>{item}</span><em>{text("Live feed pending", "Flux temps réel en attente")}</em></div>)}</div>)}
            </div>
            <p className="data-note">{text("No invented market values are shown. Live prices will appear only after an authorized provider is connected.", "Aucune valeur de marché inventée n’est affichée. Les prix temps réel / live prices apparaîtront uniquement après la connexion d’un fournisseur autorisé.")}</p>
          </article>

          <article className="card span-4 learning-card">
            <div className="card-head"><div><span className="eyebrow">{text("START YOUR FINANCE PATH", "COMMENCER TON PARCOURS FINANCE")}</span><h2>{text("Year 1 · Foundations", "Année 1 · Fondations")}</h2></div><span className="pill">0%</span></div>
            <div className="course-progress"><span style={{ width: "0%" }} /></div>
            <div className="lesson-list">
              <div><span className="lesson-index">01</span><p><strong>{text("Financial system & market structure", "Système financier & structure de marché / market structure")}</strong><small>{text("Start here", "Commencer ici")}</small></p></div>
              <div><span className="lesson-index">02</span><p><strong>{text("Stocks, bonds, ETFs & funds", "Actions / stocks, obligations / bonds, ETF & fonds")}</strong><small>{text("Next module", "Module suivant")}</small></p></div>
              <div><span className="lesson-index">03</span><p><strong>{text("Money, banking & central banks", "Monnaie, banques & banques centrales / central banks")}</strong><small>{text("Then continue sequentially", "Puis continuer dans l’ordre")}</small></p></div>
            </div>
            <Link href="/university">{text("View curriculum", "Voir le programme")} →</Link>
          </article>

          <article className="card span-4 news-card">
            <div className="card-head"><div><span className="eyebrow">{text("FINANCE INTELLIGENCE", "INTELLIGENCE FINANCIÈRE")}</span><h2>{text("News should teach, not just notify.", "L’actualité doit enseigner, pas seulement informer.")}</h2></div></div>
            <div className="news-stack">
              <div><span>01</span><p><strong>{text("What happened?", "Que s’est-il passé ?")}</strong><small>{text("Facts, timing, actors.", "Faits, calendrier, acteurs.")}</small></p></div>
              <div><span>02</span><p><strong>{text("Why?", "Pourquoi ?")}</strong><small>{text("Drivers and causal chain.", "Moteurs / drivers et chaîne causale.")}</small></p></div>
              <div><span>03</span><p><strong>{text("Market reaction", "Réaction de marché / market reaction")}</strong><small>{text("Cross-asset impact.", "Impact entre classes d’actifs / cross-asset.")}</small></p></div>
              <div><span>04</span><p><strong>{text("What next?", "Et ensuite ?")}</strong><small>{text("Catalysts and scenarios.", "Catalyseurs et scénarios.")}</small></p></div>
            </div>
            <Link href="/news">{text("Open News & Analysis", "Ouvrir Actualités & Analyses")} →</Link>
          </article>

          <article className="card span-4 professor-card">
            <div className="professor-orb">✦</div>
            <span className="eyebrow">{text("AI PROFESSOR", "PROFESSEUR IA")}</span>
            <h2>{text("“I still don't understand duration.”", "« Je ne comprends toujours pas la duration. »")}</h2>
            <p>{text("Switch explanation depth, examples and professional vocabulary while keeping the underlying concept complete.", "Change le niveau d’explication, les exemples et le vocabulaire professionnel sans perdre aucune partie du concept.")}</p>
            <div className="professor-options"><span>{text("Explain simply", "Expliquer simplement")}</span><span>{text("Use numbers", "Utiliser des chiffres")}</span><span>{text("Formula", "Formule")}</span><span>{text("Interview mode", "Mode entretien")}</span></div>
            <Link className="full-button inverse" href="/professor">{text("Open AI Professor", "Ouvrir le Professeur IA")} →</Link>
          </article>
        </section>
      </section>
    </main>
  );
}
