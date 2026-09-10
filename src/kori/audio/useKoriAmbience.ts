import { useCallback, useState } from 'react';

/**
 * Soft Bihu / village ambience stub.
 * Tracks mute state; ready to plug expo-av when an audio asset is added.
 */
export function useKoriAmbience() {
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      setPlaying(next);
      return next;
    });
  }, []);

  const play = useCallback(() => {
    if (!enabled) return;
    setPlaying(true);
  }, [enabled]);

  const stop = useCallback(() => {
    setPlaying(false);
  }, []);

  return {
    enabled,
    playing,
    toggle,
    play,
    stop,
    label: enabled ? 'Ambience on' : 'Ambience off',
  };
}
