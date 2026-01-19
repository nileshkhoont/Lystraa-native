import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import ScreenNavigation from './src/navigation/ScreenNavigation';
import { store } from './src/app/store';
import Toast from 'react-native-toast-message';   
import './svg.d.ts';

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <ScreenNavigation />
      <Toast />   
    </Provider>
  );
};

export default App;
