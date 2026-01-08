import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import LandingScreen2 from '../screens/LandingScreen2';
import LandingScreen3 from '../screens/LandingScreen3';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccount from '../screens/auth/CreateAccount';
import HomeScreen from '../screens/HomeScreen';
import OldPasswordScreen from '../screens/auth/OldPasswordScreen';
import PrivacyPolicyScreen from '../screens/profile/PrivacyPolicyScreen';
import TermsConditionScreen from '../screens/profile/TermsConditionScreen';
import Notification from '../screens/profile/Notification';
import ChangePasswordScreen from '../screens/profile/ChangePassword';
import ChangePasswordSuccess from '../screens/profile/ChangePasswordSuccess';
import NeedHelp from '../screens/profile/NeedHelp';
const Stack = createStackNavigator();

const ScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Landing2" component={LandingScreen2} />
         <Stack.Screen name="Landing3" component={LandingScreen3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OldPasswordScreen" component={OldPasswordScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsCondition" component={TermsConditionScreen} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ChangePasswordSuccess" component={ChangePasswordSuccess} />
        <Stack.Screen name="NeedHelp" component={NeedHelp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;
