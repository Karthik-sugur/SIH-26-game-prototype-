import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, ACCESSIBILITY, SHADOWS } from '../../theme/tokens';
import { Ionicons } from '@expo/vector-icons';

interface AudioNarrationButtonProps {
  textToNarrate?: string;
  label?: string;
}

export const AudioNarrationButton: React.FC<AudioNarrationButtonProps> = ({
  textToNarrate = 'Audio narration cue',
  label = 'Listen',
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    setIsPlaying(true);

    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, speed: 50, bounciness: 0 }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      { iterations: 3 }
    ).start();

    setTimeout(() => setIsPlaying(false), 2500);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        style={[
          styles.container,
          isPlaying ? styles.playing : styles.idle,
        ]}
        accessibilityLabel={`Audio Narration: ${label}`}
      >
        <Animated.View style={{ transform: [{ scale: isPlaying ? pulseAnim : 1 }] }}>
          <Ionicons
            name={isPlaying ? 'volume-high' : 'volume-medium-outline'}
            size={20}
            color={isPlaying ? COLORS.white : COLORS.lavender}
          />
        </Animated.View>
        <Text style={[styles.text, isPlaying && styles.textPlaying]}>
          {isPlaying ? 'Playing…' : label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    minHeight: 40,
    gap: 6,
  },
  idle: {
    backgroundColor: COLORS.lavenderLight,
    borderWidth: 1,
    borderColor: COLORS.lavender,
  },
  playing: {
    backgroundColor: COLORS.lavender,
    borderWidth: 1,
    borderColor: COLORS.lavender,
    ...SHADOWS.colored(COLORS.lavender),
  },
  text: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.lavender,
    letterSpacing: 0.3,
  },
  textPlaying: {
    color: COLORS.white,
  },
});
