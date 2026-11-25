// Shapes mirror the Spring Boot DTOs (see backend/.../dto).

export type Region = 'Asia' | 'Europe' | 'Africa' | 'South America' | 'Islands';
export type Vibe = 'Beach' | 'Nature' | 'Culture';

export interface Activity {
  rank: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
}

export interface Place {
  slug: string;
  name: string;
  description: string;
  funFact?: string;
  heroImageUrl: string;
  activities: Activity[];
  gallery: GalleryImage[];
}

export interface Destination {
  slug: string;
  name: string;
  flag: string;
  region: Region;
  vibes: Vibe[];
  tagline: string;
  description: string;
  bestTimeToVisit: string;
  heroImageUrl: string;
  /** Approximate coordinates, reserved for the desktop globe. */
  lat: number;
  lng: number;
  places: Place[];
}

/** Lightweight card shape returned by GET /api/destinations. */
export type DestinationSummary = Omit<Destination, 'places'> & { placeCount: number };

// ---- content translations (src/data/<lang>/) ----
// A translation only lists the texts that differ from English. Every field is optional:
// a missing (or empty) field shows the English text, both on the site and in the API.

export interface ActivityTranslation {
  title?: string;
  description?: string;
}

export interface PlaceTranslation {
  name?: string;
  description?: string;
  funFact?: string;
  /** Keyed by the activity rank (1-5) in the English data. */
  activities?: Partial<Record<number, ActivityTranslation>>;
  /** Captions in the same order as the English gallery; null keeps the English caption. */
  gallery?: (string | null)[];
}

export interface DestinationTranslation {
  name?: string;
  tagline?: string;
  description?: string;
  bestTimeToVisit?: string;
  /** Keyed by the place slug in the English data. */
  places?: Record<string, PlaceTranslation>;
}

export interface TripInquiry {
  name: string;
  email: string;
  phone?: string;
  destinations: string[];
  travelFrom?: string;
  travelTo?: string;
  travelers: number;
  budget: string;
  travelStyle: string;
  message?: string;
  consent: boolean;
  /** Language the visitor used the site in; picks the confirmation email language. */
  lang?: 'en' | 'ro';
  /** Honeypot: must stay empty. */
  website?: string;
}
