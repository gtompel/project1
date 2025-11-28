"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  DEFAULT_LANGUAGE,
  detectBrowserLanguage,
  getTranslations,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_STORAGE_KEY,
  readStoredLanguage,
  type Language,
} from "@/lib/i18n";
import type { TranslationSchema } from "@/locales/ru";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored) {
      setLanguage(stored);
      return;
    }
    const detected = detectBrowserLanguage();
    setLanguage(detected);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
    }
    if (typeof document !== "undefined") {
      document.cookie = `${LANGUAGE_COOKIE_KEY}=${detected};path=/;max-age=31536000`;
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.cookie = `${LANGUAGE_COOKIE_KEY}=${language};path=/;max-age=31536000`;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      translations: getTranslations(language),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
