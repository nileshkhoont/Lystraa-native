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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MailSVG from '../../assets/onboarding/mail-icon.svg';
import LockSVG from '../../assets/onboarding/lock-icon.svg';
import UserSVG from '../../assets/onboarding/user-icon.svg';
import { useRegisterMutation } from '../../api/auth/authApi';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from '../../utils/validation';
import Eyeopen from '../../assets/onboarding/eyeopen.svg';
import Eyeclose from '../../assets/onboarding/eyeclose.svg';

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
      console.log('Starting registration...');
      const result = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      console.log('Registration response:', result);

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
      console.error('Registration error:', error);
      const errorMessage = error?.data?.message || error?.message || 'Something went wrong. Please try again.';
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
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
            onChangeText={setFirstName}
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
            onChangeText={setLastName}
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
            onChangeText={setEmail}
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
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? (
              <Eyeopen width={20} height={20} />
            ) : (
              <Eyeclose width={20} height={20} />
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

          <TouchableOpacity onPress={() => navigation?.goBack()} style={{ marginLeft: 4}}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  showPasswordIcon: {
    paddingHorizontal: 4,
    color: '#888',
    fontSize: 18,
    fontFamily: 'Manrope',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 48,   // was 24 → increase for top spacing
    paddingBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00140B',
    marginBottom: 4,   // 🔽 was 2 → keep small clean gap
    fontFamily: 'Manrope',
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 2,     // 🔽 reduce gap from title
    marginBottom: 16, // keep breathing space before form
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