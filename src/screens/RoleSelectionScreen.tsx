import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../theme/tokens';
import { AccessibleButton } from '../components/common/AccessibleButton';
import { LanguageToggle } from '../components/common/LanguageToggle';
import { UserRole } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../i18n/LanguageContext';

interface RoleSelectionScreenProps {
  onSelectRole: (role: UserRole) => void;
}

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
  headerBox: {
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
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACING.xs,
    textAlign: 'center',
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
  promptText: {
    fontSize: ACCESSIBILITY.fontSize.heading,
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
  },
  iconCirclePatient: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  iconCircleCaregiver: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.infoBg,
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
    color: COLORS.text,
  },
  roleDescription: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: ACCESSIBILITY.lineHeight.caption,
  },
  footerNote: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textSecondary,
  },
});
