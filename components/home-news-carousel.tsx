"use client";
import StudyDialog from "./study-dialog";
import LearningResponse from "./learning-response";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Localized = { en: string; fr: string };
type Story = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publishedAt: string;
  topics: string[];
  insight?: { lens?: Localized; whyItMatters?: Localized; watchNext?: Localized; scenario?: Localized; transmission?: { en: string[]; fr: string[] }; assets?: string[] };
};

export default function HomeNewsCarousel() {
  const { isFrench, text } = useLanguage();
  const [stories, setStories] = useState<Story[]>([]);
  const [index, setIndex] = useState(0);
  const [aiStory, setAiStory] = useState<Story | null>(null);
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch("/api/news?category=all", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { items?: Story[] }) => { if (active) setStories((payload.items ?? []).slice(0, 4)); })
      .catch(() => { if (active) setStories([]); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (stories.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % stories.length), 30_000);
    return () => window.clearInterval(timer);
  }, [stories.length]);

  const story = stories[index];
  const why = useMemo(() => {
    if (!story?.insight?.whyItMatters) return "";
    return isFrench ? story.insight.whyItMatters.fr : story.insight.whyItMatters.en;
  }, [story, isFrench]);

  async function explainWithAI(item: Story) {
    setAiStory(item); setAiAnswer(""); setAiLoading(true);
    const insight = item.insight;
    const existing = [
      `Source: ${item.domain}; URL: ${item.url}; indexed/published: ${item.publishedAt}; topics: ${item.topics.join(", ")}.`,
      insight?.lens ? (isFrench ? insight.lens.fr : insight.lens.en) : "",
      insight?.whyItMatters ? (isFrench ? insight.whyItMatters.fr : insight.whyItMatters.en) : "",
      insight?.watchNext ? (isFrench ? insight.watchNext.fr : insight.watchNext.en) : "",
      insight?.scenario ? (isFrench ? insight.scenario.fr : insight.scenario.en) : "",
    ].filter(Boolean).join("\n");
    try {
      const response = await fetch("/api/professor", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newsUrl: item.url, responseStyle: "study", language: isFrench ? "FR" : "EN", mode: "Professional", action: "markets",
          message: isFrench
            ? `Analyse en profondeur cette actualité financière sans inventer de faits ni de prix : « ${item.title} ». Contexte déjà présent dans FinanceStudio : ${existing}. Explique : ce qui s'est passé, pourquoi cette nouvelle apparaît aujourd'hui, ce dont elle découle, la chaîne causale, les actifs/secteurs touchés, les effets de premier et second ordre, les scénarios futurs, les catalyseurs à surveiller, ce qui pourrait invalider l'interprétation, les termes techniques, et les cours FinanceStudio à étudier pour comprendre le sujet. Distingue faits, interprétations et scénarios.`
            : `Analyze this financial news story in depth without inventing facts or prices: “${item.title}”. Existing FinanceStudio context: ${existing}. Explain what happened, why this story matters today, what caused it, the causal chain, affected assets/sectors, first- and second-order effects, future scenarios, catalysts to watch, what could invalidate the interpretation, technical terms, and which FinanceStudio lessons would help understand it. Clearly separate facts, interpretation and scenarios.`,
        }),
      });
      const payload = await response.json() as { answer?: string; error?: string };
      setAiAnswer(payload.answer || payload.error || text("AI analysis is temporarily unavailable.", "L’analyse IA est temporairement indisponible."));
    } catch { setAiAnswer(text("AI analysis is temporarily unavailable.", "L’analyse IA est temporairement indisponible.")); }
    finally { setAiLoading(false); }
  }

  if (!story) return null;
  return (
    <section className="news-carousel-panel">
      <article className="news-carousel-card">
        <div className="panel-heading"><div><span className="mini-label">{text("LATEST NEWS · 4-STORY ROTATION", "DERNIÈRES NEWS · ROTATION DE 4 ARTICLES")}</span><h2>{text("Learn the market through today's stories", "Comprendre le marché avec les actualités du jour")}</h2></div><span className="connection-badge">{index + 1}/{stories.length}</span></div>
        <h3>{story.title}</h3>
        <p>{why || text("Open the full News & Analysis page for the causal chain, assets to watch and next catalysts.", "Ouvre News & Analysis pour la chaîne causale, les actifs à surveiller et les prochains catalyseurs.")}</p>
        <small>{story.domain} · {new Date(story.publishedAt).toLocaleString(isFrench ? "fr-FR" : "en-US", { dateStyle: "medium", timeStyle: "short" })}</small>
        <div className="news-story-actions">
          <Link href={`/news?story=${encodeURIComponent(story.id)}#news-${encodeURIComponent(story.id)}`} onClick={() => { try { sessionStorage.setItem("finance-studio-open-story", JSON.stringify(story)); } catch {} }}>{text("Open full analysis", "Ouvrir l’analyse complète")} →</Link>
          <a href={story.url} target="_blank" rel="noreferrer">{text("Original article", "Article original")} ↗</a>
          <button className="primary" type="button" onClick={() => void explainWithAI(story)}>✦ {text("Detailed AI explanation", "Explication IA détaillée")}</button>
        </div>
        <div className="news-carousel-dots" aria-label={text("News carousel", "Carrousel d’actualités")}>{stories.map((_, i) => <button key={i} type="button" className={i === index ? "active" : ""} aria-label={`${i + 1}`} onClick={() => setIndex(i)} />)}</div>
      </article>
      {aiStory && (
        <StudyDialog title={aiStory.title} eyebrow="✦ NEWS INTELLIGENCE" onClose={() => setAiStory(null)}>
            {aiLoading ? <p className="concept-lens-loading">{text("Building the detailed causal analysis…", "Construction de l’analyse causale détaillée…")}</p> : <LearningResponse content={aiAnswer} />}
        </StudyDialog>
      )}
    </section>
  );
}
