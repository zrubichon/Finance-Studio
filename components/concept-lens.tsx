"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type ConceptCard = {
  termEn: string;
  termFr: string;
  categoryEn: string;
  categoryFr: string;
  oneLineEn: string;
  oneLineFr: string;
  plainEn: string;
  plainFr: string;
  whyItMattersEn: string;
  whyItMattersFr: string;
  implicationsEn: string[];
  implicationsFr: string[];
  exampleEn: string;
  exampleFr: string;
  formula: string;
  formulaExplainEn: string;
  formulaExplainFr: string;
  visual: {
    titleEn: string;
    titleFr: string;
    stepsEn: string[];
    stepsFr: string[];
    howToReadEn: string;
    howToReadFr: string;
  };
  relatedEn: string[];
  relatedFr: string[];
  commonMistakeEn: string;
  commonMistakeFr: string;
};

type SelectionState = {
  text: string;
  context: string;
  x: number;
  y: number;
};

const LOCAL_KEY = "finance-studio-ai-vocabulary";

function cleanSelection(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 500);
}

function isEditable(node: Node | null) {
  const element = node instanceof Element ? node : node?.parentElement;
  if (!element) return false;
  return Boolean(element.closest("input, textarea, select, [contenteditable='true']"));
}

function getContext(range: Range) {
  const container = range.commonAncestorContainer instanceof Element
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  const source = container?.closest("article, section, main, div, p, li")?.textContent ?? container?.textContent ?? "";
  return source.replace(/\s+/g, " ").trim().slice(0, 3500);
}

function normalizeCard(value: unknown): ConceptCard | null {
  if (!value || typeof value !== "object") return null;
  const card = value as Partial<ConceptCard>;
  if (!card.termEn || !card.termFr || !card.oneLineEn || !card.oneLineFr) return null;
  return {
    termEn: String(card.termEn), termFr: String(card.termFr),
    categoryEn: String(card.categoryEn ?? "Finance concept"), categoryFr: String(card.categoryFr ?? "Concept financier"),
    oneLineEn: String(card.oneLineEn), oneLineFr: String(card.oneLineFr),
    plainEn: String(card.plainEn ?? ""), plainFr: String(card.plainFr ?? ""),
    whyItMattersEn: String(card.whyItMattersEn ?? ""), whyItMattersFr: String(card.whyItMattersFr ?? ""),
    implicationsEn: Array.isArray(card.implicationsEn) ? card.implicationsEn.map(String).slice(0, 6) : [],
    implicationsFr: Array.isArray(card.implicationsFr) ? card.implicationsFr.map(String).slice(0, 6) : [],
    exampleEn: String(card.exampleEn ?? ""), exampleFr: String(card.exampleFr ?? ""),
    formula: String(card.formula ?? ""), formulaExplainEn: String(card.formulaExplainEn ?? ""), formulaExplainFr: String(card.formulaExplainFr ?? ""),
    visual: {
      titleEn: String(card.visual?.titleEn ?? "How the mechanism works"),
      titleFr: String(card.visual?.titleFr ?? "Comment fonctionne le mécanisme"),
      stepsEn: Array.isArray(card.visual?.stepsEn) ? card.visual!.stepsEn.map(String).slice(0, 5) : [],
      stepsFr: Array.isArray(card.visual?.stepsFr) ? card.visual!.stepsFr.map(String).slice(0, 5) : [],
      howToReadEn: String(card.visual?.howToReadEn ?? ""),
      howToReadFr: String(card.visual?.howToReadFr ?? ""),
    },
    relatedEn: Array.isArray(card.relatedEn) ? card.relatedEn.map(String).slice(0, 6) : [],
    relatedFr: Array.isArray(card.relatedFr) ? card.relatedFr.map(String).slice(0, 6) : [],
    commonMistakeEn: String(card.commonMistakeEn ?? ""), commonMistakeFr: String(card.commonMistakeFr ?? ""),
  };
}

export default function ConceptLens() {
  const { isFrench, text } = useLanguage();
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [cards, setCards] = useState<ConceptCard[]>([]);
  const [cardLanguage, setCardLanguage] = useState<"EN" | "FR">(isFrench ? "FR" : "EN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const active = cards[cards.length - 1] ?? null;

  useEffect(() => {
    if (!active) setCardLanguage(isFrench ? "FR" : "EN");
  }, [isFrench, active]);

  const inspectSelection = useCallback(() => {
    window.setTimeout(() => {
      const current = window.getSelection();
      if (!current || current.rangeCount === 0 || current.isCollapsed) {
        setSelection(null);
        return;
      }
      const raw = cleanSelection(current.toString());
      if (!raw || raw.length < 2 || isEditable(current.anchorNode)) {
        setSelection(null);
        return;
      }
      const range = current.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect.width && !rect.height) return;
      setSelection({
        text: raw,
        context: getContext(range),
        x: Math.min(window.innerWidth - 190, Math.max(12, rect.left + rect.width / 2 - 88)),
        y: Math.max(12, rect.top + window.scrollY - 48),
      });
    }, 0);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", inspectSelection);
    document.addEventListener("touchend", inspectSelection);
    return () => {
      document.removeEventListener("mouseup", inspectSelection);
      document.removeEventListener("touchend", inspectSelection);
    };
  }, [inspectSelection]);

  async function persistVocabulary(card: ConceptCard) {
    const key = card.termEn.trim().toLowerCase();
    const record = {
      key,
      termEn: card.termEn,
      termFr: card.termFr,
      oneLineEn: card.oneLineEn,
      oneLineFr: card.oneLineFr,
      categoryEn: card.categoryEn,
      categoryFr: card.categoryFr,
      plainEn: card.plainEn,
      plainFr: card.plainFr,
      exampleEn: card.exampleEn,
      exampleFr: card.exampleFr,
      savedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "[]") as Array<typeof record>;
      const next = [record, ...existing.filter((item) => item.key !== key)].slice(0, 250);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {}

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from("saved_items").upsert({
        user_id: user.id,
        item_type: "vocabulary",
        item_key: key,
        metadata: {
          titleEn: card.termEn,
          titleFr: card.termFr,
          subtitleEn: card.oneLineEn,
          subtitleFr: card.oneLineFr,
          categoryEn: card.categoryEn,
          categoryFr: card.categoryFr,
          plainEn: card.plainEn,
          plainFr: card.plainFr,
          exampleEn: card.exampleEn,
          exampleFr: card.exampleFr,
          href: `/dictionary?q=${encodeURIComponent(card.termEn)}`,
          source: "FinanceStudio Concept Lens",
        },
      }, { onConflict: "user_id,item_type,item_key" });
    } catch {}
  }

  async function createCard() {
    if (!selection || loading) return;
    const selected = selection;
    setSelection(null);
    setLoading(true);
    setError("");
    setSaved(false);

    try {
      const response = await fetch("/api/concept-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selection: selected.text,
          context: selected.context,
          pagePath: window.location.pathname,
        }),
      });
      const payload = await response.json() as { card?: unknown; error?: string };
      const card = normalizeCard(payload.card);
      if (!response.ok || !card) throw new Error(payload.error || text("Could not create the concept card.", "Impossible de créer la fiche concept."));
      setCards((current) => [...current, card]);
      setCardLanguage(isFrench ? "FR" : "EN");
      await persistVocabulary(card);
      setSaved(true);
      window.getSelection()?.removeAllRanges();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : text("Concept Lens is unavailable.", "Concept Lens est indisponible."));
    } finally {
      setLoading(false);
    }
  }

  const local = useCallback((en: string, fr: string) => cardLanguage === "FR" ? fr : en, [cardLanguage]);
  const implications = useMemo(() => active ? (cardLanguage === "FR" ? active.implicationsFr : active.implicationsEn) : [], [active, cardLanguage]);
  const visualSteps = useMemo(() => active ? (cardLanguage === "FR" ? active.visual.stepsFr : active.visual.stepsEn) : [], [active, cardLanguage]);
  const related = useMemo(() => active ? (cardLanguage === "FR" ? active.relatedFr : active.relatedEn) : [], [active, cardLanguage]);

  return (
    <>
      {selection && (
        <button
          type="button"
          className="concept-lens-trigger"
          style={{ left: selection.x, top: selection.y }}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => void createCard()}
        >
          <span>✦</span> {text("Create AI card", "Créer une fiche IA")}
        </button>
      )}

      {loading && (
        <div className="concept-lens-loading" role="status">
          <span className="concept-lens-spark">✦</span>
          <div><strong>{text("Building your concept card…", "Création de ta fiche concept…")}</strong><small>{text("Definition, implications, example and visual explanation", "Définition, implications, exemple et explication visuelle")}</small></div>
        </div>
      )}

      {error && !active && (
        <div className="concept-lens-loading error" role="alert">
          <div><strong>{text("Concept Lens", "Concept Lens")}</strong><small>{error}</small></div>
          <button type="button" onClick={() => setError("")}>×</button>
        </div>
      )}

      {active && (
        <div className="concept-lens-backdrop" role="presentation">
          <article className="concept-lens-modal" role="dialog" aria-modal="true" aria-label={local(active.termEn, active.termFr)}>
            <header className="concept-lens-header">
              <div>
                <span className="mini-label">✦ FINANCESTUDIO CONCEPT LENS</span>
                <span className="concept-lens-category">{local(active.categoryEn, active.categoryFr)}</span>
              </div>
              <div className="concept-lens-controls">
                <div className="segmented" aria-label="Concept card language">
                  <button className={cardLanguage === "EN" ? "selected" : ""} type="button" onClick={() => setCardLanguage("EN")}>EN</button>
                  <button className={cardLanguage === "FR" ? "selected" : ""} type="button" onClick={() => setCardLanguage("FR")}>FR</button>
                </div>
                {cards.length > 1 && <button className="concept-lens-back" type="button" onClick={() => setCards((current) => current.slice(0, -1))}>← {text("Back", "Retour")}</button>}
                <button className="concept-lens-close" type="button" aria-label={text("Close card", "Fermer la fiche")} onClick={() => { setCards([]); setError(""); }}>×</button>
              </div>
            </header>

            <div className="concept-lens-scroll">
              <section className="concept-lens-hero">
                <span>{cardLanguage === "FR" ? active.termEn : active.termFr}</span>
                <h1>{local(active.termEn, active.termFr)}</h1>
                <p>{local(active.oneLineEn, active.oneLineFr)}</p>
                <div className="concept-lens-memory">✓ {saved ? text("Saved automatically to Vocabulary", "Enregistré automatiquement dans Vocabulaire") : text("Vocabulary memory enabled", "Mémorisation vocabulaire activée")}</div>
              </section>

              <section className="concept-lens-grid">
                <article className="concept-lens-block wide">
                  <span className="mini-label">{text("PLAIN LANGUAGE", "EXPLICATION SIMPLE")}</span>
                  <h2>{text("What does it actually mean?", "Qu’est-ce que ça veut vraiment dire ?")}</h2>
                  <p>{local(active.plainEn, active.plainFr)}</p>
                </article>

                <article className="concept-lens-block">
                  <span className="mini-label">{text("WHY IT MATTERS", "POURQUOI C’EST IMPORTANT")}</span>
                  <h2>{text("Financial meaning", "Signification financière")}</h2>
                  <p>{local(active.whyItMattersEn, active.whyItMattersFr)}</p>
                </article>

                <article className="concept-lens-block">
                  <span className="mini-label">{text("CONCRETE EXAMPLE", "EXEMPLE CONCRET")}</span>
                  <h2>{text("Put numbers or a situation around it", "Le voir dans une situation concrète")}</h2>
                  <p>{local(active.exampleEn, active.exampleFr)}</p>
                </article>

                {implications.length > 0 && (
                  <article className="concept-lens-block wide">
                    <span className="mini-label">{text("WHAT IT IMPLIES", "CE QUE CELA IMPLIQUE")}</span>
                    <h2>{text("Transmission and consequences", "Transmission et conséquences")}</h2>
                    <div className="concept-lens-implications">
                      {implications.map((item, index) => <div key={`${item}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
                    </div>
                  </article>
                )}

                {active.formula && (
                  <article className="concept-lens-block formula">
                    <span className="mini-label">{text("FORMULA", "FORMULE")}</span>
                    <h2>{active.formula}</h2>
                    <p>{local(active.formulaExplainEn, active.formulaExplainFr)}</p>
                  </article>
                )}

                {visualSteps.length > 0 && (
                  <article className="concept-lens-block visual wide">
                    <span className="mini-label">{text("VISUAL EXPLANATION", "EXPLICATION VISUELLE")}</span>
                    <h2>{local(active.visual.titleEn, active.visual.titleFr)}</h2>
                    <div className="concept-flow">
                      {visualSteps.map((step, index) => (
                        <div className="concept-flow-piece" key={`${step}-${index}`}>
                          <div><span>{index + 1}</span><strong>{step}</strong></div>
                          {index < visualSteps.length - 1 && <b aria-hidden="true">→</b>}
                        </div>
                      ))}
                    </div>
                    <div className="concept-read-visual">
                      <strong>{text("How to read this visual", "Comment lire ce visuel")}</strong>
                      <p>{local(active.visual.howToReadEn, active.visual.howToReadFr)}</p>
                    </div>
                  </article>
                )}

                <article className="concept-lens-block">
                  <span className="mini-label">{text("COMMON MISTAKE", "ERREUR FRÉQUENTE")}</span>
                  <h2>{text("Do not confuse this with…", "À ne pas confondre avec…")}</h2>
                  <p>{local(active.commonMistakeEn, active.commonMistakeFr)}</p>
                </article>

                <article className="concept-lens-block">
                  <span className="mini-label">{text("RELATED CONCEPTS", "CONCEPTS LIÉS")}</span>
                  <h2>{text("What to explore next", "À explorer ensuite")}</h2>
                  <div className="related-row">{related.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              </section>

              <section className="concept-lens-tip">
                <strong>✦ {text("Highlight inside this card too.", "Tu peux aussi surligner dans cette fiche.")}</strong>
                <p>{text("Select any unfamiliar word, phrase, formula label or concept in this card and create another AI card without closing this one.", "Sélectionne n’importe quel mot, expression, élément de formule ou concept dans cette fiche et crée une nouvelle fiche IA sans fermer celle-ci.")}</p>
              </section>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
