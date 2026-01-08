import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CardHeader from '../../assets/images/cardheader.svg';
import Arrow from '../../assets/images/Arrow 1.svg';
import Email from '../../assets/images/Email.svg';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native';



export default function NeedHelp() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {/* GREEN HEADER */}
                <View style={styles.headerOuter}>
                    <CardHeader width={420} height={220} />

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backRow}>
                            <Arrow width={22} height={22} />
                            <Text style={styles.title}>Need Help?</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* WHITE CONTENT */}
                <View style={styles.content}>
                    <Text style={styles.helpTitle}>How can we help you?</Text>
                    <Text style={styles.topicText}>Topic</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter topic"
                        placeholderTextColor="#9CA3AF"
                    />

                    <TextInput
                        style={styles.messageBox}
                        placeholder="Write your message..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                    />

                    <Text style={styles.emailLabel}>
                        Email <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <View style={styles.emailBox}>
                        <View style={styles.iconBox}>
                            <Email width={20} height={16} />
                        </View>

                        <TextInput
                            style={styles.emailText}
                            placeholder="Enter your email"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.emailHint}>
                        Your Email Address will be used solely for feedback to your query.
                    </Text>

                    <TouchableOpacity activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#004225', '#4C7A66']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.sendBtn}
                        >
                            <Text style={styles.sendText}>Send</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                    <Text style={styles.supportText}>
                        Alternatively, you can also contact us by email at{' '}
                        <Text style={styles.supportEmail}>lystraa@support.com</Text>
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

    headerOuter: {
        height: 180,
        overflow: 'hidden',
        marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
    },

    backButton: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight + 75 : 100, // pushed down
        left: 20,
    },

    emailBox: {
        width: 353,
        height: 40,                 // Figma hug height
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',      // Figma border
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,      // left & right
        paddingVertical: 8,         // top & bottom
        backgroundColor: '#FFFFFF',
    },
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    content: {
        backgroundColor: '#FFFFFF',
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        minHeight: 600,
    },

    helpTitle: {
        width: 353,
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 38.4, // 120%
        color: '#00140B',
        textAlign: 'center',

    },

    topicText: {
        marginTop: 24,
        width: 353,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.2,
        color: '#00140B',
    },

    iconBox: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    inputBox: {
        width: 353,
        height: 36,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        color: '#111827',   // 🔥 ADD THIS
    },

    messageBox: {
        width: 353,
        height: 250,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        padding: 12,
        color: '#111827',   // 🔥 ADD THIS
    },

    emailLabel: {
        marginTop: 24,
        width: 353,
        fontSize: 16,
        fontWeight: '500',
        color: '#00140B',
    },

    asterisk: {
        color: '#EF4444',
    },

    emailLabel: {
        marginTop: 24,
        width: 353,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.2,
        color: '#00140B',
    },

    emailText: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        paddingVertical: 0,     // prevents Android clipping
    },


    emailSvg: {
        marginRight: 16,   // Figma gap
    },
    emailHint: {
        width: 353,
        marginTop: 8,
        fontSize: 12,           // Figma
        fontWeight: '400',
        lineHeight: 14.4,      // 120% of 12
        color: '#666666',      // Figma gray
    },

    sendBtn: {
        width: 353,
        height: 43,          // Figma hug height
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },

    sendText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    supportText: {
        width: 353,
        marginTop: 16,
        fontSize: 12,        // Figma
        fontWeight: '400',
        lineHeight: 14.4,   // 120%
        color: '#666666',
        textAlign: 'left', // Figma is left-aligned
    },

    supportEmail: {
        color: '#004225',  // Figma green
        fontWeight: '400',
    },

});
