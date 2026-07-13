import { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  couponCode?: string;
}

export interface PricingBreakdown {
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
}

export interface CartWithTotals {
  cart: Cart;
  pricing: PricingBreakdown;
}

export interface Wishlist {
  _id: string;
  user: string;
  products: Product[];
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  product: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
}
