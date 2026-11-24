import type { Destination } from '../types';
import { japan } from './japan';
import { iceland } from './iceland';
import { morocco } from './morocco';
import { others } from './others';

/** Local seed data. Used as a fallback when the Spring Boot API is not reachable. */
export const DESTINATIONS: Destination[] = [japan, iceland, morocco, ...others];

/** Shown on the homepage "featured" grid. */
export const FEATURED = ['japan', 'iceland', 'morocco', 'bali', 'norway', 'hawaii'];

/** Contact details - TODO: replace placeholders with the real ones. */
export const CONTACT = {
  phone: '+40 7XX XXX XXX',
  whatsapp: 'https://wa.me/40XXXXXXXXX',
  email: 'hello@example.com',
  instagram: 'https://instagram.com/your.handle',
  instagramHandle: '@your.handle',
};
