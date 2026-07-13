import { Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import {
  ShoppingBag,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
} from 'lucide-react';
import toast from 'react-hot-toast';

const shopLinks = [
  { label: 'All Products', to: '/products' },
  { label: 'Featured', to: '/products?featured=true' },
  { label: 'New Arrivals', to: '/products?newArrival=true' },
  { label: 'Wishlist', to: '/wishlist' },
];

const accountLinks = [
  { label: 'My Account', to: '/account' },
  { label: 'Order History', to: '/orders' },
  { label: 'Cart', to: '/cart' },
  { label: 'Sign In', to: '/login' },
];

const companyLinks = [
  { label: 'About Us', to: '/' },
  { label: 'Contact', to: '/' },
  { label: 'Careers', to: '/' },
  { label: 'Blog', to: '/' },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Secure payments' },
  { icon: Truck, label: 'Fast shipping' },
  { icon: CreditCard, label: 'Easy returns' },
];

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're subscribed! Watch for offers soon.");
    setEmail('');
  };

  return (
    <footer className="bg-base-100 border-t border-base-300">
      {/* Newsletter strip */}
      <div className="border-b border-base-300">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-lg font-semibold">Get the first look at new arrivals</h3>
            <p className="text-sm text-base-content/50 mt-1">Occasional emails, no spam. Unsubscribe anytime.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2 max-w-sm">
            <label className="input input-bordered flex items-center gap-2 flex-1">
              <Mail size={15} className="text-base-content/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="grow"
                required
              />
            </label>
            <button type="submit" className="btn btn-primary gap-1.5 shrink-0">
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-14 grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 text-lg font-display font-bold mb-3">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-primary-content">
              <ShoppingBag size={16} />
            </span>
            ShopSmart AI
          </Link>
          <p className="text-sm text-base-content/50 max-w-xs">
            Premium products, matched to you by an AI assistant that actually gets what you're looking for.
          </p>
          <div className="flex gap-2 mt-4">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn btn-circle btn-sm btn-ghost"
                aria-label="Social link"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Shop</h4>
          <ul className="space-y-2">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-base-content/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Account</h4>
          <ul className="space-y-2">
            {accountLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-base-content/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-base-content/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-base-300">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-base-content/50">
              <Icon size={15} className="text-primary" /> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-300">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-base-content/40">
          <p>© {new Date().getFullYear()} ShopSmart AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
