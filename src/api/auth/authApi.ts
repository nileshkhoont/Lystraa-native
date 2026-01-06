import { baseApi } from '../baseApi';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}
// “Add authentication endpoints to my main API”
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => ({
        success: true,
        message: response.message || 'Registration successful!',
        data: response,
      }),
      transformErrorResponse: (response: any) => ({
        success: false,
        message: response.data?.message || 'Registration failed. Please try again.',
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => ({
        success: true,
        message: response.message || 'Login successful!',
        data: response,
      }),
      transformErrorResponse: (response: any) => ({
        success: false,
        message: response.data?.message || 'Invalid email or password. Please try again.',
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi;
