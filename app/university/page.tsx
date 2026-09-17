import SectionLayout from "@/components/section-layout";
import UniversityProgress from "@/components/university-progress";

export default function UniversityPage() {
  return (
    <SectionLayout
      activeSlug="university"
      eyebrow="FINANCE UNIVERSITY · YEAR 1 → YEAR 4"
      title="Learn finance as if the entire degree lived inside one product."
      description="The curriculum is sequential and prerequisite-based, but every concept can be revisited at Beginner, Intermediate or Professional depth. Beginner mode never removes knowledge; it only teaches it more explicitly."
    >
      <UniversityProgress />
    </SectionLayout>
  );
}
