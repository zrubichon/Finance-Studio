import SectionLayout from "@/components/section-layout";
import DictionaryExplorer from "@/components/dictionary-explorer";
import { getDictionaryEntries } from "@/lib/dictionary-content";

export default function DictionaryPage() {
  const entries = getDictionaryEntries();

  return (
    <SectionLayout
      activeSlug="dictionary"
      eyebrow={{ en: "FINANCE DICTIONARY", fr: "DICTIONNAIRE DE FINANCE" }}
      title={{ en: "Build bilingual professional vocabulary.", fr: "Construis un vocabulaire professionnel bilingue." }}
      description={{
        en: "Definitions connect French and English terms, formulas, examples, related concepts, interview use and real market context.",
        fr: "Chaque définition relie le terme français au terme anglais, aux formules, exemples, concepts associés, à son usage en entretien et à son contexte réel de marché.",
      }}
    >
      <DictionaryExplorer entries={entries} />
    </SectionLayout>
  );
}
