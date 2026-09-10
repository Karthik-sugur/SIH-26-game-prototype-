import { AdaptiveState, CueLevel, KoriTrial, SessionInsight } from '../types';

export const DEFAULT_ADAPTIVE: AdaptiveState = {
  itemCount: 4,
  delaySec: 45,
  cueFloor: 0,
  difficulty: 'gentle',
};

export function adaptAfterTrials(prev: AdaptiveState, trials: KoriTrial[]): AdaptiveState {
  if (!trials.length) return prev;

  const recent = trials.slice(-3);
  const avgCue =
    recent.reduce((s, t) => s + t.cueLevelReached, 0) / Math.max(recent.length, 1);
  const accuracy = recent.filter((t) => t.correct).length / recent.length;
  const avgLatency =
    recent.reduce((s, t) => s + t.latencyMs, 0) / Math.max(recent.length, 1);
  const abandonRate = recent.filter((t) => t.abandoned).length / recent.length;

  let next: AdaptiveState = { ...prev };

  if (abandonRate > 0 || avgLatency > 20000) {
    return {
      itemCount: Math.max(2, prev.itemCount - 1),
      delaySec: Math.max(20, prev.delaySec - 15),
      cueFloor: Math.min(2, (prev.cueFloor + 1) as CueLevel) as CueLevel,
      difficulty: 'gentle',
    };
  }

  if (accuracy >= 0.8 && avgCue <= 1) {
    next = {
      itemCount: Math.min(4, prev.itemCount + (prev.itemCount < 4 ? 0 : 0) || Math.min(4, prev.itemCount)),
      delaySec: Math.min(90, prev.delaySec + 15),
      cueFloor: 0,
      difficulty: prev.difficulty === 'gentle' ? 'steady' : 'stretch',
    };
    if (prev.itemCount < 4 && accuracy === 1) next.itemCount = prev.itemCount + 1;
  } else if (avgCue >= 2.5 || accuracy < 0.5) {
    next = {
      itemCount: Math.max(2, prev.itemCount - 1),
      delaySec: Math.max(20, prev.delaySec - 15),
      cueFloor: Math.min(2, Math.max(prev.cueFloor, 1) as CueLevel) as CueLevel,
      difficulty: 'gentle',
    };
  }

  return next;
}

export function shouldOfferEarlyExit(trials: KoriTrial[]): boolean {
  if (trials.length < 2) return false;
  const last = trials.slice(-2);
  const slow = last.every((t) => t.latencyMs > 18000);
  const hard = last.every((t) => t.cueLevelReached >= 3);
  return slow || hard;
}

export function buildInsight(trials: KoriTrial[], durationMs: number): SessionInsight {
  const completed = trials.filter((t) => !t.abandoned);
  const accuracy =
    completed.length === 0
      ? 0
      : completed.filter((t) => t.correct).length / completed.length;
  const avgCue =
    completed.length === 0
      ? 0
      : completed.reduce((s, t) => s + t.cueLevelReached, 0) / completed.length;

  const seqTrials = completed.filter((t) => t.stage === 'sequence');
  const delayedTrials = completed.filter((t) => t.stage === 'delayed');

  const routineNote =
    seqTrials.length === 0
      ? 'No routine recall practised yet'
      : avgCueFrom(seqTrials) >= 2
      ? 'Medicine routine required stronger cues'
      : 'Routine recall went smoothly';

  const delayedNote =
    delayedTrials.length === 0
      ? 'Delayed recall not yet practised'
      : delayedTrials.every((t) => t.correct && t.cueLevelReached <= 1)
      ? 'Successfully remembered after a short wait'
      : 'Delayed recall still needs reinforcement';

  const recommendation =
    avgCue >= 2
      ? 'Reinforce the medicine-after-breakfast routine tomorrow.'
      : 'Keep practising today’s Kori — steady and calm.';

  return {
    memoryStatus: accuracy >= 0.7 && avgCue < 2.5 ? 'stable' : 'needs_support',
    routineNote,
    delayedNote,
    recommendation,
    practisedRoutines: seqTrials.length,
    durationMin: Math.max(1, Math.round(durationMs / 60000)),
    avgCueLevel: Math.round(avgCue * 10) / 10,
    accuracy: Math.round(accuracy * 100),
  };
}

function avgCueFrom(trials: KoriTrial[]) {
  if (!trials.length) return 0;
  return trials.reduce((s, t) => s + t.cueLevelReached, 0) / trials.length;
}
