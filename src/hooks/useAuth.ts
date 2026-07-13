import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authApi } from '@/services/authApi';
import { useAuthStore } from '@/store/authStore';
import { LoginFormValues, RegisterFormValues } from '@/utils/authSchemas';

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (values: LoginFormValues) => authApi.login(values),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success(`Welcome back, ${data.user.name}!`);
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Login failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (values: RegisterFormValues) => {
      const { confirmPassword: _confirmPassword, ...payload } = values;
      return authApi.register(payload);
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success('Account created successfully!');
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Registration failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      toast.success('Logged out successfully');
    },
  });
};
