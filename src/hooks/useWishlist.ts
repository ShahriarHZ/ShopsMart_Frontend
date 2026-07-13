import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { wishlistApi } from '@/services/cartApi';
import { useAuthStore } from '@/store/authStore';

const showError = (err: unknown, fallback: string) => {
  const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? fallback;
  toast.error(message);
};

export const useWishlist = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.get,
    enabled: isAuthenticated,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.add(productId),
    onSuccess: () => {
      toast.success('Added to wishlist');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (err) => showError(err, 'Could not add to wishlist'),
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.remove(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
    onError: (err) => showError(err, 'Could not remove from wishlist'),
  });
};

export const useMoveToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.moveToCart(productId),
    onSuccess: () => {
      toast.success('Moved to cart');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => showError(err, 'Could not move item to cart'),
  });
};
