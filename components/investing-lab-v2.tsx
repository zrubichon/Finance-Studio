"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";
import { recordDailyActivity } from "@/lib/record-activity";
import PaperTradingPanel from "@/components/paper-trading-panel";

type AssetClass = "equity" | "etf" | "bond" | "fx" | "commodity" | "crypto" | "option";
type Level = "Beginner" | "Intermediate" | "Professional";
type PortfolioSnapshot = {
  portfolio: { id: string; name: string; base_currency: string; starting_cash: number; cash_balance: number };
  positions: Array<{ id: string }>;
  metrics: { fullCoverage: boolean; pricedPositions: number; totalPositions: number; marketValue: number | null; totalEquity: number | null; totalPnl: number | null; returnPercent: number | null; realizedPnl: number };
};
type Thesis = {
  id: string; symbol: string; thesis: string; valuation_or_macro_assumption: string | null; catalyst: string | null;
  time_horizon: string | null; invalidation_condition: string | null; downside_case: string | null; portfolio_risk_note: string | null;
  review_notes: string | null; created_at: string; updated_at: string;
};
type InstrumentQuote = {
  symbol: string; assetClass: AssetClass; price: number; previousClose: number | null; currency: string | null; asOf: string; source: string; sourceUrl: string; delayed: boolean;
};
type MarketQuote = { id: string; label: string; category: string; value: number; previousValue: number | null; changePercent: number | null; unit: "" | "%" | "$" | "bps"; asOf: string; source: string };
type MarketPayload = { updatedAt: string; quotes: MarketQuote[]; providers: Array<{ id: string; label: string; status: string; message: string }> };
type Coaching = { headline?: string; whatYouKnow?: string; whatIsAssumption?: string; whatIsMissing?: string[]; marketRead?: string; riskCheck?: string; nextQuestion?: string; qualityScore?: number; plainEnglish?: string };

const assets: Array<{ value: AssetClass; en: string; fr: string; example: string }> = [
  { value: "equity", en: "Equity", fr: "Action", example: "AAPL" },
  { value: "etf", en: "ETF", fr: "ETF", example: "SPY" },
  { value: "fx", en: "FX", fr: "Devises / FX", example: "EUR/USD" },
  { value: "commodity", en: "Commodity", fr: "Matière première", example: "GC=F" },
  { value: "crypto", en: "Crypto", fr: "Crypto", example: "BTC-USD" },
  { value: "bond", en: "Bond", fr: "Obligation", example: "US10Y" },
  { value: "option", en: "Option", fr: "Option", example: "Provider format" },
];

function money(value: number | null, currency = "USD") {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

function formatMarket(quote: MarketQuote) {
  if (quote.unit === "%") return `${quote.value.toFixed(2)}%`;
  if (quote.unit === "$") return `$${quote.value.toFixed(2)}`;
  if (quote.unit === "bps") return `${quote.value.toFixed(0)} bps`;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(quote.value);
}

export default function InvestingLabV2() {
  const { isFrench, text } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot | null>(null);
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [markets, setMarkets] = useState<MarketPayload | null>(null);
  const [level, setLevel] = useState<Level>("Beginner");
  const [assetClass, setAssetClass] = useState<AssetClass>("equity");
  const [symbol, setSymbol] = useState("");
  const [quote, setQuote] = useState<InstrumentQuote | null>(null);
  const [quoteStatus, setQuoteStatus] = useState("");
  const [thesis, setThesis] = useState("");
  const [assumption, setAssumption] = useState("");
  const [catalyst, setCatalyst] = useState("");
  const [horizon, setHorizon] = useState("");
  const [invalidation, setInvalidation] = useState("");
  const [downside, setDownside] = useState("");
  const [risk, setRisk] = useState("");
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);
  const [coachError, setCoachError] = useState("");
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [status, setStatus] = useState("");

  async function reloadPortfolio() {
    const response = await fetch("/api/investing/portfolio", { cache: "no-store" });
    if (!response.ok) throw new Error(text("Portfolio unavailable.", "Portefeuille indisponible."));
    setSnapshot(await response.json() as PortfolioSnapshot);
  }

  useEffect(() => {
    let mounted = true;
    async function load() {
      const stored = window.localStorage.getItem("finance-studio-level");
      if (stored === "Beginner" || stored === "Intermediate" || stored === "Professional") setLevel(stored);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;
      setUserId(user.id);
      try {
        const [portfolioResponse, marketResponse, thesisResult] = await Promise.all([
          fetch("/api/investing/portfolio", { cache: "no-store" }),
          fetch("/api/markets", { cache: "no-store" }),
          supabase.from("investment_theses").select("id,symbol,thesis,valuation_or_macro_assumption,catalyst,time_horizon,invalidation_condition,downside_case,portfolio_risk_note,review_notes,created_at,updated_at").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(12),
        ]);
        if (!mounted) return;
        if (portfolioResponse.ok) setSnapshot(await portfolioResponse.json() as PortfolioSnapshot);
        if (marketResponse.ok) setMarkets(await marketResponse.json() as MarketPayload);
        setTheses((thesisResult.data ?? []) as Thesis[]);
      } catch {
        if (mounted) setStatus(text("Some Investing Lab data could not be loaded.", "Certaines données d'Investing Lab n'ont pas pu être chargées."));
      }
    }
    void load();
    return () => { mounted = false; };
  }, [text]);

  useEffect(() => {
    setQuote(null);
    setQuoteStatus("");
    if (!symbol.trim()) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/investing/quote?symbol=${encodeURIComponent(symbol.trim())}&assetClass=${encodeURIComponent(assetClass)}`, { cache: "no-store", signal: controller.signal });
        const payload = await response.json() as { quote?: InstrumentQuote; error?: string; provider?: { message?: string } };
        if (!response.ok || !payload.quote) throw new Error(payload.error || payload.provider?.message || text("No verified quote available.", "Aucun prix vérifié disponible."));
        setQuote(payload.quote);
        setQuoteStatus(text(`Verified via ${payload.quote.source}${payload.quote.delayed ? " · delayed" : ""}.`, `Vérifié via ${payload.quote.source}${payload.quote.delayed ? " · différé" : ""}.`));
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setQuoteStatus(error instanceof Error ? error.message : text("No verified quote available.", "Aucun prix vérifié disponible."));
      }
    }, 650);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [assetClass, symbol, text]);

  const coachSignature = useMemo(() => [level, assetClass, symbol, thesis, assumption, catalyst, horizon, invalidation, downside, risk, quote?.price, quote?.asOf].join("|"), [level, assetClass, symbol, thesis, assumption, catalyst, horizon, invalidation, downside, risk, quote]);

  useEffect(() => {
    const hasIdea = symbol.trim().length >= 2 || thesis.trim().length >= 20 || assumption.trim().length >= 20 || catalyst.trim().length >= 15;
    if (!hasIdea) {
      setCoaching(null);
      setCoachError("");
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setCoachLoading(true);
      setCoachError("");
      try {
        const response = await fetch("/api/investing/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ language: isFrench ? "FR" : "EN", level, assetClass, symbol, thesis, assumption, catalyst, horizon, invalidation, downside, risk, quote }),
        });
        const payload = await response.json() as { coaching?: Coaching; error?: string };
        if (!response.ok || !payload.coaching) throw new Error(payload.error || text("AI mentor unavailable.", "Mentor IA indisponible."));
        setCoaching(payload.coaching);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setCoachError(error instanceof Error ? error.message : text("AI mentor unavailable.", "Mentor IA indisponible."));
      } finally {
        if (!controller.signal.aborted) setCoachLoading(false);
      }
    }, 950);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [coachSignature, isFrench]);

  async function saveThesis(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId || !snapshot?.portfolio || !symbol.trim() || !thesis.trim() || saving) return;
    setSaving(true);
    setStatus("");
    const supabase = createClient();
    const { data, error } = await supabase.from("investment_theses").insert({
      user_id: userId,
      portfolio_id: snapshot.portfolio.id,
      symbol: symbol.trim().toUpperCase(),
      thesis: thesis.trim(),
      valuation_or_macro_assumption: assumption.trim() || null,
      catalyst: catalyst.trim() || null,
      time_horizon: horizon.trim() || null,
      invalidation_condition: invalidation.trim() || null,
      downside_case: downside.trim() || null,
      portfolio_risk_note: risk.trim() || null,
    }).select("id,symbol,thesis,valuation_or_macro_assumption,catalyst,time_horizon,invalidation_condition,downside_case,portfolio_risk_note,review_notes,created_at,updated_at").single();
    if (error || !data) setStatus(text("The decision sheet could not be saved.", "La fiche de décision n'a pas pu être enregistrée."));
    else {
      setTheses((current) => [data as Thesis, ...current].slice(0, 12));
      await recordDailyActivity(userId);
      setStatus(text("Decision sheet saved. You can now paper-trade and review the outcome later.", "Fiche de décision enregistrée. Tu peux maintenant simuler l'investissement puis revoir le résultat plus tard."));
    }
    setSaving(false);
  }

  async function resetSimulation() {
    if (resetting) return;
    const confirmed = window.confirm(text("Reset the entire paper simulation? This clears paper positions, transactions, performance history and saved investment theses, then restores starting virtual cash.", "Réinitialiser toute la simulation ? Cela efface positions, transactions, historique de performance et thèses sauvegardées, puis restaure le cash virtuel initial."));
    if (!confirmed) return;
    setResetting(true);
    setStatus("");
    try {
      const response = await fetch("/api/investing/reset", { method: "POST" });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || text("Reset failed.", "Réinitialisation impossible."));
      setTheses([]);
      setSymbol(""); setQuote(null); setThesis(""); setAssumption(""); setCatalyst(""); setHorizon(""); setInvalidation(""); setDownside(""); setRisk(""); setCoaching(null);
      await reloadPortfolio();
      setStatus(text("Simulation reset. You are back to the original virtual starting capital.", "Simulation réinitialisée. Tu repars avec le capital virtuel initial."));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : text("Reset failed.", "Réinitialisation impossible."));
    } finally { setResetting(false); }
  }

  if (!userId) return <section className="learning-account-strip"><div><span className="mini-label">{text("PAPER INVESTING SIMULATOR", "SIMULATEUR D'INVESTISSEMENT")}</span><h2>{text("Sign in to use your private simulation.", "Connecte-toi pour utiliser ta simulation privée.")}</h2><p>{text("Your decision journal, virtual cash and paper positions are stored privately in your account. No real-money order is ever sent.", "Ton journal de décision, ton cash virtuel et tes positions simulées sont enregistrés dans ton compte. Aucun ordre en argent réel n'est jamais envoyé.")}</p></div><Link className="full-button" href="/login">{text("Sign in", "Se connecter")} →</Link></section>;

  const currency = snapshot?.portfolio.base_currency ?? "USD";
  return <div className="workspace-stack investing-v2">
    <section className="investing-command-center">
      <div><span className="mini-label">{text("SIMULATION ACCOUNT", "COMPTE DE SIMULATION")}</span><h2>{snapshot ? money(snapshot.metrics.totalEquity ?? snapshot.portfolio.cash_balance, currency) : text("Loading…", "Chargement…")}</h2><p>{text("Virtual equity. Prices are valued only when a verified provider quote is available.", "Valeur virtuelle. Les positions ne sont valorisées que lorsqu'un fournisseur vérifié renvoie un prix.")}</p></div>
      <div className="investing-command-metrics"><div><span>{text("Cash", "Cash")}</span><strong>{snapshot ? money(snapshot.portfolio.cash_balance, currency) : "—"}</strong></div><div><span>{text("P&L", "P&L")}</span><strong>{snapshot ? money(snapshot.metrics.totalPnl, currency) : "—"}</strong></div><div><span>{text("Return", "Rendement")}</span><strong>{snapshot?.metrics.returnPercent == null ? "—" : `${snapshot.metrics.returnPercent > 0 ? "+" : ""}${snapshot.metrics.returnPercent.toFixed(2)}%`}</strong></div></div>
      <button type="button" className="secondary-danger-button" disabled={resetting} onClick={() => void resetSimulation()}>{resetting ? text("Resetting…", "Réinitialisation…") : text("Reset simulation", "Réinitialiser la simulation")}</button>
    </section>

    <section className="investing-market-strip">
      <div className="panel-heading"><div><span className="mini-label">{text("REAL MARKET SNAPSHOT", "SNAPSHOT DE MARCHÉ RÉEL")}</span><h2>{text("Observe first, decide second.", "Observer d'abord, décider ensuite.")}</h2></div><span className="connection-badge">{markets?.providers.filter((provider) => provider.status === "live").length ?? 0} {text("live sources", "sources live")}</span></div>
      {markets?.quotes.length ? <div className="investing-market-grid">{markets.quotes.slice(0, 8).map((item) => <article key={item.id}><span>{item.label}</span><strong>{formatMarket(item)}</strong><small>{item.changePercent == null ? "" : `${item.changePercent > 0 ? "+" : ""}${item.changePercent.toFixed(2)}%`} · {item.source}</small></article>)}</div> : <p>{text("No verified broad-market snapshot is available right now. The simulator will still request a verified instrument quote before a paper order.", "Aucun snapshot global vérifié n'est disponible pour le moment. Le simulateur demandera tout de même un prix vérifié avant chaque ordre simulé.")}</p>}
    </section>

    <section className="decision-workbench">
      <div className="decision-sheet-panel">
        <div className="panel-heading"><div><span className="mini-label">{text("DECISION SHEET", "FICHE DE DÉCISION")}</span><h2>{text("Build the investment logic before touching the order ticket.", "Construis le raisonnement avant de toucher au ticket d'ordre.")}</h2></div><div className="chip-row">{(["Beginner", "Intermediate", "Professional"] as Level[]).map((item) => <button key={item} type="button" className={level === item ? "chip active" : "chip"} onClick={() => setLevel(item)}>{item === "Beginner" ? text("Beginner", "Débutant") : item === "Intermediate" ? text("Intermediate", "Intermédiaire") : text("Professional", "Professionnel")}</button>)}</div></div>
        <form className="decision-sheet-form" onSubmit={saveThesis}>
          <div className="decision-row-two"><label><span>{text("Asset class", "Classe d'actifs")}</span><select value={assetClass} onChange={(event) => setAssetClass(event.target.value as AssetClass)}>{assets.map((item) => <option value={item.value} key={item.value}>{isFrench ? item.fr : item.en}</option>)}</select><small>{text("What kind of instrument are you analyzing?", "Quel type d'instrument analyses-tu ?")}</small></label><label><span>{text("Symbol / ticker", "Symbole / ticker")}</span><input value={symbol} onChange={(event) => setSymbol(event.target.value)} placeholder={assets.find((item) => item.value === assetClass)?.example} /><small>{quoteStatus || text("FinanceStudio checks a provider price automatically.", "FinanceStudio vérifie automatiquement un prix fournisseur.")}</small></label></div>
          {quote ? <div className="verified-quote-card"><div><span>{quote.symbol}</span><strong>{money(quote.price, quote.currency || "USD")}</strong></div><p>{text("Reference observation", "Observation de référence")} · {quote.asOf} · {quote.source}{quote.delayed ? ` · ${text("delayed", "différé")}` : ""}</p><small>{text("A market price tells you where the instrument traded or was quoted; it does not by itself tell you intrinsic value or whether the asset is a good investment.", "Un prix de marché indique où l'instrument a été traité ou coté ; à lui seul, il ne dit ni sa valeur intrinsèque ni si l'investissement est bon.")}</small></div> : null}
          <label><span>{text("1. Investment thesis", "1. Thèse d'investissement")}</span><textarea value={thesis} onChange={(event) => setThesis(event.target.value)} rows={4} placeholder={text("What do you believe, and why might the market be wrong or incomplete?", "Que crois-tu, et pourquoi le marché pourrait-il se tromper ou ne pas tout intégrer ?")} /><small>{text("State the mechanism, not just 'I think it will go up'.", "Explique le mécanisme, pas seulement « je pense que ça va monter ».")}</small></label>
          <label><span>{text("2. Valuation / macro assumption", "2. Hypothèse de valorisation / macro")}</span><textarea value={assumption} onChange={(event) => setAssumption(event.target.value)} rows={3} placeholder={text("Which assumption matters most: growth, margins, rates, multiple, FX, inflation…?", "Quelle hypothèse compte le plus : croissance, marges, taux, multiple, FX, inflation… ?")} /></label>
          <div className="decision-row-two"><label><span>{text("3. Catalyst", "3. Catalyseur")}</span><textarea value={catalyst} onChange={(event) => setCatalyst(event.target.value)} rows={3} placeholder={text("What could make the market reassess the asset?", "Qu'est-ce qui pourrait faire réévaluer l'actif par le marché ?")} /></label><label><span>{text("4. Time horizon", "4. Horizon")}</span><textarea value={horizon} onChange={(event) => setHorizon(event.target.value)} rows={3} placeholder={text("Days, months, years — and why?", "Jours, mois, années — et pourquoi ?")} /></label></div>
          <div className="decision-row-two"><label><span>{text("5. Invalidation condition", "5. Condition d'invalidation")}</span><textarea value={invalidation} onChange={(event) => setInvalidation(event.target.value)} rows={3} placeholder={text("What evidence would prove your thesis wrong?", "Quelle preuve montrerait que ta thèse est fausse ?")} /></label><label><span>{text("6. Downside case", "6. Scénario baissier")}</span><textarea value={downside} onChange={(event) => setDownside(event.target.value)} rows={3} placeholder={text("What can go wrong and how severe could it be?", "Qu'est-ce qui peut mal se passer et avec quelle gravité ?")} /></label></div>
          <label><span>{text("7. Portfolio risk", "7. Risque portefeuille")}</span><textarea value={risk} onChange={(event) => setRisk(event.target.value)} rows={3} placeholder={text("How would this position interact with your other exposures?", "Comment cette position interagirait-elle avec tes autres expositions ?")} /></label>
          <button className="full-button" type="submit" disabled={saving || !symbol.trim() || !thesis.trim()}>{saving ? text("Saving…", "Enregistrement…") : text("Save decision sheet", "Enregistrer la fiche de décision")} →</button>
        </form>
      </div>

      <aside className="live-mentor-panel">
        <div className="live-mentor-head"><div><span className="mini-label">{text("LIVE AI MENTOR", "MENTOR IA EN DIRECT")}</span><h2>{text("It reacts while you build the idea.", "Il réagit pendant que tu construis l'idée.")}</h2></div><span className={coachLoading ? "mentor-pulse loading" : "mentor-pulse"} /></div>
        {!coaching && !coachLoading && !coachError ? <p>{text("Start entering a symbol, thesis or assumption. After a short pause, the mentor will challenge the reasoning, explain missing pieces and teach the finance behind the decision.", "Commence à entrer un symbole, une thèse ou une hypothèse. Après une courte pause, le mentor challengera ton raisonnement, expliquera ce qui manque et t'enseignera la finance derrière la décision.")}</p> : null}
        {coachLoading ? <div className="mentor-thinking">{text("Analyzing your latest inputs…", "Analyse de tes dernières données…")}</div> : null}
        {coachError ? <p className="inline-status">{coachError}</p> : null}
        {coaching ? <div className="mentor-feedback-stack"><div className="mentor-score"><span>{text("Decision-process quality", "Qualité du processus de décision")}</span><strong>{typeof coaching.qualityScore === "number" ? `${coaching.qualityScore}/100` : "—"}</strong></div><article><span>{text("MENTOR READ", "LECTURE DU MENTOR")}</span><h3>{coaching.headline}</h3><p>{coaching.plainEnglish}</p></article><article><span>{text("WHAT IS FACT", "CE QUI EST FACTUEL")}</span><p>{coaching.whatYouKnow}</p></article><article><span>{text("WHAT IS ASSUMPTION", "CE QUI EST UNE HYPOTHÈSE")}</span><p>{coaching.whatIsAssumption}</p></article><article><span>{text("MISSING EVIDENCE", "ÉLÉMENTS MANQUANTS")}</span><ul>{coaching.whatIsMissing?.map((item) => <li key={item}>{item}</li>)}</ul></article><article><span>{text("MARKET CONNECTION", "CONNEXION AU MARCHÉ")}</span><p>{coaching.marketRead}</p></article><article><span>{text("RISK CHECK", "CONTRÔLE DU RISQUE")}</span><p>{coaching.riskCheck}</p></article><article className="mentor-next"><span>{text("NEXT RESEARCH QUESTION", "PROCHAINE QUESTION À RECHERCHER")}</span><p>{coaching.nextQuestion}</p></article></div> : null}
      </aside>
    </section>

    {status ? <p className="inline-status" role="status">{status}</p> : null}

    {snapshot?.portfolio ? <PaperTradingPanel portfolioId={snapshot.portfolio.id} onPositionCountChange={() => void reloadPortfolio()} /> : null}

    <section className="saved-decision-journal"><div className="panel-heading"><div><span className="mini-label">{text("DECISION JOURNAL", "JOURNAL DE DÉCISION")}</span><h2>{text("Review what you believed before you knew the outcome.", "Relis ce que tu pensais avant de connaître le résultat.")}</h2></div><span className="connection-badge">{theses.length} {text("saved theses", "thèses sauvegardées")}</span></div>{theses.length ? <div className="decision-journal-grid">{theses.map((item) => <article key={item.id}><div><span className="mini-label">{item.symbol}</span><small>{new Date(item.created_at).toLocaleDateString(isFrench ? "fr-FR" : "en-US")}</small></div><h3>{item.thesis}</h3>{item.catalyst ? <p><strong>{text("Catalyst", "Catalyseur")}:</strong> {item.catalyst}</p> : null}{item.invalidation_condition ? <p><strong>{text("Invalidation", "Invalidation")}:</strong> {item.invalidation_condition}</p> : null}</article>)}</div> : <p>{text("No saved decision sheet yet.", "Aucune fiche de décision sauvegardée pour le moment.")}</p>}</section>
  </div>;
}
