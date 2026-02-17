import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import BottomBar from '../../components/BottomBar';
import SearchIcon from '../../assets/home/searchfield.svg';
import { useLazySearchProductsQuery, Product } from '../../api/products/productsApi';
import { RecentSearches } from '../../components/RecentSearches';
import { addRecentSearch } from '../../utils/recentSearchStorage';

type SearchScreenRouteProp = RouteProp<{ SearchScreen: { query?: string } }, 'SearchScreen'>;

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<SearchScreenRouteProp>();
  const { width } = useWindowDimensions();
  
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [searchProducts, { data, isLoading, isFetching, error }] = useLazySearchProductsQuery();
  const [recentSearchRefresh, setRecentSearchRefresh] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Auto-search if coming from navigation with query
    if (route.params?.query) {
      handleSearch(route.params.query);
    }
  }, [route.params?.query]);

  const handleSearch = async (query: string = searchQuery) => {
    if (query.trim().length > 0) {
      console.log('🔍 Searching for:', query);
      await addRecentSearch(query.trim());
      searchProducts({ query: query.trim() });
      setRecentSearchRefresh(prev => prev + 1);
    }
  };

  const handleRecentSearchSelect = (search: string) => {
    setSearchQuery(search);
    setIsSearchFocused(false);
    handleSearch(search);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
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

  const renderEmptyState = () => {
    if (isLoading || isFetching) return null;
    
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Unable to search</Text>
          <Text style={styles.emptyText}>Please check your connection and try again</Text>
        </View>
      );
    }

    if (data?.result.length === 0 && searchQuery) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>Try searching for something else</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Search for products</Text>
        <Text style={styles.emptyText}>Enter a product name like "mobile", "laptop", or "iphone"</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ================= GREEN HEADER ================= */}
      <View style={[styles.headerOuter, { width }]}>
        <ResponsiveGreenHeader height={220} />
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
                handleSearch();
              }}
              returnKeyType="search"
            />
          </View>
        </View>
      </View>

      {/* ================= WHITE CARD ================= */}
      <View style={[styles.content, { width }]}>
        {/* Recent Searches Dropdown - Show when search is focused */}
        {isSearchFocused && !data && (
          <View style={styles.dropdownWrapper}>
            <RecentSearches 
              onSearchSelect={handleRecentSearchSelect}
              visible={true}
              refreshTrigger={recentSearchRefresh}
              asDropdown={true}
            />
          </View>
        )}
        
        {(isLoading || isFetching) && data === undefined ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00A86B" />
            <Text style={styles.loadingText}>Searching products...</Text>
          </View>
        ) : (
          <>
            {data && data.result.length > 0 && (
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsText}>
                  {data.total_result} results for "{data.query}"
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
              ListEmptyComponent={renderEmptyState}
            />
          </>
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

  /* HEADER */
  headerOuter: {
    height: 180,
    overflow: 'hidden',
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

  searchContainer: {
    position: 'absolute',
    top: 90,
    left: 16,
    right: 16,
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

  /* DROPDOWN WRAPPER */
  dropdownWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
});

export default SearchScreen;
