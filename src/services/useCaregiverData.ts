import { useState } from 'react';
import { MOCK_COGNITIVE_SCORES, MOCK_WEEKLY_SUMMARY, MOCK_ESCALATION_ALERTS } from '../mocks/mockData';
import { CognitiveDomainScore, WeeklySummary, EscalationAlert } from '../types';

/**
 * Service hook layer for Caregiver analytical views.
 */
export function useCaregiverData() {
  const [domainScores] = useState<CognitiveDomainScore[]>(MOCK_COGNITIVE_SCORES);
  const [weeklySummary] = useState<WeeklySummary>(MOCK_WEEKLY_SUMMARY);
  const [alerts, setAlerts] = useState<EscalationAlert[]>(MOCK_ESCALATION_ALERTS);

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, resolved: true } : alert))
    );
  };

  return {
    domainScores,
    weeklySummary,
    alerts,
    resolveAlert,
  };
}
