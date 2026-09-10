import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, ACCESSIBILITY } from '../../theme/tokens';
import { Ionicons } from '@expo/vector-icons';

interface AudioNarrationButtonProps {
  textToNarrate?: string;
  label?: string;
}

/**
 * Placeholder audio-narration button component for elderly patient instructions.
 * Visually provides audio cues; simulates TTS narration playback on tap.
 */
export const AudioNarrationButton: React.FC<AudioNarrationButtonProps> = ({
  textToNarrate = 'Audio narration cue',
  label = 'Listen',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2500);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[
        styles.container,
        { backgroundColor: isPlaying ? COLORS.warmOrange : COLORS.lavender },
      ]}
      accessibilityLabel={`Audio Narration: ${label}`}
    >
      <Ionicons
        name={isPlaying ? 'volume-high' : 'volume-medium-outline'}
        size={24}
        color={COLORS.textDark}
      />
      <Text style={styles.text}>{isPlaying ? 'Playing...' : label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: ACCESSIBILITY.borderRadius.pill,
    minHeight: 48,
    gap: 8,
  },
  text: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.textDark,
  },
});
