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
import Group6860 from '../../assets/images/6860.svg';
import Group6861 from '../../assets/images/6861.svg';
import Group6862 from '../../assets/images/6862.svg';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 40;   // 20px padding both sides
const CARD_HEIGHT = CARD_WIDTH * 0.345; // keeps Figma ratio

interface LandingScreenProps {
    goNext: () => void;
    index: number;
}

export default function ComparePricesScreen({ goNext, index }: LandingScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* cards */}
                <Group6860 width={CARD_WIDTH} height={CARD_HEIGHT} />
                <Group6861 width={CARD_WIDTH} height={CARD_HEIGHT} />
                <Group6862 width={CARD_WIDTH} height={CARD_HEIGHT} />

            </ScrollView>

            <View style={styles.bottomContainer}>
                <Text style={styles.heading}>Compare Prices.{'\n'}Buy Smarter.</Text>

                <DotIndicator count={3} activeIndex={index} />

                <GradientButton title="Next" onPress={goNext} />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    scrollContent: {
        paddingTop: 40,   // ⬅ was 20
        paddingHorizontal: 20,
    },

    cardWrapper: {
        marginBottom: 12,
        alignItems: 'center',
    },

    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'android' ? 20 : 30,
    },

    heading: {
        fontSize: 32,
        fontWeight: '700',
        color: '#00140B',
        lineHeight: 38,
    },

    subText: {
        marginTop: 12,
        fontSize: 14,
        color: '#667085',
        lineHeight: 20,
        maxWidth: width - 40,
    },
});
