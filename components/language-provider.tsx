"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type Language = "EN" | "FR";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  isFrench: boolean;
  text: (english: string, french: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language | null {
  try {
    const value = window.localStorage.getItem("finance-studio-language");
    return value === "EN" || value === "FR" ? value : null;
  } catch {
    return null;
  }
}

function storeLanguage(language: Language) {
  try {
    window.localStorage.setItem("finance-studio-language", language);
  } catch {
    // Storage may be unavailable in private/restricted browser contexts.
  }

  try {
    document.cookie = `finance-studio-language=${language}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    // Cookie persistence is optional for client rendering.
  }

  document.documentElement.lang = language === "FR" ? "fr" : "en";
}

export default function LanguageProvider({ children, initialLanguage = "EN" }: { children: ReactNode; initialLanguage?: Language }) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    let active = true;

    async function hydrateLanguage() {
      const saved = readStoredLanguage();

      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!active) return;

        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("preferred_language")
            .eq("user_id", user.id)
            .maybeSingle();

          if (!active) return;

          if (
            !error &&
            (data?.preferred_language === "fr" || data?.preferred_language === "en")
          ) {
            const accountLanguage: Language = data.preferred_language === "fr" ? "FR" : "EN";
            setLanguageState(accountLanguage);
            storeLanguage(accountLanguage);
            if (accountLanguage !== initialLanguage) router.refresh();
            return;
          }
        }
      } catch {
        // Account sync is optional; continue with browser/cookie language.
      }

      if (!active) return;
      if (saved === "EN" || saved === "FR") {
        setLanguageState(saved);
        storeLanguage(saved);
        if (saved !== initialLanguage) router.refresh();
      }
    }

    void hydrateLanguage();
    return () => {
      active = false;
    };
  }, [initialLanguage, router]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    storeLanguage(next);

    try {
      window.dispatchEvent(new CustomEvent("finance-studio-language-change", { detail: next }));
    } catch {
      // Non-critical enhancement only.
    }

    void (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("profiles")
            .update({ preferred_language: next.toLowerCase(), updated_at: new Date().toISOString() })
            .eq("user_id", user.id);
        }
      } catch {
        // Browser and cookie persistence still work if account sync is temporarily unavailable.
      }
    })();

    router.refresh();
  }, [router]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    isFrench: language === "FR",
    text: (english, french) => language === "FR" ? french : english,
  }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
