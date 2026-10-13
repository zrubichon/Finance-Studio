"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { allCurriculumModules } from "@/lib/curriculum";
import { recommendLesson, professorHref } from "@/lib/learning-bridge";
import { createClient } from "@/lib/supabase/client";

type NewsItem = {
  id: string;
  title: string;
  topics: string[];
  insight: {
    lens: { en: string; fr: string };
    whyItMatters: { en: string; fr: string };
    assets: string[];
  };
};

type NewsPayload = { items?: NewsItem[] };
type ProgressRow = { lesson_slug: string; status: string; progress_percent: number };
type MasteryRow = { concept_key: string; mastery_score: number; attempts: number };

function localDayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function previousDayKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);
  return localDayKey(date);
}

function streakFromHistory(history: string[]) {
  const days = new Set(history);
  let cursor = localDayKey();
  if (!days.has(cursor)) cursor = previousDayKey(cursor);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = previousDayKey(cursor);
  }
  return streak;
}

function calculationForSeed(seed: number) {
  const variants = [
    {
      en: "A bond has duration 5. If yield rises by 40 bps, estimate the first-order price move.",
      fr: "Une obligation a une duration de 5. Si le yield monte de 40 bps, estime le mouvement de prix au premier ordre.",
      answer: "≈ -2.0%",
      lesson: "year-2-duration-convexity",
    },
    {
      en: "Revenue is $500m and grows 12%. What is next year's revenue before any other adjustment?",
      fr: "Le chiffre d’affaires est de 500 M$ et croît de 12 %. Quel est le chiffre d’affaires de l’an prochain avant autre ajustement ?",
      answer: "$560m",
      lesson: "year-3-equity-research",
    },
    {
      en: "A stock trades at $80 with a $100 target price. What is the implied upside?",
      fr: "Une action cote 80 $ avec un target price de 100 $. Quel est l’upside implicite ?",
      answer: "25%",
      lesson: "year-3-equity-research",
    },
    {
      en: "A portfolio is 60% equities returning 8% and 40% bonds returning 3%. What is the portfolio return?",
      fr: "Un portefeuille est composé à 60 % d’actions rapportant 8 % et 40 % d’obligations rapportant 3 %. Quel est son rendement ?",
      answer: "6%",
      lesson: "year-3-asset-management",
    },
  ];
  return variants[seed % variants.length];
}

export default function DailyFinanceDashboard() {
  const { isFrench, text } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [mastery, setMastery] = useState<MasteryRow[]>([]);
  const [targetRole, setTargetRole] = useState("Investment Banking");
  const [history, setHistory] = useState<string[]>([]);
  const [challengeDone, setChallengeDone] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const modules = useMemo(() => allCurriculumModules(), []);
  const dateKey = localDayKey();
  const daySeed = [...dateKey].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const calculation = calculationForSeed(daySeed);

  useEffect(() => {
    let active = true;

    async function load() {
      const stored = JSON.parse(window.localStorage.getItem("finance-studio-daily-challenge-history") || "[]") as string[];
      if (active) {
        setHistory(Array.isArray(stored) ? stored : []);
        setChallengeDone(Array.isArray(stored) && stored.includes(dateKey));
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const newsPromise = fetch("/api/news?category=all", { cache: "no-store" })
        .then((response) => response.ok ? response.json() as Promise<NewsPayload> : null)
        .catch(() => null);

      if (!user) {
        const newsPayload = await newsPromise;
        if (active) setNews(newsPayload?.items?.slice(0, 5) ?? []);
        return;
      }

      const [newsPayload, profileResult, progressResult, masteryResult] = await Promise.all([
        newsPromise,
        supabase.from("profiles").select("target_role").eq("user_id", user.id).maybeSingle(),
        supabase.from("course_progress").select("lesson_slug,status,progress_percent").eq("user_id", user.id),
        supabase.from("concept_mastery").select("concept_key,mastery_score,attempts").eq("user_id", user.id),
      ]);

      if (!active) return;
      setNews(newsPayload?.items?.slice(0, 5) ?? []);
      setProgress((progressResult.data ?? []) as ProgressRow[]);
      setMastery((masteryResult.data ?? []) as MasteryRow[]);
      if (profileResult.data?.target_role) setTargetRole(profileResult.data.target_role);
    }

    void load();
    return () => { active = false; };
  }, [dateKey]);

  const completed = useMemo(
    () => new Set(progress.filter((row) => row.status === "completed").map((row) => row.lesson_slug)),
    [progress],
  );
  const inProgress = progress
    .filter((row) => row.status === "in_progress")
    .sort((a, b) => Number(b.progress_percent) - Number(a.progress_percent))[0];
  const nextModule = modules.find((module) => module.slug === inProgress?.lesson_slug)
    ?? modules.find((module) => !completed.has(module.slug))
    ?? modules[modules.length - 1];

  const weakConcepts = useMemo(
    () => mastery
      .filter((row) => Number(row.mastery_score) < 75)
      .sort((a, b) => Number(a.mastery_score) - Number(b.mastery_score))
      .slice(0, 3),
    [mastery],
  );

  const featuredNews = news.slice(0, 3);
  const challengeNews = news[daySeed % Math.max(1, news.length)] ?? null;
  const challengeRecommendation = challengeNews
    ? recommendLesson({ title: challengeNews.title, topics: challengeNews.topics, assets: challengeNews.insight.assets })
    : null;
  const challengeLesson = challengeRecommendation?.slug ?? nextModule?.slug ?? calculation.lesson;
  const interviewQuestion = challengeNews
    ? `What is the most important market transmission mechanism in this story, what may already be priced in, and what would you watch next? Story: ${challengeNews.title}`
    : "Explain one major market driver today, the transmission mechanism, what could invalidate your view and which assets you would watch.";
  const interviewHref = `/interview?${new URLSearchParams({
    track: targetRole,
    question: interviewQuestion,
    lesson: challengeLesson,
    source: "daily-challenge",
  }).toString()}`;
  const investingHref = `/investing?${new URLSearchParams({
    source: "daily-challenge",
    lesson: challengeLesson,
    catalyst: challengeNews?.title ?? "Daily Finance Challenge",
    thesis: challengeNews
      ? `Build a testable investment thesis from this catalyst: ${challengeNews.title}`
      : "Build a testable thesis from today's market driver.",
  }).toString()}`;

  function completeChallenge() {
    const next = Array.from(new Set([...history, dateKey])).sort();
    window.localStorage.setItem("finance-studio-daily-challenge-history", JSON.stringify(next));
    setHistory(next);
    setChallengeDone(true);
  }

  return (
    <section className="workspace-stack" style={{ marginBottom: "1.5rem" }}>
      <section className="news-blueprint-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("TODAY · SMART DAILY BRIEF", "AUJOURD’HUI · SMART DAILY BRIEF")}</span>
            <h2>{text("What should you learn, review and practice today?", "Que dois-tu apprendre, revoir et pratiquer aujourd’hui ?")}</h2>
          </div>
          <span className="connection-badge"><span className="status-dot" /> {text("Live learning loop", "Learning loop active")}</span>
        </div>

        <div className="analysis-grid">
          <article className="analysis-card">
            <span className="mini-label">{text("CONTINUE LEARNING", "CONTINUER À APPRENDRE")}</span>
            <h3>{nextModule ? (isFrench ? nextModule.titleFr : nextModule.title) : text("Finance University", "Université de Finance")}</h3>
            <p>{inProgress ? text(`${inProgress.progress_percent}% complete · resume where you stopped.`, `${inProgress.progress_percent} % terminé · reprends là où tu t’es arrêtée.`) : text("Your next incomplete module is ready.", "Ton prochain module non terminé est prêt.")}</p>
            {nextModule && <Link href={`/university/${nextModule.slug}`}>{text("Continue lesson", "Continuer le cours")} →</Link>}
          </article>

          <article className="analysis-card">
            <span className="mini-label">{text("WEAK CONCEPT REVIEW", "CONCEPTS À REVOIR")}</span>
            <h3>{weakConcepts.length ? weakConcepts[0].concept_key.replace(/-/g, " ") : text("No weak concept detected yet", "Aucun concept faible détecté pour le moment")}</h3>
            <p>{weakConcepts.length ? text(`${weakConcepts[0].mastery_score}% mastery · prioritize this before adding complexity.`, `${weakConcepts[0].mastery_score} % de maîtrise · revois-le avant d’ajouter de la complexité.`) : text("Complete quizzes and FinanceStudio will identify what to review.", "Fais les quiz et FinanceStudio identifiera automatiquement ce qu’il faut revoir.")}</p>
            <Link href={professorHref({ lessonSlug: nextModule?.slug ?? calculation.lesson, question: weakConcepts.length ? `Help me fix my weak concept: ${weakConcepts[0].concept_key}. Diagnose likely mistakes, reteach it and test me.` : "Give me a diagnostic finance question, identify my weak point, then teach it.", source: "lesson" })}>{text("Review with AI Professor", "Revoir avec AI Professor")} →</Link>
          </article>

          <article className="analysis-card">
            <span className="mini-label">{text("INTERVIEW QUESTION", "QUESTION D’ENTRETIEN")}</span>
            <h3>{targetRole}</h3>
            <p>{interviewQuestion}</p>
            <Link href={interviewHref}>{text("Practice this question", "S’entraîner sur cette question")} →</Link>
          </article>
        </div>

        {featuredNews.length ? (
          <div className="news-analysis-grid">
            {featuredNews.map((item, index) => {
              const recommendation = recommendLesson({ title: item.title, topics: item.topics, assets: item.insight.assets });
              return (
                <article className="news-analysis-step" key={item.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{isFrench ? item.insight.whyItMatters.fr : item.insight.whyItMatters.en}</p>
                    <small>{text("Learn:", "Cours lié :")} {isFrench ? recommendation.titleFr : recommendation.titleEn}</small>
                    <div className="chip-row" style={{ marginTop: ".65rem" }}>
                      <Link className="chip" href={`/university/${recommendation.slug}`}>{text("Learn concept", "Apprendre le concept")}</Link>
                      <Link className="chip" href={professorHref({ lessonSlug: recommendation.slug, question: `Explain the finance mechanism behind this current headline, separate fact from interpretation, explain what may already be priced in and what to watch next: ${item.title}`, source: "news" })}>{text("Ask Professor", "Demander au Professeur")}</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </section>

      <section className="professor-demo-panel">
        <div className="professor-demo-question">
          <span className="mini-label">{text("DAILY FINANCE CHALLENGE · 5–10 MIN", "DAILY FINANCE CHALLENGE · 5–10 MIN")}</span>
          <h2>{challengeDone ? text("Completed today ✓", "Terminé aujourd’hui ✓") : text("News → concept → calculation → interview → investing", "News → concept → calcul → entretien → investing")}</h2>
          <p>{text("Current streak", "Streak actuel")}: <strong>{streakFromHistory(history)} {text("day(s)", "jour(s)")}</strong></p>
          {challengeNews && <p><strong>{text("1 · News:", "1 · News :")}</strong> {challengeNews.title}</p>}
          <p><strong>{text("2 · Concept:", "2 · Concept :")}</strong> {challengeRecommendation ? (isFrench ? challengeRecommendation.titleFr : challengeRecommendation.titleEn) : (isFrench ? nextModule?.titleFr : nextModule?.title)}</p>
          <p><strong>{text("3 · Calculation:", "3 · Calcul :")}</strong> {isFrench ? calculation.fr : calculation.en}</p>
          {showAnswer && <p className="inline-status">{text("Answer", "Réponse")}: {calculation.answer}</p>}
        </div>

        <div className="professor-response-card">
          <span className="mini-label">{text("COMPLETE THE LOOP", "TERMINER LA BOUCLE")}</span>
          <div className="chip-row">
            <button type="button" className="chip" onClick={() => setShowAnswer((value) => !value)}>{showAnswer ? text("Hide calculation", "Masquer la réponse") : text("Check calculation", "Vérifier le calcul")}</button>
            <Link className="chip" href={`/university/${challengeLesson}`}>{text("Open concept", "Ouvrir le cours")}</Link>
            <Link className="chip" href={interviewHref}>{text("Interview drill", "Question entretien")}</Link>
            <Link className="chip" href={investingHref}>{text("Build thesis", "Construire une thèse")}</Link>
          </div>
          <button className="full-button" type="button" onClick={completeChallenge} disabled={challengeDone} style={{ marginTop: "1rem" }}>
            {challengeDone ? text("Challenge completed", "Challenge terminé") : text("Mark today's challenge complete", "Marquer le challenge du jour comme terminé")}
          </button>
        </div>
      </section>
    </section>
  );
}
