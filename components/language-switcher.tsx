'use client';

import { Button } from '@/components/ui/button';
import { SUPPORTED_LANGUAGES, type Language } from '@/lib/i18n';
import { useLanguage } from '@/components/language-provider';

export function LanguageSwitcher() {
  const { language, setLanguage, translations } = useLanguage();

  const handleChange = (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    setLanguage(nextLanguage);
  };

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={translations.languageSwitcher.ariaLabel}
    >
      {SUPPORTED_LANGUAGES.map((code) => (
        <Button
          key={code}
          type="button"
          size="sm"
          variant={language === code ? 'default' : 'ghost'}
          className="px-3 min-w-[44px]"
          onClick={() => handleChange(code)}
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
