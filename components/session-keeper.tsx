"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const DEVICE_STORAGE_KEY = "finance-studio-device-id";
const DEVICE_SEEN_KEY = "finance-studio-device-seen-at";
const REFRESH_WINDOW_SECONDS = 10 * 60;

function rememberDevice() {
  try {
    let deviceId = window.localStorage.getItem(DEVICE_STORAGE_KEY);
    if (!deviceId) {
      deviceId = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `fs-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
    }
    window.localStorage.setItem(DEVICE_SEEN_KEY, new Date().toISOString());
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

export default function SessionKeeper() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let disposed = false;

    rememberDevice();

    async function keepAlive() {
      if (disposed) return;

      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) return;

      const expiresAt = data.session.expires_at ?? 0;
      const secondsRemaining = expiresAt - Math.floor(Date.now() / 1000);

      if (secondsRemaining <= REFRESH_WINDOW_SECONDS) {
        await supabase.auth.refreshSession();
      }
    }

    void keepAlive();

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        rememberDevice();
        void keepAlive();
      }
    };
    const onFocus = () => {
      rememberDevice();
      void keepAlive();
    };
    const onOnline = () => void keepAlive();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onOnline);

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        rememberDevice();
      }
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onOnline);
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return null;
}
