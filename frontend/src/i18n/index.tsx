import { createContext, useContext, type ReactNode } from 'react';
import en, { type Dict } from './en';

export type { Dict };

// The active dictionary. Defaults to English, so components also work outside the provider
// (for example in tests). To add a language, create ro.ts typed as `Dict` and pass it here.
const I18nContext = createContext<Dict>(en);

export function I18nProvider({ dict = en, children }: { dict?: Dict; children: ReactNode }) {
  return <I18nContext.Provider value={dict}>{children}</I18nContext.Provider>;
}

/** Returns the interface text for the current language, e.g. `const t = useT(); t.nav.home`. */
export const useT = () => useContext(I18nContext);
