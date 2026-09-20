"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";
import { recordDailyActivity } from "@/lib/record-activity";
import type { FinanceLesson, TeachingMode } from "@/lib/lesson-content";

type ProgressStatus = "not_started" | "in_progress" | "completed";
type SavedProgress = { status: ProgressStatus; progress_percent: number };
type QuizAnswers = Record<string, string>;

const modes: { id: TeachingMode; en: string; fr: string }[] = [
  { id: "Beginner", en: "Beginner", fr: "Débutant" },
  { id: "Intermediate", en: "Intermediate", fr: "Intermédiaire" },
  { id: "Professional", en: "Professional", fr: "Professionnel" },
];

function percentForSection(index: number, total: number) {
  return Math.min(85, Math.max(5, Math.round(((index + 1) / total) * 85)));
}

export default function LessonPlayer({ lesson }: { lesson: FinanceLesson }) {
  const { isFrench, text } = useLanguage();
  const [mode, setMode] = useState<TeachingMode>("Beginner");
  const [activeSection, setActiveSection] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [savedProgress, setSavedProgress] = useState<SavedProgress>({ status: "not_started", progress_percent: 0 });
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const section = lesson.sections[activeSection];
  const visibleProgress = Math.max(savedProgress.progress_percent, percentForSection(activeSection, lesson.sections.length));
  const scorePercent = lesson.quiz.length ? Math.round((quizScore / lesson.quiz.length) * 100) : 0;

  useEffect(() => {
    const stored = window.localStorage.getItem("finance-studio-level");
    if (stored === "Beginner" || stored === "Intermediate" || stored === "Professional") setMode(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("finance-studio-level", mode);
  }, [mode]);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;

      setUserId(user.id);
      const { data } = await supabase
        .from("course_progress")
        .select("status,progress_percent")
        .eq("user_id", user.id)
        .eq("lesson_slug", lesson.slug)
        .maybeSingle();

      if (!mounted) return;

      if (data) {
        setSavedProgress({
          status: data.status as ProgressStatus,
          progress_percent: Number(data.progress_percent ?? 0),
        });
      } else {
        const now = new Date().toISOString();
        const { error } = await supabase.from("course_progress").upsert({
          user_id: user.id,
          lesson_slug: lesson.slug,
          status: "in_progress",
          progress_percent: 5,
          last_opened_at: now,
          updated_at: now,
        }, { onConflict: "user_id,lesson_slug" });

        if (!error && mounted) {
          setSavedProgress({ status: "in_progress", progress_percent: 5 });
          await recordDailyActivity(user.id);
        }
      }
    }

    void initialize();
    return () => { mounted = false; };
  }, [lesson.slug]);

  async function persistReadingProgress(nextSection: number) {
    setActiveSection(nextSection);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!userId || savedProgress.status === "completed") return;

    const nextPercent = percentForSection(nextSection, lesson.sections.length);
    if (nextPercent <= savedProgress.progress_percent) return;

    const supabase = createClient();
    const now = new Date().toISOString();
    const { error } = await supabase.from("course_progress").upsert({
      user_id: userId,
      lesson_slug: lesson.slug,
      status: "in_progress",
      progress_percent: nextPercent,
      last_opened_at: now,
      updated_at: now,
    }, { onConflict: "user_id,lesson_slug" });

    if (!error) {
      setSavedProgress({ status: "in_progress", progress_percent: nextPercent });
      await recordDailyActivity(userId);
    }
  }

  const quizResults = useMemo(() => {
    if (!quizSubmitted) return [];
    return lesson.quiz.map((question) => ({
      id: question.id,
      correct: answers[question.id] === question.correctOption,
    }));
  }, [answers, lesson.quiz, quizSubmitted]);

  async function submitQuiz() {
    if (Object.keys(answers).length !== lesson.quiz.length || saving) return;

    const score = lesson.quiz.reduce(
      (sum, question) => sum + (answers[question.id] === question.correctOption ? 1 : 0),
      0,
    );

    setQuizScore(score);
    setQuizSubmitted(true);
    setStatusMessage("");
    const passed = score / lesson.quiz.length >= 0.7;

    if (!userId) {
      setStatusMessage(
        passed
          ? text("You passed. Sign in to save completion.", "Quiz réussi. Connecte-toi pour enregistrer la complétion.")
          : text("Review the explanations and try again.", "Relis les explications puis réessaie."),
      );
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const quizKey = `${lesson.slug}-quiz-v1`;

    const { error: attemptError } = await supabase.from("quiz_attempts").insert({
      user_id: userId,
      quiz_key: quizKey,
      score,
      total: lesson.quiz.length,
      answers,
    });

    const conceptKeys = [...new Set(
      lesson.quiz.map((question) => question.conceptKey),
    )];

    const { data: existingRows } = await supabase
      .from("concept_mastery")
      .select("concept_key,mastery_score,attempts")
      .eq("user_id", userId)
      .in("concept_key", conceptKeys);

    const existing = new Map(
      (existingRows ?? []).map((row) => [
        row.concept_key,
        {
          mastery_score: Number(row.mastery_score ?? 0),
          attempts: Number(row.attempts ?? 0),
        },
      ]),
    );

    const performanceByConcept = new Map<
      string,
      { correct: number; total: number }
    >();

    for (const question of lesson.quiz) {
      const current = performanceByConcept.get(question.conceptKey) ?? {
        correct: 0,
        total: 0,
      };
      current.total += 1;
      if (answers[question.id] === question.correctOption) current.correct += 1;
      performanceByConcept.set(question.conceptKey, current);
    }

    const now = new Date();
    const masteryRows = [...performanceByConcept.entries()].map(
      ([conceptKey, performance]) => {
        const previous = existing.get(conceptKey) ?? {
          mastery_score: 0,
          attempts: 0,
        };

        const attemptScore = Math.round(
          (performance.correct / performance.total) * 100,
        );

        // Recent evidence matters more than an old mistake, while prior
        // performance still provides stability across repeated reviews.
        const masteryScore =
          previous.attempts === 0
            ? attemptScore
            : Math.round(
                previous.mastery_score * 0.6 + attemptScore * 0.4,
              );

        const attempts = previous.attempts + performance.total;
        const reviewDays =
          masteryScore >= 90
            ? 30
            : masteryScore >= 80
              ? 14
              : masteryScore >= 70
                ? 7
                : masteryScore >= 50
                  ? 2
                  : 1;

        const nextReview = new Date(now);
        nextReview.setDate(nextReview.getDate() + reviewDays);

        return {
          user_id: userId,
          concept_key: conceptKey,
          mastery_score: masteryScore,
          attempts,
          last_reviewed_at: now.toISOString(),
          next_review_at: nextReview.toISOString(),
          updated_at: now.toISOString(),
        };
      },
    );

    const { error: masteryError } = await supabase
      .from("concept_mastery")
      .upsert(masteryRows, { onConflict: "user_id,concept_key" });

    const progressPercent = passed ? 100 : 90;
    const progressStatus: ProgressStatus = passed ? "completed" : "in_progress";
    const isoNow = now.toISOString();
    const { error: progressError } = await supabase.from("course_progress").upsert({
      user_id: userId,
      lesson_slug: lesson.slug,
      status: progressStatus,
      progress_percent: progressPercent,
      last_opened_at: isoNow,
      completed_at: passed ? isoNow : null,
      updated_at: isoNow,
    }, { onConflict: "user_id,lesson_slug" });

    await recordDailyActivity(userId);
    setSavedProgress({ status: progressStatus, progress_percent: progressPercent });

    if (attemptError || masteryError || progressError) {
      setStatusMessage(text(
        "Your score is visible, but part of the learning record could not be synchronized.",
        "Ton score est visible, mais une partie de la progression n’a pas pu être synchronisée.",
      ));
    } else {
      setStatusMessage(
        passed
          ? text("Lesson completed and mastery record updated.", "Cours terminé et maîtrise des concepts mise à jour.")
          : text("Attempt saved. Review weak concepts before retrying.", "Tentative enregistrée. Revois les concepts faibles avant de réessayer."),
      );
    }
    setSaving(false);
  }

  function retryQuiz() {
    setAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setStatusMessage("");
  }

  const loc = <T extends { en: string; fr: string }>(value: T) => (isFrench ? value.fr : value.en);

  return (
    <main className="lesson-shell">
      <header className="lesson-topbar">
        <Link href="/university" className="lesson-back">← {text("Finance University", "Université de Finance")}</Link>
        <div className="lesson-mode-switch" aria-label={text("Explanation mode", "Mode d’explication")}>
          {modes.map((item) => (
            <button
              type="button"
              key={item.id}
              className={mode === item.id ? "active" : ""}
              onClick={() => setMode(item.id)}
            >
              {isFrench ? item.fr : item.en}
            </button>
          ))}
        </div>
      </header>

      <section className="lesson-hero">
        <div>
          <span className="mini-label">{loc(lesson.year)} · {loc(lesson.domain)}</span>
          <h1>{loc(lesson.title)}</h1>
          <p>{loc(lesson.subtitle)}</p>
        </div>
        <div className="lesson-hero-meta">
          <div><span>{text("Estimated time", "Temps estimé")}</span><strong>{loc(lesson.duration)}</strong></div>
          <div><span>{text("Saved progress", "Progression enregistrée")}</span><strong>{userId ? `${Math.max(savedProgress.progress_percent, savedProgress.status === "completed" ? 100 : 0)}%` : text("Guest", "Invité")}</strong></div>
          <div><span>{text("Completion rule", "Règle de complétion")}</span><strong>{text("70% quiz", "70 % au quiz")}</strong></div>
        </div>
      </section>

      <div className="lesson-progress-track" aria-label={text("Lesson progress", "Progression du cours")}>
        <span style={{ width: `${visibleProgress}%` }} />
      </div>

      <section className="lesson-objectives-panel">
        <div>
          <span className="mini-label">{text("LEARNING OBJECTIVES", "OBJECTIFS D’APPRENTISSAGE")}</span>
          <h2>{text("What you should be able to explain after this lesson", "Ce que tu dois savoir expliquer après ce cours")}</h2>
        </div>
        <div className="lesson-objective-grid">
          {lesson.objectives.map((objective, index) => (
            <div key={objective.en}><span>{String(index + 1).padStart(2, "0")}</span><p>{loc(objective)}</p></div>
          ))}
        </div>
      </section>

      {lesson.overviewFlow && (
        <section className="lesson-overview-flow" aria-label={loc(lesson.overviewFlow.title)}>
          <div className="lesson-flow-heading">
            <span className="mini-label">{text("CONCEPT MAP", "CARTE CONCEPTUELLE")}</span>
            <strong>{loc(lesson.overviewFlow.title)}</strong>
          </div>
          <div className="lesson-flow-steps">
            {lesson.overviewFlow.steps.map((step, index) => (
              <div className="lesson-flow-segment" key={step.title.en}>
                <article>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{loc(step.title)}</strong>
                  <small>{loc(step.detail)}</small>
                </article>
                {index < lesson.overviewFlow!.steps.length - 1 && <b aria-hidden="true">→</b>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="lesson-layout">
        <aside className="lesson-toc">
          <span className="control-label">{text("COURSE MAP", "PLAN DU COURS")}</span>
          {lesson.sections.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={activeSection === index ? "active" : ""}
              onClick={() => void persistReadingProgress(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{loc(item.title)}</strong>
            </button>
          ))}
          <button
            type="button"
            className={activeSection === lesson.sections.length ? "active quiz-link" : "quiz-link"}
            onClick={() => setActiveSection(lesson.sections.length)}
          >
            <span>Q</span><strong>Quiz</strong>
          </button>
        </aside>

        <div className="lesson-content">
          {activeSection < lesson.sections.length ? (
            <>
              <article className="lesson-section-card">
                <span className="eyebrow">{loc(section.kicker)}</span>
                <h2>{loc(section.title)}</h2>

                <div className="lesson-core-facts">
                  <span className="control-label">{text("CORE FACTS · SAME IN EVERY MODE", "FAITS ESSENTIELS · IDENTIQUES DANS CHAQUE MODE")}</span>
                  {section.coreFacts.map((fact) => <p key={fact.en}>{loc(fact)}</p>)}
                </div>

                <div className="lesson-explanation">
                  <div className="lesson-explanation-label">
                    <span>{isFrench ? modes.find((item) => item.id === mode)?.fr : mode}</span>
                    <small>{text("Teaching style changes, knowledge does not.", "La pédagogie change, le savoir reste complet.")}</small>
                  </div>
                  <p>{loc(section.explanation[mode])}</p>
                </div>

                {section.formula && (
                  <div className="lesson-formula">
                    <div className="lesson-formula-head">
                      <span className="mini-label">{text("FORMULA", "FORMULE")}</span>
                      <strong>{loc(section.formula.label)}</strong>
                    </div>
                    <code>{section.formula.expression}</code>
                    <p>{loc(section.formula.explanation)}</p>
                    {section.formula.workedExample && (
                      <div className="lesson-formula-example">
                        <span>{text("Worked example", "Exemple chiffré")}</span>
                        <p>{loc(section.formula.workedExample)}</p>
                      </div>
                    )}
                  </div>
                )}

                {section.comparison && (
                  <div className="lesson-comparison">
                    <span className="mini-label">{text("COMPARISON", "COMPARAISON")}</span>
                    <h3>{loc(section.comparison.title)}</h3>
                    <div className="lesson-comparison-scroll">
                      <table>
                        <thead>
                          <tr>
                            {section.comparison.headers.map((header) => (
                              <th key={header.en}>{loc(header)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.comparison.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.cells.map((cell, cellIndex) => (
                                <td key={cellIndex}>{loc(cell)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {section.example && (
                  <div className="lesson-example">
                    <span className="mini-label">{text("WORKED EXAMPLE", "EXEMPLE CONCRET")}</span>
                    <p>{loc(section.example)}</p>
                  </div>
                )}

                {section.marketConnection && (
                  <div className="lesson-market-link">
                    <span className="mini-label">{text("WHY MARKETS CARE", "POURQUOI CELA COMPTE SUR LES MARCHÉS")}</span>
                    <p>{loc(section.marketConnection)}</p>
                  </div>
                )}

                {section.vocabulary?.length ? (
                  <div className="lesson-vocab">
                    <span className="control-label">{text("PROFESSIONAL VOCABULARY", "VOCABULAIRE PROFESSIONNEL")}</span>
                    <div>
                      {section.vocabulary.map((term) => (
                        <article key={term.en}>
                          <strong>{isFrench ? `${term.fr} / ${term.en}` : `${term.en} / ${term.fr}`}</strong>
                          <p>{loc(term.definition)}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>

              <nav className="lesson-section-nav">
                <button
                  type="button"
                  disabled={activeSection === 0}
                  onClick={() => void persistReadingProgress(activeSection - 1)}
                >
                  ← {text("Previous", "Précédent")}
                </button>
                <span>{activeSection + 1} / {lesson.sections.length}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (activeSection === lesson.sections.length - 1) setActiveSection(lesson.sections.length);
                    else void persistReadingProgress(activeSection + 1);
                  }}
                >
                  {activeSection === lesson.sections.length - 1 ? text("Take the quiz", "Passer le quiz") : text("Continue", "Continuer")} →
                </button>
              </nav>
            </>
          ) : (
            <section className="lesson-quiz-panel">
              <div className="lesson-quiz-heading">
                <div>
                  <span className="eyebrow">{text("MASTERY CHECK", "TEST DE MAÎTRISE")}</span>
                  <h2>{text("Prove that you can apply the concepts.", "Vérifie que tu sais appliquer les concepts.")}</h2>
                  <p>{text(
                    "A score of 70% or more completes the lesson. Every answer updates concept mastery for signed-in users.",
                    "Un score d’au moins 70 % termine le cours. Chaque réponse met à jour la maîtrise des concepts pour les utilisateurs connectés.",
                  )}</p>
                </div>
                {quizSubmitted && (
                  <div className={scorePercent >= 70 ? "quiz-score passed" : "quiz-score"}>
                    <strong>{quizScore}/{lesson.quiz.length}</strong>
                    <span>{scorePercent}%</span>
                  </div>
                )}
              </div>

              <div className="lesson-question-list">
                {lesson.quiz.map((question, index) => {
                  const result = quizResults.find((item) => item.id === question.id);
                  return (
                    <article className="lesson-question" key={question.id}>
                      <span className="mini-label">{text("QUESTION", "QUESTION")} {index + 1}</span>
                      <h3>{loc(question.question)}</h3>
                      <div className="lesson-answer-options">
                        {question.options.map((option) => {
                          const selected = answers[question.id] === option.id;
                          const correct = quizSubmitted && option.id === question.correctOption;
                          const incorrect = quizSubmitted && selected && option.id !== question.correctOption;
                          return (
                            <button
                              type="button"
                              disabled={quizSubmitted}
                              key={option.id}
                              className={[selected ? "selected" : "", correct ? "correct" : "", incorrect ? "incorrect" : ""].filter(Boolean).join(" ")}
                              onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                            >
                              <span>{option.id.toUpperCase()}</span>{loc(option.label)}
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && (
                        <div className={result?.correct ? "question-feedback correct" : "question-feedback"}>
                          <strong>{result?.correct ? text("Correct", "Correct") : text("Review this concept", "Revois ce concept")}</strong>
                          <p>{loc(question.explanation)}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="lesson-quiz-actions">
                {!quizSubmitted ? (
                  <button
                    type="button"
                    className="full-button"
                    disabled={Object.keys(answers).length !== lesson.quiz.length || saving}
                    onClick={() => void submitQuiz()}
                  >
                    {saving ? text("Saving…", "Enregistrement…") : text("Submit quiz", "Valider le quiz")}
                  </button>
                ) : scorePercent < 70 ? (
                  <button type="button" className="full-button" onClick={retryQuiz}>
                    {text("Retry quiz", "Repasser le quiz")}
                  </button>
                ) : (
                  <Link href="/university" className="full-button">
                    {text("Back to curriculum", "Retour au programme")} →
                  </Link>
                )}
                {statusMessage && <p className="inline-status" role="status">{statusMessage}</p>}
              </div>

              <div className="lesson-interview-card">
                <span className="mini-label">{text("INTERVIEW TRANSFER", "TRANSFERT VERS L’ENTRETIEN")}</span>
                <h3>{loc(lesson.interviewPrompt.question)}</h3>
                <ol>
                  {lesson.interviewPrompt.framework.map((step) => <li key={step.en}>{loc(step)}</li>)}
                </ol>
                <details>
                  <summary>{text("Show a strong sample answer", "Afficher un exemple de réponse solide")}</summary>
                  <p>{loc(lesson.interviewPrompt.sample)}</p>
                </details>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
