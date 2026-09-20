"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { recordDailyActivity } from "@/lib/record-activity";
import { curriculumYears, moduleSlug } from "@/lib/curriculum";

type Mode = "Beginner" | "Intermediate" | "Professional";
type TeachingAction =
  | "explain"
  | "simplify"
  | "numbers"
  | "formula"
  | "markets"
  | "interview"
  | "quiz"
  | "diagnose";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ProfessorSession = {
  id: string;
  lesson_slug: string | null;
  mode: Mode;
  language: "EN" | "FR";
  title: string | null;
  created_at: string;
  updated_at: string;
};

const modes: Mode[] = ["Beginner", "Intermediate", "Professional"];

const teachingActions: Array<{
  id: TeachingAction;
  en: string;
  fr: string;
  fallbackEn: string;
  fallbackFr: string;
}> = [
  {
    id: "simplify",
    en: "Explain more simply",
    fr: "Expliquer plus simplement",
    fallbackEn: "Re-explain your previous answer more simply.",
    fallbackFr: "Réexplique ta réponse précédente plus simplement.",
  },
  {
    id: "numbers",
    en: "Use numbers",
    fr: "Utiliser des chiffres",
    fallbackEn: "Teach the concept again using a concrete numerical example.",
    fallbackFr: "Réexplique le concept avec un exemple chiffré concret.",
  },
  {
    id: "formula",
    en: "Show the formula",
    fr: "Montrer la formule",
    fallbackEn: "Show the relevant formula, define every variable and work through an example.",
    fallbackFr: "Montre la formule pertinente, définis chaque variable et fais un exemple.",
  },
  {
    id: "markets",
    en: "Connect to markets",
    fr: "Relier aux marchés",
    fallbackEn: "Connect the concept to markets and explain the transmission chain.",
    fallbackFr: "Relie le concept aux marchés et explique la chaîne de transmission.",
  },
  {
    id: "interview",
    en: "Interview answer",
    fr: "Réponse entretien",
    fallbackEn: "Turn this into a strong interview-ready answer and explain the structure.",
    fallbackFr: "Transforme cela en une réponse solide pour entretien et explique la structure.",
  },
  {
    id: "quiz",
    en: "Quiz me",
    fr: "Me faire un quiz",
    fallbackEn: "Quiz me on the selected lesson. Ask one question and wait for my answer.",
    fallbackFr: "Fais-moi un quiz sur le cours sélectionné. Pose une question et attends ma réponse.",
  },
  {
    id: "diagnose",
    en: "Diagnose my mistake",
    fr: "Diagnostiquer mon erreur",
    fallbackEn: "Diagnose the exact misconception in my latest answer and test me again.",
    fallbackFr: "Diagnostique précisément l’erreur dans ma dernière réponse et teste-moi à nouveau.",
  },
];

export default function ProfessorLab() {
  const { isFrench, text } = useLanguage();
  const [mode, setMode] = useState<Mode>("Beginner");
  const [lessonSlug, setLessonSlug] = useState("year-2-duration-convexity");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState<"ready" | "live" | "error">("ready");
  const [error, setError] = useState("");
  const [personalized, setPersonalized] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ProfessorSession[]>([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("finance-studio-level");
    if (stored === "Beginner" || stored === "Intermediate" || stored === "Professional") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("finance-studio-level", mode);
  }, [mode]);

  useEffect(() => {
    void refreshSessions();
  }, []);

  const modules = useMemo(
    () =>
      curriculumYears.flatMap((year) =>
        year.modules.map((module) => ({
          slug: moduleSlug(year.year, module.title),
          year: year.year,
          yearFr: year.yearFr,
          title: module.title,
          titleFr: module.titleFr,
        })),
      ),
    [],
  );

  const selectedLesson = modules.find((module) => module.slug === lessonSlug);

  const modeLabel = (value: Mode) =>
    !isFrench
      ? value
      : value === "Beginner"
        ? "Débutant"
        : value === "Intermediate"
          ? "Intermédiaire"
          : "Professionnel";

  async function refreshSessions() {
    try {
      const response = await fetch("/api/professor", { cache: "no-store" });
      if (!response.ok) return;
      const payload = (await response.json()) as {
        authenticated?: boolean;
        sessions?: ProfessorSession[];
      };
      setAuthenticated(Boolean(payload.authenticated));
      setSessions(payload.sessions ?? []);
    } catch {
      // Session history is optional; the tutor remains usable for guests.
    }
  }

  async function loadSession(nextSessionId: string) {
    if (!nextSessionId || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/professor?sessionId=${encodeURIComponent(nextSessionId)}`,
        { cache: "no-store" },
      );
      const payload = (await response.json()) as {
        session?: ProfessorSession;
        messages?: Message[];
        error?: string;
      };

      if (!response.ok || !payload.session) {
        throw new Error(
          payload.error ||
            text(
              "This tutoring session could not be loaded.",
              "Cette session de tutorat n’a pas pu être chargée.",
            ),
        );
      }

      setSessionId(payload.session.id);
      setLessonSlug(payload.session.lesson_slug ?? "");
      setMode(payload.session.mode);
      setMessages(
        (payload.messages ?? []).map((message) => ({
          role: message.role,
          content: message.content,
        })),
      );
      setConnection("live");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : text(
              "This tutoring session could not be loaded.",
              "Cette session de tutorat n’a pas pu être chargée.",
            ),
      );
    } finally {
      setLoading(false);
    }
  }

  async function askProfessor(
    action: TeachingAction = "explain",
    fallbackMessage?: string,
  ) {
    if (loading) return;

    const message = (draft.trim() || fallbackMessage || "").trim();
    if (!message) {
      setError(
        text(
          "Write a finance question first.",
          "Écris d’abord une question de finance.",
        ),
      );
      return;
    }

    const previousHistory = messages.slice(-8);
    const userMessage: Message = { role: "user", content: message };

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/professor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          mode,
          language: isFrench ? "FR" : "EN",
          lessonSlug: lessonSlug || null,
          action,
          history: previousHistory,
          sessionId,
        }),
      });

      const payload = (await response.json()) as {
        answer?: string;
        error?: string;
        personalized?: boolean;
        sessionId?: string | null;
      };

      if (!response.ok || !payload.answer) {
        throw new Error(
          payload.error ||
            text(
              "The AI Professor could not answer.",
              "Le Professeur IA n’a pas pu répondre.",
            ),
        );
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: payload.answer! },
      ]);
      setPersonalized(Boolean(payload.personalized));
      setSessionId(payload.sessionId ?? sessionId);
      setConnection("live");
      if (authenticated) await recordDailyActivity();
      void refreshSessions();
    } catch (cause) {
      setConnection("error");
      setError(
        cause instanceof Error
          ? cause.message
          : text(
              "The AI Professor is temporarily unavailable.",
              "Le Professeur IA est temporairement indisponible.",
            ),
      );
    } finally {
      setLoading(false);
    }
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askProfessor("explain");
  }

  function runTeachingAction(action: (typeof teachingActions)[number]) {
    const fallback = isFrench ? action.fallbackFr : action.fallbackEn;
    void askProfessor(action.id, fallback);
  }

  return (
    <div className="workspace-stack">
      <section className="control-panel professor-control-panel">
        <div>
          <span className="control-label">
            {text("EXPLANATION MODE", "MODE D’EXPLICATION")}
          </span>
          <div className="chip-row">
            {modes.map((item) => (
              <button
                className={mode === item ? "chip active" : "chip"}
                onClick={() => setMode(item)}
                key={item}
                type="button"
              >
                {modeLabel(item)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="control-label">
            {text("AI CONNECTION", "CONNEXION IA")}
          </span>
          <span className="connection-badge">
            <span className="status-dot" />
            {connection === "live"
              ? text(
                  personalized
                    ? "AI Gateway live · personalized"
                    : "AI Gateway live",
                  personalized
                    ? "AI Gateway actif · personnalisé"
                    : "AI Gateway actif",
                )
              : connection === "error"
                ? text("AI connection unavailable", "Connexion IA indisponible")
                : text("AI Professor ready", "Professeur IA prêt")}
          </span>
        </div>
      </section>

      <section className="professor-demo-panel">
        <div className="professor-demo-question">
          <span className="mini-label">
            {text("COURSE CONTEXT", "CONTEXTE DU COURS")}
          </span>
          <h2>
            {text(
              "Choose exactly what the professor should teach from.",
              "Choisis exactement le cours à partir duquel le professeur doit enseigner.",
            )}
          </h2>

          <label className="control-label" htmlFor="professor-course">
            {text("FINANCE UNIVERSITY MODULE", "MODULE FINANCE UNIVERSITY")}
          </label>
          <select
            id="professor-course"
            value={lessonSlug}
            onChange={(event) => setLessonSlug(event.target.value)}
          >
            <option value="">
              {text("General finance · no specific lesson", "Finance générale · aucun cours spécifique")}
            </option>
            {curriculumYears.map((year) => (
              <optgroup
                label={isFrench ? `${year.yearFr} · ${year.nameFr}` : `${year.year} · ${year.name}`}
                key={year.year}
              >
                {year.modules.map((module) => {
                  const slug = moduleSlug(year.year, module.title);
                  return (
                    <option value={slug} key={slug}>
                      {isFrench ? module.titleFr : module.title}
                    </option>
                  );
                })}
              </optgroup>
            ))}
          </select>

          {selectedLesson ? (
            <p>
              {text("Selected:", "Sélectionné :")}{" "}
              <strong>{isFrench ? selectedLesson.titleFr : selectedLesson.title}</strong>
            </p>
          ) : (
            <p>
              {text(
                "General finance mode uses durable finance knowledge without claiming a lesson source.",
                "Le mode finance générale utilise des connaissances financières durables sans prétendre provenir d’un cours précis.",
              )}
            </p>
          )}

          {authenticated && sessions.length > 0 ? (
            <>
              <label className="control-label" htmlFor="professor-session">
                {text("RECENT TUTORING SESSIONS", "SESSIONS RÉCENTES")}
              </label>
              <select
                id="professor-session"
                value={sessionId ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value) void loadSession(value);
                }}
                disabled={loading}
              >
                <option value="">
                  {text("Start a new session", "Commencer une nouvelle session")}
                </option>
                {sessions.map((session) => (
                  <option value={session.id} key={session.id}>
                    {session.title || text("Untitled session", "Session sans titre")}
                  </option>
                ))}
              </select>
            </>
          ) : authenticated ? (
            <p>
              {text(
                "Your future tutoring sessions will be saved here.",
                "Tes prochaines sessions de tutorat seront sauvegardées ici.",
              )}
            </p>
          ) : null}
        </div>

        <div className="professor-response-card">
          <span className="mini-label">
            {modeLabel(mode).toUpperCase()} · {text("ASK THE PROFESSOR", "DEMANDER AU PROFESSEUR")}
          </span>

          <form onSubmit={submitQuestion}>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={text(
                "Example: I understand that bond prices fall when yields rise, but why does duration change the size of the move?",
                "Exemple : je comprends que le prix des obligations baisse quand les yields montent, mais pourquoi la duration change-t-elle l’ampleur du mouvement ?",
              )}
              rows={6}
              maxLength={5000}
              disabled={loading}
            />
            <button
              className="full-button"
              type="submit"
              disabled={loading || !draft.trim()}
            >
              {loading
                ? text("Professor is thinking…", "Le professeur réfléchit…")
                : text("Ask FinanceStudio Professor", "Demander au Professeur FinanceStudio")}
              {!loading ? " →" : ""}
            </button>
          </form>

          {error && (
            <p className="inline-status" role="status">
              {error}
            </p>
          )}
        </div>
      </section>

      {messages.length > 0 && (
        <section className="news-blueprint-panel">
          <div className="panel-heading">
            <div>
              <span className="mini-label">
                {text("TUTORING SESSION", "SESSION DE TUTORAT")}
              </span>
              <h2>
                {text(
                  "The professor keeps the recent conversation in context.",
                  "Le professeur conserve la conversation récente en contexte.",
                )}
              </h2>
            </div>
            <button
              type="button"
              className="chip"
              onClick={() => {
                setMessages([]);
                setSessionId(null);
                setError("");
                setPersonalized(false);
              }}
              disabled={loading}
            >
              {text("New session", "Nouvelle session")}
            </button>
          </div>

          <div className="news-analysis-grid">
            {messages.map((message, index) => (
              <article
                className="news-analysis-step"
                key={`${message.role}-${index}`}
              >
                <span>{message.role === "user" ? "YOU" : "AI"}</span>
                <div>
                  <strong>
                    {message.role === "user"
                      ? text("Your question", "Ta question")
                      : text("FinanceStudio Professor", "Professeur FinanceStudio")}
                  </strong>
                  <p style={{ whiteSpace: "pre-wrap" }}>{message.content}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="teaching-action-grid">
        {teachingActions.map((action, index) => (
          <button
            type="button"
            className="analysis-card"
            key={action.id}
            onClick={() => runTeachingAction(action)}
            disabled={loading}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{isFrench ? action.fr : action.en}</h3>
            <p>
              {text(
                "The same knowledge is preserved while the teaching method changes.",
                "Le même savoir est conservé tandis que la méthode pédagogique change.",
              )}
            </p>
          </button>
        ))}
      </section>

      <section className="misconception-panel">
        <div>
          <span className="mini-label">
            {text(
              "ERROR-BASED LEARNING",
              "APPRENTISSAGE PAR L’ERREUR / ERROR-BASED LEARNING",
            )}
          </span>
          <h2>
            {text(
              "Do not just correct the answer — diagnose the misconception.",
              "Ne pas seulement corriger la réponse — diagnostiquer l’erreur de compréhension.",
            )}
          </h2>
        </div>
        <div className="misconception-flow">
          <span>{text("Your answer", "Ta réponse")}</span>
          <b>→</b>
          <span>{text("Find exact error", "Identifier l’erreur précise")}</span>
          <b>→</b>
          <span>{text("Rebuild concept", "Reconstruire le concept")}</span>
          <b>→</b>
          <span>{text("New question", "Nouvelle question")}</span>
          <b>→</b>
          <span>{text("Confirm mastery", "Confirmer la maîtrise / mastery")}</span>
        </div>
      </section>
    </div>
  );
}
