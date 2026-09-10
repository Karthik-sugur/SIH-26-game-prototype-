import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useCaregiverData } from '../../services/useCaregiverData';
import { Ionicons } from '@expo/vector-icons';

export const PatientDetailScreen: React.FC = () => {
  const { domainScores } = useCaregiverData();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cognitive Domain Breakdown</Text>
      <Text style={styles.subtitle}>Detailed analysis for Ramesh Patel</Text>

      {/* Domain Scores Bar Charts */}
      {domainScores.map((item) => (
        <Card key={item.domain} bgColor={COLORS.white} borderColor={COLORS.border} style={styles.domainDetailCard}>
          <View style={styles.cardHeader}>
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

          <View style={styles.barContainer}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${item.score}%`,
                  backgroundColor:
                    item.score > 75
                      ? COLORS.primaryGreen
                      : item.score > 65
                      ? COLORS.skyBlue
                      : COLORS.warmOrange,
                },
              ]}
            />
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreText}>{item.score} / 100</Text>
            <Text style={styles.descText}>{item.changeDescription}</Text>
          </View>
        </Card>
      ))}

      {/* Recent Session Logs */}
      <Text style={[styles.title, { marginTop: SPACING.md }]}>Recent Session History</Text>

      <Card bgColor={COLORS.white} borderColor={COLORS.border} style={styles.historyCard}>
        <View style={styles.sessionRow}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.primaryGreen} />
          <View style={{ flex: 1 }}>
            <Text style={styles.sessionTitle}>Morning Object Recall (Memory)</Text>
            <Text style={styles.sessionTime}>10 Sep 2026 • 09:15 AM</Text>
          </View>
          <Text style={styles.sessionScore}>Score: 100%</Text>
        </View>

        <View style={[styles.sessionRow, { marginTop: SPACING.sm }]}>
          <Ionicons name="time" size={24} color={COLORS.warmOrange} />
          <View style={{ flex: 1 }}>
            <Text style={styles.sessionTitle}>Visuospatial Navigation Prompt</Text>
            <Text style={styles.sessionTime}>09 Sep 2026 • 04:30 PM</Text>
          </View>
          <Text style={styles.sessionScore}>Hesitation (45s)</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  domainDetailCard: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  domainName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  barContainer: {
    height: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
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
    color: COLORS.textDark,
  },
  descText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  historyCard: {
    padding: SPACING.md,
    marginTop: SPACING.xs,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
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
  sessionScore: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
});
