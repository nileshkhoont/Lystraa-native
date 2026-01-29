import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Arrow from '../../assets/images/Arrow1.svg';
import BottomBar from '../../components/BottomBar';
import SearchIcon from '../../assets/home/searchfield.svg';
const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ================= GREEN HEADER ================= */}
      <View style={[styles.headerOuter, { width }]}>
        <ResponsiveGreenHeader height={220} />
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

      {/* ================= WHITE CARD ================= */}
      <View style={[styles.content, { width }]}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 160 }}
        >
          <Text>This is SearchScreen</Text>
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

  /* HEADER */
  headerOuter: {
    height: 180,
    overflow: 'hidden',
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 60 : 90,
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
    color: '#FFFFFF',
  },

  /* WHITE CARD */
  content: {
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    overflow: 'hidden',
  },

  /* TEXT */
  introText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 10,
  },

  bullet: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 10,
  },

  bold: {
    fontWeight: '600',
    color: '#111827',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
  },

  searchIcon: {
    marginRight: 15,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    padding: 0,

  },

  searchContainer: {
    position: 'absolute',
    top: 90,        // 🔥 fixed straight position
    left: 16,
    right: 16,
  },

});

export default SearchScreen;
