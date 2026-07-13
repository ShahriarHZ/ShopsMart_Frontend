import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export const CheckoutCancelPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <XCircle className="mx-auto text-error mb-4" size={56} />
        <h1 className="text-2xl font-bold mb-2">Checkout cancelled</h1>
        <p className="text-base-content/60 mb-6">
          No worries — your cart is still saved. You can pick up where you left off anytime.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/cart" className="btn btn-primary">Back to cart</Link>
          <Link to="/products" className="btn btn-outline">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
};
