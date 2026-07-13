import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { userApi } from '@/services/userApi';
import { useAuthStore } from '@/store/authStore';

const showError = (err: unknown, fallback: string) => {
  const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? fallback;
  toast.error(message);
};

export const useProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile,
    enabled: isAuthenticated,
  });
};

export const useUpdateProfile = () => {
  const updateUser = useAuthStore((s) => s.updateUser);
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (user) => {
      updateUser(user);
      toast.success('Profile updated');
    },
    onError: (err) => showError(err, 'Could not update profile'),
  });
};

export const useUpdateAvatar = () => {
  const updateUser = useAuthStore((s) => s.updateUser);
  return useMutation({
    mutationFn: userApi.updateAvatar,
    onSuccess: (user) => {
      updateUser(user);
      toast.success('Profile picture updated');
    },
    onError: (err) => showError(err, 'Could not upload image'),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: () => toast.success('Password changed successfully'),
    onError: (err) => showError(err, 'Could not change password'),
  });
};
