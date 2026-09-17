"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { curriculumYears, moduleSlug } from "@/lib/curriculum";
import { recordDailyActivity } from "@/lib/record-activity";

type ProgressStatus = "not_started" | "in_progress" | "completed";

type ProgressRow = {
  lesson_slug: string;
  status: ProgressStatus;
  progress_percent: number;
};

const modes = [
  {
    mode: "Beginner",
    text: "Same knowledge, but with slower explanations, analogies, diagrams, numerical examples and every technical word defined.",
  },
  {
    mode: "Intermediate",
    text: "Same syllabus with tighter explanations, formulas, market links and less repetition of basic definitions.",
  },
  {
    mode: "Professional",
    text: "Same concepts expressed with desk-level vocabulary, assumptions, edge cases, interview framing and cross-asset implications.",
  },
];

export default function UniversityProgress() {
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
        setMessage("We could not load your saved progress yet.");
      } else {
        const rows = (data ?? []) as ProgressRow[];
        setProgress(Object.fromEntries(rows.map((row) => [row.lesson_slug, row])));
      }
      setLoading(false);
    }

    load();
    return () => { active = false; };
  }, []);

  const completed = useMemo(() => Object.values(progress).filter((item) => item.status === "completed").length, [progress]);
  const total = curriculumYears.reduce((sum, year) => sum + year.modules.length, 0);

  async function setLessonStatus(slug: string, status: ProgressStatus) {
    if (!userId) return;
    setBusySlug(slug);
    setMessage("");

    const supabase = createClient();
    const nextPercent = status === "completed" ? 100 : 0;
    const now = new Date().toISOString();
    const { error } = await supabase.from("course_progress").upsert(
      {
        user_id: userId,
        lesson_slug: slug,
        status,
        progress_percent: nextPercent,
        last_opened_at: now,
        completed_at: status === "completed" ? now : null,
        updated_at: now,
      },
      { onConflict: "user_id,lesson_slug" },
    );

    if (error) {
      setMessage("Progress was not saved. Please try again.");
    } else {
      await recordDailyActivity(userId);
      setProgress((current) => ({
        ...current,
        [slug]: { lesson_slug: slug, status, progress_percent: nextPercent },
      }));
      setMessage(status === "completed" ? "Lesson marked complete." : "Lesson added to your active learning list.");
    }
    setBusySlug(null);
  }

  return (
    <div className="workspace-stack">
      <section className="mode-principle-grid">
        {modes.map((item) => (
          <article className="mode-principle-card" key={item.mode}>
            <span className="mini-label">{item.mode.toUpperCase()}</span>
            <h2>{item.mode} explanation</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="learning-account-strip">
        <div>
          <span className="mini-label">ACCOUNT PROGRESS</span>
          {loading ? (
            <h2>Loading your learning record…</h2>
          ) : userId ? (
            <>
              <h2>{completed} of {total} curriculum modules completed</h2>
              <p>Your status is now saved to your FinanceStudio account.</p>
            </>
          ) : (
            <>
              <h2>Sign in to save your progress across devices.</h2>
              <p>You can explore the curriculum without an account, but completion tracking requires sign-in.</p>
            </>
          )}
        </div>
        {!loading && !userId && <Link className="full-button" href="/login">Sign in →</Link>}
      </section>

      {message && <p className="inline-status" role="status">{message}</p>}

      <section className="curriculum-stack">
        {curriculumYears.map((item, yearIndex) => (
          <article className="curriculum-year" key={item.year}>
            <div className="curriculum-year-head">
              <div className="year-number">0{yearIndex + 1}</div>
              <div>
                <span className="mini-label">{item.year}</span>
                <h2>{item.name}</h2>
                <p>{item.outcome}</p>
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
                      <strong>{module.title}</strong>
                      <small>{module.domain}</small>
                    </div>
                    {userId && (
                      status === "completed" ? (
                        <button className="module-status-button completed" type="button" disabled>Completed ✓</button>
                      ) : (
                        <button
                          className="module-status-button"
                          type="button"
                          disabled={busySlug === slug}
                          onClick={() => setLessonStatus(slug, status === "in_progress" ? "completed" : "in_progress")}
                        >
                          {busySlug === slug ? "Saving…" : status === "in_progress" ? "Mark complete" : "Start"}
                        </button>
                      )
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
          <span className="mini-label">HOW A LESSON WORKS</span>
          <h2>Concept → intuition → math → market → interview → recall</h2>
        </div>
        <div className="learning-loop-steps">
          <span>1. Explain</span>
          <span>2. Visualize</span>
          <span>3. Calculate</span>
          <span>4. Apply</span>
          <span>5. Interview</span>
          <span>6. Quiz</span>
          <span>7. Revisit weak points</span>
        </div>
      </section>
    </div>
  );
}
