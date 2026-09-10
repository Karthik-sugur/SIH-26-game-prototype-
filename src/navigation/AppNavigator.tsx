import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/tokens';
import { UserRole } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

import { RoleHeader } from '../components/common/RoleHeader';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { PatientHomeScreen } from '../screens/patient/PatientHomeScreen';
import { KoriFlowScreen } from '../screens/kori/KoriFlowScreen';
import { PatientRemindersScreen } from '../screens/patient/PatientRemindersScreen';
import { PatientProfileScreen } from '../screens/patient/PatientProfileScreen';

import { CaregiverDashboardScreen } from '../screens/caregiver/CaregiverDashboardScreen';
import { PatientDetailScreen } from '../screens/caregiver/PatientDetailScreen';
import { CaregiverRemindersScreen } from '../screens/caregiver/CaregiverRemindersScreen';
import { EscalationAlertScreen } from '../screens/caregiver/EscalationAlertScreen';
import { MemoryProfileScreen } from '../screens/caregiver/MemoryProfileScreen';

const PatientTab = createBottomTabNavigator();
const CaregiverTab = createBottomTabNavigator();

export function PatientNavigator() {
  const { t } = useLanguage();

  return (
    <PatientTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <PatientTab.Screen
        name="PatientHome"
        options={{
          title: t('tabHome'),
          tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
        }}
      >
        {({ navigation }) => (
          <PatientHomeScreen
            onStartActivity={() => navigation.navigate('KoriFlow')}
            onViewReminders={() => navigation.navigate('PatientReminders')}
          />
        )}
      </PatientTab.Screen>

      <PatientTab.Screen
        name="KoriFlow"
        component={KoriFlowScreen}
        options={{
          title: t('tabKori'),
          tabBarIcon: ({ color }) => <Ionicons name="flower" size={26} color={color} />,
        }}
      />

      <PatientTab.Screen
        name="PatientReminders"
        component={PatientRemindersScreen}
        options={{
          title: t('tabCues'),
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={26} color={color} />,
        }}
      />

      <PatientTab.Screen
        name="PatientProfile"
        component={PatientProfileScreen}
        options={{
          title: t('tabProfile'),
          tabBarIcon: ({ color }) => <Ionicons name="person" size={26} color={color} />,
        }}
      />
    </PatientTab.Navigator>
  );
}

export function CaregiverNavigator() {
  const { t } = useLanguage();

  return (
    <CaregiverTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <CaregiverTab.Screen
        name="CaregiverDashboard"
        options={{
          title: t('tabDashboard'),
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
        }}
      >
        {({ navigation }) => (
          <CaregiverDashboardScreen
            onNavigateDetail={() => navigation.navigate('PatientDetail')}
            onNavigateEscalation={() => navigation.navigate('EscalationAlerts')}
          />
        )}
      </CaregiverTab.Screen>

      <CaregiverTab.Screen
        name="MemoryProfile"
        component={MemoryProfileScreen}
        options={{
          title: t('tabMemory'),
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
        }}
      />

      <CaregiverTab.Screen
        name="PatientDetail"
        component={PatientDetailScreen}
        options={{
          title: t('tabScores'),
          tabBarIcon: ({ color }) => <Ionicons name="analytics" size={24} color={color} />,
        }}
      />

      <CaregiverTab.Screen
        name="CaregiverReminders"
        component={CaregiverRemindersScreen}
        options={{
          title: t('tabReminders'),
          tabBarIcon: ({ color }) => <Ionicons name="alarm" size={24} color={color} />,
        }}
      />

      <CaregiverTab.Screen
        name="EscalationAlerts"
        component={EscalationAlertScreen}
        options={{
          title: t('tabAlerts'),
          tabBarIcon: ({ color }) => <Ionicons name="warning" size={24} color={color} />,
        }}
      />
    </CaregiverTab.Navigator>
  );
}

export function AppNavigator() {
  const [currentRole, setCurrentRole] = useState<UserRole>('none');

  if (currentRole === 'none') {
    return (
      <View style={styles.safeArea}>
        <RoleSelectionScreen onSelectRole={(role) => setCurrentRole(role)} />
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <RoleHeader currentRole={currentRole} onSwitchRole={(role) => setCurrentRole(role)} />
      <View style={styles.contentContainer}>
        <NavigationContainer>
          {currentRole === 'patient' ? <PatientNavigator /> : <CaregiverNavigator />}
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  tabBar: {
    minHeight: 68,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
});
