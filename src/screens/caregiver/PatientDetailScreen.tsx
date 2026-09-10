import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY, SHADOWS } from '../../theme/tokens';
import { useCaregiverData } from '../../services/useCaregiverData';
import { Ionicons } from '@expo/vector-icons';

const DOMAIN_COLOR: Record<string, string> = {
  Memory: COLORS.primaryGreen,
  Attention: COLORS.skyBlue,
  'Executive Function': COLORS.lavender,
  Language: COLORS.warmOrange,
  Visuospatial: COLORS.teal,
};

export const PatientDetailScreen: React.FC = () => {
  const { domainScores } = useCaregiverData();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cognitive Domain Breakdown</Text>
      <Text style={styles.subtitle}>Detailed analysis for Ramesh Patel</Text>

      {/* Domain Scores Bar Charts */}
      {domainScores.map((item) => {
        const color = DOMAIN_COLOR[item.domain] || COLORS.primaryGreen;
        return (
          <View key={item.domain} style={styles.domainCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.domainName}>{item.domain}</Text>
              <View
                style={[
                  styles.trendBadge,
                  {
                    backgroundColor:
                      item.trend === 'improving'
                        ? COLORS.successLight
                        : item.trend === 'declining'
                        ? COLORS.warningLight
                        : COLORS.softYellow,
                  },
                ]}
              >
                <Ionicons
                  name={
                    item.trend === 'improving'
                      ? 'trending-up'
                      : item.trend === 'declining'
                      ? 'trending-down'
                      : 'remove-outline'
                  }
                  size={14}
                  color={
                    item.trend === 'improving'
                      ? COLORS.primaryGreen
                      : item.trend === 'declining'
                      ? COLORS.warning
                      : '#92400E'
                  }
                />
                <Text
                  style={[
                    styles.trendText,
                    {
                      color:
                        item.trend === 'improving'
                          ? COLORS.primaryGreen
                          : item.trend === 'declining'
                          ? COLORS.warning
                          : '#92400E',
                    },
                  ]}
                >
                  {item.trend}
                </Text>
              </View>
            </View>

            <View style={styles.barContainer}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${item.score}%`,
                    backgroundColor: color,
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

      {/* Recent Session Logs */}
      <Text style={[styles.title, { marginTop: SPACING.md }]}>Recent Session History</Text>

      <View style={styles.historyCard}>
        <View style={styles.sessionRow}>
          <View style={[styles.sessionIcon, { backgroundColor: COLORS.mintGreen }]}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.primaryGreen} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sessionTitle}>Morning Object Recall (Memory)</Text>
            <Text style={styles.sessionTime}>10 Sep 2026 • 09:15 AM</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.sessionScore}>100%</Text>
          </View>
        </View>

        <View style={[styles.sessionRow, { marginTop: SPACING.sm }]}>
          <View style={[styles.sessionIcon, { backgroundColor: COLORS.warningLight }]}>
            <Ionicons name="time" size={20} color={COLORS.warning} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sessionTitle}>Visuospatial Navigation Prompt</Text>
            <Text style={styles.sessionTime}>09 Sep 2026 • 04:30 PM</Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: COLORS.warningLight }]}>
            <Text style={[styles.sessionScore, { color: COLORS.warning }]}>45s Hesitation</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
    gap: SPACING.xs,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
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
    color: COLORS.textDark,
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
    height: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '800',
  },
  descText: {
    fontSize: 12,
    color: COLORS.textMuted,
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
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  sessionTime: {
    fontSize: 12,
    color: COLORS.textMuted,
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
    color: COLORS.primaryGreen,
  },
});
