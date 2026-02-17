import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL - Smart Detection for Both Emulator and Physical Device
// This configuration works for BOTH emulator and physical device automatically
const getApiBaseUrl = () => {
  // Option 1: Use ngrok URL (works for both emulator and physical device)
  // Download from: https://ngrok.com
  // Run: ngrok http 5000
  // Then paste the URL here (e.g., 'https://abc123.ngrok-free.app')
  const NGROK_URL = 'https://cusped-magen-unforwarded.ngrok-free.dev'; // Leave empty if not using ngrok
  
  if (NGROK_URL) {
    return `${NGROK_URL}/api`;
  }
  
  // Option 2: Auto-detect based on platform
  // For emulator: uses 10.0.2.2
  // For physical device: you need to set USE_PHYSICAL_DEVICE = true
  // and ensure phone is on same WiFi as computer
  const USE_PHYSICAL_DEVICE = false; // Set to true only for physical device
  const YOUR_COMPUTER_IP = '192.168.1.2';
  
  if (USE_PHYSICAL_DEVICE) {
    // Physical device - must be on same WiFi
    return `http://${YOUR_COMPUTER_IP}:5000/api`;
  }
  
  // Emulator/Simulator
  return Platform.select({
    android: 'http://10.0.2.2:5000/api', // Android emulator
    ios: 'http://localhost:5000/api',     // iOS simulator
    default: 'http://localhost:5000/api',
  });
};

const API_BASE_URL = getApiBaseUrl();

console.log('📡 API Base URL:', API_BASE_URL);
console.log('📱 Platform:', Platform.OS);

// Helper to get base URL without /api suffix for constructing image URLs
export const getBaseUrl = () => {
  const NGROK_URL = 'https://cusped-magen-unforwarded.ngrok-free.dev';
  
  if (NGROK_URL) {
    return NGROK_URL;
  }
  
  const USE_PHYSICAL_DEVICE = false;
  const YOUR_COMPUTER_IP = '192.168.1.2';
  
  if (USE_PHYSICAL_DEVICE) {
    return `http://${YOUR_COMPUTER_IP}:5000`;
  }
  
  return Platform.select({
    android: 'http://10.0.2.2:5000',
    ios: 'http://localhost:5000',
    default: 'http://localhost:5000',
  });
};

// Helper to construct full image URL from relative path
export const getFullImageUrl = (relativePath?: string): string | undefined => {
  if (!relativePath) {
    console.log('⚠️ getFullImageUrl: No path provided');
    return undefined;
  }
  
  // If already a full URL, return as-is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    console.log('✅ getFullImageUrl: Already full URL:', relativePath);
    return relativePath;
  }
  
  // Normalize path separators (replace backslashes with forward slashes)
  const normalizedPath = relativePath.replace(/\\/g, '/');
  
  // Remove leading slash if present
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
  
  const fullUrl = `${getBaseUrl()}/${cleanPath}`;
  console.log('🔗 getFullImageUrl: Constructed URL:', {
    input: relativePath,
    normalized: normalizedPath,
    clean: cleanPath,
    baseUrl: getBaseUrl(),
    result: fullUrl
  });
  
  return fullUrl;
};

// Create the base API
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    timeout: 15000, // 15 seconds timeout
    prepareHeaders: async (headers) => {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      headers.set('Accept', 'application/json');
      // Add ngrok bypass header to skip browser warning
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    },
    validateStatus: (response, body) => {
      // Consider any 2xx status as successful
      return response.status >= 200 && response.status < 300;
    },
  }),
  tagTypes: ['Auth', 'Rating', 'UserProfile'],
  endpoints: () => ({}),
});
