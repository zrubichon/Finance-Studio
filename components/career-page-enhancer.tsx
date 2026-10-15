"use client";

import { useEffect } from "react";

const roleMap: Record<string,string> = {
  "Sales & Trading":"sales-trading", "Asset Management":"asset-management", "Equity Research":"equity-research", "Hedge Funds":"hedge-funds",
  "Investment Banking":"investment-banking", "Private Equity":"private-equity", "Wealth Management":"wealth-management", "Risk Management":"risk-management",
};

function enhance() {
  if (window.location.pathname !== "/careers") return;
  document.querySelectorAll<HTMLElement>(".role-grid article").forEach((card) => {
    if (card.querySelector(".career-deep-guide-link")) return;
    const h3 = card.querySelector("h3,h2");
    const title = h3?.textContent?.trim() || "";
    const slug = roleMap[title];
    if (!slug) return;
    const a = document.createElement("a");
    a.href = `/careers/${slug}`;
    a.className = "career-deep-guide-link chip";
    a.textContent = document.documentElement.lang === "fr" ? "Ouvrir le guide métier complet →" : "Open complete career guide →";
    card.appendChild(a);
  });

  const main = document.querySelector<HTMLElement>(".product-section-main");
  if (!main || main.querySelector(".career-internship-hub")) return;
  const section = document.createElement("section");
  section.className = "news-blueprint-panel career-internship-hub";
  const fr = document.documentElement.lang === "fr";
  section.innerHTML = `
    <div class="panel-heading"><div><span class="mini-label">${fr ? "STAGES / INTERNSHIPS" : "INTERNSHIPS / STAGES"}</span><h2>${fr ? "Transformer un métier cible en plan concret de recherche de stage" : "Turn a target role into a concrete internship search plan"}</h2></div></div>
    <p class="explanation-copy">${fr ? "Choisis d’abord le métier, puis ouvre son guide complet. Chaque guide relie les cours à faire, les notions techniques, les tâches réelles, les types d’entreprises à rechercher, le networking, les entretiens et une checklist de candidature." : "Choose the role first, then open its complete guide. Every guide connects relevant courses, technical concepts, real tasks, firms to research, networking, interviews and an internship application checklist."}</p>
    <div class="market-course-links"></div>`;
  const links = section.querySelector<HTMLElement>(".market-course-links");
  Object.entries(roleMap).forEach(([name, slug]) => {
    const a = document.createElement("a"); a.href = `/careers/${slug}`; a.textContent = `${name} →`; links?.appendChild(a);
  });
  main.appendChild(section);
}

export default function CareerPageEnhancer() {
  useEffect(() => {
    enhance();
    const timer = window.setInterval(enhance, 1200);
    window.addEventListener("finance-studio-language-change", enhance);
    return () => { window.clearInterval(timer); window.removeEventListener("finance-studio-language-change", enhance); };
  }, []);
  return null;
}
