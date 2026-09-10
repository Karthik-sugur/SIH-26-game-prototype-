import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';

interface Props {
  title: string;
  onBack?: () => void;
  onToggleSound?: () => void;
  soundOn?: boolean;
}

export const KoriHeader: React.FC<Props> = ({
  title,
  onBack,
  onToggleSound,
  soundOn = true,
}) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.iconBtn}
        accessibilityLabel="Back"
        disabled={!onBack}
      >
        {onBack ? <Ionicons name="arrow-back" size={26} color={COLORS.text} /> : <View style={{ width: 26 }} />}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={onToggleSound}
        style={styles.iconBtn}
        accessibilityLabel="Toggle sound"
        disabled={!onToggleSound}
      >
        {onToggleSound ? (
          <Ionicons
            name={soundOn ? 'volume-high' : 'volume-mute'}
            size={26}
            color={COLORS.text}
          />
        ) : (
          <View style={{ width: 26 }} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  iconBtn: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.heading,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 1,
  },
});
