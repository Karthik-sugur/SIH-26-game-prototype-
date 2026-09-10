import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { KoriHeader } from '../../kori/components/KoriHeader';
import { KoriCard } from '../../kori/components/KoriCard';
import { useKoriSession } from '../../kori/engine/KoriSessionContext';
import { useKoriAmbience } from '../../kori/audio/useKoriAmbience';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onExit: () => void;
}

export const KoriObserveScreen: React.FC<Props> = ({ onExit }) => {
  const { t, language } = useLanguage();
  const { observeItems, finishObserve, isBaseline, resetToStart } = useKoriSession();
  const ambience = useKoriAmbience();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <KoriHeader
        title={t('koriTitle')}
        onBack={() => {
          resetToStart();
          onExit();
        }}
        onToggleSound={ambience.toggle}
        soundOn={ambience.enabled}
      />

      {isBaseline && (
        <Text style={styles.baselineBanner}>{t('koriBaselineBanner')}</Text>
      )}

      <Text style={styles.instruction}>{t('koriRememberThese')}</Text>

      <View style={styles.grid}>
        {observeItems.map((item) => (
          <KoriCard
            key={item.id}
            emoji={item.emoji}
            label={language === 'as' ? item.nameAs : item.nameEn}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.audioBtn} accessibilityLabel={t('listen')}>
        <Text style={styles.audioIcon}>🔊</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.readyBtn} onPress={finishObserve} activeOpacity={0.85}>
        <Text style={styles.readyText}>{t('koriImReady')}</Text>
      </TouchableOpacity>

      <Text style={styles.hintDisabled}>💡 {t('koriNeedHint')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
  },
  baselineBanner: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.infoBg,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    color: COLORS.info,
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    textAlign: 'center',
    overflow: 'hidden',
  },
  instruction: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 1,
    marginVertical: SPACING.md,
  },
  grid: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  audioBtn: {
    marginTop: SPACING.md,
    minHeight: 48,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioIcon: {
    fontSize: 28,
  },
  readyBtn: {
    marginTop: SPACING.lg,
    minHeight: ACCESSIBILITY.minTouchTargetHeight + 8,
    paddingHorizontal: SPACING.xl,
    borderWidth: 2,
    borderColor: COLORS.text,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
  },
  readyText: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 1,
  },
  hintDisabled: {
    marginTop: SPACING.lg,
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
    opacity: 0.7,
  },
});
