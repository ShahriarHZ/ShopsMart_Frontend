import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';
import { useCategories } from '@/hooks/useProducts';

const GRADIENTS = [
  'from-primary/20 to-primary/5',
  'from-secondary/20 to-secondary/5',
  'from-accent/20 to-accent/5',
  'from-info/20 to-info/5',
  'from-success/20 to-success/5',
  'from-warning/20 to-warning/5',
];

export const CategoryShowcase = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading || !categories || categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Browse</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Shop by category</h2>
        </div>
        <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((category, i) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <Link
              to={`/products?category=${category._id}`}
              className={`group flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${
                GRADIENTS[i % GRADIENTS.length]
              } border border-base-300 aspect-square p-4 text-center hover:shadow-md transition-shadow`}
            >
              <div className="w-12 h-12 rounded-xl bg-base-100 grid place-items-center shadow-sm group-hover:scale-110 transition-transform">
                <Layers size={20} className="text-base-content/60" />
              </div>
              <span className="text-sm font-medium line-clamp-1">{category.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
