import { useEffect, useRef, useState } from 'react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { Platform, AppState } from 'react-native';
import { ADMOB_CONFIG, AD_SETTINGS } from './admobConfig';

/**
 * Custom hook to manage interstitial ads with best practices
 * - Respects AdMob policies
 * - Shows ads at appropriate intervals
 * - Handles ad loading and errors gracefully
 */
export const useInterstitialAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdShowing, setIsAdShowing] = useState(false);
  const [autoAdsEnabled, setAutoAdsEnabled] = useState(false);
  const interstitialRef = useRef<InterstitialAd | null>(null);
  const lastAdShownTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef<number>(0);
  const appStateRef = useRef(AppState.currentState);

  // Get the appropriate ad unit ID based on platform
  const adUnitId = Platform.select({
    android: ADMOB_CONFIG.interstitial.android,
    ios: ADMOB_CONFIG.interstitial.ios,
  }) as string;

  console.log('🔑 AdMob: Using Ad Unit ID:', adUnitId);

  // Initialize and load the ad
  const loadAd = () => {
    try {
      console.log('📥 AdMob: Loading ad...');
      if (!interstitialRef.current) {
        interstitialRef.current = InterstitialAd.createForAdRequest(adUnitId, {
          requestNonPersonalizedAdsOnly: false,
        });

        // Set up event listeners
        interstitialRef.current.addAdEventListener(
          AdEventType.LOADED,
          () => {
            console.log('✅ AdMob: Interstitial ad loaded successfully!');
            setIsAdLoaded(true);
            retryCountRef.current = 0; // Reset retry count on success
            
            // Show first ad immediately if auto-ads is enabled
            if (autoAdsEnabled && lastAdShownTimeRef.current === 0) {
              console.log('🎯 AdMob: First ad loaded, showing immediately...');
              setTimeout(() => showAd(), 500);
            }
          }
        );

        interstitialRef.current.addAdEventListener(
          AdEventType.ERROR,
          (error) => {
            console.error('❌ AdMob: Interstitial ad failed to load:', error);
            setIsAdLoaded(false);
            
            // Retry loading if under max retries
            if (retryCountRef.current < AD_SETTINGS.maxRetries) {
              retryCountRef.current++;
              console.log(`AdMob: Retrying (${retryCountRef.current}/${AD_SETTINGS.maxRetries})...`);
              setTimeout(() => {
                interstitialRef.current = null;
                loadAd();
              }, AD_SETTINGS.retryDelay);
            }
          }
        );

        interstitialRef.current.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            console.log('🔄 AdMob: Interstitial ad closed, loading next ad...');
            setIsAdShowing(false);
            setIsAdLoaded(false);
            lastAdShownTimeRef.current = Date.now();
            
            // Load a new ad for next time
            interstitialRef.current = null;
            loadAd();
          }
        );

        interstitialRef.current.addAdEventListener(
          AdEventType.OPENED,
          () => {
            console.log('📺 AdMob: Interstitial ad opened and showing!');
            setIsAdShowing(true);
          }
        );
      }

      // Load the ad
      console.log('⏳ AdMob: Calling load() on ad instance...');
      interstitialRef.current?.load();
    } catch (error) {
      console.error('❌ Error loading interstitial ad:', error);
    }
  };

  // Show the ad if loaded and interval has passed
  const showAd = async () => {
    try {
      const now = Date.now();
      const timeSinceLastAd = now - lastAdShownTimeRef.current;

      // Check if enough time has passed since last ad (skip check on first ad)
      if (lastAdShownTimeRef.current > 0 && timeSinceLastAd < AD_SETTINGS.minIntervalBetweenAds) {
        console.log(
          `⏰ AdMob: Not enough time passed. ${Math.ceil(
            (AD_SETTINGS.minIntervalBetweenAds - timeSinceLastAd) / 1000
          )} seconds remaining until next ad`
        );
        return false;
      }

      // Check if ad is loaded and not currently showing
      if (!interstitialRef.current) {
        console.log('⚠️ AdMob: Ad instance not created. Loading now...');
        loadAd();
        return false;
      }

      if (!isAdLoaded) {
        console.log('⚠️ AdMob: Ad not loaded yet. Please wait...');
        return false;
      }

      if (isAdShowing) {
        console.log('⚠️ AdMob: Ad is already showing');
        return false;
      }

      console.log('🎬 AdMob: Showing ad now...');
      await interstitialRef.current.show();
      return true;
    } catch (error) {
      console.error('❌ Error showing interstitial ad:', error);
      // Reset state and try to load a new ad
      setIsAdLoaded(false);
      setIsAdShowing(false);
      interstitialRef.current = null;
      loadAd();
      return false;
    }
  };

  // Set up automatic ad display every 1 minute (when app is active)
  const startAutoAds = () => {
    console.log('🔄 AdMob: Starting auto ads (every 1 minute)...');
    setAutoAdsEnabled(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      console.log('⏰ AdMob: Auto-ad timer triggered');
      // Only show ads when app is in foreground
      if (appStateRef.current === 'active') {
        console.log('🎬 AdMob: App is active, attempting to show ad...');
        showAd();
      } else {
        console.log('⏸️ AdMob: App not active, skipping ad');
      }
    }, AD_SETTINGS.minIntervalBetweenAds);
    
    console.log(`✅ AdMob: Auto ads enabled (interval: ${AD_SETTINGS.minIntervalBetweenAds / 1000}s)`);
  };

  const stopAutoAds = () => {
    console.log('🛑 AdMob: Stopping auto ads');
    setAutoAdsEnabled(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Initialize ad and handle app state changes
  useEffect(() => {
    // Wait a bit to ensure AdMob is initialized
    const initTimer = setTimeout(() => {
      console.log('🎯 AdMob Hook: Initializing ad loading...');
      loadAd();
    }, 1000);

    // Listen to app state changes
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appStateRef.current = nextAppState;
      
      if (nextAppState === 'active') {
        // App came to foreground, ensure ad is loaded
        if (!isAdLoaded && !interstitialRef.current) {
          loadAd();
        }
      }
    });

    return () => {
      subscription.remove();
      stopAutoAds();
      clearTimeout(initTimer);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    isAdLoaded,
    isAdShowing,
    showAd,
    loadAd,
    startAutoAds,
    stopAutoAds,
  };
};
