import { PersonalMemoryProfile } from '../types';

/** Default personalisation until caregiver edits Memory Profile */
export const DEFAULT_MEMORY_PROFILE: PersonalMemoryProfile = {
  people: [
    { id: 'p1', relation: 'Daughter', name: 'Anu' },
    { id: 'p2', relation: 'Son', name: 'Rahul' },
    { id: 'p3', relation: 'Wife', name: 'Maya' },
  ],
  places: [
    { id: 'pl1', name: 'Home' },
    { id: 'pl2', name: 'Temple' },
    { id: 'pl3', name: 'Market' },
    { id: 'pl4', name: 'Doctor' },
  ],
  objects: [
    { id: 'o1', name: 'Walking stick', emoji: '🦯' },
    { id: 'o2', name: 'Glasses', emoji: '👓' },
    { id: 'o3', name: 'Medicine box', emoji: '💊' },
    { id: 'o4', name: 'Phone', emoji: '📱' },
  ],
  routines: [
    {
      id: 'r1',
      steps: ['Breakfast', 'Medicine', 'Rest'],
    },
    {
      id: 'r2',
      steps: ['Wake up', 'Brush', 'Breakfast', 'Medicine'],
    },
  ],
};

export const SAMPLE_MORNING_ROUTINE = ['Breakfast', 'Medicine', 'Rest'] as const;
