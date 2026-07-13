import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Search, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const PROMPTS = [
  'a gaming laptop under $1200',
  'a birthday gift for my dad',
  'the phone with the best battery',
  'something cozy for winter',
  'accessories to go with my order',
];

const useTypingRotation = (words: string[], typingSpeed = 45, pause = 1400) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => setDisplay(current.slice(0, display.length + (deleting ? -1 : 1))),
        deleting ? typingSpeed / 2 : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, index, words, typingSpeed, pause]);

  return display;
};

export const HeroSection = () => {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const typed = useTypingRotation(PROMPTS);

  return (
    <section className="relative overflow-hidden bg-base-100">
      {/* Ambient glow field */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl animate-float" />
        <div
          className="absolute top-40 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-28 sm:pt-28 sm:pb-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="badge badge-primary badge-outline gap-1.5 py-3 px-4 mb-6"
        >
          <Sparkles size={14} /> Shopping, reimagined with AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          Find it faster.
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Shop smarter.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl mx-auto text-base-content/60 text-lg"
        >
          {user
            ? `Welcome back, ${user.name}. Pick up right where you left off.`
            : 'Tell the AI assistant what you need, in your own words — it finds the products.'}
        </motion.p>

        {/* Signature element: fake AI search bar with typing rotation */}
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          onClick={() => navigate('/products')}
          className="group mt-10 mx-auto flex items-center gap-3 w-full max-w-xl rounded-2xl border border-base-300 bg-base-100/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow px-5 py-4 text-left"
        >
          <Search size={18} className="text-base-content/40 shrink-0" />
          <span className="flex-1 text-base-content/50 text-sm sm:text-base truncate">
            I need <span className="text-base-content font-medium">{typed}</span>
            <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 -mb-0.5 animate-pulse" />
          </span>
          <span className="hidden sm:flex items-center gap-1 text-xs font-medium text-primary shrink-0">
            Ask AI <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          <Link to="/products" className="btn btn-primary btn-lg gap-2">
            Start Shopping <ArrowRight size={18} />
          </Link>
          {!user && (
            <Link to="/register" className="btn btn-outline btn-lg">
              Create an account
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};
