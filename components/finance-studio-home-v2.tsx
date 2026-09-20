"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/lib/content";
import { allCurriculumModules } from "@/lib/curriculum";
import {
  interviewQuestions,
  isInterviewTrack,
  type Track,
} from "@/lib/interview-content";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type Level = "Beginner" | "Intermediate" | "Professional";
type Theme = "classic" | "girl" | "terminal";

type MarketQuote = {
  id: string;
  label: string;
  category: string;
  value: number;
  changePercent: number | null;
  unit: "" | "%" | "$" | "bps";
  asOf: string;
  source: string;
};

type MarketPayload = {
  updatedAt: string;
  quotes: MarketQuote[];
  providers: Array<{
    id: string;
    label: string;
    status: "live" | "partial" | "needs_configuration" | "error";
    message: string;
  }>;
};

const lessonCopy: Record<Level, {
  en: { title: string; body: string; term: string };
  fr: { title: string; body: string; term: string };
}> = {
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

function profileLevel(value: string | null | undefined): Level | null {
  if (value === "beginner") return "Beginner";
  if (value === "intermediate") return "Intermediate";
  if (value === "professional") return "Professional";
  return null;
}

function formatMarketValue(quote: MarketQuote) {
  if (quote.unit === "%") return `${quote.value.toFixed(2)}%`;
  if (quote.unit === "$") return `$${quote.value.toFixed(2)}`;
  if (quote.unit === "bps") return `${quote.value.toFixed(0)} bps`;
  if (quote.category === "FX") {
    return quote.value >= 100 ? quote.value.toFixed(2) : quote.value.toFixed(4);
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(quote.value);
}

function trackBadge(track: Track) {
  if (track === "Investment Banking") return "IB";
  if (track === "Sales & Trading") return "S&T";
  if (track === "Asset Management") return "AM";
  if (track === "Wealth Management") return "WM";
  if (track === "Private Equity") return "PE";
  return "ER";
}

export default function FinanceStudioHomeV2() {
  const { language, setLanguage, isFrench, text } = useLanguage();
  const [level, setLevel] = useState<Level>("Beginner");
  const [theme, setTheme] = useState<Theme>("classic");
  const [today, setToday] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [targetRole, setTargetRole] = useState("");
  const [marketData, setMarketData] = useState<MarketPayload | null>(null);

  const modules = useMemo(() => allCurriculumModules(), []);
  const moduleSlugs = useMemo(() => new Set(modules.map((module) => module.slug)), [modules]);
  const completedSet = useMemo(
    () => new Set(completedSlugs.filter((slug) => moduleSlugs.has(slug))),
    [completedSlugs, moduleSlugs],
  );
  const completedCount = completedSet.size;
  const progressPercent = modules.length
    ? Math.round((completedCount / modules.length) * 100)
    : 0;
  const nextIndex = modules.findIndex((module) => !completedSet.has(module.slug));
  const nextModule = nextIndex >= 0 ? modules[nextIndex] : null;
  const learningPreview = nextIndex >= 0
    ? modules.slice(nextIndex, nextIndex + 3)
    : modules.slice(-3);

  const interviewTrack: Track = isInterviewTrack(targetRole)
    ? targetRole
    : "Investment Banking";
  const interview = interviewQuestions[interviewTrack];

  const lesson = lessonCopy[level][isFrench ? "fr" : "en"];

  const groupedMarkets = useMemo(() => {
    const groups = new Map<string, MarketQuote[]>();
    for (const quote of marketData?.quotes ?? []) {
      const current = groups.get(quote.category) ?? [];
      if (current.length < 4) current.push(quote);
      groups.set(quote.category, current);
    }
    return [...groups.entries()].slice(0, 4);
  }, [marketData]);

  useEffect(() => {
    let mounted = true;

    const savedTheme = window.localStorage.getItem("finance-studio-theme") as Theme | null;
    const savedLevel = window.localStorage.getItem("finance-studio-level") as Level | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLevel) setLevel(savedLevel);

    async function hydrateAccount() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;

      setUserId(user.id);

      const [profileResult, preferencesResult, progressResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("explanation_level,target_role")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("user_preferences")
          .select("theme")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("course_progress")
          .select("lesson_slug,status")
          .eq("user_id", user.id),
      ]);

      if (!mounted) return;

      const accountLevel = profileLevel(profileResult.data?.explanation_level);
      if (accountLevel) {
        setLevel(accountLevel);
        window.localStorage.setItem("finance-studio-level", accountLevel);
      }

      const accountTheme = preferencesResult.data?.theme as Theme | undefined;
      if (accountTheme === "classic" || accountTheme === "girl" || accountTheme === "terminal") {
        setTheme(accountTheme);
        window.localStorage.setItem("finance-studio-theme", accountTheme);
      }

      setTargetRole(profileResult.data?.target_role ?? "");
      setCompletedSlugs(
        (progressResult.data ?? [])
          .filter((row) => row.status === "completed")
          .map((row) => row.lesson_slug),
      );
    }

    void hydrateAccount();

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadMarkets() {
      try {
        const response = await fetch("/api/markets", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as MarketPayload;
        if (mounted) setMarketData(data);
      } catch {
        // Home keeps a transparent empty state when providers are unreachable.
      }
    }

    void loadMarkets();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("finance-studio-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("finance-studio-level", level);
  }, [level]);

  useEffect(() => {
    setToday(new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date()));
  }, [isFrench]);

  const levelLabel = (value: Level) => {
    if (!isFrench) return value;
    return value === "Beginner"
      ? "Débutant"
      : value === "Intermediate"
        ? "Intermédiaire"
        : "Professionnel";
  };

  async function chooseLevel(nextLevel: Level) {
    setLevel(nextLevel);
    if (!userId) return;

    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        explanation_level: nextLevel.toLowerCase(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }

  async function chooseTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    if (!userId) return;

    const supabase = createClient();
    await supabase
      .from("user_preferences")
      .update({
        theme: nextTheme,
        accent_color: null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }

  const liveProviders = marketData?.providers.filter((provider) => provider.status === "live") ?? [];

  return (
    <main className={`app-shell theme-${theme}`}>
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <p className="sidebar-kicker">{text("LEARN · MARKETS · CAREERS", "APPRENDRE · MARCHÉS · MÉTIERS")}</p>

        <nav className="primary-nav" aria-label={text("FinanceStudio navigation", "Navigation FinanceStudio")}>
          <Link className="nav-link active" href="/"><span>⌂</span>{text("Home", "Accueil")}</Link>
          {navItems.map((item) => (
            <Link className="nav-link" href={`/${item.slug}`} key={item.slug}>
              <span>{item.icon}</span>{isFrench ? item.labelFr : item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="progress-ring" aria-label={text("Curriculum progress", "Progression du programme")}>
            <span>{progressPercent}%</span>
          </div>
          <div>
            <strong>{text("Finance University", "Université de Finance")}</strong>
            <p>
              {userId
                ? (isFrench ? `${completedCount}/${modules.length} cours terminés` : `${completedCount}/${modules.length} lessons completed`)
                : text("Sign in to sync progress", "Connecte-toi pour synchroniser")}
            </p>
          </div>
        </div>
      </aside>

      <section className="main-canvas">
        <header className="topbar">
          <div>
            <p className="date-line">{today}</p>
            <h1>{text("Your finance command center", "Ton centre de commande finance")}</h1>
            <p className="hero-subtitle">{text(
              "Learn the market, understand the why, and train for finance interviews — from zero to professional depth.",
              "Apprends les marchés, comprends le pourquoi et prépare tes entretiens en finance — de zéro jusqu’au niveau professionnel.",
            )}</p>
          </div>

          <div className="top-controls">
            <div className="segmented" aria-label={text("Language selector", "Sélecteur de langue")}>
              {(["EN", "FR"] as const).map((item) => (
                <button
                  className={language === item ? "selected" : ""}
                  onClick={() => setLanguage(item)}
                  key={item}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <Link className="profile-chip" href={userId ? "/account" : "/login"}>
              <span>FS</span>
              <b>{userId ? text("Account", "Compte") : text("Sign in", "Connexion")}</b>
            </Link>
          </div>
        </header>

        <section className="toolbar-card">
          <div>
            <span className="toolbar-label">{text("EXPLANATION MODE", "MODE D’EXPLICATION")}</span>
            <div className="level-selector">
              {(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => (
                <button
                  className={level === item ? "selected" : ""}
                  onClick={() => void chooseLevel(item)}
                  key={item}
                  type="button"
                >
                  {levelLabel(item)}
                </button>
              ))}
            </div>
          </div>

          <div className="theme-picker">
            <span className="toolbar-label">{text("WORKSPACE", "ESPACE DE TRAVAIL")}</span>
            <div className="theme-buttons">
              <button className={theme === "classic" ? "active" : ""} onClick={() => void chooseTheme("classic")} type="button">
                <span className="swatch classic" />{text("Classic", "Classique")}
              </button>
              <button className={theme === "girl" ? "active" : ""} onClick={() => void chooseTheme("girl")} type="button">
                <span className="swatch girl" />Finance Girl
              </button>
              <button className={theme === "terminal" ? "active" : ""} onClick={() => void chooseTheme("terminal")} type="button">
                <span className="swatch terminal" />Wall Street
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="daily-card card span-7">
            <div className="card-head">
              <div>
                <span className="eyebrow">{text("TODAY'S LEARNING BRIEF", "BRIEF D’APPRENTISSAGE DU JOUR")}</span>
                <h2>{lesson.title}</h2>
              </div>
              <span className="pill">{levelLabel(level)}</span>
            </div>

            <p className="daily-copy">{lesson.body}</p>
            <div className="concept-strip">
              <span>{text("Key term", "Terme clé")}</span>
              <strong>{lesson.term}</strong>
            </div>

            <div className="flow-diagram" aria-label={text("Simplified finance transmission chain", "Chaîne simplifiée de transmission financière")}>
              <div><small>{text("Policy rate", "Taux directeur / policy rate")}</small><strong>↑</strong></div><span>→</span>
              <div><small>{text("Borrowing cost", "Coût d’emprunt / borrowing cost")}</small><strong>↑</strong></div><span>→</span>
              <div><small>{text("Discount rate", "Taux d’actualisation / discount rate")}</small><strong>↑</strong></div><span>→</span>
              <div><small>{text("Valuation pressure", "Pression sur la valorisation / valuation")}</small><strong>↑</strong></div>
            </div>

            <div className="card-actions">
              <Link href={nextModule ? `/university/${nextModule.slug}` : "/university"}>
                {nextModule ? text("Continue your next lesson", "Continuer ton prochain cours") : text("Review Finance University", "Revoir l’Université de Finance")} <span>→</span>
              </Link>
              <Link href="/dictionary">{text("Open dictionary", "Ouvrir le dictionnaire")}</Link>
            </div>
          </article>

          <article className="card span-5 interview-card">
            <div className="card-head">
              <div>
                <span className="eyebrow">{text("INTERVIEW DRILL", "ENTRAÎNEMENT ENTRETIEN")}</span>
                <h2>{isFrench ? interview.question.fr : interview.question.en}</h2>
              </div>
              <span className="pill accent">{trackBadge(interviewTrack)}</span>
            </div>

            <p>
              {targetRole
                ? text(
                    `Based on your saved target role: ${targetRole}.`,
                    `Basé sur ton métier cible enregistré : ${targetRole}.`,
                  )
                : text(
                    "Choose a target role in Careers to personalize this drill.",
                    "Choisis un métier cible dans Careers pour personnaliser cet entraînement.",
                  )}
            </p>

            <div className="answer-framework">
              {interview.framework.slice(0, 3).map((step, index) => (
                <div key={step.en}>
                  <span>{index + 1}</span>
                  <p><strong>{isFrench ? step.fr : step.en}</strong></p>
                </div>
              ))}
            </div>

            <Link className="full-button" href="/interview">
              {text("Start interview practice", "Commencer l’entraînement entretien")} →
            </Link>
          </article>

          <article className="card span-12 markets-card">
            <div className="card-head markets-head">
              <div>
                <span className="eyebrow">{text("MARKET MAP", "CARTE DES MARCHÉS / MARKET MAP")}</span>
                <h2>{text("Connected market snapshot", "Snapshot de marché connecté")}</h2>
              </div>
              <div className="feed-status">
                <span className="status-dot" />
                {liveProviders.length
                  ? text(
                      `${liveProviders.length} live provider${liveProviders.length > 1 ? "s" : ""}`,
                      `${liveProviders.length} source${liveProviders.length > 1 ? "s" : ""} active${liveProviders.length > 1 ? "s" : ""}`,
                    )
                  : text("No live provider", "Aucune source live")}
              </div>
            </div>

            {groupedMarkets.length ? (
              <div className="market-grid">
                {groupedMarkets.map(([category, quotes]) => (
                  <div className="market-group" key={category}>
                    <h3>{category}</h3>
                    {quotes.map((quote) => (
                      <div className="market-row" key={quote.id}>
                        <span>{quote.label}</span>
                        <em>
                          {formatMarketValue(quote)}
                          {quote.changePercent !== null
                            ? ` · ${quote.changePercent > 0 ? "+" : ""}${quote.changePercent.toFixed(2)}%`
                            : ""}
                        </em>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p className="data-note">
                {text(
                  "No connected market observation is available right now. FinanceStudio does not substitute invented values.",
                  "Aucune observation de marché connectée n’est disponible pour le moment. FinanceStudio ne la remplace pas par des valeurs inventées.",
                )}
              </p>
            )}

            <p className="data-note">
              {marketData?.quotes.length
                ? text(
                    `Latest provider observations · ${marketData.quotes[0]?.source ?? ""} · as of ${marketData.quotes[0]?.asOf ?? ""}`,
                    `Dernières observations fournisseur · ${marketData.quotes[0]?.source ?? ""} · au ${marketData.quotes[0]?.asOf ?? ""}`,
                  )
                : text(
                    "Open Markets for provider status and coverage.",
                    "Ouvre Marchés pour voir l’état et la couverture des fournisseurs.",
                  )}
            </p>
            <Link href="/markets">{text("Open Markets", "Ouvrir Marchés")} →</Link>
          </article>

          <article className="card span-4 learning-card">
            <div className="card-head">
              <div>
                <span className="eyebrow">{text("YOUR FINANCE PATH", "TON PARCOURS FINANCE")}</span>
                <h2>
                  {nextModule
                    ? (isFrench ? `${nextModule.year.replace("Year", "Année")} · ${nextModule.titleFr}` : `${nextModule.year} · ${nextModule.title}`)
                    : text("48/48 · Curriculum complete", "48/48 · Programme terminé")}
                </h2>
              </div>
              <span className="pill">{progressPercent}%</span>
            </div>

            <div className="course-progress"><span style={{ width: `${progressPercent}%` }} /></div>

            <div className="lesson-list">
              {learningPreview.map((module, index) => {
                const complete = completedSet.has(module.slug);
                return (
                  <div key={module.slug}>
                    <span className="lesson-index">{String(index + 1).padStart(2, "0")}</span>
                    <p>
                      <strong>{isFrench ? module.titleFr : module.title}</strong>
                      <small>
                        {complete
                          ? text("Completed", "Terminé")
                          : index === 0
                            ? text("Next lesson", "Prochain cours")
                            : text("Up next", "À suivre")}
                      </small>
                    </p>
                  </div>
                );
              })}
            </div>

            <Link href="/university">{text("View curriculum", "Voir le programme")} →</Link>
          </article>

          <article className="card span-4 news-card">
            <div className="card-head">
              <div>
                <span className="eyebrow">{text("FINANCE INTELLIGENCE", "INTELLIGENCE FINANCIÈRE")}</span>
                <h2>{text("News should teach, not just notify.", "L’actualité doit enseigner, pas seulement informer.")}</h2>
              </div>
            </div>

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
            <h2>{text("Adaptive tutoring from the 48-course curriculum", "Tutorat adaptatif à partir des 48 cours")}</h2>
            <p>{text(
              "Choose a lesson, ask a question and change the teaching method without losing the underlying finance knowledge. Signed-in sessions can be resumed later.",
              "Choisis un cours, pose une question et change la méthode pédagogique sans perdre les connaissances financières sous-jacentes. Les sessions connectées peuvent être reprises plus tard.",
            )}</p>
            <div className="professor-options">
              <span>{text("Explain simply", "Expliquer simplement")}</span>
              <span>{text("Use numbers", "Utiliser des chiffres")}</span>
              <span>{text("Formula", "Formule")}</span>
              <span>{text("Interview mode", "Mode entretien")}</span>
            </div>
            <Link className="full-button inverse" href="/professor">
              {text("Open AI Professor", "Ouvrir le Professeur IA")} →
            </Link>
          </article>
        </section>
      </section>
    </main>
  );
}
