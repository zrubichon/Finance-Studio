"use client";

import { useEffect } from "react";

export default function ThemeBootstrap() {
  useEffect(() => {
    const root = document.documentElement;
    const theme = window.localStorage.getItem("finance-studio-theme") || "classic";
    const radius = window.localStorage.getItem("finance-studio-radius") || "22";
    const accent = window.localStorage.getItem("finance-studio-accent");

    root.dataset.theme = theme;
    root.style.setProperty("--radius", `${radius}px`);
    if (accent) root.style.setProperty("--accent", accent);
  }, []);

  return null;
}
