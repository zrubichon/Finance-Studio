import { lessons } from "./lesson-registry";

export type DictionaryEntry = {
  en: string;
  fr: string;
  definitionEn: string;
  definitionFr: string;
  beginnerContextEn: string;
  beginnerContextFr: string;
  professionalContextEn: string;
  professionalContextFr: string;
  related: string[];
  sources: Array<{ slug: string; en: string; fr: string }>;
};

function normalizeTerm(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getDictionaryEntries(): DictionaryEntry[] {
  const entries = new Map<string, DictionaryEntry>();

  for (const lesson of lessons) {
    for (const section of lesson.sections) {
      const terms = section.vocabulary ?? [];
      const relatedLabels = terms.map((term) => `${term.en} / ${term.fr}`);

      for (const term of terms) {
        const key = normalizeTerm(term.en);
        if (!key) continue;

        const source = {
          slug: lesson.slug,
          en: lesson.title.en,
          fr: lesson.title.fr,
        };
        const related = relatedLabels
          .filter((label) => !label.toLowerCase().startsWith(term.en.toLowerCase()))
          .slice(0, 5);

        const existing = entries.get(key);
        if (existing) {
          const sourceExists = existing.sources.some((item) => item.slug === lesson.slug);
          if (!sourceExists) existing.sources.push(source);

          for (const label of related) {
            if (!existing.related.includes(label) && existing.related.length < 8) {
              existing.related.push(label);
            }
          }
          continue;
        }

        entries.set(key, {
          en: term.en,
          fr: term.fr,
          definitionEn: term.definition.en,
          definitionFr: term.definition.fr,
          beginnerContextEn: section.explanation.Beginner.en,
          beginnerContextFr: section.explanation.Beginner.fr,
          professionalContextEn: section.explanation.Professional.en,
          professionalContextFr: section.explanation.Professional.fr,
          related,
          sources: [source],
        });
      }
    }
  }

  return [...entries.values()].sort((a, b) => a.en.localeCompare(b.en));
}
