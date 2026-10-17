"use client";

import Link from "next/link";
import MarketCategoryGuide from "./market-category-guide";
import MarketPanorama from "./market-panorama";
import MarketSparkline from "./market-sparkline";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { createClient } from "@/lib/supabase/client";

type Region = "Global" | "USA" | "Europe" | "UK" | "Asia" | "China" | "Japan" | "Emerging Markets";
type RegionFilter = Region | "My Markets";
type Mode = "Beginner" | "Intermediate" | "Professional";

type MarketQuote = {
  id: string;
  label: string;
  category: "Equities" | "Rates" | "FX" | "Commodities" | "Volatility" | "Credit";
  region: Region;
  value: number;
  previousValue: number | null;
  change: number | null;
  changePercent: number | null;
  unit: "" | "%" | "$" | "bps";
  asOf: string;
  source: string;
  sourceUrl: string;
  history?: {date:string;value:number}[];
};

type ProviderStatus = {
  id: "ecb" | "fred";
  label: string;
  status: "live" | "partial" | "needs_configuration" | "error";
  message: string;
};

type MarketPayload = {
  updatedAt: string;
  quotes: MarketQuote[];
  providers: ProviderStatus[];
};

const regions: RegionFilter[] = ["My Markets", "Global", "USA", "Europe", "UK", "Asia", "China", "Japan", "Emerging Markets"];

const preferenceRegionMap: Record<string, Region> = {
  global: "Global",
  usa: "USA",
  europe: "Europe",
  uk: "UK",
  asia: "Asia",
  china: "China",
  japan: "Japan",
  "emerging-markets": "Emerging Markets",
};
const modes: Mode[] = ["Beginner", "Intermediate", "Professional"];

const explanation: Record<Mode, { en: string; fr: string }> = {
  Beginner: {
    en: "A market move is useful only if you understand the chain behind it. Start with the number, then identify the trigger, mechanism and next catalyst.",
    fr: "Un mouvement de marché n’est utile que si tu comprends la chaîne qui l’explique. Commence par le chiffre, puis identifie le déclencheur / trigger, le mécanisme et le prochain catalyseur / catalyst.",
  },
  Intermediate: {
    en: "Interpret moves through expectations, macro data, policy transmission, positioning and cross-asset relationships — not only by looking at whether a price is up or down.",
    fr: "Interprète les mouvements à travers les anticipations / expectations, les données macro, la transmission de politique monétaire / policy transmission, le positionnement / positioning et les relations multi-actifs / cross-asset.",
  },
  Professional: {
    en: "Focus on repricing versus consensus, curve and spread dynamics, relative value, positioning, liquidity and the catalysts capable of invalidating the current market narrative.",
    fr: "Concentre-toi sur le repricing par rapport au consensus, la dynamique des courbes / curves et spreads, la relative value, le positionnement, la liquidité / liquidity et les catalyseurs capables d’invalider le scénario de marché.",
  },
};

function formatValue(quote: MarketQuote) {
  if (quote.unit === "%") return `${quote.value.toFixed(2)}%`;
  if (quote.unit === "$") return `$${quote.value.toFixed(2)}`;
  if (quote.unit === "bps") return `${quote.value.toFixed(0)} bps`;
  if (quote.category === "FX") {
    return quote.value >= 100 ? quote.value.toFixed(2) : quote.value.toFixed(4);
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: quote.value >= 100 ? 2 : 4,
  }).format(quote.value);
}

function formatMove(quote: MarketQuote) {
  if (quote.changePercent === null) return "—";
  const sign = quote.changePercent > 0 ? "+" : "";
  return `${sign}${quote.changePercent.toFixed(2)}%`;
}

export default function MarketsWorkspace() {
  const { isFrench, text } = useLanguage();
  const [region, setRegion] = useState<RegionFilter>("Global");
  const [mode, setMode] = useState<Mode>("Beginner");
  const [userId, setUserId] = useState<string | null>(null);
  const [preferredRegions, setPreferredRegions] = useState<Region[]>([
    "Global",
    "USA",
    "Europe",
  ]);
  const [payload, setPayload] = useState<MarketPayload | null>(null);
  const [source, setSource] = useState("all");
  const [assetClass,setAssetClass] = useState("all");
  const [search,setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function hydratePreferences() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active || !user) return;
      setUserId(user.id);

      const [profileResult, preferencesResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("explanation_level")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("user_preferences")
          .select("market_regions")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      if (!active) return;

      const level = profileResult.data?.explanation_level;
      if (level === "intermediate") setMode("Intermediate");
      else if (level === "professional") setMode("Professional");
      else if (level === "beginner") setMode("Beginner");

      const rawRegions = Array.isArray(
        preferencesResult.data?.market_regions,
      )
        ? preferencesResult.data.market_regions
        : [];

      const mapped: Region[] = rawRegions.flatMap((item) => {
        if (typeof item !== "string") return [];
        const mappedRegion = preferenceRegionMap[item.toLowerCase()];
        return mappedRegion ? [mappedRegion] : [];
      });

      if (mapped.length) {
        setPreferredRegions(Array.from(new Set<Region>(mapped)));
        setRegion("My Markets");
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
      try {
        setError("");
        const response = await fetch("/api/markets", { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = (await response.json()) as MarketPayload;
        if (active) setPayload(data);
      } catch {
        if (active) {
          setError(text(
            "Live market data could not be loaded. No fallback prices are being invented.",
            "Les données de marché en direct n’ont pas pu être chargées. Aucun prix de secours fictif n’est affiché.",
          ));
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [text]);

  const regionLabel = (value: RegionFilter) => {
    if (value === "My Markets") return text("My Markets", "Mes marchés");
    if (!isFrench) return value;
    if (value === "Global") return "Monde";
    if (value === "UK") return "Royaume-Uni";
    if (value === "Asia") return "Asie";
    if (value === "China") return "Chine";
    if (value === "Japan") return "Japon";
    if (value === "Emerging Markets") return "Marchés émergents / emerging markets";
    return value;
  };

  const modeLabel = (value: Mode) =>
    !isFrench
      ? value
      : value === "Beginner"
        ? "Débutant"
        : value === "Intermediate"
          ? "Intermédiaire"
          : "Professionnel";

  const regionNote = useMemo(() => {
    if (region === "My Markets") {
      return text(
        `My Markets · ${preferredRegions.map((item) => regionLabel(item)).join(" · ")}`,
        `Mes marchés · ${preferredRegions.map((item) => regionLabel(item)).join(" · ")}`,
      );
    }
    if (region === "Global") {
      return text("Latest connected market observations", "Dernières observations de marché connectées");
    }
    return text(
      `${region} focus — global context remains available`,
      `Focus ${regionLabel(region)} — le contexte mondial reste disponible`,
    );
  }, [region, isFrench, preferredRegions, text]);

  const visibleQuotes = useMemo(() => {
    const quotes = (payload?.quotes ?? []).filter(q => (source === "all" || (source === "fred" ? q.source.includes("FRED") : q.source.includes("European Central Bank"))) && (assetClass === "all" || q.category === assetClass) && q.label.toLowerCase().includes(search.toLowerCase()));
    if (region === "My Markets") {
      if (preferredRegions.includes("Global")) return quotes;

      return quotes.filter((quote) => {
        if (preferredRegions.includes(quote.region)) return true;
        return (
          preferredRegions.includes("Asia") &&
          ["China", "Japan"].includes(quote.region)
        );
      });
    }
    if (region === "Global") return quotes;
    if (region === "Asia") {
      return quotes.filter((quote) => ["Asia", "China", "Japan"].includes(quote.region));
    }
    return quotes.filter((quote) => quote.region === region);
  }, [payload, preferredRegions, region, source, assetClass, search]);

  const groups = useMemo(() => {
    const order: MarketQuote["category"][] = ["Equities", "Rates", "FX", "Commodities", "Volatility", "Credit"];
    return order
      .map((category) => ({
        category,
        quotes: visibleQuotes.filter((quote) => quote.category === category),
      }))
      .filter((group) => group.quotes.length > 0);
  }, [visibleQuotes]);

  const liveProviders = payload?.providers.filter((provider) => provider.status === "live").length ?? 0;

  async function chooseMode(nextMode: Mode) {
    setMode(nextMode);
    if (!userId) return;

    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        explanation_level: nextMode.toLowerCase(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }

  return (
    <div className="workspace-stack">
      <MarketPanorama quotes={payload?.quotes || []} loading={loading}/>
      <section className="market-education-banner"><span className="mini-label">{text("LEARN BEFORE YOU INTERPRET","APPRENDRE AVANT D’INTERPRÉTER")}</span><h2>{text("A complete course behind every number","Un vrai cours derrière chaque chiffre")}</h2><p>{text("FRED and the ECB are data providers, not two markets. Explore six asset classes, currencies across regions, observation histories and a 12-chapter learning module.","FRED et la BCE sont des fournisseurs de données, pas deux marchés. Explore six classes d’actifs, des devises de plusieurs régions, leurs historiques et un module de 12 chapitres.")}</p><Link className="full-button" href="/markets/guide">{text("Learn to read markets · full module","Apprendre à lire les marchés · module complet")} →</Link></section>
      <section className="control-panel">
        <div>
          <span className="control-label">{text("REGION", "RÉGION")}</span>
          <div className="chip-row">
            {regions
              .filter((item) => item !== "My Markets" || Boolean(userId))
              .map((item) => (
              <button
                className={region === item ? "chip active" : "chip"}
                onClick={() => setRegion(item)}
                key={item}
                type="button"
              >
                {regionLabel(item)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="control-label">{text("EXPLANATION MODE", "MODE D’EXPLICATION")}</span>
          <div className="chip-row">
            {modes.map((item) => (
              <button
                className={mode === item ? "chip active" : "chip"}
                onClick={() => void chooseMode(item)}
                key={item}
                type="button"
              >
                {modeLabel(item)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="market-overview-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{regionNote}</span>
            <h2>{text("Connected cross-asset market map", "Carte de marché multi-actifs connectée")}</h2>
          </div>
          <span className="connection-badge">
            <span className="status-dot" />
            {loading
              ? text("loading sources", "chargement des sources")
              : text(
                  `${liveProviders} live provider${liveProviders === 1 ? "" : "s"}`,
                  `${liveProviders} source${liveProviders === 1 ? "" : "s"} active${liveProviders === 1 ? "" : "s"}`,
                )}
          </span>
        </div>

        <p className="explanation-copy">{isFrench ? explanation[mode].fr : explanation[mode].en}</p>

        {payload?.providers?.length ? (
          <div className="chip-row provider-filter">
            <button type="button" className={source === "all" ? "chip active" : "chip"} aria-pressed={source === "all"} onClick={() => setSource("all")}>{text("All sources","Toutes les sources")}</button>
            {payload.providers.map((provider) => (
              <button type="button" aria-pressed={source === provider.id} onClick={() => setSource(current => current === provider.id ? "all" : provider.id)}
                className={source === provider.id ? "chip active" : "chip"}
                key={provider.id}
                title={provider.message}
              >
                {provider.label} · {provider.status.replace("_", " ")}
              </button>
            ))}
          </div>
        ) : null}

        <div className="news-filter-stack"><label><span className="control-label">{text("FIND AN INSTRUMENT","CHERCHER UN INSTRUMENT")}</span><input aria-label={text("Find an instrument","Chercher un instrument")} value={search} onChange={e=>setSearch(e.target.value)} placeholder="S&P, EUR, 10Y…"/></label><div className="chip-row">{["all","Equities","Rates","FX","Commodities","Volatility","Credit"].map(category=><button key={category} className={assetClass===category?"chip active":"chip"} type="button" onClick={()=>setAssetClass(category)}>{category==="all"?text("All asset classes","Toutes les classes"):category}</button>)}</div><p>{visibleQuotes.length} {text("observations match these filters","observations correspondent aux filtres")}</p></div>
        {error && <p className="inline-status" role="status">{error}</p>}

        {!loading && !error && groups.length === 0 ? (
          <div className="coverage-panel">
            <span className="mini-label">{text("NO CONNECTED SERIES FOR THIS FILTER", "AUCUNE SÉRIE CONNECTÉE POUR CE FILTRE")}</span>
            <h3>{text(
              "FinanceStudio will not fill missing coverage with placeholder prices.",
              "FinanceStudio ne remplit pas les zones manquantes avec des prix fictifs.",
            )}</h3>
            <p>{text(
              "Switch to Global or another region to see available provider data.",
              "Passe sur Monde ou une autre région pour voir les données réellement disponibles.",
            )}</p>
          </div>
        ) : null}

        <div className="market-category-stack">
          {groups.map(group => <section className="market-category" key={group.category}>
            <header><h3>{group.category}</h3><span>{group.quotes.length} {text("instruments", "instruments")}</span></header>
            <MarketCategoryGuide category={group.category}/>
            <div className="market-instrument-grid">{group.quotes.map(quote => <article className="market-instrument-card market-photo-instrument" key={quote.id} style={{backgroundImage:`linear-gradient(var(--instrument-overlay),var(--instrument-overlay)),url(/market-images/${({Equities:"trading",Rates:"city",FX:"currency",Commodities:quote.label==="Gold"?"gold":"energy",Volatility:"trading",Credit:"city"})[quote.category]}.jpg)`}}>
              <h4>{quote.label}</h4>
              <div className="instrument-value"><strong>{formatValue(quote)}</strong><b className={`quote-move ${quote.change === null ? "" : quote.change >= 0 ? "up" : "down"}`}>{quote.unit === "%" && quote.change !== null ? `${quote.change>=0?"+":""}${(quote.change*100).toFixed(1)} bps` : formatMove(quote)}</b></div>
              {quote.history && <MarketSparkline points={quote.history} label={quote.label} />}
              <p className="instrument-source">{text("As of", "Au")} {quote.asOf} · <a href={quote.sourceUrl} target="_blank" rel="noreferrer">{quote.source} ↗</a></p>
              <Link className="instrument-lesson-link" href={`/markets/guide/${({Equities:"equities",Rates:"yield-curve",FX:"fx",Commodities:"commodities",Volatility:"volatility",Credit:"credit"})[quote.category]}`}>{text("Understand this instrument","Comprendre cet instrument")} →</Link>
            </article>)}</div>
          </section>)}
        </div>

        {payload?.updatedAt ? (
          <p className="inline-status">
            {text(
              "Data reflects the latest observation returned by each provider, not necessarily an intraday real-time tick.",
              "Les données reflètent la dernière observation renvoyée par chaque fournisseur, pas nécessairement un tick intraday en temps réel.",
            )}
          </p>
        ) : null}
      </section>

      <section className="analysis-grid">
        <article className="analysis-card">
          <span className="mini-label">01 · {text("WHAT CHANGED?", "QU’EST-CE QUI A CHANGÉ ?")}</span>
          <h3>{text("Move before narrative", "Le mouvement avant le récit")}</h3>
          <p>{text(
            "Identify the asset, magnitude, time window and whether the move is unusual relative to recent volatility.",
            "Identifie l’actif, l’amplitude du mouvement, la fenêtre temporelle et détermine s’il est inhabituel par rapport à la volatilité récente / recent volatility.",
          )}</p>
        </article>

        <article className="analysis-card">
          <span className="mini-label">02 · {text("WHY?", "POURQUOI ?")}</span>
          <h3>{text("Find the transmission chain", "Trouver la chaîne de transmission / transmission chain")}</h3>
          <p>{text(
            "Connect macro data, central banks, earnings, geopolitics, positioning and liquidity to the price action.",
            "Relie données macro, banques centrales / central banks, résultats / earnings, géopolitique, positionnement et liquidité / liquidity au mouvement de prix / price action.",
          )}</p>
        </article>

        <article className="analysis-card">
          <span className="mini-label">03 · {text("WHAT NEXT?", "ET ENSUITE ?")}</span>
          <h3>{text("Define catalysts", "Identifier les catalyseurs / catalysts")}</h3>
          <p>{text(
            "List the next releases, speeches, earnings or technical levels that could confirm or invalidate the move.",
            "Liste les prochaines publications, interventions, résultats / earnings ou niveaux techniques pouvant confirmer ou invalider le mouvement.",
          )}</p>
        </article>
      </section>
    </div>
  );
}
