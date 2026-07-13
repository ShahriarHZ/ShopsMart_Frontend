export interface Review {
  _id: string;
  product: string;
  user: string;
  userName: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  distribution: Record<string, number>;
}

export interface Coupon {
  _id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  usageLimit: number | null;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
}

export interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  averageOrderValue: number;
  bestSellingProducts: {
    _id: string;
    title: string;
    image: string;
    totalSold: number;
    revenue: number;
  }[];
  recentOrders: {
    _id: string;
    user: { name: string; email: string };
    total: number;
    status: string;
    createdAt: string;
  }[];
  lowStockProducts: { _id: string; title: string; stock: number; sku: string }[];
  outOfStockProducts: { _id: string; title: string; stock: number; sku: string }[];
}

export interface RevenuePoint {
  _id: string;
  revenue: number;
  orders: number;
}

export interface AdminOrder {
  _id: string;
  user: { name: string; email: string };
  items: { title: string; image: string; price: number; quantity: number }[];
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}
