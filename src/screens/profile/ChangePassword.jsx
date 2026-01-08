import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Platform,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChangePasswordMutation } from '../../api/auth/authApi';

import CardHeader from '../../assets/images/cardheader.svg';
import Arrow from '../../assets/images/Arrow 1.svg';
import EyeOpen from '../../assets/onboarding/eyeopen.svg';
import EyeClose from '../../assets/onboarding/eyeclose.svg';
import Big from '../../assets/images/BIG.svg';
import Button from '../../assets/images/Button.svg';
import Icon1 from '../../assets/images/Icon1.svg';
import Icon2 from '../../assets/images/Icon2.svg';
import Icon4 from '../../assets/images/Icon4.svg';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleSaveChanges = async () => {
        // Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'New password must be at least 6 characters');
            return;
        }

        try {
            const result = await changePassword({
                oldPassword,
                newPassword,
                confirmNewPassword: confirmPassword,
            }).unwrap();

            // Success - navigate to success screen
            navigation.navigate('ChangePasswordSuccess');
        } catch (error) {
            // Error handling
            console.log('Change password error:', error);
            const errorMessage = error?.data?.message || error?.message || 'Failed to change password. Please try again.';
            Alert.alert('Error', errorMessage);
        }
    };

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
                    <CardHeader width={420} height={220} />

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backRow}>
                            <Arrow width={22} height={22} />
                            <Text style={styles.title}>Change Password</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* White Content */}
                <View style={styles.content}>
                    <Text style={styles.label}>
                        Old Password <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Old Password"
                            secureTextEntry={!showOldPassword}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowOldPassword(!showOldPassword)}
                        >
                            {showOldPassword ? (
                                <EyeOpen width={20} height={20} />
                            ) : (
                                <EyeClose width={20} height={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>
                        New Password <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter New Password"
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (
                                <EyeOpen width={20} height={20} />
                            ) : (
                                <EyeClose width={20} height={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>
                        Confirm New Password <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm New Password"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOpen width={20} height={20} />
                            ) : (
                                <EyeClose width={20} height={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
                        onPress={handleSaveChanges}
                        disabled={isLoading}
                    >
                        <Text style={styles.saveButtonText}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.tabs}>
                    <Icon1 width={55} height={55} />
                    <Icon2 width={55} height={55} />
                    <Big width={80} height={80} />
                    <Icon4 width={55} height={55} />
                    <Button width={55} height={55} />
                </View>
            </View>
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
        top: Platform.OS === 'android' ? StatusBar.currentHeight + 60 : 90,
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

    content: {
        backgroundColor: '#fff',
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
        marginTop: 16,
    },

    asterisk: {
        color: '#EF4444',
        fontSize: 16,
    },

    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingRight: 50,
        fontSize: 15,
        color: '#111827',
        backgroundColor: '#F9FAFB',
    },

    eyeIcon: {
        position: 'absolute',
        right: 16,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },

    saveButton: {
        backgroundColor: '#1E4D3A',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },

    saveButtonDisabled: {
        opacity: 0.6,
    },

    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    bottomBar: {
        position: 'absolute',
        bottom: 3,
        left: 5,
        right: 5,
        height: 96,
        backgroundColor: '#F8FAF9',
        borderRadius: 32,
        justifyContent: 'center',
        elevation: 20,
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 36,
        alignItems: 'center',
    },
});
