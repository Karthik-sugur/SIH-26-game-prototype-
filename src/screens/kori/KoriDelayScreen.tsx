import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { KoriHeader } from '../../kori/components/KoriHeader';
import { useKoriSession } from '../../kori/engine/KoriSessionContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onExit: () => void;
}

export const KoriDelayScreen: React.FC<Props> = ({ onExit }) => {
  const { t } = useLanguage();
  const { delaySecondsLeft, skipDelay, resetToStart } = useKoriSession();

  return (
    <View style={styles.container}>
      <KoriHeader
        title={t('koriTitle')}
        onBack={() => {
          resetToStart();
          onExit();
        }}
      />
      <View style={styles.body}>
        <Text style={styles.emoji}>🌿</Text>
        <Text style={styles.title}>{t('koriDelayTitle')}</Text>
        <Text style={styles.sub}>{t('koriDelaySub')}</Text>
        <Text style={styles.timer}>{delaySecondsLeft}s</Text>
        <AccessibleButton
          title={t('koriSkipWait')}
          onPress={skipDelay}
          variant="outline"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emoji: {
    fontSize: 56,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.title - 2,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  sub: {
    marginTop: SPACING.sm,
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  timer: {
    marginVertical: SPACING.xl,
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
