"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";
import { recordDailyActivity } from "@/lib/record-activity";
import {
  interviewQuestionKey,
  interviewQuestions,
  interviewTracks,
  isInterviewTrack,
  type Bilingual,
  type Track,
} from "@/lib/interview-content";

export default function InterviewStudio() {
  const { isFrench, text } = useLanguage();
  const [track, setTrack] = useState<Track>("Investment Banking");
  const [careerStage, setCareerStage] = useState("");
  const [answer, setAnswer] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [aiStatus, setAiStatus] = useState<"ready" | "live" | "error">("ready");
  const [status, setStatus] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [lessonSlug, setLessonSlug] = useState("");
  const [source, setSource] = useState("");

  const active = useMemo(() => interviewQuestions[track], [track]);
  const local = (value: Bilingual) => isFrench ? value.fr : value.en;
  const displayedQuestion = customQuestion || local(active.question);
  const isSummerAnalyst = careerStage === "intern";

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const requestedTrack = params?.get("track") ?? null;
      const requestedQuestion = params?.get("question")?.trim() ?? "";
      const requestedLesson = params?.get("lesson")?.trim() ?? "";
      const requestedSource = params?.get("source")?.trim() ?? "";
      const savedStage = window.localStorage.getItem("finance-studio-career-stage") ?? "";
      const savedLocalRole = window.localStorage.getItem("finance-studio-target-role") ?? "";

      if (mounted) setCareerStage(savedStage);
      if (isInterviewTrack(requestedTrack)) setTrack(requestedTrack);
      else if (isInterviewTrack(savedLocalRole)) setTrack(savedLocalRole);
      if (requestedQuestion) setCustomQuestion(requestedQuestion.slice(0, 1800));
      if (requestedLesson) setLessonSlug(requestedLesson.slice(0, 180));
      if (requestedSource) setSource(requestedSource.slice(0, 80));

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;

      setUserId(user.id);

      const [attemptResult, profileResult] = await Promise.all([
        supabase
          .from("interview_attempts")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("profiles")
          .select("target_role")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      if (!mounted) return;

      setAttemptCount(attemptResult.count ?? 0);
      const savedTarget = profileResult.data?.target_role;
      if (!isInterviewTrack(requestedTrack) && isInterviewTrack(savedTarget)) setTrack(savedTarget);
    }

    void loadUser();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setAnswer("");
    setStatus("");
    setEvaluation("");
    setScore(null);
  }, [track]);

  async function saveAttempt() {
    if (!userId || !answer.trim() || saving) return;

    setSaving(true);
    setStatus("");

    const supabase = createClient();
    const questionKey = customQuestion
      ? `contextual-${lessonSlug || track.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
      : interviewQuestionKey(track);
    const { error } = await supabase.from("interview_attempts").insert({
      user_id: userId,
      track,
      question_key: questionKey,
      answer_text: answer.trim(),
      evaluation: {
        status: "submitted_unscored",
        version: 3,
        career_stage: careerStage || null,
        custom_question: customQuestion || null,
        lesson_slug: lessonSlug || null,
        source: source || null,
      },
    });

    if (error) {
      setStatus(text("Your answer could not be saved. Please try again.", "Ta réponse n’a pas pu être enregistrée. Réessaie."));
    } else {
      setAttemptCount((count) => count + 1);
      await recordDailyActivity(userId);
      setStatus(text("Practice attempt saved to your account.", "Tentative d’entraînement enregistrée dans ton compte."));
    }

    setSaving(false);
  }

  async function evaluateAnswer() {
    if (!answer.trim() || evaluating) return;

    setEvaluating(true);
    setStatus("");
    setEvaluation("");
    setScore(null);

    try {
      const response = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track,
          answer: answer.trim(),
          language: isFrench ? "FR" : "EN",
          careerStage: careerStage || null,
          customQuestion: customQuestion || null,
          lessonSlug: lessonSlug || null,
          source: source || null,
        }),
      });

      const payload = (await response.json()) as { score?: number | null; feedback?: string; saved?: boolean; error?: string };

      if (!response.ok || !payload.feedback) {
        throw new Error(payload.error || text("The interview evaluation could not be generated.", "L’évaluation de l’entretien n’a pas pu être générée."));
      }

      setEvaluation(payload.feedback);
      setScore(typeof payload.score === "number" ? payload.score : null);
      setAiStatus("live");

      if (payload.saved) {
        setAttemptCount((count) => count + 1);
        if (userId) await recordDailyActivity(userId);
        setStatus(text("AI evaluation saved to your account.", "Évaluation IA enregistrée dans ton compte."));
      } else if (!userId) {
        setStatus(text("Evaluation generated. Sign in if you want future attempts saved.", "Évaluation générée. Connecte-toi si tu veux sauvegarder les prochaines tentatives."));
      }
    } catch (cause) {
      setAiStatus("error");
      setStatus(cause instanceof Error ? cause.message : text("AI evaluation is temporarily unavailable.", "L’évaluation IA est temporairement indisponible."));
    } finally {
      setEvaluating(false);
    }
  }

  return (
    <div className="workspace-stack">
      {isSummerAnalyst ? (
        <section className="summer-analyst-context">
          <div>
            <span className="mini-label">{text("SUMMER ANALYST MODE", "MODE SUMMER ANALYST")}</span>
            <h2>{text("Interview practice is calibrated for an internship candidate.", "L’entraînement est calibré pour une candidature de stage.")}</h2>
            <p>{text("Expect strong fundamentals, structured thinking, motivation and commercial awareness — not senior-level deal ownership.", "On attend de bonnes bases, un raisonnement structuré, de la motivation et de la culture marché — pas une expérience de senior.")}</p>
          </div>
          <Link className="chip" href="/careers">{text("Change career stage", "Changer de niveau")}</Link>
        </section>
      ) : null}

      {customQuestion ? (
        <section className="learning-account-strip">
          <div>
            <span className="mini-label">{text("CONNECTED PRACTICE", "ENTRAÎNEMENT CONNECTÉ")}</span>
            <h2>{text("This drill came directly from your FinanceStudio learning loop.", "Cette question vient directement de ton learning loop FinanceStudio.")}</h2>
            <p>{lessonSlug ? text(`Related lesson: ${lessonSlug}`, `Cours lié : ${lessonSlug}`) : text("Contextual market question", "Question de marché contextuelle")}{source ? ` · ${source}` : ""}</p>
          </div>
          {lessonSlug ? <Link className="chip" href={`/university/${lessonSlug}`}>{text("Open lesson", "Ouvrir le cours")}</Link> : null}
        </section>
      ) : null}

      <section className="control-panel interview-control-panel">
        <div>
          <span className="control-label">{text("CAREER TRACK", "MÉTIER / CAREER TRACK")}</span>
          <div className="chip-row">
            {interviewTracks.map((item) => (
              <button className={track === item.key ? "chip active" : "chip"} onClick={() => setTrack(item.key)} key={item.key} type="button" disabled={evaluating}>
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
          <span className="mini-label">{customQuestion ? text("CONTEXTUAL / CURRENT-MARKET QUESTION", "QUESTION CONTEXTUELLE / MARCHÉ ACTUEL") : text("TECHNICAL / MARKET QUESTION", "QUESTION TECHNIQUE / MARCHÉ")}</span>
          <span className="pill accent">{isFrench ? interviewTracks.find((item) => item.key === track)?.fr : track}{isSummerAnalyst ? " · Summer Analyst" : ""}</span>
        </div>
        <h2>{displayedQuestion}</h2>
        <div className="interview-two-column">
          <div><span className="control-label">{text("WHAT THE INTERVIEWER IS TESTING", "CE QUE LE RECRUTEUR ÉVALUE")}</span><p>{customQuestion ? text("Can you separate facts from interpretation, explain the transmission mechanism, identify what may already be priced in and communicate uncertainty clearly?", "Sais-tu séparer faits et interprétation, expliquer la chaîne de transmission, identifier ce qui peut déjà être pricé et communiquer clairement l’incertitude ?") : local(active.tests)}</p></div>
          <div><span className="control-label">{text("FOLLOW-UP", "RELANCE / FOLLOW-UP")}</span><p>{customQuestion ? text("What would change your view? Which asset would confirm or contradict your interpretation?", "Qu’est-ce qui changerait ton avis ? Quel actif confirmerait ou contredirait ton interprétation ?") : local(active.followUp)}</p></div>
        </div>
      </section>

      <section className="answer-practice-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("YOUR ANSWER", "TA RÉPONSE")}</span>
            <h2>{text("Answer first. Then let FinanceStudio challenge your reasoning.", "Réponds d’abord. Puis laisse FinanceStudio challenger ton raisonnement.")}</h2>
          </div>
          <span className="connection-badge"><span className="status-dot" />{aiStatus === "live" ? text("AI evaluator live", "Évaluateur IA actif") : aiStatus === "error" ? text("AI Gateway activation pending", "Activation AI Gateway en attente") : text("AI evaluator ready", "Évaluateur IA prêt")}</span>
        </div>

        <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={text("Write your answer here as if you were speaking to the interviewer…", "Écris ta réponse ici comme si tu parlais au recruteur…")} rows={8} maxLength={8000} disabled={evaluating} />

        <div className="answer-practice-actions">
          <button className="full-button" type="button" disabled={answer.trim().length < 20 || evaluating} onClick={() => void evaluateAnswer()}>
            {evaluating ? text("Evaluating…", "Évaluation…") : text("Evaluate my answer", "Évaluer ma réponse")}{!evaluating ? " →" : ""}
          </button>
          {userId ? (
            <button className="chip" type="button" disabled={!answer.trim() || saving || evaluating} onClick={() => void saveAttempt()}>
              {saving ? text("Saving…", "Enregistrement…") : text("Save without AI score", "Sauvegarder sans score IA")}
            </button>
          ) : (
            <Link className="chip" href="/login">{text("Sign in to save attempts", "Se connecter pour sauvegarder")}</Link>
          )}
          {status && <span className="inline-status" role="status">{status}</span>}
        </div>
      </section>

      {evaluation && (
        <section className="interview-evaluation-stack">
          <div className="interview-score-band">
            <div><span className="mini-label">{text("AI INTERVIEW SCORE", "SCORE ENTRETIEN IA")}</span><strong>{score === null ? "— / 100" : `${score} / 100`}</strong></div>
            <p>{text("Coaching signal — use it to improve and retest.", "Signal pédagogique — utilise-le pour progresser puis reteste-toi.")}</p>
          </div>
          <article className="interview-feedback-report">
            <span className="mini-label">{text("DETAILED FEEDBACK", "FEEDBACK DÉTAILLÉ")}</span>
            <h2>{text("Your coaching report", "Ton rapport de coaching")}</h2>
            <p className="interview-feedback-copy" style={{ whiteSpace: "pre-wrap" }}>{evaluation}</p>
          </article>
        </section>
      )}

      <section className="answer-framework-panel">
        <div className="panel-heading">
          <div><span className="mini-label">{text("IDEAL ANSWER STRUCTURE", "STRUCTURE DE RÉPONSE IDÉALE")}</span><h2>{text("Build reasoning before memorizing wording", "Construire le raisonnement avant de mémoriser les mots")}</h2></div>
          <span className="connection-badge">{text("Rubric shared with AI evaluator", "Rubrique partagée avec l’évaluateur IA")}</span>
        </div>
        <div className="framework-steps-grid">
          {active.framework.map((step, index) => <div className="framework-step" key={step.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{local(step)}</strong></div>)}
        </div>
      </section>

      <section className="analysis-grid">
        <article className="analysis-card"><span className="mini-label">{text("BEHAVIORAL", "COMPORTEMENTAL / BEHAVIORAL")}</span><h3>{text("Tell me about yourself", "Parlez-moi de vous / Tell me about yourself")}</h3><p>{text("Build a concise present → evidence → finance motivation → why this role structure.", "Construis une réponse concise : situation actuelle → preuves → motivation finance → pourquoi ce poste.")}</p></article>
        <article className="analysis-card"><span className="mini-label">{text("MENTAL MATH", "CALCUL MENTAL / MENTAL MATH")}</span><h3>{text("Train speed without losing logic", "Gagner en vitesse sans perdre la logique")}</h3><p>{text("Percentages, growth rates, breakevens, multiples, probability and market arithmetic.", "Pourcentages, taux de croissance / growth rates, seuils de rentabilité / breakevens, multiples, probabilités et calculs de marché.")}</p></article>
        <article className="analysis-card"><span className="mini-label">{text("MARKET AWARENESS", "CULTURE MARCHÉ / MARKET AWARENESS")}</span><h3>{text("Know what matters today", "Savoir ce qui compte aujourd’hui")}</h3><p>{text("Connect current macro events to assets, sectors, valuation and the role you are interviewing for.", "Relie les événements macro actuels aux actifs, secteurs, valorisations / valuation et au métier pour lequel tu passes un entretien.")}</p></article>
      </section>
    </div>
  );
}