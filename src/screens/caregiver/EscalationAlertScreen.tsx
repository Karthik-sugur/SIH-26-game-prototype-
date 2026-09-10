import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY, SHADOWS } from '../../theme/tokens';
import { AccessibleButton } from '../../components/common/AccessibleButton';
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
        <View
          key={alert.id}
          style={[
            styles.alertCard,
            alert.resolved ? styles.alertResolved : styles.alertActive,
          ]}
        >
          <View style={styles.alertHeader}>
            <View style={styles.titleRow}>
              <View
                style={[
                  styles.alertIconWrap,
                  { backgroundColor: alert.resolved ? COLORS.successLight : COLORS.errorLight },
                ]}
              >
                <Ionicons
                  name={alert.resolved ? 'checkmark-circle' : 'warning'}
                  size={20}
                  color={alert.resolved ? COLORS.primaryGreen : COLORS.error}
                />
              </View>
              <Text style={styles.alertTitle}>{alert.title}</Text>
            </View>

            <View
              style={[
                styles.badge,
                { backgroundColor: alert.resolved ? COLORS.successLight : COLORS.errorLight },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: alert.resolved ? COLORS.primaryGreen : COLORS.error },
                ]}
              >
                {alert.resolved ? 'Resolved' : 'Action Required'}
              </Text>
            </View>
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
            <Ionicons name="call-outline" size={18} color={COLORS.skyBlue} />
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
        </View>
      ))}

      {/* ARDSI Helpline Information Card */}
      <View style={styles.ardsiCard}>
        <View style={styles.ardsiHeader}>
          <View style={styles.ardsiIconWrap}>
            <Ionicons name="medical" size={22} color={COLORS.primaryGreen} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ardsiTitle}>ARDSI India Support Helpline</Text>
            <Text style={styles.ardsiSub}>Dementia Care Guidance</Text>
          </View>
        </View>
        <Text style={styles.ardsiDesc}>
          Alzheimer's and Related Disorders Society of India (ARDSI) provides national guidance, caregiver training, and dementia support groups.
        </Text>
        <View style={styles.phoneBadge}>
          <Ionicons name="call" size={16} color={COLORS.primaryGreen} />
          <Text style={styles.ardsiPhone}>National Helpline: +91 98461 54400</Text>
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
    gap: SPACING.sm,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  alertCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    gap: 4,
    ...SHADOWS.sm,
  },
  alertActive: {
    borderColor: COLORS.error + '40',
    backgroundColor: '#FFF8F8',
  },
  alertResolved: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceElevated,
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
    gap: 8,
    flex: 1,
  },
  alertIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  sectionBox: {
    marginVertical: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueText: {
    fontSize: 13,
    color: COLORS.textDark,
    marginTop: 2,
    lineHeight: 18,
  },
  contactTargetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.skyBlueLight,
    padding: 10,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    marginVertical: 6,
    gap: 6,
  },
  targetText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.skyBlue,
  },
  buttonRow: {
    marginTop: 4,
  },
  ardsiCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.mintGreenDark,
    marginTop: SPACING.xs,
    gap: SPACING.xs,
    ...SHADOWS.sm,
  },
  ardsiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  ardsiIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.mintGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ardsiTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primaryGreen,
  },
  ardsiSub: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  ardsiDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  phoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.mintGreen,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  ardsiPhone: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryGreen,
  },
});
