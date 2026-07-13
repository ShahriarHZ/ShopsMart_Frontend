import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { reviewApi } from '@/services/reviewApi';

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewApi.listForProduct(productId),
    enabled: !!productId,
  });
};

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { rating: number; comment: string }) => reviewApi.create(productId, input),
    onSuccess: () => {
      toast.success('Review submitted — thanks for the feedback!');
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Could not submit review.';
      toast.error(message);
    },
  });
};

export const useDeleteReview = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => reviewApi.delete(reviewId),
    onSuccess: () => {
      toast.success('Review deleted');
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });
};
