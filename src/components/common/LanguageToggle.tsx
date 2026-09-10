import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/tokens';
import { useLanguage } from '../../i18n/LanguageContext';
import { Language } from '../../i18n/translations';

/** Compact EN / অসমীয়া language switcher */
export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const Option = ({ code, label }: { code: Language; label: string }) => {
    const active = language === code;
    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={code === 'en' ? t('englishFull') : t('assameseFull')}
        activeOpacity={0.85}
        onPress={() => setLanguage(code)}
        style={[styles.option, active ? styles.optionActive : styles.optionInactive]}
      >
        <Text style={[styles.optionText, active ? styles.optionTextActive : styles.optionTextInactive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrap} accessibilityLabel={t('language')}>
      <Option code="en" label={t('english')} />
      <Option code="as" label={t('assamese')} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 999,
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  option: {
    minHeight: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  optionActive: {
    backgroundColor: COLORS.primary,
  },
  optionInactive: {
    backgroundColor: 'transparent',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  optionTextActive: {
    color: COLORS.textOnPrimary,
  },
  optionTextInactive: {
    color: COLORS.textSecondary,
  },
});
