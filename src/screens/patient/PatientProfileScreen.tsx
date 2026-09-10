import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { usePatientData } from '../../services/usePatientData';
import { Ionicons } from '@expo/vector-icons';

export const PatientProfileScreen: React.FC = () => {
  const { patient } = usePatientData();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Personal Profile</Text>

      {/* Large Photo & Name Card */}
      <Card bgColor={COLORS.white} borderColor={COLORS.skyBlue} style={styles.profileCard}>
        <View style={styles.avatarBox}>
          <Ionicons name="person-circle-outline" size={100} color={COLORS.primaryGreen} />
        </View>

        <Text style={styles.patientName}>{patient.name}</Text>
        <Text style={styles.patientAge}>{patient.age} years old • {patient.location}</Text>
      </Card>

      {/* Language Preference Card */}
      <Card bgColor={COLORS.white} borderColor={COLORS.border} style={styles.infoCard}>
        <View style={styles.rowItem}>
          <Ionicons name="language-outline" size={28} color={COLORS.skyBlue} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Preferred Languages</Text>
            <Text style={styles.value}>{patient.preferredLanguage}</Text>
          </View>
        </View>
      </Card>

      {/* Primary Caregiver Card */}
      <Card bgColor={COLORS.white} borderColor={COLORS.border} style={styles.infoCard}>
        <View style={styles.rowItem}>
          <Ionicons name="heart-outline" size={28} color={COLORS.warmOrange} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Primary Caregiver</Text>
            <Text style={styles.value}>{patient.primaryCaregiverName}</Text>
          </View>
        </View>
      </Card>

      {/* Emergency Contact Card */}
      <Card bgColor={COLORS.peach} borderColor={COLORS.warmOrange} style={styles.infoCard}>
        <View style={styles.rowItem}>
          <Ionicons name="call" size={28} color={COLORS.error} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Emergency Contact</Text>
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
    backgroundColor: COLORS.bgLight,
    flexGrow: 1,
  },
  heading: {
    fontSize: ACCESSIBILITY.fontSize.title,
    fontWeight: '800',
    color: COLORS.textDark,
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
    color: COLORS.textDark,
  },
  patientAge: {
    fontSize: ACCESSIBILITY.fontSize.body,
    color: COLORS.textMuted,
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
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 2,
  },
});
