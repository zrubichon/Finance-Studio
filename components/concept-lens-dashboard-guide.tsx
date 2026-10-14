"use client";

import { useLanguage } from "@/components/language-provider";

export default function ConceptLensDashboardGuide() {
  const { text } = useLanguage();

  return (
    <section className="news-blueprint-panel concept-lens-guide-panel">
      <div className="panel-heading">
        <div>
          <span className="mini-label concept-lens-guide-label">✦ {text("NEW · CONCEPT LENS", "NOUVEAU · CONCEPT LENS")}</span>
          <h2>{text("Highlight anything. Turn it into an instant AI study card.", "Surligne n’importe quoi. Transforme-le instantanément en fiche IA.")}</h2>
        </div>
        <span className="connection-badge concept-lens-guide-badge"><span className="status-dot" /> {text("Works across FinanceStudio", "Disponible partout dans FinanceStudio")}</span>
      </div>

      <div className="analysis-grid concept-lens-guide-grid">
        <article className="analysis-card">
          <span className="mini-label">01</span>
          <h3>{text("Highlight a word, phrase or concept", "Surligne un mot, une phrase ou un concept")}</h3>
          <p>{text("On almost any FinanceStudio page, select the text you do not fully understand.", "Sur presque n’importe quelle page FinanceStudio, sélectionne le texte que tu ne comprends pas complètement.")}</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">02</span>
          <h3>{text("Click “Create AI card”", "Clique sur « Créer une fiche IA »")}</h3>
          <p>{text("A large bilingual card opens over the page with a plain-language definition, implications, example, formula and visual explanation when useful.", "Une grande fiche bilingue s’ouvre au-dessus de la page avec définition simple, implications, exemple, formule et explication visuelle si utile.")}</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">03</span>
          <h3>{text("Keep exploring inside the card", "Continue à explorer dans la fiche")}</h3>
          <p>{text("Switch EN/FR, then highlight another unfamiliar word inside the card to open a deeper card. Every opened concept is remembered in Vocabulary.", "Passe de FR à EN, puis surligne un autre mot inconnu directement dans la fiche pour ouvrir une fiche plus profonde. Chaque concept ouvert est mémorisé dans Vocabulaire.")}</p>
        </article>
      </div>

      <div className="professor-review-strip concept-lens-guide-rule">
        <div>
          <span className="mini-label">{text("PLAIN-LANGUAGE RULE", "RÈGLE D’EXPLICATION")}</span>
          <h2>{text("No unexplained chart, rate or visual.", "Aucun graphique, taux ou visuel sans explication.")}</h2>
        </div>
        <p>{text("Whenever FinanceStudio shows a graph, causal diagram, rate difference or visual comparison, the explanation must tell you what every label means, why the values differ, which direction matters and how to read the result in plain language.", "Dès que FinanceStudio montre un graphique, un schéma causal, une différence de taux ou une comparaison visuelle, l’explication doit préciser ce que signifie chaque légende, pourquoi les valeurs diffèrent, quel sens du mouvement compte et comment lire le résultat simplement.")}</p>
      </div>
    </section>
  );
}
