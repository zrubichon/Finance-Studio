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
  if (start < 0 || end <= start) throw new Error("No JSON object returned");
  return JSON.parse(cleaned.slice(start, end + 1)) as unknown;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as {
    selection?: unknown;
    context?: unknown;
    pagePath?: unknown;
  } | null;

  const selection = clean(body?.selection, 500);
  const context = clean(body?.context, 3500);
  const pagePath = clean(body?.pagePath, 300);

  if (!selection) {
    return NextResponse.json({ error: "Select a word, phrase or concept first." }, { status: 400 });
  }

  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {}

  const system = `You are FinanceStudio Concept Lens, a rigorous bilingual finance explainer.
Return ONLY valid JSON. No markdown fences.
You explain selected finance words, phrases, concepts, chart labels, rates, accounting items, macro terms and market language in plain language without losing technical accuracy.
Never invent live prices, company results or current facts. If context is ambiguous, say so inside the explanation and explain the most likely finance meaning.
Every visual must be self-explanatory: define axes/labels, explain why values or rates differ, what direction means, what changes first, and how to read it in plain English/French.
Do not give personalized investment advice.

JSON schema:
{
  "termEn": "string",
  "termFr": "string",
  "categoryEn": "string",
  "categoryFr": "string",
  "oneLineEn": "string",
  "oneLineFr": "string",
  "plainEn": "string",
  "plainFr": "string",
  "whyItMattersEn": "string",
  "whyItMattersFr": "string",
  "implicationsEn": ["string", "string", "string"],
  "implicationsFr": ["string", "string", "string"],
  "exampleEn": "string",
  "exampleFr": "string",
  "formula": "string or empty string",
  "formulaExplainEn": "string",
  "formulaExplainFr": "string",
  "visual": {
    "titleEn": "string",
    "titleFr": "string",
    "stepsEn": ["string", "string", "string"],
    "stepsFr": ["string", "string", "string"],
    "howToReadEn": "string",
    "howToReadFr": "string"
  },
  "relatedEn": ["string", "string", "string"],
  "relatedFr": ["string", "string", "string"],
  "commonMistakeEn": "string",
  "commonMistakeFr": "string"
}
Keep each paragraph concise but substantive. Use 3-5 visual steps only when a causal flow is useful; otherwise make the visual a simple comparison/readout. Explain technical terms within the text.`;

  const prompt = `SELECTED TEXT: ${selection}\nPAGE: ${pagePath || "unknown"}\nSURROUNDING CONTEXT:\n${context || "No surrounding context supplied."}\n\nBuild the bilingual concept card now.`;

  try {
    const result = await generateText({
      model: MODEL,
      system,
      prompt,
      maxOutputTokens: 2200,
      reasoning: "low",
      providerOptions: {
        gateway: userId
          ? { user: userId, tags: ["feature:concept-lens"] }
          : { tags: ["feature:concept-lens", "user:guest"] },
      },
    });

    const card = extractJson(result.text);
    return NextResponse.json({ card, model: MODEL });
  } catch (error) {
    console.error("Concept Lens generation failed", error);
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    const billingRequired = message.includes("valid credit card") || message.includes("add a card") || message.includes("unlock your free credits");

    return NextResponse.json({
      error: billingRequired
        ? "AI Gateway needs an active payment method before Concept Lens can generate cards."
        : "Concept Lens is temporarily unavailable. Please try again.",
      code: billingRequired ? "AI_GATEWAY_BILLING_REQUIRED" : "AI_UNAVAILABLE",
    }, { status: 503 });
  }
}
