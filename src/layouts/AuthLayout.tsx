import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center bg-gradient-to-br from-primary/5 via-base-200 to-secondary/5 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 text-xl font-bold">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary text-primary-content">
            <ShoppingBag size={20} />
          </span>
          ShopSmart AI
        </Link>
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-base-content/60 -mt-1">{subtitle}</p>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
