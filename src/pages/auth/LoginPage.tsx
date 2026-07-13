import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthLayout } from '@/layouts/AuthLayout';
import { FormInput } from '@/components/ui/FormInput';
import { loginFormSchema, LoginFormValues } from '@/utils/authSchemas';
import { authApi } from '@/services/authApi';
import { useAuthStore } from '@/store/authStore';

type LoginMode = 'customer' | 'admin';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [mode, setMode] = useState<LoginMode>('customer');
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginFormSchema) });

  const switchMode = (next: LoginMode) => {
    setMode(next);
    reset();
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsPending(true);
    try {
      const data = await authApi.login(values);

      if (mode === 'admin' && data.user.role !== 'admin') {
        toast.error('This account does not have admin access.');
        return;
      }

      setAuth(data.user, data.accessToken);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(mode === 'admin' ? '/admin/products/new' : '/');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthLayout
      title={mode === 'admin' ? 'Admin Portal' : 'Welcome back'}
      subtitle={mode === 'admin' ? 'Restricted access — authorized personnel only' : 'Sign in to continue to ShopSmart AI'}
    >
      <div role="tablist" className="tabs tabs-boxed mb-5 bg-base-200">
        <button
          type="button"
          role="tab"
          onClick={() => switchMode('customer')}
          className={`tab gap-1.5 ${mode === 'customer' ? 'tab-active' : ''}`}
        >
          <UserIcon size={14} /> Customer
        </button>
        <button
          type="button"
          role="tab"
          onClick={() => switchMode('admin')}
          className={`tab gap-1.5 ${mode === 'admin' ? 'tab-active' : ''}`}
        >
          <ShieldCheck size={14} /> Admin
        </button>
      </div>

      {mode === 'admin' && (
        <div className="alert alert-info bg-info/10 border-info/30 text-sm mb-4">
          <ShieldCheck size={18} />
          <span>Admin accounts are provisioned separately and cannot be created through sign-up.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label={mode === 'admin' ? 'Admin Email' : 'Email'}
          type="email"
          placeholder={mode === 'admin' ? 'admin@shopsmart.ai' : 'you@example.com'}
          {...register('email')}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
        />

        {mode === 'customer' && (
          <div className="flex justify-end">
            <Link to="/forgot-password" className="link link-primary text-sm">
              Forgot password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`btn w-full gap-2 ${mode === 'admin' ? 'btn-neutral' : 'btn-primary'}`}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : mode === 'admin' ? (
            <ShieldCheck size={16} />
          ) : (
            <LogIn size={16} />
          )}
          {isPending ? 'Signing in...' : mode === 'admin' ? 'Sign in to Admin' : 'Sign in'}
        </button>
      </form>

      {mode === 'customer' && (
        <>
          <div className="divider text-xs text-base-content/40">OR</div>
          <p className="text-center text-sm text-base-content/60">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="link link-primary font-medium">
              Sign up
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
};
