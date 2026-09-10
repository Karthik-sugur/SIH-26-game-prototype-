import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { KoriHeader } from '../../kori/components/KoriHeader';
import { useKoriSession } from '../../kori/engine/KoriSessionContext';
import { useKoriAmbience } from '../../kori/audio/useKoriAmbience';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onBack?: () => void;
}

export const KoriStartScreen: React.FC<Props> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const { startSession, baselineDone, lastInsight } = useKoriSession();
  const ambience = useKoriAmbience();

  useEffect(() => {
    ambience.play();
    return () => ambience.stop();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <KoriHeader
        title={t('koriTitle')}
        onBack={onBack}
        onToggleSound={ambience.toggle}
        soundOn={ambience.enabled}
      />

      <View style={styles.hero}>
        <Text style={styles.shells}>🐚 🐚 🐚</Text>
        <Text style={styles.greeting}>{t('koriGreeting')}</Text>
        <Text style={styles.sub}>
          {!baselineDone ? t('koriBaselineNote') : t('koriPlayNote')}
        </Text>
      </View>

      <AccessibleButton
        title={t('koriTodaysKori')}
        onPress={startSession}
        variant="primary"
        iconName="play-circle"
      />

      <AccessibleButton
        title={t('koriHearInstructions')}
        onPress={() => {}}
        variant="outline"
        iconName="volume-high"
      />

      {lastInsight && (
        <View style={styles.lastCard}>
          <Text style={styles.lastTitle}>{t('koriLastSession')}</Text>
          <Text style={styles.lastBody}>
            {language === 'as'
              ? `${lastInsight.durationMin} মিনিট · ${lastInsight.practisedRoutines} ৰুটিন`
              : `${lastInsight.durationMin} min · ${lastInsight.practisedRoutines} routines`}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
    paddingBottom: SPACING.xl,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  shells: {
    fontSize: 36,
    marginBottom: SPACING.md,
  },
  greeting: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.title,
  },
  sub: {
    marginTop: SPACING.sm,
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  lastCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lastTitle: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.primary,
  },
  lastBody: {
    marginTop: 4,
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.text,
  },
});
