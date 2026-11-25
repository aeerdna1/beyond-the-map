import { DESTINATIONS } from '../data';
import { localizeDestination, localizePlace, translationFor } from '../data/translations';
import type { Lang } from '../i18n';
import type { Destination, DestinationSummary, Place, TripInquiry } from '../types';

// Base URL of the Spring Boot API. In dev, Vite proxies /api to :8080.
const BASE = import.meta.env.VITE_API_URL ?? '';

// Set VITE_USE_LOCAL_DATA=true to skip the backend entirely (static demo).
const LOCAL_ONLY = import.meta.env.VITE_USE_LOCAL_DATA === 'true';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

/** Try the API first; if it is down (or not deployed yet), use local seed data. */
async function withFallback<T>(remote: () => Promise<T>, local: () => T): Promise<T> {
  if (LOCAL_ONLY) return local();
  try {
    return await remote();
  } catch {
    return local();
  }
}

// English is the API default, so English URLs stay unchanged (and share one cache entry).
const langQuery = (lang: Lang) => (lang === 'en' ? '' : `?lang=${lang}`);

const toSummary = ({ places, ...rest }: Destination): DestinationSummary => ({
  ...rest,
  placeCount: places.length,
});

/** Local seed data in the given language (untranslated texts stay English, like the API). */
const localDestination = (d: Destination, lang: Lang) => localizeDestination(d, translationFor(lang, d.slug));

export class NotFoundError extends Error {}

export const api = {
  listDestinations: (lang: Lang) =>
    withFallback(
      () => get<DestinationSummary[]>(`/api/destinations${langQuery(lang)}`),
      () => DESTINATIONS.map((d) => toSummary(localDestination(d, lang))),
    ),

  getDestination: (slug: string, lang: Lang) =>
    withFallback(
      () => get<Destination>(`/api/destinations/${slug}${langQuery(lang)}`),
      () => {
        const d = DESTINATIONS.find((x) => x.slug === slug);
        if (!d) throw new NotFoundError(slug);
        return localDestination(d, lang);
      },
    ),

  getPlace: (slug: string, placeSlug: string, lang: Lang) =>
    withFallback(
      () => get<Place>(`/api/destinations/${slug}/places/${placeSlug}${langQuery(lang)}`),
      () => {
        const p = DESTINATIONS.find((x) => x.slug === slug)?.places.find((x) => x.slug === placeSlug);
        if (!p) throw new NotFoundError(placeSlug);
        return localizePlace(p, translationFor(lang, slug)?.places?.[placeSlug]);
      },
    ),

  async submitInquiry(data: TripInquiry): Promise<void> {
    const res = await fetch(`${BASE}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Could not send your request (HTTP ${res.status}).`);
  },
};
