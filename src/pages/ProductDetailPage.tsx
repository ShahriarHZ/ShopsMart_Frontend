import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useProduct, useRelatedProducts } from '@/hooks/useProducts';
import { useAddToCart } from '@/hooks/useCart';
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from '@/hooks/useWishlist';
import { useAuthStore } from '@/store/authStore';
import { ProductCard } from '@/components/product/ProductCard';
import { ReviewSection } from '@/components/product/ReviewSection';

export const ProductDetailPage = () => {
  const { slug = '' } = useParams();
  const { data: product, isLoading } = useProduct(slug);
  const { data: related } = useRelatedProducts(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { data: wishlist } = useWishlist();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();

  const isWishlisted = !!product && !!wishlist?.products.some((p) => p._id === product._id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-2xl bg-base-300 animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-base-300 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-base-300 rounded animate-pulse" />
          <div className="h-24 bg-base-300 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-lg text-base-content/60">Product not found.</p>
        <Link to="/products" className="btn btn-primary mt-4">Back to shop</Link>
      </div>
    );
  }

  const hasDiscount = product.discount > 0;
  const categoryName = typeof product.category === 'string' ? undefined : product.category.name;

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/products" className="btn btn-ghost btn-sm gap-1 mb-4">
          <ChevronLeft size={16} /> Back to shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-base-100 border border-base-300 mb-3">
              {product.images[activeImage] && (
                <img
                  src={product.images[activeImage].url}
                  alt={product.images[activeImage].alt || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.publicId}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      i === activeImage ? 'border-primary' : 'border-base-300'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {categoryName && <span className="badge badge-outline mb-2">{categoryName}</span>}
            <p className="text-sm uppercase tracking-wide text-base-content/50">{product.brand}</p>
            <h1 className="text-3xl font-bold mt-1">{product.title}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 text-sm">
                <Star size={16} className="fill-warning text-warning" />
                <span className="font-medium">{product.ratingsAverage.toFixed(1)}</span>
              </div>
              <span className="text-sm text-base-content/50">({product.ratingsCount} reviews)</span>
              {product.stock > 0 ? (
                <span className="badge badge-success badge-outline ml-2">In Stock</span>
              ) : (
                <span className="badge badge-error badge-outline ml-2">Out of Stock</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-bold">${product.finalPrice.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-base-content/40 line-through">${product.price.toFixed(2)}</span>
                  <span className="badge badge-error text-white border-none">-{product.discount}%</span>
                </>
              )}
            </div>

            <p className="text-base-content/70 mt-5 leading-relaxed">{product.description}</p>

            {(product.colors.length > 0 || product.sizes.length > 0) && (
              <div className="mt-5 space-y-3">
                {product.colors.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1.5">Color</p>
                    <div className="flex gap-2">
                      {product.colors.map((c) => (
                        <span key={c} className="badge badge-lg">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
                {product.sizes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1.5">Size</p>
                    <div className="flex gap-2">
                      {product.sizes.map((s) => (
                        <span key={s} className="badge badge-lg badge-outline">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 mt-8">
              <div className="join">
                <button
                  className="btn btn-sm join-item"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="btn btn-sm join-item pointer-events-none w-10">{quantity}</span>
                <button
                  className="btn btn-sm join-item"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="btn btn-primary flex-1 gap-2"
                disabled={product.stock === 0 || isAddingToCart}
                onClick={() => {
                  if (!isAuthenticated) {
                    window.location.href = '/login';
                    return;
                  }
                  addToCart({ productId: product._id, quantity });
                }}
              >
                {isAddingToCart ? <span className="loading loading-spinner loading-sm" /> : <ShoppingCart size={18} />}
                Add to Cart
              </button>
              <button
                className={`btn btn-square ${isWishlisted ? 'btn-primary' : 'btn-outline'}`}
                aria-label="Toggle wishlist"
                onClick={() => {
                  if (!isAuthenticated) {
                    window.location.href = '/login';
                    return;
                  }
                  if (isWishlisted) removeFromWishlist(product._id);
                  else addToWishlist(product._id);
                }}
              >
                <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 text-sm text-base-content/60">
              <div className="flex items-center gap-2"><Truck size={16} /> Free shipping over $50</div>
              <div className="flex items-center gap-2"><ShieldCheck size={16} /> Secure checkout</div>
            </div>

            {product.specifications.length > 0 && (
              <div className="mt-8">
                <h2 className="font-semibold mb-2">Specifications</h2>
                <table className="table table-sm">
                  <tbody>
                    {product.specifications.map((spec) => (
                      <tr key={spec.key}>
                        <td className="text-base-content/50">{spec.key}</td>
                        <td className="font-medium">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <ReviewSection productId={product._id} />

        {related && related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
