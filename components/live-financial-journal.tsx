"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";
import { recordDailyActivity } from "@/lib/record-activity";
import { useSavedItems } from "@/lib/use-saved-items";

type Category =
  | "all"
  | "markets"
  | "macro"
  | "central-banks"
  | "companies"
  | "geopolitics"
  | "policy";

type Topic = Exclude<Category, "all">;
type Range = "6h" | "24h" | "72h";

type NewsRegion =
  | "global"
  | "usa"
  | "europe"
  | "uk"
  | "asia"
  | "china"
  | "japan"
  | "emerging-markets"
  | "my-markets";

type LocalizedText = { en: string; fr: string };

type NewsInsight = {
  lens: LocalizedText;
  whyItMatters: LocalizedText;
  transmission: { en: string[]; fr: string[] };
  assets: string[];
  watchNext: LocalizedText;
  scenario: LocalizedText;
};

type NewsItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publishedAt: string;
  sourceCountry: string;
  language: string;
  imageUrl: string | null;
  sourceQuality: "primary" | "established" | "external";
  topics: Topic[];
  insight: NewsInsight;
};

type NewsPayload = {
  category: Category;
  updatedAt: string;
  items: NewsItem[];
  provider: {
    id: "archive" | "gdelt";
    label: string;
    status: "live" | "empty" | "error";
    message: string;
  };
};

const categories: Array<{ id: Category; en: string; fr: string }> = [
  { id: "all", en: "All intelligence", fr: "Toute l’intelligence" },
  { id: "markets", en: "Markets", fr: "Marchés" },
  { id: "macro", en: "Macro", fr: "Macro" },
  { id: "central-banks", en: "Central Banks", fr: "Banques centrales" },
  { id: "companies", en: "Companies & Deals", fr: "Entreprises & Deals" },
  { id: "geopolitics", en: "Geopolitics", fr: "Géopolitique" },
  { id: "policy", en: "Policy & Regulation", fr: "Politique & Régulation" },
];

const ranges: Array<{ id: Range; en: string; fr: string }> = [
  { id: "6h", en: "Last 6h", fr: "6 dernières h" },
  { id: "24h", en: "Today / 24h", fr: "Aujourd’hui / 24 h" },
  { id: "72h", en: "Last 3 days", fr: "3 derniers jours" },
];

const rangeHours: Record<Range, number> = {
  "6h": 6,
  "24h": 24,
  "72h": 72,
};

const regionOptions: Array<{ id: NewsRegion; en: string; fr: string }> = [
  { id: "my-markets", en: "My Markets", fr: "Mes marchés" },
  { id: "global", en: "Global", fr: "Monde" },
  { id: "usa", en: "USA", fr: "USA" },
  { id: "europe", en: "Europe", fr: "Europe" },
  { id: "uk", en: "UK", fr: "Royaume-Uni" },
  { id: "asia", en: "Asia", fr: "Asie" },
  { id: "china", en: "China", fr: "Chine" },
  { id: "japan", en: "Japan", fr: "Japon" },
  { id: "emerging-markets", en: "Emerging Markets", fr: "Marchés émergents" },
];

const countryGroups: Record<Exclude<NewsRegion, "global" | "my-markets">, Set<string>> = {
  usa: new Set(["unitedstates", "us", "usa"]),
  europe: new Set([
    "unitedkingdom",
    "greatbritain",
    "england",
    "france",
    "germany",
    "italy",
    "spain",
    "portugal",
    "netherlands",
    "belgium",
    "luxembourg",
    "switzerland",
    "austria",
    "ireland",
    "sweden",
    "norway",
    "denmark",
    "finland",
    "iceland",
    "poland",
    "czechrepublic",
    "czechia",
    "romania",
    "hungary",
    "greece",
    "europeanunion",
  ]),
  uk: new Set(["unitedkingdom", "greatbritain", "england", "uk"]),
  asia: new Set([
    "china",
    "japan",
    "india",
    "singapore",
    "southkorea",
    "korea",
    "hongkong",
    "taiwan",
    "indonesia",
    "malaysia",
    "thailand",
    "philippines",
    "vietnam",
  ]),
  china: new Set(["china", "hongkong"]),
  japan: new Set(["japan"]),
  "emerging-markets": new Set([
    "india",
    "brazil",
    "mexico",
    "southafrica",
    "turkey",
    "indonesia",
    "malaysia",
    "thailand",
    "philippines",
    "vietnam",
    "argentina",
    "chile",
    "colombia",
    "peru",
    "egypt",
    "saudiarabia",
    "unitedarabemirates",
    "poland",
    "hungary",
    "romania",
  ]),
};

const preferenceToRegion: Record<string, Exclude<NewsRegion, "my-markets">> = {
  global: "global",
  usa: "usa",
  europe: "europe",
  uk: "uk",
  asia: "asia",
  china: "china",
  japan: "japan",
  "emerging-markets": "emerging-markets",
};

const topicLabels: Record<Topic, LocalizedText> = {
  markets: { en: "Markets", fr: "Marchés" },
  macro: { en: "Macro", fr: "Macro" },
  "central-banks": { en: "Central banks", fr: "Banques centrales" },
  companies: { en: "Companies", fr: "Entreprises" },
  geopolitics: { en: "Geopolitics", fr: "Géopolitique" },
  policy: { en: "Policy", fr: "Politique / Régulation" },
};

function normalizeCountry(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function matchesRegion(item: NewsItem, region: Exclude<NewsRegion, "my-markets">) {
  if (region === "global") return true;
  const normalized = normalizeCountry(item.sourceCountry);
  if (!normalized) return false;
  return countryGroups[region].has(normalized);
}

function parsedTime(value: string) {
  const valueMs = new Date(value).getTime();
  return Number.isFinite(valueMs) ? valueMs : null;
}

function isWithinHours(value: string, hours: number) {
  const valueMs = parsedTime(value);
  if (valueMs === null) return false;
  return Date.now() - valueMs <= hours * 3600000;
}

function ageHours(value: string) {
  const valueMs = parsedTime(value);
  if (valueMs === null) return Number.POSITIVE_INFINITY;
  return Math.max(0, (Date.now() - valueMs) / 3600000);
}

function formatTime(value: string, isFrench: boolean) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function formatUpdated(value: string, isFrench: boolean) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function dayKey(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return (
    String(date.getFullYear()) +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

function formatDay(value: string, isFrench: boolean) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return isFrench ? "Date inconnue" : "Unknown date";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(date, today)) return isFrench ? "Aujourd’hui" : "Today";
  if (sameDay(date, yesterday)) return isFrench ? "Hier" : "Yesterday";

  return new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function LiveFinancialJournal() {
  const { isFrench, text } = useLanguage();
  const [category, setCategory] = useState<Category>("all");
  const [range, setRange] = useState<Range>("24h");
  const [region, setRegion] = useState<NewsRegion>("global");
  const [preferredRegions, setPreferredRegions] = useState<string[]>(["global", "usa", "europe"]);
  const [authenticated, setAuthenticated] = useState(false);
  const [payload, setPayload] = useState<NewsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);
  const [error, setError] = useState("");
  const {
    authenticated: canSaveNews,
    isSaved: isNewsSaved,
    savingKey: savingNewsKey,
    toggleSaved: toggleNewsSaved,
  } = useSavedItems("news");

  useEffect(() => {
    let active = true;

    async function hydratePreferences() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active || !user) return;
      setAuthenticated(true);

      const { data } = await supabase
        .from("user_preferences")
        .select("market_regions")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!active) return;

      const raw = Array.isArray(data?.market_regions) ? data.market_regions : [];
      const clean = raw
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.toLowerCase())
        .filter((item) => Boolean(preferenceToRegion[item]));

      if (clean.length) {
        setPreferredRegions(Array.from(new Set(clean)));
        setRegion("my-markets");
      }
    }

    void hydratePreferences();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    async function load(background = false) {
      if (background) setBackgroundRefreshing(true);
      else setLoading(true);

      setError("");

      try {
        const response = await fetch("/api/news?category=" + encodeURIComponent(category), {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("HTTP " + response.status);

        const data = (await response.json()) as NewsPayload;
        if (active) setPayload(data);
      } catch {
        if (active) {
          if (!background) setPayload(null);
          setError(
            text(
              "The external news index could not be loaded.",
              "L’index externe d’actualités n’a pas pu être chargé.",
            ),
          );
        }
      } finally {
        if (active) {
          setLoading(false);
          setBackgroundRefreshing(false);
        }
      }
    }

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void load(true);
    };

    void load();
    intervalId = setInterval(() => void load(true), 5 * 60 * 1000);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      active = false;
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [category, text]);

  const regionFilteredItems = useMemo(() => {
    const items = payload?.items ?? [];

    if (region !== "my-markets") {
      return items.filter((item) => matchesRegion(item, region));
    }

    const selected = preferredRegions
      .map((item) => preferenceToRegion[item])
      .filter((item): item is Exclude<NewsRegion, "my-markets"> => Boolean(item));

    if (selected.includes("global")) return items;

    return items.filter((item) =>
      selected.some((preferred) => matchesRegion(item, preferred)),
    );
  }, [payload, preferredRegions, region]);

  const visibleItems = useMemo(
    () =>
      regionFilteredItems
        .filter((item) => isWithinHours(item.publishedAt, rangeHours[range]))
        .slice(0, range === "72h" ? 60 : 36),
    [range, regionFilteredItems],
  );

  const groupedItems = useMemo(() => {
    const groups = new Map<string, NewsItem[]>();

    for (const item of visibleItems) {
      const key = dayKey(item.publishedAt);
      const current = groups.get(key) ?? [];
      current.push(item);
      groups.set(key, current);
    }

    return Array.from(groups.entries());
  }, [visibleItems]);

  const primaryCount = useMemo(
    () => visibleItems.filter((item) => item.sourceQuality === "primary").length,
    [visibleItems],
  );

  const establishedCount = useMemo(
    () => visibleItems.filter((item) => item.sourceQuality === "established").length,
    [visibleItems],
  );

  const geopoliticsCount = useMemo(
    () => visibleItems.filter((item) => item.topics.includes("geopolitics")).length,
    [visibleItems],
  );

  const decisionCount = useMemo(
    () =>
      visibleItems.filter(
        (item) =>
          item.topics.includes("policy") || item.topics.includes("central-banks"),
      ).length,
    [visibleItems],
  );

  const decisionWatch = useMemo(
    () =>
      visibleItems
        .filter(
          (item) =>
            item.topics.includes("policy") ||
            item.topics.includes("central-banks") ||
            item.topics.includes("geopolitics"),
        )
        .slice(0, 4),
    [visibleItems],
  );

  return (
    <section className="news-blueprint-panel live-journal-panel">
      <div className="panel-heading">
        <div>
          <span className="mini-label">
            {text("LIVE FINANCIAL JOURNAL", "JOURNAL FINANCIER EN DIRECT")}
          </span>
          <h2>
            {text(
              "Hour by hour: what happened, why it matters and what to watch next",
              "Heure par heure : ce qui s’est passé, pourquoi c’est important et quoi surveiller ensuite",
            )}
          </h2>
        </div>

        <span className="connection-badge">
          <span className="status-dot" />
          {loading
            ? text("loading journal", "chargement du journal")
            : payload?.provider.status === "live"
              ? backgroundRefreshing
                ? text("auto-refreshing", "actualisation automatique")
                : text("live · auto-refresh", "live · actualisation auto")
              : text("feed unavailable", "flux indisponible")}
        </span>
      </div>

      <p className="explanation-copy">
        {text(
          "FinanceStudio separates source material from interpretation. Stories can come from primary institutions, established outlets or external reporting; the FinanceStudio lens explains possible financial transmission channels, exposed assets and the next evidence to check. It is an educational framework, not a prediction of what markets will do.",
          "FinanceStudio sépare la source de l’interprétation. Les actualités peuvent venir d’institutions primaires, de médias établis ou de reporting externe ; l’analyse FinanceStudio explique les canaux financiers possibles, les actifs exposés et les prochains éléments à vérifier. C’est un cadre pédagogique, pas une prévision de ce que les marchés vont faire.",
        )}
      </p>

      <div className="journal-status-row">
        <div>
          <span>{text("Stories", "Actualités")}</span>
          <strong>{loading ? "—" : visibleItems.length}</strong>
        </div>
        <div>
          <span>{text("Primary sources", "Sources primaires")}</span>
          <strong>{loading ? "—" : primaryCount}</strong>
        </div>
        <div>
          <span>{text("Geopolitics", "Géopolitique")}</span>
          <strong>{loading ? "—" : geopoliticsCount}</strong>
        </div>
        <div>
          <span>{text("Policy / central banks", "Politique / banques centrales")}</span>
          <strong>{loading ? "—" : decisionCount}</strong>
        </div>
      </div>

      <div className="news-filter-stack">
        <div>
          <span className="control-label">{text("TOPIC", "THÈME")}</span>
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
        </div>

        <div>
          <span className="control-label">{text("TIME WINDOW", "PÉRIODE")}</span>
          <div className="chip-row">
            {ranges.map((item) => (
              <button
                className={range === item.id ? "chip active" : "chip"}
                key={item.id}
                type="button"
                onClick={() => setRange(item.id)}
              >
                {isFrench ? item.fr : item.en}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="control-label">{text("SOURCE REGION", "RÉGION DE LA SOURCE")}</span>
          <div className="chip-row">
            {regionOptions
              .filter((item) => item.id !== "my-markets" || authenticated)
              .map((item) => (
                <button
                  className={region === item.id ? "chip active" : "chip"}
                  key={item.id}
                  type="button"
                  onClick={() => setRegion(item.id)}
                >
                  {isFrench ? item.fr : item.en}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="journal-refresh-note">
        <span>
          {text(
            "Screen refresh every 5 min · persistent archive collected hourly in the background",
            "Rafraîchissement écran toutes les 5 min · archive persistante collectée chaque heure en arrière-plan",
          )}
        </span>
        {payload?.updatedAt ? (
          <strong>
            {text("Last indexed", "Dernière indexation")} · {formatUpdated(payload.updatedAt, isFrench)}
          </strong>
        ) : null}
      </div>

      <p className="inline-status">
        {text(
          "Timeline timestamps use GDELT's source-seen/indexing time when the publisher's exact publication time is not available. Region filtering uses the publisher country returned by GDELT; neither field should be treated as the event location or an official event timestamp.",
          "Les heures de la chronologie utilisent l’heure d’indexation / source-seen de GDELT lorsque l’heure exacte de publication du média n’est pas disponible. Le filtre régional utilise le pays du média renvoyé par GDELT ; aucun de ces champs ne doit être traité comme le lieu de l’événement ou son heure officielle.",
        )}
      </p>

      {error ? <p className="inline-status" role="status">{error}</p> : null}

      {!loading && payload?.provider.status === "error" ? (
        <p className="inline-status" role="status">{payload.provider.message}</p>
      ) : null}

      {!loading && payload?.provider.status === "empty" ? (
        <p className="inline-status" role="status">
          {text(
            "No recent item matched this topic. No synthetic headlines are shown.",
            "Aucun article récent ne correspond à ce thème. Aucun titre synthétique n’est affiché.",
          )}
        </p>
      ) : null}

      {!loading && payload?.provider.status === "live" && visibleItems.length === 0 ? (
        <p className="inline-status" role="status">
          {text(
            "The provider returned recent articles, but none match this combination of region and time window.",
            "Le fournisseur a renvoyé des articles récents, mais aucun ne correspond à cette combinaison de région et de période.",
          )}
        </p>
      ) : null}

      {decisionWatch.length ? (
        <section className="decision-watch-panel">
          <div className="decision-watch-head">
            <div>
              <span className="mini-label">
                {text("DECISION & CATALYST WATCH", "DÉCISIONS & CATALYSEURS À SURVEILLER")}
              </span>
              <h3>
                {text(
                  "Policy, central-bank and geopolitical developments with financial transmission",
                  "Développements politiques, monétaires et géopolitiques pouvant se transmettre aux marchés",
                )}
              </h3>
            </div>
            <span>{text("Not a forecast · watch the evidence", "Pas une prévision · surveille les preuves")}</span>
          </div>

          <div className="decision-watch-grid">
            {decisionWatch.map((item) => (
              <article key={item.id}>
                <span>{formatTime(item.publishedAt, isFrench)}</span>
                <strong>{item.title}</strong>
                <p>{isFrench ? item.insight.watchNext.fr : item.insight.watchNext.en}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {groupedItems.length ? (
        <div className="news-timeline">
          {groupedItems.map(([key, items]) => (
            <section className="news-timeline-day" key={key}>
              <div className="news-day-heading">
                <div>
                  <span className="mini-label">{text("TIMELINE", "CHRONOLOGIE")}</span>
                  <h3>{formatDay(items[0]?.publishedAt ?? key, isFrench)}</h3>
                </div>
                <span>
                  {items.length} {text(items.length === 1 ? "story" : "stories", items.length === 1 ? "actualité" : "actualités")}
                </span>
              </div>

              <div className="news-intelligence-stack">
                {items.map((item) => {
                  const breaking = ageHours(item.publishedAt) <= 2;
                  const transmission = isFrench
                    ? item.insight.transmission.fr
                    : item.insight.transmission.en;

                  return (
                    <article className="news-intelligence-card" key={item.id}>
                      <div className="news-intelligence-meta">
                        <div>
                          <strong>{formatTime(item.publishedAt, isFrench)}</strong>
                          {breaking ? <span className="breaking-badge">{text("NEW", "NOUVEAU")}</span> : null}
                          <span
                            className={
                              item.sourceQuality === "primary"
                                ? "source-quality-badge established"
                                : item.sourceQuality === "established"
                                  ? "source-quality-badge established"
                                  : "source-quality-badge"
                            }
                          >
                            {item.sourceQuality === "primary"
                              ? text("Primary source", "Source primaire")
                              : item.sourceQuality === "established"
                                ? text("Established source", "Source établie")
                                : text("External reporting", "Reporting externe")}
                          </span>
                        </div>

                        <div className="news-topic-row">
                          {item.topics.slice(0, 3).map((topic) => (
                            <span key={topic}>
                              {isFrench ? topicLabels[topic].fr : topicLabels[topic].en}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3>{item.title}</h3>
                      <p className="news-source-line">
                        {item.domain || text("External source", "Source externe")}
                        {item.sourceCountry ? " · " + item.sourceCountry : ""}
                      </p>

                      <div className="finance-lens-header">
                        <span className="mini-label">{text("FINANCESTUDIO LENS", "LECTURE FINANCESTUDIO")}</span>
                        <strong>{isFrench ? item.insight.lens.fr : item.insight.lens.en}</strong>
                      </div>

                      <div className="news-insight-grid">
                        <div>
                          <span className="insight-label">{text("WHY IT MATTERS", "POURQUOI C’EST IMPORTANT")}</span>
                          <p>{isFrench ? item.insight.whyItMatters.fr : item.insight.whyItMatters.en}</p>
                        </div>

                        <div>
                          <span className="insight-label">{text("POTENTIAL TRANSMISSION", "TRANSMISSION POTENTIELLE")}</span>
                          <ul>
                            {transmission.map((channel) => <li key={channel}>{channel}</li>)}
                          </ul>
                        </div>

                        <div>
                          <span className="insight-label">{text("ASSETS TO WATCH", "ACTIFS À SURVEILLER")}</span>
                          <div className="asset-watch-row">
                            {item.insight.assets.map((asset) => <span key={asset}>{asset}</span>)}
                          </div>
                        </div>

                        <div>
                          <span className="insight-label">{text("WHAT TO WATCH NEXT", "QUE SURVEILLER ENSUITE")}</span>
                          <p>{isFrench ? item.insight.watchNext.fr : item.insight.watchNext.en}</p>
                        </div>
                      </div>

                      <div className="scenario-discipline">
                        <span>{text("SCENARIO DISCIPLINE", "DISCIPLINE DE SCÉNARIO")}</span>
                        <p>{isFrench ? item.insight.scenario.fr : item.insight.scenario.en}</p>
                      </div>

                      <p className="headline-analysis-note">
                        {text(
                          "Analysis framework is generated from the headline/topic metadata. Check the original report and primary source before treating the event itself as verified.",
                          "Le cadre d’analyse est généré à partir du titre et des métadonnées du thème. Vérifie le reporting original et la source primaire avant de considérer l’événement lui-même comme vérifié.",
                        )}
                      </p>

                      <div className="news-item-actions">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="module-open-link"
                          onClick={() => void recordDailyActivity()}
                        >
                          {text("Open original source", "Ouvrir la source originale")} ↗
                        </a>

                        <button
                          type="button"
                          className="save-item-button compact"
                          aria-pressed={isNewsSaved(item.id)}
                          disabled={savingNewsKey === item.id}
                          onClick={() =>
                            void toggleNewsSaved(item.id, {
                              title: item.title,
                              titleEn: item.title,
                              titleFr: item.title,
                              subtitleEn: item.insight.lens.en,
                              subtitleFr: item.insight.lens.fr,
                              href: item.url,
                              source: item.domain || (item.sourceQuality === "primary" ? "Primary source" : "External reporting"),
                              publishedAt: item.publishedAt,
                            })
                          }
                        >
                          <span aria-hidden="true">{isNewsSaved(item.id) ? "★" : "☆"}</span>
                          {savingNewsKey === item.id
                            ? text("Saving…", "Enregistrement…")
                            : isNewsSaved(item.id)
                              ? text("Saved", "Enregistré")
                              : canSaveNews
                                ? text("Save", "Enregistrer")
                                : text("Sign in", "Se connecter")}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : null}

      {visibleItems.length ? (
        <p className="inline-status">
          {text(
            String(primaryCount) + " primary source" + (primaryCount === 1 ? "" : "s") + " and " + String(establishedCount) + " established outlet" + (establishedCount === 1 ? "" : "s") + " are displayed. Other items remain external reporting and should be checked more carefully.",
            String(primaryCount) + " source" + (primaryCount > 1 ? "s" : "") + " primaire" + (primaryCount > 1 ? "s" : "") + " et " + String(establishedCount) + " média" + (establishedCount > 1 ? "s" : "") + " établi" + (establishedCount > 1 ? "s" : "") + " sont affichés. Les autres éléments restent du reporting externe à vérifier plus attentivement.",
          )}
        </p>
      ) : null}
    </section>
  );
}
