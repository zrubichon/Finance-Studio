"use client";
import StudyDialog from "./study-dialog";
import LearningResponse from "./learning-response";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Trigger = { text: string; x: number; y: number } | null;

function saveConcept(term: string, language: "EN" | "FR") {
  try {
    const key = "finance-studio-concept-vocabulary";
    const current = JSON.parse(window.localStorage.getItem(key) || "[]");
    const rows = Array.isArray(current) ? current : [];
    const normalized = term.trim().toLowerCase();
    const next = [
      { term: term.trim(), language, at: Date.now() },
      ...rows.filter((row: { term?: unknown }) => typeof row?.term !== "string" || row.term.trim().toLowerCase() !== normalized),
    ].slice(0, 120);
    window.localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // Concept Lens remains usable if local storage is unavailable.
  }
}

export default function ConceptLens() {
  const { isFrench } = useLanguage();
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
    setOpenTerm(clean);
    setTrigger(null);
    setAnswer("");
    setError("");
    setLoading(true);
    saveConcept(clean, isFrench ? "FR" : "EN");
    try {
      const response = await fetch("/api/professor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseStyle: "study", language: isFrench ? "FR" : "EN",
          mode: "Beginner",
          action: "explain",
          message: isFrench
            ? `Crée une fiche de cours FinanceStudio extrêmement pédagogique sur ce terme ou passage sélectionné : « ${clean} ». Structure obligatoirement la réponse avec : 1) définition simple, 2) intuition, 3) pourquoi c'est important en finance, 4) mécanisme étape par étape, 5) formule pertinente et légende de chaque variable si nécessaire, 6) exemple numérique facile, 7) exemple plus avancé, 8) impacts marchés/entreprise/valorisation, 9) angle entretien, 10) angle investing, 11) erreurs fréquentes, 12) concepts liés et ce qu'il faut étudier ensuite. Définis toute abréviation à sa première apparition.`
            : `Create a very clear FinanceStudio study card for this selected finance term or passage: “${clean}”. Structure it with: 1) simple definition, 2) intuition, 3) why it matters in finance, 4) step-by-step mechanism, 5) relevant formula plus a legend for every variable when useful, 6) easy numerical example, 7) harder example, 8) market/company/valuation impacts, 9) interview angle, 10) investing angle, 11) common mistakes, 12) connected concepts and what to study next. Expand every abbreviation on first use.`,
        }),
      });
      const payload = await response.json() as { answer?: string; error?: string };
      if (!response.ok || !payload.answer) throw new Error(payload.error || "AI explanation unavailable.");
      setAnswer(payload.answer);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : (isFrench ? "La fiche IA est temporairement indisponible." : "The AI study card is temporarily unavailable."));
    } finally {
      setLoading(false);
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
        <StudyDialog title={openTerm} eyebrow={isFrench ? "✦ CONCEPT LENS · FICHE DE COURS" : "✦ CONCEPT LENS · STUDY CARD"} onClose={() => {setOpenTerm("");setAnswer("");setError("");}}>
            {loading && <p className="concept-lens-loading">{isFrench ? "Création de la fiche détaillée…" : "Building your detailed study card…"}</p>}
            {error && <p className="inline-status">{error}</p>}
            {answer && <LearningResponse content={answer} />}
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
