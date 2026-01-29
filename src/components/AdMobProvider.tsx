import React, { useEffect } from 'react';
import { useInterstitialAd } from '../utils/useInterstitialAd';
import mobileAds from 'react-native-google-mobile-ads';

interface AdMobProviderProps {
  children: React.ReactNode;
  enableAutoAds?: boolean;
}

/**
 * AdMobProvider component to initialize AdMob and manage ads
 * Wrap your app with this component to enable ads
 * 
 * @param enableAutoAds - Enable automatic ad display every 2 minutes (default: false)
 */
export const AdMobProvider: React.FC<AdMobProviderProps> = ({
  children,
  enableAutoAds = false,
}) => {
  const { startAutoAds, stopAutoAds } = useInterstitialAd();

  useEffect(() => {
    console.log('🚀 AdMobProvider: Starting initialization...');
    // Initialize AdMob
    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        console.log('✅ AdMob initialized successfully!', adapterStatuses);
      })
      .catch((error) => {
        console.error('❌ AdMob initialization error:', error);
      });

    // Configure AdMob settings
    mobileAds()
      .setRequestConfiguration({
        // Set max ad content rating
        maxAdContentRating: 'G',
        
        // Tag for child-directed treatment
        tagForChildDirectedTreatment: false,
        
        // Tag for under age of consent
        tagForUnderAgeOfConsent: false,
      })
      .then(() => {
        console.log('AdMob request configuration set');
      });
  }, []);

  useEffect(() => {
    console.log('📱 AdMobProvider: enableAutoAds =', enableAutoAds);
    if (enableAutoAds) {
      // Wait 2 seconds to ensure ad is loaded before starting timer
      const autoAdsTimer = setTimeout(() => {
        console.log('🚀 AdMobProvider: Starting auto ads...');
        startAutoAds();
      }, 2000);
      
      return () => {
        clearTimeout(autoAdsTimer);
        stopAutoAds();
      };
    } else {
      stopAutoAds();
    }
  }, [enableAutoAds]);

  return <>{children}</>;
};
