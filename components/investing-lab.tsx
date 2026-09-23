"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";
import { recordDailyActivity } from "@/lib/record-activity";
import PaperTradingPanel from "@/components/paper-trading-panel";

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
  valuation_or_macro_assumption: string | null;
  catalyst: string | null;
  time_horizon: string | null;
  invalidation_condition: string | null;
  downside_case: string | null;
  portfolio_risk_note: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
};

type MarketQuote = {
  id: string;
  label: string;
  category: string;
  region: string;
  value: number;
  previousValue: number | null;
  changePercent: number | null;
  unit: "" | "%" | "$" | "bps";
  asOf: string;
  source: string;
};

type MarketPayload = {
  updatedAt: string;
  quotes: MarketQuote[];
  providers: Array<{
    id: string;
    label: string;
    status: "live" | "partial" | "needs_configuration" | "error";
    message: string;
  }>;
};

function thesisCompleteness(item: Thesis) {
  const fields = [
    item.thesis,
    item.valuation_or_macro_assumption,
    item.catalyst,
    item.time_horizon,
    item.invalidation_condition,
    item.downside_case,
    item.portfolio_risk_note,
  ];
  const complete = fields.filter((field) => Boolean(field?.trim())).length;
  return { complete, total: fields.length };
}

function formatQuote(quote: MarketQuote) {
  if (quote.unit === "%") return `${quote.value.toFixed(2)}%`;
  if (quote.unit === "$") return `$${quote.value.toFixed(2)}`;
  if (quote.unit === "bps") return `${quote.value.toFixed(0)} bps`;
  if (quote.category === "FX") {
    return quote.value >= 100 ? quote.value.toFixed(2) : quote.value.toFixed(4);
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(quote.value);
}

export default function InvestingLab() {
  const { isFrench, text } = useLanguage();
  const [userId, setUserId] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positionsCount, setPositionsCount] = useState(0);
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [marketData, setMarketData] = useState<MarketPayload | null>(null);
  const [marketStatus, setMarketStatus] = useState("");

  const [symbol, setSymbol] = useState("");
  const [thesis, setThesis] = useState("");
  const [valuationAssumption, setValuationAssumption] = useState("");
  const [catalyst, setCatalyst] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const [invalidation, setInvalidation] = useState("");
  const [downside, setDownside] = useState("");
  const [portfolioRisk, setPortfolioRisk] = useState("");

  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewDraft, setReviewDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;

      setUserId(user.id);

      const [portfolioResponse, thesesResult] = await Promise.all([
        fetch("/api/investing/portfolio", { cache: "no-store" }),
        supabase
          .from("investment_theses")
          .select("id,symbol,thesis,valuation_or_macro_assumption,catalyst,time_horizon,invalidation_condition,downside_case,portfolio_risk_note,review_notes,created_at,updated_at")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(12),
      ]);

      if (!mounted) return;

      if (!portfolioResponse.ok) {
        const payload = await portfolioResponse.json().catch(() => null);
        setStatus(
          typeof payload?.error === "string"
            ? payload.error
            : text(
                "The virtual portfolio could not be loaded securely.",
                "Le portefeuille virtuel n’a pas pu être chargé de manière sécurisée.",
              ),
        );
        setTheses((thesesResult.data ?? []) as Thesis[]);
        return;
      }

      const portfolioPayload = (await portfolioResponse.json()) as {
        portfolio?: Portfolio;
        positions?: Array<{ id: string }>;
      };

      if (!portfolioPayload.portfolio) {
        setStatus(
          text(
            "The virtual portfolio could not be initialized.",
            "Le portefeuille virtuel n’a pas pu être initialisé.",
          ),
        );
        setTheses((thesesResult.data ?? []) as Thesis[]);
        return;
      }

      const normalizedPortfolio = {
        ...portfolioPayload.portfolio,
        starting_cash: Number(portfolioPayload.portfolio.starting_cash),
      } as Portfolio;

      setPortfolio(normalizedPortfolio);
      setPositionsCount(portfolioPayload.positions?.length ?? 0);
      setTheses((thesesResult.data ?? []) as Thesis[]);
    }

    void load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadMarkets() {
      try {
        const response = await fetch("/api/markets", { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = (await response.json()) as MarketPayload;
        if (!mounted) return;
        setMarketData(data);

        const live = data.providers.filter((provider) => provider.status === "live");
        setMarketStatus(
          live.length
            ? text(
                `${live.length} real market-data source${live.length > 1 ? "s" : ""} connected`,
                `${live.length} source${live.length > 1 ? "s" : ""} réelle${live.length > 1 ? "s" : ""} de marché connectée${live.length > 1 ? "s" : ""}`,
              )
            : text("No live provider currently connected", "Aucun fournisseur live actuellement connecté"),
        );
      } catch {
        if (mounted) {
          setMarketStatus(
            text(
              "Market snapshot unavailable — no substitute prices are shown.",
              "Snapshot de marché indisponible — aucun prix fictif n’est affiché.",
            ),
          );
        }
      }
    }

    void loadMarkets();
    return () => { mounted = false; };
  }, [text]);

  const selectedReview = useMemo(
    () => theses.find((item) => item.id === reviewingId) ?? null,
    [reviewingId, theses],
  );

  async function submitThesis(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId || !portfolio || !symbol.trim() || !thesis.trim() || saving) return;

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
        valuation_or_macro_assumption: valuationAssumption.trim() || null,
        catalyst: catalyst.trim() || null,
        time_horizon: timeHorizon.trim() || null,
        invalidation_condition: invalidation.trim() || null,
        downside_case: downside.trim() || null,
        portfolio_risk_note: portfolioRisk.trim() || null,
      })
      .select("id,symbol,thesis,valuation_or_macro_assumption,catalyst,time_horizon,invalidation_condition,downside_case,portfolio_risk_note,review_notes,created_at,updated_at")
      .single();

    if (error || !data) {
      setStatus(text(
        "The thesis could not be saved. Please try again.",
        "La thèse d’investissement / investment thesis n’a pas pu être enregistrée. Réessaie.",
      ));
    } else {
      setTheses((current) => [data as Thesis, ...current].slice(0, 12));
      setSymbol("");
      setThesis("");
      setValuationAssumption("");
      setCatalyst("");
      setTimeHorizon("");
      setInvalidation("");
      setDownside("");
      setPortfolioRisk("");
      await recordDailyActivity(userId);
      setStatus(text(
        "Investment thesis saved to your private decision journal.",
        "Thèse d’investissement enregistrée dans ton journal privé de décision.",
      ));
    }

    setSaving(false);
  }

  function startReview(item: Thesis) {
    setReviewingId(item.id);
    setReviewDraft(item.review_notes ?? "");
    setStatus("");
  }

  async function saveReview() {
    if (!userId || !selectedReview || reviewSaving) return;

    setReviewSaving(true);
    setStatus("");

    const now = new Date().toISOString();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("investment_theses")
      .update({
        review_notes: reviewDraft.trim() || null,
        updated_at: now,
      })
      .eq("user_id", userId)
      .eq("id", selectedReview.id)
      .select("id,symbol,thesis,valuation_or_macro_assumption,catalyst,time_horizon,invalidation_condition,downside_case,portfolio_risk_note,review_notes,created_at,updated_at")
      .single();

    if (error || !data) {
      setStatus(text(
        "The review could not be saved.",
        "La revue n’a pas pu être enregistrée.",
      ));
    } else {
      setTheses((current) => [
        data as Thesis,
        ...current.filter((item) => item.id !== data.id),
      ]);
      setReviewingId(null);
      setReviewDraft("");
      await recordDailyActivity(userId);
      setStatus(text(
        "Review saved. Your original thesis remains visible for comparison.",
        "Revue enregistrée. Ta thèse originale reste visible pour comparaison.",
      ));
    }

    setReviewSaving(false);
  }

  if (!userId) {
    return (
      <div className="workspace-stack">
        <section className="learning-account-strip">
          <div>
            <span className="mini-label">{text("VIRTUAL PORTFOLIO", "PORTEFEUILLE VIRTUEL / VIRTUAL PORTFOLIO")}</span>
            <h2>{text(
              "Sign in to initialize your private Investing Lab.",
              "Connecte-toi pour initialiser ton laboratoire d’investissement privé.",
            )}</h2>
            <p>{text(
              "The lab stores a virtual portfolio and thesis journal in your account. No real trade is ever sent to a broker.",
              "Le laboratoire stocke un portefeuille virtuel et un journal de thèses dans ton compte. Aucun ordre réel n’est jamais envoyé à un courtier / broker.",
            )}</p>
          </div>
          <Link className="full-button" href="/login">{text("Sign in", "Se connecter")} →</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="workspace-stack">
      <section className="investing-hero-grid">
        <article className="paper-portfolio-card">
          <span className="mini-label">{text("VIRTUAL PORTFOLIO", "PORTEFEUILLE VIRTUEL / VIRTUAL PORTFOLIO")}</span>
          <h2>
            {portfolio
              ? `${portfolio.starting_cash.toLocaleString(isFrench ? "fr-FR" : "en-US")} ${portfolio.base_currency}`
              : text("Loading portfolio…", "Chargement du portefeuille…")}
          </h2>
          <p>{text(
            "Simulation capital only. No order is sent to a broker and no real money is used.",
            "Capital de simulation uniquement. Aucun ordre n’est envoyé à un courtier / broker et aucun argent réel n’est utilisé.",
          )}</p>
          <div className="portfolio-state-row">
            <div>
              <span>{text("Portfolio", "Portefeuille / portfolio")}</span>
              <strong>{portfolio?.name ?? text("Main Portfolio", "Portefeuille principal")}</strong>
            </div>
            <div>
              <span>{text("Positions", "Positions")}</span>
              <strong>{positionsCount}</strong>
            </div>
            <div>
              <span>{text("Performance", "Performance")}</span>
              <strong>{text("No fake P&L", "Aucun P&L fictif")}</strong>
            </div>
          </div>
        </article>

        <article className="risk-rules-card">
          <span className="mini-label">{text("LEARNING BEFORE P&L", "APPRENDRE AVANT LE P&L")}</span>
          <h2>{text("Every decision needs a reason", "Chaque décision doit avoir une raison")}</h2>
          <p>{text(
            "FinanceStudio records your assumptions before the outcome so a later review can compare what you expected with what actually happened.",
            "FinanceStudio enregistre tes hypothèses avant le résultat afin qu’une revue ultérieure puisse comparer ce que tu attendais à ce qui s’est réellement passé.",
          )}</p>
        </article>
      </section>

      <section className="market-overview-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("CONNECTED MARKET SNAPSHOT", "SNAPSHOT DE MARCHÉ CONNECTÉ")}</span>
            <h2>{text(
              "Only real provider observations are shown here.",
              "Seules les observations réellement renvoyées par les fournisseurs sont affichées ici.",
            )}</h2>
          </div>
          <span className="connection-badge"><span className="status-dot" /> {marketStatus}</span>
        </div>

        {marketData?.quotes.length ? (
          <div className="market-universe-grid">
            {marketData.quotes.map((quote) => (
              <article className="market-universe-card" key={quote.id}>
                <h3>{quote.label}</h3>
                <div className="instrument-list">
                  <div>
                    <span>
                      <strong>{formatQuote(quote)}</strong>
                      {quote.changePercent !== null
                        ? ` · ${quote.changePercent > 0 ? "+" : ""}${quote.changePercent.toFixed(2)}%`
                        : ""}
                    </span>
                    <em>{quote.asOf} · {quote.source}</em>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="account-muted">
            {text(
              "No market observation is currently available from the connected providers.",
              "Aucune observation de marché n’est actuellement disponible depuis les fournisseurs connectés.",
            )}
          </p>
        )}

        <p className="inline-status">
          {text(
            "These observations are educational reference data. Paper execution now uses a separate instrument-pricing check and is enabled only when FinanceStudio can verify a sufficiently recent provider price.",
            "Ces observations sont des données de référence pédagogiques. L’exécution simulée utilise désormais une vérification de prix instrument par instrument et n’est activée que si FinanceStudio peut vérifier un prix fournisseur suffisamment récent.",
          )}
        </p>
      </section>

      {portfolio && (
        <PaperTradingPanel
          portfolioId={portfolio.id}
          onPositionCountChange={setPositionsCount}
        />
      )}

      <section className="thesis-form-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("THESIS JOURNAL", "JOURNAL DE THÈSES / THESIS JOURNAL")}</span>
            <h2>{text(
              "Document the decision before you know the result.",
              "Documente la décision avant de connaître le résultat.",
            )}</h2>
          </div>
          <span className="connection-badge">{text("Private account data", "Données privées du compte")}</span>
        </div>

        <form className="thesis-form" onSubmit={submitThesis}>
          <label>
            <span>{text("Symbol / asset", "Symbole / actif")}</span>
            <input
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
              placeholder="AAPL, EUR/USD, Gold…"
              required
            />
          </label>

          <label>
            <span>{text("Time horizon", "Horizon temporel / time horizon")}</span>
            <input
              value={timeHorizon}
              onChange={(event) => setTimeHorizon(event.target.value)}
              placeholder={text("3 months, 2 years…", "3 mois, 2 ans…")}
            />
          </label>

          <label className="span-2-field">
            <span>{text("Core thesis", "Thèse principale / core thesis")}</span>
            <textarea
              value={thesis}
              onChange={(event) => setThesis(event.target.value)}
              rows={5}
              placeholder={text("What do you believe and why?", "Que penses-tu et pourquoi ?")}
              required
            />
          </label>

          <label className="span-2-field">
            <span>{text(
              "Valuation or macro assumption",
              "Hypothèse de valorisation ou macro / valuation or macro assumption",
            )}</span>
            <textarea
              value={valuationAssumption}
              onChange={(event) => setValuationAssumption(event.target.value)}
              rows={3}
              placeholder={text(
                "What has to be true about valuation, rates, growth, inflation or another key variable?",
                "Qu’est-ce qui doit être vrai concernant la valuation, les taux, la croissance, l’inflation ou une autre variable clé ?",
              )}
            />
          </label>

          <label>
            <span>{text("Catalyst", "Catalyseur / catalyst")}</span>
            <input
              value={catalyst}
              onChange={(event) => setCatalyst(event.target.value)}
              placeholder={text("Earnings, rate cut, re-rating…", "Résultats / earnings, baisse de taux, re-rating…")}
            />
          </label>

          <label>
            <span>{text("Portfolio risk", "Risque portefeuille / portfolio risk")}</span>
            <textarea
              value={portfolioRisk}
              onChange={(event) => setPortfolioRisk(event.target.value)}
              rows={3}
              placeholder={text(
                "Concentration, correlation, liquidity, sizing…",
                "Concentration, corrélation, liquidité, taille de position…",
              )}
            />
          </label>

          <label>
            <span>{text("What proves you wrong?", "Qu’est-ce qui invalide ta thèse ?")}</span>
            <textarea
              value={invalidation}
              onChange={(event) => setInvalidation(event.target.value)}
              rows={4}
              placeholder={text(
                "Specific evidence that would invalidate the thesis",
                "Éléments précis qui invalideraient la thèse / invalidation condition",
              )}
            />
          </label>

          <label>
            <span>{text("Downside case", "Scénario baissier / downside case")}</span>
            <textarea
              value={downside}
              onChange={(event) => setDownside(event.target.value)}
              rows={4}
              placeholder={text(
                "What can go wrong and how severe could it be?",
                "Qu’est-ce qui peut mal tourner et quelle pourrait être l’ampleur de la perte ?",
              )}
            />
          </label>

          <div className="span-2-field thesis-submit-row">
            <button
              className="full-button"
              type="submit"
              disabled={saving || !symbol.trim() || !thesis.trim()}
            >
              {saving ? text("Saving…", "Enregistrement…") : text("Save thesis", "Enregistrer la thèse")}
            </button>
            {status && <span className="inline-status" role="status">{status}</span>}
          </div>
        </form>
      </section>

      <section className="saved-theses-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("DECISION JOURNAL", "JOURNAL DE DÉCISION")}</span>
            <h2>{text("Original thesis → later review", "Thèse originale → revue ultérieure")}</h2>
          </div>
          <span className="connection-badge">
            {isFrench ? `${theses.length} enregistrées` : `${theses.length} saved`}
          </span>
        </div>

        {theses.length ? (
          <div className="saved-theses-grid">
            {theses.map((item) => {
              const completeness = thesisCompleteness(item);
              return (
                <article key={item.id}>
                  <div>
                    <strong>{item.symbol}</strong>
                    <span>{new Date(item.created_at).toLocaleDateString(isFrench ? "fr-FR" : "en-US")}</span>
                  </div>
                  <p>{item.thesis}</p>
                  <small>
                    {text("Decision record", "Dossier de décision")}: {completeness.complete}/{completeness.total} {text("fields documented", "éléments documentés")}
                  </small>
                  {item.valuation_or_macro_assumption && (
                    <small>{text("Key assumption", "Hypothèse clé")}: {item.valuation_or_macro_assumption}</small>
                  )}
                  {item.catalyst && (
                    <small>{text("Catalyst", "Catalyseur / catalyst")}: {item.catalyst}</small>
                  )}
                  {item.invalidation_condition && (
                    <small>{text("Invalidation", "Invalidation")}: {item.invalidation_condition}</small>
                  )}
                  {item.review_notes && (
                    <small>{text("Latest review", "Dernière revue")}: {item.review_notes}</small>
                  )}
                  <button type="button" className="chip" onClick={() => startReview(item)}>
                    {item.review_notes
                      ? text("Update review", "Mettre à jour la revue")
                      : text("Review thesis", "Revoir la thèse")}
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="account-muted">
            {text(
              "No thesis saved yet. Your first entry will appear here.",
              "Aucune thèse enregistrée pour le moment. Ta première entrée apparaîtra ici.",
            )}
          </p>
        )}
      </section>

      {selectedReview && (
        <section className="thesis-form-panel">
          <div className="panel-heading">
            <div>
              <span className="mini-label">{text("POST-DECISION REVIEW", "REVUE APRÈS DÉCISION")}</span>
              <h2>{selectedReview.symbol} · {text(
                "Compare new evidence with your original reasoning",
                "Compare les nouvelles preuves avec ton raisonnement initial",
              )}</h2>
            </div>
            <button
              type="button"
              className="chip"
              onClick={() => {
                setReviewingId(null);
                setReviewDraft("");
              }}
            >
              {text("Close", "Fermer")}
            </button>
          </div>

          <div className="analysis-grid">
            <article className="analysis-card">
              <span className="mini-label">{text("ORIGINAL THESIS", "THÈSE ORIGINALE")}</span>
              <p>{selectedReview.thesis}</p>
            </article>
            <article className="analysis-card">
              <span className="mini-label">{text("INVALIDATION RULE", "RÈGLE D’INVALIDATION")}</span>
              <p>{selectedReview.invalidation_condition || text("Not documented", "Non documentée")}</p>
            </article>
            <article className="analysis-card">
              <span className="mini-label">{text("DOWNSIDE CASE", "SCÉNARIO BAISSIER")}</span>
              <p>{selectedReview.downside_case || text("Not documented", "Non documenté")}</p>
            </article>
          </div>

          <label>
            <span className="control-label">{text("REVIEW NOTES", "NOTES DE REVUE")}</span>
            <textarea
              value={reviewDraft}
              onChange={(event) => setReviewDraft(event.target.value)}
              rows={6}
              placeholder={text(
                "What changed? Which assumption was right or wrong? Is the thesis stronger, weaker or invalidated? What did you learn about your process?",
                "Qu’est-ce qui a changé ? Quelle hypothèse était juste ou fausse ? La thèse est-elle renforcée, affaiblie ou invalidée ? Qu’as-tu appris sur ton processus ?",
              )}
            />
          </label>

          <button
            type="button"
            className="full-button"
            disabled={reviewSaving}
            onClick={() => void saveReview()}
          >
            {reviewSaving ? text("Saving review…", "Enregistrement…") : text("Save review", "Enregistrer la revue")}
          </button>
        </section>
      )}

      <section className="professor-review-strip">
        <div>
          <span className="mini-label">{text("NEXT INVESTING LAB LAYER", "PROCHAINE ÉTAPE DU LABORATOIRE")}</span>
          <h2>{text(
            "Thesis → verified price → paper trade → attribution",
            "Thèse → prix vérifié → ordre simulé → attribution",
          )}</h2>
        </div>
        <p>{text(
          "Paper execution is active for instruments with verified provider coverage. EUR/USD, GBP/USD and USD/JPY work from ECB reference rates today; broader assets automatically remain blocked until a configured provider can return a usable price.",
          "L’exécution simulée est active pour les instruments disposant d’une couverture fournisseur vérifiée. EUR/USD, GBP/USD et USD/JPY fonctionnent aujourd’hui avec les taux de référence BCE / ECB ; les autres actifs restent automatiquement bloqués tant qu’un fournisseur configuré ne renvoie pas de prix exploitable.",
        )}</p>
      </section>
    </div>
  );
}
