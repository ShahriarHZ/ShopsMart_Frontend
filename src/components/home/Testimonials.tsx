import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Amara O.', text: 'Asked the AI for a gift under $50 and it nailed it in two tries.', rating: 5 },
  { name: 'Devon P.', text: 'Checkout was the fastest I\'ve used — no account gymnastics.', rating: 5 },
  { name: 'Priya S.', text: 'Order tracking actually kept me updated without me checking.', rating: 5 },
  { name: 'Marco T.', text: 'Compared two laptops in seconds instead of ten tabs.', rating: 4 },
  { name: 'Yuki H.', text: 'Returns were genuinely painless. Would buy again.', rating: 5 },
];

const TestimonialCard = ({ t }: { t: (typeof testimonials)[number] }) => (
  <div className="w-80 shrink-0 card bg-base-100 border border-base-300 mx-2">
    <div className="card-body p-5">
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className={i < t.rating ? 'fill-warning text-warning' : 'text-base-300'} />
        ))}
      </div>
      <p className="text-sm text-base-content/70">&ldquo;{t.text}&rdquo;</p>
      <p className="text-xs font-medium text-base-content/40 mt-2">{t.name}</p>
    </div>
  </div>
);

export const Testimonials = () => {
  const track = [...testimonials, ...testimonials];

  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center mb-10 px-4">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Word of mouth</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold">What shoppers are saying</h2>
      </div>

      <div className="flex w-max animate-marquee-reverse">
        {track.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </section>
  );
};
