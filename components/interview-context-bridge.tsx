"use client";

import { useEffect } from "react";

export default function InterviewContextBridge() {
  useEffect(() => {
    if (window.location.pathname !== "/interview") return;
    const params = new URLSearchParams(window.location.search);
    const concept = params.get("concept")?.trim() || "";
    const requestedTrack = params.get("track")?.trim() || "";
    if (!concept && !requestedTrack) return;

    function alignTrack() {
      if (!requestedTrack) return;
      const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".interview-control-panel .chip-row button"));
      const wanted = buttons.find((button) => button.textContent?.trim() === requestedTrack);
      if (wanted && !wanted.classList.contains("active")) wanted.click();
    }

    function applyConcept() {
      if (!concept) return;
      const french = document.documentElement.lang === "fr";
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
        const label = document.createElement("span");
        label.className = "mini-label";
        label.textContent = french ? "STRUCTURE SPÉCIFIQUE AU CONCEPT" : "CONCEPT-SPECIFIC STRUCTURE";
        const h3 = document.createElement("h3");
        h3.textContent = concept;
        const p = document.createElement("p");
        p.textContent = french
          ? "Réponds en six temps : 1) définition simple, 2) mécanisme, 3) formule et variables si elles existent, 4) exemple chiffré, 5) implication pour le métier sélectionné, 6) limite, risque ou élément qui changerait ton analyse. Les étapes métier situées dessous restent un cadre complémentaire, mais ta réponse principale doit rester centrée sur le concept transmis par le challenge."
          : "Answer in six moves: 1) simple definition, 2) mechanism, 3) formula and variables when relevant, 4) numerical example, 5) implication for the selected role, 6) limitation, risk or evidence that would change your view. The role framework below remains complementary, but your primary answer should stay centered on the concept passed from the challenge.";
        note.append(label, h3, p);
        framework.prepend(note);
      }
    }

    function apply() {
      alignTrack();
      window.setTimeout(applyConcept, 30);
    }

    apply();
    const timer = window.setInterval(apply, 900);
    window.addEventListener("finance-studio-language-change", apply);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("finance-studio-language-change", apply);
    };
  }, []);
  return null;
}
