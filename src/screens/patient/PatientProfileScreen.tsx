import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
import { usePatientData } from '../../services/usePatientData';
import { Ionicons } from '@expo/vector-icons';

const InfoRow = ({ icon, label, value, iconColor, iconBg }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  iconColor: string;
  iconBg: string;
}) => (
  <View style={infoStyles.row}>
    <View style={[infoStyles.iconWrap, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={infoStyles.value}>{value}</Text>
    </View>
  </View>
);

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.textSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    fontSize: ACCESSIBILITY.fontSize.body - 2,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 2,
  },
});

export const PatientProfileScreen: React.FC = () => {
  const { patient } = usePatientData();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/* Hero avatar */}
      <View style={styles.hero}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={52} color={COLORS.primaryGreen} />
          </View>
        </View>
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.meta}>{patient.age} years · {patient.location}</Text>
        <View style={styles.streakPill}>
          <Ionicons name="flame" size={14} color={COLORS.warmOrange} />
          <Text style={styles.streakPillText}>{patient.streakDays}-day streak</Text>
        </View>
      </View>

      {/* Info card */}
      <View style={styles.card}>
        <InfoRow
          icon="language-outline"
          label="Preferred Languages"
          value={patient.preferredLanguage}
          iconColor={COLORS.skyBlue}
          iconBg={COLORS.skyBlueLight}
        />
        <InfoRow
          icon="heart"
          label="Primary Caregiver"
          value={patient.primaryCaregiverName}
          iconColor={COLORS.warmOrange}
          iconBg={COLORS.peach}
        />
        <View style={{ height: 1 }} />
      </View>

      {/* Emergency contact */}
      <View style={[styles.card, styles.emergencyCard]}>
        <View style={styles.emergencyHeader}>
          <Ionicons name="alert-circle" size={20} color={COLORS.error} />
          <Text style={styles.emergencyTitle}>Emergency Contact</Text>
        </View>
        <Text style={styles.emergencyName}>{patient.emergencyContact.name}</Text>
        <View style={styles.phonePill}>
          <Ionicons name="call" size={14} color={COLORS.error} />
          <Text style={styles.phoneText}>{patient.emergencyContact.phone}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
    gap: SPACING.md,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  avatarRing: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 3,
    borderColor: COLORS.mintGreenDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.mintGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  meta: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    marginTop: SPACING.sm,
  },
  streakPillText: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.warmOrange,
  },
  card: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  emergencyCard: {
    backgroundColor: COLORS.errorLight,
    borderColor: COLORS.error + '40',
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  emergencyTitle: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '800',
    color: COLORS.error,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emergencyName: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  phonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    borderWidth: 1,
    borderColor: COLORS.error + '40',
  },
  phoneText: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.error,
  },
});
