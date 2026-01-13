// src/lib/phrases.ts
import phrasesData from './phrases.json';

export type MentalState =
  | 'Distração'
  | 'Procrastinação'
  | 'Ansiedade'
  | 'Cansaço mental'
  | 'Falta de sentido / desânimo'
  | 'Excesso de estímulo (dopamina alta)';

export const phrasesByState: Record<
  MentalState,
  {
    objetivo: string;
    tom: string;
    permitido: string;
    proibido: string;
    frases: string[];
  }
> = phrasesData as any;

export const mentalStates: MentalState[] = Object.keys(phrasesData) as MentalState[];
