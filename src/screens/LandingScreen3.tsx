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
import Frame86 from '../assets/images/Frame86.svg';
import Frame884 from '../assets/images/Frame884.svg';

export default function LandingScreen2({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.imageContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.notifyRow}>
                    <Text style={styles.notifyText}>Notify me</Text>

                    {/* Toggle */}
                    <View style={styles.toggle}>
                        <View style={styles.toggleDot} />
                    </View>
                </View>


                <View style={styles.priceCardWrap}>
                    <Frame884 width={353} height={153} />
                </View>

            </ScrollView>




            {/* Bottom text */}
            <View style={styles.bottomContainer}>
                <Text style={styles.heading}>
                    Never Miss a {"\n"}Price Drop
                </Text>

                <Text style={styles.subText}>
                    Track products and get notified when prices fall buy at the perfect time.
                </Text>

                <View style={styles.dots}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.activeDot]} />
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
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

    notifyText: {
        width: 83,
        height: 22,
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '400',   // Regular (not bold)
        color: '#00140B',
        textAlign: 'center',
        lineHeight: 22,
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

    priceCard: {
        width: 353,
        borderRadius: 12,
        borderWidth: 0.94,
        borderColor: '#3E6F5F',
        padding: 12,
        gap: 18,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 8,     // space from toggle
    },


    alertRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    alertTextWrap: {
        flex: 1,
    },

    alertTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    alertText: {
        fontSize: 13,
        color: '#EAF4EF',
        marginTop: 4,
        lineHeight: 18,
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },

    logoBlock: {
        marginBottom: 35,
        alignItems: 'center',
    },

    bottomCards: {
        marginBottom: 36,
        alignItems: 'center',
    },
    priceCardWrap: {
        width: '100%',
        alignItems: 'center',   // centers card on full screen
        marginTop: 12,         // space below Notify me
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
    notifyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,   // Figma spacing before card
    },



    toggle: {
        width: 60,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E6F0EC',   // light green like Figma
        justifyContent: 'center',
        paddingHorizontal: 4,
    },

    toggleDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#3E7C66',   // dark green dot
        alignSelf: 'flex-end',        // ON position (right)
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
