import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';

interface CardProps {
  children: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  style?: ViewStyle;
  elevated?: boolean;
  noBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  bgColor = COLORS.surfaceElevated,
  borderColor = COLORS.border,
  style,
  elevated = false,
  noBorder = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        elevated ? styles.elevated : styles.flat,
        {
          backgroundColor: bgColor,
          borderColor: noBorder ? 'transparent' : borderColor,
          borderWidth: noBorder ? 0 : 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: ACCESSIBILITY.borderRadius.md,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    overflow: 'hidden',
  },
  flat: {
    ...SHADOWS.sm,
  },
  elevated: {
    ...SHADOWS.md,
  },
});
