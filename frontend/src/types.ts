// Shapes mirror the Spring Boot DTOs (see backend/.../dto).

export type Region = 'Asia' | 'Europe' | 'Africa' | 'Islands';
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
  /** Honeypot: must stay empty. */
  website?: string;
}
