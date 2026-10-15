import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const MODEL = "openai/gpt-5.5";
type RequestBody = { role?: string; language?: "EN" | "FR"; marketSummary?: string; recentQuestions?: string[]; nonce?: string; };
type InterviewStep = { title: string; simple: string; why: string; example: string; next?: string; };
type InterviewPayload = { question: string; badge: string; steps: InterviewStep[]; whyItMatters: string; };
function clean(value: unknown, max = 3000) { return typeof value === "string" ? value.trim().slice(0,max) : ""; }
function parseJson(text:string):InterviewPayload|null {
  const candidate=text.trim().replace(/^```json\s*/i,"").replace(/```$/i,"").trim();
  try {
    const parsed=JSON.parse(candidate) as InterviewPayload;
    if(!parsed?.question||!Array.isArray(parsed.steps)||parsed.steps.length<3)return null;
    const steps=parsed.steps.slice(0,3).map(step=>({title:clean(step?.title,120),simple:clean(step?.simple,900),why:clean(step?.why,1300),example:clean(step?.example,1300),next:clean(step?.next,900)})).filter(step=>step.title&&step.simple&&step.why&&step.example);
    if(steps.length!==3)return null;
    return { question:clean(parsed.question,280), badge:clean(parsed.badge,40)||"Interview", whyItMatters:clean(parsed.whyItMatters,650), steps };
  } catch { return null; }
}

export async function POST(request:NextRequest){
  let body:RequestBody={}; try{body=await request.json() as RequestBody;}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
  const role=clean(body.role,160)||"Finance"; const language=body.language==="FR"?"FR":"EN"; const marketSummary=clean(body.marketSummary,3500);
  const recentQuestions=Array.isArray(body.recentQuestions)?body.recentQuestions.slice(-40).map(item=>clean(item,500)).filter(Boolean):[]; const nonce=clean(body.nonce,120);
  const prompt=`You create one rigorous FinanceStudio interview drill for a student preparing for ${role}.
Language: ${language}. Generation nonce: ${nonce||"none"}.

LATEST FINANCESTUDIO MARKET OBSERVATIONS (provider-latest and possibly delayed):
${marketSummary||"No live market context supplied. Use durable finance mechanics and do not invent current prices or releases."}

RECENT QUESTIONS TO AVOID:
${recentQuestions.length?recentQuestions.map((q,i)=>`${i+1}. ${q}`).join("\n"):"None."}

STRICT PRESENTATION RULES:
- The question itself must be concise: MAXIMUM 2 sentences and roughly 45 words. Never paste a long list of market prices into the question. If current market context is useful, choose at most 1–2 observations and make the rest part of the model-answer reasoning.
- The badge must match the target role ${role}; do not return an Investment Banking/M&A badge for a Sales & Trading drill, etc.
- Generate a fresh realistic question for ${role}; reasoning, not trivia.
- Give exactly 3 teaching steps. Each step must contain substantial simple, why, example and next fields.
- simple = direct interview-ready answer in plain language.
- why = mechanism and reasoning.
- example = concrete numerical or market implication when useful.
- next = what happens across relevant assets, valuation, credit, company fundamentals or decision-making. For cross-asset questions mention USD, equities, credit and gold only when genuinely relevant.
- Use 800 M$ and 1.0 B$, never $800m or $1.0bn.
- Spell out abbreviations on first appearance: WACC (Weighted Average Cost of Capital), EV (Enterprise Value), EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization), CPI (Consumer Price Index), DCF (Discounted Cash Flow), P/E (Price-to-Earnings ratio), P&L (Profit and Loss), FX (Foreign Exchange), bps (basis points / points de base).
- Keep formulas clean and define every symbol immediately after.
- Do not claim a live release happened unless supplied in context.
- Return ONLY valid JSON.

{"question":"...","badge":"short role badge","whyItMatters":"what is tested","steps":[{"title":"...","simple":"...","why":"...","example":"...","next":"..."},{"title":"...","simple":"...","why":"...","example":"...","next":"..."},{"title":"...","simple":"...","why":"...","example":"...","next":"..."}]}`;
  try { const result=await generateText({model:MODEL,prompt}); const parsed=parseJson(result.text); if(!parsed)return NextResponse.json({error:"Could not parse generated interview drill."},{status:502}); return NextResponse.json(parsed,{headers:{"Cache-Control":"no-store, max-age=0"}}); }
  catch{return NextResponse.json({error:"Interview generation unavailable."},{status:503});}
}
