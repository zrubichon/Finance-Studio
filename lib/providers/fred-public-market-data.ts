import type { MarketQuote } from "@/lib/providers/market-data";

type SeriesConfig = {
  id: string;
  label: string;
  category: MarketQuote["category"];
  region: MarketQuote["region"];
  unit: MarketQuote["unit"];
};

const series: SeriesConfig[] = [
  { id: "DJCA", label: "Dow Jones Composite", category: "Equities", region: "USA", unit: "" },
  { id: "DJTA", label: "Dow Jones Transportation", category: "Equities", region: "USA", unit: "" },
  { id: "DJUA", label: "Dow Jones Utilities", category: "Equities", region: "USA", unit: "" },
  { id: "DGS6MO", label: "US 6M", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS3", label: "US 3Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS7", label: "US 7Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS20", label: "US 20Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DFII5", label: "US 5Y real yield (TIPS)", category: "Rates", region: "USA", unit: "%" },
  { id: "T5YIE", label: "US 5Y breakeven inflation", category: "Rates", region: "USA", unit: "%" },
  { id: "DGASNYH", label: "Gasoline New York \u00b7 USD/gallon", category: "Commodities", region: "USA", unit: "$" },
  { id: "DPROPANEMBTX", label: "Propane \u00b7 USD/gallon", category: "Commodities", region: "USA", unit: "$" },
  { id: "BAMLC0A1CAAA", label: "US AAA corporate OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAMLC0A2CAA", label: "US AA corporate OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAMLC0A3CA", label: "US A corporate OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAMLC0A4CBBB", label: "US BBB corporate OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAMLH0A2HYB", label: "US B high yield OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAMLH0A3HYC", label: "US CCC and lower high yield OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "VXDCLS", label: "VXD \u00b7 Dow Jones volatility", category: "Volatility", region: "USA", unit: "" },
  { id: "VXEEMCLS", label: "VXEEM \u00b7 Emerging markets ETF volatility", category: "Volatility", region: "Emerging Markets", unit: "" },
  { id: "VXAPLCLS", label: "VXAPL \u00b7 Apple volatility", category: "Volatility", region: "USA", unit: "" },
  { id: "VXEWZCLS", label: "VXEWZ \u00b7 Brazil ETF volatility", category: "Volatility", region: "Emerging Markets", unit: "" },
  { id: "SP500", label: "S&P 500", category: "Equities", region: "USA", unit: "" },
  { id: "NASDAQCOM", label: "Nasdaq Composite", category: "Equities", region: "USA", unit: "" },
  { id: "NIKKEI225", label: "Nikkei 225", category: "Equities", region: "Japan", unit: "" },
  { id: "DGS1", label: "US 1Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DFII10", label: "US 10Y real yield (TIPS)", category: "Rates", region: "USA", unit: "%" },
  { id: "T10YIE", label: "US 10Y breakeven inflation", category: "Rates", region: "USA", unit: "%" },
  { id: "DJIA", label: "Dow Jones", category: "Equities", region: "USA", unit: "" },

  { id: "DGS3MO", label: "US 3M", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS2", label: "US 2Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS5", label: "US 5Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS10", label: "US 10Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DGS30", label: "US 30Y", category: "Rates", region: "USA", unit: "%" },
  { id: "DFF", label: "Fed Funds Effective", category: "Rates", region: "USA", unit: "%" },
  { id: "SOFR", label: "SOFR", category: "Rates", region: "USA", unit: "%" },
  { id: "T10Y2Y", label: "10Y−2Y Spread", category: "Rates", region: "USA", unit: "%" },

  { id: "VXNCLS", label: "VXN · Nasdaq-100 volatility", category: "Volatility", region: "USA", unit: "" },
  { id: "RVXCLS", label: "RVX · Russell 2000 volatility", category: "Volatility", region: "USA", unit: "" },
  { id: "OVXCLS", label: "OVX · Oil ETF volatility", category: "Volatility", region: "Global", unit: "" },
  { id: "GVZCLS", label: "GVZ · Gold ETF volatility", category: "Volatility", region: "Global", unit: "" },
  { id: "VXVCLS", label: "VXV · S&P 500 3M volatility", category: "Volatility", region: "USA", unit: "" },
  { id: "NASDAQ100", label: "Nasdaq-100", category: "Equities", region: "USA", unit: "" },
  { id: "DHOILNYH", label: "Heating oil · USD/gallon", category: "Commodities", region: "USA", unit: "$" },
  { id: "DJFUELUSGULF", label: "Jet fuel · USD/gallon", category: "Commodities", region: "USA", unit: "$" },
  { id: "BAMLH0A1HYBB", label: "US BB high yield OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "VIXCLS", label: "VIX", category: "Volatility", region: "USA", unit: "" },

  { id: "DCOILWTICO", label: "WTI", category: "Commodities", region: "Global", unit: "$" },
  { id: "DCOILBRENTEU", label: "Brent", category: "Commodities", region: "Global", unit: "$" },
  { id: "DHHNGSP", label: "US Natural Gas", category: "Commodities", region: "USA", unit: "$" },
  { id: "GOLDAMGBD228NLBM", label: "Gold", category: "Commodities", region: "Global", unit: "$" },

  { id: "BAMLC0A0CM", label: "US IG OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAMLH0A0HYM2", label: "US HY OAS", category: "Credit", region: "USA", unit: "%" },
  { id: "BAA10Y", label: "BAA−10Y Spread", category: "Credit", region: "USA", unit: "%" },
];

function startDate() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 390);
  return date.toISOString().slice(0, 10);
}

function parseCsv(csv: string) {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  return lines
    .slice(1)
    .map((line) => {
      const [date, raw] = line.split(",");
      return { date, value: raw?.trim() && raw.trim() !== "." ? Number(raw) : Number.NaN };
    })
    .filter((point) => point.date && Number.isFinite(point.value));
}

async function fetchSeries(config: SeriesConfig): Promise<MarketQuote | null> {
  const endpoint = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(config.id)}&cosd=${startDate()}`;
  const response = await fetch(endpoint, {
    headers: { Accept: "text/csv" },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(12000),
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
    history: points.slice(-390),
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
