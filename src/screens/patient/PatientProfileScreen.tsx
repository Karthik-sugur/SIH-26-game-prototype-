import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { usePatientData } from '../../services/usePatientData';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

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
      </Card>

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
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
  },
  heading: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  profileCard: {
    alignItems: 'center',
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  avatarBox: {
    marginBottom: SPACING.xs,
  },
  patientName: {
    fontSize: ACCESSIBILITY.fontSize.title - 2,
    fontWeight: '800',
    color: COLORS.text,
  },
  patientAge: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  label: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 2,
  },
});
