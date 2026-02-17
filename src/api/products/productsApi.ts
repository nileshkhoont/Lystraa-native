import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';

// Scraping API Base URL (Port 3000)
// This is separate from your main backend (Port 5000)
const getScrapingApiUrl = () => {
  // If you have ngrok running for port 3000, add it here
  const NGROK_URL = ''; // e.g., 'https://your-ngrok-url.ngrok-free.app'
  
  if (NGROK_URL) {
    return NGROK_URL;
  }
  
  // Default to localhost:3000 with platform detection
  return Platform.select({
    android: 'http://10.0.2.2:3000',
    ios: 'http://localhost:3000',
    default: 'http://localhost:3000',
  });
};

const SCRAPING_API_URL = getScrapingApiUrl();

console.log('🔍 Scraping API URL:', SCRAPING_API_URL);

// Product type based on backend response
export interface Product {
  name: string;
  link: string;
  current_price: number;
  original_price: number;
  discounted: boolean;
  thumbnail: string;
  query_url?: string;
}

// API Response type
export interface ProductSearchResponse {
  total_result: number;
  query: string;
  query_params: {
    page_number: number | null;
    sort: string | null;
    min_price: number | null;
    max_price: number | null;
    others: string | null;
  };
  fetch_from: string;
  result: Product[];
}

// Create products API
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SCRAPING_API_URL,
    prepareHeaders: (headers) => {
      // Add ngrok bypass header if needed
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    // Search products
    searchProducts: builder.query<ProductSearchResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: `/search/${encodeURIComponent(query)}`,
        params: page > 1 ? { page } : undefined,
      }),
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),
    
    // Get featured products (search by category)
    getFeaturedProducts: builder.query<ProductSearchResponse, { category: string }>({
      query: ({ category }) => `/search/${encodeURIComponent(category)}`,
      keepUnusedDataFor: 600, // Cache for 10 minutes
    }),
  }),
});

export const { 
  useSearchProductsQuery, 
  useLazySearchProductsQuery,
  useGetFeaturedProductsQuery 
} = productsApi;
