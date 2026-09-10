import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../theme/tokens';
import { AccessibleButton } from '../components/common/AccessibleButton';
import { LanguageToggle } from '../components/common/LanguageToggle';
import { UserRole } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t, language } = useLanguage();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.logoMark}>
          <Ionicons name="leaf" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>
          {language === 'as' ? t('appNameAs') : t('appName')}
        </Text>
        <Text style={styles.subtitle}>{t('tagline')}</Text>
      </View>

      <View style={styles.langBlock}>
        <LanguageToggle />
      </View>

      <View style={styles.cardBox}>
        <Text style={styles.promptText}>{t('selectRole')}</Text>

        <View style={styles.roleOption}>
          <View style={styles.iconCirclePatient}>
            <Ionicons name="person" size={32} color={COLORS.primary} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>{t('patientRole')}</Text>
            <Text style={styles.roleDescription}>{t('patientRoleDesc')}</Text>
          </View>
          <AccessibleButton
            title={t('openPatient')}
            onPress={() => onSelectRole('patient')}
            variant="primary"
            iconName="arrow-forward-circle"
          />
        </View>

        <View style={[styles.roleOption, { marginTop: SPACING.lg }]}>
          <View style={styles.iconCircleCaregiver}>
            <Ionicons name="people" size={32} color={COLORS.info} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>{t('caregiverRole')}</Text>
            <Text style={styles.roleDescription}>{t('caregiverRoleDesc')}</Text>
          </View>
          <AccessibleButton
            title={t('openCaregiver')}
            onPress={() => onSelectRole('caregiver')}
            variant="secondary"
            iconName="analytics"
          />
        </View>
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.footerText}>{t('demoNote')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
    padding: SPACING.lg,
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
    marginBottom: SPACING.lg,
  },
  logoMark: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACING.xs,
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
    color: COLORS.textSecondary,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.lineHeight.caption,
  },
  langBlock: {
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  cardBox: {
    backgroundColor: COLORS.surface,
    borderRadius: ACCESSIBILITY.borderRadius.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionLabel: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  roleOption: {
    backgroundColor: COLORS.bg,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  iconCirclePatient: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    padding: SPACING.md,
    gap: SPACING.md,
  },
  iconCircleCaregiver: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.infoBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  roleTextBlock: {
    flex: 1,
  },
  roleTitle: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '700',
    color: COLORS.text,
  },
  roleDescription: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: ACCESSIBILITY.lineHeight.caption,
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
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textSecondary,
  },
});
