import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../theme/tokens';
import { AccessibleButton } from '../components/common/AccessibleButton';
import { UserRole } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface RoleSelectionScreenProps {
  onSelectRole: (role: UserRole) => void;
}

interface RoleCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonVariant: 'primary' | 'secondary';
  onPress: () => void;
  accentColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  icon, iconBg, iconColor, title, description, buttonLabel, buttonVariant, onPress, accentColor
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.985, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
  };

  return (
    <Animated.View style={[styles.roleCard, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.roleCardInner}
      >
        <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={28} color={iconColor} />
        </View>
        <View style={styles.roleTextBlock}>
          <Text style={styles.roleTitle}>{title}</Text>
          <Text style={styles.roleDescription}>{description}</Text>
        </View>
        <View style={[styles.roleArrow, { backgroundColor: iconBg }]}>
          <Ionicons name="arrow-forward" size={18} color={iconColor} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/* Hero section */}
      <View style={styles.hero}>
        <View style={styles.heroIconWrap}>
          <Ionicons name="heart-circle" size={64} color={COLORS.primaryGreen} />
        </View>
        <Text style={styles.title}>स्मृति सेतु</Text>
        <Text style={styles.titleEn}>Smriti Setu</Text>
        <Text style={styles.subtitle}>Bridge of Memories · Dementia Care & Support</Text>
      </View>

      {/* Role Cards */}
      <View style={styles.cardsSection}>
        <Text style={styles.sectionLabel}>Choose your role to continue</Text>

        <RoleCard
          icon="person"
          iconBg={COLORS.mintGreen}
          iconColor={COLORS.primaryGreen}
          title="Patient View"
          description="Calm, large-text interface with gentle cued reminders and audio assistance."
          buttonLabel="Open Patient App"
          buttonVariant="primary"
          onPress={() => onSelectRole('patient')}
          accentColor={COLORS.primaryGreen}
        />

        <RoleCard
          icon="medical"
          iconBg={COLORS.skyBlueLight}
          iconColor={COLORS.skyBlue}
          title="Caregiver View"
          description="Cognitive domain trends, weekly summaries, and escalation monitoring."
          buttonLabel="Open Caregiver App"
          buttonVariant="secondary"
          onPress={() => onSelectRole('caregiver')}
          accentColor={COLORS.skyBlue}
        />
      </View>

      <Text style={styles.footerText}>Demo Framework · Mock data active</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bgLight,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
  },
  heroIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: COLORS.mintGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  titleEn: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primaryGreen,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 2,
  },
  subtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.caption,
  },
  cardsSection: {
    gap: SPACING.md,
  },
  sectionLabel: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.textSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.xs,
  },
  roleCard: {
    borderRadius: ACCESSIBILITY.borderRadius.lg,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  roleCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    gap: SPACING.md,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  roleTextBlock: {
    flex: 1,
  },
  roleTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  roleDescription: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  roleArrow: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  footerText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    color: COLORS.textSubtle,
    textAlign: 'center',
    marginTop: SPACING.xl,
    letterSpacing: 0.3,
  },
});
