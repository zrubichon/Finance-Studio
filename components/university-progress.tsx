"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { curriculumYears, domainLabelsFr, moduleSlug } from "@/lib/curriculum";
import { hasLessonContent } from "@/lib/lesson-registry";
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);
      const { data, error } = await supabase
        .from("course_progress")
        .select("lesson_slug,status,progress_percent")
        .eq("user_id", user.id);

      if (!active) return;

      if (error) {
        setMessage(text(
          "We could not load your saved progress yet.",
          "Nous n’avons pas pu charger ta progression enregistrée pour le moment.",
        ));
      } else {
        const rows = (data ?? []) as ProgressRow[];
        setProgress(Object.fromEntries(rows.map((row) => [row.lesson_slug, row])));
      }
      setLoading(false);
    }

    void load();
    return () => { active = false; };
  }, [text]);

  const completed = useMemo(
    () => Object.entries(progress).filter(
      ([slug, item]) => item.status === "completed" && hasLessonContent(slug),
    ).length,
    [progress],
  );
  const total = curriculumYears.reduce((sum, year) => sum + year.modules.length, 0);

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
          {loading ? (
            <h2>{text("Loading your learning record…", "Chargement de ta progression…")}</h2>
          ) : userId ? (
            <>
              <h2>{isFrench ? `${completed} modules terminés sur ${total}` : `${completed} of ${total} curriculum modules completed`}</h2>
              <p>{text(
                "Completion now comes from real lessons and mastery checks, not manual checkboxes.",
                "La complétion vient maintenant des vrais cours et tests de maîtrise, pas de cases cochées manuellement.",
              )}</p>
            </>
          ) : (
            <>
              <h2>{text(
                "Sign in to save your progress across devices.",
                "Connecte-toi pour sauvegarder ta progression sur tous tes appareils.",
              )}</h2>
              <p>{text(
                "You can study as a guest, but quiz scores and completion require sign-in to persist.",
                "Tu peux étudier en invité, mais les scores et la complétion nécessitent une connexion pour être enregistrés.",
              )}</p>
            </>
          )}
        </div>
        {!loading && !userId && (
          <Link className="full-button" href="/login">{text("Sign in", "Se connecter")} →</Link>
        )}
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
                const percent = progress[slug]?.progress_percent ?? 0;
                const available = hasLessonContent(slug);

                return (
                  <div
                    className={`module-item module-item-${status} ${available ? "module-item-available" : ""}`}
                    key={module.title}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <div className="module-item-copy">
                      <strong>{isFrench ? module.titleFr : module.title}</strong>
                      <small>{isFrench ? domainLabelsFr[module.domain] : module.domain}</small>
                      {available && status === "in_progress" && (
                        <div className="module-mini-progress">
                          <span style={{ width: `${percent}%` }} />
                        </div>
                      )}
                    </div>

                    {available ? (
                      <Link className="module-status-button module-open-link" href={`/university/${slug}`}>
                        {status === "completed"
                          ? text("Review ✓", "Revoir ✓")
                          : status === "in_progress"
                            ? text(`Continue · ${percent}%`, `Continuer · ${percent}%`)
                            : text("Open course", "Ouvrir le cours")}
                      </Link>
                    ) : (
                      <span className="module-build-label">{text("In build", "En construction")}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="learning-loop-panel">
        <div>
          <span className="mini-label">{text("HOW A LESSON WORKS", "COMMENT FONCTIONNE UN COURS")}</span>
          <h2>{text(
            "Core facts → adaptive explanation → example → market link → vocabulary → quiz",
            "Faits essentiels → explication adaptée → exemple → lien marché → vocabulaire → quiz",
          )}</h2>
        </div>
        <div className="learning-loop-steps">
          <span>1. {text("Understand", "Comprendre")}</span>
          <span>2. {text("Visualize", "Visualiser")}</span>
          <span>3. {text("Apply", "Appliquer")}</span>
          <span>4. {text("Connect to markets", "Relier aux marchés")}</span>
          <span>5. {text("Interview transfer", "Transfert entretien")}</span>
          <span>6. Quiz</span>
          <span>7. {text("Review weak concepts", "Revoir les concepts faibles")}</span>
        </div>
      </section>
    </div>
  );
}
