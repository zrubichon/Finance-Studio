"use client";
import StudyNotebook from "./study-notebook";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {dictionaryTarget, dictionaryTermId} from "@/lib/dictionary-search";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useSavedItems } from "@/lib/use-saved-items";
import type { DictionaryEntry } from "@/lib/dictionary-content";

function initialLetter(value: string) {
  return value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase();
}

export default function DictionaryExplorer({ entries }: { entries: DictionaryEntry[] }) {
  const { isFrench, text } = useLanguage();
  const params=useSearchParams();
  const requestedTerm=params.get("term") || params.get("q") || "";
  const target=dictionaryTarget(entries,requestedTerm);
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("");
  const [professional, setProfessional] = useState(false);
  const [aiKey, setAiKey] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const resultsRef = useRef<HTMLElement | null>(null);
  const { authenticated, isSaved, savingKey, toggleSaved } = useSavedItems("dictionary");

  useEffect(() => {
    setQuery(target?.en || requestedTerm);setLetter("");
  }, [requestedTerm, target?.en]);

  useEffect(() => {
    if(!requestedTerm)return;
    const frame=requestAnimationFrame(()=>{
      const card=target?document.getElementById(dictionaryTermId(target.en)):resultsRef.current;
      card?.scrollIntoView({behavior:"smooth",block:"start"});
    });
    return ()=>cancelAnimationFrame(frame);
  },[requestedTerm,target?.en,query]);

  useEffect(() => {setLetter("");}, [isFrench]);

  const alphabet = useMemo(() => {
    const values = entries.map((item) => initialLetter(isFrench ? item.fr : item.en)).filter((value) => /^[A-Z]$/.test(value));
    return Array.from(new Set(values)).sort();
  }, [entries, isFrench]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const found = entries.filter((item) => {
      const primary = isFrench ? item.fr : item.en;
      if (letter && initialLetter(primary) !== letter) return false;
      if (!q) return true;
      return [item.en, item.fr, item.definitionEn, item.definitionFr, ...item.related, ...item.sources.flatMap((source) => [source.en, source.fr])].join(" ").toLowerCase().includes(q);
    }).sort((a,b) => (isFrench?a.fr:a.en).localeCompare(isFrench?b.fr:b.en,isFrench?"fr":"en"));
    if(target && query===target.en) return [target,...found.filter(item=>item.en!==target.en)];
    return found;
  }, [entries, query, letter, isFrench, target]);

  async function createStudySheet(item: DictionaryEntry) {
    setAiKey(item.en); setAiAnswer(""); setAiLoading(true);
    try {
      const sources = item.sources.slice(0, 6).map((source) => isFrench ? source.fr : source.en).join(", ");
      const response = await fetch("/api/professor", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseStyle: "study", language: isFrench ? "FR" : "EN", mode: professional ? "Professional" : "Beginner", action: "explain",
          lessonSlug: item.sources[0]?.slug || null,
          message: isFrench
            ? `Explique-moi « ${item.fr} / ${item.en} » comme un professeur. Définition : ${item.definitionFr}. Contexte : ${item.beginnerContextFr}. Concepts liés : ${item.related.join(", ")}. Cours : ${sources}. Je veux une explication vivante, des schémas, des exemples chiffrés et des nuances, pas des listes de conseils ni ta démarche.`
            : `Teach me “${item.en} / ${item.fr}” as a professor. Definition: ${item.definitionEn}. Context: ${item.beginnerContextEn}. Connected concepts: ${item.related.join(", ")}. Lessons: ${sources}. Give a vivid explanation, diagrams, worked numerical examples and nuances, not advice checklists or commentary about your process.`,
        }),
      });
      const payload = await response.json() as { answer?: string; error?: string };
      setAiAnswer(payload.answer || payload.error || text("AI study sheet unavailable right now.", "La fiche IA est temporairement indisponible."));
    } catch { setAiAnswer(text("AI study sheet unavailable right now.", "La fiche IA est temporairement indisponible.")); }
    finally { setAiLoading(false); }
  }

  return (
    <div className="workspace-stack">
      <section className="dictionary-toolbar">
        <label><span className="control-label">{text("SEARCH ENGLISH OR FRENCH", "RECHERCHER EN FRANÇAIS OU EN ANGLAIS")}</span><input value={query} onChange={(event) => { setQuery(event.target.value); setLetter(""); }} placeholder={text("Try: duration, yield, WACC, leverage…", "Essaie : duration, rendement, WACC, leverage…")} /></label>
        <div><span className="control-label">{text("TEACHING CONTEXT", "CONTEXTE PÉDAGOGIQUE")}</span><div className="chip-row"><button className={!professional ? "chip active" : "chip"} onClick={() => setProfessional(false)} type="button">{text("Beginner", "Débutant")}</button><button className={professional ? "chip active" : "chip"} onClick={() => setProfessional(true)} type="button">{text("Professional", "Professionnel")}</button></div></div>
      </section>

      <nav className="dictionary-alphabet" aria-label={text("Alphabetical dictionary navigation", "Navigation alphabétique du dictionnaire")}>
        <button className={!letter ? "active" : ""} type="button" onClick={() => { setLetter(""); setQuery(""); }}>{text("ALL","TOUS")}</button>
        {alphabet.map((value) => <button key={value} className={letter === value ? "active" : ""} type="button" onClick={() => { setLetter(value); setQuery(""); resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{value}</button>)}
      </nav>

      <section id="dictionary-results" ref={resultsRef} className="dictionary-result-meta">
        <span className="mini-label">{isFrench ? `${filtered.length} TERMES SUR ${entries.length}` : `${filtered.length} OF ${entries.length} TERMS`}</span>
        <p>{text("The alphabet automatically follows the active language, so English and French terms are indexed by their own first letter. Each card connects definition, intuition, examples, related concepts and the actual Finance University lessons where the term is taught.", "L’alphabet suit automatiquement la langue active : les termes français et anglais sont donc classés selon leur propre première lettre. Chaque fiche relie définition, intuition, exemples, notions liées et vrais cours de Finance University.")}</p>
      </section>

      <section className="dictionary-grid">
        {filtered.map((item) => {
          const definition = isFrench ? item.definitionFr : item.definitionEn;
          const context = professional ? (isFrench ? item.professionalContextFr : item.professionalContextEn) : (isFrench ? item.beginnerContextFr : item.beginnerContextEn);
          return (
            <article className={`dictionary-card${target?.en===item.en ? " dictionary-target" : ""}`} id={dictionaryTermId(item.en)} key={item.en}>
              <div className="dictionary-card-head"><span className="mini-label">{text("FINANCE DICTIONARY","DICTIONNAIRE FINANCIER")}</span><button type="button" className="save-item-button compact" aria-pressed={isSaved(item.en)} disabled={savingKey === item.en} onClick={() => void toggleSaved(item.en, { titleEn: item.en, titleFr: item.fr, subtitleEn: item.definitionEn, subtitleFr: item.definitionFr, href: `/dictionary?term=${encodeURIComponent(item.en)}`, source: "FinanceStudio Dictionary" })}><span aria-hidden="true">{isSaved(item.en) ? "★" : "☆"}</span>{savingKey === item.en ? text("Saving…", "Enregistrement…") : isSaved(item.en) ? text("Saved", "Enregistré") : authenticated ? text("Save", "Enregistrer") : text("Sign in", "Se connecter")}</button></div>
              <h2>{isFrench ? item.fr : item.en}</h2>{item.fr.toLocaleLowerCase() !== item.en.toLocaleLowerCase() && <p className="dictionary-translation">{isFrench ? "EN" : "FR"} · {isFrench ? item.en : item.fr}</p>}
              <p><strong>{text("Definition:", "Définition :")}</strong> {definition}</p>
              <div className="lesson-explanation"><div className="lesson-explanation-label"><span>{professional ? text("Professional explanation", "Explication professionnelle") : text("Plain-language explanation", "Explication simple")}</span></div><p>{context}</p></div>
              <div className="lesson-explanation"><div className="lesson-explanation-label"><span>{text("How to think about it", "Comment le comprendre")}</span></div><p>{text(`Do not memorize ${item.en} as an isolated definition. Ask what variable it measures, what can make it change, what it affects next, and which decision in valuation, markets, accounting or investing uses it.`, `Ne mémorise pas ${item.fr} comme une définition isolée. Demande-toi quelle variable le terme mesure, ce qui peut la faire bouger, ce qu’elle affecte ensuite et dans quelle décision de valorisation, marchés, comptabilité ou investing elle est utilisée.`)}</p></div>
              {item.related.length > 0 && <><span className="control-label">{text("CONNECTED CONCEPTS", "NOTIONS CONNECTÉES")}</span><div className="related-row">{item.related.map((term) => <Link key={term} href={`/dictionary?q=${encodeURIComponent(term)}`}>{term}</Link>)}</div></>}
              <span className="control-label">{text("RELATED LESSONS", "COURS LIÉS")}</span>
              <div className="related-row">{item.sources.slice(0, 6).map((source) => <Link href={`/university/${source.slug}`} key={source.slug}>{isFrench ? source.fr : source.en} →</Link>)}{item.sources.length > 6 && <span>+{item.sources.length - 6} {text("lessons", "cours")}</span>}</div>
              <div className="dictionary-deep-actions"><button type="button" onClick={() => void createStudySheet(item)}>✦ {text("Create detailed AI study sheet", "Créer une fiche IA détaillée")}</button></div>
              {aiKey === item.en && <div className="dictionary-ai-sheet">{aiLoading ? text("Building the full study sheet…", "Création du cours détaillé…") : <StudyNotebook content={aiAnswer} />}</div>}
            </article>
          );
        })}
      </section>

      {filtered.length === 0 && <div className="empty-state"><strong>{text("No matching curriculum term.", "Aucun terme du programme ne correspond.")}</strong><p>{text("Try another letter, an English term, its French equivalent, a related concept or a lesson name.", "Essaie une autre lettre, un terme anglais, son équivalent français, un concept lié ou le nom d’un cours.")}</p></div>}
    </div>
  );
}
