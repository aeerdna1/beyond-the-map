import type { DestinationTranslation } from '../../types';
import { japan } from './japan';
import { iceland } from './iceland';
import { morocco } from './morocco';
import { thailand } from './thailand';
import { bali } from './bali';
import { malaysia } from './malaysia';
import { singapore } from './singapore';
import { hawaii } from './hawaii';
import { egypt } from './egypt';
import { italy } from './italy';
import { norway } from './norway';
import { argentina } from './argentina';
import { chile } from './chile';

/**
 * Romanian destination content, keyed by destination slug. A destination that is not listed
 * here (or a field left out) is shown in English.
 * To translate another destination: copy japan.ts to <slug>.ts, translate it, add it below,
 * then run `npm run seed:sql` so the backend gets the same text.
 */
export const ro: Record<string, DestinationTranslation> = {
  japan,
  iceland,
  morocco,
  thailand,
  bali,
  malaysia,
  singapore,
  hawaii,
  egypt,
  italy,
  norway,
  argentina,
  chile,
};
