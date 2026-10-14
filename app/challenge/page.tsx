"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { professorHref } from "@/lib/learning-bridge";

function localDayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function calculationForSeed(seed: number) {
  const variants = [
    {
      en: "A bond has duration 5. If yield rises by 40 bps, estimate the first-order price move.",
      fr: "Une obligation a une duration de 5. Si le yield monte de 40 bps, estime le mouvement de prix au premier ordre.",
      answer: "-2%",
      explanationEn: "Use the duration approximation: price change ≈ -Duration × change in yield. 40 bps = 0.40%, so -5 × 0.40% = -2.0%.",
      explanationFr: "Utilise l’approximation par la duration : variation du prix ≈ -Duration × variation du yield. 40 bps = 0,40 %, donc -5 × 0,40 % = -2,0 %.",
      hintEn: "Convert basis points into a percentage, then multiply by duration and remember the inverse price/yield relationship.",
      hintFr: "Convertis les points de base en pourcentage, puis multiplie par la duration en gardant en tête la relation inverse prix/yield.",
    },
    {
      en: "Revenue is $500m and grows 12%. What is next year's revenue before any other adjustment?",
      fr: "Le chiffre d’affaires est de 500 M$ et croît de 12 %. Quel est le chiffre d’affaires de l’an prochain avant autre ajustement ?",
      answer: "$560m",
      explanationEn: "$500m × 1.12 = $560m. Growth is applied to the current base, not added as 12 dollars or 12 percentage points.",
      explanationFr: "500 M$ × 1,12 = 560 M$. La croissance s’applique à la base actuelle.",
      hintEn: "Multiply the starting revenue by 1 + the growth rate.",
      hintFr: "Multiplie le chiffre d’affaires initial par 1 + le taux de croissance.",
    },
    {
      en: "A stock trades at $80 with a $100 target price. What is the implied upside?",
      fr: "Une action cote 80 $ avec un target price de 100 $. Quel est l’upside implicite ?",
      answer: "25%",
      explanationEn: "Upside = (target - current) / current = (100 - 80) / 80 = 25%.",
      explanationFr: "Upside = (target - prix actuel) / prix actuel = (100 - 80) / 80 = 25 %.",
      hintEn: "Measure the gain relative to today's price, not relative to the target price.",
      hintFr: "Mesure le gain par rapport au prix actuel, pas par rapport au target price.",
    },
    {
      en: "A portfolio is 60% equities returning 8% and 40% bonds returning 3%. What is the portfolio return?",
      fr: "Un portefeuille est composé à 60 % d’actions rapportant 8 % et 40 % d’obligations rapportant 3 %. Quel est son rendement ?",
      answer: "6%",
      explanationEn: "Use a weighted average: 0.60 × 8% + 0.40 × 3% = 4.8% + 1.2% = 6.0%.",
      explanationFr: "Utilise une moyenne pondérée : 0,60 × 8 % + 0,40 × 3 % = 4,8 % + 1,2 % = 6,0 %.",
      hintEn: "Weight each asset return by its portfolio share, then add them.",
      hintFr: "Pondère chaque rendement par son poids dans le portefeuille, puis additionne.",
    },
  ];
  return variants[seed % variants.length];
}

export default function ChallengePage() {
  const { isFrench, text } = useLanguage();
  const params = useSearchParams();
  const lesson = params.get("lesson") || "year-2-duration-convexity";
  const headline = params.get("headline");
  const role = params.get("role") || "Investment Banking";
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const challenge = useMemo(() => {
    const key = localDayKey();
    const seed = [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return calculationForSeed(seed);
  }, []);

  const professorLink = professorHref({
    lessonSlug: lesson,
    question: `Guide me through this finance challenge step by step without giving the final answer immediately: ${challenge.en}${headline ? ` Context headline: ${headline}` : ""}`,
    source: "lesson",
  });

  return (
    <main className="product-section-shell">
      <section className="section-main product-section-main">
        <div className="product-section-hero challenge-hero">
          <span className="mini-label">{text("DAILY FINANCE CHALLENGE", "DAILY FINANCE CHALLENGE")}</span>
          <h1>{text("Complete the full learning loop", "Complète toute la boucle d’apprentissage")}</h1>
          <p>{text("Understand the context, connect the concept, calculate, explain your reasoning and turn it into interview and investing practice.", "Comprends le contexte, relie le concept, calcule, explique ton raisonnement puis transforme-le en entraînement entretien et investing.")}</p>
        </div>

        <section className="workspace-stack guided-challenge-stack">
          <article className="news-blueprint-panel challenge-step-card">
            <span className="mini-label">01 · {text("CONTEXT", "CONTEXTE")}</span>
            <h2>{headline || text("Today’s finance mechanism", "Le mécanisme financier du jour")}</h2>
            <p>{text("First identify the economic or market mechanism. Do not jump straight to the number: ask what is changing, through which channel, and which asset or company variable should react.", "Identifie d’abord le mécanisme économique ou de marché. Ne saute pas directement au chiffre : demande-toi ce qui change, par quel canal et quelle variable d’actif ou d’entreprise doit réagir.")}</p>
          </article>

          <article className="news-blueprint-panel challenge-step-card">
            <span className="mini-label">02 · {text("CONCEPT", "CONCEPT")}</span>
            <h2>{text("Open the related lesson before you calculate", "Ouvre le cours lié avant de calculer")}</h2>
            <div className="chip-row">
              <Link className="chip" href={`/university/${lesson}`}>{text("Open concept lesson", "Ouvrir le cours")}</Link>
              <Link className="chip" href={professorLink}>{text("Ask AI Professor", "Demander au Professeur IA")}</Link>
            </div>
          </article>

          <article className="news-blueprint-panel challenge-step-card">
            <span className="mini-label">03 · {text("CALCULATION", "CALCUL")}</span>
            <h2>{isFrench ? challenge.fr : challenge.en}</h2>
            <div className="challenge-answer-area">
              <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={text("Type your answer and reasoning", "Écris ta réponse et ton raisonnement")} />
              <div className="chip-row">
                <button type="button" className="chip" onClick={() => setShowHint((value) => !value)}>{showHint ? text("Hide hint", "Masquer l’indice") : text("Show hint", "Voir un indice")}</button>
                <button type="button" className="chip active" onClick={() => setSubmitted(true)}>{text("Submit answer", "Valider la réponse")}</button>
              </div>
            </div>
            {showHint && <p className="challenge-feedback"><strong>{text("Hint:", "Indice :")}</strong> {isFrench ? challenge.hintFr : challenge.hintEn}</p>}
            {submitted && (
              <div className="challenge-correction">
                <strong>{text("Reference answer", "Réponse de référence")}: {challenge.answer}</strong>
                <p>{isFrench ? challenge.explanationFr : challenge.explanationEn}</p>
                {answer && <small>{text("Compare your reasoning with the method above, not only the final number.", "Compare surtout ton raisonnement avec la méthode ci-dessus, pas seulement le chiffre final.")}</small>}
              </div>
            )}
          </article>

          <article className="news-blueprint-panel challenge-step-card">
            <span className="mini-label">04 · {text("INTERVIEW", "ENTRETIEN")}</span>
            <h2>{text("Explain it out loud like a candidate", "Explique-le à voix haute comme en entretien")}</h2>
            <p>{text(`Target role: ${role}. Explain the mechanism, show the calculation, state one assumption and one factor that could change the conclusion.`, `Métier cible : ${role}. Explique le mécanisme, montre le calcul, donne une hypothèse et un facteur qui pourrait changer la conclusion.`)}</p>
            <Link className="full-button" href={`/interview?${new URLSearchParams({ track: role, lesson, source: "daily-challenge", question: `Explain this challenge clearly, including the mechanism, calculation, assumptions and what could invalidate the conclusion: ${challenge.en}` }).toString()}`}>{text("Practice interview answer", "Pratiquer la réponse entretien")} →</Link>
          </article>

          <article className="news-blueprint-panel challenge-step-card">
            <span className="mini-label">05 · {text("INVESTING", "INVESTING")}</span>
            <h2>{text("Turn the mechanism into a testable thesis", "Transforme le mécanisme en thèse testable")}</h2>
            <p>{text("State the catalyst, expected asset reaction, key risk and the data point that would make you change your mind.", "Donne le catalyseur, la réaction attendue de l’actif, le risque principal et la donnée qui te ferait changer d’avis.")}</p>
            <Link className="full-button inverse" href={`/investing?${new URLSearchParams({ source: "daily-challenge", lesson, catalyst: headline || "Daily Finance Challenge", thesis: "Build a testable thesis from this finance mechanism, with catalyst, expected reaction, risk and invalidation trigger." }).toString()}`}>{text("Build investing thesis", "Construire la thèse d’investissement")} →</Link>
          </article>

          <article className="news-blueprint-panel challenge-step-card challenge-finish-card">
            <span className="mini-label">06 · {text("REVIEW", "RÉVISION")}</span>
            <h2>{text("Can you explain it without looking?", "Peux-tu l’expliquer sans regarder ?")}</h2>
            <p>{text("If yes, go back home and mark the challenge complete. If not, use AI Professor for one more explanation in a different style.", "Si oui, retourne à l’accueil et marque le challenge comme terminé. Sinon, utilise le Professeur IA pour une dernière explication avec une autre méthode.")}</p>
            <div className="chip-row">
              <Link className="chip active" href="/">{text("Back to dashboard", "Retour au dashboard")}</Link>
              <Link className="chip" href={professorLink}>{text("Explain another way", "Expliquer autrement")}</Link>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
