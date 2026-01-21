import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Lock from '../../assets/images/Lock.svg';
import LinearGradient from 'react-native-linear-gradient';

export default function ChangePasswordSuccess() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Header */}
                <View style={styles.headerOuter}>
                    <ResponsiveGreenHeader height={220} />
                </View>

                {/* WHITE CARD */}
                <View style={styles.content}>
                    <Lock width={245} height={301} />

                    <Text style={styles.successText}>
                        New Password set{"\n"}successfully
                    </Text>
                    <Text style={styles.descriptionText}>
                        Congratulations! Your password has been set successfully. Please proceed to the login screen to verify your account.
                    </Text>
                    <TouchableOpacity
                        style={styles.loginBtnWrapper}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <LinearGradient
                            colors={['#004225', '#4C7A66']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginText}>Log In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
    successText: {
        marginTop: 24,
        width: 353,
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 38.4,
        color: '#00140B',
    },
    loginBtnWrapper: {
        marginTop: 28,
        width: 353,
    },

    loginButton: {
        height: 43,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        lineHeight: 18,
    },

    descriptionText: {
        marginTop: 16,
        width: 353,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.2,
        color: '#666666',
    },

    headerOuter: {
        height: 180,
        overflow: 'hidden',
        marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight! : 0,
    },

    content: {
        backgroundColor: '#fff',
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        minHeight: 500,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },

    backButton: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight! + 60 : 90,
        left: 20,
    },

    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
});
