import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VaccineInfoScreen from './screens/VaccineInfoScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import QuizScreen from './screens/QuizScreen';
import CasesScreen from './screens/CasesScreen';
import SafetyScreen from './screens/SafetyScreen';
import ProfileScreen from './screens/ProfileScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="VaccineInfo" component={VaccineInfoScreen} options={{ title: 'Vaccine' }} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Lịch' }} />
        <Tab.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
        <Tab.Screen name="Cases" component={CasesScreen} options={{ title: 'Tình huống' }} />
        <Tab.Screen name="Safety" component={SafetyScreen} options={{ title: 'An toàn' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Hồ sơ' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
