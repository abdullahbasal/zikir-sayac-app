import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import ZikirlerimScreen from './screens/ZikirlerimScreen';
import Toast from 'react-native-toast-message'; // Toast ekleyin
import CounterScreen from './screens/CounterScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Counter" component={CounterScreen} />
        <Stack.Screen name="Zikirlerim" component={ZikirlerimScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <Toast /> {/* Toast container'ını ekleyin */}
    </NavigationContainer>
  );
}
