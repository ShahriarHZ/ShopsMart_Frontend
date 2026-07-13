import { motion } from 'framer-motion';
import { Sparkles, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Shopping Assistant',
    desc: 'Get personalized recommendations, product comparisons, and gift ideas in plain English.',
  },
  {
    icon: Truck,
    title: 'Fast, Tracked Delivery',
    desc: 'Real-time order tracking from checkout to your doorstep.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    desc: 'Stripe-powered payments with bank-level encryption on every order.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: 'Hassle-free refunds and exchanges, no fine print.',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="card bg-base-100 border border-base-300 hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="card-body">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-2">
                <Icon size={20} />
              </div>
              <h3 className="card-title text-base font-display">{title}</h3>
              <p className="text-sm text-base-content/60">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
