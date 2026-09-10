import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';

interface CardProps {
  children: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  bgColor = COLORS.surface,
  borderColor = COLORS.border,
  style,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
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
    borderWidth: 1,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
});
