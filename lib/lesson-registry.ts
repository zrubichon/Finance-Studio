import { capstoneInvestmentDealCaseLesson } from "./capstone-content";
import { salesTradingLesson } from "./sales-trading-content";
import { assetManagementLesson } from "./asset-management-content";
import { wealthManagementLesson } from "./wealth-management-content";
import { equityResearchLesson } from "./equity-research-content";
import { year3CompletionLessons } from "./year-3-complete-content";
import { year4CompletionLessons } from "./year-4-complete-content";
import {
  lessons as coreLessons,
  type FinanceLesson,
} from "./lesson-content";

const dedicatedLessons: FinanceLesson[] = [
  salesTradingLesson,
  assetManagementLesson,
  wealthManagementLesson,
  equityResearchLesson,
  ...year3CompletionLessons,
  ...year4CompletionLessons,
  capstoneInvestmentDealCaseLesson,
];

const dedicatedSlugs = new Set(dedicatedLessons.map((lesson) => lesson.slug));

const overriddenCoreLessons = coreLessons.filter(
  (lesson) => !dedicatedSlugs.has(lesson.slug),
);

export const lessons: FinanceLesson[] = [
  ...overriddenCoreLessons,
  ...dedicatedLessons,
];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function hasLessonContent(slug: string) {
  return lessons.some((lesson) => lesson.slug === slug);
}
