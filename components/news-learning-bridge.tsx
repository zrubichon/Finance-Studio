"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { professorHref, recommendLesson } from "@/lib/learning-bridge";

type NewsItem = {
  id: string;
  title: string;
  publishedAt: string;
  topics: string[];
  insight?: {
    assets?: string[];
    whyItMatters?: { en: string; fr: string };
  };
};

type NewsPayload = { items?: NewsItem[] };

function questionFor(item: NewsItem, lessonTitle: string, isFrench: boolean) {
  if (isFrench) {
    return `Explique-moi cette actualité comme mon professeur de finance : « ${item.title} ». Relie-la au cours ${lessonTitle}, explique le mécanisme de transmission vers les marchés, ce qui est déjà pricé, les actifs à surveiller et les prochains catalysts. Sépare clairement les faits de l’interprétation.`;
  }
  return `Teach me this market story like a finance professor: “${item.title}”. Connect it to ${lessonTitle}, explain the market transmission mechanism, what may already be priced, the assets to watch and the next catalysts. Clearly separate facts from interpretation.`;
}

export default function NewsLearningBridge() {
  const { isFrench, text } = useLanguage();
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/news?category=all", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as NewsPayload;
        if (active) setItems((payload.items ?? []).slice(0, 3));
      } catch {
        // The live journal remains usable if the learning bridge cannot refresh.
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  const cards = useMemo(
    () => items.map((item) => ({
      item,
      lesson: recommendLesson({
        title: item.title,
        topics: item.topics,
        assets: item.insight?.assets,
      }),
    })),
    [items],
  );

  if (!cards.length) return null;

  return (
    <section className="news-blueprint-panel">
      <div className="panel-heading">
        <div>
          <span className="mini-label">{text("NEWS → LEARNING → INVESTING", "ACTUALITÉ → APPRENTISSAGE → INVESTING")}</span>
          <h2>{text("Turn today’s stories into knowledge, interview reasoning and testable theses", "Transforme les actualités du jour en connaissances, raisonnement d’entretien et thèses testables")}</h2>
        </div>
        <span className="connection-badge"><span className="status-dot" /> {text("University + AI Professor + Investing connected", "University + Professeur IA + Investing connectés")}</span>
      </div>

      <div className="analysis-grid">
        {cards.map(({ item, lesson }) => {
          const lessonTitle = isFrench ? lesson.titleFr : lesson.titleEn;
          const question = questionFor(item, lessonTitle, isFrench);
          const investingQuery = new URLSearchParams({
            source: "news",
            lesson: lesson.slug,
            catalyst: item.title,
            thesis: isFrench
              ? `Construis une thèse testable à partir de ce catalyst et du cours ${lessonTitle}.`
              : `Build a testable thesis from this catalyst and the ${lessonTitle} lesson.`,
          });
          return (
            <article className="analysis-card" key={item.id}>
              <span className="mini-label">{text("LIVE STORY", "ACTUALITÉ LIVE")}</span>
              <h3>{item.title}</h3>
              <p>{isFrench ? lesson.reasonFr : lesson.reasonEn}</p>
              <div className="answer-practice-actions">
                <Link className="module-open-link" href={`/university/${lesson.slug}`}>
                  {text("Learn the concept", "Apprendre le concept")} →
                </Link>
                <Link className="chip" href={professorHref({ lessonSlug: lesson.slug, question, source: "news" })}>
                  {text("Ask AI Professor", "Demander au Professeur IA")}
                </Link>
                <Link className="chip" href={`/investing?${investingQuery.toString()}`}>
                  {text("Build a thesis", "Construire une thèse")}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
