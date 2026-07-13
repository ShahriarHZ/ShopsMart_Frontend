import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';

export const FeaturedProducts = () => {
  const { data, isLoading } = useProducts({ featured: true, limit: 4 });
  const products = data?.pages[0]?.items ?? [];

  if (isLoading || products.length === 0) return null;

  return (
    <section className="bg-base-200/50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-1 flex items-center gap-1.5">
              <Flame size={14} /> Trending now
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Featured products</h2>
          </div>
          <Link to="/products?featured=true" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
