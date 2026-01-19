import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MailSVG from '../../assets/onboarding/mail-icon.svg';
import LockSVG from '../../assets/onboarding/lock-icon.svg';
import Eyeop from '../../assets/onboarding/eyeop.svg';
import Eyeclo from '../../assets/onboarding/eyeclo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginMutation } from '../../api/auth/authApi';
import { validateEmail } from '../../utils/validation';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    setErrors({});

    const emailError = validateEmail(email);
    const passwordError =
      password.trim() === '' ? 'Please Enter The Password' : '';

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      const token = result.token || result.data?.token;
      const user = result.user || result.data?.user;

      if (token) {
        await AsyncStorage.setItem('token', token);
        if (user) await AsyncStorage.setItem('user', JSON.stringify(user));

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back! 🎉',
          position: 'top',
          topOffset: 15,        // 👈 IMPORTANT (controls vertical position)
          visibilityTime: 2000,
        });

        // ⬇️ WAIT for toast, then navigate
        setTimeout(() => {
          navigation.navigate('MainHome');
        }, 1000);   // same as toast time
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: err?.data?.message || 'Invalid credentials',
      });
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password)
      setErrors(prev => ({ ...prev, password: undefined }));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Enter Your Email To Start Shopping And Get Awesome Deals Today!
          </Text>

          {/* Email */}
          <Text style={styles.label}>
            Email<Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.inputContainer, errors.email && styles.inputError]}>
            <MailSVG width={20} height={20} />
            <TextInput
              style={styles.input}
              placeholder="you@email.com"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password */}
          <Text style={styles.label}>
            Password<Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.inputContainer, errors.password && styles.inputError]}>
            <LockSVG width={20} height={20} />

            <TextInput
              style={styles.input}
              placeholder="********"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
            />

            <Pressable
              onPress={() => setShowPassword(prev => !prev)}
              style={styles.eyeButton}
              hitSlop={10}
            >
              {showPassword ? (
                <Eyeop width={22} height={22} />
              ) : (
                <Eyeclo width={22} height={22} />
              )}
            </Pressable>
          </View>

          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPasswordLink}
          >
            <Text style={styles.forgotPasswordText}>
              Forgot your password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
            <LinearGradient
              colors={['#004225', '#4C7A66']}
              style={styles.loginButton}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginText}>Log In</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.registerRow}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.registerLink}> Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

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
    fontSize: 16,
    color: '#667085',
    marginVertical: 12,
  },
  label: {
    marginTop: 20,
    marginBottom: 6,
    fontSize: 14,
    color: '#00140B',
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
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginTop: 30,
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
  loginButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerLink: {
    color: '#004225',
    fontWeight: '600',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  forgotPasswordText: {
    color: '#004225',
    fontSize: 15,
    fontWeight: '600',
  },
  errorText: {
    color: '#d32f2f',
    marginTop: 4,
    fontSize: 12,
  },
  inputError: {
    borderColor: '#d32f2f',
  },
});
