import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, PackageCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Tell it what you need',
    desc: 'Type naturally — "a lightweight laptop for travel" works just as well as a product name.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'AI narrows it down',
    desc: 'Get matched products, comparisons, and picks based on your budget and preferences.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Checkout & track',
    desc: 'Secure payment, then real-time tracking from confirmation to your door.',
  },
];

export const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">The process</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold">How AI shopping works</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* connecting line, desktop only */}
        <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40" />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-base-100 border border-base-300 shadow-sm grid place-items-center mb-4">
              <step.icon size={24} className="text-primary" />
            </div>
            <p className="font-display text-sm font-bold text-base-content/30 mb-1">{step.number}</p>
            <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-base-content/60 max-w-xs mx-auto">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
