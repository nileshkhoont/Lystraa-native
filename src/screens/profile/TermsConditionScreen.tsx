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

import CardHeader from '../../assets/images/cardheader.svg';
import Arrow from '../../assets/images/Arrow 1.svg';

const { width } = Dimensions.get('window');

export default function TermsConditionScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* GREEN HEADER */}
        <View style={styles.headerOuter}>
          <CardHeader width={420} height={220} />

          {/* Back + Title */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backRow}>
              <Arrow width={24} height={24} />
              <Text style={styles.titleText}>Terms & Condition</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* WHITE CONTENT SECTION */}
        <View style={styles.contentSection}>
          <Text style={styles.introText}>
            Welcome to QuickMart! These Terms and Conditions ("Terms") govern your use of our e-commerce app. By accessing or using QuickMart, you agree to be bound by these Terms. Please read them carefully before proceeding.
          </Text>

          {/* 1. Account Registration */}
          <Text style={styles.sectionTitle}>1. Account Registration:</Text>
          
          <Text style={styles.bulletPoint}>
            - You must create an account to use certain features of QuickMart.
          </Text>

          <Text style={styles.bulletPoint}>
            - You are responsible for providing accurate and up-to-date information during the registration process.
          </Text>

          <Text style={styles.bulletPoint}>
            - You must safeguard your account credentials and notify us immediately of any unauthorized access or use of your account.
          </Text>

          {/* 2. Product Information and Pricing */}
          <Text style={styles.sectionTitle}>2. Product Information and Pricing:</Text>
          
          <Text style={styles.bulletPoint}>
            - QuickMart strives to provide accurate product descriptions, images, and pricing information.
          </Text>

          <Text style={styles.bulletPoint}>
            - We reserve the right to modify product details and prices without prior notice.
          </Text>

          <Text style={styles.bulletPoint}>
            - In the event of an error, we may cancel or refuse orders placed for incorrectly priced products.
          </Text>

          {/* 3. Order Placement and Fulfillment */}
          <Text style={styles.sectionTitle}>3. Order Placement and Fulfillment:</Text>
          
          <Text style={styles.bulletPoint}>
            - By placing an order on QuickMart, you agree to purchase the selected products at the stated prices.
          </Text>

          <Text style={styles.bulletPoint}>
            - We reserve the right to accept or reject any order, and we may cancel orders due to product unavailability, pricing errors, or suspected fraudulent activity.
          </Text>

          <Text style={styles.bulletPoint}>
            - Once an order is confirmed, we will make reasonable efforts to fulfill and deliver it in a timely manner.
          </Text>

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

  /* HEADER */
  headerOuter: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android'
      ? StatusBar.currentHeight + 60   // ⬅️ push title down
      : 90,
    left: 20,
    zIndex: 10,
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleText: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* CONTENT */
  contentSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  introText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },

  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 12,
    paddingLeft: 8,
  },

  boldText: {
    fontWeight: '600',
    color: '#111827',
  },

  footerText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
