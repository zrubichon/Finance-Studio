"use client";

import { useEffect } from "react";

type GeneratedInterview = {
  question: string;
  badge: string;
  whyItMatters: string;
  steps: Array<{ title: string; answer: string }>;
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
  return card.querySelector<HTMLElement>(".pill")?.textContent?.trim() || "Finance";
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
    const strong = row.querySelector<HTMLElement>("strong");
    if (strong) strong.textContent = step.title;
    let answer = row.querySelector<HTMLElement>(".interview-step-answer");
    if (!answer) {
      answer = document.createElement("span");
      answer.className = "interview-step-answer";
      row.querySelector("p")?.appendChild(answer);
    }
    answer.textContent = step.answer;
  });
}

async function generateFreshInterview() {
  const card = document.querySelector<HTMLElement>(".interview-card");
  if (!card) return;

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
