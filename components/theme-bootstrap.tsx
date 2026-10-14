"use client";

import { useEffect } from "react";

export default function ThemeBootstrap() {
  useEffect(() => {
    const root = document.documentElement;

    try {
      const theme = window.localStorage.getItem("finance-studio-theme") || "classic";
      const radius = window.localStorage.getItem("finance-studio-radius") || "22";
      const accent = window.localStorage.getItem("finance-studio-accent");

      root.dataset.theme = theme;
      root.style.setProperty("--radius", `${radius}px`);
      if (accent) root.style.setProperty("--accent", accent);
    } catch {
      // Storage can be blocked in private, embedded, or restricted browser contexts.
      // Keep the server-rendered defaults instead of crashing hydration.
      root.dataset.theme = root.dataset.theme || "classic";
    }
  }, []);

  return null;
}
