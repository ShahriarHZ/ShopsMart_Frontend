import { api } from './api';
import { ApiEnvelope } from '@/types/auth.types';
import { Review, ReviewsResponse } from '@/types/admin.types';

export const reviewApi = {
  listForProduct: async (productId: string) => {
    const { data } = await api.get<ApiEnvelope<ReviewsResponse>>(`/products/${productId}/reviews`);
    return data.data as ReviewsResponse;
  },
  create: async (productId: string, input: { rating: number; comment: string }) => {
    const { data } = await api.post<ApiEnvelope<Review>>(`/products/${productId}/reviews`, input);
    return data.data as Review;
  },
  delete: async (reviewId: string) => {
    await api.delete(`/reviews/${reviewId}`);
  },
};
