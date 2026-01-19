import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardHeader from '../assets/images/cardheader.svg';
import LystraaLogo from '../assets/home/lystraaLogo.svg';
import SearchIcon from '../assets/home/search-icon.svg';
import BottomBar from '../components/BottomBar';

export default function MainHomeScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ===== GREEN HEADER (MATCH SEARCHSCREEN) ===== */}
      <View style={[styles.headerOuter, { width }]}>
        <CardHeader width={width} height={240} />

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <LystraaLogo width={110} height={38} />
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <SearchIcon width={20} height={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search to compare prices"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
          </View>
        </View>
      </View>

      {/* ===== WHITE CARD (NOW SAME AS SEARCHSCREEN) ===== */}
      <View style={[styles.content, { width }]}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 200 }}
        >
          <Text>This is HomeScreen</Text>
        </ScrollView>
      </View>

      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F7',
    width: '100%',
  },

  /* ===== HEADER (MATCHED WITH SEARCHSCREEN) ===== */
  headerOuter: {
    height: 240,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },

  logoContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 40 : 75,
    left: 20,
  },

  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 95 : 135,
    left: 10,
    right: 10,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  searchIcon: {
    marginRight: 20,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    padding: 0,
  },

  /* ===== WHITE CARD NOW SAME AS SEARCHSCREEN ===== */
  content: {
    backgroundColor: '#FFFFFF',
    marginTop: -45,          // same as search screen
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    overflow: 'hidden',
  },
});
