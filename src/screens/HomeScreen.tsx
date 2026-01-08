import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CardHeader from '../assets/images/cardheader.svg';
import Arrow from '../assets/images/Arrow 1.svg';
import Profile from '../assets/images/Profile.svg';
import EditIcon from '../assets/images/editicon.svg';
import Frame from '../assets/images/Frame.svg';
import Frame123 from '../assets/images/Frame123.svg';
import Big from '../assets/images/BIG.svg';
import Button from '../assets/images/Button.svg';
import Icon1 from '../assets/images/Icon1.svg';
import Icon2 from '../assets/images/Icon2.svg';
import Icon4 from '../assets/images/Icon4.svg';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* GREEN HEADER */}
        <View style={styles.headerOuter}>
          <CardHeader width={420} height={220} />

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <View style={styles.backRow}>
              <Arrow width={22} height={22} />
              <Text style={styles.title}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* MAIN WHITE CARD */}
        <View style={styles.content}>

          {/* PROFILE ROW */}
          <View style={styles.profileContent}>
            <View style={styles.avatarWrapper}>
              <Profile width={48} height={48} />
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>Albert Stevano</Text>
                <Text style={styles.userEmail}>albertstevano@gmail.com</Text>
              </View>

              <TouchableOpacity style={styles.editIcon}>
                <EditIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* EMPTY WHITE SPACE BELOW (like Notification screen) */}
          {/* SETTINGS */}
          <View style={styles.settingsContainer}>

            <Text style={styles.sectionTitle}>General</Text>

            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Notification')}>
              <Text style={styles.rowText}>Notification</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={styles.rowText}>Change Password</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('TermsCondition')}>
              <Text style={styles.rowText}>Terms & Condition</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Help & Feedback</Text>

            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('NeedHelp')}>
              <Text style={styles.rowText}>Need Help?</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Text style={styles.rowText}>Privacy Policy</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <View style={styles.rateRow}>
                <Text style={styles.rowText}>Rate Us</Text>
                <Frame123 width={80} height={16} />
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.rowText}>Log Out</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteRow}>
              <Frame width={16} height={16} />
              <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.tabs}>
          <Icon1 width={55} height={55} />
          <Icon2 width={55} height={55} />
          <Big width={80} height={80} />
          <Icon4 width={55} height={55} />
          <Button width={55} height={55} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },

  /* HEADER */
  headerOuter: {
    height: 180,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 60 : 90,
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

  /* WHITE CARD */
  content: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 700,
  },

  /* PROFILE */
  profileContent: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    position: 'relative',
  },

  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 10,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 64,
  },

  profileInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00140B',
    top: -10
  },

  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    top: -15
  },

  editIcon: {
    padding: 6,
    top: -20
  },

  /* BOTTOM BAR */
  bottomBar: {
    position: 'absolute',
    bottom: 3,
    left: 5,
    right: 5,
    height: 96,
    backgroundColor: '#F8FAF9',
    borderRadius: 32,
    justifyContent: 'center',
    elevation: 20,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    alignItems: 'center',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00140B',
    marginBottom: 6,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6EAEA',
  },

  rowText: {
    fontSize: 15,
    color: '#4B5563',
  },

  arrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },

  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  deleteText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#EF4444',
  },

});
