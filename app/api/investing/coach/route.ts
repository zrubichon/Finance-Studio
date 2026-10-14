import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MODEL = "openai/gpt-5.5";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\u0000/g, "").trim().slice(0, max) : "";
}

function extractJson(text: string) {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("No JSON returned");
  return JSON.parse(cleaned.slice(start, end + 1)) as unknown;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const language = body.language === "FR" ? "FR" : "EN";
  const level = ["Beginner", "Intermediate", "Professional"].includes(String(body.level)) ? String(body.level) : "Beginner";
  const symbol = clean(body.symbol, 40);
  const assetClass = clean(body.assetClass, 40);
  const thesis = clean(body.thesis, 2400);
  const assumption = clean(body.assumption, 1600);
  const catalyst = clean(body.catalyst, 1200);
  const horizon = clean(body.horizon, 800);
  const invalidation = clean(body.invalidation, 1200);
  const downside = clean(body.downside, 1200);
  const risk = clean(body.risk, 1200);
  const quote = body.quote && typeof body.quote === "object" ? body.quote as Record<string, unknown> : null;

  if (!symbol && !thesis && !assumption && !catalyst) {
    return NextResponse.json({ error: "Add a symbol or investment idea first." }, { status: 400 });
  }

  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {}

  const quoteText = quote ? [
    `Verified quote symbol: ${clean(quote.symbol, 40)}`,
    `Price: ${String(quote.price ?? "unknown")}`,
    `Previous close: ${String(quote.previousClose ?? "unknown")}`,
    `Currency: ${clean(quote.currency, 20) || "unknown"}`,
    `As of: ${clean(quote.asOf, 120) || "unknown"}`,
    `Source: ${clean(quote.source, 180) || "unknown"}`,
    `Delayed: ${String(Boolean(quote.delayed))}`,
  ].join("\n") : "No verified quote supplied. Do not invent a price.";

  const system = `You are FinanceStudio Live Investing Mentor. You coach a learner inside a PAPER-TRADING simulation only.
Return ONLY valid JSON, no markdown.
Never give a personalized buy/sell command. Never invent prices, rates, earnings, company facts or news. You may analyze only verified market observations supplied in the prompt and the learner's own assumptions.
Your job is to teach immediately while the learner fills a decision sheet: challenge weak logic, identify missing evidence, explain financial mechanisms, separate fact from assumption, explain risk, and propose the next research question.
Teaching level: ${level}. Language: ${language}.
If the level is Beginner, define jargon and use plain language. Intermediate should add finance mechanics. Professional should challenge assumptions like an analyst or PM.
If a price is supplied, explicitly explain what that price does and does NOT tell us, and note whether it is delayed.

JSON schema:
{
  "headline": "string",
  "whatYouKnow": "string",
  "whatIsAssumption": "string",
  "whatIsMissing": ["string", "string", "string"],
  "marketRead": "string",
  "riskCheck": "string",
  "nextQuestion": "string",
  "qualityScore": 0,
  "plainEnglish": "string"
}
qualityScore is 0-100 and measures decision-process completeness, not expected investment return.`;

  const prompt = `ASSET\nSymbol: ${symbol || "not entered"}\nAsset class: ${assetClass || "not entered"}\n\nVERIFIED MARKET OBSERVATION\n${quoteText}\n\nLEARNER DECISION SHEET\nThesis: ${thesis || "empty"}\nValuation/macro assumption: ${assumption || "empty"}\nCatalyst: ${catalyst || "empty"}\nTime horizon: ${horizon || "empty"}\nInvalidation condition: ${invalidation || "empty"}\nDownside case: ${downside || "empty"}\nPortfolio risk note: ${risk || "empty"}\n\nCoach this decision process now.`;

  try {
    const result = await generateText({
      model: MODEL,
      system,
      prompt,
      maxOutputTokens: 1400,
      reasoning: "low",
      providerOptions: { gateway: userId ? { user: userId, tags: ["feature:investing-coach"] } : { tags: ["feature:investing-coach", "user:guest"] } },
    });
    return NextResponse.json({ coaching: extractJson(result.text), model: MODEL });
  } catch (error) {
    console.error("Investing coach failed", error);
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    const billing = message.includes("credit card") || message.includes("add a card") || message.includes("free credits");
    return NextResponse.json({ error: billing ? "AI Gateway needs an active payment method before live coaching can run." : "Live investing coach is temporarily unavailable." }, { status: 503 });
  }
}
