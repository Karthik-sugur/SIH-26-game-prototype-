import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { Ionicons } from '@expo/vector-icons';

interface AccessibleButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'warning' | 'outline';
  iconName?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * Accessible button with non-negotiable >=56px touch target height and tap-only interaction for elderly patients.
 */
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  iconName,
  disabled = false,
  style,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.border;
    switch (variant) {
      case 'primary':
        return COLORS.primaryGreen;
      case 'secondary':
        return COLORS.skyBlue;
      case 'accent':
        return COLORS.warmOrange;
      case 'warning':
        return COLORS.warning;
      case 'outline':
        return 'transparent';
      default:
        return COLORS.primaryGreen;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (variant === 'outline') return COLORS.primaryGreen;
    if (variant === 'accent' || variant === 'warning') return COLORS.textDark;
    return COLORS.white;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: COLORS.primaryGreen,
        },
        style,
      ]}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={24}
          color={getTextColor()}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight, // Minimum 56px height
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xs,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  text: {
    fontSize: ACCESSIBILITY.fontSize.body,
    fontWeight: '700',
    textAlign: 'center',
  },
});
