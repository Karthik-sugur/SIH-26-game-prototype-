import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useCaregiverData } from '../../services/useCaregiverData';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

interface CaregiverDashboardScreenProps {
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
        <Text style={styles.headlineText}>{weeklySummary.headline}</Text>
        <Text style={styles.detailsText}>{weeklySummary.details}</Text>
      </Card>

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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  alertCountChip: {
    flexDirection: 'row',
    alignItems: 'center',
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
  bannerCard: {
    marginBottom: SPACING.md,
  },
  bannerHeader: {
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
  bannerLink: {
    marginTop: SPACING.xs,
  },
  bannerLinkText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.error,
  },
  summaryCard: {
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.xs,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.info,
  },
  headlineText: {
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    flex: 1,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  domainsGrid: {
    gap: SPACING.xs,
  },
  domainCard: {
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
