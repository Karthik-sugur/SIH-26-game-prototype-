import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
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
        <AccessibleButton
          title={showAddForm ? 'Close' : '+ Add Prompt'}
          onPress={() => setShowAddForm(!showAddForm)}
          variant="secondary"
          style={{ minHeight: 44, paddingHorizontal: 12 }}
        />
      </View>

      {/* Add Reminder Form */}
      {showAddForm && (
        <Card bgColor={COLORS.white} borderColor={COLORS.skyBlue} style={styles.formCard}>
          <Text style={styles.formTitle}>New Cued Reminder Prompt</Text>

          <Text style={styles.label}>Scheduled Time</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} />

          <Text style={styles.label}>Question Prompt (Gentle Cued Recall)</Text>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={setQuestion}
            multiline
          />

          <Text style={styles.label}>Subtitle / Context</Text>
          <TextInput style={styles.input} value={subtitle} onChangeText={setSubtitle} />

          <AccessibleButton
            title="Save Cued Reminder"
            onPress={handleCreate}
            variant="primary"
            iconName="save-outline"
          />
        </Card>
      )}

      {/* Schedule List */}
      <Text style={styles.sectionTitle}>Active Daily Schedule</Text>

      {reminders.map((item) => (
        <Card key={item.id} bgColor={COLORS.white} borderColor={COLORS.border} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={styles.timeTag}>
              <Ionicons name="time" size={16} color={COLORS.skyBlue} />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          <Text style={styles.promptText}>{item.questionPrompt}</Text>
          <Text style={styles.subText}>{item.subtitle}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  formCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    padding: SPACING.sm,
    fontSize: 15,
    color: COLORS.textDark,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  itemCard: {
    padding: SPACING.md,
    marginBottom: SPACING.xs,
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
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  promptText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
