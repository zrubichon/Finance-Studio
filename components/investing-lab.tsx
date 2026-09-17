"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type Portfolio = { id: string; name: string; base_currency: string; starting_cash: number };
type Thesis = { id: string; symbol: string; thesis: string; catalyst: string | null; time_horizon: string | null; invalidation_condition: string | null; downside_case: string | null; created_at: string };

export default function InvestingLab() {
  const { isFrench, text } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positionsCount, setPositionsCount] = useState(0);
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [symbol, setSymbol] = useState("");
  const [thesis, setThesis] = useState("");
  const [catalyst, setCatalyst] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const [invalidation, setInvalidation] = useState("");
  const [downside, setDownside] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;
      setUserId(user.id);

      let { data: portfolioData } = await supabase.from("paper_portfolios").select("id,name,base_currency,starting_cash").eq("user_id", user.id).order("created_at", { ascending: true }).limit(1).maybeSingle();
      if (!portfolioData) {
        const created = await supabase.from("paper_portfolios").insert({ user_id: user.id, name: "Main Portfolio", base_currency: "USD", starting_cash: 100000 }).select("id,name,base_currency,starting_cash").single();
        portfolioData = created.data;
      }
      if (!mounted || !portfolioData) return;
      const normalizedPortfolio = { ...portfolioData, starting_cash: Number(portfolioData.starting_cash) } as Portfolio;
      setPortfolio(normalizedPortfolio);

      const [positionsResult, thesesResult] = await Promise.all([
        supabase.from("paper_positions").select("id", { count: "exact", head: true }).eq("portfolio_id", normalizedPortfolio.id),
        supabase.from("investment_theses").select("id,symbol,thesis,catalyst,time_horizon,invalidation_condition,downside_case,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ]);
      if (!mounted) return;
      setPositionsCount(positionsResult.count ?? 0);
      setTheses((thesesResult.data ?? []) as Thesis[]);
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function submitThesis(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId || !portfolio || !symbol.trim() || !thesis.trim()) return;
    setSaving(true);
    setStatus("");
    const supabase = createClient();
    const { data, error } = await supabase.from("investment_theses").insert({
      user_id: userId,
      portfolio_id: portfolio.id,
      symbol: symbol.trim().toUpperCase(),
      thesis: thesis.trim(),
      catalyst: catalyst.trim() || null,
      time_horizon: timeHorizon.trim() || null,
      invalidation_condition: invalidation.trim() || null,
      downside_case: downside.trim() || null,
    }).select("id,symbol,thesis,catalyst,time_horizon,invalidation_condition,downside_case,created_at").single();

    if (error || !data) setStatus(text("The thesis could not be saved. Please try again.", "La thèse d’investissement / investment thesis n’a pas pu être enregistrée. Réessaie."));
    else {
      setTheses((current) => [data as Thesis, ...current].slice(0, 5));
      setSymbol(""); setThesis(""); setCatalyst(""); setTimeHorizon(""); setInvalidation(""); setDownside("");
      setStatus(text("Investment thesis saved to your private journal.", "Thèse d’investissement / investment thesis enregistrée dans ton journal privé."));
    }
    setSaving(false);
  }

  if (!userId) {
    return <div className="workspace-stack"><section className="learning-account-strip"><div><span className="mini-label">{text("VIRTUAL PORTFOLIO", "PORTEFEUILLE VIRTUEL / VIRTUAL PORTFOLIO")}</span><h2>{text("Sign in to initialize your private Investing Lab.", "Connecte-toi pour initialiser ton laboratoire d’investissement privé.")}</h2><p>{text("The lab stores a virtual portfolio and thesis journal in your account. No real trade is ever sent to a broker.", "Le laboratoire stocke un portefeuille virtuel / virtual portfolio et un journal de thèses / thesis journal dans ton compte. Aucun ordre réel n’est jamais envoyé à un courtier / broker.")}</p></div><Link className="full-button" href="/login">{text("Sign in", "Se connecter")} →</Link></section></div>;
  }

  return (
    <div className="workspace-stack">
      <section className="investing-hero-grid">
        <article className="paper-portfolio-card">
          <span className="mini-label">{text("VIRTUAL PORTFOLIO", "PORTEFEUILLE VIRTUEL / VIRTUAL PORTFOLIO")}</span>
          <h2>{portfolio ? `${portfolio.starting_cash.toLocaleString(isFrench ? "fr-FR" : "en-US")} ${portfolio.base_currency}` : text("Loading portfolio…", "Chargement du portefeuille…")}</h2>
          <p>{text("Simulation capital only. No order is sent to a broker and no real money is used.", "Capital de simulation uniquement. Aucun ordre n’est envoyé à un courtier / broker et aucun argent réel n’est utilisé.")}</p>
          <div className="portfolio-state-row">
            <div><span>{text("Portfolio", "Portefeuille / portfolio")}</span><strong>{portfolio?.name ?? text("Main Portfolio", "Portefeuille principal")}</strong></div>
            <div><span>{text("Positions", "Positions")}</span><strong>{positionsCount}</strong></div>
            <div><span>{text("Performance", "Performance")}</span><strong>{text("Awaiting market data", "En attente des données de marché / market data")}</strong></div>
          </div>
        </article>
        <article className="risk-rules-card">
          <span className="mini-label">{text("LEARNING BEFORE P&L", "APPRENDRE AVANT LE P&L")}</span>
          <h2>{text("Every decision needs a reason", "Chaque décision doit avoir une raison")}</h2>
          <p>{text("Your thesis is recorded before a future simulated trade so FinanceStudio can later compare the original reasoning with the actual outcome.", "Ta thèse / investment thesis est enregistrée avant toute future opération simulée afin que FinanceStudio puisse ensuite comparer le raisonnement initial au résultat réel.")}</p>
        </article>
      </section>

      <section className="thesis-form-panel">
        <div className="panel-heading"><div><span className="mini-label">{text("THESIS JOURNAL", "JOURNAL DE THÈSES / THESIS JOURNAL")}</span><h2>{text("Document the decision before you know the result.", "Documente la décision avant de connaître le résultat.")}</h2></div><span className="connection-badge">{text("Private account data", "Données privées du compte")}</span></div>
        <form className="thesis-form" onSubmit={submitThesis}>
          <label><span>{text("Symbol / asset", "Symbole / actif")}</span><input value={symbol} onChange={(event) => setSymbol(event.target.value)} placeholder="AAPL, EUR/USD, Gold…" required /></label>
          <label className="span-2-field"><span>{text("Core thesis", "Thèse principale / core thesis")}</span><textarea value={thesis} onChange={(event) => setThesis(event.target.value)} rows={5} placeholder={text("What do you believe and why?", "Que penses-tu et pourquoi ?")} required /></label>
          <label><span>{text("Catalyst", "Catalyseur / catalyst")}</span><input value={catalyst} onChange={(event) => setCatalyst(event.target.value)} placeholder={text("Earnings, rate cut, re-rating…", "Résultats / earnings, baisse de taux, re-rating…")} /></label>
          <label><span>{text("Time horizon", "Horizon temporel / time horizon")}</span><input value={timeHorizon} onChange={(event) => setTimeHorizon(event.target.value)} placeholder={text("3 months, 2 years…", "3 mois, 2 ans…")} /></label>
          <label><span>{text("What proves you wrong?", "Qu’est-ce qui invalide ta thèse ?")}</span><textarea value={invalidation} onChange={(event) => setInvalidation(event.target.value)} rows={4} placeholder={text("Specific evidence that would invalidate the thesis", "Éléments précis qui invalideraient la thèse / invalidation condition")} /></label>
          <label><span>{text("Downside case", "Scénario baissier / downside case")}</span><textarea value={downside} onChange={(event) => setDownside(event.target.value)} rows={4} placeholder={text("What can go wrong and how severe could it be?", "Qu’est-ce qui peut mal tourner et quelle pourrait être l’ampleur de la perte ?")} /></label>
          <div className="span-2-field thesis-submit-row"><button className="full-button" type="submit" disabled={saving || !symbol.trim() || !thesis.trim()}>{saving ? text("Saving…", "Enregistrement…") : text("Save thesis", "Enregistrer la thèse")}</button>{status && <span className="inline-status" role="status">{status}</span>}</div>
        </form>
      </section>

      <section className="saved-theses-panel">
        <div className="panel-heading"><div><span className="mini-label">{text("RECENT JOURNAL ENTRIES", "ENTRÉES RÉCENTES DU JOURNAL")}</span><h2>{text("Your latest investment theses", "Tes dernières thèses d’investissement / investment theses")}</h2></div><span className="connection-badge">{isFrench ? `${theses.length} enregistrées` : `${theses.length} saved`}</span></div>
        {theses.length ? <div className="saved-theses-grid">{theses.map((item) => <article key={item.id}><div><strong>{item.symbol}</strong><span>{new Date(item.created_at).toLocaleDateString(isFrench ? "fr-FR" : "en-US")}</span></div><p>{item.thesis}</p>{item.catalyst && <small>{text("Catalyst", "Catalyseur / catalyst")}: {item.catalyst}</small>}</article>)}</div> : <p className="account-muted">{text("No thesis saved yet. Your first entry will appear here.", "Aucune thèse enregistrée pour le moment. Ta première entrée apparaîtra ici.")}</p>}
      </section>

      <section className="professor-review-strip">
        <div><span className="mini-label">{text("NEXT INVESTING LAB LAYER", "PROCHAINE ÉTAPE DU LABORATOIRE")}</span><h2>{text("Thesis → paper position → attribution → professor review", "Thèse / thesis → position simulée / paper position → attribution → analyse du professeur")}</h2></div>
        <p>{text("Paper execution will only be added after a reliable market-data source is connected, so FinanceStudio never calculates P&L from invented prices.", "L’exécution simulée / paper execution ne sera ajoutée qu’après la connexion d’une source fiable de données de marché / market data, afin que FinanceStudio ne calcule jamais de P&L à partir de prix inventés.")}</p>
      </section>
    </div>
  );
}
