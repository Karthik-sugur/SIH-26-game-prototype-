import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { usePatientData } from '../../services/usePatientData';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';

interface PatientHomeScreenProps {
  onStartActivity: () => void;
  onViewReminders: () => void;
}

export const PatientHomeScreen: React.FC<PatientHomeScreenProps> = ({
  onStartActivity,
  onViewReminders,
}) => {
  const { patient } = usePatientData();
  const { reminders } = useReminders();

  const nextReminder = reminders.find((r) => !r.completedToday) || reminders[0];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/* Greeting Banner */}
      <View style={styles.greetingHeader}>
        <Text style={styles.namasteText}>नमस्ते, {patient.name} ji 🙏</Text>
        <Text style={styles.subGreeting}>Wishing you a calm and pleasant day.</Text>
      </View>

      {/* Gentle Non-Punitive Streak Card */}
      <Card bgColor={COLORS.softYellow} borderColor="#F59E0B" style={styles.streakCard}>
        <View style={styles.streakRow}>
          <View style={styles.starCircle}>
            <Ionicons name="sparkles" size={28} color={COLORS.warmOrange} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.streakTitle}>
              {patient.streakDays} Days of Memory Practice!
            </Text>
            <Text style={styles.streakSubtitle}>
              Every gentle effort helps keep your mind warm and active.
            </Text>
          </View>
        </View>
      </Card>

      {/* Primary Cued-Recall Card */}
      <Card bgColor={COLORS.white} borderColor={COLORS.skyBlue} style={styles.cueCard}>
        <View style={styles.cueHeaderRow}>
          <Text style={styles.cueCategoryTag}>Today's Cued Memory</Text>
          <AudioNarrationButton textToNarrate={nextReminder.audioNarrationText} label="Listen" />
        </View>

        <Text style={styles.cueQuestion}>"{nextReminder.questionPrompt}"</Text>
        <Text style={styles.cueSubtitle}>{nextReminder.subtitle}</Text>

        <AccessibleButton
          title="Check Today's Cues"
          onPress={onViewReminders}
          variant="secondary"
          iconName="help-circle-outline"
        />
      </Card>

      {/* Start Today's Activity Action */}
      <Card bgColor={COLORS.white} borderColor={COLORS.primaryGreen} style={styles.activityCard}>
        <View style={styles.activityHeaderRow}>
          <Ionicons name="game-controller-outline" size={32} color={COLORS.primaryGreen} />
          <Text style={styles.activityTitle}>Today's Memory Activity</Text>
        </View>
        <Text style={styles.activityDescription}>
          Enjoy a gentle 3-minute object recall activity to keep your memory sharp.
        </Text>
        <AccessibleButton
          title="Start Today's Activity"
          onPress={onStartActivity}
          variant="primary"
          iconName="play-circle"
        />
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
  greetingHeader: {
    marginBottom: SPACING.md,
  },
  namasteText: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  subGreeting: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  streakCard: {
    marginBottom: SPACING.md,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  starCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  streakSubtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  cueCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  cueHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cueCategoryTag: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.skyBlue,
    textTransform: 'uppercase',
  },
  cueQuestion: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '700',
    color: COLORS.textDark,
    marginVertical: SPACING.xs,
    lineHeight: ACCESSIBILITY.lineHeight.heading,
  },
  cueSubtitle: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  activityCard: {
    padding: SPACING.lg,
  },
  activityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  activityTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  activityDescription: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
});
