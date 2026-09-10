import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { usePatientData } from '../../services/usePatientData';
import { useReminders } from '../../services/useReminders';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

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
  const { t } = useLanguage();

  const nextReminder = reminders.find((r) => !r.completedToday) || reminders[0];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.greetingHeader}>
        <Text style={styles.namasteText}>{t('greeting', { name: patient.name })}</Text>
        <Text style={styles.subGreeting}>{t('calmDay')}</Text>
      </View>

      <Card bgColor={COLORS.tileSand} borderColor={COLORS.border} style={styles.streakCard}>
        <View style={styles.streakRow}>
          <View style={styles.starCircle}>
            <Ionicons name="sunny-outline" size={28} color={COLORS.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.streakTitle}>
              {t('streakTitle', { days: patient.streakDays })}
            </Text>
            <Text style={styles.streakSubtitle}>{t('streakSubtitle')}</Text>
          </View>
        </View>
      </Card>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.cueCard}>
        <View style={styles.cueHeaderRow}>
          <Text style={styles.cueCategoryTag}>{t('todaysCue')}</Text>
          <AudioNarrationButton textToNarrate={nextReminder.audioNarrationText} />
        </View>

        <Text style={styles.cueQuestion}>"{nextReminder.questionPrompt}"</Text>
        <Text style={styles.cueSubtitle}>{nextReminder.subtitle}</Text>

        <AccessibleButton
          title={t('checkCues')}
          onPress={onViewReminders}
          variant="secondary"
          iconName="help-circle-outline"
        />
      </Card>

      <Card bgColor={COLORS.primarySoft} borderColor={COLORS.border} style={styles.activityCard}>
        <View style={styles.activityHeaderRow}>
          <Ionicons name="flower-outline" size={32} color={COLORS.primary} />
          <Text style={styles.activityTitle}>{t('todaysActivity')}</Text>
        </View>
        <Text style={styles.activityDescription}>{t('activityDesc')}</Text>
        <AccessibleButton
          title={t('startActivity')}
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
    backgroundColor: COLORS.bg,
    flexGrow: 1,
  },
  greetingHeader: {
    marginBottom: SPACING.md,
  },
  namasteText: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.text,
  },
  subGreeting: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: ACCESSIBILITY.lineHeight.body,
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
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '800',
    color: COLORS.text,
  },
  streakSubtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: ACCESSIBILITY.lineHeight.caption,
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
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  cueCategoryTag: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.primary,
  },
  cueQuestion: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '700',
    color: COLORS.text,
    marginVertical: SPACING.xs,
    lineHeight: ACCESSIBILITY.lineHeight.heading,
  },
  cueSubtitle: {
    fontSize: ACCESSIBILITY.fontSize.body - 1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
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
    color: COLORS.text,
    flex: 1,
  },
  activityDescription: {
    fontSize: ACCESSIBILITY.fontSize.body - 1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
});
