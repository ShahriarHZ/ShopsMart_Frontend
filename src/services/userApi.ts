import { api } from './api';
import { ApiEnvelope } from '@/types/auth.types';
import { User } from '@/types/auth.types';

export const userApi = {
  getProfile: async () => {
    const { data } = await api.get<ApiEnvelope<User>>('/users/me');
    return data.data as User;
  },
  updateProfile: async (input: { name?: string; email?: string }) => {
    const { data } = await api.patch<ApiEnvelope<User>>('/users/me', input);
    return data.data as User;
  },
  updateAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await api.patch<ApiEnvelope<User>>('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data as User;
  },
  changePassword: async (input: { currentPassword: string; newPassword: string }) => {
    await api.patch('/users/me/password', input);
  },
};
