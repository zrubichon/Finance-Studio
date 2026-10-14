"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Coaching = {
  headline?: string;
  plainEnglish?: string;
  nextQuestion?: string;
};

export default function InvestingInstantCoach() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [message, setMessage] = useState<Coaching | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/investing") return;
    const panel = document.querySelector<HTMLElement>(".live-mentor-panel");
    const form = document.querySelector<HTMLFormElement>(".decision-sheet-form");
    if (!panel || !form) return;
    setTarget(panel);

    let timer = 0;
    let controller: AbortController | null = null;

    const read = () => {
      const selects = form.querySelectorAll<HTMLSelectElement>("select");
      const inputs = form.querySelectorAll<HTMLInputElement>("input");
      const textareas = form.querySelectorAll<HTMLTextAreaElement>("textarea");
      return {
        assetClass: selects[0]?.value || "equity",
        symbol: inputs[0]?.value || "",
        thesis: textareas[0]?.value || "",
        assumption: textareas[1]?.value || "",
        catalyst: textareas[2]?.value || "",
        horizon: textareas[3]?.value || "",
        invalidation: textareas[4]?.value || "",
        downside: textareas[5]?.value || "",
        risk: textareas[6]?.value || "",
      };
    };

    const onInput = () => {
      window.clearTimeout(timer);
      controller?.abort();
      const values = read();
      const text = Object.values(values).join(" ").trim();
      if (text.length < 3) {
        setMessage(null);
        setLoading(false);
        return;
      }
      // The built-in mentor already handles developed ideas. This closes the gap for very short inputs.
      const developed = values.symbol.trim().length >= 2 || values.thesis.trim().length >= 20 || values.assumption.trim().length >= 20 || values.catalyst.trim().length >= 15;
      if (developed) {
        setMessage(null);
        return;
      }
      timer = window.setTimeout(async () => {
        controller = new AbortController();
        setLoading(true);
        try {
          const response = await fetch("/api/investing/coach", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              language: document.documentElement.lang === "fr" ? "FR" : "EN",
              level: "Beginner",
              ...values,
              quote: null,
            }),
          });
          const payload = await response.json() as { coaching?: Coaching };
          if (response.ok && payload.coaching) setMessage(payload.coaching);
        } catch (error) {
          if ((error as Error).name !== "AbortError") {
            setMessage({
              headline: "Start from what you do know",
              plainEnglish: "You do not need a finished thesis. Write one fact, one uncertainty, or the company you are considering. The mentor will help you turn that into a research question.",
              nextQuestion: "What company or asset are you considering, and what made you look at it?",
            });
          }
        } finally {
          setLoading(false);
        }
      }, 450);
    };

    form.addEventListener("input", onInput);
    form.addEventListener("change", onInput);
    return () => {
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onInput);
      window.clearTimeout(timer);
      controller?.abort();
    };
  }, []);

  if (!target || (!loading && !message)) return null;

  return createPortal(
    <div className="instant-mentor-card" aria-live="polite">
      <span>INSTANT AI REACTION</span>
      {loading ? <p>Reading what you just entered…</p> : null}
      {message ? (
        <>
          <strong>{message.headline}</strong>
          <p>{message.plainEnglish}</p>
          {message.nextQuestion ? <small>Next question: {message.nextQuestion}</small> : null}
        </>
      ) : null}
    </div>,
    target,
  );
}
