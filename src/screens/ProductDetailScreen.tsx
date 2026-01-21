import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../components/CommonComponents';
import Arrow from '../assets/images/Arrow1.svg';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Green Header */}
      <View style={styles.headerOuter}>
        <ResponsiveGreenHeader height={140} />
        
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Arrow width={24} height={24} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Product Image */}
          <View style={styles.imageContainer}>
            {product?.imageComponent && 
              React.createElement(product.imageComponent, { 
                width: 250, 
                height: 250 
              })
            }
          </View>

          {/* Product Info */}
          <View style={styles.infoSection}>
            <View style={styles.brandLogoContainer}>
              {product?.brandComponent &&
                React.createElement(product.brandComponent, { 
                  width: 40, 
                  height: 40 
                })
              }
            </View>

            <Text style={styles.productName}>{product?.name || 'Product Name'}</Text>
            <Text style={styles.productDescription}>{product?.description || ''}</Text>

            {/* Price Section */}
            <View style={styles.priceSection}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>{product?.price || '₹0'}</Text>
            </View>

            {/* Badge */}
            {product?.badge && (
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{product.badge}</Text>
                </View>
              </View>
            )}

            {/* Product Details */}
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Product Details</Text>
              <Text style={styles.detailText}>
                This product offers great value and quality. Compare prices across multiple platforms to get the best deal.
              </Text>
            </View>

            {/* Where to Buy */}
            <View style={styles.whereToBuySection}>
              <Text style={styles.sectionTitle}>Where to Buy</Text>
              
              {product?.stores?.map((store: any, index: number) => (
                <View key={index} style={styles.storeCard}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storePrice}>{store.price}</Text>
                  <TouchableOpacity style={styles.storeButton}>
                    <Text style={styles.storeButtonText}>Visit Store</Text>
                  </TouchableOpacity>
                </View>
              )) || (
                <>
                  <View style={styles.storeCard}>
                    <Text style={styles.storeName}>Amazon</Text>
                    <Text style={styles.storePrice}>{product?.price || '₹0'}</Text>
                    <TouchableOpacity style={styles.storeButton}>
                      <Text style={styles.storeButtonText}>Visit Store</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.storeCard}>
                    <Text style={styles.storeName}>Flipkart</Text>
                    <Text style={styles.storePrice}>{product?.price || '₹0'}</Text>
                    <TouchableOpacity style={styles.storeButton}>
                      <Text style={styles.storeButtonText}>Visit Store</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
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
  headerOuter: {
    height: 140,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 55,
    left: 20,
    zIndex: 10,
  },
  headerTitle: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 55,
    left: 60,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    backgroundColor: '#FFFFFF',
    marginTop: -32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F6F8F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  productImage: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoSection: {
    padding: 20,
  },
  brandLogoContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F6F8F7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  brandLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004225',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  priceSection: {
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#004225',
  },
  badgeContainer: {
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#004225',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004225',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  whereToBuySection: {
    marginBottom: 24,
  },
  storeCard: {
    backgroundColor: '#F6F8F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004225',
    flex: 1,
  },
  storePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004225',
    marginRight: 12,
  },
  storeButton: {
    backgroundColor: '#004225',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  storeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
