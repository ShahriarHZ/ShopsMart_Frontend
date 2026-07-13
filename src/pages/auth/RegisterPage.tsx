import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { FormInput } from '@/components/ui/FormInput';
import { registerFormSchema, RegisterFormValues } from '@/utils/authSchemas';
import { useRegister } from '@/hooks/useAuth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerFormSchema) });

  const onSubmit = (values: RegisterFormValues) => {
    mutate(values, { onSuccess: () => navigate('/') });
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join ShopSmart AI in seconds">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput label="Full name" placeholder="Jane Doe" {...register('name')} error={errors.name?.message} />
        <FormInput label="Email" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} />
        <FormInput label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
        <FormInput
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <button type="submit" disabled={isPending} className="btn btn-primary w-full gap-2">
          {isPending ? <span className="loading loading-spinner loading-sm" /> : <UserPlus size={16} />}
          {isPending ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <div className="divider text-xs text-base-content/40">OR</div>
      <p className="text-center text-sm text-base-content/60">
        Already have an account?{' '}
        <Link to="/login" className="link link-primary font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};
