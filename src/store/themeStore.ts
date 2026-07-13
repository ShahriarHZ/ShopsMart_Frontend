import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'shopsmart-light' | 'shopsmart-dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'shopsmart-light',
      toggleTheme: () => {
        const next: Theme = get().theme === 'shopsmart-light' ? 'shopsmart-dark' : 'shopsmart-light';
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.classList.toggle('dark', next === 'shopsmart-dark');
        set({ theme: next });
      },
    }),
    {
      name: 'shopsmart-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme);
          document.documentElement.classList.toggle('dark', state.theme === 'shopsmart-dark');
        }
      },
    }
  )
);
