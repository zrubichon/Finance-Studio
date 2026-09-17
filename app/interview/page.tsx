import SectionLayout from "@/components/section-layout";
import InterviewStudio from "@/components/interview-studio";

export default function InterviewPage() {
  return (
    <SectionLayout
      activeSlug="interview"
      eyebrow="INTERVIEW STUDIO"
      title="Train the reasoning interviewers actually care about."
      description="Practice technical, market, behavioral, mental-math and case questions by finance career. Each question is paired with what it tests, an ideal reasoning structure and follow-ups designed to expose shallow memorization."
    >
      <InterviewStudio />
    </SectionLayout>
  );
}
