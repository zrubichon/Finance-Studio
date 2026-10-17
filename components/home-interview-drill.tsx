"use client";

import Link from "next/link";
import {useHourlyLearning} from "./use-hourly-learning";
import { useState } from "react";
import { useLanguage } from "./language-provider";
import { interviewQuestions, type Track } from "@/lib/interview-content";
import { interviewFrameworkDetails } from "@/lib/interview-framework-details";

type Drill = { question: string; badge: string; whyItMatters: string; steps: {title: string; simple: string; why: string; example: string; next?: string}[] };
export default function HomeInterviewDrill({track, targetRole}: {track: Track; targetRole: string}) {
  const {isFrench, text} = useLanguage();
  const [expanded,setExpanded]=useState(false);
  const hourly=useHourlyLearning('interview');
  const topic=hourly?.topic;const lang=isFrench?'fr':'en';
  const generated:Drill|null=topic?{question:topic.question[lang],badge:track,whyItMatters:'',steps:[{title:text('Quick answer','Réponse rapide'),simple:topic.summary[lang],why:topic.why[lang],example:topic.example[lang]},{title:text('Connect the facts','Relier les faits'),simple:topic.definition[lang],why:topic.facts.map(f=>f[lang]).join(' '),example:topic.formula?`${topic.formula.expression} — ${topic.formula.explanation[lang]}`:topic.example[lang]},{title:text('Professional perspective','Perspective professionnelle'),simple:topic.advanced[lang],why:topic.why[lang],example:topic.example[lang]}]}:null;

  const base = interviewQuestions[track];
  const details = interviewFrameworkDetails[track];
  const steps = generated?.steps ?? base.framework.slice(0,3).map((s,i)=>({title:isFrench?s.fr:s.en, simple:isFrench?details[i].simple.fr:details[i].simple.en, why:isFrench?details[i].why.fr:details[i].why.en, example:isFrench?details[i].example.fr:details[i].example.en,next:isFrench?details[i].next?.fr:details[i].next?.en}));
  return <article className={`card span-5 interview-card stable-interview-drill${expanded?" drill-expanded":""}`}>
    <div className="interview-drill-meta"><span className="eyebrow">{text("INTERVIEW DRILL","ENTRAÎNEMENT ENTRETIEN")}</span><span className="pill accent">{track}</span></div>
    <h2 className="interview-drill-question">{generated?.question ?? (isFrench?base.question.fr:base.question.en)}</h2>
    <p>{targetRole?text(`Your target role: ${targetRole}.`,`Ton métier cible : ${targetRole}.`):text("General finance question: practise explaining the mechanism aloud.","Question technique transversale : entraîne-toi à expliquer le mécanisme à voix haute.")}</p>
    {generated?.whyItMatters && <p className="interview-ai-why">{generated.whyItMatters}</p>}
    <div className="answer-framework" id="interview-complete-answer">{steps.map((s,i)=><section className="interview-teaching-step" key={i} hidden={!expanded&&i>0}>
      <header className="interview-step-heading"><span className="step-number">{i+1}</span><h3>{s.title}</h3></header>
      <div className="interview-step-answer">{[[i===0?text("Quick answer","Réponse rapide"):text("Simple answer","Réponse simple"),s.simple,"simple"],[text("Why","Pourquoi"),s.why,"why"],[text("Example / implication","Exemple / implication"),s.example,"example"],[text("What happens next","Et ensuite"),s.next,"next"]].filter(([,v])=>v).map(([label,value,cls])=><div key={label} hidden={!expanded&&(i>0||cls!=="simple")} className={`interview-answer-part ${cls}`}><b>{label}</b><p>{value}</p></div>)}</div>
    </section>)}</div>
    <button className="learning-expand-button" type="button" aria-expanded={expanded} aria-controls="interview-complete-answer" onClick={()=>setExpanded(v=>!v)}>{expanded?text("Collapse the complete answer ↑","Replier la réponse complète ↑"):text("Show the remaining steps & full answer ↓","Dérouler les autres étapes et la réponse complète ↓")}</button>
    <Link hidden={!expanded} className="full-button" href={`/interview?track=${encodeURIComponent(track)}${topic?`&concept=${encodeURIComponent(topic.term[lang])}`:""}`}>{text("Start interview practice","Commencer l’entraînement entretien")} →</Link>
  <small className="hourly-schedule">{text("A new scheduled question each hour. Core concepts can recur.","Une nouvelle question programmée chaque heure. Les notions peuvent se recouper.")}</small>
  </article>;
}
