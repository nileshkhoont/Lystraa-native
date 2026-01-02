import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MailSVG from '../../assets/onboarding/mail-icon.svg';
import LockSVG from '../../assets/onboarding/lock-icon.svg';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Enter your email to start shopping and get awesome deals today!
      </Text>

      <Text style={styles.label}>
        Email<Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
        <MailSVG height={20} width={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="rifqi.naufal@mail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <Text style={styles.label}>
        New Password<Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
        <LockSVG height={20} width={20} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.inputIcon}>{showPassword ? '🙈' : '👁️'}</Text>
        </Pressable>
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate('OldPasswordScreen' as never)}>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation?.navigate('Home' as never)}>
        <LinearGradient
          colors={['#004225', '#4C7A66']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
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
    alignSelf: 'flex-start',
    marginBottom: 18,
    marginTop: 2,
    fontSize: 13,
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
});

export default Login;
