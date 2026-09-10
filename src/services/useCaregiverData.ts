import { useMemo, useState } from 'react';
import { CognitiveDomainScore, WeeklySummary, EscalationAlert } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { TranslationKey } from '../i18n/translations';

const SCORE_SEED: Array<{
  domainKey: TranslationKey;
  score: number;
  trend: CognitiveDomainScore['trend'];
  changeKey: TranslationKey;
}> = [
  { domainKey: 'domainMemory', score: 72, trend: 'stable', changeKey: 'memChange' },
  { domainKey: 'domainAttention', score: 85, trend: 'improving', changeKey: 'attChange' },
  { domainKey: 'domainExecutive', score: 68, trend: 'stable', changeKey: 'exeChange' },
  { domainKey: 'domainLanguage', score: 78, trend: 'improving', changeKey: 'langChange' },
  { domainKey: 'domainVisuospatial', score: 61, trend: 'declining', changeKey: 'visChange' },
];

const ALERT_SEED = [
  {
    id: 'esc-01',
    date: '10 Sep 2026',
    titleKey: 'alert1Title' as TranslationKey,
    reasonKey: 'alert1Reason' as TranslationKey,
    actionKey: 'alert1Action' as TranslationKey,
    targetKey: 'alert1Target' as TranslationKey,
    resolved: false,
  },
  {
    id: 'esc-02',
    date: '04 Sep 2026',
    titleKey: 'alert2Title' as TranslationKey,
    reasonKey: 'alert2Reason' as TranslationKey,
    actionKey: 'alert2Action' as TranslationKey,
    targetKey: 'alert2Target' as TranslationKey,
    resolved: true,
  },
];

export function useCaregiverData() {
  const { t } = useLanguage();
  const [resolvedIds, setResolvedIds] = useState<Record<string, boolean>>(
    Object.fromEntries(ALERT_SEED.map((a) => [a.id, a.resolved]))
  );

  const domainScores: CognitiveDomainScore[] = useMemo(
    () =>
      SCORE_SEED.map((s) => ({
        domain: t(s.domainKey),
        score: s.score,
        trend: s.trend,
        changeDescription: t(s.changeKey),
      })),
    [t]
  );

  const weeklySummary: WeeklySummary = useMemo(
    () => ({
      headline: t('weeklyHeadline'),
      details: t('weeklyDetails'),
      flaggedConcern: {
        severity: 'medium',
        title: t('concernTitle'),
        recommendation: t('concernRec'),
      },
    }),
    [t]
  );

  const alerts: EscalationAlert[] = useMemo(
    () =>
      ALERT_SEED.map((a) => ({
        id: a.id,
        date: a.date,
        title: t(a.titleKey),
        reason: t(a.reasonKey),
        suggestedAction: t(a.actionKey),
        contactTarget: t(a.targetKey),
        resolved: resolvedIds[a.id] ?? a.resolved,
      })),
    [t, resolvedIds]
  );

  const resolveAlert = (id: string) => {
    setResolvedIds((prev) => ({ ...prev, [id]: true }));
  };

  const trendLabel = (trend: CognitiveDomainScore['trend']) => {
    if (trend === 'improving') return t('trendImproving');
    if (trend === 'declining') return t('trendDeclining');
    return t('trendStable');
  };

  return {
    domainScores,
    weeklySummary,
    alerts,
    resolveAlert,
    trendLabel,
  };
}
