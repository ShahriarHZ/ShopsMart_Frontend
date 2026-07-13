import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product.types';
import { useAddToCart } from '@/hooks/useCart';
import { useAuthStore } from '@/store/authStore';

export const ProductCard = ({ product }: { product: Product }) => {
  const hasDiscount = product.discount > 0;
  const { mutate: addToCart, isPending } = useAddToCart();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="card bg-base-100 border border-base-300 hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-base-200 block">
        {product.images[0] && (
          <img
            src={product.images[0].url}
            alt={product.images[0].alt || product.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && <span className="badge badge-error text-white border-none font-semibold">-{product.discount}%</span>}
          {product.newArrival && <span className="badge badge-primary border-none font-semibold">New</span>}
          {product.bestseller && <span className="badge badge-warning border-none font-semibold">Bestseller</span>}
        </div>
      </Link>
      <div className="card-body p-4 gap-1">
        <p className="text-xs uppercase tracking-wide text-base-content/40">{product.brand}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-base-content/50">
          <Star size={14} className="fill-warning text-warning" />
          <span>{product.ratingsAverage.toFixed(1)}</span>
          <span>({product.ratingsCount})</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-lg">${product.finalPrice.toFixed(2)}</span>
            {hasDiscount && <span className="text-sm text-base-content/40 line-through">${product.price.toFixed(2)}</span>}
          </div>
          <button
            className="btn btn-circle btn-sm btn-primary"
            aria-label="Add to cart"
            disabled={product.stock === 0 || isPending}
            onClick={(e) => {
              e.preventDefault();
              if (!isAuthenticated) {
                window.location.href = '/login';
                return;
              }
              addToCart({ productId: product._id, quantity: 1 });
            }}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
        {product.stock === 0 && <span className="badge badge-ghost badge-sm mt-1">Out of stock</span>}
      </div>
    </div>
  );
};
