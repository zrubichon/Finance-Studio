"use client";

import { useEffect } from "react";

const abbreviations = [
  ["WACC", "Weighted Average Cost of Capital"], ["EV", "Enterprise Value"], ["EBITDA", "Earnings Before Interest, Taxes, Depreciation and Amortization"], ["CPI", "Consumer Price Index"], ["DCF", "Discounted Cash Flow"], ["P/E", "Price-to-Earnings ratio"], ["P&L", "Profit and Loss"], ["FX", "Foreign Exchange"], ["bps", "basis points / points de base"],
] as const;

function normalizeMoney(text: string) {
  return text.replace(/\$(\d+(?:\.\d+)?)\s*m\b/gi, "$1 M$").replace(/\$(\d+(?:\.\d+)?)\s*bn\b/gi, "$1 B$").replace(/\$(\d+(?:\.\d+)?)\s*b\b/gi, "$1 B$");
}
function collectTextNodes(root: HTMLElement) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(node) { const parent=node.parentElement; if(!parent||["SCRIPT","STYLE","TEXTAREA","INPUT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT; return node.textContent?.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; } });
  let current=walker.nextNode(); while(current){nodes.push(current as Text);current=walker.nextNode();} return nodes;
}
function normalizeEducationalBlock(root: HTMLElement) {
  const nodes=collectTextNodes(root); for(const node of nodes){const original=node.textContent||"";const normalized=normalizeMoney(original);if(normalized!==original)node.textContent=normalized;}
  const fullText=root.textContent||"";
  for(const [abbr,full] of abbreviations){if(fullText.includes(`${abbr} (${full})`))continue;const escaped=abbr.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");const pattern=abbr==="P/E"||abbr==="P&L"?new RegExp(escaped):new RegExp(`\\b${escaped}\\b`);const node=nodes.find(candidate=>pattern.test(candidate.textContent||""));if(node)node.textContent=(node.textContent||"").replace(pattern,`${abbr} (${full})`);}
}

function ensureMarketLearning() {
  const card=document.querySelector<HTMLElement>(".markets-card"); if(!card)return;
  const french=document.documentElement.lang==="fr";
  if(!card.querySelector(".market-understand-link")){
    const link=document.createElement("a");link.href="/markets/guide";link.className="chip market-understand-link";link.textContent=french?"Comprendre ces données →":"Understand these data →";
    const existing=card.querySelector<HTMLAnchorElement>('a[href="/markets"]');if(existing?.parentElement)existing.insertAdjacentElement("afterend",link);else card.appendChild(link);
  }
  if(!card.querySelector(".market-glossary-strip")){
    const strip=document.createElement("div");strip.className="market-glossary-strip";
    const label=document.createElement("span");label.className="mini-label";label.textContent=french?"LIRE LES CHIFFRES":"READ THE NUMBERS";
    const p=document.createElement("dl");
    const terms = french ? [
      ["10Y−2Y / 2s10s", "Rendement Treasury US 10 ans moins rendement 2 ans : 4,20 % − 3,80 % = +40 bps."],
      ["bps · points de base", "1 bp = 0,01 point de pourcentage ; 100 bps = 1 point. +40 bps = +0,40 point."],
      ["IG · Investment Grade", "Obligations d’émetteurs de catégorie investissement : notation BBB− / Baa3 ou plus."],
      ["HY · High Yield", "Obligations à haut rendement, de notation inférieure à la catégorie investissement : risque de crédit plus élevé."],
      ["OAS · Option-Adjusted Spread", "Surcroît de rendement par rapport à la courbe de référence, après ajustement des options incorporées."],
      ["As of · date d’observation", "Date de la valeur publiée. Une actualisation de l’écran ne transforme pas une observation quotidienne en cotation temps réel."]
    ] : [
      ["10Y−2Y / 2s10s", "US 10-year Treasury yield minus the 2-year yield: 4.20% − 3.80% = +40 bps."],
      ["bps · basis points", "1 bp = 0.01 percentage point; 100 bps = 1 point. +40 bps = +0.40 point."],
      ["IG · Investment Grade", "Bonds rated BBB− / Baa3 or above: investment-grade credit quality."],
      ["HY · High Yield", "Bonds rated below investment grade, carrying higher credit risk."],
      ["OAS · Option-Adjusted Spread", "Extra yield over the reference curve after adjusting for embedded bond options."],
      ["As of · observation date", "The date the value describes. Refreshing the screen does not make daily observations real-time quotes."]
    ];
    for (const [term, definition] of terms) { const dt=document.createElement("dt"); dt.textContent=term; const dd=document.createElement("dd"); dd.textContent=definition; p.append(dt,dd); }
    strip.append(label,p);card.appendChild(strip);
  }
  if(!card.querySelector(".market-course-strip")){
    const strip=document.createElement("div");strip.className="market-course-strip";
    const label=document.createElement("span");label.className="mini-label";label.textContent=french?"COURS UTILES POUR COMPRENDRE LA MARKET MAP":"LESSONS THAT TEACH THIS MARKET MAP";strip.appendChild(label);
    const links=document.createElement("div");links.className="market-course-links";
    const lessons=[
      [french?"Structure de marché":"Market structure","/university/year-1-financial-system-market-structure"],
      [french?"Macro pour les marchés":"Macroeconomics for markets","/university/year-1-macroeconomics-for-markets"],
      [french?"Yield curve":"Yield curve","/university/year-2-yield-curve"],
      [french?"Taux & obligations":"Fixed income & yield curves","/university/year-2-fixed-income-yield-curves"],
      ["FX","/university/year-2-fx-international-finance"],
      [french?"Valorisation actions":"Equity valuation","/university/year-2-equity-valuation"],
      [french?"Crédit":"Credit analysis","/university/year-3-credit-analysis"],
    ];
    lessons.forEach(([name,href])=>{const a=document.createElement("a");a.href=href;a.textContent=`${name} →`;links.appendChild(a);});strip.appendChild(links);card.appendChild(strip);
  }
}

function ensureFormulaLegend(){document.querySelectorAll<HTMLElement>(".learning-detail-grid article").forEach(block=>{const label=block.querySelector("span")?.textContent||"";if(!/FORMULA|FORMULE/i.test(label)||block.querySelector(".formula-symbol-legend"))return;const formula=block.querySelector("p")?.textContent||"";let legend="";if(/PV\s*=\s*CF/i.test(formula))legend=document.documentElement.lang==="fr"?"PV = Present Value / valeur actuelle · CF = Cash Flow / flux de trésorerie · r = discount rate / taux d’actualisation · n = nombre de périodes":"PV = Present Value · CF = Cash Flow · r = discount rate · n = number of periods";else if(/2s10s/i.test(formula))legend=document.documentElement.lang==="fr"?"2s10s = yield Treasury 10 ans − yield Treasury 2 ans · bps = basis points / points de base":"2s10s = 10-year Treasury yield − 2-year Treasury yield · bps = basis points";else if(/EBITDA/i.test(formula))legend="EBITDA = Earnings Before Interest, Taxes, Depreciation and Amortization";if(!legend)return;const small=document.createElement("small");small.className="formula-symbol-legend";small.textContent=legend;block.appendChild(small);});}

export default function HomeContentStandards(){useEffect(()=>{const apply=()=>{document.querySelectorAll<HTMLElement>(".markets-card").forEach(normalizeEducationalBlock);ensureMarketLearning();ensureFormulaLegend();};apply();const timer=window.setInterval(apply,750);const languageHandler=()=>window.setTimeout(apply,0);window.addEventListener("finance-studio-language-change",languageHandler);return()=>{window.clearInterval(timer);window.removeEventListener("finance-studio-language-change",languageHandler);};},[]);return null;}
