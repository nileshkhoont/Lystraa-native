import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useInterstitialAd } from '../utils/useInterstitialAd';

/**
 * Example screen demonstrating interstitial ad usage
 * This shows both manual and automatic ad display patterns
 */
export default function AdExampleScreen() {
  const {
    isAdLoaded,
    isAdShowing,
    showAd,
    startAutoAds,
    stopAutoAds,
  } = useInterstitialAd();

  const handleShowAdManually = async () => {
    const shown = await showAd();
    if (!shown) {
      console.log('Ad could not be shown at this time');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AdMob Interstitial Example</Text>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Ad Status:</Text>
          <Text style={[styles.statusText, isAdLoaded && styles.statusReady]}>
            {isAdLoaded ? '✓ Ready' : '⏳ Loading...'}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Showing:</Text>
          <Text style={styles.statusText}>
            {isAdShowing ? 'Yes' : 'No'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, !isAdLoaded && styles.buttonDisabled]}
            onPress={handleShowAdManually}
            disabled={!isAdLoaded || isAdShowing}>
            <Text style={styles.buttonText}>Show Ad Manually</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={startAutoAds}>
            <Text style={styles.buttonText}>Start Auto Ads (Every 2 min)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDanger]}
            onPress={stopAutoAds}>
            <Text style={styles.buttonText}>Stop Auto Ads</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Best Practices:</Text>
          <Text style={styles.infoText}>
            • Ads show maximum once every 2 minutes{'\n'}
            • Ads only display when app is active{'\n'}
            • Failed ads automatically retry{'\n'}
            • Respects user experience and AdMob policies
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00140B',
    marginBottom: 30,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00140B',
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#667085',
  },
  statusReady: {
    color: '#10B981',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  button: {
    backgroundColor: '#004225',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#0066CC',
  },
  buttonDanger: {
    backgroundColor: '#DC2626',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0066CC',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00140B',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#667085',
    lineHeight: 22,
  },
});
