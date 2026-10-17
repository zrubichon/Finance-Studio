import {completeFourthYear} from "./year-four-depth";
import {lessonStorageSlug} from "./lesson-aliases";
import { capstoneInvestmentDealCaseLesson } from "./capstone-content";
import {
  lessons as coreLessons,
  type FinanceLesson,
} from "./lesson-content";

export const lessons: FinanceLesson[] = [
  ...coreLessons,
  capstoneInvestmentDealCaseLesson,
].map(completeFourthYear);

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === lessonStorageSlug(slug));
}

export function hasLessonContent(slug: string) {
  return Boolean(getLessonBySlug(slug));
}
