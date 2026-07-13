import { Link } from 'react-router-dom';
import { ShoppingBag, Moon, Sun, User, LogOut, Heart, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useLogout } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

export const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { mutate: logout } = useLogout();
  const { data: cartData } = useCart();
  const { data: wishlistData } = useWishlist();

  const cartCount = cartData?.cart.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const wishlistCount = wishlistData?.products.length ?? 0;

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-300 sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary text-primary-content">
            <ShoppingBag size={20} />
          </span>
          <span className="hidden sm:inline">ShopSmart AI</span>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-1 text-sm font-medium">
          <li><Link to="/products">Shop</Link></li>
          <li><Link to="/products?featured=true">Featured</Link></li>
          <li><Link to="/products?newArrival=true">New Arrivals</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === 'shopsmart-light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {isAuthenticated && (
          <>
            <Link to="/wishlist" className="btn btn-ghost btn-circle" aria-label="Wishlist">
              <div className="indicator">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="indicator-item badge badge-primary badge-xs">{wishlistCount}</span>
                )}
              </div>
            </Link>
            <Link to="/cart" className="btn btn-ghost btn-circle" aria-label="Cart">
              <div className="indicator">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="indicator-item badge badge-primary badge-xs">{cartCount}</span>
                )}
              </div>
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              {user?.avatar ? (
                <div className="w-9 rounded-full">
                  <img src={user.avatar} alt={user.name} />
                </div>
              ) : (
                <div className="bg-primary text-primary-content rounded-full w-9">
                  <span className="text-sm">{user?.name?.[0]?.toUpperCase() ?? <User size={16} />}</span>
                </div>
              )}
            </button>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow-lg mt-3 w-48 p-2 border border-base-300">
              <li className="px-3 py-1.5 text-xs text-base-content/50">{user?.email}</li>
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/orders">Order History</Link></li>
              {user?.role === 'admin' && (
                <>
                  <li><Link to="/admin/dashboard">Dashboard</Link></li>
                  <li><Link to="/admin/orders">Manage Orders</Link></li>
                  <li><Link to="/admin/coupons">Coupons</Link></li>
                  <li><Link to="/admin/categories/new">Add Category</Link></li>
                  <li><Link to="/admin/products/new">Add Product</Link></li>
                </>
              )}
              <li>
                <button onClick={() => logout()} className="text-error flex items-center gap-2">
                  <LogOut size={14} /> Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">Sign in</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
};
