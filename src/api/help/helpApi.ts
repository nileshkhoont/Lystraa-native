import { baseApi } from '../baseApi';

export interface HelpRequest {
  topic: string;
  description: string;
  email: string;
}

export interface HelpData {
  _id?: string;
  topic?: string;
  description?: string;
  email?: string;
  status?: string;
  createdAt?: string;
}

export interface HelpResponse {
  success: boolean;
  message: string;
  data?: HelpData;
}

export const helpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitHelpRequest: builder.mutation<HelpResponse, HelpRequest>({
      query: (data) => ({
        url: '/help/submit',
        method: 'POST',
        body: data,
      }),
    }),
    getUserHelpRequests: builder.query<HelpResponse, void>({
      query: () => ({
        url: '/help/my-requests',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSubmitHelpRequestMutation,
  useGetUserHelpRequestsQuery,
} = helpApi;
