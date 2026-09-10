import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';

export const PatientRemindersScreen: React.FC = () => {
  const { reminders, toggleReminderComplete } = useReminders();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Today's Gentle Cues</Text>
      <Text style={styles.subheading}>
        Simple reminders presented as warm questions, not alarms.
      </Text>

      {reminders.map((item) => (
        <Card
          key={item.id}
          bgColor={item.completedToday ? COLORS.mintGreen : COLORS.white}
          borderColor={item.completedToday ? COLORS.primaryGreen : COLORS.border}
          style={styles.reminderCard}
        >
          <View style={styles.timeCategoryRow}>
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={16} color={COLORS.textDark} />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <AudioNarrationButton textToNarrate={item.audioNarrationText} label="Listen" />
          </View>

          <Text style={styles.questionText}>"{item.questionPrompt}"</Text>
          <Text style={styles.subtitleText}>{item.subtitle}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleReminderComplete(item.id)}
            style={[
              styles.checkButton,
              {
                backgroundColor: item.completedToday
                  ? COLORS.primaryGreen
                  : COLORS.surface,
                borderColor: item.completedToday ? COLORS.primaryGreen : COLORS.skyBlue,
              },
            ]}
          >
            <Ionicons
              name={item.completedToday ? 'checkmark-circle' : 'ellipse-outline'}
              size={28}
              color={item.completedToday ? COLORS.white : COLORS.skyBlue}
            />
            <Text
              style={[
                styles.checkButtonText,
                { color: item.completedToday ? COLORS.white : COLORS.textDark },
              ]}
            >
              {item.completedToday ? 'Done Today ✓' : 'Tap to confirm answer'}
            </Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
  },
  heading: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  subheading: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  reminderCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  timeCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    gap: 4,
  },
  timeText: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  questionText: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '700',
    color: COLORS.textDark,
    marginVertical: SPACING.xs,
    lineHeight: ACCESSIBILITY.lineHeight.heading - 2,
  },
  subtitleText: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  checkButton: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight, // 56px minimum height
    borderRadius: ACCESSIBILITY.borderRadius.md,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    gap: SPACING.xs,
  },
  checkButtonText: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
  },
});
