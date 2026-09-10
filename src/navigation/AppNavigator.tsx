import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, ACCESSIBILITY } from '../theme/tokens';
import { UserRole } from '../types';

import { RoleHeader } from '../components/common/RoleHeader';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { PatientHomeScreen } from '../screens/patient/PatientHomeScreen';
import { GameSessionScreen } from '../screens/patient/GameSessionScreen';
import { PatientRemindersScreen } from '../screens/patient/PatientRemindersScreen';
import { PatientProfileScreen } from '../screens/patient/PatientProfileScreen';

import { CaregiverDashboardScreen } from '../screens/caregiver/CaregiverDashboardScreen';
import { PatientDetailScreen } from '../screens/caregiver/PatientDetailScreen';
import { CaregiverRemindersScreen } from '../screens/caregiver/CaregiverRemindersScreen';
import { EscalationAlertScreen } from '../screens/caregiver/EscalationAlertScreen';

const PatientTab = createBottomTabNavigator();
const CaregiverTab = createBottomTabNavigator();

export function PatientNavigator({
  onNavigateGame,
  onNavigateReminders,
}: {
  onNavigateGame: () => void;
  onNavigateReminders: () => void;
}) {
  return (
    <PatientTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryGreen,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <PatientTab.Screen
        name="PatientHome"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      >
        {() => (
          <PatientHomeScreen
            onStartActivity={onNavigateGame}
            onViewReminders={onNavigateReminders}
          />
        )}
      </PatientTab.Screen>

      <PatientTab.Screen
        name="GameSession"
        component={GameSessionScreen}
        options={{
          title: 'Memory Activity',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={28} color={color} />
          ),
        }}
      />

      <PatientTab.Screen
        name="PatientReminders"
        component={PatientRemindersScreen}
        options={{
          title: 'Daily Cues',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={28} color={color} />
          ),
        }}
      />

      <PatientTab.Screen
        name="PatientProfile"
        component={PatientProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      />
    </PatientTab.Navigator>
  );
}

export function CaregiverNavigator({
  onNavigateDetail,
  onNavigateEscalation,
}: {
  onNavigateDetail: () => void;
  onNavigateEscalation: () => void;
}) {
  return (
    <CaregiverTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.skyBlue,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <CaregiverTab.Screen
        name="CaregiverDashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={24} color={color} />
          ),
        }}
      >
        {() => (
          <CaregiverDashboardScreen
            onNavigateDetail={onNavigateDetail}
            onNavigateEscalation={onNavigateEscalation}
          />
        )}
      </CaregiverTab.Screen>

      <CaregiverTab.Screen
        name="PatientDetail"
        component={PatientDetailScreen}
        options={{
          title: 'Cognitive Scores',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={24} color={color} />
          ),
        }}
      />

      <CaregiverTab.Screen
        name="CaregiverReminders"
        component={CaregiverRemindersScreen}
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm" size={24} color={color} />
          ),
        }}
      />

      <CaregiverTab.Screen
        name="EscalationAlerts"
        component={EscalationAlertScreen}
        options={{
          title: 'Escalations',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning" size={24} color={color} />
          ),
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
          {currentRole === 'patient' ? (
            <PatientNavigator
              onNavigateGame={() => {}}
              onNavigateReminders={() => {}}
            />
          ) : (
            <CaregiverNavigator
              onNavigateDetail={() => {}}
              onNavigateEscalation={() => {}}
            />
          )}
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
    backgroundColor: COLORS.bgLight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  tabBar: {
    minHeight: 64,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
});
