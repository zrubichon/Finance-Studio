import SectionLayout from "@/components/section-layout";
import ProfessorLab from "@/components/professor-lab";

export default function ProfessorPage() {
  return (
    <SectionLayout
      activeSlug="professor"
      eyebrow="AI PROFESSOR"
      title="A finance tutor that changes the explanation, not the knowledge."
      description="FinanceStudio's professor is designed to diagnose misunderstandings, switch teaching styles, use formulas or examples and then verify mastery with a follow-up question. The interface below is real; the live model connection comes in the backend phase."
    >
      <ProfessorLab />
    </SectionLayout>
  );
}
