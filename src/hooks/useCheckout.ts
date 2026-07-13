import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { checkoutApi, orderApi } from '@/services/cartApi';
import { ShippingAddress } from '@/types/cart.types';

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (shippingAddress: ShippingAddress) => checkoutApi.createSession(shippingAddress),
    onSuccess: (data) => {
      window.location.href = data.url; // redirect to Stripe-hosted checkout
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Could not start checkout. Please try again.';
      toast.error(message);
    },
  });
};

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.myOrders,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getById(id),
    enabled: !!id,
  });
};
