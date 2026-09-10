import { useState } from 'react';
import { MOCK_GAME_SESSION } from '../mocks/mockData';
import { GamePrompt } from '../types';

/**
 * Adaptive Difficulty Stub function (Hook point for future ML / Rules Engine).
 * Dynamically determines the next game session difficulty level based on patient performance.
 */
export function getNextDifficulty(
  currentScore: number,
  consecutiveSuccesses: number,
  currentLevel: 'Gentle' | 'Moderate' | 'Challenging'
): 'Gentle' | 'Moderate' | 'Challenging' {
  // STUB: Replace this with real adaptive difficulty algorithm in future pass
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
  const [session, setSession] = useState<GamePrompt>(MOCK_GAME_SESSION);
  const [stage, setStage] = useState<'study' | 'recall' | 'recognition' | 'completed'>('study');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startRecall = () => {
    setStage('recall');
  };

  const showRecognitionFallback = () => {
    setStage('recognition');
  };

  const submitAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const correct = optionIndex === session.correctOptionIndex;
    setIsCorrect(correct);
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
  };
}
