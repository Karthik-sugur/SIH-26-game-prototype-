import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

export const PatientRemindersScreen: React.FC = () => {
  const { reminders, toggleReminderComplete } = useReminders();
  const { t } = useLanguage();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t ? t('cuesHeading') : "Today's Gentle Cues"}</Text>
      <Text style={styles.subheading}>{t ? t('cuesSubheading') : 'Simple reminders presented as warm questions, not alarms.'}</Text>

      {reminders.map((item) => (
        <Card
          key={item.id}
          bgColor={item.completedToday ? COLORS.successBg : COLORS.surface}
          borderColor={item.completedToday ? COLORS.primary : COLORS.border}
          style={styles.reminderCard}
        >
          <View style={styles.timeCategoryRow}>
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={18} color={COLORS.text} />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <AudioNarrationButton textToNarrate={item.audioNarrationText} />
          </View>

          <Text style={styles.questionText}>"{item.questionPrompt}"</Text>
          <Text style={styles.subtitleText}>{item.subtitle}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleReminderComplete(item.id)}
            style={[
              styles.checkButton,
              {
                backgroundColor: item.completedToday ? COLORS.primary : COLORS.surfaceMuted,
                borderColor: item.completedToday ? COLORS.primary : COLORS.info,
              },
            ]}
          >
            <Ionicons
              name={item.completedToday ? 'checkmark-circle' : 'ellipse-outline'}
              size={28}
              color={item.completedToday ? COLORS.white : COLORS.info}
            />
            <Text
              style={[
                styles.checkButtonText,
                { color: item.completedToday ? COLORS.white : COLORS.text },
              ]}
            >
              {item.completedToday ? (t ? t('doneToday') : 'Done Today ✓') : (t ? t('tapConfirm') : 'Tap to confirm')}
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
    backgroundColor: COLORS.bg,
    flexGrow: 1,
  },
  heading: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
  },
  subheading: {
    fontSize: ACCESSIBILITY.fontSize.body - 1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
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
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    gap: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  questionText: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.text,
    marginVertical: SPACING.xs,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  subtitleText: {
    fontSize: ACCESSIBILITY.fontSize.body - 1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  checkButton: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight,
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
