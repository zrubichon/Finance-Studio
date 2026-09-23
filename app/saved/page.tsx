import SectionLayout from "@/components/section-layout";
import SavedLibrary from "@/components/saved-library";

export default function SavedPage() {
  return (
    <SectionLayout
      activeSlug="saved"
      eyebrow={{ en: "MY LIBRARY", fr: "MA BIBLIOTHÈQUE" }}
      title={{
        en: "Keep the finance knowledge you want to revisit.",
        fr: "Garde la finance que tu veux pouvoir retrouver et revoir.",
      }}
      description={{
        en: "Save lessons, market reporting and dictionary concepts in one private library linked to your FinanceStudio account.",
        fr: "Enregistre cours, reporting de marché et concepts du dictionnaire dans une bibliothèque privée liée à ton compte FinanceStudio.",
      }}
    >
      <SavedLibrary />
    </SectionLayout>
  );
}
