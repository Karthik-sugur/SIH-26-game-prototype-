import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { KoriHeader } from '../../kori/components/KoriHeader';
import { useKoriSession } from '../../kori/engine/KoriSessionContext';
import { useKoriAmbience } from '../../kori/audio/useKoriAmbience';
import { useLanguage } from '../../i18n/LanguageContext';
import { CULTURAL_ITEMS } from '../../kori/content/culturalPack';

interface Props {
  onExit: () => void;
}

export const KoriRecallScreen: React.FC<Props> = ({ onExit }) => {
  const { t, language } = useLanguage();
  const {
    activePrompt,
    cueLevel,
    cueMessageEn,
    cueMessageAs,
    requestHint,
    submitChoice,
    resetToStart,
    getItemLabel,
    offerEarlyExit,
    acceptEarlyExit,
    continueAfterExitOffer,
    phase,
  } = useKoriSession();
  const ambience = useKoriAmbience();
  const [feedback, setFeedback] = useState<string | null>(null);

  const isSequence = phase === 'sequence' || activePrompt?.stage === 'sequence';

  const visibleOptions = useMemo(() => {
    if (!activePrompt) return [];
    if (cueLevel >= 3) {
      const target = activePrompt.targetId;
      const other = activePrompt.optionIds.find((id) => id !== target) || activePrompt.optionIds[1];
      return [target, other].filter(Boolean);
    }
    return activePrompt.optionIds;
  }, [activePrompt, cueLevel]);

  if (!activePrompt) {
    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>{t('koriLoading')}</Text>
      </View>
    );
  }

  const prompt = language === 'as' ? activePrompt.promptAs : activePrompt.promptEn;
  const cueMsg = language === 'as' ? cueMessageAs : cueMessageEn;

  const onPick = (id: string) => {
    const result = submitChoice(id);
    if (!result.advanced) {
      setFeedback(t('koriGentleRetry'));
      setTimeout(() => setFeedback(null), 1600);
    } else {
      setFeedback(t('koriWellDoneSoft'));
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const optionLabel = (id: string) => {
    if (isSequence) return id;
    return getItemLabel(id, language);
  };

  const optionEmoji = (id: string) => {
    if (isSequence) {
      const lower = id.toLowerCase();
      if (lower.includes('medicine') || lower.includes('ঔষধ')) return '💊';
      if (lower.includes('rest') || lower.includes('বিশ্ৰাম')) return '😌';
      if (lower.includes('lunch') || lower.includes('আহাৰ') || lower.includes('breakfast') || lower.includes('নাস্তা')) return '🍱';
      if (lower.includes('walk') || lower.includes('খোজ')) return '🚶';
      if (lower.includes('tea') || lower.includes('চাহ')) return '🍵';
      return '🐚';
    }
    return CULTURAL_ITEMS.find((i) => i.id === id)?.emoji || '🐚';
  };

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

      <Text style={styles.stageTag}>
        {isSequence ? t('koriStageSequence') : t('koriStageRecall')}
      </Text>
      <Text style={styles.prompt}>{prompt}</Text>

      {!!cueMsg && (
        <View style={styles.cueBox}>
          <Text style={styles.cueText}>{cueMsg}</Text>
        </View>
      )}

      {cueLevel >= 2 && !isSequence && (
        <Text style={styles.visualCue}>
          {CULTURAL_ITEMS.find((i) => i.id === activePrompt.targetId)?.emoji}
        </Text>
      )}

      <View style={styles.options}>
        {visibleOptions.map((id) => (
          <TouchableOpacity
            key={id}
            style={[
              styles.option,
              cueLevel >= 4 && id === activePrompt.targetId && styles.optionReveal,
            ]}
            onPress={() => onPick(id)}
            activeOpacity={0.85}
          >
            <View style={styles.emojiChip}>
              <Text style={styles.optionEmoji}>{optionEmoji(id)}</Text>
            </View>
            <Text style={styles.optionLabel}>{optionLabel(id)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {feedback && <Text style={styles.feedback}>{feedback}</Text>}

      <TouchableOpacity style={styles.hintBtn} onPress={requestHint}>
        <Text style={styles.hintText}>💡 {t('koriNeedHint')}</Text>
      </TouchableOpacity>

      {offerEarlyExit && (
        <View style={styles.exitCard}>
          <Text style={styles.exitTitle}>{t('koriEarlyExitTitle')}</Text>
          <TouchableOpacity style={styles.exitPrimary} onPress={acceptEarlyExit}>
            <Text style={styles.exitPrimaryText}>{t('koriFinishHere')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={continueAfterExitOffer}>
            <Text style={styles.exitSecondary}>{t('koriKeepGoing')}</Text>
          </TouchableOpacity>
        </View>
      )}
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
  stageTag: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  prompt: {
    fontSize: ACCESSIBILITY.fontSize.title - 2,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    lineHeight: ACCESSIBILITY.lineHeight.title,
  },
  cueBox: {
    marginTop: SPACING.md,
    marginHorizontal: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.accentSoft,
    borderRadius: ACCESSIBILITY.borderRadius.md,
  },
  cueText: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  visualCue: {
    fontSize: 56,
    marginTop: SPACING.md,
  },
  options: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  option: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight + 8,
    backgroundColor: COLORS.white,
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
    shadowColor: '#1A2420',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  optionReveal: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 3,
  },
  optionEmoji: {
    fontSize: 28,
  },
  emojiChip: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  feedback: {
    marginTop: SPACING.md,
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.primary,
  },
  hintBtn: {
    marginTop: SPACING.xl,
    minHeight: 48,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  hintText: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  exitCard: {
    marginTop: SPACING.lg,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    width: '90%',
  },
  exitTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  exitPrimary: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight,
    backgroundColor: COLORS.primary,
    borderRadius: ACCESSIBILITY.borderRadius.lg,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  exitPrimaryText: {
    color: COLORS.white,
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
  },
  exitSecondary: {
    marginTop: SPACING.md,
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
