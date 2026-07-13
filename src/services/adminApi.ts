import { api } from './api';
import { ApiEnvelope } from '@/types/auth.types';
import { DashboardStats, RevenuePoint, AdminOrder, Coupon } from '@/types/admin.types';

export const productAdminApi = {
  updateStock: async (productId: string, stock: number) => {
    const { data } = await api.patch<ApiEnvelope<{ stock: number }>>(`/products/${productId}/stock`, { stock });
    return data.data;
  },
};

export const adminApi = {
  getDashboard: async () => {
    const { data } = await api.get<ApiEnvelope<DashboardStats>>('/admin/dashboard');
    return data.data as DashboardStats;
  },
  getRevenueSeries: async (days = 30) => {
    const { data } = await api.get<ApiEnvelope<RevenuePoint[]>>(`/admin/dashboard/revenue?days=${days}`);
    return data.data ?? [];
  },
  listOrders: async (status?: string) => {
    const { data } = await api.get<ApiEnvelope<AdminOrder[]>>(`/admin/orders${status ? `?status=${status}` : ''}`);
    return data.data ?? [];
  },
  updateOrderStatus: async (orderId: string, status: string) => {
    const { data } = await api.patch<ApiEnvelope<AdminOrder>>(`/admin/orders/${orderId}/status`, { status });
    return data.data as AdminOrder;
  },
};

export const couponApi = {
  list: async () => {
    const { data } = await api.get<ApiEnvelope<Coupon[]>>('/coupons');
    return data.data ?? [];
  },
  create: async (input: Partial<Coupon>) => {
    const { data } = await api.post<ApiEnvelope<Coupon>>('/coupons', input);
    return data.data as Coupon;
  },
  delete: async (id: string) => {
    await api.delete(`/coupons/${id}`);
  },
};
