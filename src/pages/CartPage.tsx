import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import { useCart, useUpdateCartItem, useRemoveCartItem, useApplyCoupon, useRemoveCoupon } from '@/hooks/useCart';
import { useAuthStore } from '@/store/authStore';

export const CartPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data, isLoading } = useCart();
  const { mutate: updateQty } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveCartItem();
  const { mutate: applyCoupon, isPending: isApplying } = useApplyCoupon();
  const { mutate: removeCoupon } = useRemoveCoupon();
  const [couponInput, setCouponInput] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="text-center py-24">
        <p className="text-lg text-base-content/60">Sign in to view your cart.</p>
        <Link to="/login" className="btn btn-primary mt-4">Sign in</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-base-300 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const items = data?.cart.items ?? [];
  const pricing = data?.pricing;

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <ShoppingBag className="mx-auto text-base-content/30 mb-3" size={48} />
        <p className="text-lg text-base-content/60">Your cart is empty.</p>
        <Link to="/products" className="btn btn-primary mt-4">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-5xl grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
          {items.map((item) => (
            <div key={item.product._id} className="card bg-base-100 border border-base-300">
              <div className="card-body flex-row items-center gap-4 p-4">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover bg-base-200"
                />
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.product.slug}`} className="font-medium hover:text-primary line-clamp-1">
                    {item.product.title}
                  </Link>
                  <p className="text-sm text-base-content/50">${item.price.toFixed(2)} each</p>
                  {(item.color || item.size) && (
                    <p className="text-xs text-base-content/40 mt-0.5">
                      {[item.color, item.size].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <div className="join">
                  <button
                    className="btn btn-sm join-item"
                    onClick={() => updateQty({ productId: item.product._id, quantity: Math.max(1, item.quantity - 1) })}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="btn btn-sm join-item pointer-events-none w-10">{item.quantity}</span>
                  <button
                    className="btn btn-sm join-item"
                    onClick={() => updateQty({ productId: item.product._id, quantity: item.quantity + 1 })}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="btn btn-ghost btn-sm btn-circle text-error"
                  onClick={() => removeItem(item.product._id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="card bg-base-100 border border-base-300 h-fit sticky top-20">
          <div className="card-body">
            <h2 className="card-title text-lg">Order Summary</h2>

            {data?.cart.couponCode ? (
              <div className="alert bg-success/10 border-success/30 py-2 px-3 text-sm flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tag size={14} /> {data.cart.couponCode} applied
                </span>
                <button onClick={() => removeCoupon()} aria-label="Remove coupon">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code"
                  className="input input-bordered input-sm flex-1"
                />
                <button
                  onClick={() => applyCoupon(couponInput)}
                  disabled={isApplying || !couponInput.trim()}
                  className="btn btn-outline btn-sm"
                >
                  Apply
                </button>
              </div>
            )}

            {pricing && (
              <div className="space-y-2 text-sm mt-2">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Subtotal</span>
                  <span>${pricing.subtotal.toFixed(2)}</span>
                </div>
                {pricing.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${pricing.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-base-content/60">Shipping</span>
                  <span>{pricing.shippingCost === 0 ? 'Free' : `$${pricing.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Tax</span>
                  <span>${pricing.tax.toFixed(2)}</span>
                </div>
                <div className="divider my-1" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${pricing.total.toFixed(2)}</span>
                </div>
              </div>
            )}
            <button onClick={() => navigate('/checkout')} className="btn btn-primary w-full mt-4 gap-2">
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
