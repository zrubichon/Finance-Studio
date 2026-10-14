"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useSavedItems } from "@/lib/use-saved-items";
import type { DictionaryEntry } from "@/lib/dictionary-content";

type Level = "Beginner" | "Intermediate" | "Professional";
type StudyLanguage = "EN" | "FR";
type ConceptCard = {
  categoryEn?: string; categoryFr?: string; oneLineEn?: string; oneLineFr?: string;
  plainEn?: string; plainFr?: string; whyItMattersEn?: string; whyItMattersFr?: string;
  implicationsEn?: string[]; implicationsFr?: string[]; exampleEn?: string; exampleFr?: string;
  formula?: string; formulaExplainEn?: string; formulaExplainFr?: string;
  visual?: { titleEn?: string; titleFr?: string; stepsEn?: string[]; stepsFr?: string[]; howToReadEn?: string; howToReadFr?: string };
  relatedEn?: string[]; relatedFr?: string[]; commonMistakeEn?: string; commonMistakeFr?: string;
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
  "M&A": { en: "Mergers and Acquisitions", fr: "Fusions-acquisitions" },
  "P&L": { en: "Profit and Loss", fr: "Compte de résultat / résultat de trading" },
  VaR: { en: "Value at Risk", fr: "Valeur à risque" },
};

const translationOverrides: Record<string, string> = {
  "accretion / dilution": "relution / dilution",
  accretive: "relutif / relutive",
  "add-back": "réintégration / ajustement",
  "adverse selection": "sélection adverse",
  "allocation effect": "effet d’allocation",
  alpha: "alpha",
};

function tidy(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function pair(en: string, fr: string) {
  const a = tidy(en);
  const originalFr = tidy(fr);
  const override = translationOverrides[a.toLowerCase()];
  const b = override || originalFr || a;
  return { en: a, fr: b };
}

function expansion(term: string) {
  return abbreviations[term.trim()] ?? abbreviations[term.trim().toUpperCase()] ?? null;
}

function firstLetter(value: string) {
  const normalized = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const match = normalized.match(/[A-Za-z]/);
  return match ? match[0].toUpperCase() : "#";
}

export default function DictionaryExplorerV2({ entries }: { entries: DictionaryEntry[] }) {
  const { isFrench, text } = useLanguage();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level>("Beginner");
  const [selected, setSelected] = useState<DictionaryEntry | null>(null);
  const [card, setCard] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeLetter, setActiveLetter] = useState("ALL");
  const [studyLanguage, setStudyLanguage] = useState<StudyLanguage>(isFrench ? "FR" : "EN");
  const { authenticated, isSaved, savingKey, toggleSaved } = useSavedItems("dictionary");

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQuery(initial);
  }, []);

  useEffect(() => {
    if (!selected) setStudyLanguage(isFrench ? "FR" : "EN");
  }, [isFrench, selected]);

  const uniqueEntries = useMemo(() => {
    const map = new Map<string, DictionaryEntry>();
    for (const item of entries) {
      const key = item.en.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      const old = map.get(key);
      if (key && (!old || item.definitionEn.length > old.definitionEn.length)) map.set(key, item);
    }
    return [...map.values()];
  }, [entries]);

  const letters = useMemo(() => {
    const found = new Set(uniqueEntries.map((item) => firstLetter(isFrench ? pair(item.en, item.fr).fr : pair(item.en, item.fr).en)));
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((letter) => found.has(letter));
  }, [isFrench, uniqueEntries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return uniqueEntries.filter((item) => {
      const names = pair(item.en, item.fr);
      const matchesQuery = !q || [names.en, names.fr, item.definitionEn, item.definitionFr, ...item.related].join(" ").toLowerCase().includes(q);
      const languageTerm = isFrench ? names.fr : names.en;
      const matchesLetter = activeLetter === "ALL" || firstLetter(languageTerm) === activeLetter;
      return matchesQuery && matchesLetter;
    });
  }, [query, uniqueEntries, activeLetter, isFrench]);

  async function openStudy(item: DictionaryEntry, nextLevel: Level = level) {
    setSelected(item); setLevel(nextLevel); setCard(null); setError(""); setLoading(true);
    setStudyLanguage(isFrench ? "FR" : "EN");
    const names = pair(item.en, item.fr);
    const exp = expansion(names.en);
    const levelNote = nextLevel === "Beginner"
      ? "Teach from zero in plain language. Define every technical word."
      : nextLevel === "Intermediate"
        ? "Teach at university finance level with mechanisms, formulas, examples and market implications."
        : "Teach at analyst/professional depth with assumptions, edge cases, valuation/market implications and interview precision.";
    try {
      const response = await fetch("/api/concept-card", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ selection: names.en, pagePath: "/dictionary", context: [`Requested level: ${nextLevel}. ${levelNote}`, `Definition EN: ${item.definitionEn}`, `Definition FR: ${item.definitionFr}`, `French term: ${names.fr}`, exp ? `Acronym expansion EN: ${exp.en}. FR: ${exp.fr}.` : "", `Related: ${item.related.join(", ")}`].filter(Boolean).join("\n") }) });
      const payload = await response.json() as { card?: ConceptCard; error?: string };
      if (!response.ok || !payload.card) throw new Error(payload.error || "AI concept card unavailable");
      setCard(payload.card);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : text("Detailed card unavailable.", "Fiche détaillée indisponible."));
    } finally { setLoading(false); }
  }

  function close() { setSelected(null); setCard(null); setError(""); }

  const studyFrench = studyLanguage === "FR";

  return <div className="workspace-stack dictionary-v2">
    <section className="dictionary-toolbar dictionary-toolbar-v2">
      <label><span className="control-label">{text("SEARCH ENGLISH OR FRENCH", "RECHERCHER EN FRANÇAIS OU EN ANGLAIS")}</span><input value={query} onChange={(event) => { setQuery(event.target.value); setActiveLetter("ALL"); }} placeholder={text("Try: duration, yield, GDP, WACC…", "Essaie : duration, rendement, PIB, WACC…")} /></label>
      <div><span className="control-label">{text("DEFAULT EXPLANATION LEVEL", "NIVEAU D'EXPLICATION PAR DÉFAUT")}</span><div className="chip-row level-row">{(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => <button key={item} type="button" className={level === item ? "chip active" : "chip"} onClick={() => setLevel(item)}>{item === "Beginner" ? text("Beginner", "Débutant") : item === "Intermediate" ? text("Intermediate", "Intermédiaire") : text("Professional", "Professionnel")}</button>)}</div></div>
    </section>

    <nav className="dictionary-alpha-nav" aria-label={text("Alphabetical dictionary navigation", "Navigation alphabétique du dictionnaire")}>
      <button type="button" className={activeLetter === "ALL" ? "active" : ""} onClick={() => { setActiveLetter("ALL"); setQuery(""); }}>∞</button>
      {letters.map((letter) => <button type="button" key={letter} className={activeLetter === letter ? "active" : ""} onClick={() => { setActiveLetter(letter); setQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{letter}</button>)}
    </nav>

    <section className="dictionary-result-meta"><span className="mini-label">{filtered.length} / {uniqueEntries.length} {text("TERMS", "TERMES")}</span><p>{text("English and French stay visible together. The alphabet follows the language selected for the page.", "L'anglais et le français restent visibles ensemble. L'alphabet suit la langue choisie pour la page.")}</p></section>

    <section className="dictionary-grid dictionary-grid-v2">
      {filtered.map((item) => {
        const names = pair(item.en, item.fr); const exp = expansion(names.en);
        return <article className="dictionary-card dictionary-card-v2" key={names.en} role="button" tabIndex={0} onClick={() => void openStudy(item)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") void openStudy(item); }}>
          <div className="dictionary-card-head">
            <div className="dictionary-term-stack"><span className="mini-label">{text("FINANCE TERM", "TERME FINANCIER")}</span><h2>{names.en}</h2><h3>FR · {names.fr}</h3>{exp ? <p className="dictionary-expansion"><strong>{names.en}</strong> = {exp.en}<br /><strong>FR</strong> = {exp.fr}</p> : null}</div>
            <button type="button" className="save-item-button compact" aria-pressed={isSaved(item.en)} disabled={savingKey === item.en} onClick={(event) => { event.stopPropagation(); void toggleSaved(item.en, { titleEn: names.en, titleFr: names.fr, subtitleEn: item.definitionEn, subtitleFr: item.definitionFr, href: `/dictionary?q=${encodeURIComponent(item.en)}`, source: "FinanceStudio Dictionary" }); }}><span aria-hidden="true">{isSaved(item.en) ? "★" : "☆"}</span>{savingKey === item.en ? text("Saving…", "Enregistrement…") : isSaved(item.en) ? text("Saved", "Enregistré") : authenticated ? text("Save", "Enregistrer") : text("Sign in", "Se connecter")}</button>
          </div>
          <p className="dictionary-definition"><strong>{text("Definition", "Définition")}</strong><br />{isFrench ? item.definitionFr : item.definitionEn}</p>
          <div className="dictionary-card-footer"><span>{text("Open full study sheet", "Ouvrir la fiche complète")}</span><b>→</b></div>
        </article>;
      })}
    </section>

    {selected ? <div className="dictionary-modal-backdrop" role="dialog" aria-modal="true" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <article className="dictionary-study-modal">
        <header className="dictionary-study-head"><div><span className="mini-label">{studyFrench ? "FICHE CONCEPT PROFESSIONNELLE" : "PROFESSIONAL CONCEPT SHEET"}</span><h2>{studyFrench ? pair(selected.en, selected.fr).fr : pair(selected.en, selected.fr).en}</h2><p>{studyFrench ? `EN · ${pair(selected.en, selected.fr).en}` : `FR · ${pair(selected.en, selected.fr).fr}`}</p></div><button className="dictionary-close-button" type="button" onClick={close} aria-label={studyFrench ? "Fermer" : "Close"}>×</button></header>
        <div className="dictionary-study-toolbar">
          <div className="dictionary-study-levels">{(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => <button type="button" key={item} className={level === item ? "chip active" : "chip"} onClick={() => void openStudy(selected, item)}>{item === "Beginner" ? (studyFrench ? "Débutant" : "Beginner") : item === "Intermediate" ? (studyFrench ? "Intermédiaire" : "Intermediate") : (studyFrench ? "Professionnel" : "Professional")}</button>)}</div>
          <div className="dictionary-study-language" aria-label="Study language"><button type="button" className={studyLanguage === "EN" ? "active" : ""} onClick={() => setStudyLanguage("EN")}>EN</button><button type="button" className={studyLanguage === "FR" ? "active" : ""} onClick={() => setStudyLanguage("FR")}>FR</button></div>
        </div>
        {loading ? <div className="dictionary-study-loading"><strong>{studyFrench ? "Construction de ta fiche…" : "Building your study sheet…"}</strong><p>{studyFrench ? "L'explication est adaptée au niveau choisi." : "The explanation is being adapted to your selected level."}</p></div> : null}
        {error ? <div className="inline-status">{error}<p>{studyFrench ? selected.definitionFr : selected.definitionEn}</p></div> : null}
        {card ? <div className="dictionary-study-body">
          <section className="study-hero"><span className="mini-label">{studyFrench ? card.categoryFr : card.categoryEn}</span><h3>{studyFrench ? card.oneLineFr : card.oneLineEn}</h3><p>{studyFrench ? card.plainFr : card.plainEn}</p></section>
          <section className="study-grid-two"><article><span className="control-label">{studyFrench ? "POURQUOI C'EST IMPORTANT" : "WHY IT MATTERS"}</span><p>{studyFrench ? card.whyItMattersFr : card.whyItMattersEn}</p></article><article><span className="control-label">{studyFrench ? "EXEMPLE CONCRET" : "CONCRETE EXAMPLE"}</span><p>{studyFrench ? card.exampleFr : card.exampleEn}</p></article></section>
          <section className="study-impact-panel"><span className="control-label">{studyFrench ? "IMPACTS / TRANSMISSION" : "IMPLICATIONS / TRANSMISSION"}</span><div className="study-impact-flow">{(studyFrench ? card.implicationsFr : card.implicationsEn)?.map((step, index, all) => <div key={`${step}-${index}`}><span>{index + 1}</span><p>{step}</p>{index < all.length - 1 ? <b>→</b> : null}</div>)}</div></section>
          {card.formula ? <section className="study-formula"><span className="control-label">{studyFrench ? "FORMULE & INTUITION" : "FORMULA & INTUITION"}</span><code>{card.formula}</code><p>{studyFrench ? card.formulaExplainFr : card.formulaExplainEn}</p></section> : null}
          {card.visual ? <section className="study-visual"><span className="control-label">{studyFrench ? "VISUEL / COMMENT LE LIRE" : "VISUAL / HOW TO READ IT"}</span><h3>{studyFrench ? card.visual.titleFr : card.visual.titleEn}</h3><div className="study-visual-flow">{(studyFrench ? card.visual.stepsFr : card.visual.stepsEn)?.map((step, index) => <div key={`${step}-${index}`}><span>{index + 1}</span><strong>{step}</strong></div>)}</div><p><strong>{studyFrench ? "Comment le lire :" : "How to read it:"}</strong> {studyFrench ? card.visual.howToReadFr : card.visual.howToReadEn}</p></section> : null}
          <section className="study-grid-two"><article><span className="control-label">{studyFrench ? "ERREUR FRÉQUENTE" : "COMMON MISTAKE"}</span><p>{studyFrench ? card.commonMistakeFr : card.commonMistakeEn}</p></article><article><span className="control-label">{studyFrench ? "CONCEPTS LIÉS" : "RELATED CONCEPTS"}</span><div className="related-row">{(studyFrench ? card.relatedFr : card.relatedEn)?.map((term) => <button className="chip" type="button" key={term} onClick={() => { setQuery(term); close(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{term}</button>)}</div></article></section>
          <section className="study-source-links"><span className="control-label">{studyFrench ? "L'APPRENDRE DANS LE CURSUS" : "LEARN IT IN THE CURRICULUM"}</span><div className="related-row">{selected.sources.slice(0, 6).map((source) => <Link href={`/university/${source.slug}`} key={source.slug}>{studyFrench ? source.fr : source.en} →</Link>)}</div></section>
        </div> : null}
      </article>
    </div> : null}
  </div>;
}
