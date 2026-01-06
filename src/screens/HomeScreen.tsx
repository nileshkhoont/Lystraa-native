import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#004225', '#4C7A66']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>N</Text>
          </View>
          <Text style={styles.name}>Namra Shah</Text>
          <Text style={styles.email}>namra@gmail.com</Text>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <ProfileItem label="Phone" value="+91 98765 43210" />
          <ProfileItem label="City" value="Ahmedabad" />
          <ProfileItem label="Plan" value="Premium" highlight />
        </View>

        {/* Settings */}
        <View style={styles.card}>
          <SettingItem title="Edit Profile" />
          <SettingItem title="Change Password" />
          <SettingItem title="Notifications" />
          <SettingItem title="Privacy Policy" />
          <SettingItem title="Terms & Conditions" />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

const ProfileItem = ({ label, value, highlight }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, highlight && styles.highlight]}>
      {value}
    </Text>
  </View>
);

const SettingItem = ({ title }: any) => (
  <TouchableOpacity style={styles.settingRow}>
    <Text style={styles.settingText}>{title}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
  },

  header: {
    height: 110,
    justifyContent: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  content: {
    padding: 20,
  },

  avatarContainer: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 24,
  },

  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E6F0EC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#004225',
  },

  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#004225',
  },

  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#00140B',
  },

  email: {
    fontSize: 14,
    color: '#667085',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  label: {
    fontSize: 14,
    color: '#667085',
  },

  value: {
    fontSize: 14,
    color: '#00140B',
    fontWeight: '600',
  },

  highlight: {
    color: '#004225',
  },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#E5E7EB',
  },

  settingText: {
    fontSize: 15,
    color: '#00140B',
  },

  arrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },

  logoutBtn: {
    marginTop: 24,
    backgroundColor: '#FFECEC',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  logoutText: {
    color: '#D92D20',
    fontSize: 16,
    fontWeight: '600',
  },
});
