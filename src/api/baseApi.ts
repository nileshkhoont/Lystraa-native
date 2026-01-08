import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use 10.0.2.2 for Android emulator, localhost for iOS simulator
const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000/api'
  : 'http://localhost:5000/api';

// Create the base API
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers) => {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});
