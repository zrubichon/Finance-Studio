import { generateText } from "ai";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await generateText({
      model: "openai/gpt-5.5",
      system: "You are a health check. Follow the user instruction exactly.",
      prompt: "Reply with exactly: PROFESSOR_GATEWAY_OK",
      maxOutputTokens: 32,
      reasoning: "none",
      providerOptions: {
        gateway: {
          tags: ["feature:ai-professor", "probe:temporary"],
        },
      },
    });

    return NextResponse.json({
      ok: result.text.trim() === "PROFESSOR_GATEWAY_OK",
      response: result.text.trim(),
    });
  } catch (error) {
    console.error("Temporary AI Gateway probe failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown gateway error",
      },
      { status: 503 },
    );
  }
}
