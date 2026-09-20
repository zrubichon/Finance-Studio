"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type AssetClass =
  | "equity"
  | "etf"
  | "bond"
  | "fx"
  | "commodity"
  | "crypto"
  | "option";

type InstrumentQuote = {
  symbol: string;
  assetClass: AssetClass;
  price: number;
  previousClose: number | null;
  currency: string | null;
  asOf: string;
  source: string;
  sourceUrl: string;
  delayed: boolean;
};

type Position = {
  id: string;
  symbol: string;
  asset_class: AssetClass;
  quantity: number;
  average_cost: number;
  quote: InstrumentQuote | null;
  current_value: number | null;
  unrealized_pnl: number | null;
  valuation_status: "priced" | "unpriced" | "currency_mismatch";
  provider: {
    provider: string;
    status: string;
    message: string;
  };
};

type Attribution = {
  symbol: string;
  assetClass: string;
  realizedPnl: number;
  unrealizedPnl: number;
  totalPnl: number;
  currentValue: number | null;
  contributionPercent: number | null;
  valuationStatus: string;
};

type Transaction = {
  id: string;
  symbol: string;
  asset_class: AssetClass;
  side: "buy" | "sell";
  quantity: number | string;
  price: number | string;
  notional: number | string;
  realized_pnl: number | string;
  price_as_of: string;
  price_source: string;
  created_at: string;
};

type PerformanceSnapshot = {
  snapshot_date: string;
  cash_balance: number;
  market_value: number;
  total_equity: number;
  total_pnl: number;
  return_percent: number;
  priced_positions: number;
  total_positions: number;
};

type Snapshot = {
  portfolio: {
    id: string;
    name: string;
    base_currency: string;
    starting_cash: number;
    cash_balance: number;
  };
  positions: Position[];
  transactions: Transaction[];
  metrics: {
    fullCoverage: boolean;
    pricedPositions: number;
    totalPositions: number;
    marketValue: number | null;
    totalEquity: number | null;
    totalPnl: number | null;
    returnPercent: number | null;
    realizedPnl: number;
  };
  history: PerformanceSnapshot[];
  attribution: Attribution[];
};

const assetClasses: Array<{ value: AssetClass; en: string; fr: string }> = [
  { value: "fx", en: "FX", fr: "Devises / FX" },
  { value: "equity", en: "Equity", fr: "Action / equity" },
  { value: "etf", en: "ETF", fr: "ETF" },
  { value: "commodity", en: "Commodity", fr: "Matière première / commodity" },
  { value: "crypto", en: "Crypto", fr: "Crypto" },
];

function money(value: number | null, currency = "USD") {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function signed(value: number | null, currency = "USD") {
  if (value === null || !Number.isFinite(value)) return "—";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${money(value, currency)}`;
}

function compact(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(value);
}

export default function PaperTradingPanel({
  portfolioId,
  onPositionCountChange,
}: {
  portfolioId: string;
  onPositionCountChange?: (count: number) => void;
}) {
  const { isFrench, text } = useLanguage();
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("EUR/USD");
  const [assetClass, setAssetClass] = useState<AssetClass>("fx");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState("1000");
  const [quote, setQuote] = useState<InstrumentQuote | null>(null);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [trading, setTrading] = useState(false);
  const [status, setStatus] = useState("");

  const loadSnapshot = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/investing/portfolio?portfolioId=${encodeURIComponent(portfolioId)}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error(
          text(
            "The paper portfolio could not be loaded.",
            "Le portefeuille simulé n’a pas pu être chargé.",
          ),
        );
      }

      const data = (await response.json()) as Snapshot;
      setSnapshot(data);
      onPositionCountChange?.(data.positions.length);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : text(
              "The paper portfolio could not be loaded.",
              "Le portefeuille simulé n’a pas pu être chargé.",
            ),
      );
    } finally {
      setLoading(false);
    }
  }, [onPositionCountChange, portfolioId, text]);

  useEffect(() => {
    void loadSnapshot();
  }, [loadSnapshot]);

  useEffect(() => {
    setQuote(null);
    setQuoteMessage("");
  }, [symbol, assetClass]);

  async function previewQuote() {
    const cleaned = symbol.trim();
    if (!cleaned || quoteLoading) return;

    setQuoteLoading(true);
    setQuoteMessage("");

    try {
      const response = await fetch(
        `/api/investing/quote?symbol=${encodeURIComponent(cleaned)}&assetClass=${encodeURIComponent(assetClass)}`,
        { cache: "no-store" },
      );

      const payload = (await response.json()) as {
        quote?: InstrumentQuote;
        error?: string;
        provider?: { message?: string };
      };

      if (!response.ok || !payload.quote) {
        throw new Error(
          payload.error ||
            payload.provider?.message ||
            text("No verified price is available.", "Aucun prix vérifié n’est disponible."),
        );
      }

      setQuote(payload.quote);
      setSymbol(payload.quote.symbol);
      setQuoteMessage(
        text(
          `Verified reference price from ${payload.quote.source}.`,
          `Prix de référence vérifié via ${payload.quote.source}.`,
        ),
      );
    } catch (error) {
      setQuote(null);
      setQuoteMessage(
        error instanceof Error
          ? error.message
          : text("No verified price is available.", "Aucun prix vérifié n’est disponible."),
      );
    } finally {
      setQuoteLoading(false);
    }
  }

  async function submitTrade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedQuantity = Number(quantity);
    if (
      !symbol.trim() ||
      !Number.isFinite(parsedQuantity) ||
      parsedQuantity <= 0 ||
      trading
    ) {
      return;
    }

    setTrading(true);
    setStatus("");

    try {
      const response = await fetch("/api/investing/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolioId,
          symbol: symbol.trim(),
          assetClass,
          side,
          quantity: parsedQuantity,
        }),
      });

      const payload = (await response.json()) as {
        trade?: {
          symbol?: string;
          side?: string;
          quantity?: number;
          price?: number;
          realized_pnl?: number;
        };
        quote?: InstrumentQuote;
        error?: string;
        code?: string;
      };

      if (!response.ok || !payload.trade || !payload.quote) {
        const readable =
          payload.code?.includes("INSUFFICIENT_CASH")
            ? text(
                "Not enough virtual cash for this simulated purchase.",
                "Pas assez de cash virtuel pour cet achat simulé.",
              )
            : payload.code?.includes("INSUFFICIENT_POSITION")
              ? text(
                  "You cannot sell more than the simulated position you own.",
                  "Tu ne peux pas vendre plus que la position simulée détenue.",
                )
              : payload.error ||
                text(
                  "The simulated order could not be executed.",
                  "L’ordre simulé n’a pas pu être exécuté.",
                );
        throw new Error(readable);
      }

      setQuote(payload.quote);
      setStatus(
        text(
          `${side === "buy" ? "Bought" : "Sold"} ${compact(parsedQuantity)} ${payload.quote.symbol} at ${compact(payload.quote.price)} using ${payload.quote.source} reference data.`,
          `${side === "buy" ? "Achat" : "Vente"} simulé(e) de ${compact(parsedQuantity)} ${payload.quote.symbol} à ${compact(payload.quote.price)} avec les données de référence ${payload.quote.source}.`,
        ),
      );

      await loadSnapshot();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : text(
              "The simulated order could not be executed.",
              "L’ordre simulé n’a pas pu être exécuté.",
            ),
      );
    } finally {
      setTrading(false);
    }
  }

  const currency = snapshot?.portfolio.base_currency ?? "USD";

  const history = snapshot?.history ?? [];
  const historyReturns = history.map((item) => item.return_percent);
  const historyMin = historyReturns.length ? Math.min(...historyReturns) : 0;
  const historyMax = historyReturns.length ? Math.max(...historyReturns) : 0;
  const historyRange = Math.max(historyMax - historyMin, 0.01);
  const historyPolyline = history
    .map((item, index) => {
      const x = history.length <= 1 ? 50 : (index / (history.length - 1)) * 100;
      const y = 50 - ((item.return_percent - historyMin) / historyRange) * 44;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <section className="paper-trading-panel">
      <div className="panel-heading">
        <div>
          <span className="mini-label">
            {text("PAPER TRADING", "TRADING SIMULÉ / PAPER TRADING")}
          </span>
          <h2>
            {text(
              "Execute only against verified provider prices.",
              "Exécuter uniquement avec des prix vérifiés par un fournisseur.",
            )}
          </h2>
        </div>
        <span className="connection-badge">
          {loading
            ? text("Loading portfolio…", "Chargement du portefeuille…")
            : snapshot?.metrics.fullCoverage
              ? text("Portfolio fully priced", "Portefeuille entièrement valorisé")
              : text("Partial price coverage", "Couverture de prix partielle")}
        </span>
      </div>

      {snapshot && (
        <div className="paper-metric-grid">
          <article>
            <span>{text("Virtual cash", "Cash virtuel")}</span>
            <strong>{money(snapshot.portfolio.cash_balance, currency)}</strong>
          </article>
          <article>
            <span>{text("Market value", "Valeur de marché / market value")}</span>
            <strong>{money(snapshot.metrics.marketValue, currency)}</strong>
          </article>
          <article>
            <span>{text("Portfolio equity", "Valeur totale / portfolio equity")}</span>
            <strong>{money(snapshot.metrics.totalEquity, currency)}</strong>
          </article>
          <article>
            <span>{text("Total P&L", "P&L total")}</span>
            <strong>{signed(snapshot.metrics.totalPnl, currency)}</strong>
            <small>
              {snapshot.metrics.returnPercent === null
                ? text("Needs full price coverage", "Nécessite une couverture complète des prix")
                : `${snapshot.metrics.returnPercent > 0 ? "+" : ""}${snapshot.metrics.returnPercent.toFixed(2)}%`}
            </small>
          </article>
          <article>
            <span>{text("Realized P&L", "P&L réalisé")}</span>
            <strong>{signed(snapshot.metrics.realizedPnl, currency)}</strong>
          </article>
          <article>
            <span>{text("Price coverage", "Couverture des prix")}</span>
            <strong>
              {snapshot.metrics.pricedPositions}/{snapshot.metrics.totalPositions}
            </strong>
          </article>
        </div>
      )}

      <div className="paper-trading-grid">
        <form className="paper-order-card" onSubmit={submitTrade}>
          <div>
            <span className="control-label">
              {text("SIMULATED ORDER", "ORDRE SIMULÉ")}
            </span>
            <h3>{text("Buy or sell a paper position", "Acheter ou vendre une position simulée")}</h3>
          </div>

          <div className="chip-row">
            <button
              type="button"
              className={side === "buy" ? "chip active" : "chip"}
              onClick={() => setSide("buy")}
            >
              {text("Buy", "Acheter")}
            </button>
            <button
              type="button"
              className={side === "sell" ? "chip active" : "chip"}
              onClick={() => setSide("sell")}
            >
              {text("Sell", "Vendre")}
            </button>
          </div>

          <label>
            <span>{text("Asset class", "Classe d’actifs / asset class")}</span>
            <select
              value={assetClass}
              onChange={(event) => setAssetClass(event.target.value as AssetClass)}
            >
              {assetClasses.map((item) => (
                <option value={item.value} key={item.value}>
                  {isFrench ? item.fr : item.en}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>{text("Symbol", "Symbole")}</span>
            <input
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
              placeholder={assetClass === "fx" ? "EUR/USD" : "AAPL"}
              maxLength={32}
            />
          </label>

          {assetClass === "fx" && (
            <div className="chip-row">
              {["EUR/USD", "GBP/USD"].map((pair) => (
                <button
                  type="button"
                  className={symbol === pair ? "chip active" : "chip"}
                  key={pair}
                  onClick={() => setSymbol(pair)}
                >
                  {pair}
                </button>
              ))}
            </div>
          )}

          <label>
            <span>{text("Quantity", "Quantité")}</span>
            <input
              type="number"
              min="0.0001"
              step="any"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>

          <button
            className="chip"
            type="button"
            onClick={() => void previewQuote()}
            disabled={quoteLoading || !symbol.trim()}
          >
            {quoteLoading
              ? text("Checking price…", "Vérification du prix…")
              : text("Check verified price", "Vérifier le prix")}
          </button>

          {quote && (
            <div className="paper-quote-preview">
              <span>{quote.symbol}</span>
              <strong>{compact(quote.price)}</strong>
              <small>
                {quote.source} · {new Date(quote.asOf).toLocaleDateString(isFrench ? "fr-FR" : "en-US")}
              </small>
            </div>
          )}

          {quoteMessage && <p className="inline-status">{quoteMessage}</p>}

          <button
            className="full-button"
            type="submit"
            disabled={
              trading ||
              !symbol.trim() ||
              !quantity ||
              Number(quantity) <= 0
            }
          >
            {trading
              ? text("Executing simulated order…", "Exécution de l’ordre simulé…")
              : side === "buy"
                ? text("Execute paper buy", "Exécuter l’achat simulé")
                : text("Execute paper sell", "Exécuter la vente simulée")}
          </button>

          <p className="account-muted">
            {text(
              "The server re-checks the provider price at execution. This never sends an order to a broker.",
              "Le serveur revérifie le prix fournisseur au moment de l’exécution. Aucun ordre n’est jamais envoyé à un courtier / broker.",
            )}
          </p>
        </form>

        <div className="paper-provider-card">
          <span className="control-label">
            {text("CURRENT PRICE COVERAGE", "COUVERTURE PRIX ACTUELLE")}
          </span>
          <h3>{text("What can be simulated now", "Ce qui peut être simulé maintenant")}</h3>
          <div className="numbered-checklist">
            <div>
              <span>01</span>
              <strong>{text(
                "EUR/USD and GBP/USD can execute against ECB daily reference rates in a USD portfolio. USD/JPY can be quoted but is blocked until JPY→USD conversion is supported.",
                "EUR/USD et GBP/USD peuvent être exécutés avec les taux de référence quotidiens BCE / ECB dans un portefeuille USD. USD/JPY peut être coté mais reste bloqué tant que la conversion JPY→USD n’est pas prise en charge.",
              )}</strong>
            </div>
            <div>
              <span>02</span>
              <strong>{text(
                "Stocks, ETFs, commodities and crypto are wired to Twelve Data but require TWELVE_DATA_API_KEY",
                "Actions, ETF, matières premières et crypto sont branchés sur Twelve Data mais nécessitent TWELVE_DATA_API_KEY",
              )}</strong>
            </div>
            <div>
              <span>03</span>
              <strong>{text(
                "If a price is missing or stale, execution is blocked",
                "Si un prix manque ou est trop ancien, l’exécution est bloquée",
              )}</strong>
            </div>
          </div>
        </div>
      </div>

      {status && <p className="inline-status" role="status">{status}</p>}

      <div className="paper-book-card paper-history-card">
        <div className="panel-heading">
          <div>
            <span className="mini-label">{text("PERFORMANCE HISTORY", "HISTORIQUE DE PERFORMANCE")}</span>
            <h3>{text(
              "Daily snapshots are saved only with complete verified price coverage",
              "Les snapshots quotidiens sont enregistrés uniquement avec une couverture complète de prix vérifiés",
            )}</h3>
          </div>
          <span className="connection-badge">
            {history.length
              ? isFrench
                ? `${history.length} jour${history.length === 1 ? "" : "s"} enregistré${history.length === 1 ? "" : "s"}`
                : `${history.length} day${history.length === 1 ? "" : "s"} recorded`
              : text("No complete snapshot yet", "Aucun snapshot complet pour le moment")}
          </span>
        </div>

        {history.length ? (
          <div className="paper-history-layout">
            <div className="paper-history-chart" aria-label={text("Paper portfolio performance history", "Historique de performance du portefeuille simulé")}>
              {history.length > 1 ? (
                <svg viewBox="0 0 100 54" preserveAspectRatio="none" role="img">
                  <line x1="0" y1="50" x2="100" y2="50" />
                  <polyline points={historyPolyline} />
                </svg>
              ) : (
                <div className="paper-history-single">
                  <strong>
                    {history[0].return_percent > 0 ? "+" : ""}
                    {history[0].return_percent.toFixed(2)}%
                  </strong>
                  <span>{text("First verified snapshot", "Premier snapshot vérifié")}</span>
                </div>
              )}
            </div>

            <div className="paper-history-summary">
              {history.slice(-3).reverse().map((item) => (
                <article key={item.snapshot_date}>
                  <span>
                    {new Date(`${item.snapshot_date}T00:00:00Z`).toLocaleDateString(
                      isFrench ? "fr-FR" : "en-US",
                    )}
                  </span>
                  <strong>{money(item.total_equity, currency)}</strong>
                  <small>
                    {item.return_percent > 0 ? "+" : ""}
                    {item.return_percent.toFixed(2)}% · {signed(item.total_pnl, currency)}
                  </small>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <p className="account-muted">
            {text(
              "The first snapshot will be created automatically when FinanceStudio can value every open position in the portfolio.",
              "Le premier snapshot sera créé automatiquement lorsque FinanceStudio pourra valoriser toutes les positions ouvertes du portefeuille.",
            )}
          </p>
        )}
      </div>

      {snapshot?.attribution.length ? (
        <div className="paper-book-card paper-attribution-card">
          <div className="panel-heading">
            <div>
              <span className="mini-label">{text("PERFORMANCE ATTRIBUTION", "ATTRIBUTION DE PERFORMANCE")}</span>
              <h3>{text(
                "See which decisions created or destroyed virtual P&L",
                "Voir quelles décisions ont créé ou détruit le P&L virtuel",
              )}</h3>
            </div>
            <span className="connection-badge">
              {text(
                "Contribution uses starting virtual capital",
                "La contribution utilise le capital virtuel initial",
              )}
            </span>
          </div>

          <div className="paper-attribution-grid">
            {snapshot.attribution.map((item) => (
              <article key={`${item.symbol}-${item.assetClass}`}>
                <div>
                  <strong>{item.symbol}</strong>
                  <span>{item.assetClass}</span>
                </div>
                <dl>
                  <div>
                    <dt>{text("Realized", "Réalisé")}</dt>
                    <dd>{signed(item.realizedPnl, currency)}</dd>
                  </div>
                  <div>
                    <dt>{text("Unrealized", "Non réalisé")}</dt>
                    <dd>
                      {item.valuationStatus === "priced"
                        ? signed(item.unrealizedPnl, currency)
                        : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt>{text("Total contribution", "Contribution totale")}</dt>
                    <dd>
                      {item.valuationStatus === "priced" || item.currentValue === null
                        ? signed(item.totalPnl, currency)
                        : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt>{text("Portfolio contribution", "Contribution portefeuille")}</dt>
                    <dd>
                      {item.contributionPercent === null
                        ? "—"
                        : `${item.contributionPercent > 0 ? "+" : ""}${item.contributionPercent.toFixed(2)}%`}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="paper-book-grid">
        <div className="paper-book-card">
          <div className="panel-heading">
            <div>
              <span className="mini-label">{text("OPEN POSITIONS", "POSITIONS OUVERTES")}</span>
              <h3>{text("Marked only when a provider quote exists", "Valorisation uniquement si un prix fournisseur existe")}</h3>
            </div>
          </div>

          {snapshot?.positions.length ? (
            <div className="paper-table-wrap">
              <table className="paper-table">
                <thead>
                  <tr>
                    <th>{text("Asset", "Actif")}</th>
                    <th>{text("Qty", "Qté")}</th>
                    <th>{text("Avg cost", "Coût moyen")}</th>
                    <th>{text("Last", "Dernier")}</th>
                    <th>{text("Value", "Valeur")}</th>
                    <th>{text("Unrealized", "Non réalisé")}</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.positions.map((position) => (
                    <tr key={position.id}>
                      <td>
                        <strong>{position.symbol}</strong>
                        <small>{position.asset_class}</small>
                      </td>
                      <td>{compact(position.quantity)}</td>
                      <td>{compact(position.average_cost)}</td>
                      <td>
                        {position.valuation_status === "priced" && position.quote
                          ? compact(position.quote.price)
                          : position.valuation_status === "currency_mismatch"
                            ? text("FX conversion needed", "Conversion FX requise")
                            : text("Unpriced", "Non pricé")}
                      </td>
                      <td>{money(position.current_value, currency)}</td>
                      <td>{signed(position.unrealized_pnl, currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="account-muted">
              {text("No open paper position yet.", "Aucune position simulée ouverte pour le moment.")}
            </p>
          )}
        </div>

        <div className="paper-book-card">
          <div className="panel-heading">
            <div>
              <span className="mini-label">{text("TRANSACTION LEDGER", "JOURNAL DES TRANSACTIONS")}</span>
              <h3>{text("Every simulated execution is preserved", "Chaque exécution simulée est conservée")}</h3>
            </div>
          </div>

          {snapshot?.transactions.length ? (
            <div className="paper-transaction-list">
              {snapshot.transactions.slice(0, 10).map((transaction) => (
                <article key={transaction.id}>
                  <div>
                    <strong>
                      {transaction.side.toUpperCase()} · {transaction.symbol}
                    </strong>
                    <span>
                      {new Date(transaction.created_at).toLocaleString(isFrench ? "fr-FR" : "en-US")}
                    </span>
                  </div>
                  <p>
                    {compact(Number(transaction.quantity))} × {compact(Number(transaction.price))}
                    {" · "}
                    {money(Number(transaction.notional), currency)}
                  </p>
                  <small>
                    {transaction.price_source}
                    {Number(transaction.realized_pnl) !== 0
                      ? ` · ${text("realized", "réalisé")} ${signed(Number(transaction.realized_pnl), currency)}`
                      : ""}
                  </small>
                </article>
              ))}
            </div>
          ) : (
            <p className="account-muted">
              {text("No simulated transaction yet.", "Aucune transaction simulée pour le moment.")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
