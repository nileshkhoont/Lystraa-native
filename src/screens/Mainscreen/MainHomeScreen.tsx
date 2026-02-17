import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import { HomeSkeleton } from '../../components/HomeSkeleton';
import LystraaLogo from '../../assets/home/lystraaLogo.svg';
import SearchIcon from '../../assets/home/searchfield.svg';
import ImageHome from '../../assets/home/imagehome.svg';
import BottomBar from '../../components/BottomBar';
import { useGetFeaturedProductsQuery, useLazySearchProductsQuery, Product } from '../../api/products/productsApi';
import { RecentSearches } from '../../components/RecentSearches';
import { addRecentSearch } from '../../utils/recentSearchStorage';

const MainHomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearchRefresh, setRecentSearchRefresh] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Fetch featured products
  const { data: smartDeals, isLoading: isLoadingDeals } = useGetFeaturedProductsQuery({ 
    category: 'iphone' 
  });
  const { data: trendingProducts, isLoading: isLoadingTrending } = useGetFeaturedProductsQuery({ 
    category: 'laptop' 
  });

  // Search products dynamically
  const [searchProducts, { data: searchResults, isLoading: isSearchLoading }] = useLazySearchProductsQuery();

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      // Show skeleton for 1-2 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleSearchPress = async () => {
    if (searchQuery.trim().length > 0) {
      console.log('🔍 Searching for:', searchQuery);
      await addRecentSearch(searchQuery.trim());
      setIsSearching(true);
      searchProducts({ query: searchQuery.trim() });
      setRecentSearchRefresh(prev => prev + 1);
    }
  };

  const handleRecentSearchSelect = (search: string) => {
    setSearchQuery(search);
    setIsSearchFocused(false);
    setIsSearching(true);
    searchProducts({ query: search });
    addRecentSearch(search);
    setRecentSearchRefresh(prev => prev + 1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
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
            <SearchIcon width={24} height={24} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search to compare prices"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onSubmitEditing={() => {
                setIsSearchFocused(false);
                handleSearchPress();
              }}
              returnKeyType="search"
            />
            {isSearching && (
              <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* ===== WHITE CARD ===== */}
      <View style={[styles.content, { width }]}>
        {/* Recent Searches Dropdown - Show when search is focused */}
        {isSearchFocused && !isSearching && (
          <View style={styles.dropdownWrapper}>
            <RecentSearches 
              onSearchSelect={handleRecentSearchSelect}
              visible={true}
              refreshTrigger={recentSearchRefresh}
              asDropdown={true}
            />
          </View>
        )}

        {isLoading ? (
          <HomeSkeleton />
        ) : isSearching ? (
          // SEARCH RESULTS VIEW
          <>
            {isSearchLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00A86B" />
                <Text style={styles.loadingText}>Searching products...</Text>
              </View>
            ) : (
              <>
                {searchResults && searchResults.result.length > 0 && (
                  <View style={styles.resultsHeader}>
                    <Text style={styles.resultsText}>
                      {searchResults.total_result} results for "{searchResults.query}"
                    </Text>
                  </View>
                )}
                <FlatList
                  data={searchResults?.result || []}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.searchProductCard}
                      onPress={() => handleProductPress(item)}
                    >
                      <Image 
                        source={{ uri: item.thumbnail }} 
                        style={styles.searchProductImage}
                        resizeMode="contain"
                      />
                      {item.discounted && (
                        <View style={styles.searchDiscountBadge}>
                          <Text style={styles.discountText}>
                            {Math.round(((item.original_price - item.current_price) / item.original_price) * 100)}% OFF
                          </Text>
                        </View>
                      )}
                      <View style={styles.searchProductInfo}>
                        <Text style={styles.searchProductName} numberOfLines={2}>
                          {item.name}
                        </Text>
                        <View style={styles.searchPriceContainer}>
                          <Text style={styles.searchCurrentPrice}>₹{item.current_price.toLocaleString('en-IN')}</Text>
                          {item.discounted && (
                            <Text style={styles.searchOriginalPrice}>₹{item.original_price.toLocaleString('en-IN')}</Text>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => `${item.name}-${index}`}
                  numColumns={2}
                  columnWrapperStyle={styles.searchRow}
                  contentContainerStyle={styles.searchListContent}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyTitle}>No results found</Text>
                      <Text style={styles.emptyText}>Try searching for something else</Text>
                    </View>
                  )}
                />
              </>
            )}
          </>
        ) : (
          // FEATURED PRODUCTS VIEW (DEFAULT)
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
              <TouchableOpacity onPress={() => navigation.navigate('AllProducts', { 
                category: 'iphone', 
                title: 'Smart deals for you' 
              })}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            {isLoadingDeals ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00A86B" />
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {smartDeals?.result.slice(0, 10).map((product, index) => (
                  <TouchableOpacity
                    key={`${product.name}-${index}`}
                    style={styles.productCard}
                    onPress={() => handleProductPress(product)}
                  >
                    {product.discounted && (
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>
                          {Math.round(((product.original_price - product.current_price) / product.original_price) * 100)}% OFF
                        </Text>
                      </View>
                    )}
                    <View style={styles.productImageContainer}>
                      <Image 
                        source={{ uri: product.thumbnail }} 
                        style={styles.productImage}
                      />
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.productPrice}>
                        ₹{product.current_price.toLocaleString('en-IN')}
                      </Text>
                      {product.discounted && (
                        <Text style={styles.originalPriceText}>
                          ₹{product.original_price.toLocaleString('en-IN')}
                        </Text>
                      )}
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
            )}
          </View>

          {/* Trending Products Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Products</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AllProducts', { 
                category: 'laptop', 
                title: 'Trending Products' 
              })}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            {isLoadingTrending ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00A86B" />
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {trendingProducts?.result.slice(0, 10).map((product, index) => (
                  <TouchableOpacity
                    key={`${product.name}-${index}`}
                    style={styles.recentCard}
                    onPress={() => handleProductPress(product)}
                  >
                    <View style={styles.recentImageContainer}>
                      <Image 
                        source={{ uri: product.thumbnail }} 
                        style={styles.recentImage}
                      />
                    </View>
                    <Text style={styles.recentName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={styles.recentPrice}>
                      ₹{product.current_price.toLocaleString('en-IN')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
        )}
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
    marginTop: Platform.OS === 'android' ? -(StatusBar.currentHeight ?? 0) : 0,
  },

  logoContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 40 : 75,
    left: 20,
  },

  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 95 : 135,
    left: 16,
    right: 16,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
  },

  searchIcon: {
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    padding: 0,
    height: 52,
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
    marginBottom: 4,
  },
  originalPriceText: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
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
  recentPrice: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '600',
  },
  recentDesc: {
    fontSize: 12,
    color: '#666666',
  },
  
  /* ===== LOADING STATE ===== */
  loadingContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },

  /* ===== SEARCH RESULTS ===== */
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
  },
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
  searchListContent: {
    padding: 16,
    paddingBottom: 100,
  },
  searchRow: {
    justifyContent: 'space-between',
  },
  searchProductCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  searchProductImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9FAFB',
  },
  searchDiscountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00A86B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  searchProductInfo: {
    padding: 12,
  },
  searchProductName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    minHeight: 34,
  },
  searchPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  searchCurrentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A86B',
  },
  searchOriginalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
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
  dropdownWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
});

export default MainHomeScreen;
