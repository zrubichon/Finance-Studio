"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { professorHref } from "@/lib/learning-bridge";

function localDayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const concepts = [
  {
    titleEn: "Duration: why bond prices move when yields move",
    titleFr: "Duration : pourquoi le prix des obligations bouge avec les yields",
    lesson: "year-2-duration-convexity",
    whyEn: "Duration is one of the fastest ways to translate a rate move into an approximate bond-price impact. It is essential for rates, fixed income, portfolio risk and many interview questions.",
    whyFr: "La duration permet de traduire rapidement un mouvement de taux en impact approximatif sur le prix d’une obligation. C’est essentiel en rates, fixed income, gestion de portefeuille et entretien.",
    mechanismEn: "When market yields rise, existing fixed coupons become less attractive, so the bond price falls. Duration measures the first-order sensitivity of price to a yield change.",
    mechanismFr: "Quand les yields de marché montent, les coupons fixes existants deviennent moins attractifs, donc le prix de l’obligation baisse. La duration mesure cette sensibilité au premier ordre.",
    formula: "ΔPrice ≈ −Duration × ΔYield",
    exampleEn: "A bond with duration 5 faces a +40 bps yield move. 40 bps = 0.40%, so estimated price impact ≈ −5 × 0.40% = −2.0%.",
    exampleFr: "Une obligation de duration 5 subit une hausse de yield de +40 bps. 40 bps = 0,40 %, donc l’impact estimé ≈ −5 × 0,40 % = −2,0 %.",
    questionEn: "A bond has duration 7 and yields rise by 25 bps. Estimate the first-order price move.",
    questionFr: "Une obligation a une duration de 7 et les yields montent de 25 bps. Estime le mouvement de prix au premier ordre.",
    answer: "-1.75%",
    hintEn: "Convert 25 bps to 0.25%, then multiply by 7 and reverse the sign.",
    hintFr: "Convertis 25 bps en 0,25 %, multiplie par 7 puis inverse le signe.",
    correctionEn: "−7 × 0.25% = −1.75%. This is only a first-order estimate; convexity improves the estimate for larger moves.",
    correctionFr: "−7 × 0,25 % = −1,75 %. C’est une estimation au premier ordre ; la convexité améliore l’estimation pour de plus grands mouvements.",
  },
  {
    titleEn: "Enterprise value vs equity value",
    titleFr: "Enterprise value vs equity value",
    lesson: "year-1-company-valuation-basics",
    whyEn: "This distinction tells you what part of a business belongs only to shareholders versus the value of the operating business available to all capital providers.",
    whyFr: "Cette distinction sépare la valeur revenant uniquement aux actionnaires de la valeur de l’activité opérationnelle disponible pour tous les apporteurs de capitaux.",
    mechanismEn: "Equity value belongs to shareholders. Enterprise value adds financing claims such as debt and subtracts excess cash because cash reduces the net price paid for the operations.",
    mechanismFr: "L’equity value revient aux actionnaires. L’enterprise value ajoute les créances de financement comme la dette et retire l’excès de cash car il réduit le prix net payé pour l’activité.",
    formula: "EV ≈ Equity Value + Debt − Cash",
    exampleEn: "$800m equity value + $300m debt − $100m cash = $1.0bn enterprise value. If EBITDA is $100m, EV/EBITDA = 10.0x.",
    exampleFr: "800 M$ d’equity value + 300 M$ de dette − 100 M$ de cash = 1,0 Md$ d’enterprise value. Avec 100 M$ d’EBITDA, EV/EBITDA = 10,0x.",
    questionEn: "A company has $1.2bn equity value, $450m debt and $150m cash. What is enterprise value?",
    questionFr: "Une entreprise a 1,2 Md$ d’equity value, 450 M$ de dette et 150 M$ de cash. Quelle est son enterprise value ?",
    answer: "$1.5bn",
    hintEn: "Add debt because debt holders also finance the enterprise; subtract cash because it reduces net purchase price.",
    hintFr: "Ajoute la dette car les créanciers financent aussi l’entreprise ; retire le cash car il réduit le prix net d’achat.",
    correctionEn: "$1.2bn + $0.45bn − $0.15bn = $1.5bn. This value is consistent with operating metrics such as EBITDA, unlike equity value.",
    correctionFr: "1,2 + 0,45 − 0,15 = 1,5 Md$. Cette valeur est cohérente avec des métriques opérationnelles comme l’EBITDA, contrairement à l’equity value.",
  },
  {
    titleEn: "Yield curve: what 2Y vs 10Y tells you",
    titleFr: "Yield curve : ce que le 2Y vs 10Y te dit",
    lesson: "year-2-yield-curve",
    whyEn: "The 2Y reacts strongly to expected Fed policy while the 10Y also reflects longer-run growth, inflation and term premium. The spread helps you read macro repricing.",
    whyFr: "Le 2Y réagit fortement aux anticipations de Fed tandis que le 10Y intègre aussi croissance, inflation de long terme et term premium. Le spread aide à lire le repricing macro.",
    mechanismEn: "A curve steepens when the gap between long and short yields widens. It flattens when that gap narrows.",
    mechanismFr: "La courbe se steepen lorsque l’écart entre taux longs et courts augmente. Elle se flatten lorsque cet écart se réduit.",
    formula: "2s10s spread = 10Y yield − 2Y yield",
    exampleEn: "If 2Y = 4.20% and 10Y = 4.70%, 2s10s = +50 bps. If the 2Y falls to 3.90% while 10Y stays at 4.70%, the spread steepens to +80 bps.",
    exampleFr: "Si le 2Y = 4,20 % et le 10Y = 4,70 %, le 2s10s = +50 bps. Si le 2Y baisse à 3,90 % et le 10Y reste à 4,70 %, le spread steepen à +80 bps.",
    questionEn: "The 2Y is 4.10% and the 10Y is 4.55%. What is the 2s10s spread?",
    questionFr: "Le 2Y est à 4,10 % et le 10Y à 4,55 %. Quel est le spread 2s10s ?",
    answer: "+45 bps",
    hintEn: "Subtract the 2Y yield from the 10Y yield.",
    hintFr: "Soustrais le yield 2Y du yield 10Y.",
    correctionEn: "4.55% − 4.10% = 0.45 percentage point = +45 bps. A positive spread means the 10Y yield is above the 2Y yield.",
    correctionFr: "4,55 % − 4,10 % = 0,45 point = +45 bps. Un spread positif signifie que le 10Y est au-dessus du 2Y.",
  },
  {
    titleEn: "Implied stock upside and target prices",
    titleFr: "Upside implicite et target prices",
    lesson: "year-1-stocks-bonds-etfs-funds",
    whyEn: "A target price is only useful when you translate it into return potential relative to today’s price and then compare that upside with risk.",
    whyFr: "Un target price n’est utile que si tu le transformes en potentiel de rendement par rapport au prix actuel puis compares cet upside au risque.",
    mechanismEn: "Upside measures the percentage gain from current price to target price. The denominator is today’s price because that is the capital invested now.",
    mechanismFr: "L’upside mesure le gain en pourcentage entre le prix actuel et le target price. Le dénominateur est le prix actuel car c’est le capital investi aujourd’hui.",
    formula: "Upside = (Target Price − Current Price) / Current Price",
    exampleEn: "$80 current price and $100 target imply ($100 − $80) / $80 = 25% upside.",
    exampleFr: "80 $ aujourd’hui et 100 $ de target impliquent (100 − 80) / 80 = 25 % d’upside.",
    questionEn: "A stock trades at $64 and your target price is $76.80. What is the implied upside?",
    questionFr: "Une action cote 64 $ et ton target price est 76,80 $. Quel est l’upside implicite ?",
    answer: "20%",
    hintEn: "Calculate the $12.80 gain relative to the $64 current price.",
    hintFr: "Calcule le gain de 12,80 $ par rapport au prix actuel de 64 $.",
    correctionEn: "($76.80 − $64) / $64 = $12.80 / $64 = 20%. The next question is whether 20% is enough compensation for the forecast risk.",
    correctionFr: "(76,80 − 64) / 64 = 12,80 / 64 = 20 %. La question suivante est de savoir si 20 % rémunère suffisamment le risque de prévision.",
  },
  {
    titleEn: "WACC and why higher discount rates lower valuation",
    titleFr: "WACC et pourquoi un discount rate plus élevé réduit la valorisation",
    lesson: "year-3-dcf-valuation",
    whyEn: "WACC connects financing risk to valuation. It is the rate used to discount unlevered free cash flow in a DCF.",
    whyFr: "Le WACC relie le risque de financement à la valorisation. C’est le taux utilisé pour actualiser l’unlevered free cash flow dans un DCF.",
    mechanismEn: "A higher required return makes future cash flows worth less today. Therefore, all else equal, a higher WACC lowers enterprise value.",
    mechanismFr: "Un rendement exigé plus élevé réduit la valeur actuelle des cash flows futurs. Donc, toutes choses égales par ailleurs, un WACC plus élevé baisse l’enterprise value.",
    formula: "PV = Future Cash Flow / (1 + WACC)^t",
    exampleEn: "$110 received in one year is worth $100 today at a 10% discount rate because $110 / 1.10 = $100.",
    exampleFr: "110 $ reçus dans un an valent 100 $ aujourd’hui avec un discount rate de 10 % car 110 / 1,10 = 100.",
    questionEn: "$121 of cash flow arrives in two years. At a 10% discount rate, what is its present value?",
    questionFr: "121 $ de cash flow arrivent dans deux ans. Avec un discount rate de 10 %, quelle est leur valeur actuelle ?",
    answer: "$100",
    hintEn: "Discount twice: divide by 1.10².",
    hintFr: "Actualise deux fois : divise par 1,10².",
    correctionEn: "$121 / 1.10² = $121 / 1.21 = $100. Raising the discount rate would reduce that present value further.",
    correctionFr: "121 / 1,10² = 121 / 1,21 = 100 $. Augmenter le discount rate réduirait encore cette valeur actuelle.",
  },
  {
    titleEn: "Portfolio return: weighted averages",
    titleFr: "Rendement de portefeuille : moyenne pondérée",
    lesson: "year-1-portfolio-basics",
    whyEn: "Portfolio returns depend on both asset returns and their weights. This is the base logic behind allocation, attribution and risk budgeting.",
    whyFr: "Le rendement d’un portefeuille dépend des rendements des actifs et de leurs poids. C’est la base de l’allocation, de l’attribution et du risk budgeting.",
    mechanismEn: "Each asset contributes its return multiplied by its portfolio weight. The total portfolio return is the sum of those contributions.",
    mechanismFr: "Chaque actif contribue par son rendement multiplié par son poids dans le portefeuille. Le rendement total est la somme de ces contributions.",
    formula: "Portfolio return = Σ(weight × asset return)",
    exampleEn: "60% equities at 8% and 40% bonds at 3% gives 0.60×8% + 0.40×3% = 6.0%.",
    exampleFr: "60 % d’actions à 8 % et 40 % d’obligations à 3 % donnent 0,60×8 % + 0,40×3 % = 6,0 %.",
    questionEn: "A portfolio is 70% equities returning 6% and 30% bonds returning 2%. What is total return?",
    questionFr: "Un portefeuille est composé à 70 % d’actions rapportant 6 % et 30 % d’obligations rapportant 2 %. Quel est le rendement total ?",
    answer: "4.8%",
    hintEn: "Calculate each contribution separately, then add them.",
    hintFr: "Calcule chaque contribution séparément puis additionne-les.",
    correctionEn: "0.70×6% = 4.2% and 0.30×2% = 0.6%; total = 4.8%.",
    correctionFr: "0,70×6 % = 4,2 % et 0,30×2 % = 0,6 % ; total = 4,8 %.",
  },
];

export default function ChallengePage() {
  const { isFrench, text } = useLanguage();
  const params = useSearchParams();
  const role = params.get("role") || "Finance";
  const headline = params.get("headline");
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const concept = useMemo(() => {
    const seed = [...localDayKey()].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return concepts[seed % concepts.length];
  }, []);

  const professorLink = professorHref({
    lessonSlug: concept.lesson,
    question: `Teach me today's FinanceStudio challenge concept step by step, with intuition, formula, a worked example and one verification question: ${concept.titleEn}`,
    source: "lesson",
  });

  return (
    <main className="daily-challenge-page">
      <Link href="/" className="challenge-close" aria-label={text("Close challenge", "Fermer le challenge")}>×</Link>
      <section className="daily-challenge-wrap">
        <header className="daily-challenge-hero">
          <div>
            <span className="mini-label">{text("DAILY FINANCE CHALLENGE", "CHALLENGE FINANCE DU JOUR")}</span>
            <h1>{isFrench ? concept.titleFr : concept.titleEn}</h1>
            <p>{text("One concept per day. Learn the mechanism, see a worked example, calculate it yourself, then turn it into interview and investing reasoning.", "Un concept par jour. Comprends le mécanisme, regarde un exemple corrigé, calcule toi-même puis transforme-le en raisonnement entretien et investissement.")}</p>
          </div>
          <div className="daily-concept-chip">{text("Today’s concept", "Concept du jour")}</div>
        </header>

        <section className="challenge-roadmap">
          <article><b>1</b><span>{text("Understand", "Comprendre")}</span></article>
          <article><b>2</b><span>{text("See an example", "Voir un exemple")}</span></article>
          <article><b>3</b><span>{text("Calculate", "Calculer")}</span></article>
          <article><b>4</b><span>{text("Explain", "Expliquer")}</span></article>
          <article><b>5</b><span>{text("Apply", "Appliquer")}</span></article>
        </section>

        <section className="challenge-grid-wide">
          <article className="challenge-learning-card">
            <span className="mini-label">01 · {text("WHY THIS MATTERS", "POURQUOI C’EST IMPORTANT")}</span>
            <p>{isFrench ? concept.whyFr : concept.whyEn}</p>
            {headline && <div className="challenge-context-note"><strong>{text("Context", "Contexte")}</strong><span>{headline}</span></div>}
          </article>
          <article className="challenge-learning-card">
            <span className="mini-label">02 · {text("MECHANISM", "MÉCANISME")}</span>
            <p>{isFrench ? concept.mechanismFr : concept.mechanismEn}</p>
            <div className="challenge-formula">{concept.formula}</div>
          </article>
        </section>

        <article className="challenge-learning-card challenge-worked-example">
          <span className="mini-label">03 · {text("WORKED EXAMPLE", "EXEMPLE CORRIGÉ")}</span>
          <h2>{text("See the logic before doing it yourself", "Comprends la logique avant de le faire toi-même")}</h2>
          <p>{isFrench ? concept.exampleFr : concept.exampleEn}</p>
          <div className="chip-row">
            <Link className="chip" href={`/university/${concept.lesson}`}>{text("Open related lesson", "Ouvrir le cours lié")}</Link>
            <Link className="chip" href={professorLink}>{text("Ask AI Professor", "Demander au Professeur IA")}</Link>
          </div>
        </article>

        <article className="challenge-learning-card challenge-practice-card">
          <span className="mini-label">04 · {text("YOUR TURN", "À TOI")}</span>
          <h2>{isFrench ? concept.questionFr : concept.questionEn}</h2>
          <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={text("Write the answer and one sentence explaining your reasoning…", "Écris la réponse et une phrase expliquant ton raisonnement…")} />
          <div className="chip-row">
            <button type="button" className="chip" onClick={() => setShowHint((value) => !value)}>{showHint ? text("Hide hint", "Masquer l’indice") : text("Show hint", "Voir un indice")}</button>
            <button type="button" className="chip active" onClick={() => setSubmitted(true)}>{text("Check my reasoning", "Vérifier mon raisonnement")}</button>
          </div>
          {showHint && <div className="challenge-feedback"><strong>{text("Hint", "Indice")}</strong><p>{isFrench ? concept.hintFr : concept.hintEn}</p></div>}
          {submitted && <div className="challenge-correction"><strong>{text("Reference answer", "Réponse de référence")}: {concept.answer}</strong><p>{isFrench ? concept.correctionFr : concept.correctionEn}</p></div>}
        </article>

        <section className="challenge-grid-wide">
          <article className="challenge-learning-card">
            <span className="mini-label">05 · {text("INTERVIEW TRANSFER", "TRANSFERT ENTRETIEN")}</span>
            <h2>{text("Explain the concept in 60 seconds", "Explique le concept en 60 secondes")}</h2>
            <p>{text(`Target role: ${role}. Define the concept, state the formula or causal chain, use today's numerical example, then finish with one limitation or caveat.`, `Métier cible : ${role}. Définis le concept, donne la formule ou la chaîne causale, utilise l’exemple chiffré du jour puis termine avec une limite ou un caveat.`)}</p>
            <Link className="full-button" href={`/interview?${new URLSearchParams({ track: role, lesson: concept.lesson, source: "daily-challenge", question: `Explain ${concept.titleEn} in an interview-ready way with a numerical example and one caveat.` }).toString()}`}>{text("Practice this interview answer", "Pratiquer cette réponse") } →</Link>
          </article>
          <article className="challenge-learning-card">
            <span className="mini-label">06 · {text("INVESTING TRANSFER", "TRANSFERT INVESTING")}</span>
            <h2>{text("Turn knowledge into a testable view", "Transforme la connaissance en vue testable")}</h2>
            <p>{text("Ask: what variable changes, which asset or company reacts, what is the expected direction, and what data point would invalidate the thesis?", "Demande-toi : quelle variable change, quel actif ou quelle entreprise réagit, quelle direction est attendue et quelle donnée invaliderait la thèse ?")}</p>
            <Link className="full-button inverse" href={`/investing?${new URLSearchParams({ source: "daily-challenge", lesson: concept.lesson, catalyst: concept.titleEn, thesis: `Build a testable investment thesis from today's concept: ${concept.titleEn}.` }).toString()}`}>{text("Build a thesis", "Construire une thèse")} →</Link>
          </article>
        </section>

        <footer className="challenge-finish-bar">
          <div><strong>{text("Finished?", "Terminé ?")}</strong><span>{text("If you can explain the concept without looking, the loop is complete.", "Si tu peux expliquer le concept sans regarder, la boucle est terminée.")}</span></div>
          <Link href="/" className="chip active">{text("Back to dashboard", "Retour au dashboard")} →</Link>
        </footer>
      </section>
    </main>
  );
}
