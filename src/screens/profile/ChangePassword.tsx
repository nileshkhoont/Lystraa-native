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
    KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Arrow from '../../assets/images/Arrow1.svg';
import EyeOpen from '../../assets/onboarding/eyeopen.svg';
import EyeClose from '../../assets/onboarding/eyeclose.svg';
import BottomBar from '../../components/BottomBar';
import { useChangePasswordMutation } from '../../api/auth/authApi';
import { validatePassword } from '../../utils/validation';

interface PasswordErrors {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword: React.FC = () => {
    const navigation = useNavigation<any>();

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [showOld, setShowOld] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    const [errors, setErrors] = useState<PasswordErrors>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    /* ---------------- VALIDATION ---------------- */

    const validateOld = (text: string): string => {
        if (!text) return 'Please Enter Old Password';
        return '';
    };

    const validateNew = (text: string): string => {
        const error = validatePassword(text);
        return error ?? '';
    };

    const validateConfirm = (text: string): string => {
        if (!text) return 'Please Confirm Password';
        if (text !== newPassword) return 'Passwords do not match';
        return '';
    };

    /* ---------------- LIVE HANDLERS ---------------- */

    const handleOldChange = (text: string): void => {
        setOldPassword(text);
        setErrors(prev => ({ ...prev, oldPassword: validateOld(text) }));
    };

    const handleNewChange = (text: string): void => {
        setNewPassword(text);
        const passwordError = validateNew(text);

        setErrors(prev => ({
            ...prev,
            newPassword: passwordError,
            confirmPassword: validateConfirm(confirmPassword),
        }));
    };

    const handleConfirmChange = (text: string): void => {
        setConfirmPassword(text);
        setErrors(prev => ({ ...prev, confirmPassword: validateConfirm(text) }));
    };

    /* ---------------- SUBMIT ---------------- */

    const handleSave = async (): Promise<void> => {
        const oldErr = validateOld(oldPassword);
        const newErr = validateNew(newPassword);
        const confirmErr = validateConfirm(confirmPassword);

        if (oldErr || newErr || confirmErr) {
            setErrors({
                oldPassword: oldErr,
                newPassword: newErr,
                confirmPassword: confirmErr,
            });
            return;
        }

        try {
            console.log('🔄 Attempting to change password...');
            console.log('📤 Request data:', { oldPassword: '***', newPassword: '***', confirmNewPassword: '***' });
            
            // Check if token exists
            const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
            const token = await AsyncStorage.getItem('token');
            console.log('🔑 Token exists:', !!token);
            if (token) {
                console.log('🔑 Token preview:', token.substring(0, 20) + '...');
            }
            
            const result = await changePassword({
                oldPassword,
                newPassword,
                confirmNewPassword: confirmPassword,
            }).unwrap();
            
            console.log('✅ Password changed successfully:', result);
            navigation.navigate('ChangePasswordSuccess');
        } catch (err: any) {
            console.error('❌ Change password error - Full error:', JSON.stringify(err, null, 2));
            console.error('❌ Error status:', err?.status);
            console.error('❌ Error data:', err?.data);
            console.error('❌ Error message:', err?.message);
            
            let errorMessage = 'Failed to change password.';
            
            if (err?.status === 'PARSING_ERROR') {
                errorMessage = 'Server response error. Please try again.';
                console.error('❌ PARSING ERROR - Server sent invalid response');
            } else if (err?.data?.message) {
                errorMessage = err.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }
            
            setErrors(prev => ({
                ...prev,
                oldPassword: errorMessage,
            }));
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
                    <View style={styles.headerOuter}>
                        <ResponsiveGreenHeader height={220} />
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <View style={styles.backRow}>
                                <Arrow width={22} height={22} />
                                <Text style={styles.title}>Change Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>

                        {/* Old Password */}
                        <Text style={styles.label}>
                            Old Password <Text style={styles.asterisk}>*</Text>
                        </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, errors.oldPassword && styles.errorBorder]}
                                secureTextEntry={!showOld}
                                value={oldPassword}
                                onChangeText={handleOldChange}
                                placeholder="Old password"
                                placeholderTextColor="#9CA3AF"
                            />
                            <TouchableOpacity onPress={() => setShowOld(!showOld)} style={styles.eyeIcon}>
                                {showOld ? <EyeOpen /> : <EyeClose />}
                            </TouchableOpacity>
                        </View>
                        {errors.oldPassword ? <Text style={styles.errorText}>{errors.oldPassword}</Text> : null}

                        {/* New Password */}
                        <Text style={styles.label}>
                            New Password <Text style={styles.asterisk}>*</Text>
                        </Text>


                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, errors.newPassword && styles.errorBorder]}
                                secureTextEntry={!showNew}
                                value={newPassword}
                                onChangeText={handleNewChange}
                                placeholder="New password"
                                placeholderTextColor="#9CA3AF"
                            />
                            <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeIcon}>
                                {showNew ? <EyeOpen /> : <EyeClose />}
                            </TouchableOpacity>
                        </View>
                        {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}

                        {/* Confirm */}
                        <Text style={styles.label}>
                            Confirm Password <Text style={styles.asterisk}>*</Text>
                        </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, errors.confirmPassword && styles.errorBorder]}
                                secureTextEntry={!showConfirm}
                                value={confirmPassword}
                                onChangeText={handleConfirmChange}
                                placeholder="Confirm password"
                                placeholderTextColor="#9CA3AF"
                            />
                            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
                                {showConfirm ? <EyeOpen /> : <EyeClose />}
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

                        <TouchableOpacity onPress={handleSave} disabled={isLoading} style={styles.saveButton}>
                            <Text style={styles.saveText}>{isLoading ? 'Saving...' : 'Save Changes'}</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    /* HEADER */
    headerOuter: {
        height: 180,
        overflow: 'hidden',
        marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight! : 0,
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

    asterisk: {
        color: '#EF4444',
        fontWeight: '700',
    },

    /* WHITE CARD */
    content: {
        backgroundColor: '#FFFFFF',
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        flex: 1,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginTop: 16,
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
        backgroundColor: '#F9FAFB',
        color: '#111827',
    },

    eyeIcon: {
        position: 'absolute',
        right: 16,
        height: 50,
        justifyContent: 'center',
    },

    errorBorder: {
        borderColor: '#EF4444',
    },

    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },

    saveButton: {
        backgroundColor: '#1E4D3A',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },

    saveText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ChangePassword;
