import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { Badge } from '../../components/common/Badge';
import { useCaregiverData } from '../../services/useCaregiverData';
import { Ionicons } from '@expo/vector-icons';

export const EscalationAlertScreen: React.FC = () => {
  const { alerts, resolveAlert } = useCaregiverData();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clinician & ARDSI Escalation Alerts</Text>
      <Text style={styles.subtitle}>
        Suggested medical / community support escalations based on cognitive metrics
      </Text>

      {alerts.map((alert) => (
        <Card
          key={alert.id}
          bgColor={alert.resolved ? COLORS.surface : '#FEF2F2'}
          borderColor={alert.resolved ? COLORS.border : COLORS.error}
          style={styles.alertCard}
        >
          <View style={styles.alertHeader}>
            <View style={styles.titleRow}>
              <Ionicons
                name={alert.resolved ? 'checkmark-circle' : 'warning'}
                size={24}
                color={alert.resolved ? COLORS.primaryGreen : COLORS.error}
              />
              <Text style={styles.alertTitle}>{alert.title}</Text>
            </View>
            <Badge
              label={alert.resolved ? 'Resolved' : 'Action Required'}
              type={alert.resolved ? 'success' : 'error'}
            />
          </View>

          <Text style={styles.dateText}>Observed Date: {alert.date}</Text>

          <View style={styles.sectionBox}>
            <Text style={styles.label}>Reason for Escalation Recommendation:</Text>
            <Text style={styles.valueText}>{alert.reason}</Text>
          </View>

          <View style={styles.sectionBox}>
            <Text style={styles.label}>Suggested Next Step:</Text>
            <Text style={styles.valueText}>{alert.suggestedAction}</Text>
          </View>

          <View style={styles.contactTargetBox}>
            <Ionicons name="call-outline" size={20} color={COLORS.skyBlue} />
            <Text style={styles.targetText}>Recommended Target: {alert.contactTarget}</Text>
          </View>

          {!alert.resolved && (
            <View style={styles.buttonRow}>
              <AccessibleButton
                title={`Notify ${alert.contactTarget}`}
                onPress={() => resolveAlert(alert.id)}
                variant="warning"
                iconName="send"
                style={{ flex: 1 }}
              />
            </View>
          )}
        </Card>
      ))}

      {/* ARDSI Helpline Information Card */}
      <Card bgColor={COLORS.white} borderColor={COLORS.primaryGreen} style={styles.ardsiCard}>
        <View style={styles.ardsiHeader}>
          <Ionicons name="medical-outline" size={28} color={COLORS.primaryGreen} />
          <Text style={styles.ardsiTitle}>ARDSI India Support Helpline</Text>
        </View>
        <Text style={styles.ardsiDesc}>
          Alzheimer's and Related Disorders Society of India (ARDSI) provides national guidance, caregiver training, and dementia support groups.
        </Text>
        <Text style={styles.ardsiPhone}>National Helpline: +91 98461 54400</Text>
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  alertCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  sectionBox: {
    marginVertical: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  valueText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 2,
    lineHeight: 20,
  },
  contactTargetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    padding: SPACING.xs,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    marginVertical: SPACING.xs,
    gap: 6,
  },
  targetText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.skyBlue,
  },
  buttonRow: {
    marginTop: SPACING.xs,
  },
  ardsiCard: {
    padding: SPACING.md,
    marginTop: SPACING.xs,
  },
  ardsiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: 6,
  },
  ardsiTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryGreen,
  },
  ardsiDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  ardsiPhone: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primaryGreen,
    marginTop: 8,
  },
});
