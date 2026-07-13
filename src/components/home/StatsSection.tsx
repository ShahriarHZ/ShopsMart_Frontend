import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { value: 12000, suffix: '+', label: 'Happy customers' },
  { value: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
  { value: 50000, suffix: '+', label: 'Orders shipped' },
  { value: 24, suffix: '/7', label: 'AI assistant support' },
];

const Counter = ({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="border-y border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-display text-3xl sm:text-4xl font-bold text-primary">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="text-sm text-base-content/50 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
