import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VaccineInfoScreen from './src/screens/VaccineInfoScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import QuizScreen from './src/screens/QuizScreen';
import CasesScreen from './src/screens/CasesScreen';
import SafetyScreen from './src/screens/SafetyScreen';
import ConsultScreen from './src/screens/ConsultScreen';

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
        <Tab.Screen name="Consult" component={ConsultScreen} options={{ title: 'Tư vấn' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
