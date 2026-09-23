type Topic =
  | "markets"
  | "macro"
  | "central-banks"
  | "companies"
  | "geopolitics"
  | "policy";

type SourceStatus = {
  source: string;
  ok: boolean;
  fetched: number;
  error?: string;
};

type FeedConfig = {
  id: string;
  label: string;
  url: string;
  domain: string;
  sourceCountry: string;
  defaultTopics: Topic[];
};

const financeQuery =
  '(inflation OR stocks OR bonds OR earnings OR "Federal Reserve" OR ECB OR tariffs OR sanctions OR oil OR OPEC OR war OR conflict OR shipping OR currencies OR merger OR regulation OR budget OR "central bank") sourcelang:english';

const officialFeeds: FeedConfig[] = [
  {
    id: "federal-reserve",
    label: "Federal Reserve Board",
    url: "https://www.federalreserve.gov/feeds/press_all.xml",
    domain: "federalreserve.gov",
    sourceCountry: "UnitedStates",
    defaultTopics: ["central-banks", "policy", "macro", "markets"],
  },
  {
    id: "ecb",
    label: "European Central Bank",
    url: "https://www.ecb.europa.eu/rss/press.html",
    domain: "ecb.europa.eu",
    sourceCountry: "EuropeanUnion",
    defaultTopics: ["central-banks", "policy", "macro", "markets"],
  },
  {
    id: "sec",
    label: "U.S. Securities and Exchange Commission",
    url: "https://www.sec.gov/news/pressreleases.rss",
    domain: "sec.gov",
    sourceCountry: "UnitedStates",
    defaultTopics: ["policy", "companies", "markets"],
  },
  {
    id: "eu-council",
    label: "European Council / Council of the EU",
    url: "https://www.consilium.europa.eu/en/rss/pressreleases.ashx",
    domain: "consilium.europa.eu",
    sourceCountry: "EuropeanUnion",
    defaultTopics: ["geopolitics", "policy", "macro"],
  },
  {
    id: "bank-of-england",
    label: "Bank of England",
    url: "https://www.bankofengland.co.uk/rss/news",
    domain: "bankofengland.co.uk",
    sourceCountry: "UnitedKingdom",
    defaultTopics: ["central-banks", "policy", "macro", "markets"],
  },
];

const categorySignals: Record<Topic, string[]> = {
  markets: [
    "market","stocks","stock ","equities","bond","yield","credit","commodity",
    "commodities","oil","currency","currencies","dollar","euro","yen","vix",
    "volatility","treasury",
  ],
  macro: [
    "inflation","jobs","employment","unemployment","payroll","gdp","growth",
    "recession","consumer","wage","economic","retail sales","pmi","manufacturing",
  ],
  "central-banks": [
    "federal reserve"," fed ","ecb","bank of england","bank of japan",
    "central bank","monetary policy","rate decision","interest rate",
    "rate cut","rate hike",
  ],
  companies: [
    "earnings","revenue","profit","margin","guidance","sales","valuation",
    "stock","shares","share price","merger","acquisition","acquire","ipo",
    "deal","takeover","buyout",
  ],
  geopolitics: [
    "sanction","war","conflict","ceasefire","missile","attack","invasion",
    "embargo","strait","shipping","red sea","taiwan","nato","trade war",
    "export control","geopolit",
  ],
  policy: [
    "tariff","regulation","regulator","antitrust","budget","government shutdown",
    "debt ceiling","fiscal policy","tax","legislation","law","bill","vote",
    "election","sec ","doj",
  ],
};

const establishedDomains = [
  "reuters.com","bloomberg.com","ft.com","wsj.com","cnbc.com",
  "marketwatch.com","barrons.com","finance.yahoo.com","apnews.com","bbc.com",
];

function envKey(mapName: string, legacyName: string) {
  const raw = Deno.env.get(mapName);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Record<string, string>;
      if (parsed.default) return parsed.default;
    } catch {
      // Fall through.
    }
  }
  return Deno.env.get(legacyName) ?? "";
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SECRET_KEY = envKey("SUPABASE_SECRET_KEYS", "SUPABASE_SERVICE_ROLE_KEY");

function response(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function normalizeDomain(domain: string) {
  return domain.toLowerCase().replace(/^www\./, "");
}

function isEstablishedDomain(domain: string) {
  const normalized = normalizeDomain(domain);
  return establishedDomains.some(
    (trusted) => normalized === trusted || normalized.endsWith("." + trusted),
  );
}

function normalizeGdeltDate(value: string | undefined) {
  if (!value) return "";
  const match = value.match(
    /^(\d{4})(\d{2})(\d{2})T?(\d{2})?(\d{2})?(\d{2})?Z?$/,
  );
  if (!match) return value;
  const [, year, month, day, hour = "00", minute = "00", second = "00"] = match;
  return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "Z";
}

function normalizeDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
}

function topicsForTitle(title: string) {
  const normalized = " " + title.toLowerCase() + " ";
  return (Object.keys(categorySignals) as Topic[]).filter((topic) =>
    categorySignals[topic].some((signal) => normalized.includes(signal)),
  );
}

function mergeTopics(primary: Topic[], detected: Topic[]) {
  return Array.from(new Set([...primary, ...detected]));
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCodePoint(Number.parseInt(dec, 10)),
    )
    .trim();
}

function stripTags(value: string) {
  const decoded = decodeXml(value);
  return decodeXml(decoded.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
}

function tagValue(block: string, names: string[]) {
  for (const name of names) {
    const match = block.match(
      new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + name + ">", "i"),
    );
    if (match?.[1]) return stripTags(match[1]);
  }
  return "";
}

function linkValue(block: string) {
  const direct = tagValue(block, ["link"]);
  if (direct && /^https?:\/\//i.test(direct)) return direct;

  const atom = block.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/i);
  if (atom?.[1]) return decodeXml(atom[1]);

  const guid = tagValue(block, ["guid", "id"]);
  if (/^https?:\/\//i.test(guid)) return guid;

  return "";
}

function feedBlocks(xml: string) {
  const itemMatches = Array.from(xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi));
  if (itemMatches.length) return itemMatches.map((match) => match[1]);

  return Array.from(xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gi)).map(
    (match) => match[1],
  );
}

async function adminFetch(path: string, init: RequestInit = {}) {
  return fetch(SUPABASE_URL + path, {
    ...init,
    headers: {
      apikey: SECRET_KEY,
      Authorization: "Bearer " + SECRET_KEY,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function verifyCronSecret(value: string) {
  if (!value) return false;
  const result = await adminFetch("/rest/v1/rpc/verify_news_ingest_secret", {
    method: "POST",
    body: JSON.stringify({ p_secret: value }),
  });
  if (!result.ok) return false;
  return (await result.json()) === true;
}

async function logRun(
  status: "success" | "error",
  fetchedCount: number,
  archivedCount: number,
  errorMessage?: string,
) {
  await adminFetch("/rest/v1/news_ingestion_runs", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      status,
      fetched_count: fetchedCount,
      archived_count: archivedCount,
      error_message: errorMessage ?? null,
    }),
  }).catch(() => null);
}

async function requestGdelt() {
  const params = new URLSearchParams({
    query: financeQuery,
    mode: "artlist",
    maxrecords: "60",
    timespan: "12h",
    sort: "datedesc",
    format: "json",
  });

  return fetch(
    "https://api.gdeltproject.org/api/v2/doc/doc?" + params.toString(),
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "FinanceStudio/1.0 educational-market-intelligence",
      },
    },
  );
}

async function collectGdelt(
  rows: Map<string, Record<string, unknown>>,
  now: string,
): Promise<SourceStatus> {
  try {
    const source = await requestGdelt();
    if (!source.ok) {
      return {
        source: "gdelt",
        ok: false,
        fetched: 0,
        error: "HTTP " + source.status,
      };
    }

    const contentType = source.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) {
      const detail = (await source.text()).slice(0, 160);
      return {
        source: "gdelt",
        ok: false,
        fetched: 0,
        error: "Non-JSON response: " + detail,
      };
    }

    const payload = (await source.json()) as {
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

    const articles = payload.articles ?? [];

    for (const article of articles) {
      const url = article.url?.trim();
      const title = article.title?.trim();
      const sourceSeenAt = normalizeGdeltDate(article.seendate);

      if (!url || !title || !sourceSeenAt) continue;
      if (!Number.isFinite(new Date(sourceSeenAt).getTime())) continue;

      const topics = topicsForTitle(title);
      if (!topics.length) continue;

      const domain =
        article.domain?.trim() ||
        (() => {
          try {
            return new URL(url).hostname;
          } catch {
            return "";
          }
        })();

      rows.set(url, {
        url,
        title,
        domain: normalizeDomain(domain),
        source_country: article.sourcecountry?.trim() ?? "",
        source_language: article.language?.trim() ?? "",
        image_url: article.socialimage?.trim() || null,
        source_quality: isEstablishedDomain(domain) ? "established" : "external",
        topics,
        provider: "gdelt",
        source_seen_at: sourceSeenAt,
        last_seen_at: now,
        updated_at: now,
      });
    }

    return { source: "gdelt", ok: true, fetched: articles.length };
  } catch (error) {
    return {
      source: "gdelt",
      ok: false,
      fetched: 0,
      error: error instanceof Error ? error.message : "Unknown GDELT error",
    };
  }
}

async function collectOfficialFeed(
  config: FeedConfig,
  rows: Map<string, Record<string, unknown>>,
  now: string,
): Promise<SourceStatus> {
  try {
    const result = await fetch(config.url, {
      headers: {
        Accept: "application/rss+xml, application/atom+xml, text/xml, application/xml",
        "User-Agent": "FinanceStudio/1.0 financial-news-reader",
      },
    });

    if (!result.ok) {
      return {
        source: config.id,
        ok: false,
        fetched: 0,
        error: "HTTP " + result.status,
      };
    }

    const xml = await result.text();
    const blocks = feedBlocks(xml);
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let accepted = 0;

    for (const block of blocks) {
      const title = tagValue(block, ["title"]);
      const url = linkValue(block);
      const publishedAt = normalizeDate(
        tagValue(block, ["pubDate", "published", "updated", "a10:updated", "dc:date", "date"]),
      );

      if (!title || !url || !publishedAt) continue;
      if (new Date(publishedAt).getTime() < cutoff) continue;

      const topics = mergeTopics(config.defaultTopics, topicsForTitle(title));

      rows.set(url, {
        url,
        title,
        domain: config.domain,
        source_country: config.sourceCountry,
        source_language: "English",
        image_url: null,
        source_quality: "primary",
        topics,
        provider: "official-rss:" + config.id,
        source_seen_at: publishedAt,
        last_seen_at: now,
        updated_at: now,
      });
      accepted += 1;
    }

    return {
      source: config.id,
      ok: true,
      fetched: accepted,
    };
  } catch (error) {
    return {
      source: config.id,
      ok: false,
      fetched: 0,
      error: error instanceof Error ? error.message : "Unknown RSS error",
    };
  }
}

Deno.serve(async (req: Request) => {
  if (!SUPABASE_URL || !SECRET_KEY) {
    return response(503, {
      error: "News ingestion service is not configured.",
      code: "SERVER_CONFIGURATION_ERROR",
    });
  }

  const cronSecret = req.headers.get("x-financestudio-cron-secret") ?? "";
  if (!(await verifyCronSecret(cronSecret))) {
    return response(401, {
      error: "Unauthorized ingestion request.",
      code: "INGEST_AUTH_REQUIRED",
    });
  }

  const now = new Date().toISOString();
  const rows = new Map<string, Record<string, unknown>>();

  const statuses = await Promise.all([
    collectGdelt(rows, now),
    ...officialFeeds.map((feed) => collectOfficialFeed(feed, rows, now)),
  ]);

  const fetchedCount = statuses.reduce((sum, item) => sum + item.fetched, 0);
  const archivedRows = Array.from(rows.values());
  const successfulSources = statuses.filter((item) => item.ok).length;
  const warnings = statuses
    .filter((item) => !item.ok)
    .map((item) => item.source + ": " + (item.error ?? "unknown error"));

  try {
    if (archivedRows.length) {
      const archive = await adminFetch(
        "/rest/v1/news_archive?on_conflict=url",
        {
          method: "POST",
          headers: {
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify(archivedRows),
        },
      );

      if (!archive.ok) {
        const detail = await archive.text();
        throw new Error(
          "Archive upsert failed: " + archive.status + " " + detail.slice(0, 300),
        );
      }
    }

    if (successfulSources === 0) {
      const message = warnings.join(" | ") || "All news sources failed.";
      await logRun("error", fetchedCount, 0, message);
      return response(503, {
        ok: false,
        error: message,
        fetchedCount,
        archivedCount: 0,
        sources: statuses,
      });
    }

    await logRun(
      "success",
      fetchedCount,
      archivedRows.length,
      warnings.length ? "Partial source warnings: " + warnings.join(" | ") : undefined,
    );

    return response(200, {
      ok: true,
      fetchedCount,
      archivedCount: archivedRows.length,
      successfulSources,
      totalSources: statuses.length,
      sources: statuses,
      completedAt: now,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown news ingestion error.";
    await logRun("error", fetchedCount, 0, message);

    return response(500, {
      ok: false,
      error: message,
      fetchedCount,
      archivedCount: 0,
      sources: statuses,
    });
  }
});
