import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashLogoSvg from '../assets/splashLogosvg.svg';

const SplashScreen = () => {
  return (
    <LinearGradient colors={['#004225', '#4C7A66']} style={styles.container}>
      <SplashLogoSvg width="200" height="200" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'YourCustomFont',
    marginBottom: 120,
  },
  profileContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 4,
    elevation: 5,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  badge: {
    backgroundColor: '#1769aa',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -12,
    borderWidth: 3,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SplashScreen;
