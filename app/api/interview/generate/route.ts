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

type InterviewStep = { title: string; answer: string };
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
    return {
      question: clean(parsed.question, 700),
      badge: clean(parsed.badge, 40) || "Interview",
      whyItMatters: clean(parsed.whyItMatters, 900),
      steps: parsed.steps.slice(0, 3).map((step) => ({
        title: clean(step?.title, 180),
        answer: clean(step?.answer, 2200),
      })).filter((step) => step.title && step.answer),
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
- Generate a fresh question. Do not reuse or lightly paraphrase any recent question above.
- Make it realistic for the target role and useful today. If market data is supplied, anchor the scenario to those observed levels/directions without inventing missing current news.
- The question should require reasoning, not trivia.
- Give exactly 3 teaching steps.
- Each answer must be detailed enough to teach: roughly 90-160 words, with mechanism, at least one concrete numerical or market example when useful, the consequence for valuation/markets/decision-making, and one caveat or follow-up point.
- Keep language clear enough for a student, but interview-ready.
- Do not claim a live economic release happened unless it appears in the supplied context.
- Return ONLY valid JSON, no markdown.

JSON schema:
{
  "question": "...",
  "badge": "short role badge",
  "whyItMatters": "one concise paragraph explaining what the interviewer is testing",
  "steps": [
    {"title":"...","answer":"..."},
    {"title":"...","answer":"..."},
    {"title":"...","answer":"..."}
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
