import type { Destination, Place, Region, Vibe } from '../types';
import { img, IMG } from './img';
import { hawaii } from './hawaii';
import { norway } from './norway';
import { thailand } from './thailand';
import { bali } from './bali';
import { malaysia } from './malaysia';
import { egypt } from './egypt';
import { italy } from './italy';

// Destinations whose detailed content (top 5 + fun facts) is still to be written.
// Places are listed so the country page shows them; place pages show "coming soon"
// until activities are filled in (same shape as japan.ts / iceland.ts / morocco.ts).
// Fully written destinations (thailand, bali, malaysia, hawaii, egypt, italy, norway) live in their own files and are
// slotted in here only to keep the original display order.

type ImgKey = keyof typeof IMG;

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const stubPlaces = (names: string[], pic: ImgKey): Place[] =>
  names.map((name) => ({
    slug: slugify(name),
    name,
    description: '',
    heroImageUrl: img(pic),
    activities: [],
    gallery: [],
  }));

const d = (
  slug: string, name: string, flag: string, region: Region, vibes: Vibe[],
  tagline: string, description: string, bestTimeToVisit: string,
  pic: ImgKey, lat: number, lng: number, places: string[],
): Destination => ({
  slug, name, flag, region, vibes, tagline, description, bestTimeToVisit,
  heroImageUrl: img(pic), lat, lng, places: stubPlaces(places, pic),
});

export const others: Destination[] = [
  thailand,
  bali,
  malaysia,
  d('singapore', 'Singapore', '🇸🇬', 'Asia', ['Culture'],
    'A garden city of the future, with hawker food from the past.',
    'Tiny, spotless and surprisingly green, with neighbourhoods that each feel like a different country.',
    'February - April (less rain)', 'singapore', 1.35, 103.82,
    ['Marina Bay', 'Sentosa', 'Chinatown & Little India', 'Gardens & Nature']),
  hawaii,
  egypt,
  italy,
  norway,
];
