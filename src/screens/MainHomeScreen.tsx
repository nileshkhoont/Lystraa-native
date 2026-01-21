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
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../components/CommonComponents';
import LystraaLogo from '../assets/home/lystraaLogo.svg';
import SearchIcon from '../assets/home/searchfield.svg';
import ImageHome from '../assets/home/imagehome.svg';
import BottomBar from '../components/BottomBar';
import IPhone17 from '../assets/home/iphone17.svg';
import IPhone17Pro from '../assets/home/iphone17-pro.svg';
import GooglePixel from '../assets/home/google-pixel.svg';
import Jean from '../assets/home/jean.svg';

// Product data type
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageComponent: any;
  brandComponent: any;
  badge?: string;
}

// Static product data
const SMART_DEALS: Product[] = [
  {
    id: '1',
    name: 'iPhone 17 Pro',
    description: '512 GB: 15...',
    price: '₹1,00,159',
    imageComponent: IPhone17Pro,
    brandComponent: IPhone17Pro,
    badge: 'Lowest Price',
  },
  {
    id: '2',
    name: "LEVI'S",
    description: '505 Men Straight...',
    price: '₹3,159',
    imageComponent: Jean,
    brandComponent: Jean,
    badge: 'Lowest Price',
  },
];

const RECENTLY_VIEWED: Product[] = [
  {
    id: '3',
    name: 'Google Pixel',
    description: 'Cobalt blue...',
    price: '₹45,999',
    imageComponent: GooglePixel,
    brandComponent: GooglePixel,
  },
  {
    id: '4',
    name: 'iPhone 17',
    description: '512 GB: 15...',
    price: '₹89,999',
    imageComponent: IPhone17,
    brandComponent: IPhone17,
  },
  {
    id: '5',
    name: 'iPhone 17 Pro',
    description: '256 GB: 15...',
    price: '₹95,159',
    imageComponent: IPhone17Pro,
    brandComponent: IPhone17Pro,
  },
];

export default function MainHomeScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ===== GREEN HEADER (MATCH SEARCHSCREEN) ===== */}
      <View style={[styles.headerOuter, { width }]}>
        <ResponsiveGreenHeader height={220} />

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
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        >
          <ImageHome width={width - 40} height={(width - 40) * 0.48} />

          {/* Smart Deals Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Smart deals for you</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {SMART_DEALS.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => handleProductPress(product)}
                >
                  {product.badge && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{product.badge}</Text>
                    </View>
                  )}
                  <View style={styles.productImageContainer}>
                    {React.createElement(product.imageComponent, { width: 120, height: 120 })}
                  </View>
                  <View style={styles.productInfo}>
                    {React.createElement(product.brandComponent, { width: 24, height: 24 })}
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={styles.productDesc} numberOfLines={1}>
                      {product.description}
                    </Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => handleProductPress(product)}
                    >
                      <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recently Viewed Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Viewed</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {RECENTLY_VIEWED.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.recentCard}
                  onPress={() => handleProductPress(product)}
                >
                  <View style={styles.recentImageContainer}>
                    {React.createElement(product.imageComponent, { width: 100, height: 100 })}
                  </View>
                  <Text style={styles.recentName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.recentDesc} numberOfLines={1}>
                    {product.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
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
    marginTop: -48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    overflow: 'hidden',
  },

  /* ===== PRODUCT SECTIONS ===== */
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004225',
  },
  seeAllText: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '500',
  },
  horizontalScroll: {
    paddingRight: 20,
  },

  /* ===== PRODUCT CARD (SMART DEALS) ===== */
  productCard: {
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#004225',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  productImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#F6F8F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 12,
  },
  brandLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004225',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004225',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#004225',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  /* ===== RECENTLY VIEWED CARD ===== */
  recentCard: {
    width: 120,
    marginRight: 16,
  },
  recentImageContainer: {
    width: 120,
    height: 140,
    backgroundColor: '#F6F8F7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 8,
  },
  recentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  recentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004225',
    marginBottom: 2,
  },
  recentDesc: {
    fontSize: 12,
    color: '#666666',
  },
});
