import type { Destination } from '../types';
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

// Every destination now has its own file with full content (same shape as japan.ts).
// This list only fixes the display order after Japan, Iceland and Morocco.
// To add a new destination: create src/data/<slug>.ts, add it here, then run `npm run seed:sql`.
export const others: Destination[] = [
  thailand, bali, malaysia, singapore, hawaii, egypt, italy, norway, argentina, chile,
];
