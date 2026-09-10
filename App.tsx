import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS } from './src/theme/tokens';

export default function App() {
  return (
    <LanguageProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <AppNavigator />
      </View>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
