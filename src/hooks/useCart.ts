import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { cartApi } from '@/services/cartApi';
import { useAuthStore } from '@/store/authStore';

const showError = (err: unknown, fallback: string) => {
  const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? fallback;
  toast.error(message);
};

export const useCart = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.get,
    enabled: isAuthenticated,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: () => {
      toast.success('Added to cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => showError(err, 'Could not add item to cart'),
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.updateItem(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: (err) => showError(err, 'Could not update quantity'),
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => cartApi.removeItem(productId),
    onSuccess: () => {
      toast.success('Item removed');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => showError(err, 'Could not remove item'),
  });
};

export const useApplyCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => cartApi.applyCoupon(code),
    onSuccess: () => {
      toast.success('Coupon applied!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => showError(err, 'Invalid coupon code'),
  });
};

export const useRemoveCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartApi.removeCoupon(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: (err) => showError(err, 'Could not remove coupon'),
  });
};
