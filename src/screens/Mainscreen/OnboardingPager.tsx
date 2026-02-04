import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GradientButton, DotIndicator } from '../../components/CommonComponents';
import Group6860 from '../../assets/images/6860.svg';
import Group6861 from '../../assets/images/6861.svg';
import Group6862 from '../../assets/images/6862.svg';
import A1 from '../../assets/images/a1.svg';
import A2 from '../../assets/images/a2.svg';
import Lystraa1 from '../../assets/images/lystraa1.svg';
import Frame884 from '../../assets/images/Frame884.svg';

const { width } = Dimensions.get('window');

interface OnboardingPagerProps {
  navigation: any;
}

export default function OnboardingPager({ navigation }: OnboardingPagerProps) {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState<number>(0);
  const [notifyEnabled, setNotifyEnabled] = useState(true);

  const onboardingData = [
    {
      id: '1',
      heading: 'Compare Prices.\nBuy Smarter.',
      subText: 'Find the best deals across platforms in seconds.Smart comparisons for smarter shopping decisions.',
      buttonText: 'Next',
    },
    {
      id: '2',
      heading: 'Unlock Exclusive\nDiscounted Prices',
      subText: 'Unlock extra savings for just ₹2.99 and access special partner prices.',
      buttonText: 'Next',
    },
    {
      id: '3',
      heading: 'Never Miss a\nPrice Drop',
      subText: 'Track products and get notified when prices fall buy at the perfect time.',
      buttonText: 'Get Started',
    },
  ];

  const goNext = async () => {
    if (index < 2) {
      flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Login');
    }
  };

  const skipToLogin = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('Login');
  };

  const renderContent = ({ item }: { item: typeof onboardingData[0] }) => {
    const CARD_WIDTH = width - 40;
    const CARD_HEIGHT = CARD_WIDTH * 0.345;
    const CARD_WIDTH_2 = width * 0.9;
    const CARD_HEIGHT_2 = CARD_WIDTH_2 * 0.4;
    const LOGO_WIDTH = width * 0.35;
    const LOGO_HEIGHT = LOGO_WIDTH * 0.35;
    const CARD_WIDTH_3 = width - 40;
    const CARD_HEIGHT_3 = CARD_WIDTH_3 * 0.5;

    return (
      <ScrollView
        style={styles.contentSlide}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen 1: Compare Prices */}
        {item.id === '1' && (
          <>
            <Group6860 width={CARD_WIDTH} height={CARD_HEIGHT} />
            <Group6861 width={CARD_WIDTH} height={CARD_HEIGHT} />
            <Group6862 width={CARD_WIDTH} height={CARD_HEIGHT} />
          </>
        )}

        {/* Screen 2: Unlock Exclusive Prices */}
        {item.id === '2' && (
          <>
            <View style={styles.topCards}>
              <A1 width={CARD_WIDTH_2} height={CARD_HEIGHT_2} />
            </View>
            <View style={styles.logoBlock}>
              <Lystraa1 width={LOGO_WIDTH} height={LOGO_HEIGHT} />
            </View>
            <View style={styles.bottomCards}>
              <A2 width={CARD_WIDTH_2} height={CARD_HEIGHT_2} />
            </View>
          </>
        )}

        {/* Screen 3: Never Miss a Price Drop */}
        {item.id === '3' && (
          <>
            <View style={styles.notifyRow}>
              <Text style={styles.notifyText}>Notify me</Text>
              <Switch
                value={notifyEnabled}
                onValueChange={setNotifyEnabled}
                trackColor={{ false: '#E0E0E0', true: '#004225' }}
                thumbColor={notifyEnabled ? '#FFFFFF' : '#F4F3F4'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
            <View style={styles.priceCardWrap}>
              <Frame884 width={CARD_WIDTH_3} height={CARD_HEIGHT_3} />
            </View>
          </>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Skip Button - Top Right */}
      {index < 2 && (
        <TouchableOpacity style={styles.skipButton} onPress={skipToLogin}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Sliding Content Area */}
      <View style={styles.contentContainer}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={(e) => {
            const i = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndex(i);
          }}
          renderItem={renderContent}
          scrollEnabled={true}
        />
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.fixedBottomContainer}>
        <Text style={styles.heading}>{onboardingData[index].heading}</Text>

        {onboardingData[index].subText ? (
          <Text style={styles.subText}>{onboardingData[index].subText}</Text>
        ) : null}

        <DotIndicator count={3} activeIndex={index} />

        <GradientButton
          title={onboardingData[index].buttonText}
          onPress={goNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    right: 20,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: '#667085',
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 60,
  },
  contentSlide: {
    width: width,
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topCards: {
    marginBottom: 24,
    alignItems: 'center',
  },
  logoBlock: {
    marginBottom: 24,
    alignItems: 'center',
  },
  bottomCards: {
    marginBottom: 20,
    alignItems: 'center',
  },
  notifyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: width - 40,
  },
  notifyText: {
    fontSize: 16,
    color: '#00140B',
    fontWeight: '500',
  },
  priceCardWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fixedBottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 20 : 30,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00140B',
    lineHeight: 38,
    marginBottom: 8,
  },
  subText: {
    marginTop: 4,
    fontSize: 14,
    color: '#667085',
    lineHeight: 20,
    marginBottom: 12,
  },
});
