"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useSavedItems } from "@/lib/use-saved-items";
import type { DictionaryEntry } from "@/lib/dictionary-content";

type Level = "Beginner" | "Intermediate" | "Professional";
type ConceptCard = {
  termEn?: string; termFr?: string; categoryEn?: string; categoryFr?: string;
  oneLineEn?: string; oneLineFr?: string; plainEn?: string; plainFr?: string;
  whyItMattersEn?: string; whyItMattersFr?: string;
  implicationsEn?: string[]; implicationsFr?: string[];
  exampleEn?: string; exampleFr?: string; formula?: string;
  formulaExplainEn?: string; formulaExplainFr?: string;
  visual?: { titleEn?: string; titleFr?: string; stepsEn?: string[]; stepsFr?: string[]; howToReadEn?: string; howToReadFr?: string };
  relatedEn?: string[]; relatedFr?: string[];
  commonMistakeEn?: string; commonMistakeFr?: string;
};

const abbreviations: Record<string, { en: string; fr: string }> = {
  GDP: { en: "Gross Domestic Product", fr: "Produit intérieur brut" },
  WACC: { en: "Weighted Average Cost of Capital", fr: "Coût moyen pondéré du capital" },
  DCF: { en: "Discounted Cash Flow", fr: "Actualisation des flux de trésorerie" },
  EPS: { en: "Earnings Per Share", fr: "Bénéfice par action" },
  EBITDA: { en: "Earnings Before Interest, Taxes, Depreciation and Amortization", fr: "Résultat avant intérêts, impôts, dépréciation et amortissement" },
  EBIT: { en: "Earnings Before Interest and Taxes", fr: "Résultat avant intérêts et impôts" },
  FCF: { en: "Free Cash Flow", fr: "Flux de trésorerie disponible" },
  ROE: { en: "Return on Equity", fr: "Rentabilité des capitaux propres" },
  ROIC: { en: "Return on Invested Capital", fr: "Rentabilité du capital investi" },
  IRR: { en: "Internal Rate of Return", fr: "Taux de rendement interne" },
  MOIC: { en: "Multiple on Invested Capital", fr: "Multiple du capital investi" },
  NPV: { en: "Net Present Value", fr: "Valeur actuelle nette" },
  CAPM: { en: "Capital Asset Pricing Model", fr: "Modèle d'évaluation des actifs financiers" },
  FX: { en: "Foreign Exchange", fr: "Marché des changes" },
  IPO: { en: "Initial Public Offering", fr: "Introduction en bourse" },
  LBO: { en: "Leveraged Buyout", fr: "Acquisition avec effet de levier" },
  M&A: { en: "Mergers and Acquisitions", fr: "Fusions-acquisitions" },
  P\u0026L: { en: "Profit and Loss", fr: "Compte de résultat / résultat de trading" },
  VaR: { en: "Value at Risk", fr: "Valeur à risque" },
};

function cleanPair(en: string, fr: string) {
  const clean = (value: string) => value.trim().replace(/\s*\/\s*\/+/g, " / ").replace(/\s+/g, " ");
  const enClean = clean(en);
  const frClean = clean(fr);
  const same = enClean.localeCompare(frClean, undefined, { sensitivity: "accent" }) === 0;
  return { en: enClean, fr: same ? "" : frClean };
}

function abbreviationFor(term: string) {
  const direct = abbreviations[term.trim()];
  if (direct) return direct;
  const upper = term.trim().toUpperCase();
  return abbreviations[upper] ?? null;
}

export default function DictionaryExplorerV2({ entries }: { entries: DictionaryEntry[] }) {
  const { isFrench, text } = useLanguage();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level>("Beginner");
  const [selected, setSelected] = useState<DictionaryEntry | null>(null);
  const [card, setCard] = useState<ConceptCard | null>(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const { authenticated, isSaved, savingKey, toggleSaved } = useSavedItems("dictionary");

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) setQuery(initialQuery);
  }, []);

  const uniqueEntries = useMemo(() => {
    const map = new Map<string, DictionaryEntry>();
    for (const item of entries) {
      const key = item.en.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      if (!key) continue;
      const current = map.get(key);
      if (!current || item.definitionEn.length > current.definitionEn.length) map.set(key, item);
    }
    return [...map.values()];
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return uniqueEntries;
    return uniqueEntries.filter((item) => [item.en, item.fr, item.definitionEn, item.definitionFr, ...item.related].join(" ").toLowerCase().includes(q));
  }, [query, uniqueEntries]);

  async function openCard(item: DictionaryEntry, nextLevel = level) {
    setSelected(item);
    setLevel(nextLevel);
    setCard(null);
    setCardError("");
    setCardLoading(true);
    const pair = cleanPair(item.en, item.fr);
    const expansion = abbreviationFor(pair.en);
    const levelInstruction = nextLevel === "Beginner"
      ? "Explain from zero in very plain language, define every technical term and build intuition first."
      : nextLevel === "Intermediate"
        ? "Explain at university finance level with mechanism, formula intuition, examples and market implications."
        : "Explain at analyst/professional level with nuance, assumptions, edge cases, valuation/market implications and interview-ready precision.";
    try {
      const response = await fetch("/api/concept-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selection: pair.en,
          pagePath: "/dictionary",
          context: [
            `Requested teaching level: ${nextLevel}. ${levelInstruction}`,
            `Known dictionary definition EN: ${item.definitionEn}`,
            `Known dictionary definition FR: ${item.definitionFr}`,
            expansion ? `Abbreviation expansion EN: ${expansion.en}. FR: ${expansion.fr}.` : "",
            `Related curriculum terms: ${item.related.join(", ")}`,
          ].filter(Boolean).join("\n"),
        }),
      });
      const payload = await response.json() as { card?: ConceptCard; error?: string };
      if (!response.ok || !payload.card) throw new Error(payload.error || "AI concept card unavailable");
      setCard(payload.card);
    } catch (error) {
      setCardError(error instanceof Error ? error.message : text("Detailed card unavailable.", "Fiche détaillée indisponible."));
    } finally {
      setCardLoading(false);
    }
  }

  function closeCard() {
    setSelected(null);
    setCard(null);
    setCardError("");
  }

  return (
    <div className="workspace-stack dictionary-v2">
      <section className="dictionary-toolbar dictionary-toolbar-v2">
        <label>
          <span className="control-label">{text("SEARCH ENGLISH OR FRENCH", "RECHERCHER EN FRANÇAIS OU EN ANGLAIS")}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text("Try: duration, yield, GDP, WACC…", "Essaie : duration, rendement, PIB, WACC…")} />
        </label>
        <div><span className="control-label">{text("DEFAULT EXPLANATION LEVEL", "NIVEAU D'EXPLICATION PAR DÉFAUT")}</span><div className="chip-row level-row">{(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => <button key={item} type="button" className={level === item ? "chip active" : "chip"} onClick={() => setLevel(item)}>{item === "Beginner" ? text("Beginner", "Débutant") : item === "Intermediate" ? text("Intermediate", "Intermédiaire") : text("Professional", "Professionnel")}</button>)}</div></div>
      </section>

      <section className="dictionary-result-meta"><span className="mini-label">{filtered.length} / {uniqueEntries.length} {text("TERMS", "TERMES")}</span><p>{text("One English term + one French translation. Acronyms are expanded when available. Click any card to study the concept deeply.", "Un terme anglais + une traduction française. Les abréviations sont développées lorsqu'elles sont connues. Clique sur une carte pour étudier la notion en profondeur.")}</p></section>

      <section className="dictionary-grid dictionary-grid-v2">
        {filtered.map((item) => {
          const pair = cleanPair(item.en, item.fr);
          const expansion = abbreviationFor(pair.en);
          return <article className="dictionary-card dictionary-card-v2" key={pair.en} onClick={() => void openCard(item)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") void openCard(item); }}>
            <div className="dictionary-card-head">
              <div className="dictionary-term-stack"><span className="mini-label">{text("FINANCE TERM", "TERME FINANCIER")}</span><h2>{pair.en}</h2>{pair.fr ? <h3>{pair.fr}</h3> : null}{expansion ? <p className="dictionary-expansion"><strong>{pair.en}</strong> = {isFrench ? expansion.fr : expansion.en}</p> : null}</div>
              <button type="button" className="save-item-button compact" aria-pressed={isSaved(item.en)} disabled={savingKey === item.en} onClick={(event) => { event.stopPropagation(); void toggleSaved(item.en, { titleEn: pair.en, titleFr: pair.fr || pair.en, subtitleEn: item.definitionEn, subtitleFr: item.definitionFr, href: `/dictionary?q=${encodeURIComponent(item.en)}`, source: "FinanceStudio Dictionary" }); }}><span aria-hidden="true">{isSaved(item.en) ? "★" : "☆"}</span>{savingKey === item.en ? text("Saving…", "Enregistrement…") : isSaved(item.en) ? text("Saved", "Enregistré") : authenticated ? text("Save", "Enregistrer") : text("Sign in", "Se connecter")}</button>
            </div>
            <p className="dictionary-definition"><strong>{text("Definition", "Définition")}</strong><br />{isFrench ? item.definitionFr : item.definitionEn}</p>
            <div className="dictionary-card-footer"><span>{text("Open professional study card", "Ouvrir la fiche d'étude complète")}</span><b>→</b></div>
          </article>;
        })}
      </section>

      {selected ? <div className="dictionary-modal-backdrop" role="dialog" aria-modal="true" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCard(); }}>
        <article className="dictionary-study-modal">
          <header className="dictionary-study-head">
            <div><span className="mini-label">{text("PROFESSIONAL CONCEPT SHEET", "FICHE CONCEPT PROFESSIONNELLE")}</span><h2>{cleanPair(selected.en, selected.fr).en}</h2><p>{cleanPair(selected.en, selected.fr).fr}</p></div>
            <button className="dictionary-close-button" type="button" onClick={closeCard} aria-label={text("Close study card", "Fermer la fiche")}>×</button>
          </header>

          <div className="dictionary-study-levels">{(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => <button type="button" key={item} className={level === item ? "chip active" : "chip"} onClick={() => void openCard(selected, item)}>{item === "Beginner" ? text("Beginner", "Débutant") : item === "Intermediate" ? text("Intermediate", "Intermédiaire") : text("Professional", "Professionnel")}</button>)}</div>

          {cardLoading ? <div className="dictionary-study-loading"><strong>{text("Building your study sheet…", "Construction de ta fiche…")}</strong><p>{text("FinanceStudio is adapting the concept to your selected level.", "FinanceStudio adapte la notion au niveau choisi.")}</p></div> : null}
          {cardError ? <div className="inline-status">{cardError}<p>{isFrench ? selected.definitionFr : selected.definitionEn}</p></div> : null}

          {card ? <div className="dictionary-study-body">
            <section className="study-hero"><span className="mini-label">{isFrench ? card.categoryFr : card.categoryEn}</span><h3>{isFrench ? card.oneLineFr : card.oneLineEn}</h3><p>{isFrench ? card.plainFr : card.plainEn}</p></section>
            <section className="study-grid-two"><article><span className="control-label">{text("WHY IT MATTERS", "POURQUOI C'EST IMPORTANT")}</span><p>{isFrench ? card.whyItMattersFr : card.whyItMattersEn}</p></article><article><span className="control-label">{text("CONCRETE EXAMPLE", "EXEMPLE CONCRET")}</span><p>{isFrench ? card.exampleFr : card.exampleEn}</p></article></section>
            <section className="study-impact-panel"><span className="control-label">{text("IMPLICATIONS / TRANSMISSION", "IMPACTS / TRANSMISSION")}</span><div className="study-impact-flow">{(isFrench ? card.implicationsFr : card.implicationsEn)?.map((step, index) => <div key={`${step}-${index}`}><span>{index + 1}</span><p>{step}</p>{index < ((isFrench ? card.implicationsFr : card.implicationsEn)?.length ?? 0) - 1 ? <b>→</b> : null}</div>)}</div></section>
            {card.formula ? <section className="study-formula"><span className="control-label">{text("FORMULA & INTUITION", "FORMULE & INTUITION")}</span><code>{card.formula}</code><p>{isFrench ? card.formulaExplainFr : card.formulaExplainEn}</p></section> : null}
            {card.visual ? <section className="study-visual"><span className="control-label">{text("VISUAL / HOW TO READ IT", "VISUEL / COMMENT LE LIRE")}</span><h3>{isFrench ? card.visual.titleFr : card.visual.titleEn}</h3><div className="study-visual-flow">{(isFrench ? card.visual.stepsFr : card.visual.stepsEn)?.map((step, index) => <div key={`${step}-${index}`}><span>{index + 1}</span><strong>{step}</strong></div>)}</div><p><strong>{text("How to read it:", "Comment le lire :")}</strong> {isFrench ? card.visual.howToReadFr : card.visual.howToReadEn}</p></section> : null}
            <section className="study-grid-two"><article><span className="control-label">{text("COMMON MISTAKE", "ERREUR FRÉQUENTE")}</span><p>{isFrench ? card.commonMistakeFr : card.commonMistakeEn}</p></article><article><span className="control-label">{text("RELATED CONCEPTS", "CONCEPTS LIÉS")}</span><div className="related-row">{(isFrench ? card.relatedFr : card.relatedEn)?.map((term) => <button className="chip" type="button" key={term} onClick={() => { setQuery(term); closeCard(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{term}</button>)}</div></article></section>
            <section className="study-source-links"><span className="control-label">{text("LEARN IT IN THE CURRICULUM", "L'APPRENDRE DANS LE CURSUS")}</span><div className="related-row">{selected.sources.slice(0, 6).map((source) => <Link href={`/university/${source.slug}`} key={source.slug}>{isFrench ? source.fr : source.en} →</Link>)}</div></section>
          </div> : null}
        </article>
      </div> : null}
    </div>
  );
}
