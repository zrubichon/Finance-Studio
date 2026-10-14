"use client";

import { useCallback, useEffect, useRef } from "react";

const CHECK_INTERVAL_MS = 60_000;
const INITIAL_VERSION_KEY = "finance-studio-loaded-version";

function userIsEditing() {
  const active = document.activeElement as HTMLElement | null;
  if (!active) return false;
  if (active.isContentEditable) return true;
  const tag = active.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

async function fetchVersion() {
  const response = await fetch(`/api/version?t=${Date.now()}`, {
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { version?: string };
  return data.version || null;
}

export default function DeploymentSync() {
  const baselineRef = useRef<string | null>(null);
  const pendingVersionRef = useRef<string | null>(null);
  const reloadingRef = useRef(false);

  const reloadWhenSafe = useCallback(() => {
    if (!pendingVersionRef.current || reloadingRef.current) return;
    if (document.visibilityState !== "visible" || userIsEditing()) return;

    reloadingRef.current = true;
    sessionStorage.setItem(INITIAL_VERSION_KEY, pendingVersionRef.current);
    window.location.reload();
  }, []);

  const checkVersion = useCallback(async () => {
    try {
      const latest = await fetchVersion();
      if (!latest) return;

      if (!baselineRef.current) {
        baselineRef.current = sessionStorage.getItem(INITIAL_VERSION_KEY) || latest;
        sessionStorage.setItem(INITIAL_VERSION_KEY, baselineRef.current);
      }

      if (latest !== baselineRef.current) {
        pendingVersionRef.current = latest;
        reloadWhenSafe();
      }
    } catch {
      // Version checks are intentionally silent. A temporary network failure
      // must never interrupt the user's FinanceStudio session.
    }
  }, [reloadWhenSafe]);

  useEffect(() => {
    void checkVersion();
    const interval = window.setInterval(() => void checkVersion(), CHECK_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void checkVersion();
        reloadWhenSafe();
      }
    };
    const handleFocusOut = () => window.setTimeout(reloadWhenSafe, 0);
    const handleOnline = () => void checkVersion();

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("focusout", handleFocusOut);
    window.addEventListener("online", handleOnline);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("online", handleOnline);
    };
  }, [checkVersion, reloadWhenSafe]);

  return null;
}
