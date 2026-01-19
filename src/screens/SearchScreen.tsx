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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardHeader from '../assets/images/cardheader.svg';
import Arrow from '../assets/images/Arrow 1.svg';
import BottomBar from '../components/BottomBar';

export default function SearchScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ================= GREEN HEADER ================= */}
      <View style={[styles.headerOuter, { width }]}>
        <CardHeader width={width} height={220} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.backRow}>
            <Arrow width={22} height={22} />
            <Text style={styles.title}>Search Screen</Text>
          </View>
        </TouchableOpacity>
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
});
