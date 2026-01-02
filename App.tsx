import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import SplashScreen from './src/screens/SplashScreen';
import ScreenNavigation from './src/navigation/ScreenNavigation';
import './svg.d.ts';
const fetchInitialData = async () => {
  return new Promise<void>(resolve => setTimeout(() => resolve(), 5000));
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      await fetchInitialData();
      await RNBootSplash.hide({ fade: true });
      setIsLoading(false);
    };
    initApp();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SplashScreen />
      </View>
    );
  }
  return <ScreenNavigation />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
