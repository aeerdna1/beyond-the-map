import type { Dict } from '../i18n/en';

// Countries visited, shown on the About page as a map and as a list grouped by continent.
// Kept apart from the map code, so the list renders without downloading the map.

export type Continent = keyof Dict['about']['continents'];

/** What the About page map shows: the whole world or one continent. */
export type MapView = Continent | 'world';

export interface VisitedCountry {
  /** ISO 3166-1 alpha-2 code; builds the flag emoji and the translated country name. */
  code: string;
  /** ISO 3166-1 numeric code, which is how the map data identifies countries. */
  id: string;
  /** Name shown on the English site (other languages use the browser's translated name). */
  name: string;
  continent: Continent;
  /** [longitude, latitude] of the map label; very small countries also get a dot here. */
  at: [number, number];
}

const row =
  (continent: Continent) =>
  (code: string, id: string, name: string, lng: number, lat: number): VisitedCountry => ({
    code,
    id,
    name,
    continent,
    at: [lng, lat],
  });
const europe = row('europe');
const asia = row('asia');
const africa = row('africa');
const northAmerica = row('northAmerica');

// In the order they are listed on the page. Cyprus is listed under Europe and Turkey under Asia.
// To add a country: add a row with its codes (https://en.wikipedia.org/wiki/ISO_3166-1) and a
// point roughly in its middle.
export const VISITED_COUNTRIES: VisitedCountry[] = [
  europe('IT', '380', 'Italy', 12.5, 42.8),
  europe('GB', '826', 'United Kingdom', -2, 53.5),
  europe('ES', '724', 'Spain', -3.7, 40.2),
  europe('FR', '250', 'France', 2.4, 46.6),
  europe('DE', '276', 'Germany', 10.4, 51.1),
  europe('NL', '528', 'Netherlands', 5.3, 52.2),
  europe('BE', '056', 'Belgium', 4.5, 50.6),
  europe('CH', '756', 'Switzerland', 8.2, 46.8),
  europe('MC', '492', 'Monaco', 7.42, 43.74),
  europe('MT', '470', 'Malta', 14.4, 35.9),
  europe('GR', '300', 'Greece', 22, 39.3),
  europe('CY', '196', 'Cyprus', 33.2, 35),
  europe('BG', '100', 'Bulgaria', 25.3, 42.7),
  europe('RS', '688', 'Serbia', 20.8, 44.2),
  europe('BA', '070', 'Bosnia and Herzegovina', 17.8, 44.2),
  europe('HU', '348', 'Hungary', 19.4, 47.2),
  europe('SK', '703', 'Slovakia', 19.6, 48.7),
  europe('SE', '752', 'Sweden', 15.5, 62),
  europe('NO', '578', 'Norway', 9, 61.5),
  europe('FI', '246', 'Finland', 26, 63),
  asia('TH', '764', 'Thailand', 101, 15.5),
  asia('MY', '458', 'Malaysia', 102, 4.2),
  asia('SG', '702', 'Singapore', 103.82, 1.35),
  asia('ID', '360', 'Indonesia', 117, -2.5),
  asia('TR', '792', 'Turkey', 35, 39),
  asia('IL', '376', 'Israel', 34.9, 31.4),
  asia('QA', '634', 'Qatar', 51.2, 25.3),
  asia('BH', '048', 'Bahrain', 50.55, 26.05),
  asia('OM', '512', 'Oman', 57, 21),
  africa('MA', '504', 'Morocco', -6.5, 32),
  africa('EG', '818', 'Egypt', 30, 26.5),
  northAmerica('US', '840', 'USA', -98.5, 39.5),
  northAmerica('DO', '214', 'Dominican Republic', -70.5, 18.8),
  northAmerica('BS', '044', 'Bahamas', -77.4, 24.5),
];

/** Continents in display order; a continent without countries is not shown. */
export const CONTINENT_ORDER: Continent[] = ['europe', 'asia', 'africa', 'northAmerica', 'southAmerica'];

/**
 * Drawing size of the map in SVG units (Natural Earth projection, without Antarctica).
 * Also used by the About page to reserve the space before the map has loaded.
 */
export const MAP_SIZE = { width: 960, height: 418 };

/**
 * Builds a flag emoji from an ISO 3166-1 alpha-2 country code (e.g. 'IT').
 * Each letter maps to a Unicode regional indicator symbol; a pair of them renders as a flag.
 * Keeping only ASCII codes in the source avoids the emoji getting mangled by editors/encodings.
 */
export const flag = (code: string) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));

const displayNames = new Map<string, Intl.DisplayNames | null>();

/**
 * Returns a function that gives a country's name in `lang`. English uses the names above;
 * other languages use the browser's built-in translations (Intl.DisplayNames), falling back
 * to English in browsers that do not have them.
 */
export function countryNamer(lang: string): (c: VisitedCountry) => string {
  if (lang === 'en') return (c) => c.name;
  let names = displayNames.get(lang);
  if (names === undefined) {
    try {
      names = new Intl.DisplayNames([lang], { type: 'region' });
    } catch {
      names = null;
    }
    displayNames.set(lang, names);
  }
  const dn = names;
  return (c) => dn?.of(c.code) ?? c.name;
}
