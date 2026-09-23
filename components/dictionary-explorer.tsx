"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useSavedItems } from "@/lib/use-saved-items";
import type { DictionaryEntry } from "@/lib/dictionary-content";

export default function DictionaryExplorer({ entries }: { entries: DictionaryEntry[] }) {
  const { isFrench, text } = useLanguage();
  const [query, setQuery] = useState("");
  const [professional, setProfessional] = useState(false);
  const {
    authenticated,
    isSaved,
    savingKey,
    toggleSaved,
  } = useSavedItems("dictionary");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;

    return entries.filter((item) =>
      [
        item.en,
        item.fr,
        item.definitionEn,
        item.definitionFr,
        ...item.related,
        ...item.sources.flatMap((source) => [source.en, source.fr]),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [entries, query]);

  return (
    <div className="workspace-stack">
      <section className="dictionary-toolbar">
        <label>
          <span className="control-label">
            {text("SEARCH ENGLISH OR FRENCH", "RECHERCHER EN FRANÇAIS OU EN ANGLAIS")}
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text(
              "Try: duration, yield, WACC, leverage…",
              "Essaie : duration, rendement, WACC, leverage…",
            )}
          />
        </label>

        <div>
          <span className="control-label">{text("TEACHING CONTEXT", "CONTEXTE PÉDAGOGIQUE")}</span>
          <div className="chip-row">
            <button
              className={!professional ? "chip active" : "chip"}
              onClick={() => setProfessional(false)}
              type="button"
            >
              {text("Beginner", "Débutant")}
            </button>
            <button
              className={professional ? "chip active" : "chip"}
              onClick={() => setProfessional(true)}
              type="button"
            >
              {text("Professional", "Professionnel")}
            </button>
          </div>
        </div>
      </section>

      <section className="dictionary-result-meta">
        <span className="mini-label">
          {isFrench
            ? `${filtered.length} TERMES SUR ${entries.length}`
            : `${filtered.length} OF ${entries.length} TERMS`}
        </span>
        <p>
          {text(
            "This dictionary is generated from the vocabulary taught across all published Finance University lessons. New lesson vocabulary is added automatically.",
            "Ce dictionnaire est généré à partir du vocabulaire enseigné dans tous les cours publiés de Finance University. Le vocabulaire des nouveaux cours est ajouté automatiquement.",
          )}
        </p>
      </section>

      <section className="dictionary-grid">
        {filtered.map((item) => {
          const definition = isFrench ? item.definitionFr : item.definitionEn;
          const context = professional
            ? (isFrench ? item.professionalContextFr : item.professionalContextEn)
            : (isFrench ? item.beginnerContextFr : item.beginnerContextEn);

          return (
            <article className="dictionary-card" key={item.en}>
              <div className="dictionary-card-head">
                <span className="mini-label">{isFrench ? item.en : item.fr}</span>
                <button
                  type="button"
                  className="save-item-button compact"
                  aria-pressed={isSaved(item.en)}
                  disabled={savingKey === item.en}
                  onClick={() =>
                    void toggleSaved(item.en, {
                      titleEn: item.en,
                      titleFr: item.fr,
                      subtitleEn: item.definitionEn,
                      subtitleFr: item.definitionFr,
                      href: `/dictionary?q=${encodeURIComponent(item.en)}`,
                      source: "FinanceStudio Dictionary",
                    })
                  }
                >
                  <span aria-hidden="true">{isSaved(item.en) ? "★" : "☆"}</span>
                  {savingKey === item.en
                    ? text("Saving…", "Enregistrement…")
                    : isSaved(item.en)
                      ? text("Saved", "Enregistré")
                      : authenticated
                        ? text("Save", "Enregistrer")
                        : text("Sign in", "Se connecter")}
                </button>
              </div>
              <h2>{isFrench ? `${item.fr} / ${item.en}` : `${item.en} / ${item.fr}`}</h2>
              <p><strong>{text("Definition:", "Définition :")}</strong> {definition}</p>

              <div className="lesson-explanation">
                <div className="lesson-explanation-label">
                  <span>{professional ? text("Professional context", "Contexte professionnel") : text("Beginner context", "Contexte débutant")}</span>
                </div>
                <p>{context}</p>
              </div>

              {item.related.length > 0 && (
                <div className="related-row">
                  {item.related.map((term) => <span key={term}>{term}</span>)}
                </div>
              )}

              <div className="related-row">
                {item.sources.slice(0, 4).map((source) => (
                  <Link href={`/university/${source.slug}`} key={source.slug}>
                    {isFrench ? source.fr : source.en} →
                  </Link>
                ))}
                {item.sources.length > 4 && (
                  <span>
                    +{item.sources.length - 4} {text("lessons", "cours")}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {filtered.length === 0 && (
        <div className="empty-state">
          <strong>{text("No matching curriculum term.", "Aucun terme du programme ne correspond.")}</strong>
          <p>{text(
            "Try an English term, its French equivalent, a related concept or a lesson name.",
            "Essaie un terme anglais, son équivalent français, un concept lié ou le nom d’un cours.",
          )}</p>
        </div>
      )}
    </div>
  );
}
