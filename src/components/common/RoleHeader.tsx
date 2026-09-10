import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY } from '../../theme/tokens';
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
        <Ionicons name="heart-circle" size={28} color={COLORS.primaryGreen} />
        <Text style={styles.brandTitle}>स्मृति सेतु | Smriti Setu</Text>
      </View>
      <View style={styles.switcherRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSwitchRole('patient')}
          style={[
            styles.roleChip,
            currentRole === 'patient' ? styles.activeChipPatient : styles.inactiveChip,
          ]}
        >
          <Text
            style={[
              styles.chipText,
              currentRole === 'patient' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Patient Mode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSwitchRole('caregiver')}
          style={[
            styles.roleChip,
            currentRole === 'caregiver' ? styles.activeChipCaregiver : styles.inactiveChip,
          ]}
        >
          <Text
            style={[
              styles.chipText,
              currentRole === 'caregiver' ? styles.activeText : styles.inactiveText,
            ]}
          >
            Caregiver Mode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    gap: 8,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  switcherRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  roleChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveChip: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChipPatient: {
    backgroundColor: COLORS.primaryGreen,
  },
  activeChipCaregiver: {
    backgroundColor: COLORS.skyBlue,
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
