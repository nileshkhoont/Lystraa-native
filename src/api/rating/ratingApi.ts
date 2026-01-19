import { baseApi } from '../baseApi';

export interface SubmitRatingRequest {
  rating: number;
  feedback?: string;
}

export interface RatingResponse {
  success?: boolean;
  message: string;
  data?: {
    _id: string;
    user: string;
    rating: number;
    feedback: string;
    createdAt: string;
    updatedAt: string;
  };
  count?: number;
}

export interface RatingStatsResponse {
  message: string;
  data: {
    totalRatings: number;
    averageRating: number;
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
  };
}

export const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitRating: builder.mutation<RatingResponse, SubmitRatingRequest>({
      query: (data) => ({
        url: '/rating/submit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Rating'],
    }),
    getMyRating: builder.query<RatingResponse, void>({
      query: () => '/rating/my-rating',
      providesTags: ['Rating'],
    }),
    getAllRatings: builder.query<RatingResponse, void>({
      query: () => '/rating/all',
      providesTags: ['Rating'],
    }),
    getRatingStats: builder.query<RatingStatsResponse, void>({
      query: () => '/rating/stats',
      providesTags: ['Rating'],
    }),
    deleteRating: builder.mutation<RatingResponse, string>({
      query: (id) => ({
        url: `/rating/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rating'],
    }),
  }),
});

export const {
  useSubmitRatingMutation,
  useGetMyRatingQuery,
  useGetAllRatingsQuery,
  useGetRatingStatsQuery,
  useDeleteRatingMutation,
} = ratingApi;
