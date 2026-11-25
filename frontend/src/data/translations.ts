import type { Destination, DestinationTranslation, Place, PlaceTranslation } from '../types';
import { ro } from './ro';

/** Languages that have translated destination content. English is the base data itself. */
export type ContentLang = 'ro';

/**
 * Translated destination content per language and destination slug. Used for the offline
 * fallback here and turned into R__seed_translations.sql for the backend (npm run seed:sql).
 */
export const TRANSLATIONS: Record<ContentLang, Record<string, DestinationTranslation>> = { ro };

/** The translation of one destination, or undefined for English and untranslated destinations. */
export function translationFor(lang: string, slug: string): DestinationTranslation | undefined {
  return lang in TRANSLATIONS ? TRANSLATIONS[lang as ContentLang][slug] : undefined;
}

// Same rule as the backend (DestinationService.or): a missing or blank translation shows English.
const or = (translated: string | null | undefined, english: string): string =>
  translated && translated.trim() ? translated : english;

export function localizePlace(p: Place, t: PlaceTranslation | undefined): Place {
  if (!t) return p;
  return {
    ...p,
    name: or(t.name, p.name),
    description: or(t.description, p.description),
    funFact: p.funFact === undefined ? t.funFact || undefined : or(t.funFact, p.funFact),
    activities: p.activities.map((a) => {
      const at = t.activities?.[a.rank];
      return at ? { ...a, title: or(at.title, a.title), description: or(at.description, a.description) } : a;
    }),
    gallery: p.gallery.map((g, i) => ({ ...g, caption: or(t.gallery?.[i], g.caption) })),
  };
}

export function localizeDestination(d: Destination, t: DestinationTranslation | undefined): Destination {
  if (!t) return d;
  return {
    ...d,
    name: or(t.name, d.name),
    tagline: or(t.tagline, d.tagline),
    description: or(t.description, d.description),
    bestTimeToVisit: or(t.bestTimeToVisit, d.bestTimeToVisit),
    places: d.places.map((p) => localizePlace(p, t.places?.[p.slug])),
  };
}
