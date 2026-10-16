"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./language-provider";
import { interviewQuestions, type Track } from "@/lib/interview-content";
import { interviewFrameworkDetails } from "@/lib/interview-framework-details";

type Drill = { question: string; badge: string; whyItMatters: string; steps: {title: string; simple: string; why: string; example: string; next?: string}[] };
export default function HomeInterviewDrill({track, targetRole}: {track: Track; targetRole: string}) {
  const {isFrench, text} = useLanguage();
  const [generated, setGenerated] = useState<Drill | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    setGenerated(null);
    async function load() {
      try {
        let recentQuestions: string[] = [];
        try { recentQuestions = JSON.parse(localStorage.getItem("finance-studio-interview-question-history") || "[]"); } catch {}
        const res = await fetch("/api/interview/generate", {method:"POST", headers:{"Content-Type":"application/json"}, signal:controller.signal, body:JSON.stringify({role:track, language:isFrench?"FR":"EN", recentQuestions, nonce:Date.now().toString()})});
        if (!res.ok) return;
        const data = await res.json() as Drill;
        if (!data.question || !Array.isArray(data.steps) || data.steps.length !== 3 || data.steps.some(s=>!s.title || !s.simple || !s.why || !s.example)) return;
        if (controller.signal.aborted) return;
        setGenerated({...data, badge:track});
        try { localStorage.setItem("finance-studio-interview-question-history",JSON.stringify([...recentQuestions,data.question].slice(-40))); } catch {}
      } catch { /* The complete authored answer remains available. */ }
    }
    void load();
    return () => controller.abort();
  }, [track,isFrench]);
  const base = interviewQuestions[track];
  const details = interviewFrameworkDetails[track];
  const steps = generated?.steps ?? base.framework.slice(0,3).map((s,i)=>({title:isFrench?s.fr:s.en, simple:isFrench?details[i].simple.fr:details[i].simple.en, why:isFrench?details[i].why.fr:details[i].why.en, example:isFrench?details[i].example.fr:details[i].example.en,next:isFrench?details[i].next?.fr:details[i].next?.en}));
  return <article className="card span-5 interview-card stable-interview-drill">
    <div className="card-head"><div><span className="eyebrow">{text("INTERVIEW DRILL","ENTRAÎNEMENT ENTRETIEN")}</span><h2>{generated?.question ?? (isFrench?base.question.fr:base.question.en)}</h2></div><span className="pill accent">{track}</span></div>
    <p>{targetRole?text(`Based on your saved target role: ${targetRole}.`,`Basé sur ton métier cible enregistré : ${targetRole}.`):text("Choose a target role in Careers to personalize this drill.","Choisis un métier cible dans Careers pour personnaliser cet entraînement.")}</p>
    {generated?.whyItMatters && <p className="interview-ai-why">{generated.whyItMatters}</p>}
    <div className="answer-framework">{steps.map((s,i)=><div key={i}><span>{i+1}</span><p><strong>{s.title}</strong><span className="interview-step-answer">{[[text("Simple answer","Réponse simple"),s.simple,"simple"],[text("Why","Pourquoi"),s.why,"why"],[text("Example / implication","Exemple / implication"),s.example,"example"],[text("What happens next","Et ensuite"),s.next,"next"]].filter(([,v])=>v).map(([label,value,cls])=><span key={label} className={`interview-answer-part ${cls}`}><b>{label}</b><span>{value}</span></span>)}</span></p></div>)}</div>
    <Link className="full-button" href={`/interview?track=${encodeURIComponent(track)}`}>{text("Start interview practice","Commencer l’entraînement entretien")} →</Link>
  </article>;
}
