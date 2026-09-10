export type CueLevel = 0 | 1 | 2 | 3 | 4;

export type KoriPhase =
  | 'start'
  | 'baseline'
  | 'observe'
  | 'recall'
  | 'sequence'
  | 'delayWait'
  | 'delayed'
  | 'end';

export type KoriStageKind = 'recognition' | 'association' | 'sequence' | 'delayed';

export interface KoriItem {
  id: string;
  emoji: string;
  nameKey: string; // i18n key or plain label fallback
  nameEn: string;
  nameAs: string;
  category: 'cultural' | 'person' | 'place' | 'object' | 'routine';
}

export interface PersonalMemoryProfile {
  people: Array<{ id: string; relation: string; name: string }>;
  places: Array<{ id: string; name: string }>;
  objects: Array<{ id: string; name: string; emoji: string }>;
  routines: Array<{ id: string; steps: string[] }>;
}

export interface KoriTrial {
  id: string;
  stage: KoriStageKind;
  prompt: string;
  targetId: string;
  optionIds: string[];
  correct: boolean;
  latencyMs: number;
  cueLevelReached: CueLevel;
  selfCorrected: boolean;
  abandoned: boolean;
  timestamp: number;
}

export interface AdaptiveState {
  itemCount: number; // 2–4
  delaySec: number;
  cueFloor: CueLevel;
  difficulty: 'gentle' | 'steady' | 'stretch';
}

export interface SessionInsight {
  memoryStatus: 'stable' | 'needs_support';
  routineNote: string;
  delayedNote: string;
  recommendation: string;
  practisedRoutines: number;
  durationMin: number;
  avgCueLevel: number;
  accuracy: number;
}

export interface KoriSessionSnapshot {
  startedAt: number;
  endedAt?: number;
  trials: KoriTrial[];
  baselineDone: boolean;
  isBaseline: boolean;
  adaptive: AdaptiveState;
  insight?: SessionInsight;
}
