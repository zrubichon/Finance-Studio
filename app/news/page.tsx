"use client";

import SectionLayout from "@/components/section-layout";
import { useLanguage } from "@/components/language-provider";
import LiveFinancialJournal from "@/components/live-financial-journal";

type Localized = { en: string; fr: string };

const analysisSteps: { number: string; title: Localized; body: Localized }[] = [
  { number: "01", title: { en: "What happened?", fr: "Que s’est-il passé ?" }, body: { en: "Facts, time, geography, institutions, companies and the exact market event.", fr: "Faits, date, géographie, institutions, entreprises et événement de marché exact." } },
  { number: "02", title: { en: "What caused it?", fr: "Qu’est-ce qui l’a provoqué ?" }, body: { en: "Separate the immediate catalyst from deeper macro, policy, earnings, positioning or geopolitical drivers.", fr: "Séparer le catalyseur immédiat / immediate catalyst des moteurs plus profonds : macro, politique monétaire, résultats / earnings, positionnement / positioning ou géopolitique." } },
  { number: "03", title: { en: "Why does it matter?", fr: "Pourquoi est-ce important ?" }, body: { en: "Explain the financial mechanism instead of assuming the reader already knows it.", fr: "Expliquer le mécanisme financier au lieu de supposer que le lecteur le connaît déjà." } },
  { number: "04", title: { en: "What moved?", fr: "Qu’est-ce qui a bougé ?" }, body: { en: "Map the reaction across equities, rates, FX, commodities, volatility and credit.", fr: "Cartographier la réaction des actions / equities, taux / rates, devises / FX, matières premières / commodities, volatilité / volatility et crédit / credit." } },
  { number: "05", title: { en: "Why did each asset react?", fr: "Pourquoi chaque actif a-t-il réagi ?" }, body: { en: "Connect price action to discount rates, growth, inflation, cash flows, risk premia and expectations.", fr: "Relier le mouvement de prix / price action aux taux d’actualisation / discount rates, à la croissance, l’inflation, aux flux de trésorerie / cash flows, primes de risque / risk premia et anticipations / expectations." } },
  { number: "06", title: { en: "What is connected?", fr: "À quoi cette histoire est-elle reliée ?" }, body: { en: "Link the story to previous events, companies, countries, sectors and Finance University lessons.", fr: "Relier l’histoire aux événements précédents, entreprises, pays, secteurs et cours de l’Université de Finance." } },
  { number: "07", title: { en: "What comes next?", fr: "Que faut-il surveiller ensuite ?" }, body: { en: "List the next data, speeches, earnings, votes, policy decisions or other catalysts to monitor.", fr: "Lister les prochaines données, interventions, résultats / earnings, votes, décisions de politique ou autres catalyseurs / catalysts à surveiller." } },
  { number: "08", title: { en: "Scenario map", fr: "Carte des scénarios / scenario map" }, body: { en: "Show plausible branches and what evidence would support each one, without presenting a forecast as fact.", fr: "Présenter les branches plausibles et les éléments qui soutiendraient chacune, sans présenter une prévision / forecast comme un fait." } },
];

const coverage: Localized[] = [
  { en: "Central banks & monetary policy", fr: "Banques centrales / central banks & politique monétaire" },
  { en: "Inflation, labor & growth", fr: "Inflation, emploi / labor & croissance / growth" },
  { en: "Equities & earnings", fr: "Actions / equities & résultats / earnings" },
  { en: "Rates & sovereign debt", fr: "Taux / rates & dette souveraine / sovereign debt" },
  { en: "Credit markets", fr: "Marchés du crédit / credit markets" },
  { en: "FX & currencies", fr: "Devises / FX & currencies" },
  { en: "Energy & commodities", fr: "Énergie & matières premières / commodities" },
  { en: "M&A, IPOs & capital markets", fr: "M&A, IPO & marchés de capitaux / capital markets" },
  { en: "Banking & financial institutions", fr: "Banques & institutions financières" },
  { en: "Private markets", fr: "Marchés privés / private markets" },
  { en: "Regulation", fr: "Réglementation / regulation" },
  { en: "Geopolitics with financial impact", fr: "Géopolitique à impact financier" },
  { en: "Technology & AI in markets", fr: "Technologie & IA sur les marchés" },
  { en: "Digital assets", fr: "Actifs numériques / digital assets" },
];

const sourceLayers: { title: Localized; body: Localized }[] = [
  { title: { en: "Primary", fr: "Sources primaires / primary" }, body: { en: "Central banks, regulators, statistical agencies, company filings, earnings releases and investor relations.", fr: "Banques centrales, régulateurs, instituts statistiques, documents réglementaires / company filings, publications de résultats / earnings releases et relations investisseurs." } },
  { title: { en: "High-quality reporting", fr: "Presse financière de qualité / high-quality reporting" }, body: { en: "Reputable financial journalism used for context, interviews and verified reporting around the primary facts.", fr: "Journalisme financier réputé utilisé pour le contexte, les interviews et les informations vérifiées autour des faits primaires." } },
  { title: { en: "FinanceStudio analysis", fr: "Analyse FinanceStudio" }, body: { en: "Original educational synthesis that clearly separates facts, interpretation and possible scenarios.", fr: "Synthèse pédagogique originale qui sépare clairement les faits, l’interprétation et les scénarios possibles." } },
];

export default function NewsPage() {
  const { isFrench, text } = useLanguage();
  const local = (value: Localized) => isFrench ? value.fr : value.en;
  return (
    <SectionLayout
      activeSlug="news"
      eyebrow={{ en: "FINANCE INTELLIGENCE", fr: "INTELLIGENCE FINANCIÈRE" }}
      title={{ en: "Your live financial journal: news, transmission and what comes next.", fr: "Ton journal financier en direct : actualité, transmission et ce qui vient ensuite." }}
      description={{ en: "A continuously refreshed finance and geopolitics journal that separates reporting from analysis, explains market transmission channels and shows the evidence, assets and catalysts to monitor next.", fr: "Un journal finance et géopolitique actualisé automatiquement, qui sépare le reporting de l’analyse, explique les canaux de transmission vers les marchés et montre les preuves, actifs et catalyseurs à surveiller ensuite." }}
    >
      <div className="workspace-stack">
        <LiveFinancialJournal />

        <section className="news-blueprint-panel">
          <div className="panel-heading"><div><span className="mini-label">{text("ARTICLE BLUEPRINT", "STRUCTURE D’ANALYSE")}</span><h2>{text("Every important story follows the same reasoning architecture", "Chaque actualité importante suit la même architecture de raisonnement")}</h2></div><span className="connection-badge"><span className="status-dot" /> {text("reasoning framework", "cadre de raisonnement")}</span></div>
          <div className="news-analysis-grid">{analysisSteps.map((step) => <article className="news-analysis-step" key={step.number}><span>{step.number}</span><div><strong>{local(step.title)}</strong><p>{local(step.body)}</p></div></article>)}</div>
        </section>

        <section className="news-two-column">
          <article className="coverage-panel"><span className="mini-label">{text("GLOBAL COVERAGE", "COUVERTURE MONDIALE")}</span><h2>{text("USA + Europe priority, with a global lens", "Priorité USA + Europe, avec une vision mondiale")}</h2><div className="coverage-chips">{coverage.map((item) => <span key={item.en}>{local(item)}</span>)}</div></article>
          <article className="coverage-panel">
            <span className="mini-label">{text("REGION FILTER METHOD", "MÉTHODE DU FILTRE RÉGIONAL")}</span>
            <h2>{text("A real filter, with its limitation stated clearly", "Un vrai filtre, avec sa limite indiquée clairement")}</h2>
            <p>{text(
              "The live feed now filters by the publisher country returned by GDELT. My Markets reuses your Account market-region preferences. This is useful for comparing reporting ecosystems, but source country is not the same thing as the geography of the underlying event.",
              "Le flux en direct filtre désormais selon le pays du média renvoyé par GDELT. Mes marchés réutilise les régions choisies dans ton compte. C’est utile pour comparer les écosystèmes de reporting, mais le pays de la source n’est pas la même chose que la géographie de l’événement sous-jacent.",
            )}</p>
          </article>
        </section>

        <section className="source-panel"><div><span className="mini-label">{text("SOURCE DISCIPLINE", "DISCIPLINE DES SOURCES")}</span><h2>{text("Facts and analysis must never be blended invisibly.", "Les faits et l’analyse ne doivent jamais être mélangés de façon invisible.")}</h2></div><div className="source-layer-grid">{sourceLayers.map((layer, index) => <article key={layer.title.en}><span>0{index + 1}</span><strong>{local(layer.title)}</strong><p>{local(layer.body)}</p></article>)}</div></section>
      </div>
    </SectionLayout>
  );
}
