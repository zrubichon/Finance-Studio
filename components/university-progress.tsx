"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { curriculumYears, domainLabelsFr, moduleSlug } from "@/lib/curriculum";
import { recordDailyActivity } from "@/lib/record-activity";
import { useLanguage } from "@/components/language-provider";

type ProgressStatus = "not_started" | "in_progress" | "completed";
type ProgressRow = { lesson_slug: string; status: ProgressStatus; progress_percent: number };

const modes = [
  {
    mode: "Beginner",
    frMode: "Débutant",
    en: "Same knowledge, but with slower explanations, analogies, diagrams, numerical examples and every technical word defined.",
    fr: "Le même savoir, mais avec des explications plus lentes, des analogies, des schémas, des exemples chiffrés et chaque terme technique défini en français / English.",
  },
  {
    mode: "Intermediate",
    frMode: "Intermédiaire",
    en: "Same syllabus with tighter explanations, formulas, market links and less repetition of basic definitions.",
    fr: "Le même programme avec des explications plus condensées, des formules, des liens avec les marchés et moins de répétition des définitions de base.",
  },
  {
    mode: "Professional",
    frMode: "Professionnel",
    en: "Same concepts expressed with desk-level vocabulary, assumptions, edge cases, interview framing and cross-asset implications.",
    fr: "Les mêmes concepts avec le vocabulaire utilisé en desk, les hypothèses / assumptions, les cas limites / edge cases, la formulation entretien / interview framing et les implications multi-actifs / cross-asset.",
  },
];

export default function UniversityProgress() {
  const { isFrench, text } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, ProgressRow>>({});
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) { setLoading(false); return; }
      setUserId(user.id);
      const { data, error } = await supabase.from("course_progress").select("lesson_slug,status,progress_percent").eq("user_id", user.id);
      if (!active) return;
      if (error) setMessage(text("We could not load your saved progress yet.", "Nous n’avons pas pu charger ta progression enregistrée pour le moment."));
      else {
        const rows = (data ?? []) as ProgressRow[];
        setProgress(Object.fromEntries(rows.map((row) => [row.lesson_slug, row])));
      }
      setLoading(false);
    }
    load();
    return () => { active = false; };
  }, [text]);

  const completed = useMemo(() => Object.values(progress).filter((item) => item.status === "completed").length, [progress]);
  const total = curriculumYears.reduce((sum, year) => sum + year.modules.length, 0);

  async function setLessonStatus(slug: string, status: ProgressStatus) {
    if (!userId) return;
    setBusySlug(slug);
    setMessage("");
    const supabase = createClient();
    const nextPercent = status === "completed" ? 100 : 0;
    const now = new Date().toISOString();
    const { error } = await supabase.from("course_progress").upsert({
      user_id: userId,
      lesson_slug: slug,
      status,
      progress_percent: nextPercent,
      last_opened_at: now,
      completed_at: status === "completed" ? now : null,
      updated_at: now,
    }, { onConflict: "user_id,lesson_slug" });

    if (error) setMessage(text("Progress was not saved. Please try again.", "La progression n’a pas été enregistrée. Réessaie."));
    else {
      setProgress((current) => ({ ...current, [slug]: { lesson_slug: slug, status, progress_percent: nextPercent } }));
      await recordDailyActivity(userId);
      setMessage(status === "completed" ? text("Lesson marked complete.", "Cours marqué comme terminé.") : text("Lesson added to your active learning list.", "Cours ajouté à ta liste d’apprentissage active."));
    }
    setBusySlug(null);
  }

  return (
    <div className="workspace-stack">
      <section className="mode-principle-grid">
        {modes.map((item) => (
          <article className="mode-principle-card" key={item.mode}>
            <span className="mini-label">{(isFrench ? item.frMode : item.mode).toUpperCase()}</span>
            <h2>{isFrench ? `${item.frMode} — mode d’explication` : `${item.mode} explanation`}</h2>
            <p>{isFrench ? item.fr : item.en}</p>
          </article>
        ))}
      </section>

      <section className="learning-account-strip">
        <div>
          <span className="mini-label">{text("ACCOUNT PROGRESS", "PROGRESSION DU COMPTE")}</span>
          {loading ? <h2>{text("Loading your learning record…", "Chargement de ta progression…")}</h2> : userId ? (
            <><h2>{isFrench ? `${completed} modules terminés sur ${total}` : `${completed} of ${total} curriculum modules completed`}</h2><p>{text("Your status is saved to your FinanceStudio account.", "Ton statut est maintenant enregistré dans ton compte FinanceStudio.")}</p></>
          ) : (
            <><h2>{text("Sign in to save your progress across devices.", "Connecte-toi pour sauvegarder ta progression sur tous tes appareils.")}</h2><p>{text("You can explore the curriculum without an account, but completion tracking requires sign-in.", "Tu peux explorer le programme sans compte, mais le suivi des cours terminés nécessite une connexion.")}</p></>
          )}
        </div>
        {!loading && !userId && <Link className="full-button" href="/login">{text("Sign in", "Se connecter")} →</Link>}
      </section>

      {message && <p className="inline-status" role="status">{message}</p>}

      <section className="curriculum-stack">
        {curriculumYears.map((item, yearIndex) => (
          <article className="curriculum-year" key={item.year}>
            <div className="curriculum-year-head">
              <div className="year-number">0{yearIndex + 1}</div>
              <div>
                <span className="mini-label">{isFrench ? item.yearFr : item.year}</span>
                <h2>{isFrench ? item.nameFr : item.name}</h2>
                <p>{isFrench ? item.outcomeFr : item.outcome}</p>
              </div>
            </div>
            <div className="module-grid">
              {item.modules.map((module, index) => {
                const slug = moduleSlug(item.year, module.title);
                const status = progress[slug]?.status ?? "not_started";
                return (
                  <div className={`module-item module-item-${status}`} key={module.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div className="module-item-copy">
                      <strong>{isFrench ? module.titleFr : module.title}</strong>
                      <small>{isFrench ? domainLabelsFr[module.domain] : module.domain}</small>
                    </div>
                    {userId && (status === "completed" ? (
                      <button className="module-status-button completed" type="button" disabled>{text("Completed ✓", "Terminé ✓")}</button>
                    ) : (
                      <button className="module-status-button" type="button" disabled={busySlug === slug} onClick={() => setLessonStatus(slug, status === "in_progress" ? "completed" : "in_progress")}>
                        {busySlug === slug ? text("Saving…", "Enregistrement…") : status === "in_progress" ? text("Mark complete", "Marquer terminé") : text("Start", "Commencer")}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="learning-loop-panel">
        <div><span className="mini-label">{text("HOW A LESSON WORKS", "COMMENT FONCTIONNE UN COURS")}</span><h2>{text("Concept → intuition → math → market → interview → recall", "Concept → intuition → calcul → marché → entretien → rappel actif / recall")}</h2></div>
        <div className="learning-loop-steps">
          <span>1. {text("Explain", "Expliquer")}</span><span>2. {text("Visualize", "Visualiser")}</span><span>3. {text("Calculate", "Calculer")}</span><span>4. {text("Apply", "Appliquer")}</span><span>5. {text("Interview", "Entretien")}</span><span>6. Quiz</span><span>7. {text("Revisit weak points", "Revoir les points faibles")}</span>
        </div>
      </section>
    </div>
  );
}
