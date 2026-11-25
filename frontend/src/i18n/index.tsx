import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import en, { type Dict } from './en';

export type { Dict };

export type Lang = 'en' | 'ro';

/** Supported languages, in the order the switch shows them. */
export const LANGS: Lang[] = ['en', 'ro'];

/** Each language's name written in that language (used as a tooltip on the switch). */
export const LANG_NAMES: Record<Lang, string> = { en: 'English', ro: 'Română' };

// English is part of the main bundle (it is the default and the fallback). Every other
// dictionary is a separate file that is only downloaded when that language is used.
const LOADERS: Record<Lang, () => Promise<Dict>> = {
  en: () => Promise.resolve(en),
  ro: () => import('./ro').then((m) => m.default),
};

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

/** A language together with its loaded dictionary. They always change together. */
export interface LoadedLang {
  lang: Lang;
  t: Dict;
}

/**
 * Loads the starting language before the first render, so a Romanian visitor never sees the
 * English text flash first. English needs no download. If the dictionary cannot be loaded
 * (offline, failed request), the site starts in English.
 */
export async function loadInitialLang(): Promise<LoadedLang> {
  const lang = initialLang();
  try {
    return { lang, t: await LOADERS[lang]() };
  } catch {
    return { lang: 'en', t: en };
  }
}

interface I18nValue extends LoadedLang {
  setLang: (lang: Lang) => void;
  /** The language being downloaded after a switch, or null. */
  pending: Lang | null;
}

// Defaults to English, so components also work outside the provider (for example in tests).
const I18nContext = createContext<I18nValue>({ lang: 'en', t: en, setLang: () => {}, pending: null });

export function I18nProvider({ initial, children }: { initial?: LoadedLang; children: ReactNode }) {
  const [active, setActive] = useState<LoadedLang>(initial ?? { lang: 'en', t: en });
  const [pending, setPending] = useState<Lang | null>(null);
  // Only the most recent switch may apply, so quickly clicking EN, RO, EN ends in English.
  const latest = useRef(0);

  // Only an explicit choice is saved, so visitors who never touch the switch keep
  // following their browser language. The new text is shown once its dictionary is loaded;
  // until then the page stays in the current language (no half-translated screen).
  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the choice still applies for this visit.
    }
    const request = ++latest.current;
    setPending(next);
    LOADERS[next]()
      .then((t) => {
        if (request === latest.current) setActive({ lang: next, t });
      })
      .catch(() => {
        // Download failed (offline): stay in the current language; the visitor can try again.
      })
      .finally(() => {
        if (request === latest.current) setPending(null);
      });
  }, []);

  const { lang, t } = active;

  // Keep <html lang> (screen readers, hyphenation, search engines) and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang, pending }), [lang, t, setLang, pending]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Returns the interface text for the current language, e.g. `const t = useT(); t.nav.home`. */
export const useT = () => useContext(I18nContext).t;

/** Current language, the language being loaded (if any), and a setter that also remembers the choice. */
export function useLang() {
  const { lang, setLang, pending } = useContext(I18nContext);
  return { lang, setLang, pending };
}
