import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import LandingScreen from './LandingScreen';
import LandingScreen2 from './LandingScreen2';
import LandingScreen3 from './LandingScreen3';

const { width } = Dimensions.get('window');

export default function OnboardingPager({ navigation }: any) {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const screens = [
    LandingScreen,
    LandingScreen2,
    LandingScreen3,
  ];

  const goNext = () => {
    if (index < 2) {
      flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
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
