"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";
import { recordDailyActivity } from "@/lib/record-activity";
import { useSavedItems } from "@/lib/use-saved-items";

type Category = "markets" | "macro" | "central-banks" | "companies";
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

const regionOptions: Array<{
  id: NewsRegion;
  en: string;
  fr: string;
}> = [
  { id: "my-markets", en: "My Markets", fr: "Mes marchés" },
  { id: "global", en: "Global", fr: "Monde" },
  { id: "usa", en: "USA", fr: "USA" },
  { id: "europe", en: "Europe", fr: "Europe" },
  { id: "uk", en: "UK", fr: "Royaume-Uni" },
  { id: "asia", en: "Asia", fr: "Asie" },
  { id: "china", en: "China", fr: "Chine" },
  { id: "japan", en: "Japan", fr: "Japon" },
  {
    id: "emerging-markets",
    en: "Emerging Markets",
    fr: "Marchés émergents",
  },
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

function normalizeCountry(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function matchesRegion(item: NewsItem, region: Exclude<NewsRegion, "my-markets">) {
  if (region === "global") return true;
  const normalized = normalizeCountry(item.sourceCountry);
  if (!normalized) return false;
  return countryGroups[region].has(normalized);
}

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
  const [region, setRegion] = useState<NewsRegion>("global");
  const [preferredRegions, setPreferredRegions] = useState<string[]>([
    "global",
    "usa",
    "europe",
  ]);
  const [authenticated, setAuthenticated] = useState(false);
  const [payload, setPayload] = useState<NewsPayload | null>(null);
  const [loading, setLoading] = useState(true);
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

      const raw = Array.isArray(data?.market_regions)
        ? data.market_regions
        : [];

      const clean = raw
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.toLowerCase())
        .filter((item) => Boolean(preferenceToRegion[item]));

      if (clean.length) {
        setPreferredRegions([...new Set(clean)]);
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

  const visibleItems = useMemo(() => {
    const items = payload?.items ?? [];

    if (region !== "my-markets") {
      return items.filter((item) => matchesRegion(item, region)).slice(0, 24);
    }

    const selected = preferredRegions
      .map((item) => preferenceToRegion[item])
      .filter(
        (
          item,
        ): item is Exclude<NewsRegion, "my-markets"> => Boolean(item),
      );

    const includesGlobal = selected.includes("global");
    const specific = selected.filter((item) => item !== "global");

    const candidates = includesGlobal
      ? items
      : items.filter((item) =>
          specific.some((preferred) => matchesRegion(item, preferred)),
        );

    return candidates
      .map((item, index) => {
        const priority = specific.findIndex((preferred) =>
          matchesRegion(item, preferred),
        );
        return {
          item,
          index,
          priority: priority === -1 ? Number.MAX_SAFE_INTEGER : priority,
        };
      })
      .sort((a, b) => a.priority - b.priority || a.index - b.index)
      .slice(0, 24)
      .map((entry) => entry.item);
  }, [payload, preferredRegions, region]);

  const establishedCount = useMemo(
    () =>
      visibleItems.filter(
        (item) => item.sourceQuality === "established",
      ).length,
    [visibleItems],
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
          <span className="control-label">
            {text("SOURCE REGION", "RÉGION DE LA SOURCE")}
          </span>
          <div className="chip-row">
            {regionOptions
              .filter(
                (item) => item.id !== "my-markets" || authenticated,
              )
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

      <p className="inline-status">
        {text(
          "Region filtering uses GDELT's publisher-country metadata. It tells you where the reporting outlet is based, not necessarily where the underlying financial event occurred.",
          "Le filtre régional utilise le pays d’origine du média fourni par GDELT. Il indique où se trouve la source du reporting, pas nécessairement où l’événement financier s’est produit.",
        )}
      </p>

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

      {!loading &&
      payload?.provider.status === "live" &&
      visibleItems.length === 0 ? (
        <p className="inline-status" role="status">
          {text(
            "The provider returned recent articles, but none match this source-region filter. Switch to Global to see the complete connected feed.",
            "Le fournisseur a renvoyé des articles récents, mais aucun ne correspond à ce filtre de région de source. Passe sur Monde pour voir le flux connecté complet.",
          )}
        </p>
      ) : null}

      {visibleItems.length ? (
        <>
          <div className="news-analysis-grid">
            {visibleItems.map((item, index) => (
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
                  <div className="news-item-actions">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="module-open-link"
                      onClick={() => void recordDailyActivity()}
                    >
                      {text(
                        "Open original reporting",
                        "Ouvrir le reporting original",
                      )}{" "}
                      ↗
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
                          subtitleEn: item.domain,
                          subtitleFr: item.domain,
                          href: item.url,
                          source: item.domain || "External reporting",
                          publishedAt: item.publishedAt,
                        })
                      }
                    >
                      <span aria-hidden="true">
                        {isNewsSaved(item.id) ? "★" : "☆"}
                      </span>
                      {savingNewsKey === item.id
                        ? text("Saving…", "Enregistrement…")
                        : isNewsSaved(item.id)
                          ? text("Saved", "Enregistré")
                          : canSaveNews
                            ? text("Save", "Enregistrer")
                            : text("Sign in", "Se connecter")}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="inline-status">
            {text(
              `${establishedCount} of ${visibleItems.length} displayed sources match FinanceStudio's current established-outlet allowlist. Other sources remain labeled as external reporting and should be checked more carefully.`,
              `${establishedCount} source${establishedCount > 1 ? "s" : ""} sur ${visibleItems.length} correspond${establishedCount > 1 ? "ent" : ""} à l’allowlist actuelle de médias établis de FinanceStudio. Les autres restent du reporting externe à vérifier plus attentivement.`,
            )}
          </p>
        </>
      ) : null}
    </section>
  );
}
