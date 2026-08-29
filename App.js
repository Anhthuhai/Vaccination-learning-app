import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import VaccineInfoScreen from './src/screens/VaccineInfoScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import QuizScreen from './src/screens/QuizScreen';
import CasesScreen from './src/screens/CasesScreen';
import SafetyScreen from './src/screens/SafetyScreen';
import ConsultScreen from './src/screens/ConsultScreen';
import DonateScreen from './src/screens/DonateScreen';
import { colors } from './src/theme';
import { LanguageProvider, useLanguage } from './src/i18n/LanguageContext';
import LanguageToggle from './src/components/LanguageToggle';

const Tab = createBottomTabNavigator();

// Icon dạng emoji cho từng tab (không cần thêm thư viện icon)
const TAB_ICON = {
  VaccineInfo: '💉',
  Schedule: '📅',
  Quiz: '📝',
  Cases: '🩺',
  Safety: '🛡️',
  Consult: '💬',
  Donate: '💝',
};

// Theme cho NavigationContainer
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

function TabBarIcon({ name, focused }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 19, opacity: focused ? 1 : 0.6 }}>
      {TAB_ICON[name]}
    </Text>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { t } = useLanguage();
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.onPrimary,
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
          headerRight: () => <LanguageToggle />,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textFaint,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 6,
            paddingTop: 4,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={route.name} focused={focused} />
          ),
        })}
      >
        <Tab.Screen name="VaccineInfo" component={VaccineInfoScreen} options={{ title: t('tab.vaccine') }} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: t('tab.schedule') }} />
        <Tab.Screen name="Quiz" component={QuizScreen} options={{ title: t('tab.quiz') }} />
        <Tab.Screen name="Cases" component={CasesScreen} options={{ title: t('tab.cases') }} />
        <Tab.Screen name="Safety" component={SafetyScreen} options={{ title: t('tab.safety') }} />
        <Tab.Screen name="Consult" component={ConsultScreen} options={{ title: t('tab.consult') }} />
        <Tab.Screen name="Donate" component={DonateScreen} options={{ title: t('tab.donate') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
