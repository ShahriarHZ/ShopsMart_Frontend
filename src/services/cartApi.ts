import { api } from './api';
import { ApiEnvelope } from '@/types/auth.types';
import { CartWithTotals, Wishlist, ShippingAddress, Order } from '@/types/cart.types';

export const cartApi = {
  get: async () => {
    const { data } = await api.get<ApiEnvelope<CartWithTotals>>('/cart');
    return data.data as CartWithTotals;
  },
  addItem: async (input: { productId: string; quantity?: number; color?: string; size?: string }) => {
    const { data } = await api.post<ApiEnvelope<CartWithTotals>>('/cart/items', input);
    return data.data as CartWithTotals;
  },
  updateItem: async (productId: string, quantity: number) => {
    const { data } = await api.patch<ApiEnvelope<CartWithTotals>>(`/cart/items/${productId}`, { quantity });
    return data.data as CartWithTotals;
  },
  removeItem: async (productId: string) => {
    const { data } = await api.delete<ApiEnvelope<CartWithTotals>>(`/cart/items/${productId}`);
    return data.data as CartWithTotals;
  },
  clear: async () => {
    await api.delete('/cart');
  },
  applyCoupon: async (code: string) => {
    const { data } = await api.post<ApiEnvelope<CartWithTotals>>('/cart/coupon', { code });
    return data.data as CartWithTotals;
  },
  removeCoupon: async () => {
    const { data } = await api.delete<ApiEnvelope<CartWithTotals>>('/cart/coupon');
    return data.data as CartWithTotals;
  },
};

export const wishlistApi = {
  get: async () => {
    const { data } = await api.get<ApiEnvelope<Wishlist>>('/wishlist');
    return data.data as Wishlist;
  },
  add: async (productId: string) => {
    const { data } = await api.post<ApiEnvelope<Wishlist>>(`/wishlist/${productId}`);
    return data.data as Wishlist;
  },
  remove: async (productId: string) => {
    const { data } = await api.delete<ApiEnvelope<Wishlist>>(`/wishlist/${productId}`);
    return data.data as Wishlist;
  },
  moveToCart: async (productId: string) => {
    await api.post(`/wishlist/${productId}/move-to-cart`);
  },
};

export const checkoutApi = {
  createSession: async (shippingAddress: ShippingAddress) => {
    const { data } = await api.post<ApiEnvelope<{ url: string }>>('/checkout/create-session', {
      shippingAddress,
    });
    return data.data as { url: string };
  },
  confirmSession: async (sessionId: string) => {
    await api.post('/checkout/confirm-session', { sessionId });
  },
};

export const orderApi = {
  myOrders: async () => {
    const { data } = await api.get<ApiEnvelope<Order[]>>('/orders');
    return data.data ?? [];
  },
  getById: async (id: string) => {
    const { data } = await api.get<ApiEnvelope<Order>>(`/orders/${id}`);
    return data.data as Order;
  },
};
