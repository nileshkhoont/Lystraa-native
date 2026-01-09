import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MailSVG from '../../assets/onboarding/mail-icon.svg';
import LockSVG from '../../assets/onboarding/lock-icon.svg';
import { useLoginMutation } from '../../api/auth/authApi';
import { validateEmail } from '../../utils/validation';
import Eyeopen from '../../assets/onboarding/eyeopen.svg';
import Eyeclose from '../../assets/onboarding/eyeclose.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    // Clear previous errors
    setErrors({});

    // Validate fields
    const emailError = validateEmail(email);
    const passwordError = password.trim() === '' ? ' Password is required' : '';

    // Check if there are any errors
    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    // All validations passed, proceed with login
    try {
      const result = await login({ email, password }).unwrap();
      
      console.log('Login response:', result);
      
      // Backend returns token directly, not nested in data
      const token = result.token || result.data?.token;
      const user = result.user || result.data?.user;
      
      if (result.success && token) {
        // Store token in AsyncStorage
        await AsyncStorage.setItem('token', token);
        
        // Store user data if needed
        if (user) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
        }
        
        Alert.alert('Success', result.message || 'Login successful!');
        navigation?.navigate('Home' as never);
      } else {
        Alert.alert('Login Failed', 'No token received from server');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error?.data?.message || error?.message || 'Invalid email or password. Please try again.';
      Alert.alert('Login Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Enter Your Email To Start Shopping And Get Awesome Deals Today!
      </Text>

      <Text style={styles.label}>
        Email<Text style={styles.required}>*</Text>
      </Text>
      <View style={[styles.inputContainer, errors.email && styles.inputError]}>
        <MailSVG height={20} width={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="rifqi.naufal@mail.com"
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
          placeholder="********"
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

      <TouchableOpacity onPress={() => navigation.navigate('OldPasswordScreen' as never)}>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
        <LinearGradient
          colors={['#004225', '#4C7A66']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.loginButton, isLoading && styles.disabledButton]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation?.navigate('CreateAccount' as never)}
        >
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00140B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#1a3c2b',
    marginBottom: 4,
    marginTop: 16,
    fontWeight: '500',
  },
  required: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  inputIcon: {
    paddingHorizontal: 4,
    color: '#888',
    fontSize: 18,
    marginRight: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#00140B',
  },
  forgot: {
    color: '#004225',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,     // 120% of 16px ≈ 19px
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 18,
  },
  eyeButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },


  loginButton: {
    backgroundColor: '#295C3C',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    marginHorizontal: 8,
    color: '#888',
    fontWeight: 'bold',
    fontSize: 13,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    color: '#444',
    fontSize: 14,
  },
  registerLink: {
    color: '#004225',
    fontWeight: '500',
    fontSize: 14,
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
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default Login;
