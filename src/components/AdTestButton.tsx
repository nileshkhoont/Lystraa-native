import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useInterstitialAd } from '../utils/useInterstitialAd';

/**
 * Floating test button to manually trigger ads
 * Only visible in development mode
 */
export const AdTestButton = () => {
  const { showAd, isAdLoaded } = useInterstitialAd();

  if (!__DEV__) {
    return null; // Only show in development
  }

  const handlePress = async () => {
    console.log('🔘 Test Button: Attempting to show ad...');
    const shown = await showAd();
    if (shown) {
      console.log('✅ Test Button: Ad shown successfully');
    } else {
      console.log('❌ Test Button: Could not show ad');
    }
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={[styles.button, !isAdLoaded && styles.buttonDisabled]}
        onPress={handlePress}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>
          {isAdLoaded ? '📺 Show Ad' : '⏳ Loading...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 9999,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
