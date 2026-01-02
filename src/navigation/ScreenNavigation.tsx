import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccount from '../screens/auth/CreateAccount';
import HomeScreen from '../screens/HomeScreen';
import OldPasswordScreen from '../screens/auth/OldPasswordScreen';

const Stack = createStackNavigator();

const ScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OldPasswordScreen" component={OldPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;
