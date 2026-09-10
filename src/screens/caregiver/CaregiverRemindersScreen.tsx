import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

export const CaregiverRemindersScreen: React.FC = () => {
  const { reminders, addReminder, categoryLabel } = useReminders();
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [time, setTime] = useState('02:00 PM');
  const [question, setQuestion] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const questionValue = question || t('defaultNewQuestion');
  const subtitleValue = subtitle || t('defaultNewSubtitle');

  const handleCreate = () => {
    addReminder({
      time,
      category: 'hydration',
      questionPrompt: questionValue,
      subtitle: subtitleValue,
      audioNarrationText: questionValue,
    });
    setShowAddForm(false);
    setQuestion('');
    setSubtitle('');
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{t('remindersMgmt')}</Text>
          <Text style={styles.subtitle}>{t('configureFor', { name: 'Ramesh' })}</Text>
        </View>
        <AccessibleButton
          title={showAddForm ? t('close') : t('addPrompt')}
          onPress={() => setShowAddForm(!showAddForm)}
          variant="secondary"
          style={{ minHeight: 48, paddingHorizontal: 12 }}
        />
      </View>

      {showAddForm && (
        <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.formCard}>
          <Text style={styles.formTitle}>{t('newPrompt')}</Text>

          <Text style={styles.label}>{t('scheduledTime')}</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} />

          <Text style={styles.label}>{t('questionPrompt')}</Text>
          <TextInput
            style={[styles.input, { minHeight: 60 }]}
            value={question}
            placeholder={t('defaultNewQuestion')}
            onChangeText={setQuestion}
            multiline
            placeholderTextColor={COLORS.textSubtle}
          />

          <Text style={styles.label}>{t('subtitleContext')}</Text>
          <TextInput
            style={styles.input}
            value={subtitle}
            placeholder={t('defaultNewSubtitle')}
            onChangeText={setSubtitle}
          />

          <AccessibleButton
            title={t('saveReminder')}
            onPress={handleCreate}
            variant="primary"
            iconName="save-outline"
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>{t('activeSchedule')}</Text>

      {reminders.map((item) => (
        <Card key={item.id} bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={styles.timeTag}>
              <Ionicons name="time" size={16} color={COLORS.info} />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.categoryText}>{categoryLabel(item.category)}</Text>
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
    backgroundColor: COLORS.bg,
    flexGrow: 1,
    gap: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
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
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
    marginTop: 4,
    minHeight: 48,
  },
  sectionTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading - 4,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.xs,
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
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.info,
  },
  categoryBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  promptText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  subText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
