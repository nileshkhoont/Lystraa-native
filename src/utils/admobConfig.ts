/**
 * AdMob Configuration
 * Replace with your actual Ad Unit IDs from AdMob console
 */

export const ADMOB_CONFIG = {
  // Using Google Test Ad Unit IDs
  interstitial: {
    android: 'ca-app-pub-3940256099942544/1033173712', // Test Ad Unit ID
    ios: 'ca-app-pub-3940256099942544/4411468910', // Test Ad Unit ID
  },
};

// Ad display settings
export const AD_SETTINGS = {
  // Minimum interval between ads in milliseconds (1 minute)
  minIntervalBetweenAds: 1 * 60 * 1000,
  
  // Maximum retries if ad fails to load
  maxRetries: 3,
  
  // Delay before retrying to load ad (in milliseconds)
  retryDelay: 5000,
};
