import { api } from './api';
import { ApiEnvelope, AuthResponse } from '@/types/auth.types';
import { LoginFormValues, RegisterFormValues } from '@/utils/authSchemas';

export const authApi = {
  register: async (payload: Omit<RegisterFormValues, 'confirmPassword'>) => {
    const { data } = await api.post<ApiEnvelope<AuthResponse>>('/auth/register', payload);
    return data.data as AuthResponse;
  },
  login: async (payload: LoginFormValues) => {
    const { data } = await api.post<ApiEnvelope<AuthResponse>>('/auth/login', payload);
    return data.data as AuthResponse;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
  forgotPassword: async (email: string) => {
    const { data } = await api.post<ApiEnvelope<null>>('/auth/forgot-password', { email });
    return data;
  },
  resetPassword: async (token: string, password: string) => {
    const { data } = await api.patch<ApiEnvelope<null>>(`/auth/reset-password/${token}`, { password });
    return data;
  },
};
