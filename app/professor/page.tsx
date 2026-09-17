import SectionLayout from "@/components/section-layout";
import ProfessorLab from "@/components/professor-lab";

export default function ProfessorPage() {
  return (
    <SectionLayout
      activeSlug="professor"
      eyebrow={{ en: "AI PROFESSOR", fr: "PROFESSEUR IA" }}
      title={{ en: "A finance tutor that adapts to how you learn.", fr: "Un professeur de finance qui s’adapte à ta façon d’apprendre." }}
      description={{
        en: "Ask for a simpler explanation, numerical proof, visual intuition, interview framing or professional vocabulary from any lesson.",
        fr: "Demande une explication plus simple, une démonstration chiffrée / numerical proof, une intuition visuelle, une formulation entretien / interview framing ou du vocabulaire professionnel à partir de n’importe quel cours.",
      }}
    >
      <ProfessorLab />
    </SectionLayout>
  );
}
