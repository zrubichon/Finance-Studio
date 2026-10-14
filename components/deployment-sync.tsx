"use client";

import { useCallback, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { addDeploymentNotification } from "@/lib/local-notifications";

const CHECK_INTERVAL_MS = 60_000;
const INITIAL_VERSION_KEY = "finance-studio-loaded-version";

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

  const checkVersion = useCallback(async () => {
    try {
      const latest = await fetchVersion();
      if (!latest) return;

      if (!baselineRef.current) {
        baselineRef.current = sessionStorage.getItem(INITIAL_VERSION_KEY) || latest;
        sessionStorage.setItem(INITIAL_VERSION_KEY, baselineRef.current);
      }

      if (latest === baselineRef.current) return;

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        addDeploymentNotification(latest);
        baselineRef.current = latest;
        sessionStorage.setItem(INITIAL_VERSION_KEY, latest);
        return;
      }

      // Anonymous sessions can refresh silently because there is no signed-in
      // account state to notify. Connected users get the profile notification instead.
      baselineRef.current = latest;
      sessionStorage.setItem(INITIAL_VERSION_KEY, latest);
      window.location.reload();
    } catch {
      // A temporary network/auth failure must never interrupt the current session.
    }
  }, []);

  useEffect(() => {
    void checkVersion();
    const interval = window.setInterval(() => void checkVersion(), CHECK_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") void checkVersion();
    };
    const handleOnline = () => void checkVersion();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("online", handleOnline);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("online", handleOnline);
    };
  }, [checkVersion]);

  return null;
}
