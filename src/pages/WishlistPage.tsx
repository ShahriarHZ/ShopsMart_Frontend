import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useWishlist, useRemoveFromWishlist, useMoveToCart } from '@/hooks/useWishlist';

export const WishlistPage = () => {
  const { data, isLoading } = useWishlist();
  const { mutate: remove } = useRemoveFromWishlist();
  const { mutate: moveToCart } = useMoveToCart();

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-base-300 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const products = data?.products ?? [];

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <Heart className="mx-auto text-base-content/30 mb-3" size={48} />
        <p className="text-lg text-base-content/60">Your wishlist is empty.</p>
        <Link to="/products" className="btn btn-primary mt-4">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product._id} className="card bg-base-100 border border-base-300 overflow-hidden relative">
              <button
                onClick={() => remove(product._id)}
                className="absolute top-2 right-2 z-10 btn btn-circle btn-sm bg-base-100/90"
                aria-label="Remove from wishlist"
              >
                <X size={14} />
              </button>
              <Link to={`/products/${product.slug}`} className="aspect-square bg-base-200 block">
                {product.images[0] && (
                  <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
                )}
              </Link>
              <div className="card-body p-3 gap-1">
                <Link to={`/products/${product.slug}`} className="font-medium text-sm line-clamp-1 hover:text-primary">
                  {product.title}
                </Link>
                <p className="font-semibold">${product.finalPrice.toFixed(2)}</p>
                <button
                  onClick={() => moveToCart(product._id)}
                  className="btn btn-primary btn-sm mt-1 gap-1.5"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={14} /> Move to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
