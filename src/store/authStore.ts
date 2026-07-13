import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  updateUser: (partial: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
      setAccessToken: (accessToken) => set({ accessToken, isAuthenticated: true }),
      updateUser: (partial) => set((state) => ({ user: state.user ? { ...state.user, ...partial } : state.user })),
      logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'shopsmart-auth',
      // Persist isAuthenticated itself so a hard page reload (e.g. Stripe redirecting back)
      // doesn't silently reset it to false while a perfectly valid token/user still exist.
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      // Extra safety net: even if storage ever gets out of sync, recompute isAuthenticated
      // from the actual data (user + accessToken) right after rehydration rather than
      // trusting a flag that could theoretically drift from the source of truth.
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!(state.user && state.accessToken);
        }
      },
    }
  )
);
