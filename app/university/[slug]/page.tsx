import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LessonPlayer from "@/components/lesson-player";
import { getLessonBySlug } from "@/lib/lesson-registry";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "FinanceStudio · Finance University" };

  const cookieStore = await cookies();
  const isFrench = cookieStore.get("finance-studio-language")?.value === "FR";

  return {
    title: `${isFrench ? lesson.title.fr : lesson.title.en} · FinanceStudio`,
    description: isFrench ? lesson.subtitle.fr : lesson.subtitle.en,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) notFound();

  return <LessonPlayer lesson={lesson} />;
}
