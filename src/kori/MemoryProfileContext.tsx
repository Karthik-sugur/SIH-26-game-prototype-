import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { DEFAULT_MEMORY_PROFILE } from './content/sampleRoutine';
import { PersonalMemoryProfile } from './types';

interface MemoryProfileContextValue {
  profile: PersonalMemoryProfile;
  updateProfile: (next: PersonalMemoryProfile) => void;
  updateRoutineSteps: (routineId: string, steps: string[]) => void;
}

const MemoryProfileContext = createContext<MemoryProfileContextValue | null>(null);

export function MemoryProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<PersonalMemoryProfile>(DEFAULT_MEMORY_PROFILE);

  const updateProfile = useCallback((next: PersonalMemoryProfile) => {
    setProfile(next);
  }, []);

  const updateRoutineSteps = useCallback((routineId: string, steps: string[]) => {
    setProfile((prev) => ({
      ...prev,
      routines: prev.routines.map((r) => (r.id === routineId ? { ...r, steps } : r)),
    }));
  }, []);

  const value = useMemo(
    () => ({ profile, updateProfile, updateRoutineSteps }),
    [profile, updateProfile, updateRoutineSteps]
  );

  return (
    <MemoryProfileContext.Provider value={value}>{children}</MemoryProfileContext.Provider>
  );
}

export function useMemoryProfile() {
  const ctx = useContext(MemoryProfileContext);
  if (!ctx) throw new Error('useMemoryProfile must be used within MemoryProfileProvider');
  return ctx;
}
