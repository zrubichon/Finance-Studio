"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { professorHref } from "@/lib/learning-bridge";

export default function InvestingContextBridge() {
  const { text } = useLanguage();
  const [lesson, setLesson] = useState("");
  const [catalyst, setCatalyst] = useState("");
  const [thesis, setThesis] = useState("");
  const [source, setSource] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLesson((params.get("lesson") || "").slice(0, 180));
    setCatalyst((params.get("catalyst") || "").slice(0, 1200));
    setThesis((params.get("thesis") || "").slice(0, 1600));
    setSource((params.get("source") || "").slice(0, 80));
  }, []);

  if (!lesson && !catalyst && !thesis) return null;

  const professorQuestion = [
    "Help me turn this learning context into a disciplined, testable investment thesis.",
    catalyst ? `Catalyst: ${catalyst}` : "",
    thesis ? `Starting thesis: ${thesis}` : "",
    "Separate facts from interpretation, identify the key assumption, valuation or macro mechanism, catalyst, downside, invalidation condition, time horizon and portfolio risk. Do not give personalized investment advice.",
  ].filter(Boolean).join("\n");

  async function copySeed() {
    const seed = [
      catalyst ? `Catalyst: ${catalyst}` : "",
      thesis ? `Core thesis seed: ${thesis}` : "",
      "Key assumption:",
      "Time horizon:",
      "Invalidation condition:",
      "Downside case:",
      "Portfolio risk:",
    ].filter(Boolean).join("\n\n");
    await navigator.clipboard.writeText(seed);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="learning-account-strip">
      <div>
        <span className="mini-label">{text("LEARNING → INVESTING LAB", "APPRENTISSAGE → INVESTING LAB")}</span>
        <h2>{text("Turn what you just learned into a testable decision journal entry.", "Transforme ce que tu viens d’apprendre en une thèse testable dans ton journal de décision.")}</h2>
        {catalyst ? <p><strong>{text("Catalyst:", "Catalyseur :")}</strong> {catalyst}</p> : null}
        {thesis ? <p><strong>{text("Starting thesis:", "Départ de thèse :")}</strong> {thesis}</p> : null}
        {source ? <small>{text("Source", "Source")} · {source}</small> : null}
      </div>
      <div className="chip-row">
        {lesson ? <Link className="chip" href={`/university/${lesson}`}>{text("Review lesson", "Revoir le cours")}</Link> : null}
        {lesson ? <Link className="chip" href={professorHref({ lessonSlug: lesson, question: professorQuestion, source: "lesson" })}>{text("Stress-test with AI Professor", "Tester avec AI Professor")}</Link> : null}
        <button type="button" className="chip" onClick={() => void copySeed()}>{copied ? text("Copied ✓", "Copié ✓") : text("Copy thesis template", "Copier le template de thèse")}</button>
      </div>
    </section>
  );
}
