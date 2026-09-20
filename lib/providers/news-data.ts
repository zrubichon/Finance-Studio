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

const queries: Record<NewsCategory, string> = {
  markets:
    '("stock market" OR equities OR bonds OR "credit spreads" OR commodities OR currencies) sourcelang:english',
  macro:
    '(inflation OR "jobs report" OR GDP OR growth OR recession OR tariffs) sourcelang:english',
  "central-banks":
    '("Federal Reserve" OR ECB OR "Bank of England" OR "Bank of Japan" OR "central bank") sourcelang:english',
  companies:
    '(earnings OR merger OR acquisition OR IPO OR "capital markets") sourcelang:english',
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

export function isNewsCategory(value: string | null): value is NewsCategory {
  return (
    value === "markets" ||
    value === "macro" ||
    value === "central-banks" ||
    value === "companies"
  );
}

export async function getNewsData(
  category: NewsCategory,
): Promise<NewsDataResponse> {
  const params = new URLSearchParams({
    query: queries[category],
    mode: "artlist",
    maxrecords: "40",
    timespan: "24h",
    sort: "datedesc",
    format: "json",
  });

  const endpoint = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "FinanceStudio/1.0 educational-market-intelligence",
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
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

    const items = [...unique.values()]
      .sort((a, b) => {
        if (a.sourceQuality !== b.sourceQuality) {
          return a.sourceQuality === "established" ? -1 : 1;
        }

        return b.publishedAt.localeCompare(a.publishedAt);
      })
      .slice(0, 24);

    return {
      category,
      updatedAt: new Date().toISOString(),
      items,
      provider: {
        id: "gdelt",
        label: "GDELT DOC 2.0",
        status: items.length ? "live" : "empty",
        message: items.length
          ? `${items.length} recent external articles indexed.`
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
