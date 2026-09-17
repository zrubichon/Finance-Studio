"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Portfolio = {
  id: string;
  name: string;
  base_currency: string;
  starting_cash: number;
};

type Thesis = {
  id: string;
  symbol: string;
  thesis: string;
  catalyst: string | null;
  time_horizon: string | null;
  invalidation_condition: string | null;
  downside_case: string | null;
  created_at: string;
};

export default function InvestingLab() {
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

      let { data: portfolioData } = await supabase
        .from("paper_portfolios")
        .select("id,name,base_currency,starting_cash")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (!portfolioData) {
        const created = await supabase
          .from("paper_portfolios")
          .insert({ user_id: user.id, name: "Main Portfolio", base_currency: "USD", starting_cash: 100000 })
          .select("id,name,base_currency,starting_cash")
          .single();
        portfolioData = created.data;
      }

      if (!mounted || !portfolioData) return;
      const normalizedPortfolio = { ...portfolioData, starting_cash: Number(portfolioData.starting_cash) } as Portfolio;
      setPortfolio(normalizedPortfolio);

      const [positionsResult, thesesResult] = await Promise.all([
        supabase.from("paper_positions").select("id", { count: "exact", head: true }).eq("portfolio_id", normalizedPortfolio.id),
        supabase
          .from("investment_theses")
          .select("id,symbol,thesis,catalyst,time_horizon,invalidation_condition,downside_case,created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5),
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
    const { data, error } = await supabase
      .from("investment_theses")
      .insert({
        user_id: userId,
        portfolio_id: portfolio.id,
        symbol: symbol.trim().toUpperCase(),
        thesis: thesis.trim(),
        catalyst: catalyst.trim() || null,
        time_horizon: timeHorizon.trim() || null,
        invalidation_condition: invalidation.trim() || null,
        downside_case: downside.trim() || null,
      })
      .select("id,symbol,thesis,catalyst,time_horizon,invalidation_condition,downside_case,created_at")
      .single();

    if (error || !data) {
      setStatus("The thesis could not be saved. Please try again.");
    } else {
      setTheses((current) => [data as Thesis, ...current].slice(0, 5));
      setSymbol("");
      setThesis("");
      setCatalyst("");
      setTimeHorizon("");
      setInvalidation("");
      setDownside("");
      setStatus("Investment thesis saved to your private journal.");
    }
    setSaving(false);
  }

  if (!userId) {
    return (
      <div className="workspace-stack">
        <section className="learning-account-strip">
          <div>
            <span className="mini-label">VIRTUAL PORTFOLIO</span>
            <h2>Sign in to initialize your private Investing Lab.</h2>
            <p>The lab stores a virtual portfolio and thesis journal in your account. No real trade is ever sent to a broker.</p>
          </div>
          <Link className="full-button" href="/login">Sign in →</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="workspace-stack">
      <section className="investing-hero-grid">
        <article className="paper-portfolio-card">
          <span className="mini-label">VIRTUAL PORTFOLIO</span>
          <h2>{portfolio ? `${portfolio.starting_cash.toLocaleString()} ${portfolio.base_currency}` : "Loading portfolio…"}</h2>
          <p>Simulation capital only. No order is sent to a broker and no real money is used.</p>
          <div className="portfolio-state-row">
            <div><span>Portfolio</span><strong>{portfolio?.name ?? "Main Portfolio"}</strong></div>
            <div><span>Positions</span><strong>{positionsCount}</strong></div>
            <div><span>Performance</span><strong>Awaiting market data</strong></div>
          </div>
        </article>
        <article className="risk-rules-card">
          <span className="mini-label">LEARNING BEFORE P&L</span>
          <h2>Every decision needs a reason</h2>
          <p>Your thesis is recorded before a future simulated trade so FinanceStudio can later compare the original reasoning with the actual outcome.</p>
        </article>
      </section>

      <section className="thesis-form-panel">
        <div className="panel-heading">
          <div><span className="mini-label">THESIS JOURNAL</span><h2>Document the decision before you know the result.</h2></div>
          <span className="connection-badge">Private account data</span>
        </div>
        <form className="thesis-form" onSubmit={submitThesis}>
          <label>
            <span>Symbol / asset</span>
            <input value={symbol} onChange={(event) => setSymbol(event.target.value)} placeholder="AAPL, EUR/USD, Gold…" required />
          </label>
          <label className="span-2-field">
            <span>Core thesis</span>
            <textarea value={thesis} onChange={(event) => setThesis(event.target.value)} rows={5} placeholder="What do you believe and why?" required />
          </label>
          <label>
            <span>Catalyst</span>
            <input value={catalyst} onChange={(event) => setCatalyst(event.target.value)} placeholder="Earnings, rate cut, re-rating…" />
          </label>
          <label>
            <span>Time horizon</span>
            <input value={timeHorizon} onChange={(event) => setTimeHorizon(event.target.value)} placeholder="3 months, 2 years…" />
          </label>
          <label>
            <span>What proves you wrong?</span>
            <textarea value={invalidation} onChange={(event) => setInvalidation(event.target.value)} rows={4} placeholder="Specific evidence that would invalidate the thesis" />
          </label>
          <label>
            <span>Downside case</span>
            <textarea value={downside} onChange={(event) => setDownside(event.target.value)} rows={4} placeholder="What can go wrong and how severe could it be?" />
          </label>
          <div className="span-2-field thesis-submit-row">
            <button className="full-button" type="submit" disabled={saving || !symbol.trim() || !thesis.trim()}>{saving ? "Saving…" : "Save thesis"}</button>
            {status && <span className="inline-status" role="status">{status}</span>}
          </div>
        </form>
      </section>

      <section className="saved-theses-panel">
        <div className="panel-heading">
          <div><span className="mini-label">RECENT JOURNAL ENTRIES</span><h2>Your latest investment theses</h2></div>
          <span className="connection-badge">{theses.length} saved</span>
        </div>
        {theses.length ? (
          <div className="saved-theses-grid">
            {theses.map((item) => (
              <article key={item.id}>
                <div><strong>{item.symbol}</strong><span>{new Date(item.created_at).toLocaleDateString()}</span></div>
                <p>{item.thesis}</p>
                {item.catalyst && <small>Catalyst: {item.catalyst}</small>}
              </article>
            ))}
          </div>
        ) : (
          <p className="account-muted">No thesis saved yet. Your first entry will appear here.</p>
        )}
      </section>

      <section className="professor-review-strip">
        <div><span className="mini-label">NEXT INVESTING LAB LAYER</span><h2>Thesis → paper position → attribution → professor review</h2></div>
        <p>Paper execution will only be added after a reliable market-data source is connected, so FinanceStudio never calculates P&amp;L from invented prices.</p>
      </section>
    </div>
  );
}
