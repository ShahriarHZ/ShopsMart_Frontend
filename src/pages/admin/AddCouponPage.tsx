import { useForm } from 'react-hook-form';
import { Tag, Trash2 } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput';
import { useCoupons, useCreateCoupon, useDeleteCoupon } from '@/hooks/useAdmin';
import { Coupon } from '@/types/admin.types';

interface CouponFormValues {
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  usageLimit?: number;
  expiresAt?: string;
}

export const AddCouponPage = () => {
  const { data: coupons, isLoading } = useCoupons();
  const { mutate: createCoupon, isPending } = useCreateCoupon();
  const { mutate: deleteCoupon } = useDeleteCoupon();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponFormValues>({ defaultValues: { discountType: 'percentage' } });

  const onSubmit = (values: CouponFormValues) => {
    createCoupon(values as Partial<Coupon>, { onSuccess: () => reset() });
  };

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-center gap-2">
          <Tag className="text-primary" />
          <h1 className="text-2xl font-bold">Coupons</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h2 className="card-title text-base">Create Coupon</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Code"
                placeholder="SAVE20"
                {...register('code', { required: 'Required' })}
                error={errors.code?.message}
              />
              <div className="form-control w-full">
                <label className="label pb-1"><span className="label-text font-medium">Discount Type</span></label>
                <select {...register('discountType')} className="select select-bordered w-full">
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
            </div>
            <FormInput label="Description (optional)" {...register('description')} />
            <div className="grid grid-cols-3 gap-4">
              <FormInput
                label="Discount Value"
                type="number"
                step="0.01"
                {...register('discountValue', { required: true, valueAsNumber: true })}
              />
              <FormInput
                label="Min Purchase ($)"
                type="number"
                defaultValue={0}
                {...register('minPurchase', { valueAsNumber: true })}
              />
              <FormInput
                label="Usage Limit"
                type="number"
                placeholder="Unlimited"
                {...register('usageLimit', { valueAsNumber: true })}
              />
            </div>
            <FormInput label="Expires On (optional)" type="date" {...register('expiresAt')} />

            <button type="submit" disabled={isPending} className="btn btn-primary mt-2 gap-2">
              {isPending && <span className="loading loading-spinner loading-sm" />}
              {isPending ? 'Creating...' : 'Create Coupon'}
            </button>
          </div>
        </form>

        <div>
          <h2 className="text-lg font-semibold mb-3">Active Coupons</h2>
          {isLoading ? (
            <div className="h-24 bg-base-300 rounded-2xl animate-pulse" />
          ) : !coupons || coupons.length === 0 ? (
            <p className="text-sm text-base-content/50">No coupons yet.</p>
          ) : (
            <div className="space-y-2">
              {coupons.map((c) => (
                <div key={c._id} className="card bg-base-100 border border-base-300">
                  <div className="card-body p-4 flex-row items-center justify-between">
                    <div>
                      <p className="font-mono font-semibold">{c.code}</p>
                      <p className="text-xs text-base-content/50">
                        {c.discountType === 'percentage' ? `${c.discountValue}% off` : `$${c.discountValue} off`}
                        {c.minPurchase > 0 && ` · min $${c.minPurchase}`}
                        {' · '}
                        used {c.usedCount}
                        {c.usageLimit ? `/${c.usageLimit}` : ''}
                      </p>
                    </div>
                    <button onClick={() => deleteCoupon(c._id)} className="btn btn-ghost btn-sm btn-circle text-error">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
