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

import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Arrow from '../../assets/images/Arrow1.svg';

export default function TermsConditionScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ================= GREEN HEADER ================= */}
      <View style={styles.headerOuter}>
        <ResponsiveGreenHeader height={220} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.backRow}>
            <Arrow width={22} height={22} />
            <Text style={styles.title}>Terms & Condition</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ================= WHITE CARD (SCROLLS) ================= */}
      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 160, // prevents bottom cut
          }}
        >
          <Text style={styles.introText}>
            Welcome to QuickMart! These Terms and Conditions ("Terms") govern your use of our
            e-commerce app. By accessing or using QuickMart, you agree to be bound by these Terms.
            Please read them carefully before proceeding.
          </Text>

          <Text style={styles.sectionTitle}>1. Account Registration:</Text>
          <Text style={styles.bullet}>- You must create an account to use certain features of QuickMart.</Text>
          <Text style={styles.bullet}>- You are responsible for providing accurate and up-to-date information.</Text>
          <Text style={styles.bullet}>- You must safeguard your account credentials.</Text>

          <Text style={styles.sectionTitle}>2. Product Information and Pricing:</Text>
          <Text style={styles.bullet}>- QuickMart strives to provide accurate product information.</Text>
          <Text style={styles.bullet}>- We reserve the right to modify prices without notice.</Text>
          <Text style={styles.bullet}>- Orders may be canceled for pricing errors.</Text>

          <Text style={styles.sectionTitle}>3. Order Placement and Fulfillment:</Text>
          <Text style={styles.bullet}>- You agree to purchase selected products at stated prices.</Text>
          <Text style={styles.bullet}>- We may cancel orders due to unavailability or fraud.</Text>
          <Text style={styles.bullet}>- Orders will be delivered in a reasonable time.</Text>
        </ScrollView>
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
});
