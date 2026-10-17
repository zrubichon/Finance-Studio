"use client";
import NewsStoryImage from "./news-story-image";
import StudyDialog from "./study-dialog";
import {CommentaryContent,requestNewsAnalysis} from "./news-commentary";
import type {NewsAnalysis} from "@/lib/news-analysis";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Localized = { en: string; fr: string };
type Story = {
  imageUrl?:string|null;
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
  const requestVersion=useRef(0);
  const gesture=useRef<{x:number;y:number;at:number}|null>(null);
  const lastWheel=useRef(0);
  function move(delta:number){setIndex(i=>(i+delta+stories.length)%stories.length);}

  const [stories, setStories] = useState<Story[]>([]);
  const [index, setIndex] = useState(0);
  const [aiStory, setAiStory] = useState<Story | null>(null);
  const [aiAnswer, setAiAnswer] = useState<NewsAnalysis|null>(null);
  const [aiError,setAiError]=useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch(`/api/news?category=all&language=${isFrench?"FR":"EN"}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { items?: Story[] }) => { if (active) setStories((payload.items ?? []).slice(0, 4)); })
      .catch(() => { if (active) setStories([]); });
    return () => { active = false; };
  }, [isFrench]);

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
    const version=++requestVersion.current;
    setAiStory(item);setAiAnswer(null);setAiError("");setAiLoading(true);
    try {const result=await requestNewsAnalysis(item.url,item.title,isFrench?"FR":"EN");if(version===requestVersion.current)setAiAnswer(result);}
    catch(e){if(version===requestVersion.current)setAiError(e instanceof Error?e.message:text("Analysis unavailable","Analyse indisponible"));}
    finally{if(version===requestVersion.current)setAiLoading(false);}
  }

  if (!story) return null;
  return (
    <section className="news-carousel-panel">
      <article className="news-carousel-card news-photo-card" onPointerDown={e=>{if((e.target as HTMLElement).closest('a,button'))return;gesture.current={x:e.clientX,y:e.clientY,at:Date.now()};}} onPointerUp={e=>{const start=gesture.current;gesture.current=null;if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5&&Date.now()-start.at<1500)move(dx>0?1:-1);}} onPointerCancel={()=>{gesture.current=null;}} onWheel={e=>{if(Math.abs(e.deltaX)>35&&Math.abs(e.deltaX)>Math.abs(e.deltaY)*1.5&&Date.now()-lastWheel.current>650){lastWheel.current=Date.now();move(e.deltaX>0?1:-1);}}}>
        <NewsStoryImage key={story.id} imageUrl={story.imageUrl} title={story.title}/>
        <div className="panel-heading"><div><span className="mini-label">{text("LATEST NEWS · 4-STORY ROTATION", "DERNIÈRES NEWS · ROTATION DE 4 ARTICLES")}</span><h2>{text("Learn the market through today's stories", "Comprendre le marché avec les actualités du jour")}</h2></div><span className="connection-badge">{index + 1}/{stories.length}</span></div>
        <h3>{story.title}</h3>
        <p>{why || text("Open the full News & Analysis page for the causal chain, assets to watch and next catalysts.", "Ouvre News & Analysis pour la chaîne causale, les actifs à surveiller et les prochains catalyseurs.")}</p>
        <small>{story.domain} · {new Date(story.publishedAt).toLocaleString(isFrench ? "fr-FR" : "en-US", { dateStyle: "medium", timeStyle: "short" })}</small>
        <div className="news-story-actions">
          <Link href={`/news?story=${encodeURIComponent(story.id)}#news-${encodeURIComponent(story.id)}`} onClick={() => { try { sessionStorage.setItem("finance-studio-open-story", JSON.stringify(story)); } catch {} }}>{text("Open full analysis", "Ouvrir l’analyse complète")} →</Link>
          <a href={story.url} target="_blank" rel="noreferrer">{text("Original article", "Article original")} ↗</a>
          <button className="primary" type="button" onPointerEnter={() => {void requestNewsAnalysis(story.url,story.title,isFrench?"FR":"EN").catch(()=>{});}} onFocus={() => {void requestNewsAnalysis(story.url,story.title,isFrench?"FR":"EN").catch(()=>{});}} onClick={() => void explainWithAI(story)}>✦ {text("Detailed AI explanation", "Explication IA détaillée")}</button>
        </div>
        <div className="news-carousel-controls"><button type="button" onClick={()=>move(-1)}>← {text('Previous','Précédente')}</button><button type="button" onClick={()=>move(1)}>{text('Next','Suivante')} →</button><small>{text('Swipe right: next · left: previous','Glisse à droite : suivante · à gauche : précédente')}</small></div>
        <div className="news-carousel-dots" aria-label={text("News carousel", "Carrousel d’actualités")}>{stories.map((_, i) => <button key={i} type="button" className={i === index ? "active" : ""} aria-label={`${i + 1}`} onClick={() => setIndex(i)} />)}</div>
      </article>
      {aiStory && (
        <StudyDialog title={aiStory.title} eyebrow="✦ NEWS INTELLIGENCE" onClose={() => setAiStory(null)}>
            {aiLoading ? <p className="concept-lens-loading">{text("Building the detailed causal analysis…", "Construction de l’analyse causale détaillée…")}</p> : aiAnswer ? <CommentaryContent analysis={aiAnswer} /> : <p role="alert">{aiError}</p>}
        </StudyDialog>
      )}
    </section>
  );
}
