type AssetClass =
  | "equity"
  | "etf"
  | "bond"
  | "fx"
  | "commodity"
  | "crypto"
  | "option";

type Side = "buy" | "sell";

type Quote = {
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

type Point = { date: string; value: number };

const assetClasses = new Set<AssetClass>([
  "equity",
  "etf",
  "bond",
  "fx",
  "commodity",
  "crypto",
  "option",
]);

const ecbSymbols: Record<
  string,
  { canonical: string; quoteCurrency: string; currencies: Array<"USD" | "GBP" | "JPY"> }
> = {
  "EUR/USD": { canonical: "EUR/USD", quoteCurrency: "USD", currencies: ["USD"] },
  EURUSD: { canonical: "EUR/USD", quoteCurrency: "USD", currencies: ["USD"] },
  "EUR-USD": { canonical: "EUR/USD", quoteCurrency: "USD", currencies: ["USD"] },
  "GBP/USD": { canonical: "GBP/USD", quoteCurrency: "USD", currencies: ["USD", "GBP"] },
  GBPUSD: { canonical: "GBP/USD", quoteCurrency: "USD", currencies: ["USD", "GBP"] },
  "GBP-USD": { canonical: "GBP/USD", quoteCurrency: "USD", currencies: ["USD", "GBP"] },
  "USD/JPY": { canonical: "USD/JPY", quoteCurrency: "JPY", currencies: ["JPY", "USD"] },
  USDJPY: { canonical: "USD/JPY", quoteCurrency: "JPY", currencies: ["JPY", "USD"] },
  "USD-JPY": { canonical: "USD/JPY", quoteCurrency: "JPY", currencies: ["JPY", "USD"] },
};

function envKey(mapName: string, legacyName: string) {
  const raw = Deno.env.get(mapName);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Record<string, string>;
      if (parsed.default) return parsed.default;
    } catch {
      // Fall through to the legacy variable.
    }
  }
  return Deno.env.get(legacyName) ?? "";
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const PUBLISHABLE_KEY = envKey("SUPABASE_PUBLISHABLE_KEYS", "SUPABASE_ANON_KEY");
const SECRET_KEY = envKey("SUPABASE_SECRET_KEYS", "SUPABASE_SERVICE_ROLE_KEY");

function response(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function cleanSymbol(value: unknown) {
  return typeof value === "string"
    ? value.trim().toUpperCase().slice(0, 32)
    : "";
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  cells.push(current);
  return cells;
}

function parseEcbCsv(csv: string): Point[] {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const dateIndex = headers.indexOf("TIME_PERIOD");
  const valueIndex = headers.indexOf("OBS_VALUE");

  if (dateIndex < 0 || valueIndex < 0) return [];

  return lines
    .slice(1)
    .map((line) => {
      const cells = parseCsvLine(line);
      return {
        date: cells[dateIndex] ?? "",
        value: Number(cells[valueIndex]),
      };
    })
    .filter((point) => point.date && Number.isFinite(point.value))
    .sort((a, b) => a.date.localeCompare(b.date));
}

async function fetchEcb(currency: "USD" | "GBP" | "JPY") {
  const url =
    `https://data-api.ecb.europa.eu/service/data/EXR/D.${currency}.EUR.SP00.A?lastNObservations=2&detail=dataonly&format=csvdata`;
  const result = await fetch(url, {
    headers: { Accept: "text/csv" },
  });

  if (!result.ok) {
    throw new Error(`ECB request failed for ${currency}: ${result.status}`);
  }

  return { points: parseEcbCsv(await result.text()), sourceUrl: url };
}

function dateIso(date: string) {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? new Date(0).toISOString() : parsed.toISOString();
}

async function ecbQuote(symbol: string): Promise<Quote | null> {
  const mapped = ecbSymbols[symbol];
  if (!mapped) return null;

  const observations = new Map<string, { points: Point[]; sourceUrl: string }>();
  await Promise.all(
    mapped.currencies.map(async (currency) => {
      observations.set(currency, await fetchEcb(currency));
    }),
  );

  const usd = observations.get("USD")?.points ?? [];
  const gbp = observations.get("GBP")?.points ?? [];
  const jpy = observations.get("JPY")?.points ?? [];

  let current: number | null = null;
  let previous: number | null = null;
  let latestDate = "";
  let sourceUrl = observations.get(mapped.currencies[0])?.sourceUrl ?? "https://data.ecb.europa.eu/";

  if (mapped.canonical === "EUR/USD") {
    current = usd.at(-1)?.value ?? null;
    previous = usd.at(-2)?.value ?? null;
    latestDate = usd.at(-1)?.date ?? "";
  } else if (mapped.canonical === "GBP/USD") {
    const usdNow = usd.at(-1);
    const gbpNow = gbp.at(-1);
    const usdPrev = usd.at(-2);
    const gbpPrev = gbp.at(-2);
    if (usdNow && gbpNow) current = usdNow.value / gbpNow.value;
    if (usdPrev && gbpPrev) previous = usdPrev.value / gbpPrev.value;
    latestDate = [usdNow?.date ?? "", gbpNow?.date ?? ""].sort().at(-1) ?? "";
    sourceUrl = observations.get("GBP")?.sourceUrl ?? sourceUrl;
  } else if (mapped.canonical === "USD/JPY") {
    const jpyNow = jpy.at(-1);
    const usdNow = usd.at(-1);
    const jpyPrev = jpy.at(-2);
    const usdPrev = usd.at(-2);
    if (jpyNow && usdNow) current = jpyNow.value / usdNow.value;
    if (jpyPrev && usdPrev) previous = jpyPrev.value / usdPrev.value;
    latestDate = [jpyNow?.date ?? "", usdNow?.date ?? ""].sort().at(-1) ?? "";
    sourceUrl = observations.get("JPY")?.sourceUrl ?? sourceUrl;
  }

  if (current === null || !Number.isFinite(current) || current <= 0 || !latestDate) {
    return null;
  }

  return {
    symbol: mapped.canonical,
    assetClass: "fx",
    price: current,
    previousClose:
      previous !== null && Number.isFinite(previous) ? previous : null,
    currency: mapped.quoteCurrency,
    asOf: dateIso(latestDate),
    source: "European Central Bank",
    sourceUrl,
    delayed: true,
  };
}

async function twelveDataQuote(symbol: string, assetClass: AssetClass): Promise<Quote | null> {
  const apiKey = Deno.env.get("TWELVE_DATA_API_KEY");
  if (!apiKey) return null;

  const params = new URLSearchParams({ symbol, apikey: apiKey });
  const result = await fetch(`https://api.twelvedata.com/quote?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });

  if (!result.ok) {
    throw new Error(`Twelve Data request failed: ${result.status}`);
  }

  const payload = (await result.json()) as {
    status?: string;
    message?: string;
    symbol?: string;
    currency?: string;
    timestamp?: number;
    datetime?: string;
    close?: string;
    previous_close?: string;
  };

  if (payload.status === "error") {
    throw new Error(payload.message || "Twelve Data could not price this instrument.");
  }

  const price = Number(payload.close);
  if (!Number.isFinite(price) || price <= 0) return null;

  const previous = Number(payload.previous_close);
  const asOf =
    typeof payload.timestamp === "number"
      ? new Date(payload.timestamp * 1000).toISOString()
      : new Date(payload.datetime ?? "").toISOString();

  return {
    symbol: cleanSymbol(payload.symbol || symbol),
    assetClass,
    price,
    previousClose: Number.isFinite(previous) ? previous : null,
    currency: payload.currency || null,
    asOf,
    source: "Twelve Data",
    sourceUrl: "https://twelvedata.com/",
    delayed: false,
  };
}

function quoteAgeHours(quote: Quote) {
  const asOf = new Date(quote.asOf).getTime();
  if (!Number.isFinite(asOf)) return Number.POSITIVE_INFINITY;
  return Math.max(0, (Date.now() - asOf) / 3_600_000);
}

function quoteFresh(quote: Quote) {
  const age = quoteAgeHours(quote);
  return quote.source === "European Central Bank" ? age <= 120 : age <= 96;
}

async function getQuote(symbol: string, assetClass: AssetClass) {
  if (assetClass === "fx" && ecbSymbols[symbol]) {
    const quote = await ecbQuote(symbol);
    return {
      quote,
      provider: quote
        ? { provider: "ecb", status: "live", message: "ECB daily reference rate available." }
        : { provider: "ecb", status: "error", message: "The ECB reference rate is temporarily unavailable." },
    };
  }

  if (!Deno.env.get("TWELVE_DATA_API_KEY")) {
    return {
      quote: null,
      provider: {
        provider: "twelve-data",
        status: "needs_configuration",
        message:
          "TWELVE_DATA_API_KEY is not configured for the secure paper-execution service.",
      },
    };
  }

  try {
    const quote = await twelveDataQuote(symbol, assetClass);
    return {
      quote,
      provider: quote
        ? { provider: "twelve-data", status: "live", message: "Instrument quote available from Twelve Data." }
        : { provider: "twelve-data", status: "error", message: "Twelve Data returned no usable latest price." },
    };
  } catch (error) {
    return {
      quote: null,
      provider: {
        provider: "twelve-data",
        status: "error",
        message: error instanceof Error ? error.message : "Twelve Data pricing failed.",
      },
    };
  }
}

async function adminFetch(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SECRET_KEY,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function findPortfolio(userId: string, portfolioId?: string) {
  const filter = portfolioId
    ? `id=eq.${encodeURIComponent(portfolioId)}&user_id=eq.${encodeURIComponent(userId)}`
    : `user_id=eq.${encodeURIComponent(userId)}`;

  const result = await adminFetch(
    `/rest/v1/paper_portfolios?${filter}&select=id,name,base_currency,starting_cash,cash_balance,created_at,updated_at&order=created_at.asc&limit=1`,
  );

  if (!result.ok) {
    throw new Error(`Portfolio lookup failed: ${result.status}`);
  }

  const rows = (await result.json()) as Array<Record<string, unknown>>;
  return rows[0] ?? null;
}

async function ensurePortfolio(userId: string) {
  const existing = await findPortfolio(userId);
  if (existing) return existing;

  const result = await adminFetch("/rest/v1/paper_portfolios", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      user_id: userId,
      name: "Main Portfolio",
      base_currency: "USD",
      starting_cash: 100000,
      cash_balance: 100000,
    }),
  });

  if (!result.ok) {
    throw new Error(`Portfolio initialization failed: ${result.status}`);
  }

  const rows = (await result.json()) as Array<Record<string, unknown>>;
  return rows[0] ?? null;
}

async function verifyUser(req: Request) {
  const authorization = req.headers.get("Authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) return null;

  const result = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: PUBLISHABLE_KEY,
      Authorization: authorization,
    },
  });

  if (!result.ok) return null;
  return (await result.json()) as { id?: string };
}

Deno.serve(async (req: Request) => {
  if (!SUPABASE_URL || !PUBLISHABLE_KEY || !SECRET_KEY) {
    return response(503, {
      error: "Secure paper-execution service is not configured.",
      code: "SERVER_CONFIGURATION_ERROR",
    });
  }

  const user = await verifyUser(req);
  if (!user?.id) {
    return response(401, { error: "Sign in required.", code: "AUTH_REQUIRED" });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return response(400, { error: "Invalid JSON request.", code: "INVALID_JSON" });
  }

  const action =
    body.action === "ensure_portfolio"
      ? "ensure_portfolio"
      : body.action === "refresh_snapshot"
        ? "refresh_snapshot"
        : "trade";

  try {
    if (action === "ensure_portfolio") {
      const portfolio = await ensurePortfolio(user.id);
      if (!portfolio) {
        return response(500, {
          error: "Paper portfolio could not be initialized.",
          code: "PORTFOLIO_INITIALIZATION_FAILED",
        });
      }
      return response(200, { portfolio });
    }

    if (action === "refresh_snapshot") {
      const requestedPortfolioId =
        typeof body.portfolioId === "string" ? body.portfolioId.trim() : "";
      const portfolio = await findPortfolio(
        user.id,
        requestedPortfolioId || undefined,
      );

      if (!portfolio) {
        return response(404, {
          error: "Paper portfolio not found.",
          code: "PORTFOLIO_NOT_FOUND",
        });
      }

      const positionsResult = await adminFetch(
        `/rest/v1/paper_positions?portfolio_id=eq.${encodeURIComponent(String(portfolio.id))}&select=symbol,asset_class,quantity,average_cost`,
      );

      if (!positionsResult.ok) {
        throw new Error(
          `Position lookup failed: ${positionsResult.status}`,
        );
      }

      const positions = (await positionsResult.json()) as Array<{
        symbol: string;
        asset_class: AssetClass;
        quantity: string | number;
        average_cost: string | number | null;
      }>;

      const baseCurrency = String(portfolio.base_currency ?? "USD");
      let marketValue = 0;
      let fullCoverage = true;

      for (const position of positions) {
        if (!assetClasses.has(position.asset_class)) {
          fullCoverage = false;
          break;
        }

        const pricing = await getQuote(position.symbol, position.asset_class);
        if (
          !pricing.quote ||
          (pricing.quote.currency &&
            pricing.quote.currency !== baseCurrency)
        ) {
          fullCoverage = false;
          break;
        }

        marketValue +=
          Number(position.quantity) * Number(pricing.quote.price);
      }

      if (!fullCoverage) {
        return response(200, {
          snapshotWritten: false,
          reason: "INCOMPLETE_PRICE_COVERAGE",
        });
      }

      const cashBalance = Number(portfolio.cash_balance);
      const startingCash = Number(portfolio.starting_cash);
      const totalEquity = cashBalance + marketValue;
      const totalPnl = totalEquity - startingCash;
      const returnPercent =
        startingCash === 0 ? 0 : (totalPnl / startingCash) * 100;
      const snapshotDate = new Date().toISOString().slice(0, 10);

      const snapshotResult = await adminFetch(
        "/rest/v1/paper_portfolio_snapshots?on_conflict=portfolio_id,snapshot_date",
        {
          method: "POST",
          headers: {
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify({
            user_id: user.id,
            portfolio_id: portfolio.id,
            snapshot_date: snapshotDate,
            cash_balance: cashBalance,
            market_value: marketValue,
            total_equity: totalEquity,
            total_pnl: totalPnl,
            return_percent: returnPercent,
            priced_positions: positions.length,
            total_positions: positions.length,
            updated_at: new Date().toISOString(),
          }),
        },
      );

      if (!snapshotResult.ok) {
        throw new Error(
          `Snapshot write failed: ${snapshotResult.status}`,
        );
      }

      return response(200, {
        snapshotWritten: true,
        snapshotDate,
      });
    }

    const portfolioId =
      typeof body.portfolioId === "string" ? body.portfolioId.trim() : "";
    const symbol = cleanSymbol(body.symbol);
    const assetClass = body.assetClass as AssetClass | undefined;
    const side = body.side as Side | undefined;
    const quantity = Number(body.quantity);

    if (
      !portfolioId ||
      !symbol ||
      !assetClass ||
      !assetClasses.has(assetClass) ||
      (side !== "buy" && side !== "sell") ||
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      quantity > 1_000_000_000
    ) {
      return response(400, {
        error: "Invalid paper trade request.",
        code: "INVALID_TRADE",
      });
    }

    const portfolio = await findPortfolio(user.id, portfolioId);
    if (!portfolio) {
      return response(404, {
        error: "Paper portfolio not found.",
        code: "PORTFOLIO_NOT_FOUND",
      });
    }

    const pricing = await getQuote(symbol, assetClass);
    if (!pricing.quote) {
      return response(
        pricing.provider.status === "needs_configuration" ? 503 : 409,
        {
          error: pricing.provider.message,
          code: "PRICE_UNAVAILABLE",
          provider: pricing.provider,
        },
      );
    }

    if (!quoteFresh(pricing.quote)) {
      return response(409, {
        error:
          "The latest verified provider price is too old for a new simulated trade.",
        code: "STALE_PRICE",
        quoteAgeHours: quoteAgeHours(pricing.quote),
        quote: pricing.quote,
      });
    }

    const baseCurrency = String(portfolio.base_currency ?? "USD");
    if (pricing.quote.currency && pricing.quote.currency !== baseCurrency) {
      return response(409, {
        error:
          `This instrument is quoted in ${pricing.quote.currency}, while the paper portfolio cash is in ${baseCurrency}. Cross-currency conversion is not enabled yet, so the simulated order is blocked.`,
        code: "QUOTE_CURRENCY_MISMATCH",
        quote: pricing.quote,
        portfolioCurrency: baseCurrency,
      });
    }

    const tradeResult = await adminFetch(
      "/rest/v1/rpc/execute_verified_paper_trade",
      {
        method: "POST",
        body: JSON.stringify({
          p_user_id: user.id,
          p_portfolio_id: portfolioId,
          p_symbol: pricing.quote.symbol,
          p_asset_class: assetClass,
          p_side: side,
          p_quantity: quantity,
          p_price: pricing.quote.price,
          p_price_as_of: pricing.quote.asOf,
          p_price_source: pricing.quote.source,
        }),
      },
    );

    const tradePayload = await tradeResult.json().catch(() => null);

    if (!tradeResult.ok) {
      const message =
        typeof tradePayload?.message === "string"
          ? tradePayload.message
          : "Paper trade execution failed.";
      const status =
        message.includes("INSUFFICIENT_CASH") ||
        message.includes("INSUFFICIENT_POSITION")
          ? 409
          : message.includes("PORTFOLIO_NOT_FOUND")
            ? 404
            : 400;

      return response(status, {
        error: message,
        code: message,
      });
    }

    const [updatedPortfolioResult, positionResult] = await Promise.all([
      adminFetch(
        `/rest/v1/paper_portfolios?id=eq.${encodeURIComponent(portfolioId)}&select=id,name,base_currency,starting_cash,cash_balance`,
      ),
      adminFetch(
        `/rest/v1/paper_positions?portfolio_id=eq.${encodeURIComponent(portfolioId)}&symbol=eq.${encodeURIComponent(pricing.quote.symbol)}&asset_class=eq.${encodeURIComponent(assetClass)}&select=id,symbol,asset_class,quantity,average_cost,updated_at`,
      ),
    ]);

    const updatedPortfolios = updatedPortfolioResult.ok
      ? ((await updatedPortfolioResult.json()) as Array<Record<string, unknown>>)
      : [];
    const positions = positionResult.ok
      ? ((await positionResult.json()) as Array<Record<string, unknown>>)
      : [];

    return response(200, {
      trade: tradePayload,
      quote: pricing.quote,
      portfolio: updatedPortfolios[0] ?? null,
      position: positions[0] ?? null,
      execution: "verified-edge",
    });
  } catch (error) {
    return response(500, {
      error:
        error instanceof Error
          ? error.message
          : "Secure paper execution failed.",
      code: "SECURE_EXECUTION_ERROR",
    });
  }
});
