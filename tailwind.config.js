/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="shopsmart-dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#ebefff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'shopsmart-light': {
          primary: '#4f46e5',
          'primary-content': '#ffffff',
          secondary: '#f472b6',
          accent: '#22d3ee',
          neutral: '#1e293b',
          'base-100': '#ffffff',
          'base-200': '#f8fafc',
          'base-300': '#e2e8f0',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
      {
        'shopsmart-dark': {
          primary: '#818cf8',
          'primary-content': '#0f172a',
          secondary: '#f9a8d4',
          accent: '#67e8f9',
          neutral: '#e2e8f0',
          'base-100': '#0f172a',
          'base-200': '#1e293b',
          'base-300': '#334155',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#f87171',
        },
      },
    ],
    darkTheme: 'shopsmart-dark',
  },
};
