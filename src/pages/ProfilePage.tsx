import { useRef, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, User as UserIcon, Lock, Shield } from 'lucide-react';
import { FormInput } from '@/components/ui/FormInput';
import { useAuthStore } from '@/store/authStore';
import { useUpdateProfile, useUpdateAvatar, useChangePassword } from '@/hooks/useProfile';

interface ProfileFormValues {
  name: string;
  email: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { mutate: updateProfile, isPending: isSavingProfile } = useUpdateProfile();
  const { mutate: updateAvatar, isPending: isUploadingAvatar } = useUpdateAvatar();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();

  const profileForm = useForm<ProfileFormValues>({
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '' },
  });
  const passwordForm = useForm<PasswordFormValues>();

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    updateAvatar(file);
  };

  const onSaveProfile = (values: ProfileFormValues) => {
    updateProfile(values);
  };

  const onChangePassword = (values: PasswordFormValues) => {
    if (values.newPassword !== values.confirmNewPassword) {
      passwordForm.setError('confirmNewPassword', { message: 'Passwords do not match' });
      return;
    }
    changePassword(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      { onSuccess: () => passwordForm.reset() }
    );
  };

  if (!user) return null;

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center gap-2">
          <UserIcon className="text-primary" />
          <h1 className="text-2xl font-bold">My Account</h1>
          {user.role === 'admin' && (
            <span className="badge badge-primary gap-1 ml-1">
              <Shield size={12} /> Admin
            </span>
          )}
        </div>

        {/* Avatar */}
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body items-center text-center gap-3">
            <div className="relative">
              <div className="avatar">
                <div className="w-24 rounded-full bg-base-300 ring ring-primary ring-offset-base-100 ring-offset-2">
                  {avatarPreview || user.avatar ? (
                    <img src={avatarPreview ?? user.avatar} alt={user.name} />
                  ) : (
                    <div className="grid place-items-center w-full h-full text-3xl font-semibold text-base-content/50">
                      {user.name[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleAvatarClick}
                disabled={isUploadingAvatar}
                className="btn btn-circle btn-primary btn-sm absolute bottom-0 right-0"
                aria-label="Change profile picture"
              >
                {isUploadingAvatar ? <span className="loading loading-spinner loading-xs" /> : <Camera size={14} />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-base-content/50">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile info */}
        <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h2 className="card-title text-base">Profile Information</h2>
            <FormInput label="Full name" {...profileForm.register('name', { required: 'Required' })} error={profileForm.formState.errors.name?.message} />
            <FormInput label="Email" type="email" {...profileForm.register('email', { required: 'Required' })} error={profileForm.formState.errors.email?.message} />
            <button type="submit" disabled={isSavingProfile} className="btn btn-primary self-start gap-2">
              {isSavingProfile && <span className="loading loading-spinner loading-sm" />}
              Save changes
            </button>
          </div>
        </form>

        {/* Change password */}
        <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h2 className="card-title text-base flex items-center gap-2">
              <Lock size={16} /> Change Password
            </h2>
            <FormInput
              label="Current password"
              type="password"
              {...passwordForm.register('currentPassword', { required: 'Required' })}
              error={passwordForm.formState.errors.currentPassword?.message}
            />
            <FormInput
              label="New password"
              type="password"
              {...passwordForm.register('newPassword', { required: 'Required', minLength: { value: 8, message: 'At least 8 characters' } })}
              error={passwordForm.formState.errors.newPassword?.message}
            />
            <FormInput
              label="Confirm new password"
              type="password"
              {...passwordForm.register('confirmNewPassword', { required: 'Required' })}
              error={passwordForm.formState.errors.confirmNewPassword?.message}
            />
            <button type="submit" disabled={isChangingPassword} className="btn btn-outline self-start gap-2">
              {isChangingPassword && <span className="loading loading-spinner loading-sm" />}
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
