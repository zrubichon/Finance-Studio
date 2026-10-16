"use client";

import { useEffect } from "react";

function classify(node: HTMLElement) {
  const text = node.textContent || "";
  const matches = [...text.matchAll(/([+−-])\s*(\d+(?:\.\d+)?)%/g)];
  const match = matches[matches.length - 1];
  if (!match) return;
  const positive = match[1] === "+";
  node.classList.toggle("market-row-positive", positive);
  node.classList.toggle("market-row-negative", !positive);
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    const value = current.textContent || "";
    if (value.includes(match[0])) {
      const parent = current.parentElement;
      if (parent) parent.classList.add("market-move-value");
      break;
    }
    current = walker.nextNode();
  }
}

function apply() {
  const selectors = [
    ".market-universe-card .instrument-list > div",
    ".markets-card .market-row",
    ".markets-card .instrument-list > div",
    ".connected-market-card",
    ".market-snapshot-card",
  ];
  document.querySelectorAll<HTMLElement>(selectors.join(",")).forEach(classify);

  document.querySelectorAll<HTMLElement>(".market-overview-panel .provider-filter").forEach((row) => {
    if (row.querySelector(".chip")) row.classList.add("market-provider-row");
  });
}

export default function MarketVisualEnhancer() {
  useEffect(() => {
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    const timer = window.setInterval(apply, 2_000);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, []);
  return null;
}
