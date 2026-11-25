import type { Destination } from '../types';
import { japan } from './japan';
import { iceland } from './iceland';
import { morocco } from './morocco';
import { others } from './others';

/** Local seed data. Used as a fallback when the Spring Boot API is not reachable. */
export const DESTINATIONS: Destination[] = [japan, iceland, morocco, ...others];

/** Shown on the homepage "featured" grid. */
export const FEATURED = ['japan', 'iceland', 'morocco', 'bali', 'norway', 'hawaii'];

/** Contact details shown in the footer, the Plan my trip page and the privacy policy. */
export const CONTACT = {
  phone: '+40 726 206 555',
  whatsapp: 'https://wa.me/40726206555',
  email: 'andreea.barbulescu@yahoo.com',
  instagram: 'https://instagram.com/aeerdna_1',
  instagramHandle: '@aeerdna_1',
};
