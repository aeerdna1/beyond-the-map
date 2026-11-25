import type { Destination, DestinationTranslation, Place, PlaceTranslation } from '../types';

/** Languages that have translated destination content. English is the base data itself. */
export type ContentLang = 'ro';

/** Translated destination content of one language, keyed by destination slug. */
export type ContentTranslations = Record<string, DestinationTranslation>;

// Each language is a separate file that is only downloaded the first time that language is
// needed (the browser keeps the module, so later calls are instant). To add a language, add a
// loader here and extend ContentLang. The seed generator reads every language through these
// loaders to write R__seed_translations.sql.
const LOADERS: Record<ContentLang, () => Promise<ContentTranslations>> = {
  ro: () => import('./ro').then((m) => m.ro),
};

export const CONTENT_LANGS = Object.keys(LOADERS) as ContentLang[];

// hasOwnProperty rather than `in`: `'toString' in LOADERS` is true through the prototype.
const isContentLang = (lang: string): lang is ContentLang => Object.prototype.hasOwnProperty.call(LOADERS, lang);

/** The translations of a language; an empty map for English and for unknown languages. */
export function loadContentTranslations(lang: string): Promise<ContentTranslations> {
  return isContentLang(lang) ? LOADERS[lang]() : Promise.resolve({});
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
