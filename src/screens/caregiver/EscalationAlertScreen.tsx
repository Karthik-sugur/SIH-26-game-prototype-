import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, ACCESSIBILITY } from '../../theme/tokens';
import { Card } from '../../components/common/Card';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { Badge } from '../../components/common/Badge';
import { useCaregiverData } from '../../services/useCaregiverData';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

export const EscalationAlertScreen: React.FC = () => {
  const { alerts, resolveAlert } = useCaregiverData();
  const { t } = useLanguage();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('escalationTitle')}</Text>
      <Text style={styles.subtitle}>{t('escalationSub')}</Text>

      {alerts.map((alert) => (
        <Card
          key={alert.id}
          bgColor={alert.resolved ? COLORS.surfaceMuted : COLORS.errorBg}
          borderColor={alert.resolved ? COLORS.border : COLORS.error}
          style={styles.alertCard}
        >
          <View style={styles.alertHeader}>
            <View style={styles.titleRow}>
              <Ionicons
                name={alert.resolved ? 'checkmark-circle' : 'warning'}
                size={24}
                color={alert.resolved ? COLORS.primary : COLORS.error}
              />
              <Text style={styles.alertTitle}>{alert.title}</Text>
            </View>
            <Badge
              label={alert.resolved ? t('resolved') : t('actionRequired')}
              type={alert.resolved ? 'success' : 'error'}
            />
          </View>

          <Text style={styles.dateText}>{t('observedDate', { date: alert.date })}</Text>

          <View style={styles.sectionBox}>
            <Text style={styles.label}>{t('reasonLabel')}</Text>
            <Text style={styles.valueText}>{alert.reason}</Text>
          </View>

          <View style={styles.sectionBox}>
            <Text style={styles.label}>{t('nextStepLabel')}</Text>
            <Text style={styles.valueText}>{alert.suggestedAction}</Text>
          </View>

          <View style={styles.contactTargetBox}>
            <Ionicons name="call-outline" size={20} color={COLORS.info} />
            <Text style={styles.targetText}>
              {t('recommendedTarget', { target: alert.contactTarget })}
            </Text>
          </View>

          {!alert.resolved && (
            <View style={styles.buttonRow}>
              <AccessibleButton
                title={t('notify', { target: alert.contactTarget })}
                onPress={() => resolveAlert(alert.id)}
                variant="warning"
                iconName="send"
                style={{ flex: 1 }}
              />
            </View>
          )}
        </Card>
      ))}

      <Card bgColor={COLORS.surface} borderColor={COLORS.border} style={styles.ardsiCard}>
        <View style={styles.ardsiHeader}>
          <Ionicons name="medical-outline" size={28} color={COLORS.primary} />
          <Text style={styles.ardsiTitle}>{t('ardsiTitle')}</Text>
        </View>
        <Text style={styles.ardsiDesc}>{t('ardsiDesc')}</Text>
        <Text style={styles.ardsiPhone}>{t('ardsiPhone')}</Text>
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 22,
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
    gap: SPACING.xs,
    flexWrap: 'wrap',
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
    color: COLORS.text,
    flex: 1,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  sectionBox: {
    marginVertical: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  valueText: {
    fontSize: 15,
    color: COLORS.text,
    marginTop: 2,
    lineHeight: 22,
  },
  contactTargetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.infoBg,
    padding: SPACING.sm,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    marginVertical: SPACING.xs,
    gap: 6,
  },
  targetText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.info,
    flex: 1,
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
    color: COLORS.primary,
    flex: 1,
  },
  ardsiDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  ardsiPhone: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 8,
  },
});
