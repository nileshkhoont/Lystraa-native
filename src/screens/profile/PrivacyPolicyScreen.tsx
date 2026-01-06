import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CardHeader from '../../assets/images/cardheader.svg';
import Arrow from '../../assets/images/Arrow 1.svg';

const { width } = Dimensions.get('window');

export default function PrivacyPolicyScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* GREEN HEADER */}
                <View style={styles.headerOuter}>
                    <CardHeader width={500} height={290} />

                    {/* Back + Title */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <View style={styles.backRow}>
                            <Arrow width={24} height={24} />
                            <Text style={styles.titleText}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* WHITE CONTENT SECTION */}
                <View style={styles.contentSection}>
                    <Text style={styles.introText}>
                        At QuickMart, we are committed to protecting the privacy and security of our users' personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard the information obtained through our e-commerce platform. By using QuickMart, you consent to the practices described in this policy.
                    </Text>

                    {/* 1. Information Collection */}
                    <Text style={styles.sectionTitle}>1. Information Collection:</Text>

                    <Text style={styles.bulletPoint}>
                        - <Text style={styles.boldText}>Personal Information:</Text> We may collect personal information such as name, address, email, and phone number when you create an account, make a purchase, or interact with our services.
                    </Text>

                    <Text style={styles.bulletPoint}>
                        - <Text style={styles.boldText}>Transaction Details:</Text> We collect information related to your purchases, including order history, payment method, and shipping details.
                    </Text>

                    <Text style={styles.bulletPoint}>
                        - <Text style={styles.boldText}>Usage Data:</Text> We may collect data about how you interact with our app, such as browsing activity, search queries, and preferences.
                    </Text>

                    {/* 2. Information Use */}
                    <Text style={styles.sectionTitle}>2. Information Use:</Text>

                    <Text style={styles.bulletPoint}>
                        - <Text style={styles.boldText}>Provide Services:</Text> We use the collected information to process orders, deliver products, and provide customer support.
                    </Text>

                    <Text style={styles.bulletPoint}>
                        - <Text style={styles.boldText}>Personalization:</Text> We may use your information to personalize your shopping experience, recommend products, and display targeted advertisements.
                    </Text>

                    <Text style={styles.bulletPoint}>
                        - <Text style={styles.boldText}>Communication:</Text> We may use your contact information to send important updates, promotional offers, and newsletters. You can opt-out of these communications at any time.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8F7',
    },

    /* HEADER */
    headerOuter: {
        width: '100%',
        height: 180,
        overflow: 'hidden',
        marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
    },

    backButton: {
        position: 'absolute',
        top: Platform.OS === 'android'
            ? StatusBar.currentHeight + 60   // ⬅️ push title down
            : 90,
        left: 20,
        zIndex: 10,
    },


    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    titleText: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    /* CONTENT */
    contentSection: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },

    introText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#4B5563',
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginTop: 16,
        marginBottom: 12,
    },

    bulletPoint: {
        fontSize: 14,
        lineHeight: 22,
        color: '#4B5563',
        marginBottom: 12,
        paddingLeft: 8,
    },

    boldText: {
        fontWeight: '600',
        color: '#111827',
    },

    footerText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#4B5563',
        marginTop: 20,
        fontStyle: 'italic',
    },
});
