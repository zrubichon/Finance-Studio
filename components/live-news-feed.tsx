"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Category = "markets" | "macro" | "central-banks" | "companies";

type NewsItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publishedAt: string;
  sourceCountry: string;
  language: string;
  imageUrl: string | null;
  sourceQuality: "established" | "external";
};

type NewsPayload = {
  category: Category;
  updatedAt: string;
  items: NewsItem[];
  provider: {
    id: "gdelt";
    label: string;
    status: "live" | "empty" | "error";
    message: string;
  };
};

const categories: Array<{
  id: Category;
  en: string;
  fr: string;
}> = [
  { id: "markets", en: "Markets", fr: "Marchés" },
  { id: "macro", en: "Macro", fr: "Macro" },
  { id: "central-banks", en: "Central Banks", fr: "Banques centrales" },
  { id: "companies", en: "Companies & Deals", fr: "Entreprises & Deals" },
];

function formatDate(value: string, isFrench: boolean) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export default function LiveNewsFeed() {
  const { isFrench, text } = useLanguage();
  const [category, setCategory] = useState<Category>("markets");
  const [payload, setPayload] = useState<NewsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/news?category=${encodeURIComponent(category)}`,
          { cache: "no-store" },
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = (await response.json()) as NewsPayload;
        if (active) setPayload(data);
      } catch {
        if (active) {
          setPayload(null);
          setError(
            text(
              "The external news index could not be loaded.",
              "L’index externe d’actualités n’a pas pu être chargé.",
            ),
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [category, text]);

  const establishedCount = useMemo(
    () =>
      payload?.items.filter(
        (item) => item.sourceQuality === "established",
      ).length ?? 0,
    [payload],
  );

  return (
    <section className="news-blueprint-panel">
      <div className="panel-heading">
        <div>
          <span className="mini-label">
            {text("LIVE NEWS INDEX", "INDEX D’ACTUALITÉS EN DIRECT")}
          </span>
          <h2>
            {text(
              "Recent market reporting, separated from FinanceStudio analysis",
              "Reporting de marché récent, séparé de l’analyse FinanceStudio",
            )}
          </h2>
        </div>

        <span className="connection-badge">
          <span className="status-dot" />
          {loading
            ? text("loading feed", "chargement du flux")
            : payload?.provider.status === "live"
              ? `${payload.provider.label} · live`
              : text("feed unavailable", "flux indisponible")}
        </span>
      </div>

      <p className="explanation-copy">
        {text(
          "Headlines below come from an external news index. FinanceStudio does not treat a headline as verified analysis: source, timing and primary documents still need to be checked before drawing a market conclusion.",
          "Les titres ci-dessous proviennent d’un index externe d’actualités. FinanceStudio ne traite pas un titre comme une analyse vérifiée : la source, le timing et les documents primaires doivent encore être contrôlés avant de tirer une conclusion de marché.",
        )}
      </p>

      <div className="chip-row">
        {categories.map((item) => (
          <button
            className={category === item.id ? "chip active" : "chip"}
            key={item.id}
            type="button"
            onClick={() => setCategory(item.id)}
          >
            {isFrench ? item.fr : item.en}
          </button>
        ))}
      </div>

      {error && (
        <p className="inline-status" role="status">
          {error}
        </p>
      )}

      {!loading && payload?.provider.status === "error" ? (
        <p className="inline-status" role="status">
          {payload.provider.message}
        </p>
      ) : null}

      {!loading && payload?.provider.status === "empty" ? (
        <p className="inline-status" role="status">
          {text(
            "No recent item matched this category. No synthetic headlines are shown.",
            "Aucun article récent ne correspond à cette catégorie. Aucun titre synthétique n’est affiché.",
          )}
        </p>
      ) : null}

      {payload?.items?.length ? (
        <>
          <div className="news-analysis-grid">
            {payload.items.map((item, index) => (
              <article className="news-analysis-step" key={item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {item.domain || text("External source", "Source externe")}
                    {item.publishedAt
                      ? ` · ${formatDate(item.publishedAt, isFrench)}`
                      : ""}
                    {item.sourceCountry ? ` · ${item.sourceCountry}` : ""}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="module-open-link"
                  >
                    {text("Open original reporting", "Ouvrir le reporting original")} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="inline-status">
            {text(
              `${establishedCount} of ${payload.items.length} displayed sources match FinanceStudio's current established-outlet allowlist. Other sources remain labeled as external reporting and should be checked more carefully.`,
              `${establishedCount} source${establishedCount > 1 ? "s" : ""} sur ${payload.items.length} correspond${establishedCount > 1 ? "ent" : ""} à l’allowlist actuelle de médias établis de FinanceStudio. Les autres restent du reporting externe à vérifier plus attentivement.`,
            )}
          </p>
        </>
      ) : null}
    </section>
  );
}
