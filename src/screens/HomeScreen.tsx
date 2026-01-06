import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
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

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >


        {/* GREEN HEADER */}
        <View style={styles.headerOuter}>
          <CardHeader width={width} height={300} />

          {/* Back + Profile */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backRow}>
              <Arrow width={24} height={24} />
              <Text style={styles.profileText}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* WHITE PROFILE SECTION */}
        <View style={styles.profileContent}>

          {/* Floating Avatar */}
          <View style={styles.avatarWrapper}>
            <Profile width={48} height={48} />
          </View>

          {/* Row */}
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
        {/* SETTINGS LIST */}
        <View style={styles.settingsContainer}>

          {/* General */}
          <Text style={styles.sectionTitle}>General</Text>


          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Notification</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Change Password</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('TermsCondition')}
          >
            <Text style={styles.rowText}>Terms & Condition</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Help & Feedback */}
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Help & Feedback</Text>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Need Help?</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Text style={styles.rowText}>Privacy Policy</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.rateRow}>
              <Text style={styles.rowText}>Rate Us</Text>

              <View style={styles.starsContainer}>
                <Frame123 width={100} height={100} />

              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Log Out</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteRow}>
            <Frame width={16} height={16} />
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.bottomBar}>
          <View style={styles.bottomTabs}>
            <Icon1 width={60} height={60} />
            <Icon2 width={60} height={60} />


            <Big width={80} height={80} />


            <Icon4 width={60} height={60} />
            <Button width={60} height={60} />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 36,
  },

  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -36,                // floating like Figma

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 25,
  },


  /* HEADER */
  headerOuter: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  deleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  deleteText: {
    marginLeft: 8,          // space between icon and text
    fontSize: 16,
    fontWeight: '400',
    color: '#FF3B30',       // red like Figma
  },


  sectionTitle: {
    fontSize: 18,          // Figma: 18px
    fontWeight: '400',    // Inter Regular
    color: '#00140B',     // Figma color
    marginTop: 24,
    marginBottom: 12,
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
  bottomBar: {
    position: 'absolute',
    bottom: 3,                     // lifted from screen
    left: 5,
    right: 3,
    height: 96,
    backgroundColor: '#F8FAF9',
    borderRadius: 32,               // pill shape
    justifyContent: 'center',

    // Figma soft glow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 20,
  },





  delete: {
    color: '#EF4444',
    fontSize: 15,
  },
  listText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android'
      ? StatusBar.currentHeight + 100
      : 100,
    left: 20,
    zIndex: 10,
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileText: {
    marginLeft: 12,
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    height: 16,          // Figma height
    gap: 2,              // Figma spacing
  },


  /* PROFILE */
  profileContent: {
    backgroundColor: '#FFFFFF',
    paddingTop: 0,        // 🔥 remove top gap
    paddingBottom: 24,
    paddingHorizontal: 16,
    position: 'relative',
  },

  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    top: -24,
    left: 16,
    backgroundColor: '#FFFFFF',
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
    marginTop: -22,   // 🔥 pulls text up to match avatar
  },


  profileInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00140B',

  },


  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  editIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,   // small touch area
  },




  editText: {
    fontSize: 16,
    color: '#1E4D3A',
  },
});
