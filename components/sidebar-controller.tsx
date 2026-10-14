"use client";

import { useEffect, useState } from "react";

const KEY = "finance-studio-sidebar-collapsed";

export default function SidebarController() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const hasSidebar = Boolean(document.querySelector(".sidebar, .section-sidebar"));
      setVisible(hasSidebar);

      let stored = false;
      try {
        stored = window.localStorage.getItem(KEY) === "1";
      } catch {
        stored = false;
      }

      setCollapsed(stored);
      document.body.classList.toggle("fs-sidebar-collapsed", stored);

      if (typeof MutationObserver === "undefined") return;
      const observer = new MutationObserver(() => {
        setVisible(Boolean(document.querySelector(".sidebar, .section-sidebar")));
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    } catch {
      setVisible(false);
    }
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    try {
      window.localStorage.setItem(KEY, next ? "1" : "0");
    } catch {
      // Sidebar state remains usable for the current session even without storage.
    }
    document.body.classList.toggle("fs-sidebar-collapsed", next);
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fs-sidebar-toggle"
      onClick={toggle}
      aria-label={collapsed ? "Open FinanceStudio sidebar" : "Close FinanceStudio sidebar"}
      title={collapsed ? "Open sidebar" : "Close sidebar"}
    >
      {collapsed ? "›" : "‹"}
    </button>
  );
}
