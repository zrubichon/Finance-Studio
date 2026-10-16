"use client";
import { saveVocabularyCard } from "@/lib/vocabulary-store";
import StudyDialog from "./study-dialog";
import StudyNotebook from "./study-notebook";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Trigger = { text: string; x: number; y: number } | null;

export default function ConceptLens() {
  const { isFrench } = useLanguage();
  const requestVersion=useRef(0);
  const [trigger, setTrigger] = useState<Trigger>(null);
  const [openTerm, setOpenTerm] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleSelection(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target || target.closest("input, textarea, button, select, [contenteditable='true'], [role='dialog']")) return;
      const selection = window.getSelection();
      const text = selection?.toString().replace(/\s+/g, " ").trim() || "";
      if (text.length < 2 || text.length > 240 || !selection?.rangeCount) {
        setTrigger(null);
        return;
      }
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      if (!rect.width && !rect.height) return;
      const x = Math.max(12, Math.min(window.innerWidth - 190, rect.left + rect.width / 2 - 80));
      const y = Math.max(12, Math.min(window.innerHeight - 52, rect.bottom + 8));
      setTrigger({ text, x, y });
    }
    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, []);

  async function explain(term: string) {
    const clean = term.replace(/\s+/g, " ").trim().slice(0, 240);
    if (!clean || loading) return;
    const version=++requestVersion.current;
    setOpenTerm(clean);
    setTrigger(null);
    setAnswer("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/professor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseStyle: "study", language: isFrench ? "FR" : "EN",
          mode: "Beginner",
          action: "explain",
          message: isFrench
            ? `Explique-moi vraiment ce terme ou passage comme un professeur : « ${clean} ». Je veux comprendre ce que cela signifie, comment cela fonctionne, le voir en schéma et avec des exemples concrets, puis comprendre les nuances en finance. Évite les listes de conseils et les commentaires sur ta démarche.`
            : `Explain this term or passage as a professor would: “${clean}”. Teach what it means, how it works, show a diagram and concrete examples, then explain the finance nuances. Avoid advice checklists and commentary about your own process.`,
        }),
      });
      const payload = await response.json() as { answer?: string; error?: string };
      if (!response.ok || !payload.answer) throw new Error(payload.error || "AI explanation unavailable.");
      if(version===requestVersion.current)setAnswer(payload.answer);
      await saveVocabularyCard({term: clean, language: isFrench ? "FR" : "EN", answer: payload.answer, at: Date.now()});
    } catch (cause) {
      if(version===requestVersion.current)setError(cause instanceof Error ? cause.message : (isFrench ? "La fiche IA est temporairement indisponible." : "The AI study card is temporarily unavailable."));
    } finally {
      if(version===requestVersion.current)setLoading(false);
    }
  }

  return (
    <>
      {trigger && (
        <button
          type="button"
          className="concept-lens-trigger"
          style={{ left: trigger.x, top: trigger.y }}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => void explain(trigger.text)}
        >
          ✦ {isFrench ? "Créer une fiche IA" : "Create AI card"}
        </button>
      )}

      {openTerm && (
        <StudyDialog title={openTerm} eyebrow={isFrench ? "✦ CONCEPT LENS · FICHE DE COURS" : "✦ CONCEPT LENS · STUDY CARD"} onClose={() => {requestVersion.current++;setLoading(false);setOpenTerm("");setAnswer("");setError("");}}>
            {loading && <p className="concept-lens-loading">{isFrench ? "Création de la fiche détaillée…" : "Building your detailed study card…"}</p>}
            {error && <p className="inline-status">{error}</p>}
            {answer && <StudyNotebook content={answer} />}
            {answer && (
              <div className="news-story-actions">
                <button type="button" onClick={() => void explain(openTerm)}>{isFrench ? "Régénérer" : "Regenerate"}</button>
                <a href={`/dictionary?q=${encodeURIComponent(openTerm)}`}>{isFrench ? "Voir dans le dictionnaire" : "Open in dictionary"} →</a>
              </div>
            )}
        </StudyDialog>
      )}
    </>
  );
}
