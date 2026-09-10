import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { useCaregiverData } from '../../services/useCaregiverData';
import { CognitiveDomainScore } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

const TREND_CFG = {
  improving: { icon: 'trending-up' as const,    color: COLORS.primaryGreen, bg: COLORS.successLight },
  stable:    { icon: 'remove-outline' as const,  color: COLORS.warning,      bg: COLORS.warningLight },
  declining: { icon: 'trending-down' as const,   color: COLORS.error,        bg: COLORS.errorLight },
};

const DOMAIN_COLOR: Record<string, string> = {
  'Memory':             COLORS.primaryGreen,
  'Attention':          COLORS.skyBlue,
  'Executive Function': COLORS.lavender,
  'Language':           COLORS.warmOrange,
  'Visuospatial':       COLORS.teal,
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
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  name: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  trendChip: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  trendText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  barTrack: { height: 8, backgroundColor: COLORS.surface, borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  barFill: { height: '100%', borderRadius: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  score: { fontSize: 16, fontWeight: '800' },
  scoreSuffix: { fontSize: 12, color: COLORS.textMuted },
  changeDesc: { fontSize: 11, color: COLORS.textSubtle, flex: 1, textAlign: 'right' },
});

interface Props {
  onNavigateDetail: () => void;
  onNavigateEscalation: () => void;
}

const TILE_COLORS = [COLORS.tileJade, COLORS.tileRose, COLORS.tileSky, COLORS.tileSand, COLORS.primarySoft];

export const CaregiverDashboardScreen: React.FC<CaregiverDashboardScreenProps> = ({
  onNavigateDetail,
  onNavigateEscalation,
}) => {
  const { weeklySummary, domainScores, alerts, trendLabel } = useCaregiverData();
  const { t } = useLanguage();
  const activeAlertCount = alerts.filter((a) => !a.resolved).length;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{t('caregiverDashboard')}</Text>
          <Text style={styles.subtitle}>
            {t('patientLabel', { name: 'Ramesh Patel', age: 74 })}
          </Text>
        </View>
        <TouchableOpacity style={styles.alertCountChip} onPress={onNavigateEscalation}>
          <Ionicons name="notifications" size={20} color={COLORS.white} />
          <Text style={styles.alertCountText}>{t('alertsCount', { count: activeAlertCount })}</Text>
        </TouchableOpacity>
      </View>

      {weeklySummary.flaggedConcern && (
        <Card bgColor={COLORS.errorBg} borderColor={COLORS.error} style={styles.bannerCard}>
          <View style={styles.bannerHeader}>
            <Ionicons name="warning" size={24} color={COLORS.error} />
            <Text style={styles.bannerTitle}>
              {t('flaggedConcern', { title: weeklySummary.flaggedConcern.title })}
            </Text>
          </View>
          <Text style={styles.bannerText}>{weeklySummary.flaggedConcern.recommendation}</Text>
          <TouchableOpacity onPress={onNavigateEscalation} style={styles.bannerLink}>
            <Text style={styles.bannerLinkText}>{t('viewEscalation')} →</Text>
          </TouchableOpacity>
        </Card>
      )}

      <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="calendar-outline" size={22} color={COLORS.info} />
          <Text style={styles.summaryTitle}>{t('whatChanged')}</Text>
        </View>
        <Text style={styles.summaryHeadline}>{weeklySummary.headline}</Text>
        <Text style={styles.summaryDetail}>{weeklySummary.details}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('domainTrends')}</Text>
        <TouchableOpacity onPress={onNavigateDetail}>
          <Text style={styles.seeAllText}>{t('viewFull')} →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.domainsGrid}>
        {domainScores.map((item, index) => (
          <Card
            key={item.domain}
            bgColor={TILE_COLORS[index % TILE_COLORS.length]}
            borderColor={COLORS.border}
            style={styles.domainCard}
          >
            <View style={styles.domainCardHeader}>
              <Text style={styles.domainName}>{item.domain}</Text>
              <Badge
                label={trendLabel(item.trend)}
                type={
                  item.trend === 'improving'
                    ? 'success'
                    : item.trend === 'declining'
                    ? 'warning'
                    : 'stable'
                }
              />
            </View>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreNumber}>{item.score}</Text>
              <Text style={styles.scoreMax}>{t('scoreOf')}</Text>
            </View>
            <Text style={styles.changeDesc}>{item.changeDescription}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
    gap: SPACING.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    gap: 6,
    minHeight: 44,
  },
  alertCountText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  concernBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.error,
    flex: 1,
  },
  bannerText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
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
  bannerLinkText: {
    fontSize: 15,
    fontWeight: '700',
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
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.info,
  },
  summaryHeadline: {
    fontSize: ACCESSIBILITY.fontSize.heading - 4,
    fontWeight: '800',
    color: COLORS.text,
    marginVertical: 4,
  },
  detailsText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading - 4,
    fontWeight: '800',
    color: COLORS.text,
    flex: 1,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  domainsCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
  },
  domainCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  domainName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  scoreMax: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  changeDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
