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

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  data?: {
    token?: string;
    user?: User;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      // REMOVE transformResponse and transformErrorResponse completely
      // Let the response pass through as-is from backend
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // REMOVE transformResponse and transformErrorResponse
    }),
    changePassword: builder.mutation<AuthResponse, ChangePasswordRequest>({
      query: (passwords) => ({
        url: '/password/change',
        method: 'POST',
        body: passwords,
      }),
    }),
    forgotPassword: builder.mutation<AuthResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/password/forgot',
        method: 'POST',
        body: data,
      }),
    }),
    verifyCode: builder.mutation<AuthResponse, VerifyCodeRequest>({
      query: (data) => ({
        url: '/password/verify-code',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: '/password/reset',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authApi;