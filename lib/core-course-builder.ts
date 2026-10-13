import { buildAdvancedLesson } from "./advanced-course-builder";

export type CoreTopic = {
  id: string;
  en: string;
  fr: string;
  fact: string;
  factFr: string;
  second?: string;
  secondFr?: string;
  formula?: { label: string; labelFr: string; expression: string; explanation: string; explanationFr: string };
  vocab?: [string, string, string, string][];
};

export type CoreLessonSpec = {
  slug: string;
  year: 1 | 2;
  domain: string;
  domainFr: string;
  title: string;
  titleFr: string;
  subtitle: string;
  subtitleFr: string;
  prerequisites?: string[];
  prerequisitesFr?: string[];
  objectives: string[];
  objectivesFr: string[];
  topics: CoreTopic[];
  interviewQuestion: string;
  interviewQuestionFr: string;
  interviewSample: string;
  interviewSampleFr: string;
  duration?: string;
};

export function buildCoreLesson(spec: CoreLessonSpec) {
  const framework = spec.topics.slice(0, 5).map((topic) => `Explain ${topic.en.toLowerCase()} and connect it to the decision.`);
  const frameworkFr = spec.topics.slice(0, 5).map((topic) => `Explique ${topic.fr.toLowerCase()} et relie-le à la décision.`);

  return buildAdvancedLesson({
    slug: spec.slug,
    year: spec.year,
    domain: spec.domain,
    domainFr: spec.domainFr,
    title: spec.title,
    titleFr: spec.titleFr,
    subtitle: spec.subtitle,
    subtitleFr: spec.subtitleFr,
    duration: spec.duration ?? (spec.year === 1 ? "140–180 min" : "160–200 min"),
    prerequisites: spec.prerequisites ?? [],
    prerequisitesFr: spec.prerequisitesFr ?? [],
    objectives: spec.objectives,
    objectivesFr: spec.objectivesFr,
    topics: spec.topics.map((topic) => ({
      id: topic.id,
      title: topic.en,
      titleFr: topic.fr,
      facts: [topic.fact, topic.second ?? `Use this concept to interpret a financial decision, price or risk exposure.`],
      factsFr: [topic.factFr, topic.secondFr ?? `Utilise ce concept pour interpréter une décision, un prix ou une exposition au risque.`],
      formula: topic.formula,
      vocab: topic.vocab,
    })),
    interviewQuestion: spec.interviewQuestion,
    interviewQuestionFr: spec.interviewQuestionFr,
    interviewFramework: framework,
    interviewFrameworkFr: frameworkFr,
    interviewSample: spec.interviewSample,
    interviewSampleFr: spec.interviewSampleFr,
  });
}
