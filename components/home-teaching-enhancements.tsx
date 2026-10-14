"use client";

import { useEffect } from "react";
import { interviewFrameworkDetails } from "@/lib/interview-framework-details";
import type { Track } from "@/lib/interview-content";

type GeneratedInterview = {
  question: string;
  badge: string;
  whyItMatters: string;
  steps: Array<{
    title: string;
    simple: string;
    why: string;
    example: string;
    next?: string;
  }>;
};

const HISTORY_KEY = "finance-studio-interview-question-history";

function safeReadHistory(): string[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string").slice(-40) : [];
  } catch {
    return [];
  }
}

function safeWriteHistory(items: string[]) {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(-40)));
  } catch {
    // Interview generation still works when browser storage is unavailable.
  }
}

function getRole(card: HTMLElement) {
  const context = card.querySelector(":scope > p")?.textContent?.trim() || "";
  const match = context.match(/(?:target role|métier cible)(?:\s+enregistré)?\s*:\s*([^\.]+)/i);
  if (match?.[1]) return match[1].trim();
  const badge = card.querySelector<HTMLElement>(".pill")?.textContent?.trim() || "";
  const badgeMap: Record<string, Track> = {
    IB: "Investment Banking",
    "S&T": "Sales & Trading",
    AM: "Asset Management",
    WM: "Wealth Management",
    PE: "Private Equity",
    ER: "Equity Research",
  };
  return badgeMap[badge] || "Investment Banking";
}

function getTrack(card: HTMLElement): Track {
  const role = getRole(card);
  const tracks: Track[] = ["Investment Banking", "Sales & Trading", "Asset Management", "Wealth Management", "Private Equity", "Equity Research"];
  return tracks.find((track) => role.toLowerCase().includes(track.toLowerCase())) || "Investment Banking";
}

async function getMarketSummary() {
  try {
    const response = await fetch("/api/markets", { cache: "no-store" });
    if (!response.ok) return "";
    const payload = await response.json() as { quotes?: Array<{ label?: string; value?: number; unit?: string; changePercent?: number | null; asOf?: string; source?: string }> };
    return (payload.quotes || []).slice(0, 18).map((quote) => {
      const move = typeof quote.changePercent === "number" ? `, change ${quote.changePercent >= 0 ? "+" : ""}${quote.changePercent.toFixed(2)}%` : "";
      return `${quote.label}: ${quote.value}${quote.unit || ""}${move}, as of ${quote.asOf || "provider latest"}, source ${quote.source || "connected provider"}`;
    }).join("\n");
  } catch {
    return "";
  }
}

function appendLine(container: HTMLElement, label: string, copy: string, className: string) {
  const row = document.createElement("span");
  row.className = `interview-answer-part ${className}`;
  const strong = document.createElement("b");
  strong.textContent = label;
  const text = document.createElement("span");
  text.textContent = copy;
  row.append(strong, text);
  container.appendChild(row);
}

function fillStep(row: HTMLElement, title: string, simple: string, why: string, example: string, next?: string) {
  const strong = row.querySelector<HTMLElement>("strong");
  if (strong) strong.textContent = title;
  const p = row.querySelector<HTMLElement>("p");
  if (!p) return;
  let answer = p.querySelector<HTMLElement>(".interview-step-answer");
  if (!answer) {
    answer = document.createElement("span");
    answer.className = "interview-step-answer";
    p.appendChild(answer);
  }
  answer.innerHTML = "";
  appendLine(answer, "Simple answer", simple, "simple");
  appendLine(answer, "Why", why, "why");
  appendLine(answer, "Example / implication", example, "example");
  if (next) appendLine(answer, "What happens next", next, "next");
}

function renderFallback(card: HTMLElement) {
  const track = getTrack(card);
  const french = document.documentElement.lang === "fr";
  const details = interviewFrameworkDetails[track];
  const rows = card.querySelectorAll<HTMLElement>(".answer-framework > div");
  rows.forEach((row, index) => {
    const detail = details[index];
    if (!detail) return;
    const title = row.querySelector<HTMLElement>("strong")?.textContent?.trim() || "";
    fillStep(
      row,
      title,
      french ? detail.simple.fr : detail.simple.en,
      french ? detail.why.fr : detail.why.en,
      french ? detail.example.fr : detail.example.en,
      detail.next ? (french ? detail.next.fr : detail.next.en) : undefined,
    );
  });
}

function renderInterview(card: HTMLElement, data: GeneratedInterview) {
  const title = card.querySelector<HTMLElement>(".card-head h2");
  if (title) title.textContent = data.question;

  const badge = card.querySelector<HTMLElement>(".card-head .pill");
  if (badge && data.badge) badge.textContent = data.badge;

  let why = card.querySelector<HTMLElement>(".interview-ai-why");
  const intro = card.querySelector<HTMLElement>(":scope > p");
  if (!why && intro) {
    why = document.createElement("p");
    why.className = "interview-ai-why";
    intro.insertAdjacentElement("afterend", why);
  }
  if (why) why.textContent = data.whyItMatters;

  const rows = card.querySelectorAll<HTMLElement>(".answer-framework > div");
  data.steps.slice(0, 3).forEach((step, index) => {
    const row = rows[index];
    if (!row) return;
    fillStep(row, step.title, step.simple, step.why, step.example, step.next);
  });
}

async function generateFreshInterview() {
  const card = document.querySelector<HTMLElement>(".interview-card");
  if (!card) return;
  renderFallback(card);

  const role = getRole(card);
  const language = document.documentElement.lang === "fr" ? "FR" : "EN";
  const marketSummary = await getMarketSummary();
  const recentQuestions = safeReadHistory();

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch("/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          role,
          language,
          marketSummary,
          recentQuestions,
          nonce: `${Date.now()}-${Math.random()}-${attempt}`,
        }),
      });
      if (!response.ok) return;
      const data = await response.json() as GeneratedInterview;
      if (!data?.question || !Array.isArray(data.steps) || data.steps.length < 3) return;
      if (recentQuestions.includes(data.question) && attempt === 0) continue;
      renderInterview(card, data);
      safeWriteHistory([...recentQuestions, data.question]);
      return;
    } catch {
      return;
    }
  }
}

export default function HomeTeachingEnhancements() {
  useEffect(() => {
    let lastHour = new Date().getHours();
    const card = document.querySelector<HTMLElement>(".interview-card");
    if (card) renderFallback(card);
    const initial = window.setTimeout(() => void generateFreshInterview(), 350);
    const timer = window.setInterval(() => {
      const hour = new Date().getHours();
      if (hour !== lastHour) {
        lastHour = hour;
        void generateFreshInterview();
      }
    }, 60_000);
    const onLanguage = () => window.setTimeout(() => void generateFreshInterview(), 0);
    window.addEventListener("finance-studio-language-change", onLanguage);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
      window.removeEventListener("finance-studio-language-change", onLanguage);
    };
  }, []);

  return null;
}
