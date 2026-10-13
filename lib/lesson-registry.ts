import { capstoneInvestmentDealCaseLesson } from "./capstone-content";
import { salesTradingLesson } from "./sales-trading-content";
import {
  lessons as coreLessons,
  type FinanceLesson,
} from "./lesson-content";

const overriddenCoreLessons = coreLessons.filter(
  (lesson) => lesson.slug !== salesTradingLesson.slug,
);

export const lessons: FinanceLesson[] = [
  ...overriddenCoreLessons,
  salesTradingLesson,
  capstoneInvestmentDealCaseLesson,
];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function hasLessonContent(slug: string) {
  return lessons.some((lesson) => lesson.slug === slug);
}
