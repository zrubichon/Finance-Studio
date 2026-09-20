import { getMarketData } from "@/lib/providers/market-data";

export type InvestableAssetClass =
  | "equity"
  | "etf"
  | "bond"
  | "fx"
  | "commodity"
  | "crypto"
  | "option";

export type InstrumentQuote = {
  symbol: string;
  assetClass: InvestableAssetClass;
  price: number;
  previousClose: number | null;
  currency: string | null;
  asOf: string;
  source: string;
  sourceUrl: string;
  delayed: boolean;
};

export type InstrumentProviderStatus = {
  provider: "ecb" | "twelve-data";
  status: "live" | "needs_configuration" | "unsupported" | "error";
  message: string;
};

export type InstrumentQuoteResult = {
  quote: InstrumentQuote | null;
  provider: InstrumentProviderStatus;
};

const ecbSymbols: Record<string, { id: string; canonical: string; quoteCurrency: string }> = {
  "EUR/USD": { id: "eur-usd", canonical: "EUR/USD", quoteCurrency: "USD" },
  EURUSD: { id: "eur-usd", canonical: "EUR/USD", quoteCurrency: "USD" },
  "EUR-USD": { id: "eur-usd", canonical: "EUR/USD", quoteCurrency: "USD" },
  "GBP/USD": { id: "gbp-usd", canonical: "GBP/USD", quoteCurrency: "USD" },
  GBPUSD: { id: "gbp-usd", canonical: "GBP/USD", quoteCurrency: "USD" },
  "GBP-USD": { id: "gbp-usd", canonical: "GBP/USD", quoteCurrency: "USD" },
  "USD/JPY": { id: "usd-jpy", canonical: "USD/JPY", quoteCurrency: "JPY" },
  USDJPY: { id: "usd-jpy", canonical: "USD/JPY", quoteCurrency: "JPY" },
  "USD-JPY": { id: "usd-jpy", canonical: "USD/JPY", quoteCurrency: "JPY" },
};

function normalizeSymbol(symbol: string) {
  return symbol.trim().toUpperCase();
}

function safeDateIso(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

async function getEcbInstrumentQuote(symbol: string): Promise<InstrumentQuoteResult> {
  const normalized = normalizeSymbol(symbol);
  const mapped = ecbSymbols[normalized];

  if (!mapped) {
    return {
      quote: null,
      provider: {
        provider: "ecb",
        status: "unsupported",
        message: "This FX pair is not part of the current ECB reference-rate set.",
      },
    };
  }

  const marketData = await getMarketData();
  const marketQuote = marketData.quotes.find((quote) => quote.id === mapped.id);

  if (!marketQuote) {
    return {
      quote: null,
      provider: {
        provider: "ecb",
        status: "error",
        message: "The ECB reference rate is temporarily unavailable.",
      },
    };
  }

  return {
    quote: {
      symbol: mapped.canonical,
      assetClass: "fx",
      price: marketQuote.value,
      previousClose: marketQuote.previousValue,
      currency: mapped.quoteCurrency,
      asOf: `${marketQuote.asOf}T00:00:00.000Z`,
      source: marketQuote.source,
      sourceUrl: marketQuote.sourceUrl,
      delayed: true,
    },
    provider: {
      provider: "ecb",
      status: "live",
      message: "ECB daily reference rate available.",
    },
  };
}

async function getTwelveDataQuote(
  symbol: string,
  assetClass: InvestableAssetClass,
): Promise<InstrumentQuoteResult> {
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return {
      quote: null,
      provider: {
        provider: "twelve-data",
        status: "needs_configuration",
        message:
          "TWELVE_DATA_API_KEY is not configured. Equity, ETF, commodity and crypto paper pricing remains disabled.",
      },
    };
  }

  const params = new URLSearchParams({
    symbol: normalizeSymbol(symbol),
    apikey: apiKey,
  });

  const endpoint = `https://api.twelvedata.com/quote?${params.toString()}`;
  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      quote: null,
      provider: {
        provider: "twelve-data",
        status: "error",
        message: `Twelve Data request failed with HTTP ${response.status}.`,
      },
    };
  }

  const payload = (await response.json()) as {
    status?: string;
    code?: number;
    message?: string;
    symbol?: string;
    currency?: string;
    timestamp?: number;
    datetime?: string;
    close?: string;
    previous_close?: string;
  };

  if (payload.status === "error") {
    return {
      quote: null,
      provider: {
        provider: "twelve-data",
        status: "error",
        message: payload.message || "Twelve Data could not price this instrument.",
      },
    };
  }

  const price = Number(payload.close);
  const previousClose = Number(payload.previous_close);
  const asOf =
    typeof payload.timestamp === "number"
      ? new Date(payload.timestamp * 1000).toISOString()
      : safeDateIso(payload.datetime ?? "") ?? new Date().toISOString();

  if (!Number.isFinite(price) || price <= 0) {
    return {
      quote: null,
      provider: {
        provider: "twelve-data",
        status: "error",
        message: "Twelve Data returned no usable latest price.",
      },
    };
  }

  return {
    quote: {
      symbol: normalizeSymbol(payload.symbol || symbol),
      assetClass,
      price,
      previousClose: Number.isFinite(previousClose) ? previousClose : null,
      currency: payload.currency || null,
      asOf,
      source: "Twelve Data",
      sourceUrl: "https://twelvedata.com/",
      delayed: false,
    },
    provider: {
      provider: "twelve-data",
      status: "live",
      message: "Instrument quote available from Twelve Data.",
    },
  };
}

export async function getInstrumentQuote(
  symbol: string,
  assetClass: InvestableAssetClass,
): Promise<InstrumentQuoteResult> {
  const normalized = normalizeSymbol(symbol);

  if (!normalized) {
    return {
      quote: null,
      provider: {
        provider: assetClass === "fx" ? "ecb" : "twelve-data",
        status: "unsupported",
        message: "A symbol is required.",
      },
    };
  }

  if (assetClass === "fx" && ecbSymbols[normalized]) {
    return getEcbInstrumentQuote(normalized);
  }

  return getTwelveDataQuote(normalized, assetClass);
}

export function quoteAgeHours(quote: InstrumentQuote) {
  const asOf = new Date(quote.asOf).getTime();
  if (!Number.isFinite(asOf)) return Number.POSITIVE_INFINITY;
  return Math.max(0, (Date.now() - asOf) / 3_600_000);
}

export function isQuoteFreshEnoughForPaperTrade(quote: InstrumentQuote) {
  const age = quoteAgeHours(quote);

  // ECB reference rates are daily and weekends/holidays can create multi-day gaps.
  if (quote.source === "European Central Bank") return age <= 120;

  // Latest exchange quotes can legitimately be older over a weekend.
  return age <= 96;
}
