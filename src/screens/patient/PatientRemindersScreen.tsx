import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

export const PatientRemindersScreen: React.FC = () => {
  const { reminders, toggleReminderComplete } = useReminders();
  const { t } = useLanguage();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t('cuesHeading')}</Text>
      <Text style={styles.subheading}>{t('cuesSubheading')}</Text>

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

      <Text style={styles.subheading}>Warm reminders, not alarms.</Text>

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
              {item.completedToday ? t('doneToday') : t('tapConfirm')}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
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
  list: {
    gap: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  rowDone: {
    backgroundColor: COLORS.successLight,
    borderColor: COLORS.mintGreenDark,
  },
  catIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  rowHeaderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    gap: 6,
  },
  timeText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.text,
  },
  questionText: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    fontWeight: '700',
    color: COLORS.text,
    marginVertical: SPACING.xs,
    lineHeight: ACCESSIBILITY.lineHeight.heading - 2,
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
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    alignSelf: 'center',
  },
  checkCircleDone: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
    ...SHADOWS.colored(COLORS.primaryGreen),
  },
});
