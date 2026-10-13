import { capstoneInvestmentDealCaseLesson } from "./capstone-content";
import {
  lessons as coreLessons,
  type FinanceLesson,
} from "./lesson-content";

export const lessons: FinanceLesson[] = [
  ...coreLessons,
  capstoneInvestmentDealCaseLesson,
];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function hasLessonContent(slug: string) {
  return lessons.some((lesson) => lesson.slug === slug);
}
