import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { KoriHeader } from '../../kori/components/KoriHeader';
import { useKoriSession } from '../../kori/engine/KoriSessionContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  onDone: () => void;
}

export const KoriEndScreen: React.FC<Props> = ({ onDone }) => {
  const { t, language } = useLanguage();
  const { insight, resetToStart } = useKoriSession();

  const finish = () => {
    resetToStart();
    onDone();
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <KoriHeader title={t('koriTitle')} />

      <Text style={styles.emoji}>🐚</Text>
      <Text style={styles.title}>{t('koriWellDone')}</Text>
      <Text style={styles.sub}>{t('koriEndSub')}</Text>

      <View style={styles.card}>
        <Row
          label={t('koriStatMemory')}
          value={
            insight?.memoryStatus === 'stable' ? t('koriStatPractised') : t('koriStatSupported')
          }
        />
        <Row
          label={t('koriStatRecall')}
          value={`${insight?.practisedRoutines ?? 0} ${t('koriStatRoutines')}`}
        />
        <Row
          label={t('koriStatSession')}
          value={`${insight?.durationMin ?? 1} ${language === 'as' ? 'মিনিট' : 'min'}`}
        />
      </View>

      {insight && (
        <View style={styles.recCard}>
          <Text style={styles.recLabel}>{t('koriRecommendation')}</Text>
          <Text style={styles.recBody}>{insight.recommendation}</Text>
        </View>
      )}

      <AccessibleButton title={t('koriBackHome')} onPress={finish} variant="primary" />
    </ScrollView>
  );
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emoji: {
    fontSize: 48,
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  sub: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: SPACING.lg,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  rowValue: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.text,
    fontWeight: '800',
  },
  recCard: {
    width: '100%',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.primarySoft,
    borderRadius: ACCESSIBILITY.borderRadius.md,
  },
  recLabel: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.primary,
  },
  recBody: {
    marginTop: 4,
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.text,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
});
