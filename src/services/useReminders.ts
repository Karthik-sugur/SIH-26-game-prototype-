import { useMemo, useState } from 'react';
import { CuedReminder } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';

type ReminderSeed = {
  id: string;
  time: string;
  category: CuedReminder['category'];
  questionKey: TranslationKey;
  subtitleKey: TranslationKey;
  audioKey: TranslationKey;
  defaultCompleted: boolean;
};

const REMINDER_SEED: ReminderSeed[] = [
  {
    id: 'rem-1',
    time: '08:00 AM',
    category: 'medicine',
    questionKey: 'rem1Question',
    subtitleKey: 'rem1Subtitle',
    audioKey: 'rem1Audio',
    defaultCompleted: true,
  },
  {
    id: 'rem-2',
    time: '11:30 AM',
    category: 'hydration',
    questionKey: 'rem2Question',
    subtitleKey: 'rem2Subtitle',
    audioKey: 'rem2Audio',
    defaultCompleted: false,
  },
  {
    id: 'rem-3',
    time: '04:30 PM',
    category: 'activity',
    questionKey: 'rem3Question',
    subtitleKey: 'rem3Subtitle',
    audioKey: 'rem3Audio',
    defaultCompleted: false,
  },
  {
    id: 'rem-4',
    time: '08:00 PM',
    category: 'medicine',
    questionKey: 'rem4Question',
    subtitleKey: 'rem4Subtitle',
    audioKey: 'rem4Audio',
    defaultCompleted: false,
  },
];

const categoryKey = (c: CuedReminder['category']): TranslationKey => {
  switch (c) {
    case 'medicine':
      return 'categoryMedicine';
    case 'hydration':
      return 'categoryHydration';
    case 'activity':
      return 'categoryActivity';
    case 'appointment':
      return 'categoryAppointment';
  }
};

export function useReminders() {
  const { t } = useLanguage();
  const [completion, setCompletion] = useState<Record<string, boolean>>(
    Object.fromEntries(REMINDER_SEED.map((r) => [r.id, r.defaultCompleted]))
  );
  const [extras, setExtras] = useState<CuedReminder[]>([]);

  const reminders = useMemo(() => {
    const localized: CuedReminder[] = REMINDER_SEED.map((r) => ({
      id: r.id,
      time: r.time,
      category: r.category,
      questionPrompt: t(r.questionKey),
      subtitle: t(r.subtitleKey),
      audioNarrationText: t(r.audioKey),
      completedToday: completion[r.id] ?? false,
    }));
    return [...localized, ...extras];
  }, [t, completion, extras]);

  const toggleReminderComplete = (id: string) => {
    if (extras.some((e) => e.id === id)) {
      setExtras((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completedToday: !item.completedToday } : item
        )
      );
      return;
    }
    setCompletion((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addReminder = (newReminder: Omit<CuedReminder, 'id' | 'completedToday'>) => {
    const created: CuedReminder = {
      ...newReminder,
      id: `rem-${Date.now()}`,
      completedToday: false,
    };
    setExtras((prev) => [...prev, created]);
  };

  return {
    reminders,
    toggleReminderComplete,
    addReminder,
    categoryLabel: (c: CuedReminder['category']) => t(categoryKey(c)),
  };
}
