import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY, SHADOWS } from '../../theme/tokens';
import { UserRole } from '../../types';
import { Ionicons } from '@expo/vector-icons';

interface RoleHeaderProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

export const RoleHeader: React.FC<RoleHeaderProps> = ({ currentRole, onSwitchRole }) => {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.logoMark}>
          <Ionicons name="heart-circle" size={22} color={COLORS.white} />
        </View>
        <Text style={styles.brandTitle}>Smriti Setu</Text>
      </View>
      <View style={styles.switcherRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSwitchRole('patient')}
          style={[
            styles.roleChip,
            currentRole === 'patient' ? styles.activeChipPatient : styles.inactiveChip,
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
            Patient
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSwitchRole('caregiver')}
          style={[
            styles.roleChip,
            currentRole === 'caregiver' ? styles.activeChipCaregiver : styles.inactiveChip,
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
            Caregiver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  inactiveChip: {
    backgroundColor: 'transparent',
  },
  activeChipPatient: {
    backgroundColor: COLORS.primaryGreen,
    ...SHADOWS.colored(COLORS.primaryGreen),
  },
  activeChipCaregiver: {
    backgroundColor: COLORS.skyBlue,
    ...SHADOWS.colored(COLORS.skyBlue),
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.textMuted,
  },
});
