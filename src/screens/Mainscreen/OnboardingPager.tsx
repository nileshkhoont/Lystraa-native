import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingScreen from './LandingScreen';
import LandingScreen2 from './LandingScreen2';
import LandingScreen3 from './LandingScreen3';

const { width } = Dimensions.get('window');

interface OnboardingPagerProps {
  navigation: any;
}

export default function OnboardingPager({ navigation }: OnboardingPagerProps) {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState<number>(0);

  type ScreenComponent = React.ComponentType<{ goNext: () => void; index: number }>;

  const screens: ScreenComponent[] = [
    LandingScreen,
    LandingScreen2,
    LandingScreen3,
  ];

  const goNext = async () => {
    if (index < 2) {
      flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      // Mark onboarding as seen before going to Login
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Login');
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={screens}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, i) => i.toString()}
      onMomentumScrollEnd={(e) => {
        const i = Math.round(e.nativeEvent.contentOffset.x / width);
        setIndex(i);
      }}
      renderItem={({ item: Screen }) => (
        <View style={{ width }}>
          <Screen goNext={goNext} index={index} />
        </View>
      )}
    />
  );
}
