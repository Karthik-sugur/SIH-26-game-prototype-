import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CULTURAL_ITEMS, pickItems } from '../content/culturalPack';
import { SAMPLE_MORNING_ROUTINE } from '../content/sampleRoutine';
import { useMemoryProfile } from '../MemoryProfileContext';
import {
  adaptAfterTrials,
  buildInsight,
  DEFAULT_ADAPTIVE,
  shouldOfferEarlyExit,
} from './adaptiveStub';
import {
  AdaptiveState,
  CueLevel,
  KoriItem,
  KoriPhase,
  KoriStageKind,
  KoriTrial,
  SessionInsight,
} from '../types';

interface ActivePrompt {
  stage: KoriStageKind;
  promptEn: string;
  promptAs: string;
  targetId: string;
  optionIds: string[];
  sequence?: string[];
}

interface KoriSessionContextValue {
  phase: KoriPhase;
  observeItems: KoriItem[];
  activePrompt: ActivePrompt | null;
  cueLevel: CueLevel;
  cueMessageEn: string;
  cueMessageAs: string;
  trials: KoriTrial[];
  adaptive: AdaptiveState;
  insight: SessionInsight | null;
  lastInsight: SessionInsight | null;
  baselineDone: boolean;
  isBaseline: boolean;
  offerEarlyExit: boolean;
  delaySecondsLeft: number;
  startedAt: number | null;
  startSession: () => void;
  finishObserve: () => void;
  requestHint: () => void;
  submitChoice: (optionId: string) => { correct: boolean; advanced: boolean };
  skipDelay: () => void;
  acceptEarlyExit: () => void;
  continueAfterExitOffer: () => void;
  resetToStart: () => void;
  getItemLabel: (id: string, lang: 'en' | 'as') => string;
}

const KoriSessionContext = createContext<KoriSessionContextValue | null>(null);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cueCopy(level: CueLevel, targetLabel: string): { en: string; as: string } {
  switch (level) {
    case 0:
      return { en: '', as: '' };
    case 1:
      return {
        en: 'It is something familiar from home or morning.',
        as: 'এয়া ঘৰ বা ৰাতিপুৱাৰ পৰা পৰিচিত কিবা এটা।',
      };
    case 2:
      return {
        en: `Picture this gently: ${targetLabel}`,
        as: `মৃদুভাৱে ভাৱক: ${targetLabel}`,
      };
    case 3:
      return {
        en: 'Choose between the two soft options below.',
        as: 'তলৰ দুটা মৃদু বিকল্পৰ মাজৰ পৰা বাছনি কৰক।',
      };
    case 4:
      return {
        en: `Let's try together — the answer is ${targetLabel}.`,
        as: `একেলগে চেষ্টা কৰোঁ — উত্তৰ হৈছে ${targetLabel}।`,
      };
  }
}

export function KoriSessionProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useMemoryProfile();
  const [phase, setPhase] = useState<KoriPhase>('start');
  const [observeItems, setObserveItems] = useState<KoriItem[]>([]);
  const [activePrompt, setActivePrompt] = useState<ActivePrompt | null>(null);
  const [cueLevel, setCueLevel] = useState<CueLevel>(0);
  const [trials, setTrials] = useState<KoriTrial[]>([]);
  const [adaptive, setAdaptive] = useState<AdaptiveState>(DEFAULT_ADAPTIVE);
  const [insight, setInsight] = useState<SessionInsight | null>(null);
  const [lastInsight, setLastInsight] = useState<SessionInsight | null>(null);
  const [baselineDone, setBaselineDone] = useState(false);
  const [isBaseline, setIsBaseline] = useState(false);
  const [offerEarlyExit, setOfferEarlyExit] = useState(false);
  const [delaySecondsLeft, setDelaySecondsLeft] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const promptStartedAt = useRef(Date.now());
  const delayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayedTargetId = useRef('medicine');
  const trialsRef = useRef<KoriTrial[]>([]);
  const adaptiveRef = useRef(adaptive);
  adaptiveRef.current = adaptive;

  const clearDelayTimer = () => {
    if (delayTimer.current) {
      clearInterval(delayTimer.current);
      delayTimer.current = null;
    }
  };

  const getItemLabel = useCallback((id: string, lang: 'en' | 'as') => {
    const item = CULTURAL_ITEMS.find((i) => i.id === id);
    if (!item) return id;
    return lang === 'as' ? item.nameAs : item.nameEn;
  }, []);

  const finalizeSession = useCallback((allTrials: KoriTrial[], start: number, wasBaseline: boolean) => {
    clearDelayTimer();
    const built = buildInsight(allTrials, Date.now() - start);
    const nextAdaptive = adaptAfterTrials(adaptiveRef.current, allTrials);
    setAdaptive(nextAdaptive);
    setInsight(built);
    setLastInsight(built);
    if (wasBaseline) setBaselineDone(true);
    setIsBaseline(false);
    setPhase('end');
    setOfferEarlyExit(false);
  }, []);

  const beginRecognitionPrompt = useCallback((items: KoriItem[], floor: CueLevel) => {
    const target = items[Math.floor(Math.random() * items.length)];
    const distractors = shuffle(
      CULTURAL_ITEMS.filter((i) => !items.find((o) => o.id === i.id))
    ).slice(0, 3);
    setActivePrompt({
      stage: 'recognition',
      promptEn: 'Which one did you see?',
      promptAs: 'আপুনি কোনটো দেখিছিল?',
      targetId: target.id,
      optionIds: shuffle([target, ...distractors]).map((i) => i.id),
    });
    delayedTargetId.current = target.id;
    setCueLevel(floor);
    promptStartedAt.current = Date.now();
    setPhase('recall');
  }, []);

  const beginSequencePrompt = useCallback((floor: CueLevel) => {
    const steps =
      profile.routines[0]?.steps?.length >= 2
        ? profile.routines[0].steps
        : [...SAMPLE_MORNING_ROUTINE];
    const anchor = steps[0];
    const target = steps[1];
    const distractors = ['Lunch', 'Walk', 'Tea', 'Rest'].filter((s) => !steps.includes(s));
    setActivePrompt({
      stage: 'sequence',
      promptEn: `What comes after ${anchor}?`,
      promptAs: `${anchor}ৰ পাছত কি আহে?`,
      targetId: target,
      optionIds: shuffle([target, ...distractors.slice(0, 3)]),
      sequence: steps,
    });
    setCueLevel(floor);
    promptStartedAt.current = Date.now();
    setPhase('sequence');
  }, [profile.routines]);

  const beginDelayedPrompt = useCallback((floor: CueLevel) => {
    const target =
      CULTURAL_ITEMS.find((i) => i.id === delayedTargetId.current) || CULTURAL_ITEMS[0];
    const distractors = shuffle(CULTURAL_ITEMS.filter((i) => i.id !== target.id)).slice(0, 3);
    setActivePrompt({
      stage: 'delayed',
      promptEn: 'Earlier — which one did we practise?',
      promptAs: 'আগতে — আমি কোনটো অনুশীলন কৰিছিলোঁ?',
      targetId: target.id,
      optionIds: shuffle([target, ...distractors]).map((i) => i.id),
    });
    setCueLevel(floor);
    promptStartedAt.current = Date.now();
    setPhase('delayed');
  }, []);

  const startDelay = useCallback(
    (seconds: number, floor: CueLevel) => {
      clearDelayTimer();
      setPhase('delayWait');
      setDelaySecondsLeft(seconds);
      let left = seconds;
      delayTimer.current = setInterval(() => {
        left -= 1;
        setDelaySecondsLeft(left);
        if (left <= 0) {
          clearDelayTimer();
          beginDelayedPrompt(floor);
        }
      }, 1000);
    },
    [beginDelayedPrompt]
  );

  const startSession = useCallback(() => {
    clearDelayTimer();
    const doBaseline = !baselineDone;
    setIsBaseline(doBaseline);
    const count = doBaseline ? 3 : adaptiveRef.current.itemCount;
    const items = pickItems(count, ['flower', 'home', 'elder', 'orange']);
    setObserveItems(items);
    setTrials([]);
    trialsRef.current = [];
    setInsight(null);
    setOfferEarlyExit(false);
    setCueLevel(adaptiveRef.current.cueFloor);
    setStartedAt(Date.now());
    setActivePrompt(null);
    setPhase('observe');
  }, [baselineDone]);

  const finishObserve = useCallback(() => {
    beginRecognitionPrompt(observeItems, adaptiveRef.current.cueFloor);
  }, [observeItems, beginRecognitionPrompt]);

  const requestHint = useCallback(() => {
    setCueLevel((prev) => Math.min(4, (prev + 1) as CueLevel) as CueLevel);
  }, []);

  const advanceAfterTrial = useCallback(
    (allTrials: KoriTrial[], wasBaseline: boolean, start: number) => {
      if (shouldOfferEarlyExit(allTrials) && allTrials.length >= 2) {
        setOfferEarlyExit(true);
      }
      const last = allTrials[allTrials.length - 1];
      const floor = adaptiveRef.current.cueFloor;

      if (last.stage === 'recognition') {
        beginSequencePrompt(floor);
        return;
      }
      if (last.stage === 'sequence') {
        startDelay(wasBaseline ? 20 : adaptiveRef.current.delaySec, floor);
        return;
      }
      if (last.stage === 'delayed') {
        finalizeSession(allTrials, start, wasBaseline);
      }
    },
    [beginSequencePrompt, startDelay, finalizeSession]
  );

  const submitChoice = useCallback(
    (optionId: string) => {
      if (!activePrompt) return { correct: false, advanced: false };

      const correct =
        optionId === activePrompt.targetId ||
        optionId.toLowerCase() === String(activePrompt.targetId).toLowerCase();

      if (!correct && cueLevel < 4) {
        setCueLevel((prev) => Math.min(4, (prev + 1) as CueLevel) as CueLevel);
        return { correct: false, advanced: false };
      }

      const forceCorrect = correct || cueLevel >= 4;
      const trial: KoriTrial = {
        id: `t-${Date.now()}`,
        timestamp: Date.now(),
        latencyMs: Date.now() - promptStartedAt.current,
        stage: activePrompt.stage,
        prompt: activePrompt.promptEn,
        targetId: String(activePrompt.targetId),
        optionIds: activePrompt.optionIds,
        correct: forceCorrect,
        cueLevelReached: cueLevel,
        selfCorrected: !correct && cueLevel >= 3,
        abandoned: false,
      };

      const all = [...trialsRef.current, trial];
      trialsRef.current = all;
      setTrials(all);
      advanceAfterTrial(all, isBaseline, startedAt ?? Date.now());
      return { correct: forceCorrect, advanced: true };
    },
    [activePrompt, cueLevel, advanceAfterTrial, isBaseline, startedAt]
  );

  const skipDelay = useCallback(() => {
    clearDelayTimer();
    beginDelayedPrompt(adaptiveRef.current.cueFloor);
  }, [beginDelayedPrompt]);

  const acceptEarlyExit = useCallback(() => {
    finalizeSession(trialsRef.current, startedAt ?? Date.now(), isBaseline);
  }, [finalizeSession, startedAt, isBaseline]);

  const continueAfterExitOffer = useCallback(() => {
    setOfferEarlyExit(false);
  }, []);

  const resetToStart = useCallback(() => {
    clearDelayTimer();
    setPhase('start');
    setActivePrompt(null);
    setObserveItems([]);
    setCueLevel(0);
    setOfferEarlyExit(false);
    setDelaySecondsLeft(0);
  }, []);

  const cueMsg = useMemo(() => {
    const label =
      activePrompt?.stage === 'sequence'
        ? String(activePrompt.targetId)
        : getItemLabel(activePrompt?.targetId || '', 'en');
    return cueCopy(cueLevel, label);
  }, [cueLevel, activePrompt, getItemLabel]);

  const value: KoriSessionContextValue = {
    phase,
    observeItems,
    activePrompt,
    cueLevel,
    cueMessageEn: cueMsg.en,
    cueMessageAs: cueMsg.as,
    trials,
    adaptive,
    insight,
    lastInsight,
    baselineDone,
    isBaseline,
    offerEarlyExit,
    delaySecondsLeft,
    startedAt,
    startSession,
    finishObserve,
    requestHint,
    submitChoice,
    skipDelay,
    acceptEarlyExit,
    continueAfterExitOffer,
    resetToStart,
    getItemLabel,
  };

  return (
    <KoriSessionContext.Provider value={value}>{children}</KoriSessionContext.Provider>
  );
}

export function useKoriSession() {
  const ctx = useContext(KoriSessionContext);
  if (!ctx) throw new Error('useKoriSession must be used within KoriSessionProvider');
  return ctx;
}
