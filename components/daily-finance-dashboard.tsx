"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { allCurriculumModules } from "@/lib/curriculum";
import { createClient } from "@/lib/supabase/client";

type ProgressRow = { lesson_slug: string; status: string; progress_percent: number };
type MasteryRow = { concept_key: string; mastery_score: number };
type RecentActivity = { label: string; kind: string; at: number };

type DailyConcept = { en: string; fr: string; lesson: string; dictionary: string };
const dailyConcepts: DailyConcept[] = [
  { en: "WACC (Weighted Average Cost of Capital)", fr: "WACC (coût moyen pondéré du capital)", lesson: "year-3-dcf-valuation", dictionary: "WACC" },
  { en: "EV (Enterprise Value) vs Equity Value", fr: "EV (Enterprise Value) vs Equity Value", lesson: "year-1-company-valuation-basics", dictionary: "Enterprise Value" },
  { en: "Duration: why bond prices move when yields move", fr: "Duration : pourquoi les obligations bougent avec les yields", lesson: "year-2-duration-convexity", dictionary: "Duration" },
  { en: "Yield curve: what 2s10s tells you", fr: "Yield curve : ce que le 2s10s te dit", lesson: "year-2-yield-curve", dictionary: "yield curve" },
  { en: "Implied upside and target prices", fr: "Upside implicite et target prices", lesson: "year-1-stocks-bonds-etfs-funds", dictionary: "implied upside" },
  { en: "Revenue growth: reading the real driver", fr: "Revenue growth : lire le vrai moteur", lesson: "year-2-financial-statement-analysis", dictionary: "revenue growth" },
  { en: "P/E (Price-to-Earnings ratio) vs EV / EBITDA", fr: "P/E vs EV / EBITDA", lesson: "year-3-equity-research", dictionary: "P/E" },
  { en: "Portfolio return: weighted averages", fr: "Rendement de portefeuille : moyenne pondérée", lesson: "year-1-portfolio-basics", dictionary: "portfolio return" },
];

function safeReadJson<T>(key: string, fallback: T): T {
  try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
}
function safeWrite(key: string, value: unknown) { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* optional */ } }
function dayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function conceptOfDay() {
  const key = dayKey();
  const seed = [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return dailyConcepts[seed % dailyConcepts.length];
}

export default function DailyFinanceDashboard() {
  const { text, isFrench } = useLanguage();
  const modules = useMemo(() => allCurriculumModules(), []);
  const todayConcept = useMemo(() => conceptOfDay(), []);
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [mastery, setMastery] = useState<MasteryRow[]>([]);
  const [targetRole, setTargetRole] = useState("Investment Banking");
  const [recent, setRecent] = useState<RecentActivity[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    const today = dayKey();
    const history = safeReadJson<string[]>("finance-studio-daily-challenge-history", []);
    setDone(Array.isArray(history) && history.includes(today));
    setRecent(safeReadJson<RecentActivity[]>("finance-studio-recent-activity", []));
    void (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !active) return;
        const [profile, p, m] = await Promise.all([
          supabase.from("profiles").select("target_role").eq("user_id", user.id).maybeSingle(),
          supabase.from("course_progress").select("lesson_slug,status,progress_percent").eq("user_id", user.id),
          supabase.from("concept_mastery").select("concept_key,mastery_score").eq("user_id", user.id),
        ]);
        if (!active) return;
        setProgress((p.data ?? []) as ProgressRow[]); setMastery((m.data ?? []) as MasteryRow[]);
        if (profile.data?.target_role) setTargetRole(profile.data.target_role);
      } catch { /* remains usable offline */ }
    })();
    return () => { active = false; };
  }, []);

  const completed = useMemo(() => new Set(progress.filter(r => r.status === "completed").map(r => r.lesson_slug)), [progress]);
  const next = modules.find(m => !completed.has(m.slug)) ?? modules[0];
  const weak = [...mastery].filter(m => Number(m.mastery_score) < 75).sort((a,b)=>Number(a.mastery_score)-Number(b.mastery_score))[0];
  const latest = recent[0];
  const challengeHref = `/challenge?${new URLSearchParams({ lesson: todayConcept.lesson, role: targetRole, concept: todayConcept.en }).toString()}`;
  const dictionaryHref = `/dictionary?${new URLSearchParams({ q: todayConcept.dictionary, term: todayConcept.dictionary }).toString()}#dictionary-results`;
  const interviewHref = `/interview?${new URLSearchParams({ track: targetRole, concept: todayConcept.en, lesson: todayConcept.lesson, source: "daily-challenge" }).toString()}`;
  const investingHref = `/investing?${new URLSearchParams({ source: "daily-challenge", concept: todayConcept.en, lesson: todayConcept.lesson, thesis: `Build a testable investment thesis using ${todayConcept.en}. Explain the mechanism, catalyst, valuation or market link, risks, invalidation test and what data to monitor.` }).toString()}`;
  const professorHref = `/professor?${new URLSearchParams({ lesson: todayConcept.lesson, source: "daily-challenge", question: `Teach me ${todayConcept.en} from first principles to interview and investing depth, with formulas, easy and harder examples, impacts and a verification question.` }).toString()}`;

  const recommendation = latest?.kind === "lesson"
    ? { title: text("Test what you just learned", "Teste ce que tu viens d’apprendre"), copy: text("Turn the lesson into an interview-style explanation.", "Transforme le cours en réponse type entretien."), href: interviewHref }
    : latest?.kind === "news"
      ? { title: text("Connect news to a finance concept", "Relie la news à un concept financier"), copy: text("Explain the transmission mechanism, then test yourself.", "Explique le mécanisme de transmission puis teste-toi."), href: professorHref }
      : { title: text("Complete today's learning loop", "Complète la boucle d’apprentissage du jour"), copy: text("Concept, calculation, interview and investing — in one guided flow.", "Concept, calcul, entretien et investing dans un seul parcours guidé."), href: challengeHref };

  function completeChallenge() {
    const key = dayKey(); const history = safeReadJson<string[]>("finance-studio-daily-challenge-history", []);
    safeWrite("finance-studio-daily-challenge-history", Array.from(new Set([...(Array.isArray(history) ? history : []), key]))); setDone(true);
  }

  return (
    <section className="workspace-stack daily-dashboard-stack">
      <section className="news-blueprint-panel smart-daily-panel">
        <div className="panel-heading"><div><span className="mini-label">{text("SMART DAILY BRIEF · SESSION AWARE", "SMART DAILY BRIEF · ADAPTÉ À TA SESSION")}</span><h2>{text("What should you learn, review and practice today?", "Que dois-tu apprendre, revoir et pratiquer aujourd’hui ?")}</h2></div><span className="connection-badge"><span className="status-dot" /> {text("Safe local recovery", "Récupération locale sécurisée")}</span></div>
        <article className="session-next-action"><div><span className="mini-label">{text("NEXT BEST ACTION", "MEILLEURE PROCHAINE ACTION")}</span><h3>{recommendation.title}</h3><p>{recommendation.copy}</p>{latest?.label && <small>{text("Last activity:", "Dernière activité :")} {latest.label}</small>}</div><Link className="full-button" href={recommendation.href}>{text("Continue", "Continuer")} →</Link></article>
        <div className="analysis-grid">
          <article className="analysis-card"><span className="mini-label">{text("CONTINUE LEARNING", "CONTINUER À APPRENDRE")}</span><h3>{next ? (isFrench ? next.titleFr : next.title) : text("Finance University", "Université de Finance")}</h3><p>{text("Your next incomplete lesson is ready.", "Ton prochain cours non terminé est prêt.")}</p><Link href={next ? `/university/${next.slug}` : "/university"}>{text("Open lesson", "Ouvrir le cours")} →</Link></article>
          <article className="analysis-card"><span className="mini-label">{text("WEAK CONCEPT REVIEW", "CONCEPT À REVOIR")}</span><h3>{weak ? weak.concept_key.replace(/-/g," ") : text("No weak concept detected yet", "Aucun concept faible détecté")}</h3><p>{weak ? text(`${weak.mastery_score}% mastery`, `${weak.mastery_score} % de maîtrise`) : text("Complete quizzes to personalize this card.", "Fais des quiz pour personnaliser cette carte.")}</p><Link href="/professor">{text("Review with AI Professor", "Revoir avec le professeur IA")} →</Link></article>
        </div>
      </section>

      <section className="news-blueprint-panel daily-challenge-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("DAILY FINANCE CHALLENGE", "CHALLENGE FINANCE DU JOUR")}</span>
            <h2>{text("One guided loop · 5–10 minutes", "Une boucle guidée · 5–10 minutes")}</h2>
            <h3 className="daily-concept-title">{isFrench ? todayConcept.fr : todayConcept.en}</h3>
            <p className="daily-concept-subtitle">{text("Today's concept — see it before you decide to open the full challenge.", "Concept du jour — vois immédiatement le sujet avant d’ouvrir le challenge complet.")}</p>
          </div>
          <span className="pill">{done ? text("Completed", "Terminé") : text("Ready", "Prêt")}</span>
        </div>
        <div className="loop-action-grid">
          <Link href={challengeHref}>{text("Open guided challenge", "Ouvrir le challenge guidé")}</Link>
          <Link href={dictionaryHref}>{text("Open this exact concept", "Ouvrir ce concept précis")}</Link>
          <Link href={interviewHref}>{text("Interview drill on this concept", "Entretien sur ce concept")}</Link>
          <Link href={investingHref}>{text("Build a thesis from this concept", "Construire une thèse avec ce concept")}</Link>
          <Link href={professorHref}>{text("Ask AI for help", "Demander à l’IA")}</Link>
        </div>
        <label className="challenge-check-row"><input type="checkbox" checked={done} onChange={completeChallenge} /> <span>{text("Mark today's loop complete", "Marquer la boucle du jour comme terminée")}</span></label>
      </section>
    </section>
  );
}
