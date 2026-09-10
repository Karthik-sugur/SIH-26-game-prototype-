import { useMemo, useState } from 'react';
import { GamePrompt } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export function getNextDifficulty(
  currentScore: number,
  consecutiveSuccesses: number,
  currentLevel: 'Gentle' | 'Moderate' | 'Challenging'
): 'Gentle' | 'Moderate' | 'Challenging' {
  if (currentScore > 80 && consecutiveSuccesses >= 3) {
    if (currentLevel === 'Gentle') return 'Moderate';
    if (currentLevel === 'Moderate') return 'Challenging';
  } else if (currentScore < 50) {
    if (currentLevel === 'Challenging') return 'Moderate';
    if (currentLevel === 'Moderate') return 'Gentle';
  }
  return currentLevel;
}

export function useGameSession() {
  const { t } = useLanguage();
  const [stage, setStage] = useState<'study' | 'recall' | 'recognition' | 'completed'>('study');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const session: GamePrompt = useMemo(
    () => ({
      id: 'game-mem-01',
      domain: 'Memory',
      title: t('gameTitle'),
      instruction: t('gameInstruction'),
      audioNarrationText: t('gameAudio'),
      objectsToRemember: [
        {
          id: 'obj-1',
          name: t('objChai'),
          hinName: t('objChaiAs'),
          imageUrl: '☕',
          category: 'Kitchen',
        },
        {
          id: 'obj-2',
          name: t('objGlasses'),
          hinName: t('objGlassesAs'),
          imageUrl: '👓',
          category: 'Personal',
        },
        {
          id: 'obj-3',
          name: t('objKey'),
          hinName: t('objKeyAs'),
          imageUrl: '🔑',
          category: 'Home',
        },
      ],
      recallQuestion: t('gameRecall'),
      multipleChoiceOptions: [t('optGlasses'), t('optStick'), t('optPaper'), t('optWatch')],
      correctOptionIndex: 0,
      difficultyLevel: 'Gentle',
    }),
    [t]
  );

  const difficultyLabel = (level: GamePrompt['difficultyLevel']) => {
    if (level === 'Moderate') return t('difficultyModerate');
    if (level === 'Challenging') return t('difficultyChallenging');
    return t('difficultyGentle');
  };

  const startRecall = () => setStage('recall');
  const showRecognitionFallback = () => setStage('recognition');

  const submitAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setIsCorrect(optionIndex === session.correctOptionIndex);
    setStage('completed');
  };

  const resetSession = () => {
    setStage('study');
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return {
    session,
    stage,
    selectedOption,
    isCorrect,
    startRecall,
    showRecognitionFallback,
    submitAnswer,
    resetSession,
    getNextDifficultyStub: getNextDifficulty,
    difficultyLabel,
    domainLabel: t('domainMemory'),
  };
}
