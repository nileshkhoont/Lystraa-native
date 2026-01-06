import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Group6860 from '../assets/images/6860.svg';
import Group6861 from '../assets/images/6861.svg';
import Group6862 from '../assets/images/6862.svg';


export default function ComparePricesScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.imageContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.cardWrapper}>
                    <Group6860 width={353} height={122} />
                </View>

                <View style={styles.cardWrapper}>
                    <Group6861 width={353} height={122} />
                </View>

                <View style={styles.cardWrapper}>
                    <Group6862 width={353} height={122} />
                </View>

            

            </ScrollView>

            {/* Bottom text */}
            <View style={styles.bottomContainer}>
                <Text style={styles.heading}>
                    Compare Prices.{"\n"}Buy Smarter.
                </Text>


                <Text style={styles.subText}>
                    See prices from multiple platforms in one place and choose the best
                    deal in seconds.
                </Text>

                <View style={styles.dots}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Landing2')}>
                    <LinearGradient
                        colors={['#004225', '#4C7A66']}
                        style={styles.button}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    imageContainer: {
        paddingHorizontal: 18,
        marginTop: 20,
        maxHeight: 400,
    },

    cardWrapper: {
        width: 353,
        height: 122,
        opacity: 1,
        marginBottom: 8,   // gap: 8px
        justifyContent: 'center',
        alignItems: 'center',
    },


    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 30,
    },

    heading: {
        fontSize: 32,            // Figma: 32px
        fontFamily: 'Inter',
        fontWeight: '700',       // Bold
        color: '#00140B',        // Figma color
        lineHeight: 38.4,        // 120% of 32
        letterSpacing: 0,
    },

    subText: {
        marginTop: 12,
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: '400',
        color: '#667085',        // Figma-style muted text
        lineHeight: 20,
        maxWidth: 353,
    },


    dots: {
        flexDirection: 'row',
        marginVertical: 18,
        alignSelf: 'center',        // container center
        justifyContent: 'center',  // dots center
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
        marginRight: 6,
    },

    activeDot: {
        backgroundColor: '#004225',
    },

    button: {
        width: 353,
        height: 43,
        borderRadius: 12,
        paddingTop: 12,
        paddingRight: 18,
        paddingBottom: 12,
        paddingLeft: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
