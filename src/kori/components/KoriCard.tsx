import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';

interface Props {
  emoji: string;
  label?: string;
  highlighted?: boolean;
  dimmed?: boolean;
}

/** Bracket-framed memory card from the Kori wireframe — light theme */
export const KoriCard: React.FC<Props> = ({ emoji, label, highlighted, dimmed }) => {
  return (
    <View
      style={[
        styles.wrap,
        highlighted && styles.highlighted,
        dimmed && styles.dimmed,
      ]}
    >
      <View style={[styles.corner, styles.tl]} />
      <View style={[styles.corner, styles.tr]} />
      <View style={[styles.corner, styles.bl]} />
      <View style={[styles.corner, styles.br]} />
      <Text style={styles.emoji}>{emoji}</Text>
      {!!label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '46%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    position: 'relative',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: '#1A2420',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  highlighted: {
    backgroundColor: COLORS.primarySoft,
  },
  dimmed: {
    opacity: 0.35,
  },
  emoji: {
    fontSize: 48,
  },
  label: {
    marginTop: 6,
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: COLORS.text,
  },
  tl: { top: 10, left: 10, borderTopWidth: 2, borderLeftWidth: 2 },
  tr: { top: 10, right: 10, borderTopWidth: 2, borderRightWidth: 2 },
  bl: { bottom: 10, left: 10, borderBottomWidth: 2, borderLeftWidth: 2 },
  br: { bottom: 10, right: 10, borderBottomWidth: 2, borderRightWidth: 2 },
});
