import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, ACCESSIBILITY } from '../../theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n/LanguageContext';

interface AudioNarrationButtonProps {
  textToNarrate?: string;
  label?: string;
}

export const AudioNarrationButton: React.FC<AudioNarrationButtonProps> = ({
  textToNarrate = 'Audio narration cue',
  label,
}) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const displayLabel = label ?? t('listen');

  const handlePress = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2500);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[
        styles.container,
        { backgroundColor: isPlaying ? COLORS.accentSoft : COLORS.primarySoft },
      ]}
      accessibilityLabel={`Audio Narration: ${displayLabel}. ${textToNarrate}`}
    >
      <Ionicons
        name={isPlaying ? 'volume-high' : 'volume-medium-outline'}
        size={24}
        color={COLORS.primary}
      />
      <Text style={styles.text}>{isPlaying ? t('playing') : displayLabel}</Text>
    </TouchableOpacity>
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
    minHeight: 48,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: ACCESSIBILITY.fontSize.micro,
    fontWeight: '700',
    color: COLORS.text,
  },
});
