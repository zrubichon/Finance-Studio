"use client";
import StudyDialog from "./study-dialog";
import {CommentaryContent,requestNewsAnalysis} from "./news-commentary";
import type {NewsAnalysis} from "@/lib/news-analysis";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export default function NewsAIEnhancer() {
  const { isFrench, text } = useLanguage();
  const [headline, setHeadline] = useState("");
  const [answer, setAnswer] = useState<NewsAnalysis|null>(null);
  const [error,setError]=useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function open(event: Event) {
      const detail = (event as CustomEvent<{ title:string; body:string; url?:string }>).detail;
      if (!detail) return;
      setHeadline(detail.title); setAnswer(null);setError(""); setLoading(true);
      void requestNewsAnalysis(detail.url||"",detail.title,isFrench?"FR":"EN").then(setAnswer).catch(e=>setError(e.message)).finally(()=>setLoading(false));
    }
    window.addEventListener("finance-news-ai", open);
    return () => window.removeEventListener("finance-news-ai", open);
  }, [isFrench, text]);

  if (!headline) return null;
  return <StudyDialog title={headline} eyebrow={text("✦ DEEP NEWS ANALYSIS", "✦ ANALYSE APPROFONDIE")} onClose={()=>setHeadline("")}>{loading ? <p className="concept-lens-loading">{text("Building the full causal analysis…","Construction de l’analyse causale complète…")}</p> : answer ? <CommentaryContent analysis={answer} /> : <p role="alert">{error}</p>}</StudyDialog>;
}
