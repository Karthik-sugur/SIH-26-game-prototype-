import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY, SHADOWS } from '../../theme/tokens';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';

export const CaregiverRemindersScreen: React.FC = () => {
  const { reminders, addReminder } = useReminders();
  const [showAddForm, setShowAddForm] = useState(false);
  const [time, setTime] = useState('02:00 PM');
  const [question, setQuestion] = useState('Have you taken your afternoon herbal tea?');
  const [subtitle, setSubtitle] = useState('Warm drink cue');

  const handleCreate = () => {
    addReminder({
      time,
      category: 'hydration',
      questionPrompt: question,
      subtitle,
      audioNarrationText: question,
    });
    setShowAddForm(false);
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Reminders Management</Text>
          <Text style={styles.subtitle}>Configure cued-recall prompts for Ramesh</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowAddForm(!showAddForm)}
          style={styles.toggleFormButton}
        >
          <Ionicons name={showAddForm ? 'close' : 'add'} size={20} color={COLORS.white} />
          <Text style={styles.toggleFormText}>{showAddForm ? 'Close' : 'New Cue'}</Text>
        </TouchableOpacity>
      </View>

      {/* Add Reminder Form */}
      {showAddForm && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>New Cued Reminder Prompt</Text>

          <Text style={styles.label}>Scheduled Time</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} placeholderTextColor={COLORS.textSubtle} />

          <Text style={styles.label}>Question Prompt (Gentle Cued Recall)</Text>
          <TextInput
            style={[styles.input, { minHeight: 60 }]}
            value={question}
            onChangeText={setQuestion}
            multiline
            placeholderTextColor={COLORS.textSubtle}
          />

          <Text style={styles.label}>Subtitle / Context</Text>
          <TextInput style={styles.input} value={subtitle} onChangeText={setSubtitle} placeholderTextColor={COLORS.textSubtle} />

          <AccessibleButton
            title="Save Cued Reminder"
            onPress={handleCreate}
            variant="primary"
            iconName="save-outline"
          />
        </View>
      )}

      {/* Schedule List */}
      <Text style={styles.sectionTitle}>Active Daily Schedule</Text>

      <View style={styles.scheduleList}>
        {reminders.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <View style={styles.timeTag}>
                <Ionicons name="time-outline" size={16} color={COLORS.skyBlue} />
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            </View>

            <Text style={styles.promptText}>"{item.questionPrompt}"</Text>
            <Text style={styles.subText}>{item.subtitle}</Text>
          </View>
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
    gap: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  toggleFormButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.skyBlue,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    ...SHADOWS.colored(COLORS.skyBlue),
  },
  toggleFormText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  formCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.skyBlue,
    ...SHADOWS.md,
    gap: 6,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSubtle,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    padding: SPACING.sm,
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading - 4,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scheduleList: {
    gap: SPACING.sm,
  },
  itemCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.skyBlue,
  },
  categoryBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  promptText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
