import { en } from '@/locales/en';
import { ru, type TranslationSchema } from '@/locales/ru';

export const SUPPORTED_LANGUAGES = ['ru', 'en'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

const TRANSLATIONS: Record<Language, TranslationSchema> = {
  ru,
  en,
};

export const DEFAULT_LANGUAGE: Language = 'ru';
export const LANGUAGE_STORAGE_KEY = 'portfolio-language';
export const LANGUAGE_COOKIE_KEY = 'portfolio-language';

export const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

export const getTranslations = (language: Language): TranslationSchema =>
  TRANSLATIONS[language] ?? TRANSLATIONS[DEFAULT_LANGUAGE];

const getLanguageFromCookie = (): Language | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';').map((entry) => entry.trim());
  for (const cookie of cookies) {
    if (!cookie.startsWith(`${LANGUAGE_COOKIE_KEY}=`)) continue;
    const value = cookie.split('=')[1];
    if (isLanguage(value)) {
      return value;
    }
  }
  return null;
};

export const readStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const fromLocalStorage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isLanguage(fromLocalStorage)) {
    return fromLocalStorage;
  }
  const fromCookie = getLanguageFromCookie();
  if (fromCookie) {
    return fromCookie;
  }
  return null;
};

export const detectBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  const candidates = navigator.languages ?? [navigator.language];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = candidate.toLowerCase().split('-')[0];
    if (isLanguage(normalized)) {
      return normalized;
    }
  }
  return DEFAULT_LANGUAGE;
};
