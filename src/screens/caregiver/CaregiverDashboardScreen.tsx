import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useCaregiverData } from '../../services/useCaregiverData';
import { Ionicons } from '@expo/vector-icons';

interface CaregiverDashboardScreenProps {
  onNavigateDetail: () => void;
  onNavigateEscalation: () => void;
}

export const CaregiverDashboardScreen: React.FC<CaregiverDashboardScreenProps> = ({
  onNavigateDetail,
  onNavigateEscalation,
}) => {
  const { weeklySummary, domainScores, alerts } = useCaregiverData();
  const activeAlertCount = alerts.filter((a) => !a.resolved).length;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Caregiver Dashboard</Text>
          <Text style={styles.subtitle}>Patient: Ramesh Patel (74 yrs)</Text>
        </View>
        <TouchableOpacity
          style={styles.alertCountChip}
          onPress={onNavigateEscalation}
        >
          <Ionicons name="notifications" size={20} color={COLORS.white} />
          <Text style={styles.alertCountText}>{activeAlertCount} Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Flagged Concern Banner */}
      {weeklySummary.flaggedConcern && (
        <Card bgColor="#FEF2F2" borderColor={COLORS.error} style={styles.bannerCard}>
          <View style={styles.bannerHeader}>
            <Ionicons name="warning" size={24} color={COLORS.error} />
            <Text style={styles.bannerTitle}>
              Flagged Concern: {weeklySummary.flaggedConcern.title}
            </Text>
          </View>
          <Text style={styles.bannerText}>
            {weeklySummary.flaggedConcern.recommendation}
          </Text>
          <TouchableOpacity onPress={onNavigateEscalation} style={styles.bannerLink}>
            <Text style={styles.bannerLinkText}>View Escalation Recommendation →</Text>
          </TouchableOpacity>
        </Card>
      )}

      {/* What Changed This Week - Plain Language Summary */}
      <Card bgColor={COLORS.white} borderColor={COLORS.skyBlue} style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="calendar-outline" size={22} color={COLORS.skyBlue} />
          <Text style={styles.summaryTitle}>What Changed This Week</Text>
        </View>
        <Text style={styles.headlineText}>{weeklySummary.headline}</Text>
        <Text style={styles.detailsText}>{weeklySummary.details}</Text>
      </Card>

      {/* Domain Trends Overview */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Cognitive Domain Trends</Text>
        <TouchableOpacity onPress={onNavigateDetail}>
          <Text style={styles.seeAllText}>View Full Analysis →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.domainsGrid}>
        {domainScores.map((item) => (
          <Card
            key={item.domain}
            bgColor={COLORS.surface}
            borderColor={COLORS.border}
            style={styles.domainCard}
          >
            <View style={styles.domainCardHeader}>
              <Text style={styles.domainName}>{item.domain}</Text>
              <Badge
                label={item.trend}
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
              <Text style={styles.scoreMax}>/100</Text>
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
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  alertCountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    gap: 6,
  },
  alertCountText: {
    fontSize: 13,
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
  },
  bannerText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  bannerLink: {
    marginTop: SPACING.xs,
  },
  bannerLinkText: {
    fontSize: 14,
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
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.skyBlue,
    textTransform: 'uppercase',
  },
  headlineText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginVertical: 4,
  },
  detailsText: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryGreen,
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
    color: COLORS.textDark,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  scoreNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scoreMax: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 2,
  },
  changeDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
