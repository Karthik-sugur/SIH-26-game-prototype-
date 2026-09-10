import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
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
  const completedCount = reminders.filter((r) => r.completedToday).length;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.greetingRow}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={22} color={COLORS.primaryGreen} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.namasteText}>{t('greeting', { name: patient.name })}</Text>
          <Text style={styles.subGreeting}>{t('calmDay')}</Text>
        </View>
      </View>

      <View style={styles.koriCard}>
        <Text style={styles.shells}>🐚 🐚 🐚</Text>
        <Text style={styles.koriTitle}>{t('koriGreeting')}</Text>
        <Text style={styles.koriDesc}>{t('koriHomeDesc')}</Text>
        <AccessibleButton
          title={t('koriHomeCta')}
          onPress={onStartActivity}
          variant="primary"
          iconName="play-circle"
        />
      </View>

      <View style={styles.streakCard}>
        <View style={styles.streakLeft}>
          <View style={styles.streakIconWrap}>
            <Ionicons name="flame" size={24} color={COLORS.warmOrange} />
          </View>
          <View>
            <Text style={styles.streakNumber}>{patient.streakDays}</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
        </View>
        <View style={styles.streakDivider} />
        <View style={styles.streakRight}>
          <Text style={styles.streakRightNum}>
            {completedCount}/{reminders.length}
          </Text>
          <Text style={styles.streakRightLabel}>Done Today</Text>
        </View>
      </View>

      <Card bgColor={COLORS.surfaceElevated} elevated style={styles.section}>
        <View style={styles.cardHeader}>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{t('todaysCue').toUpperCase()}</Text>
            </View>
          </View>
          <AudioNarrationButton textToNarrate={nextReminder.audioNarrationText} />
        </View>
        <Text style={styles.cueQuestion}>"{nextReminder.questionPrompt}"</Text>
        <Text style={styles.cueSubtitle}>{nextReminder.subtitle}</Text>
        <AccessibleButton
          title={t('checkCues')}
          onPress={onViewReminders}
          variant="outline"
          iconName="list"
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
    gap: SPACING.md,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.xs,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.mintGreen,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  namasteText: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  subGreeting: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  koriCard: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  shells: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  koriTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  koriDesc: {
    fontSize: ACCESSIBILITY.fontSize.body - 1,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
    textAlign: 'center',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warmOrange,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    ...SHADOWS.colored(COLORS.warmOrange),
  },
  streakLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  streakIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  streakLabel: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: SPACING.md,
  },
  streakRight: {
    alignItems: 'center',
  },
  streakRightNum: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  streakRightLabel: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    padding: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tagRow: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: COLORS.skyBlueLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  tagText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '800',
    color: COLORS.skyBlue,
    letterSpacing: 0.8,
  },
  cueQuestion: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: ACCESSIBILITY.lineHeight.heading - 2,
    marginBottom: SPACING.xs,
  },
  cueSubtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
});
