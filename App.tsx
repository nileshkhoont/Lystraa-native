import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNavigation from './src/navigation/ScreenNavigation';
import { store } from './src/app/store';
import Toast from 'react-native-toast-message';
import { AdMobProvider } from './src/components/AdMobProvider';
import { AdTestButton } from './src/components/AdTestButton';
import './svg.d.ts';

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndRoute = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const loginDate = await AsyncStorage.getItem('loginDate');

        // Check if user is logged in with valid session
        if (token && loginDate) {
          const loginTimestamp = parseInt(loginDate, 10);
          const currentTime = Date.now();
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

          // If session is valid (within 7 days), skip splash
          if (currentTime - loginTimestamp < sevenDaysInMs) {
            setInitialRoute('MainHome');
            RNBootSplash.hide({ fade: true });
            return;
          } else {
            // Session expired, clear storage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('loginDate');
          }
        }

        // Not logged in or session expired, show splash
        setInitialRoute('Splash');
        setTimeout(() => {
          RNBootSplash.hide({ fade: true });
        }, 1000);
      } catch (error) {
        console.error('Auth check error:', error);
        setInitialRoute('Splash');
        RNBootSplash.hide({ fade: true });
      }
    };

    checkAuthAndRoute();
  }, []);

  // Don't render navigation until we know the initial route
  if (!initialRoute) {
    return null;
  }

  return (
    <Provider store={store}>
      <AdMobProvider enableAutoAds={true}>
        <ScreenNavigation initialRoute={initialRoute} />
        <Toast />
      </AdMobProvider>
    </Provider>
  );
};

export default App;
