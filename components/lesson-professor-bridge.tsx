"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { professorHref } from "@/lib/learning-bridge";

export default function LessonProfessorBridge({
  lessonSlug,
  titleEn,
  titleFr,
}: {
  lessonSlug: string;
  titleEn: string;
  titleFr: string;
}) {
  const { isFrench, text } = useLanguage();
  const title = isFrench ? titleFr : titleEn;
  const question = isFrench
    ? `Je travaille sur le cours « ${title} ». Aide-moi à le maîtriser : commence par identifier les 3 concepts les plus importants, explique-les au niveau adapté à mon profil, donne un exemple concret lié aux marchés, puis pose-moi une question pour vérifier ma compréhension.`
    : `I am working on “${title}”. Help me master it: start with the 3 most important concepts, explain them at my current level, give me a concrete market example, then ask me one question to test my understanding.`;

  return (
    <section className="section-main product-section-main" style={{ paddingTop: 0 }}>
      <div className="workspace-stack">
        <section className="learning-account-strip">
          <div>
            <span className="mini-label">{text("UNIVERSITY → AI PROFESSOR", "UNIVERSITY → PROFESSEUR IA")}</span>
            <h2>{text("Need help with this course? Continue with the AI Professor.", "Besoin d’aide sur ce cours ? Continue avec le Professeur IA.")}</h2>
            <p>{text("The course context is transferred automatically, so the tutor starts from the exact module you are studying.", "Le contexte du cours est transféré automatiquement : le professeur repart directement du module que tu étudies.")}</p>
          </div>
          <Link className="full-button" href={professorHref({ lessonSlug, question, source: "lesson" })}>
            {text("Open AI Professor", "Ouvrir le Professeur IA")} →
          </Link>
        </section>
      </div>
    </section>
  );
}
