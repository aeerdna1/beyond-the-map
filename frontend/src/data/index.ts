import type { Destination } from '../types';
import { japan } from './japan';
import { iceland } from './iceland';
import { morocco } from './morocco';
import { others } from './others';

/**
 * Local seed data: the English content of every destination. The site only downloads it when
 * the Spring Boot API is not reachable (see api/client.ts), and the seed generator turns it
 * into V2__seed_destinations.sql. Small constants (contact details, featured list) live in
 * site.ts, so importing them does not pull in this file.
 */
export const DESTINATIONS: Destination[] = [japan, iceland, morocco, ...others];
