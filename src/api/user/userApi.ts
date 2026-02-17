import { baseApi, getFullImageUrl } from '../baseApi';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UploadImageResponse {
  success: boolean;
  message: string;
  profileImage: string;
  fullUrl: string;
}

export interface DeleteImageResponse {
  success: boolean;
  message: string;
  user: User;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      transformResponse: (response: UserProfileResponse) => {
        console.log('🔄 getUserProfile transformResponse called');
        console.log('📦 Raw response:', JSON.stringify(response, null, 2));
        // Transform profileImage to profileImageUrl with full URL
        if (response.user && response.user.profileImage) {
          response.user.profileImageUrl = getFullImageUrl(response.user.profileImage);
          console.log('✅ Transformed profileImageUrl:', response.user.profileImageUrl);
        } else {
          console.log('⚠️ No profileImage to transform');
        }
        return response;
      },
      providesTags: ['UserProfile'],
    }),

    // Update profile (text fields only)
    updateProfile: builder.mutation<UserProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: UserProfileResponse) => {
        // Transform profileImage to profileImageUrl with full URL
        if (response.user && response.user.profileImage) {
          response.user.profileImageUrl = getFullImageUrl(response.user.profileImage);
        }
        return response;
      },
      invalidatesTags: ['UserProfile'],
    }),

    // Update complete profile with image
    updateProfileWithImage: builder.mutation<UserProfileResponse, FormData>({
      query: (formData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: UserProfileResponse) => {
        console.log('🔄 updateProfileWithImage transformResponse called');
        console.log('📦 Raw mutation response:', JSON.stringify(response, null, 2));
        // Transform profileImage to profileImageUrl with full URL
        if (response.user && response.user.profileImage) {
          response.user.profileImageUrl = getFullImageUrl(response.user.profileImage);
          console.log('✅ Transformed profileImageUrl:', response.user.profileImageUrl);
        } else {
          console.log('⚠️ No profileImage in mutation response');
        }
        return response;
      },
      invalidatesTags: ['UserProfile'],
    }),

    // Upload/Update profile image only
    uploadProfileImage: builder.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: '/user/profile-image',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: UploadImageResponse) => {
        // Transform profileImage to fullUrl with full URL
        if (response.profileImage) {
          response.fullUrl = getFullImageUrl(response.profileImage) || response.profileImage;
        }
        return response;
      },
      invalidatesTags: ['UserProfile'],
    }),

    // Delete profile image
    deleteProfileImage: builder.mutation<DeleteImageResponse, void>({
      query: () => ({
        url: '/user/profile-image',
        method: 'DELETE',
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfileWithImageMutation,
  useUploadProfileImageMutation,
  useDeleteProfileImageMutation,
} = userApi;
