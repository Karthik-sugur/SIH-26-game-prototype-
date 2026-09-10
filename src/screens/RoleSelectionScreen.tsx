import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../theme/tokens';
import { AccessibleButton } from '../components/common/AccessibleButton';
import { UserRole } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface RoleSelectionScreenProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.headerBox}>
        <Ionicons name="heart-circle" size={72} color={COLORS.primaryGreen} />
        <Text style={styles.title}>स्मृति सेतु | Smriti Setu</Text>
        <Text style={styles.subtitle}>
          Bridge of Memories • Dementia Care & Support Framework
        </Text>
      </View>

      <View style={styles.cardBox}>
        <Text style={styles.promptText}>Select a role to preview the app:</Text>

        <View style={styles.roleOption}>
          <View style={styles.iconCirclePatient}>
            <Ionicons name="person" size={32} color={COLORS.primaryGreen} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>Patient View ( बुजुर्ग / Senior )</Text>
            <Text style={styles.roleDescription}>
              Calm, low-stress, high contrast UI with large touch targets and audio cues.
            </Text>
          </View>
          <AccessibleButton
            title="Open Patient App"
            onPress={() => onSelectRole('patient')}
            variant="primary"
            iconName="arrow-forward-circle"
          />
        </View>

        <View style={[styles.roleOption, { marginTop: SPACING.lg }]}>
          <View style={styles.iconCircleCaregiver}>
            <Ionicons name="medical" size={32} color={COLORS.skyBlue} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>Caregiver View ( देखभालकर्ता )</Text>
            <Text style={styles.roleDescription}>
              Cognitive domain trends, weekly summary cards, and escalation alert monitoring.
            </Text>
          </View>
          <AccessibleButton
            title="Open Caregiver App"
            onPress={() => onSelectRole('caregiver')}
            variant="secondary"
            iconName="analytics"
          />
        </View>
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          Demo Framework • Local state & mock data active
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bgLight,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  cardBox: {
    backgroundColor: COLORS.white,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  promptText: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  roleOption: {
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconCirclePatient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.mintGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  iconCircleCaregiver: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  roleTextContainer: {
    marginBottom: SPACING.sm,
  },
  roleTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  roleDescription: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textMuted,
    marginTop: 4,
    lineHeight: ACCESSIBILITY.lineHeight.caption,
  },
  footerNote: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textMuted,
  },
});
