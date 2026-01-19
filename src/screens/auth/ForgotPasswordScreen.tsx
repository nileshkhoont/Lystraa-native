import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MailSVG from '../../assets/onboarding/mail-icon.svg';
import LockSVG from '../../assets/onboarding/lock-icon.svg';
import Eyeopen from '../../assets/onboarding/eyeopen.svg';
import Eyeclose from '../../assets/onboarding/eyeclose.svg';
import { validateEmail, validatePassword } from '../../utils/validation';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Submit Email
  const handleSendCode = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('https://cusped-magen-unforwarded.ngrok-free.dev/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        Alert.alert('Success', 'Verification code sent to your email');
        setStep(2);
        setErrors({});
      } else {
        setErrors({ email: data.message || 'Failed to send code' });
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyCode = async () => {
    if (!code || code.length < 4) {
      setErrors({ code: 'Please enter valid verification code' });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('https://cusped-magen-unforwarded.ngrok-free.dev/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStep(3);
        setErrors({});
      } else {
        setErrors({ code: data.message || 'Invalid verification code' });
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setErrors({ newPassword: passwordError });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('https://cusped-magen-unforwarded.ngrok-free.dev/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await response.json();
      
      if (data.success) {
        Alert.alert('Success', 'Password reset successfully. Please login with your new password.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Failed to reset password');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && "Enter the verification code sent to your email"}
            {step === 3 && "Create a new password for your account"}
          </Text>

          {/* Step 1: Email Input */}
          {step === 1 && (
            <>
              <Text style={styles.label}>
                Email<Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <MailSVG width={20} height={20} />
                <TextInput
                  style={styles.input}
                  placeholder="you@email.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TouchableOpacity onPress={handleSendCode} disabled={isLoading}>
                <LinearGradient colors={['#004225', '#4C7A66']} style={styles.button}>
                  {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Code</Text>}
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}

          {/* Step 2: Code Verification */}
          {step === 2 && (
            <>
              <Text style={styles.label}>
                Verification Code<Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, errors.code && styles.inputError]}>
                <TextInput
                  style={[styles.input, { marginLeft: 0 }]}
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                    if (errors.code) setErrors({ ...errors, code: undefined });
                  }}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              {errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

              <TouchableOpacity onPress={handleVerifyCode} disabled={isLoading}>
                <LinearGradient colors={['#004225', '#4C7A66']} style={styles.button}>
                  {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify Code</Text>}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSendCode} style={styles.resendLink}>
                <Text style={styles.resendText}>Didn't receive code? Resend</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <Text style={styles.label}>
                New Password<Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, errors.newPassword && styles.inputError]}>
                <LockSVG width={20} height={20} />
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    if (errors.newPassword) setErrors({ ...errors, newPassword: undefined });
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? <Eyeopen width={22} height={22} /> : <Eyeclose width={22} height={22} />}
                </TouchableOpacity>
              </View>
              {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

              <Text style={styles.label}>
                Confirm Password<Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                <LockSVG width={20} height={20} />
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? <Eyeopen width={22} height={22} /> : <Eyeclose width={22} height={22} />}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

              <TouchableOpacity onPress={handleResetPassword} disabled={isLoading}>
                <LinearGradient colors={['#004225', '#4C7A66']} style={styles.button}>
                  {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backLink}>
            <Text style={styles.backText}>← Back to Login</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 80,
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00140B',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    color: '#00140B',
    marginTop: 20,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    paddingRight: 40,
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  backLink: {
    alignSelf: 'center',
    marginTop: 30,
  },
  backText: {
    color: '#004225',
    fontSize: 14,
    fontWeight: '600',
  },
  resendLink: {
    alignSelf: 'center',
    marginTop: 20,
  },
  resendText: {
    color: '#004225',
    fontSize: 14,
    fontWeight: '600',
  },
});
