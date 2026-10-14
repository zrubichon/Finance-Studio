"use client";

import { useEffect, useState } from "react";

const KEY = "finance-studio-sidebar-collapsed";

export default function SidebarController() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const hasSidebar = Boolean(document.querySelector(".sidebar, .section-sidebar"));
    setVisible(hasSidebar);
    const stored = window.localStorage.getItem(KEY) === "1";
    setCollapsed(stored);
    document.body.classList.toggle("fs-sidebar-collapsed", stored);

    const observer = new MutationObserver(() => {
      setVisible(Boolean(document.querySelector(".sidebar, .section-sidebar")));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    window.localStorage.setItem(KEY, next ? "1" : "0");
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
