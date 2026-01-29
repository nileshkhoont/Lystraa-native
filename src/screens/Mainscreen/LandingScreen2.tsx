import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
} from 'react-native';
import { GradientButton, DotIndicator } from '../../components/CommonComponents';
import A1 from '../../assets/images/a1.svg';
import A2 from '../../assets/images/a2.svg';
import Lystraa1 from '../../assets/images/lystraa1.svg';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.4;
const LOGO_WIDTH = width * 0.35;
const LOGO_HEIGHT = LOGO_WIDTH * 0.35;

interface LandingScreen2Props {
  goNext: () => void;
  index: number;
}

export default function LandingScreen2({ goNext, index }: LandingScreen2Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.topCards}>
          <A1 width={CARD_WIDTH} height={CARD_HEIGHT} />
        </View>

        <View style={styles.logoBlock}>
          <Lystraa1 width={LOGO_WIDTH} height={LOGO_HEIGHT} />
        </View>

        <View style={styles.bottomCards}>
          <A2 width={CARD_WIDTH} height={CARD_HEIGHT} />
        </View>

      </ScrollView>

      <View style={styles.bottomContainer}>
        <Text style={styles.heading}>Unlock Exclusive{'\n'}Discounted Prices</Text>

        <Text style={styles.subText}>
          Unlock extra savings for just ₹2.99 and access special partner prices.
        </Text>

        <DotIndicator count={3} activeIndex={index} />

        <GradientButton title="Next" onPress={goNext} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 20 : 0,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    scrollContent: {
        paddingTop: 40,
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

    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'android' ? 20 : 30,
    },

    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#00140B',
        lineHeight: 34,
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
