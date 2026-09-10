import { useState } from 'react';
import { MOCK_REMINDERS } from '../mocks/mockData';
import { CuedReminder } from '../types';

/**
 * Service hook for Cued-Recall Reminders.
 */
export function useReminders() {
  const [reminders, setReminders] = useState<CuedReminder[]>(MOCK_REMINDERS);

  const toggleReminderComplete = (id: string) => {
    setReminders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completedToday: !item.completedToday } : item
      )
    );
  };

  const addReminder = (newReminder: Omit<CuedReminder, 'id' | 'completedToday'>) => {
    const created: CuedReminder = {
      ...newReminder,
      id: `rem-${Date.now()}`,
      completedToday: false,
    };
    setReminders((prev) => [...prev, created]);
  };

  return {
    reminders,
    toggleReminderComplete,
    addReminder,
  };
}
