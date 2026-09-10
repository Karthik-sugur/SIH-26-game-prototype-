import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { useGameSession } from '../../services/useGameSession';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

export const GameSessionScreen: React.FC = () => {
  const {
    session,
    stage,
    isCorrect,
    startRecall,
    showRecognitionFallback,
    submitAnswer,
    resetSession,
    getNextDifficultyStub,
    difficultyLabel,
    domainLabel,
  } = useGameSession();
  const { t } = useLanguage();

  const nextCalculatedLevel = getNextDifficultyStub(85, 3, session.difficultyLevel);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.domainChip}>
          <Ionicons name="bulb-outline" size={18} color={COLORS.primary} />
          <Text style={styles.domainText}>{t('domainActivity', { domain: domainLabel })}</Text>
        </View>
        <AudioNarrationButton textToNarrate={session.audioNarrationText} />
      </View>

      <Text style={styles.title}>{session.title}</Text>

      <View style={styles.stubBadgeContainer}>
        <Text style={styles.stubBadgeText}>
          {t('difficulty')}: <Text style={{ fontWeight: '800' }}>{difficultyLabel(session.difficultyLevel)}</Text>
          {' • '}
          {t('adaptiveNext')}:{' '}
          <Text style={{ fontWeight: '800', color: COLORS.primary }}>
            {difficultyLabel(nextCalculatedLevel)}
          </Text>
        </Text>
      </View>

      {stage === 'study' && (
        <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.stageCard}>
          <Text style={styles.instructionText}>{session.instruction}</Text>

          <View style={styles.objectsGrid}>
            {session.objectsToRemember.map((obj) => (
              <View key={obj.id} style={styles.objectBox}>
                <Text style={styles.objectEmoji}>{obj.imageUrl}</Text>
                <Text style={styles.objectName}>{obj.name}</Text>
                <Text style={styles.objectHin}>{obj.hinName}</Text>
              </View>
            ))}
          </View>
          <AccessibleButton
            title={t('memorized')}
            onPress={startRecall}
            variant="primary"
            iconName="checkmark-circle"
            size="large"
          />
        </View>
      )}

      {stage === 'recall' && (
        <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.stageCard}>
          <Text style={styles.questionText}>"{session.recallQuestion}"</Text>
          <Text style={styles.hintText}>{t('tryPicture')}</Text>

          <AccessibleButton
            title={t('iRemember')}
            onPress={showRecognitionFallback}
            variant="accent"
            iconName="bulb-outline"
            size="large"
          />
          <AccessibleButton
            title={t('giveHint')}
            onPress={showRecognitionFallback}
            variant="ghost"
            iconName="help-buoy-outline"
          />
        </View>
      )}

      {stage === 'recognition' && (
        <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.stageCard}>
          <Text style={styles.questionText}>{t('selectObject')}</Text>

          <View style={styles.optionsList}>
            {session.multipleChoiceOptions.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                onPress={() => submitAnswer(idx)}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>{opt}</Text>
                <Ionicons name="chevron-forward-circle" size={28} color={COLORS.info} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {stage === 'completed' && (
        <Card
          bgColor={isCorrect ? COLORS.successBg : COLORS.accentSoft}
          borderColor={COLORS.border}
          style={styles.stageCard}
        >
          <View style={styles.feedbackHeader}>
            <Ionicons
              name={isCorrect ? 'happy' : 'heart'}
              size={48}
              color={isCorrect ? COLORS.primary : COLORS.accent}
            />
            <Text style={styles.feedbackTitle}>{isCorrect ? t('wonderful') : t('greatEffort')}</Text>
          </View>

          <Text style={styles.feedbackDetail}>
            {isCorrect ? t('correctFeedback') : t('effortFeedback')}
          </Text>

          <AccessibleButton
            title={t('tryAgain')}
            onPress={resetSession}
            variant={isCorrect ? 'primary' : 'outline'}
            iconName="refresh-circle"
            size="large"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
    gap: SPACING.sm,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  domainPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    borderWidth: 1,
    borderColor: COLORS.lavender + '44',
  },
  domainPillText: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    fontWeight: '700',
    color: COLORS.text,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
    marginVertical: SPACING.xs,
  },
  stubBadgeContainer: {
    backgroundColor: COLORS.surfaceMuted,
    padding: SPACING.sm,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stubBadgeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  stageCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
    gap: SPACING.sm,
  },
  instructionText: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  objectsGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'space-between',
  },
  objectBox: {
    width: '30%',
    backgroundColor: COLORS.bg,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  objectEmoji: {
    fontSize: 38,
    marginBottom: 6,
  },
  objectName: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text,
  },
  objectHinName: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  questionText: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: ACCESSIBILITY.lineHeight.heading,
  },
  hintText: {
    fontSize: ACCESSIBILITY.fontSize.body - 1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  optionsList: {
    gap: SPACING.xs,
  },
  optionButton: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    borderWidth: 2,
    borderColor: COLORS.info,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  feedbackCenter: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  feedbackEmoji: {
    fontSize: 52,
  },
  feedbackTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  feedbackDetail: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.caption,
  },
});
