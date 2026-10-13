"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";

type MasteryRow = { concept_key: string; mastery_score: number };
type ProgressRow = { lesson_slug: string; status: string; progress_percent: number };

export default function ProfessorPersonalizationStrip() {
  const { text } = useLanguage();
  const [signedIn, setSignedIn] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [mastery, setMastery] = useState<MasteryRow[]>([]);
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    let active = true;

    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!active || !user) return;
      setSignedIn(true);

      const [profileResult, masteryResult, progressResult] = await Promise.all([
        supabase.from("profiles").select("target_role").eq("user_id", user.id).maybeSingle(),
        supabase.from("concept_mastery").select("concept_key,mastery_score").eq("user_id", user.id),
        supabase.from("course_progress").select("lesson_slug,status,progress_percent").eq("user_id", user.id),
      ]);

      if (!active) return;
      setTargetRole(profileResult.data?.target_role ?? "");
      setMastery((masteryResult.data ?? []) as MasteryRow[]);
      setProgress((progressResult.data ?? []) as ProgressRow[]);
    }

    void load();
    return () => { active = false; };
  }, []);

  const weakest = useMemo(
    () => mastery
      .filter((row) => Number(row.mastery_score) < 75)
      .sort((a, b) => Number(a.mastery_score) - Number(b.mastery_score))
      .slice(0, 3),
    [mastery],
  );
  const activeLesson = useMemo(
    () => progress
      .filter((row) => row.status === "in_progress")
      .sort((a, b) => Number(b.progress_percent) - Number(a.progress_percent))[0],
    [progress],
  );

  return (
    <section className="learning-account-strip">
      <div>
        <span className="mini-label">{text("ADAPTIVE PERSONALIZATION", "PERSONNALISATION ADAPTATIVE")}</span>
        <h2>{signedIn ? text("AI Professor is using your learning evidence.", "AI Professor utilise tes vraies données d’apprentissage.") : text("Sign in to make the Professor adapt to your history.", "Connecte-toi pour que le Professeur s’adapte à ton historique.")}</h2>
        <p>{signedIn
          ? text("Your explanation level is combined with course progress, quiz-derived concept mastery and your target career when the tutor answers.", "Ton niveau d’explication est combiné à ta progression, la maîtrise des concepts issue des quiz et ton métier cible quand le tuteur répond.")
          : text("Guest mode still teaches the selected lesson, but does not use private progress or mastery data.", "Le mode invité enseigne toujours le cours sélectionné, mais n’utilise pas tes données privées de progression ou de maîtrise.")}</p>
      </div>
      {signedIn ? (
        <div className="chip-row">
          {targetRole ? <span className="chip active">{text("Career", "Métier")} · {targetRole}</span> : null}
          {activeLesson ? <span className="chip">{text("Current lesson", "Cours actuel")} · {activeLesson.progress_percent}%</span> : null}
          {weakest.map((item) => (
            <span className="chip" key={item.concept_key}>{item.concept_key.replace(/-/g, " ")} · {item.mastery_score}%</span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
