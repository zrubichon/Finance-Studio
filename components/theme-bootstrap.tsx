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
      root.dataset.theme = "classic";
      root.style.setProperty("--radius", "22px");
    }
  }, []);

  return null;
}
