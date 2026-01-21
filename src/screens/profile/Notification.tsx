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
import IPhone from '../../assets/home/iphone17.svg';
import Jean from '../../assets/home/jean.svg';
import GooglePixel from '../../assets/home/google-pixel.svg';
import BottomBar from '../../components/BottomBar';

interface NotificationCardProps {
  Icon: React.FC<{ width: number; height: number }>;
  title: string;
  text: string;
}

export default function Notification() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* FIXED GREEN HEADER */}
      <View style={styles.headerOuter}>
        <ResponsiveGreenHeader height={220} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.backRow}>
            <Arrow width={22} height={22} />
            <Text style={styles.title}>Notification</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* SCROLLABLE WHITE CONTENT */}
      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, padding: 20 }}
        >
          <NotificationCard
            Icon={IPhone}
            title="Price Drop Alert!"
            text="iPhone 14 just dropped by ₹1,200. Check now."
          />

          <NotificationCard
            Icon={GooglePixel}
            title="Good news 🎉"
            text="The price of Sony WH-1000XM5 is down. Grab the deal!"
          />

          <NotificationCard
            Icon={GooglePixel}
            title="Now's the time!"
            text="Your tracked product is cheaper than yesterday."
          />

          <NotificationCard
            Icon={Jean}
            title="Price lock expiring ⏰"
            text="Your exclusive price access ends in 2 hours."
          />
        </ScrollView>
      </View>

      <BottomBar />
    </View>
  );
}

/* Notification Card Component */
const NotificationCard: React.FC<NotificationCardProps> = ({ Icon, title, text }) => (
  <View style={styles.card}>
    <View style={styles.imageBox}>
      <Icon width={60} height={60} />
    </View>
    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  headerOuter: {
    height: 180,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight! : 0,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight! + 60 : 90,
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

  content: {
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    overflow: 'hidden',
    elevation: 10,
  },

  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  imageBox: {
    width: 72,
    height: 72,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cardText: {
    flex: 1,
    justifyContent: 'center',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
