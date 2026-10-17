"use client";
import { requestStudyCard } from "@/lib/study-request";
import { saveVocabularyCard, useVocabularyCards } from "@/lib/vocabulary-store";
import StudyNotebook from "./study-notebook";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {dictionaryPrefixMatches,dictionaryTarget, dictionaryTermId, normalizeDictionaryTerm} from "@/lib/dictionary-search";
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
  const vocabulary = useVocabularyCards();
  const allEntries = useMemo(() => {
    const result = [...entries];
    for (const card of vocabulary) {
      if (result.some(item => [item.en,item.fr].some(label => normalizeDictionaryTerm(label) === normalizeDictionaryTerm(card.term)))) continue;
      result.push({en:card.term,fr:card.term,definitionEn:"",definitionFr:"",beginnerContextEn:"",beginnerContextFr:"",professionalContextEn:"",professionalContextFr:"",related:[],sources:[]});
    }
    return result;
  }, [entries,vocabulary]);
  const target=dictionaryTarget(allEntries,requestedTerm);
  const [saveStatus, setSaveStatus] = useState("");
  const language = isFrench ? "FR" : "EN";

  const [query, setQuery] = useState("");
  const exact = allEntries.find(item => [item.en,item.fr].some(label => normalizeDictionaryTerm(label) === normalizeDictionaryTerm(query))) || (["wacc","ev","p e","p e ratio","2s10s","target prices"].includes(normalizeDictionaryTerm(query)) ? dictionaryTarget(allEntries,query) : undefined);
  const [letter, setLetter] = useState("");
  const [page,setPage]=useState(0);
  const [kind,setKind]=useState("all");
  const [professional, setProfessional] = useState(false);
  const [aiKey, setAiKey] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const resultsRef = useRef<HTMLElement | null>(null);
  const { authenticated, isSaved, savingKey, toggleSaved } = useSavedItems("concept");

  useEffect(() => {
    setQuery(requestedTerm);setLetter("");
  }, [requestedTerm]);

  useEffect(() => {
    if(!requestedTerm)return;
    const frame=requestAnimationFrame(()=>{
      const card=target?document.getElementById(dictionaryTermId(target.en)):resultsRef.current;
      card?.scrollIntoView({behavior:"smooth",block:"start"});
    });
    return ()=>cancelAnimationFrame(frame);
  },[requestedTerm]);

  useEffect(() => {setLetter("");}, [isFrench]);

  const alphabet = useMemo(() => {
    const values = allEntries.map((item) => initialLetter(isFrench ? item.fr : item.en)).filter((value) => /^[A-Z]$/.test(value));
    return Array.from(new Set(values)).sort();
  }, [allEntries, isFrench]);

  const filtered = useMemo(() => {
    const matching=dictionaryPrefixMatches(allEntries,query,isFrench,exact);
    const found = matching.filter((item) => {
      const primary = isFrench ? item.fr : item.en;
      if(kind==="terms"&&item.indicator)return false;
      if(kind==="indicators"&&!item.indicator)return false;
      if (letter && initialLetter(primary) !== letter) return false;
      return true;
    }).sort((a,b) => (isFrench?a.fr:a.en).localeCompare(isFrench?b.fr:b.en,isFrench?"fr":"en"));
    if(exact && found.includes(exact)) return [exact,...found.filter(item=>item.en!==exact.en)];
    return found;
  }, [allEntries, query, letter, isFrench, exact,kind]);

  useEffect(()=>setPage(0),[query,letter,isFrench,kind]);

  async function createStudySheet(item: DictionaryEntry) {
    if (aiLoading) return;
    setSaveStatus("");
    const saved = vocabulary.find(card => [item.en,item.fr].some(label => normalizeDictionaryTerm(card.term) === normalizeDictionaryTerm(label)) && card.language === language);
    if (saved?.answer) {setAiKey(item.en);setAiAnswer(saved.answer);return;}
    setAiKey(item.en); setAiAnswer(""); setAiLoading(true);
    try {
      const sources = item.sources.slice(0, 6).map((source) => isFrench ? source.fr : source.en).join(", ");
      const answer = await requestStudyCard({
          sharedSubject: item.en,
          responseStyle: "study", language: isFrench ? "FR" : "EN", mode: professional ? "Professional" : "Beginner", action: "explain",
          lessonSlug: item.sources[0]?.slug || null,
          message: isFrench
            ? `Explique-moi « ${item.fr} / ${item.en} » comme un professeur. Définition : ${item.definitionFr}. Contexte : ${item.beginnerContextFr}. Concepts liés : ${item.related.join(", ")}. Cours : ${sources}. Je veux une explication vivante, des schémas, des exemples chiffrés et des nuances, pas des listes de conseils ni ta démarche.`
            : `Teach me “${item.en} / ${item.fr}” as a professor. Definition: ${item.definitionEn}. Context: ${item.beginnerContextEn}. Connected concepts: ${item.related.join(", ")}. Lessons: ${sources}. Give a vivid explanation, diagrams, worked numerical examples and nuances, not advice checklists or commentary about your process.`,
        }, setAiAnswer);
      const status = await saveVocabularyCard({term:item.en,language,answer,at:Date.now()});
      setSaveStatus(status === "account" ? text("Saved to your account vocabulary.","Enregistré dans le vocabulaire de ton compte.") : status === "browser" ? text("Saved in this browser.","Enregistré dans ce navigateur.") : text("Storage unavailable. Keep this card open and try again.","Enregistrement indisponible. Garde la fiche ouverte et réessaie."));
    } catch { setAiAnswer(text("AI study sheet unavailable right now.", "La fiche IA est temporairement indisponible.")); }
    finally { setAiLoading(false); }
  }

  return (
    <div className="workspace-stack">
      <section className="dictionary-toolbar">
        <form onSubmit={event => {event.preventDefault(); if(query.trim().length < 2 || aiLoading)return; void createStudySheet(exact || {en:query.trim().slice(0,240),fr:query.trim().slice(0,240),definitionEn:"",definitionFr:"",beginnerContextEn:"",beginnerContextFr:"",professionalContextEn:"",professionalContextFr:"",related:[],sources:[]});}}><label><span className="control-label">{text("SEARCH ENGLISH OR FRENCH", "RECHERCHER EN FRANÇAIS OU EN ANGLAIS")}</span><input value={query} onChange={(event) => { setQuery(event.target.value); setLetter(""); setSaveStatus(""); }} maxLength={240} placeholder={text("Try: duration, yield, WACC, leverage…", "Essaie : duration, rendement, WACC, leverage…")} /></label><button className="chip" type="submit" disabled={aiLoading || query.trim().length < 2}>{exact ? text("Open study card","Ouvrir la fiche") : text("Create and save this term","Créer et enregistrer ce terme")}</button></form>
        <div><span className="control-label">{text("TEACHING CONTEXT", "CONTEXTE PÉDAGOGIQUE")}</span><div className="chip-row"><button className={!professional ? "chip active" : "chip"} onClick={() => setProfessional(false)} type="button">{text("Beginner", "Débutant")}</button><button className={professional ? "chip active" : "chip"} onClick={() => setProfessional(true)} type="button">{text("Professional", "Professionnel")}</button></div></div>
      </section>

      <nav className="dictionary-alphabet" aria-label={text("Alphabetical dictionary navigation", "Navigation alphabétique du dictionnaire")}>
        <button className={!letter ? "active" : ""} type="button" onClick={() => { setLetter(""); setQuery(""); }}>{text("ALL","TOUS")}</button>
        {alphabet.map((value) => <button key={value} className={letter === value ? "active" : ""} type="button" onClick={() => { setLetter(value); setQuery(""); resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{value}</button>)}
      </nav>

      <section id="dictionary-results" ref={resultsRef} className="dictionary-result-meta">
        <span className="mini-label">{isFrench ? `${filtered.length} TERMES SUR ${allEntries.length}` : `${filtered.length} OF ${allEntries.length} TERMS`}</span>
        <p>{text("The alphabet automatically follows the active language, so English and French terms are indexed by their own first letter. Each card connects definition, intuition, examples, related concepts and the actual Finance University lessons where the term is taught.", "L’alphabet suit automatiquement la langue active : les termes français et anglais sont donc classés selon leur propre première lettre. Chaque fiche relie définition, intuition, exemples, notions liées et vrais cours de Finance University.")}</p>
      </section>

      {aiKey && !allEntries.some(item => item.en === aiKey) && <section className="dictionary-card"><h2>{aiKey}</h2>{aiLoading && <p role="status">{text("Writing your study card…","Rédaction de ta fiche…")}</p>}{aiAnswer && <StudyNotebook content={aiAnswer}/>}</section>}
      {saveStatus && <p role="status">{saveStatus}</p>}
      <div className="chip-row">{[["all","All entries","Toutes les entrées"],["terms","Finance concepts","Notions financières"],["indicators","Economic & financial indicators","Indicateurs économiques et financiers"]].map(([id,en,fr])=><button key={id} className={kind===id?"chip active":"chip"} type="button" onClick={()=>setKind(id)}>{isFrench?fr:en}</button>)}</div>
      <p className="dictionary-source-note">{text("Indicator definitions: World Bank and its data providers, CC BY 4.0. Each entry identifies its dataset and links to the source. Archive definitions are not current observations.","Définitions des indicateurs : Banque mondiale et ses fournisseurs de données, CC BY 4.0. Chaque entrée précise sa base et renvoie à la source. Les définitions d’archives ne sont pas des observations actuelles.")} <a href="https://data.worldbank.org/summary-terms-of-use" target="_blank" rel="noreferrer">{text("Attribution & terms","Attribution et conditions")} ↗</a></p>
      <section className="dictionary-grid">
        {filtered.slice(page*24,(page+1)*24).map((item) => {
          const personal = vocabulary.find(card => [item.en,item.fr].some(label => normalizeDictionaryTerm(card.term) === normalizeDictionaryTerm(label)) && card.language === language) || vocabulary.find(card => [item.en,item.fr].some(label => normalizeDictionaryTerm(card.term) === normalizeDictionaryTerm(label)));
          const custom = !entries.some(entry => entry.en === item.en);
          const definition = isFrench ? item.definitionFr : item.definitionEn;
          const context = professional ? (isFrench ? item.professionalContextFr : item.professionalContextEn) : (isFrench ? item.beginnerContextFr : item.beginnerContextEn);
          return (
            <article className={`dictionary-card${target?.en===item.en ? " dictionary-target" : ""}`} id={dictionaryTermId(item.en)} key={item.en}>
              <div className="dictionary-card-head"><span className="mini-label">{text("FINANCE DICTIONARY","DICTIONNAIRE FINANCIER")}</span><button type="button" className="save-item-button compact" aria-pressed={isSaved(item.en)} disabled={savingKey === item.en} onClick={() => void toggleSaved(item.en, { titleEn: item.en, titleFr: item.fr, subtitleEn: item.definitionEn, subtitleFr: item.definitionFr, href: `/dictionary?term=${encodeURIComponent(item.en)}`, source: "FinanceStudio Dictionary" })}><span aria-hidden="true">{isSaved(item.en) ? "★" : "☆"}</span>{savingKey === item.en ? text("Saving…", "Enregistrement…") : isSaved(item.en) ? text("Saved", "Enregistré") : authenticated ? text("Save", "Enregistrer") : text("Sign in", "Se connecter")}</button></div>
              <h2>{isFrench ? item.fr : item.en}</h2>{item.fr.toLocaleLowerCase() !== item.en.toLocaleLowerCase() && <p className="dictionary-translation">{isFrench ? "EN" : "FR"} · {isFrench ? item.en : item.fr}</p>}
              {item.indicator&&<p className="indicator-source"><a href={item.indicator.url} target="_blank" rel="noreferrer">{item.indicator.dataset} · {item.indicator.code} ↗</a></p>}
              {!custom && <><p><strong>{text("Definition:", "Définition :")}</strong> {definition}</p>
              <div className="lesson-explanation"><div className="lesson-explanation-label"><span>{professional ? text("Professional explanation", "Explication professionnelle") : text("Plain-language explanation", "Explication simple")}</span></div><p>{context}</p></div>
              <div className="lesson-explanation"><div className="lesson-explanation-label"><span>{text("How to think about it", "Comment le comprendre")}</span></div><p>{text(`Do not memorize ${item.en} as an isolated definition. Ask what variable it measures, what can make it change, what it affects next, and which decision in valuation, markets, accounting or investing uses it.`, `Ne mémorise pas ${item.fr} comme une définition isolée. Demande-toi quelle variable le terme mesure, ce qui peut la faire bouger, ce qu’elle affecte ensuite et dans quelle décision de valorisation, marchés, comptabilité ou investing elle est utilisée.`)}</p></div>
              {item.related.length > 0 && <><span className="control-label">{text("CONNECTED CONCEPTS", "NOTIONS CONNECTÉES")}</span><div className="related-row">{item.related.map((term) => <Link key={term} href={`/dictionary?q=${encodeURIComponent(term)}`}>{term}</Link>)}</div></>}
              <span className="control-label">{text("RELATED LESSONS", "COURS LIÉS")}</span>
              <div className="related-row">{item.sources.slice(0, 6).map((source) => <Link href={`/university/${source.slug}`} key={source.slug}>{isFrench ? source.fr : source.en} →</Link>)}{item.sources.length > 6 && <span>+{item.sources.length - 6} {text("lessons", "cours")}</span>}</div>
              </>}
              {custom && personal && aiKey !== item.en && <p>{text("Your personal vocabulary term. Open its saved study card below.","Ton terme de vocabulaire personnel. Ouvre sa fiche enregistrée ci-dessous.")}</p>}
              <div className="dictionary-deep-actions"><button type="button" disabled={aiLoading} onClick={() => void createStudySheet(item)}>✦ {personal?.answer ? text("Open saved study card", "Ouvrir la fiche enregistrée") : text("Create detailed AI study sheet", "Créer une fiche IA détaillée")}</button></div>
              {aiKey === item.en && <div className="dictionary-ai-sheet">{aiLoading && <p role="status">{text("Writing your study card…", "Rédaction de ta fiche…")}</p>}{aiAnswer && <StudyNotebook content={aiAnswer} />}</div>}
            </article>
          );
        })}
      </section>

      {filtered.length>24&&<nav className="panorama-paging" aria-label={text("Dictionary result pages","Pages des résultats du dictionnaire")}><button type="button" disabled={page===0} onClick={()=>{setPage(p=>p-1);resultsRef.current?.scrollIntoView({block:"start"});}}>← {text("Previous","Précédent")}</button><span>{page+1} / {Math.ceil(filtered.length/24)}</span><button type="button" disabled={(page+1)*24>=filtered.length} onClick={()=>{setPage(p=>p+1);resultsRef.current?.scrollIntoView({block:"start"});}}>{text("Next","Suivant")} →</button></nav>}
      {filtered.length === 0 && !aiLoading && aiKey !== query.trim() && <div className="empty-state"><strong>{text("No matching curriculum term.", "Aucun terme du programme ne correspond.")}</strong><p>{text("Press Enter or choose Create and save this term to add its study card to your vocabulary.", "Appuie sur Entrée ou sur Créer et enregistrer ce terme pour ajouter sa fiche à ton vocabulaire.")}</p></div>}
    </div>
  );
}
