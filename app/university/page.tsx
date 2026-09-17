import SectionLayout from "@/components/section-layout";
import UniversityProgress from "@/components/university-progress";

export default function UniversityPage() {
  return (
    <SectionLayout
      activeSlug="university"
      eyebrow={{ en: "FINANCE UNIVERSITY · YEAR 1 → YEAR 4", fr: "UNIVERSITÉ DE FINANCE · ANNÉE 1 → ANNÉE 4" }}
      title={{ en: "Learn finance as if the entire degree lived inside one product.", fr: "Apprends la finance comme si tout un cursus universitaire vivait dans un seul produit." }}
      description={{
        en: "The curriculum is sequential and prerequisite-based, but every concept can be revisited at Beginner, Intermediate or Professional depth. Beginner mode never removes knowledge; it only teaches it more explicitly.",
        fr: "Le programme est progressif et fondé sur des prérequis, mais chaque concept peut être revu au niveau Débutant, Intermédiaire ou Professionnel. Le mode Débutant ne retire jamais de contenu : il explique simplement chaque notion de façon plus explicite.",
      }}
    >
      <UniversityProgress />
    </SectionLayout>
  );
}
