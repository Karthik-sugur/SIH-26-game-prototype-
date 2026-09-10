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
          borderColor,
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
    shadowColor: '#1A2420',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
