type Topic =
  | "markets"
  | "macro"
  | "central-banks"
  | "companies"
  | "geopolitics"
  | "policy";

const financeQuery =
  '("stock market" OR inflation OR "Federal Reserve" OR ECB OR "Bank of England" OR "Bank of Japan" OR earnings OR merger OR IPO OR bonds OR commodities OR currencies OR tariff OR sanctions OR "trade war" OR "export controls" OR oil OR OPEC OR ceasefire OR conflict OR war OR shipping OR "government shutdown" OR budget OR "debt ceiling" OR regulation OR antitrust OR "fiscal policy") sourcelang:english';

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

function topicsForTitle(title: string) {
  const normalized = " " + title.toLowerCase() + " ";
  return (Object.keys(categorySignals) as Topic[]).filter((topic) =>
    categorySignals[topic].some((signal) => normalized.includes(signal)),
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
    maxrecords: "100",
    timespan: "72h",
    sort: "datedesc",
    format: "json",
  });

  const endpoint =
    "https://api.gdeltproject.org/api/v2/doc/doc?" + params.toString();

  const request = () =>
    fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "FinanceStudio/1.0 educational-market-intelligence",
      },
    });

  let result = await request();

  if (result.status === 429) {
    const retryAfter = Number(result.headers.get("retry-after"));
    const delaySeconds = Number.isFinite(retryAfter)
      ? Math.min(Math.max(retryAfter, 1), 4)
      : 2;
    await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));
    result = await request();
  }

  return result;
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

  let fetchedCount = 0;

  try {
    const source = await requestGdelt();

    if (!source.ok) {
      throw new Error("GDELT request failed: " + source.status);
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

    fetchedCount = payload.articles?.length ?? 0;
    const now = new Date().toISOString();
    const unique = new Map<string, Record<string, unknown>>();

    for (const article of payload.articles ?? []) {
      const url = article.url?.trim();
      const title = article.title?.trim();
      const sourceSeenAt = normalizeGdeltDate(article.seendate);

      if (!url || !title || !sourceSeenAt) continue;

      const seenTime = new Date(sourceSeenAt).getTime();
      if (!Number.isFinite(seenTime)) continue;

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

      unique.set(url, {
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

    const rows = Array.from(unique.values());

    if (rows.length) {
      const archive = await adminFetch(
        "/rest/v1/news_archive?on_conflict=url",
        {
          method: "POST",
          headers: {
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify(rows),
        },
      );

      if (!archive.ok) {
        const detail = await archive.text();
        throw new Error(
          "Archive upsert failed: " + archive.status + " " + detail.slice(0, 300),
        );
      }
    }

    await logRun("success", fetchedCount, rows.length);

    return response(200, {
      ok: true,
      fetchedCount,
      archivedCount: rows.length,
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
    });
  }
});
