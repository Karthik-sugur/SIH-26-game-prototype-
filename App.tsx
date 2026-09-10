import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { KoriSessionProvider } from './src/kori/engine/KoriSessionContext';
import { MemoryProfileProvider } from './src/kori/MemoryProfileContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS } from './src/theme/tokens';

export default function App() {
  return (
    <LanguageProvider>
      <MemoryProfileProvider>
        <KoriSessionProvider>
          <View style={styles.container}>
            <StatusBar style="dark" />
            <AppNavigator />
          </View>
        </KoriSessionProvider>
      </MemoryProfileProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
