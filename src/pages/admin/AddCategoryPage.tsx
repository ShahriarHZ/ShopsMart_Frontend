import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FolderPlus } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput';
import { useCreateCategory } from '@/hooks/useAdminProducts';

interface CategoryFormValues {
  name: string;
  description?: string;
}

export const AddCategoryPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>();

  const onSubmit = (values: CategoryFormValues) => {
    mutate(values, {
      onSuccess: () => navigate('/admin/products/new'),
    });
  };

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-2 mb-6">
          <FolderPlus className="text-primary" />
          <h1 className="text-2xl font-bold">Add Category</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <FormInput label="Name" placeholder="e.g. Laptops" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />

            <div className="form-control w-full">
              <label className="label pb-1"><span className="label-text font-medium">Description (optional)</span></label>
              <textarea
                {...register('description')}
                className="textarea textarea-bordered w-full min-h-[80px]"
                placeholder="Short description of this category..."
              />
            </div>

            <button type="submit" disabled={isPending} className="btn btn-primary mt-2 gap-2">
              {isPending && <span className="loading loading-spinner loading-sm" />}
              {isPending ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-base-content/50 mt-4">
          After this, go to <span className="font-medium">Add Product</span> — your new category will show up in the dropdown.
        </p>
      </div>
    </div>
  );
};
