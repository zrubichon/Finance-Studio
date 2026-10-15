"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export default function NewsAIEnhancer() {
  const { isFrench, text } = useLanguage();
  const [headline, setHeadline] = useState("");
  const [context, setContext] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/news") return;
    const requested = new URLSearchParams(window.location.search).get("story");
    function enhance() {
      document.querySelectorAll<HTMLElement>(".news-intelligence-card").forEach((card, index) => {
        card.dataset.newsIndex = String(index);
        if (!card.querySelector(".news-ai-deep-button")) {
          const actions = card.querySelector<HTMLElement>(".news-item-actions");
          if (!actions) return;
          const button = document.createElement("button");
          button.type = "button";
          button.className = "save-item-button compact news-ai-deep-button";
          button.textContent = document.documentElement.lang === "fr" ? "✦ Analyse IA détaillée" : "✦ Detailed AI analysis";
          button.addEventListener("click", () => {
            const title = card.querySelector("h3")?.textContent?.trim() || "News story";
            const body = Array.from(card.querySelectorAll(".finance-lens-header, .news-insight-grid, .scenario-discipline")).map((node) => node.textContent?.trim()).filter(Boolean).join("\n");
            window.dispatchEvent(new CustomEvent("finance-news-ai", { detail: { title, body } }));
          });
          actions.appendChild(button);
        }
      });
      if (requested && !document.body.dataset.newsFocusDone) {
        const cards = Array.from(document.querySelectorAll<HTMLElement>(".news-intelligence-card"));
        const target = cards.find((card) => (card.textContent || "").includes(requested)) || cards.find((card) => card.dataset.newsId === requested);
        if (target) { document.body.dataset.newsFocusDone = "1"; target.scrollIntoView({ behavior:"smooth", block:"center" }); target.classList.add("news-focused-story"); }
      }
    }
    const timer = window.setInterval(enhance, 900); enhance();
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function open(event: Event) {
      const detail = (event as CustomEvent<{ title:string; body:string }>).detail;
      if (!detail) return;
      setHeadline(detail.title); setContext(detail.body); setAnswer(""); setLoading(true);
      void fetch("/api/professor", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({
        language:isFrench?"FR":"EN", mode:"Professional", action:"markets",
        message:isFrench
          ? `Analyse profondément cette actualité sans inventer d'informations : « ${detail.title} ». Contexte FinanceStudio : ${detail.body}. Je veux : faits connus vs interprétation, pourquoi cette news apparaît aujourd'hui, événements ou mécanismes qui la précèdent, chaîne causale détaillée, impacts immédiats et de second ordre, actifs/secteurs/entreprises à surveiller, taux/FX/crédit si pertinents, scénarios futurs base/positif/négatif, catalyseurs, données à vérifier, éléments qui invalideraient l'analyse, vocabulaire technique expliqué, exemple concret, et cours FinanceStudio à faire ensuite.`
          : `Analyze this news story deeply without inventing information: “${detail.title}”. FinanceStudio context: ${detail.body}. Cover: known facts vs interpretation, why the story matters today, preceding events/mechanisms, detailed causal chain, immediate and second-order effects, assets/sectors/companies to watch, rates/FX/credit when relevant, future base/upside/downside scenarios, catalysts, evidence to verify, invalidation conditions, technical vocabulary explained, a concrete example, and FinanceStudio lessons to study next.`,
      })}).then(r=>r.json()).then((p:{answer?:string})=>setAnswer(p.answer || text("AI analysis unavailable.","Analyse IA indisponible."))).catch(()=>setAnswer(text("AI analysis unavailable.","Analyse IA indisponible."))).finally(()=>setLoading(false));
    }
    window.addEventListener("finance-news-ai", open);
    return () => window.removeEventListener("finance-news-ai", open);
  }, [isFrench, text]);

  if (!headline) return null;
  return <div className="concept-lens-backdrop" role="dialog" aria-modal="true"><article className="concept-lens-card"><div className="concept-lens-card-head"><div><span className="mini-label">✦ {text("DEEP NEWS ANALYSIS", "ANALYSE NEWS APPROFONDIE")}</span><h2>{headline}</h2></div><button className="concept-lens-close" type="button" onClick={()=>setHeadline("")}>×</button></div>{loading ? <p className="concept-lens-loading">{text("Building the full causal analysis…","Construction de l’analyse causale complète…")}</p> : <div className="concept-lens-answer">{answer}</div>}</article></div>;
}
