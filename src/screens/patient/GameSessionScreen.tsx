import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { AudioNarrationButton } from '../../components/common/AudioNarrationButton';
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

  // STUB HOOK POINT: Demonstrate adaptive difficulty determination
  const nextCalculatedLevel = getNextDifficultyStub(85, 3, session.difficultyLevel);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/* Header Info */}
      <View style={styles.headerRow}>
        <View style={styles.domainChip}>
          <Ionicons name="bulb-outline" size={18} color={COLORS.lavender} />
          <Text style={styles.domainText}>{session.domain} Domain Activity</Text>
        </View>
        <AudioNarrationButton textToNarrate={session.audioNarrationText} label="Instruction Audio" />
      </View>

      <Text style={styles.title}>{session.title}</Text>

      {/* Stub Adaptive Level Badge */}
      <View style={styles.stubBadgeContainer}>
        <Text style={styles.stubBadgeText}>
          Difficulty: <Text style={{ fontWeight: '800' }}>{session.difficultyLevel}</Text> • Adaptive Engine Next Target: <Text style={{ fontWeight: '800', color: COLORS.primaryGreen }}>{nextCalculatedLevel}</Text>
        </Text>
      </View>

      {/* STAGE 1: Study Objects */}
      {stage === 'study' && (
        <Card bgColor={COLORS.white} borderColor={COLORS.lavender} style={styles.stageCard}>
          <Text style={styles.instructionText}>{session.instruction}</Text>

          <View style={styles.objectsGrid}>
            {session.objectsToRemember.map((obj) => (
              <View key={obj.id} style={styles.objectBox}>
                <Text style={styles.objectEmoji}>{obj.imageUrl}</Text>
                <Text style={styles.objectName}>{obj.name}</Text>
                <Text style={styles.objectHinName}>{obj.hinName}</Text>
              </View>
            ))}
          </View>

          <AccessibleButton
            title="I Have Memorized These Objects"
            onPress={startRecall}
            variant="primary"
            iconName="checkmark-circle"
          />
        </Card>
      )}

      {/* STAGE 2: Direct Cued Recall */}
      {stage === 'recall' && (
        <Card bgColor={COLORS.white} borderColor={COLORS.warmOrange} style={styles.stageCard}>
          <Text style={styles.questionText}>"{session.recallQuestion}"</Text>
          <Text style={styles.hintText}>
            Try to picture the item in your mind. Take all the time you need.
          </Text>

          <AccessibleButton
            title="I Remember! Show Options"
            onPress={showRecognitionFallback}
            variant="accent"
            iconName="bulb-outline"
          />
          <AccessibleButton
            title="Give Me a Helpful Hint"
            onPress={showRecognitionFallback}
            variant="secondary"
            iconName="help-buoy-outline"
          />
        </Card>
      )}

      {/* STAGE 3: Multiple Choice Recognition Fallback */}
      {stage === 'recognition' && (
        <Card bgColor={COLORS.white} borderColor={COLORS.skyBlue} style={styles.stageCard}>
          <Text style={styles.questionText}>Select the object from options below:</Text>

          <View style={styles.optionsList}>
            {session.multipleChoiceOptions.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                onPress={() => submitAnswer(idx)}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>{opt}</Text>
                <Ionicons name="chevron-forward-circle" size={28} color={COLORS.skyBlue} />
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      )}

      {/* STAGE 4: Feedback & Encouragement */}
      {stage === 'completed' && (
        <Card
          bgColor={isCorrect ? COLORS.mintGreen : COLORS.peach}
          borderColor={isCorrect ? COLORS.primaryGreen : COLORS.warmOrange}
          style={styles.stageCard}
        >
          <View style={styles.feedbackHeader}>
            <Ionicons
              name={isCorrect ? 'happy' : 'heart'}
              size={48}
              color={isCorrect ? COLORS.primaryGreen : COLORS.warmOrange}
            />
            <Text style={styles.feedbackTitle}>
              {isCorrect ? 'Wonderful Memory!' : 'Great Effort!'}
            </Text>
          </View>

          <Text style={styles.feedbackDetail}>
            {isCorrect
              ? 'You correctly remembered the Reading Glasses! Excellent focus today.'
              : 'Thank you for taking time to practice. Gentle daily practice keeps memories warm.'}
          </Text>

          <AccessibleButton
            title="Try Activity Again"
            onPress={resetSession}
            variant="primary"
            iconName="refresh-circle"
          />
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  domainChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightLilac,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    gap: 6,
  },
  domainText: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.textDark,
    marginVertical: SPACING.xs,
  },
  stubBadgeContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xs,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stubBadgeText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  stageCard: {
    padding: SPACING.lg,
  },
  instructionText: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  objectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    justifyContent: 'space-between',
  },
  objectBox: {
    width: '30%',
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  objectEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  objectName: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.textDark,
  },
  objectHinName: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  questionText: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
    lineHeight: ACCESSIBILITY.lineHeight.heading,
  },
  hintText: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  optionsList: {
    gap: SPACING.md,
  },
  optionButton: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight, // 56px minimum
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    borderWidth: 2,
    borderColor: COLORS.skyBlue,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  feedbackHeader: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  feedbackTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: SPACING.xs,
  },
  feedbackDetail: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
});
