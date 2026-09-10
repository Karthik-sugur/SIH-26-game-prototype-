import { useMemo, useState } from 'react';
import { MOCK_PATIENT } from '../mocks/mockData';
import { PatientProfile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export function usePatientData() {
  const { t } = useLanguage();
  const [streakDays, setStreakDays] = useState(MOCK_PATIENT.streakDays);

  const patient: PatientProfile = useMemo(
    () => ({
      ...MOCK_PATIENT,
      streakDays,
      location: t('locationAhmedabad'),
      preferredLanguage: t('preferredLanguagesValue'),
      emergencyContact: {
        ...MOCK_PATIENT.emergencyContact,
        name: t('emergencyName'),
        relation: t('primaryCaregiver'),
      },
    }),
    [t, streakDays]
  );

  const incrementStreak = () => {
    setStreakDays((prev) => prev + 1);
  };

  return {
    patient,
    incrementStreak,
  };
}
