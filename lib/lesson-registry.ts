import { capstoneInvestmentDealCaseLesson } from "./capstone-content";
import { salesTradingLesson } from "./sales-trading-content";
import { assetManagementLesson } from "./asset-management-content";
import { wealthManagementLesson } from "./wealth-management-content";
import { equityResearchLesson } from "./equity-research-content";
import {
  lessons as coreLessons,
  type FinanceLesson,
} from "./lesson-content";

const overriddenCoreLessons = coreLessons.filter(
  (lesson) =>
    lesson.slug !== salesTradingLesson.slug &&
    lesson.slug !== assetManagementLesson.slug &&
    lesson.slug !== wealthManagementLesson.slug &&
    lesson.slug !== equityResearchLesson.slug,
);

export const lessons: FinanceLesson[] = [
  ...overriddenCoreLessons,
  salesTradingLesson,
  assetManagementLesson,
  wealthManagementLesson,
  equityResearchLesson,
  capstoneInvestmentDealCaseLesson,
];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function hasLessonContent(slug: string) {
  return lessons.some((lesson) => lesson.slug === slug);
}
