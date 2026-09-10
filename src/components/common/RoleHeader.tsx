import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY, SHADOWS } from '../../theme/tokens';
import { UserRole } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../../i18n/LanguageContext';

interface RoleHeaderProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

export const RoleHeader: React.FC<RoleHeaderProps> = ({ currentRole, onSwitchRole }) => {
  const { t, language } = useLanguage();

  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.logoMark}>
          <Ionicons name="leaf" size={18} color={COLORS.primary} />
        </View>
        <Text style={styles.brandTitle}>
          {language === 'as' ? t('appNameAs') : t('appName')}
        </Text>
        <View style={{ flex: 1 }} />
        <LanguageToggle />
      </View>

      <View style={styles.switcherRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSwitchRole('patient')}
          style={[
            styles.roleChip,
            currentRole === 'patient' ? styles.activeChip : styles.inactiveChip,
          ]}
        >
          <Ionicons
            name="person"
            size={14}
            color={currentRole === 'patient' ? COLORS.white : COLORS.textMuted}
          />
          <Text
            style={[
              styles.chipText,
              currentRole === 'patient' ? styles.activeText : styles.inactiveText,
            ]}
          >
            {t('patientMode')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSwitchRole('caregiver')}
          style={[
            styles.roleChip,
            currentRole === 'caregiver' ? styles.activeChip : styles.inactiveChip,
          ]}
        >
          <Ionicons
            name="medical"
            size={14}
            color={currentRole === 'caregiver' ? COLORS.white : COLORS.textMuted}
          />
          <Text
            style={[
              styles.chipText,
              currentRole === 'caregiver' ? styles.activeText : styles.inactiveText,
            ]}
          >
            {t('caregiverMode')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.surface,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  switcherRow: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: COLORS.surface,
    padding: 4,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleChip: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 10,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  inactiveChip: {
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '700',
  },
  activeText: {
    color: COLORS.textOnPrimary,
  },
  inactiveText: {
    color: COLORS.textSecondary,
  },
});
