import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { usePatientData } from '../../services/usePatientData';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t('profileHeading')}</Text>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.profileCard}>
        <View style={styles.avatarBox}>
          <Ionicons name="person-circle-outline" size={100} color={COLORS.primary} />
        </View>
        <Text style={styles.patientName}>{patient.name}</Text>
        <Text style={styles.patientAge}>
          {t('yearsOld', { age: patient.age, location: patient.location })}
        </Text>
      </Card>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.infoCard}>
        <View style={styles.rowItem}>
          <Ionicons name="language-outline" size={28} color={COLORS.info} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{t('preferredLanguages')}</Text>
            <Text style={styles.value}>{patient.preferredLanguage}</Text>
          </View>
        </View>
      </Card>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.infoCard}>
        <View style={styles.rowItem}>
          <Ionicons name="heart-outline" size={28} color={COLORS.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{t('primaryCaregiver')}</Text>
            <Text style={styles.value}>{patient.primaryCaregiverName}</Text>
          </View>
        </View>
      </View>

      <Card bgColor={COLORS.accentSoft} borderColor={COLORS.border} style={styles.infoCard}>
        <View style={styles.rowItem}>
          <Ionicons name="call" size={28} color={COLORS.error} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{t('emergencyContact')}</Text>
            <Text style={[styles.value, { fontWeight: '800', fontSize: ACCESSIBILITY.fontSize.heading - 2 }]}>
              {patient.emergencyContact.name}
            </Text>
            <Text style={[styles.value, { color: COLORS.error, fontWeight: '700' }]}>
              {patient.emergencyContact.phone}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
    gap: SPACING.md,
  },
  heading: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
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
    color: COLORS.text,
  },
  patientAge: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
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
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  emergencyName: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 2,
  },
});
