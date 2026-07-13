import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Apply persisted theme before first paint to avoid a flash of the wrong theme
const persisted = localStorage.getItem('shopsmart-theme');
const theme = persisted ? (JSON.parse(persisted).state?.theme as string) : 'shopsmart-light';
document.documentElement.setAttribute('data-theme', theme ?? 'shopsmart-light');
document.documentElement.classList.toggle('dark', theme === 'shopsmart-dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
