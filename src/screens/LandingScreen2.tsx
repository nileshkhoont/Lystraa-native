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
import A1 from '../assets/images/a1.svg';
import A2 from '../assets/images/a2.svg';
import Lystraa1 from '../assets/images/lystraa1.svg';

export default function LandingScreen2({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.imageContainer} showsVerticalScrollIndicator={false}>

                {/* Top cards */}
                <View style={styles.topCards}>
                    <A1 width={353} height={122} />
                </View>

                {/* Lystraa logo */}
                <View style={styles.logoBlock}>
                    <Lystraa1 width={108} height={32} />
                </View>

                {/* Bottom discounted cards */}
                <View style={styles.bottomCards}>
                    <A2 width={353} height={122} />
                </View>

            </ScrollView>




            {/* Bottom text */}
            <View style={styles.bottomContainer}>
                <Text style={styles.heading}>
                    Unlock Exclusive Discounted Prices
                </Text>

                <Text style={styles.subText}>
                    Unlock extra savings for just ₹2.99 and access special partner prices.
                </Text>

                <View style={styles.dots}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Landing3')}>
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
        paddingTop: 80,   // Figma top space
    },


    cardWrapper: {
        width: 260,
        height: 108.5,
        backgroundColor: '#F8FAF9',
        borderRadius: 8.74,
        borderWidth: 0.73,
        borderColor: '#D3DED9',
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    bigGradientCard: {
        width: 336.2,
        height: 140.42,
        borderRadius: 11.32,
        marginBottom: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageOnly: {
        marginBottom: 8,   // Figma gap: 8px
        alignSelf: 'center',
    },
    topCards: {
        marginBottom: 40,
        alignItems: 'center',
    },

    logoBlock: {
        marginBottom: 35,
        alignItems: 'center',
    },

    bottomCards: {
        marginBottom: 36,
        alignItems: 'center',
    },


    figma6862: {
        width: 336.2,
        height: 140.42,
        borderRadius: 11.32,
        alignSelf: 'center',
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // important for rounded gradient
    },



    bottomContainer: {
        paddingTop: 0,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    heading: {
        fontSize: 32,
        fontFamily: 'Inter',
        fontWeight: '700',
        color: '#00140B',
        lineHeight: 38.4,
        letterSpacing: 0,
    },

    subText: {
        marginTop: 12,
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: '400',
        color: '#667085',
        lineHeight: 20,
        maxWidth: 353,
    },

    dots: {
        flexDirection: 'row',
        marginVertical: 18,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
        marginRight: 6,
    },
    figmaBadge: {
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: [{ translateX: -54 }], // 108 / 2
        width: 108,
        height: 32.15,
        borderRadius: 16,
        borderWidth: 0.16,
        borderColor: '#004225',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    figmaBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#004225',
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
