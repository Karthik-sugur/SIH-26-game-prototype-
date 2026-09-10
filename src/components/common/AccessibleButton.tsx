import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, Animated } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING, SHADOWS } from '../../theme/tokens';
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const config: Record<string, { bg: string; text: string; shadow: object; border?: string }> = {
    primary: {
      bg: COLORS.primaryGreen,
      text: COLORS.white,
      shadow: SHADOWS.colored(COLORS.primaryGreen),
    },
    secondary: {
      bg: COLORS.skyBlue,
      text: COLORS.white,
      shadow: SHADOWS.colored(COLORS.skyBlue),
    },
    accent: {
      bg: COLORS.warmOrange,
      text: COLORS.white,
      shadow: SHADOWS.colored(COLORS.warmOrange),
    },
    warning: {
      bg: COLORS.warning,
      text: COLORS.white,
      shadow: SHADOWS.colored(COLORS.warning),
    },
    outline: {
      bg: 'transparent',
      text: COLORS.primaryGreen,
      shadow: {},
      border: COLORS.primaryGreen,
    },
    ghost: {
      bg: COLORS.surface,
      text: COLORS.textDark,
      shadow: {},
    },
  };

  const cfg = disabled
    ? { bg: COLORS.border, text: COLORS.textMuted, shadow: {} }
    : config[variant];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.button,
          size === 'large' && styles.buttonLarge,
          {
            backgroundColor: cfg.bg,
            borderWidth: variant === 'outline' ? 2 : 0,
            borderColor: cfg.border ?? 'transparent',
            ...cfg.shadow,
          },
          style,
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={size === 'large' ? 26 : 22}
            color={cfg.text}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, size === 'large' && styles.textLarge, { color: cfg.text }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: ACCESSIBILITY.minTouchTargetHeight,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: ACCESSIBILITY.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xs,
  },
  buttonLarge: {
    minHeight: 64,
    paddingHorizontal: SPACING.xl,
    borderRadius: ACCESSIBILITY.borderRadius.lg,
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
