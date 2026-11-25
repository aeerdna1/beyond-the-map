import type { DestinationTranslation } from '../../types';
import { japan } from './japan';

/**
 * Romanian destination content, keyed by destination slug. A destination that is not listed
 * here (or a field left out) is shown in English.
 * To translate another destination: copy japan.ts to <slug>.ts, translate it, add it below,
 * then run `npm run seed:sql` so the backend gets the same text.
 */
export const ro: Record<string, DestinationTranslation> = {
  japan,
};
