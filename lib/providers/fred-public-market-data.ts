import type { MarketQuote } from "@/lib/providers/market-data";

type SeriesConfig = {
  id: string;
  label: string;
  category: MarketQuote["category"];
  region: MarketQuote["region"];
  unit: MarketQuote["unit"];
};

const series: SeriesConfig[] = [
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

function startDate() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 21);
  return date.toISOString().slice(0, 10);
}

function parseCsv(csv: string) {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  return lines
    .slice(1)
    .map((line) => {
      const [date, raw] = line.split(",");
      return { date, value: Number(raw) };
    })
    .filter((point) => point.date && Number.isFinite(point.value));
}

async function fetchSeries(config: SeriesConfig): Promise<MarketQuote | null> {
  const endpoint = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(config.id)}&cosd=${startDate()}`;
  const response = await fetch(endpoint, {
    headers: { Accept: "text/csv" },
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`FRED public CSV failed for ${config.id}: ${response.status}`);

  const points = parseCsv(await response.text());
  const latest = points.at(-1);
  if (!latest) return null;
  const previous = points.at(-2)?.value ?? null;
  const change = previous === null ? null : latest.value - previous;
  const changePercent = previous === null || previous === 0 ? null : (change! / previous) * 100;

  return {
    id: `fred-public-${config.id.toLowerCase()}`,
    label: config.label,
    category: config.category,
    region: config.region,
    value: latest.value,
    previousValue: previous,
    change,
    changePercent,
    unit: config.unit,
    asOf: latest.date,
    source: "Federal Reserve Bank of St. Louis (FRED)",
    sourceUrl: `https://fred.stlouisfed.org/series/${config.id}`,
  };
}

export async function getPublicFredQuotes() {
  const results = await Promise.allSettled(series.map(fetchSeries));
  const quotes = results
    .filter((result): result is PromiseFulfilledResult<MarketQuote | null> => result.status === "fulfilled")
    .map((result) => result.value)
    .filter((quote): quote is MarketQuote => Boolean(quote));

  return {
    quotes,
    provider: {
      id: "fred",
      label: "FRED public market feed",
      status: quotes.length === 0 ? "error" as const : quotes.length < series.length ? "partial" as const : "live" as const,
      message: quotes.length
        ? `${quotes.length} US market series connected through FRED public CSV.`
        : "FRED public market series are temporarily unavailable.",
    },
  };
}
