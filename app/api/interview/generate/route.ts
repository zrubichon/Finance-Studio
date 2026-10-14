import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const MODEL = "openai/gpt-5.5";

type RequestBody = {
  role?: string;
  language?: "EN" | "FR";
  marketSummary?: string;
  recentQuestions?: string[];
  nonce?: string;
};

type InterviewStep = {
  title: string;
  simple: string;
  why: string;
  example: string;
  next?: string;
};

type InterviewPayload = {
  question: string;
  badge: string;
  steps: InterviewStep[];
  whyItMatters: string;
};

function clean(value: unknown, max = 3000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseJson(text: string): InterviewPayload | null {
  const candidate = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  try {
    const parsed = JSON.parse(candidate) as InterviewPayload;
    if (!parsed?.question || !Array.isArray(parsed.steps) || parsed.steps.length < 3) return null;
    const steps = parsed.steps.slice(0, 3).map((step) => ({
      title: clean(step?.title, 180),
      simple: clean(step?.simple, 900),
      why: clean(step?.why, 1300),
      example: clean(step?.example, 1300),
      next: clean(step?.next, 900),
    })).filter((step) => step.title && step.simple && step.why && step.example);
    if (steps.length !== 3) return null;
    return {
      question: clean(parsed.question, 700),
      badge: clean(parsed.badge, 40) || "Interview",
      whyItMatters: clean(parsed.whyItMatters, 900),
      steps,
    };
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: RequestBody = {};
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const role = clean(body.role, 160) || "Finance";
  const language = body.language === "FR" ? "FR" : "EN";
  const marketSummary = clean(body.marketSummary, 3500);
  const recentQuestions = Array.isArray(body.recentQuestions)
    ? body.recentQuestions.slice(-40).map((item) => clean(item, 500)).filter(Boolean)
    : [];
  const nonce = clean(body.nonce, 120);

  const prompt = `You create one rigorous FinanceStudio interview drill for a student preparing for ${role}.
Language: ${language}.
Generation nonce: ${nonce || "none"}.

LATEST FINANCESTUDIO MARKET OBSERVATIONS (may be delayed/provider-latest, not necessarily intraday):
${marketSummary || "No live market context supplied. Use durable finance mechanics and do not invent current prices or releases."}

RECENT QUESTIONS TO AVOID REPEATING:
${recentQuestions.length ? recentQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n") : "None."}

Requirements:
- Generate a fresh, realistic interview question for the target role. Do not reuse or lightly paraphrase a recent question.
- The question must require reasoning, not trivia.
- Give exactly 3 teaching steps.
- Every step must contain four teaching fields: simple, why, example and next.
- simple = the direct interview-ready answer in plain language.
- why = the mechanism and reasoning behind it.
- example = a concrete numerical or market implication whenever useful.
- next = what happens next across relevant assets, valuation, credit, company fundamentals or decision-making. For cross-asset questions explicitly mention USD, equities, credit and gold when relevant.
- Do not leave a card with only a title. The model answer must substantially fill the card.
- Use clear finance notation: 800 M$ for 800 million dollars and 1.0 B$ for 1.0 billion dollars. Never write $800m, 800m or $1.0bn.
- Spell out abbreviations on first appearance in the generated answer: WACC (Weighted Average Cost of Capital), EV (Enterprise Value), EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization), CPI (Consumer Price Index), DCF (Discounted Cash Flow), P/E (Price-to-Earnings ratio), P&L (Profit and Loss), FX (Foreign Exchange), bps (basis points / points de base).
- When a formula is useful, keep the formula clean and explain every symbol in prose immediately after it.
- Keep language clear enough for a student but fully interview-ready.
- Do not claim a live economic release happened unless it appears in the supplied context.
- Return ONLY valid JSON, no markdown.

JSON schema:
{
  "question": "...",
  "badge": "short role badge",
  "whyItMatters": "one concise paragraph explaining what the interviewer is testing",
  "steps": [
    {"title":"...","simple":"...","why":"...","example":"...","next":"..."},
    {"title":"...","simple":"...","why":"...","example":"...","next":"..."},
    {"title":"...","simple":"...","why":"...","example":"...","next":"..."}
  ]
}`;

  try {
    const result = await generateText({ model: MODEL, prompt });
    const parsed = parseJson(result.text);
    if (!parsed || parsed.steps.length !== 3) {
      return NextResponse.json({ error: "Could not parse generated interview drill." }, { status: 502 });
    }
    return NextResponse.json(parsed, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json({ error: "Interview generation unavailable." }, { status: 503 });
  }
}
