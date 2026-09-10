import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { useCaregiverData } from '../../services/useCaregiverData';
import { CognitiveDomainScore } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';
import { useKoriSession } from '../../kori/engine/KoriSessionContext';

const TREND_CFG = {
  improving: { icon: 'trending-up' as const, color: COLORS.primaryGreen, bg: COLORS.successLight },
  stable: { icon: 'remove-outline' as const, color: COLORS.warning, bg: COLORS.warningLight },
  declining: { icon: 'trending-down' as const, color: COLORS.error, bg: COLORS.errorLight },
};

const DOMAIN_COLOR: Record<string, string> = {
  Memory: COLORS.primaryGreen,
  Attention: COLORS.skyBlue,
  'Executive Function': COLORS.lavender,
  Language: COLORS.warmOrange,
  Visuospatial: COLORS.teal,
};

function DomainBar({ item }: { item: CognitiveDomainScore }) {
  const color = DOMAIN_COLOR[item.domain] ?? COLORS.primaryGreen;
  const trend = TREND_CFG[item.trend];
  return (
    <View style={domainStyles.row}>
      <View style={domainStyles.labelRow}>
        <Text style={domainStyles.name}>{item.domain}</Text>
        <View style={[domainStyles.trendChip, { backgroundColor: trend.bg }]}>
          <Ionicons name={trend.icon} size={13} color={trend.color} />
          <Text style={[domainStyles.trendText, { color: trend.color }]}>{item.trend}</Text>
        </View>
      </View>
      <View style={domainStyles.barTrack}>
        <View style={[domainStyles.barFill, { width: `${item.score}%`, backgroundColor: color }]} />
      </View>
      <View style={domainStyles.scoreRow}>
        <Text style={[domainStyles.score, { color }]}>{item.score}</Text>
        <Text style={domainStyles.scoreSuffix}>/100</Text>
        <Text style={domainStyles.changeDesc}>{item.changeDescription}</Text>
      </View>
    </View>
  );
}

const domainStyles = StyleSheet.create({
  row: { marginBottom: SPACING.md },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  trendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  trendText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  barTrack: {
    height: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: { height: '100%', borderRadius: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  score: { fontSize: 16, fontWeight: '800' },
  scoreSuffix: { fontSize: 12, color: COLORS.textMuted },
  changeDesc: { fontSize: 11, color: COLORS.textSubtle, flex: 1, textAlign: 'right' },
});

interface CaregiverDashboardScreenProps {
  onNavigateDetail: () => void;
  onNavigateEscalation: () => void;
}

export const CaregiverDashboardScreen: React.FC<CaregiverDashboardScreenProps> = ({
  onNavigateDetail,
  onNavigateEscalation,
}) => {
  const { weeklySummary, domainScores, alerts } = useCaregiverData();
  const { lastInsight } = useKoriSession();
  const { t } = useLanguage();
  const activeAlertCount = alerts.filter((a) => !a.resolved).length;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>{t('caregiverDashboard')}</Text>
          <Text style={styles.subtitle}>Ramesh Patel · 74 yrs</Text>
        </View>
        <TouchableOpacity onPress={onNavigateEscalation} style={styles.alertBadge}>
          <Ionicons name="notifications" size={18} color={COLORS.white} />
          <Text style={styles.alertBadgeText}>{t('alertsCount', { count: activeAlertCount })}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.koriInsight}>
        <Text style={styles.koriInsightTitle}>{t('koriInsightTitle')}</Text>
        {lastInsight ? (
          <>
            <Text style={styles.koriLine}>
              <Text style={styles.koriKey}>{t('koriInsightMemory')}: </Text>
              {lastInsight.memoryStatus === 'stable' ? t('koriStable') : t('koriNeedsSupport')}
            </Text>
            <Text style={styles.koriLine}>
              <Text style={styles.koriKey}>{t('koriInsightRoutine')}: </Text>
              {lastInsight.routineNote}
            </Text>
            <Text style={styles.koriLine}>
              <Text style={styles.koriKey}>{t('koriInsightDelayed')}: </Text>
              {lastInsight.delayedNote}
            </Text>
            <Text style={[styles.koriLine, { marginTop: 8 }]}>
              <Text style={styles.koriKey}>{t('koriInsightRec')}: </Text>
              {lastInsight.recommendation}
            </Text>
          </>
        ) : (
          <Text style={styles.koriEmpty}>{t('koriInsightEmpty')}</Text>
        )}
      </View>

      {weeklySummary.flaggedConcern && (
        <TouchableOpacity
          onPress={onNavigateEscalation}
          activeOpacity={0.85}
          style={styles.concernBanner}
        >
          <View style={styles.concernIconWrap}>
            <Ionicons name="warning" size={20} color={COLORS.error} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.concernTitle}>{weeklySummary.flaggedConcern.title}</Text>
            <Text style={styles.concernText}>{weeklySummary.flaggedConcern.recommendation}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.error} />
        </TouchableOpacity>
      )}

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeaderRow}>
          <View style={styles.calIconWrap}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.skyBlue} />
          </View>
          <Text style={styles.summaryLabel}>{t('whatChanged')}</Text>
        </View>
        <Text style={styles.summaryHeadline}>{weeklySummary.headline}</Text>
        <Text style={styles.summaryDetail}>{weeklySummary.details}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('domainTrends')}</Text>
        <TouchableOpacity onPress={onNavigateDetail}>
          <Text style={styles.seeAll}>{t('viewFull')} →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.domainsCard}>
        {domainScores.map((item) => (
          <DomainBar key={item.domain} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
    gap: SPACING.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    ...SHADOWS.colored(COLORS.error),
  },
  alertBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.white,
  },
  koriInsight: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  koriInsightTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
  },
  koriLine: {
    fontSize: 15,
    color: COLORS.textDark,
    lineHeight: 22,
    marginBottom: 4,
  },
  koriKey: {
    fontWeight: '800',
    color: COLORS.primaryGreen,
  },
  koriEmpty: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
  },
  concernBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.errorLight,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.error + '33',
  },
  concernIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  concernTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.error,
    marginBottom: 2,
  },
  concernText: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 17,
  },
  summaryCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
    gap: 6,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.skyBlueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.skyBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  summaryHeadline: {
    fontSize: ACCESSIBILITY.fontSize.heading - 4,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.2,
  },
  summaryDetail: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 19,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading - 4,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
  domainsCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
});
