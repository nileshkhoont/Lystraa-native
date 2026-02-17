import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Arrow from '../../assets/images/Arrow1.svg';
import BottomBar from '../../components/BottomBar';
import { useGetFeaturedProductsQuery, Product } from '../../api/products/productsApi';

type AllProductsScreenRouteProp = RouteProp<{ 
  AllProductsScreen: { 
    category: string;
    title: string;
  } 
}, 'AllProductsScreen'>;

const AllProductsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<AllProductsScreenRouteProp>();
  const { width } = useWindowDimensions();
  
  const { category, title } = route.params || { category: 'iphone', title: 'All Products' };

  // Fetch products for the category
  const { data, isLoading } = useGetFeaturedProductsQuery({ category });

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.productImage}
        resizeMode="contain"
      />
      {item.discounted && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(((item.original_price - item.current_price) / item.original_price) * 100)}% OFF
          </Text>
        </View>
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{item.current_price.toLocaleString('en-IN')}</Text>
          {item.discounted && (
            <Text style={styles.originalPrice}>₹{item.original_price.toLocaleString('en-IN')}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* GREEN HEADER */}
      <View style={[styles.headerOuter, { width }]}>
        <ResponsiveGreenHeader height={140} />
        
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Arrow width={24} height={24} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* WHITE CARD */}
      <View style={[styles.content, { width }]}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00A86B" />
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : (
          <>
            {data && data.result.length > 0 && (
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsText}>
                  {data.total_result} products found
                </Text>
              </View>
            )}
            <FlatList
              data={data?.result || []}
              renderItem={renderProductItem}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>No products found</Text>
                  <Text style={styles.emptyText}>Try another category</Text>
                </View>
              )}
            />
          </>
        )}
      </View>

      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F7',
    width: '100%',
  },

  /* HEADER */
  headerOuter: {
    height: 140,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -(StatusBar.currentHeight ?? 0) : 0,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android'
      ? (StatusBar.currentHeight ?? 0) + 47
      : 55,
    left: 20,
    zIndex: 10,
  },

  headerTitle: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 45 : 55,
    left: 60,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* WHITE CARD */
  content: {
    backgroundColor: '#FFFFFF',
    marginTop: -24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    overflow: 'hidden',
  },

  /* LOADING & EMPTY STATES */
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  /* RESULTS HEADER */
  resultsHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  resultsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  /* PRODUCT GRID */
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },

  row: {
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9FAFB',
  },

  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00A86B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },

  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },

  productInfo: {
    padding: 12,
  },

  productName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    minHeight: 34,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  currentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A86B',
  },

  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
});

export default AllProductsScreen;
