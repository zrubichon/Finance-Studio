import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonPlayer from "@/components/lesson-player";
import { getLessonBySlug } from "@/lib/lesson-content";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "FinanceStudio · Finance University" };

  return {
    title: `${lesson.title.en} · FinanceStudio`,
    description: lesson.subtitle.en,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) notFound();

  return <LessonPlayer lesson={lesson} />;
}
