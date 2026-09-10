import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Ionicons } from '@expo/vector-icons';

interface BadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'stable';
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const Badge: React.FC<BadgeProps> = ({ label, type = 'info', iconName }) => {
  const getColors = () => {
    switch (type) {
      case 'success':
        return { bg: COLORS.mintGreen, text: COLORS.primaryGreen, icon: 'trending-up' as const };
      case 'warning':
        return { bg: COLORS.peach, text: '#B45309', icon: 'alert-circle' as const };
      case 'error':
        return { bg: '#FEE2E2', text: COLORS.error, icon: 'warning' as const };
      case 'stable':
        return { bg: COLORS.softYellow, text: '#92400E', icon: 'remove-outline' as const };
      case 'info':
      default:
        return { bg: '#DBEAFE', text: COLORS.info, icon: 'information-circle' as const };
    }
  };

  const styleColors = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: styleColors.bg }]}>
      <Ionicons
        name={iconName || styleColors.icon}
        size={16}
        color={styleColors.text}
        style={{ marginRight: 4 }}
      />
      <Text style={[styles.text, { color: styleColors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
  },
  text: {
    fontSize: ACCESSIBILITY.fontSize.caption - 1,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
