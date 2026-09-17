"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export type Language = "EN" | "FR";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  isFrench: boolean;
  text: (english: string, french: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children, initialLanguage = "EN" }: { children: ReactNode; initialLanguage?: Language }) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    const saved = window.localStorage.getItem("finance-studio-language") as Language | null;
    if (saved === "EN" || saved === "FR") {
      setLanguageState(saved);
      document.documentElement.lang = saved === "FR" ? "fr" : "en";
      document.cookie = `finance-studio-language=${saved}; path=/; max-age=31536000; samesite=lax`;
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("finance-studio-language", next);
    document.cookie = `finance-studio-language=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next === "FR" ? "fr" : "en";
    window.dispatchEvent(new CustomEvent("finance-studio-language-change", { detail: next }));
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
