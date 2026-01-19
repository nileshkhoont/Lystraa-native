import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashLogoSvg from '../assets/splashLogosvg.svg';

const SplashScreen = ({ navigation }: any) => {

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

    const timer = setTimeout(() => {
      navigation.replace('OnboardingPager');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#004225', '#4C7A66']}
      style={styles.container}
    >

      {/* TOP-LEFT CURVE */}
      <LinearGradient
        colors={['#0A5735', '#1E7A5A']}
        style={styles.topLeft}
      />

      {/* BOTTOM-RIGHT CURVE */}
      <LinearGradient
        colors={['#0A5735', '#1E7A5A']}
        style={styles.bottomRight}
      />

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
    top: -100,
    left: -100,
    width: 260,
    height: 260,
    borderRadius: 130,
  },

  bottomRight: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 260,
    height: 260,
    borderRadius: 130,
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
