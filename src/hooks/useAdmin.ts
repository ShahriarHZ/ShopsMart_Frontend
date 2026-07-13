import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminApi, couponApi, productAdminApi } from '@/services/adminApi';
import { Coupon } from '@/types/admin.types';

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, stock }: { productId: string; stock: number }) =>
      productAdminApi.updateStock(productId, stock),
    onSuccess: () => {
      toast.success('Stock updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: () => toast.error('Could not update stock'),
  });
};

export const useDashboardStats = () => {
  return useQuery({ queryKey: ['admin', 'dashboard'], queryFn: adminApi.getDashboard });
};

export const useRevenueSeries = (days = 30) => {
  return useQuery({ queryKey: ['admin', 'revenue', days], queryFn: () => adminApi.getRevenueSeries(days) });
};

export const useAdminOrders = (status?: string) => {
  return useQuery({ queryKey: ['admin', 'orders', status], queryFn: () => adminApi.listOrders(status) });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      adminApi.updateOrderStatus(orderId, status),
    onSuccess: () => {
      toast.success('Order status updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
    },
    onError: () => toast.error('Could not update order status'),
  });
};

export const useCoupons = () => {
  return useQuery({ queryKey: ['admin', 'coupons'], queryFn: couponApi.list });
};

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Coupon>) => couponApi.create(input),
    onSuccess: () => {
      toast.success('Coupon created');
      queryClient.invalidateQueries({ queryKey: ['admin', 'coupons'] });
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Could not create coupon.';
      toast.error(message);
    },
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => couponApi.delete(id),
    onSuccess: () => {
      toast.success('Coupon deleted');
      queryClient.invalidateQueries({ queryKey: ['admin', 'coupons'] });
    },
  });
};
