"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";
import {
  interviewQuestionKey,
  interviewQuestions,
  interviewTracks,
  type Bilingual,
  type Track,
} from "@/lib/interview-content";

export default function InterviewStudio() {
  const { isFrench, text } = useLanguage();
  const [track, setTrack] = useState<Track>("Investment Banking");
  const [answer, setAnswer] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const active = useMemo(() => interviewQuestions[track], [track]);
  const local = (value: Bilingual) => isFrench ? value.fr : value.en;

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;

      setUserId(user.id);
      const { count } = await supabase
        .from("interview_attempts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (mounted) setAttemptCount(count ?? 0);
    }

    void loadUser();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setAnswer("");
    setStatus("");
  }, [track]);

  async function saveAttempt() {
    if (!userId || !answer.trim()) return;

    setSaving(true);
    setStatus("");

    const supabase = createClient();
    const { error } = await supabase.from("interview_attempts").insert({
      user_id: userId,
      track,
      question_key: interviewQuestionKey(track),
      answer_text: answer.trim(),
      evaluation: { status: "submitted_unscored", version: 1 },
    });

    if (error) {
      setStatus(text(
        "Your answer could not be saved. Please try again.",
        "Ta réponse n’a pas pu être enregistrée. Réessaie.",
      ));
    } else {
      setAttemptCount((count) => count + 1);
      setStatus(text(
        "Practice attempt saved to your account.",
        "Tentative d’entraînement enregistrée dans ton compte.",
      ));
    }

    setSaving(false);
  }

  return (
    <div className="workspace-stack">
      <section className="control-panel interview-control-panel">
        <div>
          <span className="control-label">{text("CAREER TRACK", "MÉTIER / CAREER TRACK")}</span>
          <div className="chip-row">
            {interviewTracks.map((item) => (
              <button
                className={track === item.key ? "chip active" : "chip"}
                onClick={() => setTrack(item.key)}
                key={item.key}
                type="button"
              >
                {isFrench ? item.fr : item.key}
              </button>
            ))}
          </div>
        </div>

        <div className="attempt-counter">
          <span className="control-label">{text("SAVED ATTEMPTS", "TENTATIVES ENREGISTRÉES")}</span>
          <strong>{attemptCount}</strong>
        </div>
      </section>

      <section className="interview-question-panel">
        <div className="question-meta">
          <span className="mini-label">{text("TECHNICAL / MARKET QUESTION", "QUESTION TECHNIQUE / MARCHÉ")}</span>
          <span className="pill accent">
            {isFrench
              ? interviewTracks.find((item) => item.key === track)?.fr
              : track}
          </span>
        </div>

        <h2>{local(active.question)}</h2>

        <div className="interview-two-column">
          <div>
            <span className="control-label">{text("WHAT THE INTERVIEWER IS TESTING", "CE QUE LE RECRUTEUR ÉVALUE")}</span>
            <p>{local(active.tests)}</p>
          </div>
          <div>
            <span className="control-label">{text("FOLLOW-UP", "RELANCE / FOLLOW-UP")}</span>
            <p>{local(active.followUp)}</p>
          </div>
        </div>
      </section>

      <section className="answer-practice-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("YOUR ANSWER", "TA RÉPONSE")}</span>
            <h2>{text(
              "Practice before reading a perfect script.",
              "Entraîne-toi avant de lire une réponse parfaite.",
            )}</h2>
          </div>
          <span className="connection-badge">
            {userId
              ? text("Account sync on", "Synchronisation du compte active")
              : text("Sign in to save", "Connecte-toi pour enregistrer")}
          </span>
        </div>

        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={text(
            "Write your answer here as if you were speaking to the interviewer…",
            "Écris ta réponse ici comme si tu parlais au recruteur…",
          )}
          rows={8}
        />

        <div className="answer-practice-actions">
          {userId ? (
            <button
              className="full-button"
              type="button"
              disabled={!answer.trim() || saving}
              onClick={saveAttempt}
            >
              {saving
                ? text("Saving…", "Enregistrement…")
                : text("Save practice attempt", "Enregistrer la tentative")}
            </button>
          ) : (
            <Link className="full-button" href="/login">
              {text("Sign in to save attempts", "Se connecter pour enregistrer les tentatives")} →
            </Link>
          )}
          {status && <span className="inline-status" role="status">{status}</span>}
        </div>
      </section>

      <section className="answer-framework-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("IDEAL ANSWER STRUCTURE", "STRUCTURE DE RÉPONSE IDÉALE")}</span>
            <h2>{text(
              "Build reasoning before memorizing wording",
              "Construire le raisonnement avant de mémoriser les mots",
            )}</h2>
          </div>
          <span className="connection-badge">
            {text("AI scoring comes next", "Évaluation IA / AI scoring à venir")}
          </span>
        </div>

        <div className="framework-steps-grid">
          {active.framework.map((step, index) => (
            <div className="framework-step" key={step.en}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{local(step)}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="analysis-grid">
        <article className="analysis-card">
          <span className="mini-label">{text("BEHAVIORAL", "COMPORTEMENTAL / BEHAVIORAL")}</span>
          <h3>{text("Tell me about yourself", "Parlez-moi de vous / Tell me about yourself")}</h3>
          <p>{text(
            "Build a concise present → evidence → finance motivation → why this role structure.",
            "Construis une réponse concise : situation actuelle → preuves → motivation finance → pourquoi ce poste.",
          )}</p>
        </article>

        <article className="analysis-card">
          <span className="mini-label">{text("MENTAL MATH", "CALCUL MENTAL / MENTAL MATH")}</span>
          <h3>{text("Train speed without losing logic", "Gagner en vitesse sans perdre la logique")}</h3>
          <p>{text(
            "Percentages, growth rates, breakevens, multiples, probability and market arithmetic.",
            "Pourcentages, taux de croissance / growth rates, seuils de rentabilité / breakevens, multiples, probabilités et calculs de marché.",
          )}</p>
        </article>

        <article className="analysis-card">
          <span className="mini-label">{text("MARKET AWARENESS", "CULTURE MARCHÉ / MARKET AWARENESS")}</span>
          <h3>{text("Know what matters today", "Savoir ce qui compte aujourd’hui")}</h3>
          <p>{text(
            "Connect current macro events to assets, sectors, valuation and the role you are interviewing for.",
            "Relie les événements macro actuels aux actifs, secteurs, valorisations / valuation et au métier pour lequel tu passes un entretien.",
          )}</p>
        </article>
      </section>
    </div>
  );
}
