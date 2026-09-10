import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Ionicons } from '@expo/vector-icons';

interface AccessibleButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'warning' | 'outline' | 'ghost';
  iconName?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
  size?: 'normal' | 'large';
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  iconName,
  disabled = false,
  style,
  size = 'normal',
}) => {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.border;
    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.info;
      case 'accent':
        return COLORS.accent;
      case 'warning':
        return COLORS.warning;
      case 'outline':
        return 'transparent';
      default:
        return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textSecondary;
    if (variant === 'outline') return COLORS.primary;
    if (variant === 'accent' || variant === 'warning') return COLORS.white;
    return COLORS.textOnPrimary;
  };

  const cfg = disabled
    ? { bg: COLORS.border, text: COLORS.textMuted, shadow: {} }
    : config[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: COLORS.primary,
        },
        style,
      ]}
    >
      {iconName && (
        <Ionicons name={iconName} size={24} color={getTextColor()} style={styles.icon} />
      )}
      <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: ACCESSIBILITY.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xs,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  textLarge: {
    fontSize: ACCESSIBILITY.fontSize.heading - 2,
  },
});
