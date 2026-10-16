import {unstable_cache} from "next/cache";
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
  history?: {date:string;value:number}[];
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

async function loadEcbQuotes(): Promise<{quotes:MarketQuote[];status:ProviderStatus}> {
  const sourceUrl = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml";
  try {
    const response = await fetch(sourceUrl, {cache:"no-store",signal:AbortSignal.timeout(20000)});
    if (!response.ok) throw new Error(`ECB reference feed: HTTP ${response.status}`);
    const xml = await response.text();
    const days = [...xml.matchAll(/<Cube\s+time=['"](\d{4}-\d{2}-\d{2})['"]>([\s\S]*?)<\/Cube>/g)].map(match=>({date:match[1],rates:Object.fromEntries([...match[2].matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([0-9.]+)['"]/g)].map(m=>[m[1],Number(m[2])]))})).filter(day=>day.date>=new Date(Date.now()-390*86400000).toISOString().slice(0,10)).sort((a,b)=>a.date.localeCompare(b.date));
    const currencies: Array<[string,MarketRegion]> = [["USD","Europe"],["GBP","UK"],["JPY","Japan"],["CHF","Europe"],["CAD","Global"],["AUD","Global"],["CNY","China"],["HKD","Asia"],["SGD","Asia"],["INR","Emerging Markets"],["KRW","Asia"],["BRL","Emerging Markets"],["MXN","Emerging Markets"],["ZAR","Emerging Markets"],["SEK","Europe"],["NOK","Europe"],["PLN","Europe"],["NZD","Global"]];
    const quotes:MarketQuote[]=[];
    const add=(base:string,quote:string,region:MarketRegion)=>{
      const points=days.flatMap(day=>{const a=base==="EUR"?1:day.rates[base];const b=quote==="EUR"?1:day.rates[quote];return a>0&&b>0?[{date:day.date,value:b/a}]:[];});
      const row=quoteFromPoints(`${base}-${quote}`.toLowerCase(),`${base}/${quote}`,"FX",region,points,"","European Central Bank",sourceUrl);
      if(row)quotes.push({...row,history:points.slice(-390)});
    };
    for(const [currency,region] of currencies)add("EUR",currency,region);
    add("GBP","USD","UK");add("USD","JPY","Japan");add("USD","CNY","China");add("USD","CAD","Global");add("AUD","USD","Global");
    return {quotes,status:{id:"ecb",label:"European Central Bank",status:quotes.length?"live":"error",message:`${quotes.length} daily reference currency pairs. Informational rates, not executable prices.`}};
  } catch(error) {
    return {quotes:[],status:{id:"ecb",label:"European Central Bank",status:"error",message:error instanceof Error?error.message:"ECB reference data unavailable."}};
  }
}

// Cache only the bounded, parsed result; the full ECB XML exceeds Next’s 2 MB fetch cache.
const getEcbQuotes=unstable_cache(loadEcbQuotes,["ecb-trailing-year-v1"],{revalidate:300});

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
    limit: "390",
  });

  const endpoint = `https://api.stlouisfed.org/fred/series/observations?${params.toString()}`;
  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(12000),
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
      value: typeof observation.value === "string" && observation.value.trim() ? Number(observation.value) : NaN,
    }))
    .filter((point) => point.date && Number.isFinite(point.value))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-390);

  const quote = quoteFromPoints(
    config.id.toLowerCase(),
    config.label,
    config.category,
    config.region,
    points,
    config.unit,
    "Federal Reserve Bank of St. Louis (FRED)",
    `https://fred.stlouisfed.org/series/${config.id}`,
  );
  return quote ? {...quote,history:points} : null;
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
