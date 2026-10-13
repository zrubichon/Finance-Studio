import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { interviewQuestionKey, interviewQuestions, isInterviewTrack } from "@/lib/interview-content";
import { getLessonBySlug } from "@/lib/lesson-registry";
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
    customQuestion?: unknown;
    lessonSlug?: unknown;
    source?: unknown;
  } | null;

  if (!body || !isInterviewTrack(body.track)) {
    return NextResponse.json({ error: "Invalid interview request." }, { status: 400 });
  }

  const track = body.track;
  const answer = clean(body.answer, 8000);
  const language = body.language === "FR" ? "FR" : "EN";
  const customQuestion = clean(body.customQuestion, 1800);
  const lessonSlug = clean(body.lessonSlug, 180);
  const source = clean(body.source, 80);

  if (answer.length < 20) {
    return NextResponse.json(
      { error: language === "FR" ? "Réponse trop courte pour une évaluation utile." : "Answer too short for a useful evaluation." },
      { status: 400 },
    );
  }

  const question = interviewQuestions[track];
  const local = (value: { en: string; fr: string }) => language === "FR" ? value.fr : value.en;
  const displayQuestion = customQuestion || local(question.question);
  const framework = question.framework.map((step, i) => `${i + 1}. ${local(step)}`).join("\n");
  const lesson = lessonSlug ? getLessonBySlug(lessonSlug) : null;
  const lessonContext = lesson
    ? `RELATED FINANCE UNIVERSITY LESSON: ${lesson.title.en} / ${lesson.title.fr}\nDOMAIN: ${lesson.domain.en}\nINTERVIEW TRANSFER: ${local(lesson.interviewPrompt.question)}`
    : "";

  let userId: string | null = null;
  let supabase: Awaited<ReturnType<typeof createClient>> | null = null;
  try {
    supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {}

  const system = language === "FR"
    ? "Tu es un recruteur finance exigeant et pédagogique. Évalue uniquement la réponse fournie. Pour une question contextuelle liée à une news ou un cours, récompense la séparation faits/interprétation, la chaîne de transmission, ce qui peut déjà être pricé, les risques et les éléments à surveiller. Sois précis sur les erreurs techniques et la structure. N’invente aucun fait actuel."
    : "You are a demanding but educational finance interviewer. Evaluate only the answer provided. For a contextual question linked to news or a lesson, reward separation of fact from interpretation, transmission logic, what may already be priced, risks and what to watch next. Be precise about technical errors and structure. Do not invent current facts.";

  const prompt = `TRACK: ${track}
QUESTION: ${displayQuestion}
SOURCE: ${source || "Interview Studio"}
${lessonContext}
TESTS: ${local(question.tests)}
BASE TRACK FRAMEWORK:
${framework}
FOLLOW-UP STYLE: ${local(question.followUp)}

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

Use bullets where useful. SCORE must be an integer 0-100. If this is a current-news question, do not claim the headline is verified beyond the context supplied.`;

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
      const questionKey = customQuestion
        ? `contextual-${lessonSlug || track.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
        : interviewQuestionKey(track);
      const { error } = await supabase.from("interview_attempts").insert({
        user_id: userId,
        track,
        question_key: questionKey,
        answer_text: answer,
        evaluation: {
          status: "scored",
          version: 3,
          score,
          feedback: result.text.slice(0, 12000),
          model: MODEL,
          custom_question: customQuestion || null,
          lesson_slug: lessonSlug || null,
          source: source || null,
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
