"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export type RecentFinanceActivity = {
  path: string;
  label: string;
  kind: "lesson" | "news" | "interview" | "investing" | "dictionary" | "professor" | "markets" | "other";
  at: string;
};

export const RECENT_ACTIVITY_KEY = "finance-studio-recent-activity";
export const RECENT_ACTIVITY_EVENT = "finance-studio-activity-updated";

function kindFromPath(path: string): RecentFinanceActivity["kind"] {
  if (path.startsWith("/university")) return "lesson";
  if (path.startsWith("/news")) return "news";
  if (path.startsWith("/interview")) return "interview";
  if (path.startsWith("/investing") || path.startsWith("/portfolio")) return "investing";
  if (path.startsWith("/dictionary")) return "dictionary";
  if (path.startsWith("/professor")) return "professor";
  if (path.startsWith("/markets")) return "markets";
  return "other";
}

function saveActivity(activity: RecentFinanceActivity) {
  if (typeof window === "undefined") return;

  try {
    const raw = window.localStorage.getItem(RECENT_ACTIVITY_KEY);
    let previous: RecentFinanceActivity[] = [];

    try {
      previous = raw ? JSON.parse(raw) as RecentFinanceActivity[] : [];
    } catch {
      previous = [];
    }

    const next = [activity, ...previous]
      .filter((item, index, array) => index === array.findIndex((candidate) => candidate.path === item.path && candidate.label === item.label))
      .slice(0, 20);

    window.localStorage.setItem(RECENT_ACTIVITY_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(RECENT_ACTIVITY_EVENT));
  } catch {
    // Analytics/personalization must never prevent the product from loading.
  }
}

export default function ActivityTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname === "/") return;
    saveActivity({
      path: pathname,
      label: document.title || pathname,
      kind: kindFromPath(pathname),
      at: new Date().toISOString(),
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      try {
        const target = event.target instanceof Element ? event.target : null;
        const interactive = target?.closest("a,button") as HTMLElement | null;
        if (!interactive) return;

        const href = interactive instanceof HTMLAnchorElement ? interactive.getAttribute("href") : null;
        const path = href?.startsWith("/") ? href.split("?")[0] : pathname || "/";
        const label = interactive.textContent?.replace(/\s+/g, " ").trim().slice(0, 120) || path;

        saveActivity({
          path,
          label,
          kind: kindFromPath(path),
          at: new Date().toISOString(),
        });
      } catch {
        // Ignore tracking errors; navigation itself should continue normally.
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
