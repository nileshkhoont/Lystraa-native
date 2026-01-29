import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashLogoSvg from '../../assets/onboarding/splashLogosvg.svg';
import Circle1 from '../../assets/onboarding/circle1.svg';
import Circle2 from '../../assets/onboarding/circle2.svg';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen = ({ navigation }: SplashScreenProps) => {

  const scaleAnim = useRef(new Animated.Value(0.6)).current; // start small

  useEffect(() => {

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const loginDate = await AsyncStorage.getItem('loginDate');
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

        // Check if user is logged in
        if (token && loginDate) {
          const loginTimestamp = parseInt(loginDate, 10);
          const currentTime = Date.now();
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

          // Check if session is still valid (within 7 days)
          if (currentTime - loginTimestamp < sevenDaysInMs) {
            // Session valid, go to Home
            setTimeout(() => {
              navigation.replace('MainHome');
            }, 1000);
            return;
          } else {
            // Session expired, clear storage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('loginDate');
          }
        }

        // Check if user has seen onboarding before
        if (hasSeenOnboarding === 'true') {
          // Go directly to Login
          setTimeout(() => {
            navigation.replace('Login');
          }, 1000);
        } else {
          // First time user, show onboarding
          setTimeout(() => {
            navigation.replace('OnboardingPager');
          }, 1000);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // On error, show onboarding
        setTimeout(() => {
          navigation.replace('OnboardingPager');
        }, 1000);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <LinearGradient
      colors={['#2D6F52', '#4C7A66']}
      style={styles.container}
    >

      {/* TOP-LEFT CURVE */}
      <View style={styles.topLeft}>
        <Circle1 width={300} height={300} />
      </View>

      {/* BOTTOM-RIGHT CURVE */}
      <View style={styles.bottomRight}>
        <Circle2 width={300} height={300} />
      </View>

      {/* 🔥 ONLY LOGO ANIMATION */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <SplashLogoSvg width={200} height={200} />
      </Animated.View>

      <Text style={styles.tagline}>
        Compare • Choose • Buy
      </Text>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topLeft: {
    position: 'absolute',
    top: -150,
    left: -150,
    overflow: 'hidden',
  },

  bottomRight: {
    position: 'absolute',
    bottom: -150,
    right: -150,
    overflow: 'hidden',
  },

  tagline: {
    marginTop: -60,
    marginBottom: 6,
    color: '#E8F3EE',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
});

export default SplashScreen;
