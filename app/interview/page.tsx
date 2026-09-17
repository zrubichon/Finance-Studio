import SectionLayout from "@/components/section-layout";
import InterviewStudio from "@/components/interview-studio";

export default function InterviewPage() {
  return (
    <SectionLayout
      activeSlug="interview"
      eyebrow={{ en: "INTERVIEW STUDIO", fr: "STUDIO D’ENTRETIEN" }}
      title={{ en: "Train the reasoning interviewers actually care about.", fr: "Entraîne le raisonnement que les recruteurs évaluent vraiment." }}
      description={{
        en: "Practice technical, market, behavioral, mental-math and case questions by finance career. Each question is paired with what it tests, an ideal reasoning structure and follow-ups designed to expose shallow memorization.",
        fr: "Entraîne-toi aux questions techniques, marchés, comportementales / behavioral, calcul mental et études de cas / cases selon le métier visé. Chaque question précise ce qui est testé, la structure de raisonnement idéale et des relances / follow-ups conçues pour révéler une compréhension superficielle.",
      }}
    >
      <InterviewStudio />
    </SectionLayout>
  );
}
