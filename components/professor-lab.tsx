"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Mode = "Beginner" | "Intermediate" | "Professional";
type Explanation = { title: string; body: string; example: string; titleFr: string; bodyFr: string; exampleFr: string };

const explanations: Record<Mode, Explanation> = {
  Beginner: {
    title: "Duration measures how sensitive a bond is to interest-rate changes.",
    body: "Think of duration as a bond's rate sensitivity. A bond with higher duration usually moves more when yields change. The key relationship is inverse: when yields rise, bond prices generally fall; when yields fall, bond prices generally rise.",
    example: "A rough rule: if modified duration is 6 and yields rise by 1 percentage point, the bond price may fall by about 6%, before convexity adjustments.",
    titleFr: "La duration mesure la sensibilité d’une obligation / bond aux variations des taux d’intérêt / interest rates.",
    bodyFr: "Pense à la duration comme à la sensibilité d’une obligation aux taux / rate sensitivity. Une obligation avec une duration plus élevée bouge généralement davantage quand les rendements / yields changent. La relation essentielle est inverse : quand les yields montent, les prix des obligations baissent généralement, et inversement.",
    exampleFr: "Règle approximative : si la duration modifiée / modified duration vaut 6 et que les yields montent de 1 point de pourcentage, le prix de l’obligation peut baisser d’environ 6 %, avant ajustement de convexité / convexity.",
  },
  Intermediate: {
    title: "Duration links bond price sensitivity to a change in yield.",
    body: "Modified duration approximates the percentage price change for a small parallel move in yield. Longer maturity, lower coupon and lower starting yield generally increase rate sensitivity, although cash-flow timing matters more precisely than maturity alone.",
    example: "ΔP/P ≈ -Modified Duration × Δy. With duration 6 and Δy = +0.50%, the first-order estimate is roughly -3.0%.",
    titleFr: "La duration relie la sensibilité du prix d’une obligation à une variation de rendement / yield.",
    bodyFr: "La duration modifiée / modified duration approxime la variation en pourcentage du prix pour un petit déplacement parallèle des rendements / yields. Une maturité plus longue, un coupon plus faible et un yield initial plus faible augmentent généralement la sensibilité aux taux, même si le calendrier exact des flux / cash flows est plus important que la seule maturité.",
    exampleFr: "ΔP/P ≈ -Duration modifiée × Δy. Avec une duration de 6 et Δy = +0,50 %, l’estimation de premier ordre est d’environ -3,0 %.",
  },
  Professional: {
    title: "Duration is a first-order measure of fixed-income price sensitivity to yield changes.",
    body: "Modified duration captures the local slope of the price-yield relationship and is most useful for relatively small yield moves. Portfolio risk management also requires key-rate duration, curve-shape exposure and convexity because a parallel-shift assumption is often too simplistic.",
    example: "For a non-parallel selloff, aggregate duration can hide where the exposure sits on the curve; key-rate durations reveal whether the risk is concentrated in the front end, belly or long end.",
    titleFr: "La duration est une mesure de premier ordre de la sensibilité du prix des obligations / fixed income aux variations de yield.",
    bodyFr: "La duration modifiée / modified duration capture la pente locale de la relation prix-yield et convient surtout aux petits mouvements de taux. La gestion du risque de portefeuille / portfolio risk management nécessite aussi la key-rate duration, l’exposition à la forme de la courbe / curve-shape exposure et la convexité, car l’hypothèse d’un déplacement parallèle est souvent trop simpliste.",
    exampleFr: "Lors d’un sell-off non parallèle, la duration agrégée peut masquer l’endroit où se situe le risque sur la courbe. Les key-rate durations montrent si l’exposition est concentrée sur le front end, le belly ou le long end.",
  },
};

const teachingActions = [
  { en: "Explain more simply", fr: "Expliquer plus simplement" },
  { en: "Use numbers", fr: "Utiliser des chiffres" },
  { en: "Show the formula", fr: "Montrer la formule" },
  { en: "Connect to markets", fr: "Relier aux marchés" },
  { en: "Interview answer", fr: "Réponse entretien / interview answer" },
  { en: "Quiz me", fr: "Me faire un quiz" },
];

export default function ProfessorLab() {
  const { isFrench, text } = useLanguage();
  const [mode, setMode] = useState<Mode>("Beginner");
  const active = explanations[mode];
  const modeLabel = (value: Mode) => !isFrench ? value : value === "Beginner" ? "Débutant" : value === "Intermediate" ? "Intermédiaire" : "Professionnel";

  return (
    <div className="workspace-stack">
      <section className="control-panel professor-control-panel">
        <div><span className="control-label">{text("EXPLANATION MODE", "MODE D’EXPLICATION")}</span><div className="chip-row">{(["Beginner", "Intermediate", "Professional"] as Mode[]).map((item) => <button className={mode === item ? "chip active" : "chip"} onClick={() => setMode(item)} key={item} type="button">{modeLabel(item)}</button>)}</div></div>
        <div><span className="control-label">{text("AI CONNECTION", "CONNEXION IA")}</span><span className="connection-badge">{text("Teaching UI ready · model backend not connected yet", "Interface pédagogique prête · modèle IA pas encore connecté")}</span></div>
      </section>

      <section className="professor-demo-panel">
        <div className="professor-demo-question"><span className="mini-label">{text("SAMPLE QUESTION", "QUESTION EXEMPLE")}</span><h2>{text("“I still don't understand duration. Explain it again.”", "« Je ne comprends toujours pas la duration. Explique-la-moi à nouveau. »")}</h2><p>{text("This fixed example proves the teaching-mode behavior without pretending that a live AI model is already connected.", "Cet exemple fixe démontre le fonctionnement des modes pédagogiques sans prétendre qu’un modèle IA en direct est déjà connecté.")}</p></div>
        <div className="professor-response-card"><span className="mini-label">{modeLabel(mode).toUpperCase()} · {text("RESPONSE", "RÉPONSE")}</span><h3>{isFrench ? active.titleFr : active.title}</h3><p>{isFrench ? active.bodyFr : active.body}</p><div className="professor-example"><strong>{text("Example", "Exemple")}</strong><p>{isFrench ? active.exampleFr : active.example}</p></div></div>
      </section>

      <section className="teaching-action-grid">
        {teachingActions.map((action, index) => <article key={action.en}><span>{String(index + 1).padStart(2, "0")}</span><h3>{isFrench ? action.fr : action.en}</h3><p>{text("The connected professor will preserve the same underlying knowledge while changing the teaching method.", "Le professeur connecté conservera exactement le même savoir sous-jacent tout en changeant la méthode d’enseignement.")}</p></article>)}
      </section>

      <section className="misconception-panel">
        <div><span className="mini-label">{text("ERROR-BASED LEARNING", "APPRENTISSAGE PAR L’ERREUR / ERROR-BASED LEARNING")}</span><h2>{text("Do not just correct the answer — diagnose the misconception.", "Ne pas seulement corriger la réponse — diagnostiquer l’erreur de compréhension.")}</h2></div>
        <div className="misconception-flow"><span>{text("Your answer", "Ta réponse")}</span><b>→</b><span>{text("Find exact error", "Identifier l’erreur précise")}</span><b>→</b><span>{text("Rebuild concept", "Reconstruire le concept")}</span><b>→</b><span>{text("New question", "Nouvelle question")}</span><b>→</b><span>{text("Confirm mastery", "Confirmer la maîtrise / mastery")}</span></div>
      </section>
    </div>
  );
}
