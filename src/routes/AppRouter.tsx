import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { CheckoutSuccessPage } from '@/pages/CheckoutSuccessPage';
import { CheckoutCancelPage } from '@/pages/CheckoutCancelPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { AddProductPage } from '@/pages/admin/AddProductPage';
import { AddCategoryPage } from '@/pages/admin/AddCategoryPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage';
import { AddCouponPage } from '@/pages/admin/AddCouponPage';
import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:slug', element: <ProductDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/checkout/success', element: <CheckoutSuccessPage /> },
      { path: '/checkout/cancel', element: <CheckoutCancelPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/cart', element: <CartPage /> },
          { path: '/wishlist', element: <WishlistPage /> },
          { path: '/checkout', element: <CheckoutPage /> },
          { path: '/orders', element: <OrdersPage /> },
          { path: '/account', element: <ProfilePage /> },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { path: '/admin/products/new', element: <AddProductPage /> },
          { path: '/admin/categories/new', element: <AddCategoryPage /> },
          { path: '/admin/dashboard', element: <AdminDashboardPage /> },
          { path: '/admin/orders', element: <AdminOrdersPage /> },
          { path: '/admin/coupons', element: <AddCouponPage /> },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
