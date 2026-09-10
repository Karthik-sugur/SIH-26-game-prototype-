import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY, SHADOWS } from '../../theme/tokens';
import { useCaregiverData } from '../../services/useCaregiverData';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

const DOMAIN_COLOR: Record<string, string> = {
  Memory: COLORS.primaryGreen,
  Attention: COLORS.skyBlue,
  'Executive Function': COLORS.lavender,
  Language: COLORS.warmOrange,
  Visuospatial: COLORS.teal,
};

export const PatientDetailScreen: React.FC = () => {
  const { domainScores, trendLabel } = useCaregiverData();
  const { t } = useLanguage();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('domainBreakdown')}</Text>
      <Text style={styles.subtitle}>{t('detailedFor', { name: 'Ramesh Patel' })}</Text>

      {domainScores.map((item) => (
        <Card key={item.domain} bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.domainDetailCard}>
          <View style={styles.cardHeader}>
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

          <View style={styles.barContainer}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${item.score}%`,
                  backgroundColor:
                    item.score > 75
                      ? COLORS.primary
                      : item.score > 65
                      ? COLORS.info
                      : COLORS.accent,
                },
              ]}
            />
          </View>

            <View style={styles.scoreRow}>
              <Text style={[styles.scoreText, { color }]}>{item.score} / 100</Text>
              <Text style={styles.descText}>{item.changeDescription}</Text>
            </View>
          </View>
        );
      })}

      <Text style={[styles.title, { marginTop: SPACING.md }]}>{t('recentHistory')}</Text>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.historyCard}>
        <View style={styles.sessionRow}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.sessionTitle}>{t('morningRecall')}</Text>
            <Text style={styles.sessionTime}>10 Sep 2026 • 09:15 AM</Text>
          </View>
          <Text style={styles.sessionScore}>{t('scorePct')}</Text>
        </View>

        <View style={[styles.sessionRow, { marginTop: SPACING.sm }]}>
          <Ionicons name="time" size={24} color={COLORS.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.sessionTitle}>{t('visuospatialPrompt')}</Text>
            <Text style={styles.sessionTime}>09 Sep 2026 • 04:30 PM</Text>
          </View>
          <Text style={styles.sessionScore}>{t('hesitation')}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
    gap: SPACING.xs,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  domainCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  domainName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  barContainer: {
    height: 14,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: SPACING.sm,
  },
  scoreText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  descText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  historyCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
    gap: SPACING.sm,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sessionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  sessionTime: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  scoreBadge: {
    backgroundColor: COLORS.mintGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  sessionScore: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
