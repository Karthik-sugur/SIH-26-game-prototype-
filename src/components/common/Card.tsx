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
    borderWidth: 1,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    shadowColor: '#1A2420',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
