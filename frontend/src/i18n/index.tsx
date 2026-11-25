import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import en, { type Dict } from './en';
import ro from './ro';

export type { Dict };

export type Lang = 'en' | 'ro';

/** Supported languages, in the order the switch shows them. */
export const LANGS: Lang[] = ['en', 'ro'];

/** Each language's name written in that language (used as a tooltip on the switch). */
export const LANG_NAMES: Record<Lang, string> = { en: 'English', ro: 'Română' };

const DICTS: Record<Lang, Dict> = { en, ro };

// localStorage key for the visitor's explicit choice.
const STORAGE_KEY = 'btm-lang';

const isLang = (v: unknown): v is Lang => v === 'en' || v === 'ro';

/**
 * Starting language: the visitor's saved choice if there is one, otherwise the browser
 * language (Romanian if it starts with "ro", English for everything else).
 * localStorage can throw (private mode, blocked storage), so it is wrapped in try/catch.
 */
function initialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // Storage unavailable: fall through to the browser language.
  }
  const browser = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return browser.toLowerCase().startsWith('ro') ? 'ro' : 'en';
}

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

// Defaults to English, so components also work outside the provider (for example in tests).
const I18nContext = createContext<I18nValue>({ lang: 'en', setLang: () => {}, t: en });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Only an explicit choice is saved, so visitors who never touch the switch keep
  // following their browser language.
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the choice still applies for this visit.
    }
  }, []);

  const t = DICTS[lang];

  // Keep <html lang> (screen readers, hyphenation, search engines) and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Returns the interface text for the current language, e.g. `const t = useT(); t.nav.home`. */
export const useT = () => useContext(I18nContext).t;

/** Current language and a setter that also remembers the choice. */
export function useLang() {
  const { lang, setLang } = useContext(I18nContext);
  return { lang, setLang };
}
