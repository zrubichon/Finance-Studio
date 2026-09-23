import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { interviewQuestionKey, interviewQuestions, isInterviewTrack } from "@/lib/interview-content";
import { createClient } from "@/lib/supabase/server";

const MODEL = "openai/gpt-5.5";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\u0000/g, "").trim().slice(0, max) : "";
}

function scoreFrom(text: string) {
  const match = text.match(/SCORE\s*:\s*(\d{1,3})\s*\/\s*100/i);
  const score = match ? Number(match[1]) : NaN;
  return Number.isFinite(score) && score >= 0 && score <= 100 ? score : null;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as {
    track?: unknown;
    answer?: unknown;
    language?: unknown;
  } | null;

  if (!body || !isInterviewTrack(body.track)) {
    return NextResponse.json({ error: "Invalid interview request." }, { status: 400 });
  }

  const track = body.track;
  const answer = clean(body.answer, 8000);
  const language = body.language === "FR" ? "FR" : "EN";

  if (answer.length < 20) {
    return NextResponse.json(
      { error: language === "FR" ? "Réponse trop courte pour une évaluation utile." : "Answer too short for a useful evaluation." },
      { status: 400 },
    );
  }

  const question = interviewQuestions[track];
  const local = (value: { en: string; fr: string }) => language === "FR" ? value.fr : value.en;
  const framework = question.framework.map((step, i) => `${i + 1}. ${local(step)}`).join("\n");

  let userId: string | null = null;
  let supabase: Awaited<ReturnType<typeof createClient>> | null = null;
  try {
    supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {}

  const system = language === "FR"
    ? "Tu es un recruteur finance exigeant et pédagogique. Évalue uniquement la réponse fournie. Sois précis sur les erreurs techniques et la structure. N’invente aucun fait actuel."
    : "You are a demanding but educational finance interviewer. Evaluate only the answer provided. Be precise about technical errors and structure. Do not invent current facts.";

  const prompt = `TRACK: ${track}
QUESTION: ${local(question.question)}
TESTS: ${local(question.tests)}
IDEAL FRAMEWORK:
${framework}
FOLLOW-UP: ${local(question.followUp)}

CANDIDATE ANSWER:
${answer}

Use exactly these headings:
SCORE: NN/100
VERDICT:
WHAT YOU DID WELL:
WHAT TO IMPROVE:
MISSING OR WEAK TECHNICAL POINTS:
STRONGER ANSWER STRUCTURE:
FOLLOW-UP:
MODEL ANSWER DIRECTION:

Use bullets where useful. SCORE must be an integer 0-100.`;

  try {
    const result = await generateText({
      model: MODEL,
      system,
      prompt,
      maxOutputTokens: 1600,
      reasoning: "medium",
      providerOptions: {
        gateway: userId
          ? { user: userId, tags: ["feature:interview-studio"] }
          : { tags: ["feature:interview-studio", "user:guest"] },
      },
    });

    const score = scoreFrom(result.text);
    let saved = false;

    if (userId && supabase) {
      const { error } = await supabase.from("interview_attempts").insert({
        user_id: userId,
        track,
        question_key: interviewQuestionKey(track),
        answer_text: answer,
        evaluation: {
          status: "scored",
          version: 2,
          score,
          feedback: result.text.slice(0, 12000),
          model: MODEL,
        },
      });
      saved = !error;
    }

    return NextResponse.json({ score, feedback: result.text, saved, model: MODEL });
  } catch (error) {
    console.error("Interview evaluation failed", error);

    const gatewayMessage =
      error instanceof Error ? error.message.toLowerCase() : "";
    const billingRequired =
      gatewayMessage.includes("valid credit card") ||
      gatewayMessage.includes("add a card") ||
      gatewayMessage.includes("unlock your free credits");

    return NextResponse.json(
      {
        error: billingRequired
          ? language === "FR"
            ? "Interview Studio est prêt, mais AI Gateway doit encore être activé dans Vercel avec un moyen de paiement valide pour débloquer les crédits IA."
            : "Interview Studio is ready, but AI Gateway still needs a valid payment method in Vercel to unlock AI credits."
          : language === "FR"
            ? "L’évaluation IA n’est pas disponible pour le moment. Ta réponse reste dans l’éditeur et tu peux réessayer lorsque la connexion AI Gateway est active."
            : "AI evaluation is not available right now. Your answer remains in the editor and you can retry when the AI Gateway connection is active.",
        code: billingRequired
          ? "AI_GATEWAY_BILLING_REQUIRED"
          : "AI_GATEWAY_UNAVAILABLE",
      },
      { status: 503 },
    );
  }
}
