import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput';
import { useCart } from '@/hooks/useCart';
import { useCreateCheckoutSession } from '@/hooks/useCheckout';
import { ShippingAddress } from '@/types/cart.types';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { data: cartData, isLoading } = useCart();
  const { mutate: startCheckout, isPending } = useCreateCheckoutSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const onSubmit = (values: ShippingAddress) => {
    startCheckout(values);
  };

  if (isLoading) return null;

  if (!cartData || cartData.cart.items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-lg text-base-content/60">Your cart is empty — nothing to check out.</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary mt-4">Browse products</button>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-4xl grid md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h1 className="text-xl font-bold">Shipping Address</h1>
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Full name" {...register('fullName', { required: 'Required' })} error={errors.fullName?.message} />
              <FormInput label="Phone" {...register('phone', { required: 'Required' })} error={errors.phone?.message} />
            </div>
            <FormInput label="Address line 1" {...register('addressLine1', { required: 'Required' })} error={errors.addressLine1?.message} />
            <FormInput label="Address line 2 (optional)" {...register('addressLine2')} />
            <div className="grid grid-cols-3 gap-4">
              <FormInput label="City" {...register('city', { required: 'Required' })} error={errors.city?.message} />
              <FormInput label="State" {...register('state', { required: 'Required' })} error={errors.state?.message} />
              <FormInput label="Postal code" {...register('postalCode', { required: 'Required' })} error={errors.postalCode?.message} />
            </div>
            <FormInput label="Country" {...register('country', { required: 'Required' })} error={errors.country?.message} />

            <button type="submit" disabled={isPending} className="btn btn-primary w-full mt-2 gap-2">
              {isPending ? <span className="loading loading-spinner loading-sm" /> : <CreditCard size={16} />}
              {isPending ? 'Redirecting to payment...' : 'Continue to Payment'}
            </button>
            <p className="text-xs text-base-content/40 text-center">
              You'll be redirected to Stripe's secure checkout to enter payment details.
            </p>
          </div>
        </form>

        <div className="card bg-base-100 border border-base-300 h-fit">
          <div className="card-body">
            <h2 className="card-title text-lg">Order Summary</h2>
            <div className="space-y-2 text-sm mt-2">
              {cartData.cart.items.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <span className="text-base-content/60 line-clamp-1 pr-2">
                    {item.product.title} × {item.quantity}
                  </span>
                  <span className="whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="divider my-1" />
              <div className="flex justify-between">
                <span className="text-base-content/60">Shipping</span>
                <span>{cartData.pricing.shippingCost === 0 ? 'Free' : `$${cartData.pricing.shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Tax</span>
                <span>${cartData.pricing.tax.toFixed(2)}</span>
              </div>
              <div className="divider my-1" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${cartData.pricing.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
