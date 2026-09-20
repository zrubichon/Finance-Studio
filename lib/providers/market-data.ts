export type MarketRegion =
  | "Global"
  | "USA"
  | "Europe"
  | "UK"
  | "Asia"
  | "China"
  | "Japan"
  | "Emerging Markets";

export type MarketCategory =
  | "Equities"
  | "Rates"
  | "FX"
  | "Commodities"
  | "Volatility"
  | "Credit";

export type MarketQuote = {
  id: string;
  label: string;
  category: MarketCategory;
  region: MarketRegion;
  value: number;
  previousValue: number | null;
  change: number | null;
  changePercent: number | null;
  unit: "" | "%" | "$" | "bps";
  asOf: string;
  source: string;
  sourceUrl: string;
};

export type ProviderStatus = {
  id: "ecb" | "fred";
  label: string;
  status: "live" | "partial" | "needs_configuration" | "error";
  message: string;
};

export type MarketDataResponse = {
  updatedAt: string;
  quotes: MarketQuote[];
  providers: ProviderStatus[];
};

type Point = { date: string; value: number };

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
      const value = Number(cells[valueIndex]);
      return {
        date: cells[dateIndex],
        value,
      };
    })
    .filter((point) => point.date && Number.isFinite(point.value))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function quoteFromPoints(
  id: string,
  label: string,
  category: MarketCategory,
  region: MarketRegion,
  points: Point[],
  unit: MarketQuote["unit"],
  source: string,
  sourceUrl: string,
): MarketQuote | null {
  const latest = points.at(-1);
  if (!latest) return null;

  const previous = points.at(-2)?.value ?? null;
  const change = previous === null ? null : latest.value - previous;
  const changePercent =
    previous === null || previous === 0
      ? null
      : ((latest.value - previous) / previous) * 100;

  return {
    id,
    label,
    category,
    region,
    value: latest.value,
    previousValue: previous,
    change,
    changePercent,
    unit,
    asOf: latest.date,
    source,
    sourceUrl,
  };
}

async function fetchEcbCurrency(currency: "USD" | "GBP" | "JPY") {
  const url =
    `https://data-api.ecb.europa.eu/service/data/EXR/D.${currency}.EUR.SP00.A?lastNObservations=2&detail=dataonly&format=csvdata`;
  const response = await fetch(url, {
    headers: { Accept: "text/csv" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`ECB request failed for ${currency}: ${response.status}`);
  }

  return {
    points: parseEcbCsv(await response.text()),
    sourceUrl: url,
  };
}

async function getEcbQuotes(): Promise<{
  quotes: MarketQuote[];
  status: ProviderStatus;
}> {
  try {
    const [usd, gbp, jpy] = await Promise.all([
      fetchEcbCurrency("USD"),
      fetchEcbCurrency("GBP"),
      fetchEcbCurrency("JPY"),
    ]);

    const eurUsd = quoteFromPoints(
      "eur-usd",
      "EUR/USD",
      "FX",
      "Europe",
      usd.points,
      "",
      "European Central Bank",
      usd.sourceUrl,
    );

    const crossPair = (
      id: string,
      label: string,
      region: MarketRegion,
      numerator: Point[],
      denominator: Point[],
      sourceUrl: string,
    ) => {
      const numeratorLatest = numerator.at(-1);
      const denominatorLatest = denominator.at(-1);
      if (!numeratorLatest || !denominatorLatest) return null;

      const numeratorPrevious = numerator.at(-2)?.value;
      const denominatorPrevious = denominator.at(-2)?.value;

      const current = numeratorLatest.value / denominatorLatest.value;
      const previous =
        numeratorPrevious === undefined || denominatorPrevious === undefined
          ? null
          : numeratorPrevious / denominatorPrevious;

      const points: Point[] = [
        ...(previous === null
          ? []
          : [{ date: denominator.at(-2)?.date ?? numerator.at(-2)?.date ?? "", value: previous }]),
        {
          date:
            denominatorLatest.date > numeratorLatest.date
              ? denominatorLatest.date
              : numeratorLatest.date,
          value: current,
        },
      ];

      return quoteFromPoints(
        id,
        label,
        "FX",
        region,
        points,
        "",
        "European Central Bank",
        sourceUrl,
      );
    };

    const gbpUsd = crossPair(
      "gbp-usd",
      "GBP/USD",
      "UK",
      usd.points,
      gbp.points,
      gbp.sourceUrl,
    );

    const usdJpy = crossPair(
      "usd-jpy",
      "USD/JPY",
      "Japan",
      jpy.points,
      usd.points,
      jpy.sourceUrl,
    );

    const quotes = [eurUsd, gbpUsd, usdJpy].filter(
      (value): value is MarketQuote => Boolean(value),
    );

    return {
      quotes,
      status: {
        id: "ecb",
        label: "European Central Bank",
        status: quotes.length === 3 ? "live" : "partial",
        message:
          quotes.length === 3
            ? "FX reference rates connected."
            : "ECB is connected, but part of the FX set is temporarily unavailable.",
      },
    };
  } catch (error) {
    return {
      quotes: [],
      status: {
        id: "ecb",
        label: "European Central Bank",
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "ECB data could not be loaded.",
      },
    };
  }
}

type FredSeriesConfig = {
  id: string;
  label: string;
  category: MarketCategory;
  region: MarketRegion;
  unit: MarketQuote["unit"];
};

const fredSeries: FredSeriesConfig[] = [
  { id: "SP500", label: "S&P 500", category: "Equities", region: "USA", unit: "" },
  { id: "NASDAQCOM", label: "Nasdaq Composite", category: "Equities", region: "USA", unit: "" },
  { id: "DGS2", label: "US 2Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS10", label: "US 10Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS30", label: "US 30Y", category: "Rates", region: "USA", unit: "%" },
  { id: "VIXCLS", label: "VIX", category: "Volatility", region: "USA", unit: "" },
  { id: "DCOILWTICO", label: "WTI", category: "Commodities", region: "Global", unit: "$" },
  { id: "BAMLC0A0CM", label: "US IG OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAMLH0A0HYM2", label: "US HY OAS", category: "Credit", region: "USA", unit: "%" },
];

async function fetchFredSeries(
  config: FredSeriesConfig,
  apiKey: string,
): Promise<MarketQuote | null> {
  const params = new URLSearchParams({
    series_id: config.id,
    api_key: apiKey,
    file_type: "json",
    sort_order: "desc",
    limit: "10",
  });

  const endpoint = `https://api.stlouisfed.org/fred/series/observations?${params.toString()}`;
  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`FRED request failed for ${config.id}: ${response.status}`);
  }

  const payload = (await response.json()) as {
    observations?: Array<{ date?: string; value?: string }>;
  };

  const points = (payload.observations ?? [])
    .map((observation) => ({
      date: observation.date ?? "",
      value: Number(observation.value),
    }))
    .filter((point) => point.date && Number.isFinite(point.value))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-2);

  return quoteFromPoints(
    config.id.toLowerCase(),
    config.label,
    config.category,
    config.region,
    points,
    config.unit,
    "Federal Reserve Bank of St. Louis (FRED)",
    `https://fred.stlouisfed.org/series/${config.id}`,
  );
}

async function getFredQuotes(): Promise<{
  quotes: MarketQuote[];
  status: ProviderStatus;
}> {
  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    return {
      quotes: [],
      status: {
        id: "fred",
        label: "FRED",
        status: "needs_configuration",
        message:
          "Add FRED_API_KEY to connect US equities, Treasury yields, volatility, oil and credit spreads.",
      },
    };
  }

  const results = await Promise.allSettled(
    fredSeries.map((series) => fetchFredSeries(series, apiKey)),
  );

  const quotes = results
    .filter(
      (result): result is PromiseFulfilledResult<MarketQuote | null> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value)
    .filter((value): value is MarketQuote => Boolean(value));

  const failures = results.length - quotes.length;

  return {
    quotes,
    status: {
      id: "fred",
      label: "FRED",
      status:
        quotes.length === 0 ? "error" : failures > 0 ? "partial" : "live",
      message:
        quotes.length === 0
          ? "FRED is configured, but no series could be loaded."
          : failures > 0
            ? `FRED connected with ${quotes.length} series; ${failures} series unavailable.`
            : `FRED connected with ${quotes.length} series.`,
    },
  };
}

export async function getMarketData(): Promise<MarketDataResponse> {
  const [ecb, fred] = await Promise.all([getEcbQuotes(), getFredQuotes()]);

  return {
    updatedAt: new Date().toISOString(),
    quotes: [...fred.quotes, ...ecb.quotes],
    providers: [fred.status, ecb.status],
  };
}
