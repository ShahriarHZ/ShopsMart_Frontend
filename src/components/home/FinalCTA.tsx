import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content p-10 sm:p-16 text-center"
      >
        {/* animated sheen sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold mb-3">Ready to explore the collection?</h2>
          <p className="opacity-90 mb-6">Curated tech, fashion, and lifestyle picks — updated daily.</p>
          <Link to="/products" className="btn btn-lg bg-base-100 text-base-content hover:bg-base-200 border-none gap-2">
            Browse all products <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
