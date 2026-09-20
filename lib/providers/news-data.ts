export type NewsCategory =
  | "markets"
  | "macro"
  | "central-banks"
  | "companies";

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publishedAt: string;
  sourceCountry: string;
  language: string;
  imageUrl: string | null;
  sourceQuality: "established" | "external";
};

export type NewsDataResponse = {
  category: NewsCategory;
  updatedAt: string;
  items: NewsItem[];
  provider: {
    id: "gdelt";
    label: string;
    status: "live" | "empty" | "error";
    message: string;
  };
};

const financeQuery =
  '("stock market" OR inflation OR "Federal Reserve" OR ECB OR earnings OR merger OR IPO OR bonds OR commodities OR currencies) sourcelang:english';

const categorySignals: Record<NewsCategory, string[]> = {
  markets: [
    "market",
    "stocks",
    "stock ",
    "equities",
    "bond",
    "yield",
    "credit",
    "commodity",
    "commodities",
    "oil",
    "currency",
    "currencies",
    "dollar",
    "euro",
    "yen",
    "vix",
    "volatility",
  ],
  macro: [
    "inflation",
    "jobs",
    "employment",
    "unemployment",
    "payroll",
    "gdp",
    "growth",
    "recession",
    "tariff",
    "consumer",
    "wage",
    "economic",
  ],
  "central-banks": [
    "federal reserve",
    " fed ",
    "ecb",
    "bank of england",
    "bank of japan",
    "central bank",
    "monetary policy",
    "rate decision",
    "interest rate",
  ],
  companies: [
    "earnings",
    "revenue",
    "profit",
    "merger",
    "acquisition",
    "acquire",
    "ipo",
    "deal",
    "takeover",
    "buyout",
  ],
};

const establishedDomains = [
  "reuters.com",
  "bloomberg.com",
  "ft.com",
  "wsj.com",
  "cnbc.com",
  "marketwatch.com",
  "barrons.com",
  "finance.yahoo.com",
  "apnews.com",
  "bbc.com",
];

function normalizeDomain(domain: string) {
  return domain.toLowerCase().replace(/^www\./, "");
}

function isEstablishedDomain(domain: string) {
  const normalized = normalizeDomain(domain);
  return establishedDomains.some(
    (trusted) => normalized === trusted || normalized.endsWith(`.${trusted}`),
  );
}

function normalizeGdeltDate(value: string | undefined) {
  if (!value) return "";

  const match = value.match(
    /^(\d{4})(\d{2})(\d{2})T?(\d{2})?(\d{2})?(\d{2})?Z?$/,
  );

  if (!match) return value;

  const [, year, month, day, hour = "00", minute = "00", second = "00"] =
    match;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

function titleMatchesCategory(title: string, category: NewsCategory) {
  const normalized = ` ${title.toLowerCase()} `;
  return categorySignals[category].some((signal) =>
    normalized.includes(signal),
  );
}

export function isNewsCategory(value: string | null): value is NewsCategory {
  return (
    value === "markets" ||
    value === "macro" ||
    value === "central-banks" ||
    value === "companies"
  );
}

async function requestGdelt(endpoint: string) {
  const request = (cacheMode: RequestCache | undefined) =>
    fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "FinanceStudio/1.0 educational-market-intelligence",
      },
      ...(cacheMode
        ? { cache: cacheMode }
        : { next: { revalidate: 1800 } }),
    });

  let response = await request(undefined);

  if (response.status === 429) {
    const retryAfterHeader = Number(response.headers.get("retry-after"));
    const retrySeconds = Number.isFinite(retryAfterHeader)
      ? Math.min(Math.max(retryAfterHeader, 1), 3)
      : 2;

    await new Promise((resolve) =>
      setTimeout(resolve, retrySeconds * 1000),
    );

    response = await request("no-store");
  }

  return response;
}

export async function getNewsData(
  category: NewsCategory,
): Promise<NewsDataResponse> {
  const params = new URLSearchParams({
    query: financeQuery,
    mode: "artlist",
    maxrecords: "50",
    timespan: "24h",
    sort: "datedesc",
    format: "json",
  });

  const endpoint = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;

  try {
    const response = await requestGdelt(endpoint);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "GDELT is temporarily rate-limited. FinanceStudio will not replace the unavailable feed with synthetic headlines.",
        );
      }
      throw new Error(`GDELT request failed: ${response.status}`);
    }

    const payload = (await response.json()) as {
      articles?: Array<{
        url?: string;
        title?: string;
        seendate?: string;
        socialimage?: string;
        domain?: string;
        language?: string;
        sourcecountry?: string;
      }>;
    };

    const unique = new Map<string, NewsItem>();

    for (const article of payload.articles ?? []) {
      const url = article.url?.trim();
      const title = article.title?.trim();
      if (!url || !title || unique.has(url)) continue;

      const domain =
        article.domain?.trim() ||
        (() => {
          try {
            return new URL(url).hostname;
          } catch {
            return "";
          }
        })();

      unique.set(url, {
        id: url,
        title,
        url,
        domain: normalizeDomain(domain),
        publishedAt: normalizeGdeltDate(article.seendate),
        sourceCountry: article.sourcecountry?.trim() ?? "",
        language: article.language?.trim() ?? "",
        imageUrl: article.socialimage?.trim() || null,
        sourceQuality: isEstablishedDomain(domain)
          ? "established"
          : "external",
      });
    }

    const allItems = [...unique.values()].sort((a, b) => {
      if (a.sourceQuality !== b.sourceQuality) {
        return a.sourceQuality === "established" ? -1 : 1;
      }

      return b.publishedAt.localeCompare(a.publishedAt);
    });

    const categoryItems = allItems.filter((item) =>
      titleMatchesCategory(item.title, category),
    );

    const items =
      category === "markets"
        ? [
            ...categoryItems,
            ...allItems.filter(
              (item) => !categoryItems.some((match) => match.id === item.id),
            ),
          ].slice(0, 50)
        : categoryItems.slice(0, 50);

    return {
      category,
      updatedAt: new Date().toISOString(),
      items,
      provider: {
        id: "gdelt",
        label: "GDELT DOC 2.0",
        status: items.length ? "live" : "empty",
        message: items.length
          ? `${items.length} recent external articles indexed from one shared cached finance query.`
          : "No matching article was returned for this category.",
      },
    };
  } catch (error) {
    return {
      category,
      updatedAt: new Date().toISOString(),
      items: [],
      provider: {
        id: "gdelt",
        label: "GDELT DOC 2.0",
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The news index could not be loaded.",
      },
    };
  }
}
