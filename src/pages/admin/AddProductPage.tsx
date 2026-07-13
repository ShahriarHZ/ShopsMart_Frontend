import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PackagePlus } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput';
import { useCategories } from '@/hooks/useProducts';
import { useCreateProduct } from '@/hooks/useAdminProducts';
import { CreateProductInput } from '@/services/adminProductApi';

export const AddProductPage = () => {
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  const { mutate, isPending } = useCreateProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>();

  const onSubmit = (values: CreateProductInput) => {
    mutate(values, {
      onSuccess: (product) => navigate(`/products/${product.slug}`),
    });
  };

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <PackagePlus className="text-primary" />
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <FormInput label="Title" {...register('title', { required: 'Title is required' })} error={errors.title?.message} />

            <div className="form-control w-full">
              <label className="label pb-1"><span className="label-text font-medium">Description</span></label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                className="textarea textarea-bordered w-full min-h-[100px]"
                placeholder="Describe the product..."
              />
              {errors.description && <span className="label-text-alt text-error mt-1">{errors.description.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Brand" {...register('brand', { required: 'Brand is required' })} error={errors.brand?.message} />
              <div className="form-control w-full">
                <label className="label pb-1"><span className="label-text font-medium">Category</span></label>
                <select {...register('category', { required: true })} className="select select-bordered w-full">
                  <option value="">Select category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormInput label="Price ($)" type="number" step="0.01" {...register('price', { required: true, valueAsNumber: true })} />
              <FormInput label="Discount (%)" type="number" defaultValue={0} {...register('discount', { valueAsNumber: true })} />
              <FormInput label="Stock" type="number" {...register('stock', { required: true, valueAsNumber: true })} />
            </div>

            <FormInput label="SKU" {...register('sku', { required: 'SKU is required' })} error={errors.sku?.message} />

            <div className="form-control w-full">
              <label className="label pb-1"><span className="label-text font-medium">Images</span></label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                {...register('images', { required: 'At least one image is required' })}
                className="file-input file-input-bordered w-full"
              />
              {errors.images && <span className="label-text-alt text-error mt-1">{errors.images.message as string}</span>}
            </div>

            <div className="flex gap-6 pt-2">
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" {...register('featured')} className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text">Featured</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" {...register('bestseller')} className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text">Bestseller</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" {...register('newArrival')} className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text">New Arrival</span>
              </label>
            </div>

            <button type="submit" disabled={isPending} className="btn btn-primary mt-4 gap-2">
              {isPending && <span className="loading loading-spinner loading-sm" />}
              {isPending ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
