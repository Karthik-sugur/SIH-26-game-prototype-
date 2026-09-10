import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { useGameSession } from '../../services/useGameSession';
import { Ionicons } from '@expo/vector-icons';

export const GameSessionScreen: React.FC = () => {
  const {
    session,
    stage,
    selectedOption,
    isCorrect,
    startRecall,
    showRecognitionFallback,
    submitAnswer,
    resetSession,
    getNextDifficultyStub,
  } = useGameSession();

  const nextLevel = getNextDifficultyStub(85, 3, session.difficultyLevel);

  const diffColor: Record<string, string> = {
    Gentle: COLORS.primaryGreen,
    Moderate: COLORS.warmOrange,
    Challenging: COLORS.error,
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/* Header bar */}
      <View style={styles.headerBar}>
        <View style={styles.domainPill}>
          <Ionicons name="bulb-outline" size={16} color={COLORS.lavender} />
          <Text style={styles.domainPillText}>{session.domain}</Text>
        </View>
        <AudioNarrationButton textToNarrate={session.audioNarrationText} label="Instructions" />
      </View>

      <Text style={styles.title}>{session.title}</Text>

      {/* Difficulty badge */}
      <View style={styles.diffRow}>
        <View style={[styles.diffBadge, { backgroundColor: diffColor[session.difficultyLevel] + '18' }]}>
          <View style={[styles.diffDot, { backgroundColor: diffColor[session.difficultyLevel] }]} />
          <Text style={[styles.diffText, { color: diffColor[session.difficultyLevel] }]}>
            {session.difficultyLevel}
          </Text>
        </View>
        <Text style={styles.adaptiveHint}>
          Adaptive next: <Text style={{ fontWeight: '800', color: COLORS.primaryGreen }}>{nextLevel}</Text>
        </Text>
      </View>

      {/* STAGE 1: Study */}
      {stage === 'study' && (
        <View style={styles.stageCard}>
          <Text style={styles.instruction}>{session.instruction}</Text>
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
            title="I've Memorised These"
            onPress={startRecall}
            variant="primary"
            iconName="checkmark-circle"
            size="large"
          />
        </View>
      )}

      {/* STAGE 2: Recall */}
      {stage === 'recall' && (
        <View style={[styles.stageCard, styles.stageOrange]}>
          <Ionicons name="help-circle" size={40} color={COLORS.warmOrange} style={{ alignSelf: 'center', marginBottom: SPACING.xs }} />
          <Text style={styles.questionText}>"{session.recallQuestion}"</Text>
          <Text style={styles.hintText}>Take your time. Picture it in your mind.</Text>
          <AccessibleButton
            title="I Remember — Show Options"
            onPress={showRecognitionFallback}
            variant="accent"
            iconName="bulb-outline"
            size="large"
          />
          <AccessibleButton
            title="I Need a Hint"
            onPress={showRecognitionFallback}
            variant="ghost"
            iconName="help-buoy-outline"
          />
        </View>
      )}

      {/* STAGE 3: Recognition */}
      {stage === 'recognition' && (
        <View style={styles.stageCard}>
          <Text style={styles.questionText}>Which object do you remember?</Text>
          <View style={styles.optionsList}>
            {session.multipleChoiceOptions.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                onPress={() => submitAnswer(idx)}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>{opt}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* STAGE 4: Result */}
      {stage === 'completed' && (
        <View style={[styles.stageCard, isCorrect ? styles.stageSuccess : styles.stageSoft]}>
          <View style={styles.feedbackCenter}>
            <Text style={styles.feedbackEmoji}>{isCorrect ? '🎉' : '💚'}</Text>
            <Text style={styles.feedbackTitle}>
              {isCorrect ? 'Wonderful!' : 'Great Effort!'}
            </Text>
            <Text style={styles.feedbackDetail}>
              {isCorrect
                ? 'You remembered correctly. Excellent focus!'
                : 'Daily practice is what keeps memories warm. Well done.'}
            </Text>
          </View>
          <AccessibleButton
            title="Try Again"
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
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
    gap: SPACING.sm,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  domainPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.lavenderLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    borderWidth: 1,
    borderColor: COLORS.lavender + '44',
  },
  domainPillText: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    fontWeight: '700',
    color: COLORS.lavender,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  diffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  diffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  diffDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  diffText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  adaptiveHint: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    color: COLORS.textSubtle,
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
  stageOrange: {
    backgroundColor: COLORS.warningLight,
    borderColor: COLORS.peachDark,
  },
  stageSuccess: {
    backgroundColor: COLORS.successLight,
    borderColor: COLORS.mintGreenDark,
  },
  stageSoft: {
    backgroundColor: COLORS.lightLilac,
    borderColor: COLORS.lavender + '44',
  },
  instruction: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    color: COLORS.textDark,
    lineHeight: ACCESSIBILITY.lineHeight.body - 2,
    fontWeight: '600',
  },
  objectsGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'space-between',
  },
  objectBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
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
    color: COLORS.textDark,
  },
  objectHin: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  questionText: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: ACCESSIBILITY.lineHeight.heading - 2,
    textAlign: 'center',
  },
  hintText: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  optionsList: {
    gap: SPACING.xs,
  },
  optionButton: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight,
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    fontWeight: '700',
    color: COLORS.textDark,
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
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  feedbackDetail: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.caption,
  },
});
