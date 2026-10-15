"use client";

import { useEffect } from "react";

export default function InterviewContextBridge() {
  useEffect(() => {
    if (window.location.pathname !== "/interview") return;
    const params = new URLSearchParams(window.location.search);
    const concept = params.get("concept")?.trim();
    if (!concept) return;
    const french = document.documentElement.lang === "fr";
    function apply() {
      const panel = document.querySelector<HTMLElement>(".interview-question-panel");
      if (!panel) return;
      panel.dataset.challengeConcept = concept;
      const heading = panel.querySelector<HTMLElement>("h2");
      if (heading) heading.textContent = french
        ? `Explique ${concept} comme en entretien : définition, mécanisme, calcul ou formule, exemple et implication.`
        : `Explain ${concept} as you would in an interview: definition, mechanism, calculation or formula, example and implication.`;
      const columns = panel.querySelectorAll<HTMLElement>(".interview-two-column > div p");
      if (columns[0]) columns[0].textContent = french
        ? "Le recruteur teste si tu comprends réellement le concept, si tu peux passer de la définition au mécanisme et si tu sais utiliser un exemple plutôt que réciter une phrase mémorisée."
        : "The interviewer is testing whether you truly understand the concept, can move from definition to mechanism, and can use an example rather than reciting memorized wording.";
      if (columns[1]) columns[1].textContent = french
        ? `Quelle variable ferait changer ton analyse de ${concept}, et quel impact aurais-tu sur un actif, une valorisation ou une décision ?`
        : `What variable would change your analysis of ${concept}, and how would that affect an asset, valuation or decision?`;

      const framework = document.querySelector<HTMLElement>(".answer-framework-panel");
      if (framework && !framework.querySelector(".concept-interview-guidance")) {
        const note = document.createElement("div");
        note.className = "coverage-panel concept-interview-guidance";
        const label = document.createElement("span"); label.className = "mini-label"; label.textContent = french ? "STRUCTURE SPÉCIFIQUE AU CONCEPT" : "CONCEPT-SPECIFIC STRUCTURE";
        const h3 = document.createElement("h3"); h3.textContent = concept;
        const p = document.createElement("p"); p.textContent = french
          ? "Utilise les étapes ci-dessous comme cadre métier, mais adapte ta réponse à ce concept : 1) définis-le simplement, 2) explique le mécanisme, 3) montre la formule et chaque variable si elle existe, 4) fais un exemple chiffré, 5) donne l’implication marché/entreprise, 6) termine par une limite ou un risque."
          : "Use the steps below as a role framework, but adapt the answer to this concept: 1) define it simply, 2) explain the mechanism, 3) show the formula and every variable when relevant, 4) give a numerical example, 5) translate it into a market/company implication, 6) finish with a limitation or risk.";
        note.append(label,h3,p);
        framework.prepend(note);
      }
    }
    apply();
    const timer = window.setInterval(apply, 800);
    window.addEventListener("finance-studio-language-change", apply);
    return () => { window.clearInterval(timer); window.removeEventListener("finance-studio-language-change", apply); };
  }, []);
  return null;
}
