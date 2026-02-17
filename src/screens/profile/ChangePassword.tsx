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
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Arrow from '../../assets/images/Arrow1.svg';
import EyeOpen from '../../assets/onboarding/eyeopen.svg';
import EyeClose from '../../assets/onboarding/eyeclose.svg';
import BottomBar from '../../components/BottomBar';
import { useChangePasswordMutation } from '../../api/auth/authApi';
import { validatePassword } from '../../utils/validation';
import Toast from 'react-native-toast-message';

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
        if (!text) return 'Please Enter New Password';
        if (text === oldPassword && oldPassword) return 'New password must be different from old password';
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
        // Validate old password
        const oldErr = validateOld(text);
        // If new password is already entered, check if it's different from old
        let newErr = errors.newPassword;
        if (newPassword) {
            if (newPassword === text && text) {
                newErr = 'New password must be different from old password';
            } else if (errors.newPassword === 'New password must be different from old password') {
                // Clear the error if passwords are now different
                newErr = validatePassword(newPassword) ?? '';
            }
        }
        
        setErrors(prev => ({ 
            ...prev, 
            oldPassword: oldErr,
            newPassword: newErr
        }));
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
            
            const result = await changePassword({
                oldPassword,
                newPassword,
                confirmNewPassword: confirmPassword,
            }).unwrap();
            
            console.log('✅ Password changed successfully:', result);
            
            Toast.show({
                type: 'success',
                text1: 'Password Changed',
                text2: 'Your password has been updated successfully',
                position: 'top',
                topOffset: 15,
                visibilityTime: 2000,
            });
            
            setTimeout(() => {
                navigation.navigate('ChangePasswordSuccess');
            }, 1000);
        } catch (err: any) {
            console.error('❌ Change password error:', err);
            
            let errorMessage = 'Failed to change password.';
            
            if (err?.status === 'TIMEOUT') {
                errorMessage = 'Request timed out. Please check your connection and try again.';
            } else if (err?.status === 'PARSING_ERROR') {
                errorMessage = 'Server response error. Please try again.';
            } else if (err?.data?.message) {
                errorMessage = err.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            }
            
            Toast.show({
                type: 'error',
                text1: 'Password Change Failed',
                text2: errorMessage,
                position: 'top',
                topOffset: 15,
                visibilityTime: 3000,
            });
            
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

                        <TouchableOpacity 
                            onPress={handleSave} 
                            disabled={isLoading} 
                            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
                        >
                            {isLoading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator color="#FFFFFF" size="small" />
                                    <Text style={[styles.saveText, { marginLeft: 8 }]}>Updating password...</Text>
                                </View>
                            ) : (
                                <Text style={styles.saveText}>Save Changes</Text>
                            )}
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

    saveButtonDisabled: {
        opacity: 0.6,
    },

    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ChangePassword;
