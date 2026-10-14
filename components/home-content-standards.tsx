"use client";

import { useEffect } from "react";

const abbreviations = [
  ["WACC", "Weighted Average Cost of Capital"],
  ["EV", "Enterprise Value"],
  ["EBITDA", "Earnings Before Interest, Taxes, Depreciation and Amortization"],
  ["CPI", "Consumer Price Index"],
  ["DCF", "Discounted Cash Flow"],
  ["P/E", "Price-to-Earnings ratio"],
  ["P&L", "Profit and Loss"],
  ["FX", "Foreign Exchange"],
  ["bps", "basis points / points de base"],
] as const;

function normalizeMoney(text: string) {
  return text
    .replace(/\$(\d+(?:\.\d+)?)\s*m\b/gi, "$1 M$")
    .replace(/\$(\d+(?:\.\d+)?)\s*bn\b/gi, "$1 B$")
    .replace(/\$(\d+(?:\.\d+)?)\s*b\b/gi, "$1 B$");
}

function collectTextNodes(root: HTMLElement) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

function normalizeEducationalBlock(root: HTMLElement) {
  const nodes = collectTextNodes(root);
  for (const node of nodes) {
    const original = node.textContent || "";
    const normalized = normalizeMoney(original);
    if (normalized !== original) node.textContent = normalized;
  }

  const fullText = root.textContent || "";
  for (const [abbr, full] of abbreviations) {
    if (fullText.includes(`${abbr} (${full})`)) continue;
    const escaped = abbr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = abbr === "P/E" || abbr === "P&L"
      ? new RegExp(escaped)
      : new RegExp(`\\b${escaped}\\b`);
    const node = nodes.find((candidate) => pattern.test(candidate.textContent || ""));
    if (!node) continue;
    node.textContent = (node.textContent || "").replace(pattern, `${abbr} (${full})`);
  }
}

function ensureMarketGuideLink() {
  const card = document.querySelector<HTMLElement>(".markets-card");
  if (!card || card.querySelector(".market-understand-link")) return;
  const link = document.createElement("a");
  link.href = "/markets/guide";
  link.className = "chip market-understand-link";
  link.textContent = document.documentElement.lang === "fr" ? "Comprendre ces données →" : "Understand these data →";
  const existing = card.querySelector<HTMLAnchorElement>('a[href="/markets"]');
  if (existing?.parentElement) existing.insertAdjacentElement("afterend", link);
  else card.appendChild(link);
}

function ensureFormulaLegend() {
  const blocks = document.querySelectorAll<HTMLElement>(".learning-detail-grid article");
  blocks.forEach((block) => {
    const label = block.querySelector("span")?.textContent || "";
    if (!/FORMULA|FORMULE/i.test(label) || block.querySelector(".formula-symbol-legend")) return;
    const formula = block.querySelector("p")?.textContent || "";
    let legend = "";
    if (/PV\s*=\s*CF/i.test(formula)) {
      legend = document.documentElement.lang === "fr"
        ? "PV = Present Value / valeur actuelle · CF = Cash Flow / flux de trésorerie · r = discount rate / taux d’actualisation · n = nombre de périodes"
        : "PV = Present Value · CF = Cash Flow · r = discount rate · n = number of periods";
    } else if (/2s10s/i.test(formula)) {
      legend = document.documentElement.lang === "fr"
        ? "2s10s = yield du Treasury 10 ans − yield du Treasury 2 ans · bps = basis points / points de base"
        : "2s10s = 10-year Treasury yield − 2-year Treasury yield · bps = basis points / points de base";
    } else if (/EBITDA/i.test(formula)) {
      legend = "EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization";
    }
    if (!legend) return;
    const small = document.createElement("small");
    small.className = "formula-symbol-legend";
    small.textContent = legend;
    block.appendChild(small);
  });
}

export default function HomeContentStandards() {
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll<HTMLElement>(".daily-card, .interview-card, .markets-card").forEach(normalizeEducationalBlock);
      ensureMarketGuideLink();
      ensureFormulaLegend();
    };

    apply();
    const timer = window.setInterval(apply, 750);
    const languageHandler = () => window.setTimeout(apply, 0);
    window.addEventListener("finance-studio-language-change", languageHandler);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("finance-studio-language-change", languageHandler);
    };
  }, []);
  return null;
}
