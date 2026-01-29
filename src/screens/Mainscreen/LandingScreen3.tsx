import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
    Switch,
} from 'react-native';
import { GradientButton, DotIndicator } from '../../components/CommonComponents';
import Frame884 from '../../assets/images/Frame884.svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 60; // Increased spacing on left and right
const CARD_HEIGHT = CARD_WIDTH * 0.5;

interface LandingScreen3Props {
    goNext: () => void;
    index: number;
}

export default function LandingScreen3({ goNext, index }: LandingScreen3Props) {
    const [notifyEnabled, setNotifyEnabled] = useState(true);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Notify me toggle */}
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

                {/* Notification Cards */}
                <View style={styles.priceCardWrap}>
                    <Frame884 width={CARD_WIDTH} height={CARD_HEIGHT} />
                </View>

            </ScrollView>

            <View style={styles.bottomContainer}>
                <Text style={styles.heading}>Never Miss a{'\n'}Price Drop</Text>

                <Text style={styles.subText}>
                    Track products and get notified when prices fall buy at the perfect time.
                </Text>

                <DotIndicator count={3} activeIndex={index} />

                <GradientButton title="Get Started" onPress={goNext} />
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
        paddingTop: 20,
        paddingHorizontal: 20,
    },

    notifyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    notifyText: {
        fontSize: 16,
        color: '#00140B',
        fontWeight: '500',
    },

    priceCardWrap: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 0,
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
