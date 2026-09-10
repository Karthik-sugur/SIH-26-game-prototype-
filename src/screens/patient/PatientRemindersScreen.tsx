import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';
import { CuedReminder } from '../../types';

const CATEGORY_META: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }> = {
  medicine:    { icon: 'medical',         color: COLORS.error,       bg: COLORS.errorLight },
  hydration:   { icon: 'water',           color: COLORS.skyBlue,     bg: COLORS.skyBlueLight },
  appointment: { icon: 'calendar',        color: COLORS.lavender,    bg: COLORS.lavenderLight },
  activity:    { icon: 'walk',            color: COLORS.primaryGreen,bg: COLORS.mintGreen },
};

function ReminderRow({
  item,
  onToggle,
}: {
  item: CuedReminder;
  onToggle: () => void;
}) {
  const meta = CATEGORY_META[item.category] ?? CATEGORY_META.activity;

  return (
    <View style={[styles.row, item.completedToday && styles.rowDone]}>
      {/* Category icon */}
      <View style={[styles.catIcon, { backgroundColor: meta.bg }]}>
        <Ionicons name={meta.icon} size={20} color={meta.color} />
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View style={styles.rowHeaderLine}>
          <Text style={styles.timeText}>{item.time}</Text>
          <AudioNarrationButton textToNarrate={item.audioNarrationText} label="Listen" />
        </View>
        <Text style={[styles.questionText, item.completedToday && styles.questionDone]}>
          "{item.questionPrompt}"
        </Text>
        <Text style={styles.subtitleText}>{item.subtitle}</Text>
      </View>

      {/* Check button */}
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.checkCircle, item.completedToday && styles.checkCircleDone]}
        activeOpacity={0.7}
      >
        <Ionicons
          name={item.completedToday ? 'checkmark' : 'ellipse-outline'}
          size={22}
          color={item.completedToday ? COLORS.white : COLORS.border}
        />
      </TouchableOpacity>
    </View>
  );
}

export const PatientRemindersScreen: React.FC = () => {
  const { reminders, toggleReminderComplete } = useReminders();
  const done = reminders.filter((r) => r.completedToday).length;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Today's Gentle Cues</Text>
        <View style={styles.progressPill}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.primaryGreen} />
          <Text style={styles.progressText}>{done} of {reminders.length} done</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            { width: reminders.length ? `${(done / reminders.length) * 100}%` : '0%' },
          ]}
        />
      </View>

      <Text style={styles.subheading}>Warm reminders, not alarms.</Text>

      {/* Reminder rows */}
      <View style={styles.list}>
        {reminders.map((item) => (
          <ReminderRow
            key={item.id}
            item={item}
            onToggle={() => toggleReminderComplete(item.id)}
          />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  heading: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  progressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.mintGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  progressText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.primaryGreen,
  },
  progressBarTrack: {
    height: 5,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 3,
  },
  subheading: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
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
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  rowHeaderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.textSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: ACCESSIBILITY.lineHeight.caption,
    marginBottom: 4,
  },
  questionDone: {
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  subtitleText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    color: COLORS.textMuted,
    lineHeight: 17,
  },
  checkCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
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
