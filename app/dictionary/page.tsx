import SectionLayout from "@/components/section-layout";
import DictionaryExplorerV2 from "@/components/dictionary-explorer-v2";
import AiVocabularyMemory from "@/components/ai-vocabulary-memory";
import { getDictionaryEntries } from "@/lib/dictionary-content";

export default function DictionaryPage() {
  const entries = getDictionaryEntries();

  return (
    <SectionLayout
      activeSlug="dictionary"
      eyebrow={{ en: "FINANCE DICTIONARY", fr: "DICTIONNAIRE DE FINANCE" }}
      title={{ en: "Build bilingual professional vocabulary.", fr: "Construis un vocabulaire professionnel bilingue." }}
      description={{
        en: "Every term is presented once in English and once in French, with acronym expansions where relevant. Open any term to turn it into a detailed study sheet with adjustable explanation depth.",
        fr: "Chaque terme est présenté une fois en anglais et une fois en français, avec le développement des abréviations lorsqu'il est pertinent. Ouvre n'importe quel terme pour en faire une fiche d'étude détaillée avec un niveau d'explication réglable.",
      }}
    >
      <AiVocabularyMemory />
      <DictionaryExplorerV2 entries={entries} />
    </SectionLayout>
  );
}
