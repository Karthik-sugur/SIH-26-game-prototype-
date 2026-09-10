import { useState } from 'react';
import { MOCK_PATIENT } from '../mocks/mockData';
import { PatientProfile } from '../types';

/**
 * Service hook layer for Patient profile data.
 * Keeps data access decoupled so WatermelonDB / SQLite sync can replace mock state seamlessly.
 */
export function usePatientData() {
  const [patient, setPatient] = useState<PatientProfile>(MOCK_PATIENT);

  const incrementStreak = () => {
    setPatient((prev) => ({ ...prev, streakDays: prev.streakDays + 1 }));
  };

  return {
    patient,
    incrementStreak,
  };
}
