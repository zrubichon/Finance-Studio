// Hold unfinished diagram and formula blocks until they can render cleanly.
export function studyPreview(answer: string): string {
  let fenceStart = -1;
  const fences = [...answer.matchAll(/^```.*$/gm)];
  if (fences.length % 2) fenceStart = fences[fences.length - 1].index!;
  let preview = fenceStart >= 0 ? answer.slice(0, fenceStart) : answer;
  for (const [open, close] of [["\\[", "\\]"], ["\\(", "\\)"]]) {
    const start = preview.lastIndexOf(open);
    if (start > preview.lastIndexOf(close)) preview = preview.slice(0, start);
  }
  return preview;
}

/** Read complete study cards while showing text as soon as it arrives. */
export async function requestStudyCard(body: Record<string, unknown>, onUpdate: (answer: string) => void): Promise<string> {
  const response = await fetch("/api/professor", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, responseStyle: "study", stream: true }),
  });
  if (!response.headers.get("content-type")?.includes("application/x-ndjson")) {
    const payload = await response.json() as { answer?: string; error?: string };
    if (!response.ok || !payload.answer) throw new Error(payload.error || "AI study card unavailable.");
    onUpdate(payload.answer);
    return payload.answer;
  }
  if (!response.ok || !response.body) throw new Error("AI study card unavailable.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "", answer = "", complete = false, lastUpdate = 0;
  function consume(line: string) {
    if (!line.trim()) return;
    const event = JSON.parse(line) as { type: string; text?: string; error?: string };
    if (event.type === "error") throw new Error(event.error || "Generation interrupted. Please retry.");
    if (event.type === "delta") {
      answer += event.text || "";
      // Keep long formulas and diagrams responsive without rendering every token.
      if (Date.now() - lastUpdate > 80) { onUpdate(studyPreview(answer)); lastUpdate = Date.now(); }
    }
    if (event.type === "done") complete = true;
  }
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      let index: number;
      while ((index = buffer.indexOf("\n")) !== -1) {
        consume(buffer.slice(0, index)); buffer = buffer.slice(index + 1);
      }
      if (done) break;
    }
    consume(buffer);
    if (!complete || !answer.trim()) throw new Error("Generation interrupted. Please retry.");
    onUpdate(answer);
    return answer;
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally { reader.releaseLock(); }
}
