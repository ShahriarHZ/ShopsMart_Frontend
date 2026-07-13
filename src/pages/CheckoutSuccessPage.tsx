import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { checkoutApi } from '@/services/cartApi';
import { CartWithTotals } from '@/types/cart.types';

type ConfirmState = 'confirming' | 'success' | 'error';

export const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const queryClient = useQueryClient();
  const [state, setState] = useState<ConfirmState>('confirming');
  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setState('error');
      return;
    }
    if (hasConfirmed.current) return;
    hasConfirmed.current = true;

    checkoutApi
      .confirmSession(sessionId)
      .then(() => {
        setState('success');
        // Update the UI instantly instead of waiting for a background refetch
        queryClient.setQueryData<CartWithTotals>(['cart'], (old) =>
          old
            ? { cart: { ...old.cart, items: [] }, pricing: { subtotal: 0, shippingCost: 0, tax: 0, discount: 0, total: 0 } }
            : old
        );
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      })
      .catch(() => setState('error'));
  }, [sessionId, queryClient]);

  if (state === 'confirming') {
    return (
      <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-primary mb-4" size={48} />
          <p className="text-base-content/60">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="mx-auto text-warning mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Couldn't confirm automatically</h1>
          <p className="text-base-content/60 mb-6">
            If your card was charged, your order will still show up shortly — check your order history in a moment.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/orders" className="btn btn-primary">Check my orders</Link>
            <Link to="/products" className="btn btn-outline">Continue shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle2 className="mx-auto text-success mb-4" size={56} />
        <h1 className="text-2xl font-bold mb-2">Payment successful!</h1>
        <p className="text-base-content/60 mb-6">
          Thank you for your order — a confirmation is on its way.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/orders" className="btn btn-primary">View my orders</Link>
          <Link to="/products" className="btn btn-outline">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
};
