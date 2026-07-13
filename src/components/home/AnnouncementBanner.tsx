import { Sparkles, Truck, ShieldCheck, Tag } from 'lucide-react';

const announcements = [
  { icon: Truck, text: 'Free shipping on orders over $50' },
  { icon: Tag, text: 'New arrivals dropping every week' },
  { icon: Sparkles, text: 'Ask the AI assistant for gift ideas' },
  { icon: ShieldCheck, text: 'Secure checkout, every order' },
];

export const AnnouncementBanner = () => {
  const track = [...announcements, ...announcements];

  return (
    <div className="bg-neutral text-neutral-content overflow-hidden py-2 relative">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {track.map(({ icon: Icon, text }, i) => (
              <div key={`${copy}-${i}`} className="flex items-center gap-2 px-8 text-xs font-medium tracking-wide whitespace-nowrap">
                <Icon size={13} className="opacity-70" />
                {text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
