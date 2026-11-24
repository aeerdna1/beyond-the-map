import type { Destination, Place, Region, Vibe } from '../types';
import { img, IMG } from './img';

// Destinations whose detailed content (top 5 + fun facts) is still to be written.
// Places are listed so the country page shows them; place pages show "coming soon"
// until activities are filled in (same shape as japan.ts / iceland.ts / morocco.ts).

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
  d('thailand', 'Thailand', '🇹🇭', 'Asia', ['Beach', 'Culture'],
    'Golden temples, island hopping and the best street food on Earth.',
    'From the buzz of Bangkok to the jungles of the north and the limestone islands of the south.',
    'November - March (cool and dry)', 'thailand', 15.87, 100.99,
    ['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi']),
  d('bali', 'Bali', '🇮🇩', 'Islands', ['Beach', 'Culture', 'Nature'],
    'Rice terraces, temple ceremonies and surf at sunset.',
    'The Island of the Gods, in Indonesia: spiritual, green and endlessly photogenic.',
    'April - October (dry season)', 'bali', -8.34, 115.09,
    ['Ubud', 'Uluwatu', 'Canggu & Seminyak', 'Nusa Penida']),
  d('malaysia', 'Malaysia', '🇲🇾', 'Asia', ['Culture', 'Nature', 'Beach'],
    'Skyscrapers, rainforest and a food scene shaped by three cultures.',
    'Malay, Chinese and Indian flavours meet in cities, islands and one of the oldest rainforests in the world.',
    'March - October (west coast), varies by region', 'malaysia', 4.21, 101.98,
    ['Kuala Lumpur', 'Penang', 'Langkawi', 'Borneo (Sabah)']),
  d('singapore', 'Singapore', '🇸🇬', 'Asia', ['Culture'],
    'A garden city of the future, with hawker food from the past.',
    'Tiny, spotless and surprisingly green, with neighbourhoods that each feel like a different country.',
    'February - April (less rain)', 'singapore', 1.35, 103.82,
    ['Marina Bay', 'Sentosa', 'Chinatown & Little India', 'Gardens & Nature']),
  d('hawaii', 'Hawaii', '🌺', 'Islands', ['Beach', 'Nature'],
    'Volcanoes, rainbows and the true spirit of aloha.',
    'A US state in the middle of the Pacific, where every island has its own personality.',
    'April - May and September - October', 'hawaii1', 20.8, -156.33,
    ['Oahu', 'Maui', 'Big Island', 'Kauai']),
  d('egypt', 'Egypt', '🇪🇬', 'Africa', ['Culture', 'Beach'],
    'Pharaohs, the Nile and coral reefs in the Red Sea.',
    '5,000 years of history along the Nile, plus some of the best diving in the world.',
    'October - April (cooler)', 'egypt1', 26.82, 30.8,
    ['Cairo & Giza', 'Luxor', 'Aswan', 'Red Sea (Hurghada)']),
  d('italy', 'Italy', '🇮🇹', 'Europe', ['Nature', 'Beach', 'Culture'],
    'Jagged peaks in the north, turquoise coves in the south.',
    'La dolce vita, starting with the Dolomites and Sardinia - more regions coming soon.',
    'June - September (Dolomites hiking, Sardinia beaches)', 'dolomites', 41.87, 12.57,
    ['Dolomites', 'Sardinia']),
  d('norway', 'Norway', '🇳🇴', 'Europe', ['Nature'],
    'Fjords, fishing villages and the Northern Lights.',
    'Dramatic fjords, red cabins on the water and Arctic adventures above the polar circle.',
    'June - August (fjords) and October - March (aurora)', 'norway1', 60.47, 8.47,
    ['Oslo', 'Bergen & the Fjords', 'Lofoten', 'Tromso']),
];
