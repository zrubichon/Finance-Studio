"use client";
import StudyDialog from "./study-dialog";
import LearningResponse from "./learning-response";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export default function NewsAIEnhancer() {
  const { isFrench, text } = useLanguage();
  const [headline, setHeadline] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function open(event: Event) {
      const detail = (event as CustomEvent<{ title:string; body:string }>).detail;
      if (!detail) return;
      setHeadline(detail.title); setAnswer(""); setLoading(true);
      void fetch("/api/professor", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({
        responseStyle: "study", language:isFrench?"FR":"EN", mode:"Professional", action:"markets",
        message:isFrench
          ? `Analyse profondément cette actualité sans inventer d'informations : « ${detail.title} ». Contexte FinanceStudio : ${detail.body}. Je veux : faits connus vs interprétation, pourquoi cette news apparaît aujourd'hui, événements ou mécanismes qui la précèdent, chaîne causale détaillée, impacts immédiats et de second ordre, actifs/secteurs/entreprises à surveiller, taux/FX/crédit si pertinents, scénarios futurs base/positif/négatif, catalyseurs, données à vérifier, éléments qui invalideraient l'analyse, vocabulaire technique expliqué, exemple concret, et cours FinanceStudio à faire ensuite.`
          : `Analyze this news story deeply without inventing information: “${detail.title}”. FinanceStudio context: ${detail.body}. Cover: known facts vs interpretation, why the story matters today, preceding events/mechanisms, detailed causal chain, immediate and second-order effects, assets/sectors/companies to watch, rates/FX/credit when relevant, future base/upside/downside scenarios, catalysts, evidence to verify, invalidation conditions, technical vocabulary explained, a concrete example, and FinanceStudio lessons to study next.`,
      })}).then(r=>r.json()).then((p:{answer?:string;error?:string})=>setAnswer(p.answer || p.error || text("AI analysis unavailable.","Analyse IA indisponible."))).catch(()=>setAnswer(text("AI analysis unavailable.","Analyse IA indisponible."))).finally(()=>setLoading(false));
    }
    window.addEventListener("finance-news-ai", open);
    return () => window.removeEventListener("finance-news-ai", open);
  }, [isFrench, text]);

  if (!headline) return null;
  return <StudyDialog title={headline} eyebrow={text("✦ DEEP NEWS ANALYSIS", "✦ ANALYSE APPROFONDIE")} onClose={()=>setHeadline("")}>{loading ? <p className="concept-lens-loading">{text("Building the full causal analysis…","Construction de l’analyse causale complète…")}</p> : <LearningResponse content={answer} />}</StudyDialog>;
}
