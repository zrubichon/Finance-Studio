import SectionLayout from "@/components/section-layout";
import DictionaryExplorer from "@/components/dictionary-explorer";

export default function DictionaryPage() {
  return (
    <SectionLayout
      activeSlug="dictionary"
      eyebrow="FINANCE DICTIONARY · FR ↔ EN"
      title="Learn the concept and the vocabulary at the same time."
      description="Search technical finance terms in English or French, switch explanation depth and connect each definition to related concepts. The first working glossary is already searchable and will expand alongside the curriculum."
    >
      <DictionaryExplorer />
    </SectionLayout>
  );
}
