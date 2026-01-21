import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import LandingScreen2 from '../screens/LandingScreen2';
import LandingScreen3 from '../screens/LandingScreen3';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccount from '../screens/auth/CreateAccount';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '../screens/profile/ProfileScreen';
import OldPasswordScreen from '../screens/auth/OldPasswordScreen';
import PrivacyPolicyScreen from '../screens/profile/PrivacyPolicyScreen';
import TermsConditionScreen from '../screens/profile/TermsConditionScreen';
import Notification from '../screens/profile/Notification';
import ChangePasswordScreen from '../screens/profile/ChangePassword';
import ChangePasswordSuccess from '../screens/profile/ChangePasswordSuccess';
import NeedHelp from '../screens/profile/NeedHelp';
import OnboardingPager from '../screens/OnboardingPager';
import SplashScreen from '../screens/SplashScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import RateUsScreen from '../screens/profile/RateUsScreen';
import MainHomeScreen from '../screens/MainHomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LikeScreen from '../screens/LikeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
const Stack = createStackNavigator();
import Toast from 'react-native-toast-message';

const ScreenNavigation = ({ initialRoute }: { initialRoute: string }) => {
  return (
    <NavigationContainer
      onStateChange={() => {
        // Prevent state persistence
      }}
    >
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: false,
        }}
      >

        {/* Splash → Onboarding → Login */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnboardingPager" component={OnboardingPager} />
        <Stack.Screen name="Landing" component={LandingScreen} />

        {/* These are now controlled by swipe pager */}
        <Stack.Screen name="Landing2" component={LandingScreen2} />
        <Stack.Screen name="Landing3" component={LandingScreen3} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OldPasswordScreen" component={OldPasswordScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsCondition" component={TermsConditionScreen} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ChangePasswordSuccess" component={ChangePasswordSuccess} />
        <Stack.Screen name="NeedHelp" component={NeedHelp} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="RateUs" component={RateUsScreen} />

        {/* Bottom Navigation Screens */}
        <Stack.Screen name="MainHome" component={MainHomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Like" component={LikeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
};


export default ScreenNavigation;
