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

function isFormulaNode(node: Text) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"].includes(parent.tagName)) return true;
  return Boolean(parent.closest(".challenge-formula, .formula, .formula-box, [data-formula]"));
}

function textNodes(root: HTMLElement) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (isFormulaNode(node as Text)) return NodeFilter.FILTER_REJECT;
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

function applyStandards() {
  const root = document.querySelector<HTMLElement>("main");
  if (!root) return;
  const nodes = textNodes(root);

  for (const node of nodes) {
    const original = node.textContent || "";
    const normalized = normalizeMoney(original);
    if (normalized !== original) node.textContent = normalized;
  }

  const pageText = root.textContent || "";
  for (const [abbr, full] of abbreviations) {
    if (pageText.includes(`${abbr} (${full})`)) continue;
    const escaped = abbr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = abbr === "P/E" || abbr === "P&L" ? new RegExp(escaped) : new RegExp(`\\b${escaped}\\b`);
    const target = nodes.find((node) => regex.test(node.textContent || ""));
    if (target) target.textContent = (target.textContent || "").replace(regex, `${abbr} (${full})`);
  }
}

export default function FinanceNotationStandards() {
  useEffect(() => {
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(() => {
        queued = false;
        applyStandards();
      });
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    window.addEventListener("finance-studio-language-change", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("finance-studio-language-change", schedule);
    };
  }, []);
  return null;
}
