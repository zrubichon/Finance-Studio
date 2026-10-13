import type { FinanceLesson, LocalizedText } from "./lesson-content";

type TopicSpec = {
  id: string;
  title: string;
  titleFr: string;
  facts: string[];
  factsFr: string[];
  formula?: { label: string; labelFr: string; expression: string; explanation: string; explanationFr: string };
  vocab?: [string, string, string, string][];
};

type AdvancedLessonSpec = {
  slug: string;
  year: 1 | 2 | 3 | 4;
  domain: string;
  domainFr: string;
  title: string;
  titleFr: string;
  subtitle: string;
  subtitleFr: string;
  duration?: string;
  prerequisites: string[];
  prerequisitesFr: string[];
  objectives: string[];
  objectivesFr: string[];
  topics: TopicSpec[];
  interviewQuestion: string;
  interviewQuestionFr: string;
  interviewFramework: string[];
  interviewFrameworkFr: string[];
  interviewSample: string;
  interviewSampleFr: string;
};

const t = (en: string, fr: string): LocalizedText => ({ en, fr });

const yearLabels: Record<AdvancedLessonSpec["year"], { en: string; fr: string }> = {
  1: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations / Foundations" },
  2: { en: "Year 2 · Core Finance", fr: "Année 2 · Finance fondamentale / Core Finance" },
  3: { en: "Year 3 · Applied Finance", fr: "Année 3 · Finance appliquée / Applied Finance" },
  4: { en: "Year 4 · Professional Finance", fr: "Année 4 · Finance professionnelle / Professional Finance" },
};

export function buildAdvancedLesson(spec: AdvancedLessonSpec): FinanceLesson {
  const yearLabel = yearLabels[spec.year].en;
  const yearLabelFr = yearLabels[spec.year].fr;

  const sections = spec.topics.map((topic, index) => {
    const facts = topic.facts.map((fact, i) => t(fact, topic.factsFr[i] ?? fact));
    const vocab = (topic.vocab ?? []).map(([en, fr, defEn, defFr]) => ({ en, fr, definition: t(defEn, defFr) }));
    const beginner = topic.facts[0] ?? topic.title;
    const intermediate = `${topic.facts[0] ?? topic.title} ${topic.facts[1] ?? "Connect the concept to the relevant cash flow, price, incentive or risk."}`;
    const professional = `${topic.facts.join(" ")} At professional level, make assumptions explicit, quantify the important relationships and explain which evidence would confirm or invalidate the conclusion.`;
    const beginnerFr = topic.factsFr[0] ?? topic.titleFr;
    const intermediateFr = `${topic.factsFr[0] ?? topic.titleFr} ${topic.factsFr[1] ?? "Relie le concept au cash flow, au prix, à l’incitation ou au risque pertinent."}`;
    const professionalFr = `${topic.factsFr.join(" ")} Au niveau professionnel, rends les hypothèses explicites, quantifie les relations importantes et précise quelles preuves confirmeraient ou invalideraient la conclusion.`;

    return {
      id: topic.id,
      kicker: t(`${String(index + 1).padStart(2, "0")} · ${topic.title.toUpperCase()}`, `${String(index + 1).padStart(2, "0")} · ${topic.titleFr.toUpperCase()}`),
      title: t(topic.title, topic.titleFr),
      coreFacts: facts,
      explanation: {
        Beginner: t(beginner, beginnerFr),
        Intermediate: t(intermediate, intermediateFr),
        Professional: t(professional, professionalFr),
      },
      formula: topic.formula
        ? {
            label: t(topic.formula.label, topic.formula.labelFr),
            expression: topic.formula.expression,
            explanation: t(topic.formula.explanation, topic.formula.explanationFr),
          }
        : undefined,
      vocabulary: vocab.length ? vocab : undefined,
    };
  });

  const quiz = spec.topics.slice(0, 8).map((topic, index) => ({
    id: `q${index + 1}`,
    conceptKey: topic.id,
    question: t(`Which statement best captures ${topic.title.toLowerCase()}?`, `Quelle affirmation décrit le mieux ${topic.titleFr.toLowerCase()} ?`),
    options: [
      { id: "a", label: t(topic.facts[0] ?? topic.title, topic.factsFr[0] ?? topic.titleFr) },
      { id: "b", label: t("It removes uncertainty and guarantees the outcome.", "Cela supprime l’incertitude et garantit le résultat.") },
      { id: "c", label: t("It can be evaluated without considering cash flows, prices, incentives or risk.", "Cela peut être évalué sans considérer cash flows, prix, incitations ou risque.") },
      { id: "d", label: t("It matters only for historical reporting and never for decisions.", "Cela ne compte que pour le reporting historique et jamais pour les décisions.") },
    ],
    correctOption: "a",
    explanation: t(topic.facts[0] ?? topic.title, topic.factsFr[0] ?? topic.titleFr),
  }));

  return {
    slug: spec.slug,
    year: t(yearLabel, yearLabelFr),
    domain: t(spec.domain, spec.domainFr),
    title: t(spec.title, spec.titleFr),
    subtitle: t(spec.subtitle, spec.subtitleFr),
    duration: t(spec.duration ?? "150–190 min", spec.duration ?? "150–190 min"),
    prerequisites: spec.prerequisites.map((x, i) => t(x, spec.prerequisitesFr[i] ?? x)),
    objectives: spec.objectives.map((x, i) => t(x, spec.objectivesFr[i] ?? x)),
    overviewFlow: {
      title: t(`Professional workflow for ${spec.title}`, `Workflow professionnel pour ${spec.titleFr}`),
      steps: spec.topics.slice(0, 5).map((topic, index) => ({
        title: t(`Step ${index + 1}`, `Étape ${index + 1}`),
        detail: t(topic.title, topic.titleFr),
      })),
    },
    sections,
    quiz,
    interviewPrompt: {
      question: t(spec.interviewQuestion, spec.interviewQuestionFr),
      framework: spec.interviewFramework.map((x, i) => t(x, spec.interviewFrameworkFr[i] ?? x)),
      sample: t(spec.interviewSample, spec.interviewSampleFr),
    },
  };
}
