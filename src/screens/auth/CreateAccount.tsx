import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MailSVG from '../../assets/onboarding/mail-icon.svg';
import LockSVG from '../../assets/onboarding/lock-icon.svg';
import UserSVG from '../../assets/onboarding/user-icon.svg';

const CreateAccount = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Fill in your details below to get started on a seamless shopping
          experience.
        </Text>

        <Text style={styles.label}>
          First Name<Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <UserSVG height={20} width={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <Text style={styles.label}>Last Name</Text>
        <View style={styles.inputContainer}>
          <UserSVG height={20} width={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <Text style={styles.label}>
          Email<Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <MailSVG height={20} width={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.label}>
          Password<Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.inputContainer}>
          <LockSVG height={20} width={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPasswordIcon}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.terms}>
          By clicking Create Account, you acknowledge you{'\n'} have read and
          agreed to our <Text style={styles.link}>Terms of Use</Text> and{'\n'}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity>
          <LinearGradient
            colors={['#004225', '#4C7A66']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
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
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00140B',
    marginBottom: 8,
    fontFamily: 'Manrope',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
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
    marginBottom: 18,
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
    fontFamily: 'Manrope',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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
});

export default CreateAccount;
