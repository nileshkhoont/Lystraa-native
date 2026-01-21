import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MailSVG from '../../assets/onboarding/mail-icon.svg';
import LockSVG from '../../assets/onboarding/lock-icon.svg';
import UserSVG from '../../assets/onboarding/user-icon.svg';
import { useRegisterMutation } from '../../api/auth/authApi';
import { KeyboardAvoidingView, Platform } from 'react-native';

import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from '../../utils/validation';
import Eyeop from '../../assets/onboarding/eyeop.svg';
import Eyeclo from '../../assets/onboarding/eyeclo.svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CreateAccount = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  const [register, { isLoading }] = useRegisterMutation();

  const handleCreateAccount = async () => {
    // Clear previous errors
    setErrors({});

    // Validate all fields
    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Check if there are any errors
    if (firstNameError || lastNameError || emailError || passwordError) {
      setErrors({
        firstName: firstNameError || undefined,
        lastName: lastNameError || undefined,
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    // All validations passed, proceed with registration
    try {
      console.log('🔄 Starting registration...');
      console.log('📤 Registration data:', { firstName, lastName, email, password: '***' });
      
      const result = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      console.log('✅ Registration response:', result);

      if (result.success) {
        Alert.alert(
          'Success!',
          'Your account has been created successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation?.navigate('Login'),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error('❌ Registration error - Full:', JSON.stringify(error, null, 2));
      console.error('❌ Error status:', error?.status);
      console.error('❌ Error data:', error?.data);
      console.error('❌ Error message:', error?.message);
      
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error?.status === 'PARSING_ERROR') {
        errorMessage = 'Server communication error. Please check your connection.';
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    const error = validateFirstName(text);
    setErrors(prev => ({ ...prev, firstName: error || undefined }));
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
    const error = validateLastName(text);
    setErrors(prev => ({ ...prev, lastName: error || undefined }));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    const error = validateEmail(text);
    setErrors(prev => ({ ...prev, email: error || undefined }));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    const error = validatePassword(text);
    setErrors(prev => ({ ...prev, password: error || undefined }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: '#fff' }}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill In Your Details Below To Get Started On A Seamless Shopping
              experience.
            </Text>

            <Text style={styles.label}>
              First Name<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
              <UserSVG height={20} width={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={handleFirstNameChange}
              />
            </View>
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <Text style={styles.label}>Last Name</Text>
            <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
              <UserSVG height={20} width={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={handleLastNameChange}
              />
            </View>
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <Text style={styles.label}>
              Email<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
              <MailSVG height={20} width={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>
              Password<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
              <LockSVG height={20} width={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}

                secureTextEntry={!showPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <Eyeop width={20} height={20} />
                ) : (
                  <Eyeclo width={20} height={20} />
                )}
              </Pressable>

            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Text style={styles.terms}>
              By clicking Create Account, you acknowledge you{'\n'} have read and
              agreed to our <Text style={styles.link}>Terms of Use</Text> and{'\n'}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>

            <TouchableOpacity onPress={handleCreateAccount} disabled={isLoading}>
              <LinearGradient
                colors={['#004225', '#4C7A66']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={[styles.createButton, isLoading && styles.disabledButton]}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.createButtonText}>Create Account</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>

              <TouchableOpacity onPress={() => navigation?.goBack()} style={{ marginLeft: 4 }}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  showPasswordIcon: {
    paddingHorizontal: 4,
    color: '#888',
    fontSize: 18,
    fontFamily: 'Manrope',
  },
  scrollContent: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00140B',
    marginBottom: 4,
    fontFamily: 'Manrope',
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 2,
    marginBottom: 16,
    fontFamily: 'Manrope',
  },

  label: {
    fontSize: 14,
    color: '#00140B',
    marginBottom: 4,
    marginTop: 16,
    fontWeight: '500',
    fontFamily: 'Manrope',
  },
  required: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontFamily: 'Manrope',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Manrope',
  },
  terms: {
    fontSize: 14,
    color: '#666666',
    marginTop: 12,
    marginBottom: 16,
    lineHeight: 18,
    fontFamily: 'Manrope',
  },
  link: {
    color: '#004225',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Manrope',
  },
  createButton: {
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Manrope',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  eyeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    marginHorizontal: 8,
    color: '#888',
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'Manrope',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  loginText: {
    color: '#444',
    fontSize: 14,
    fontFamily: 'Manrope',
  },
  loginLink: {
    color: '#004225',
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Manrope',
  },
  inputError: {
    borderColor: '#d32f2f',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 4,
    marginLeft: 4,
    fontFamily: 'Manrope',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default CreateAccount;