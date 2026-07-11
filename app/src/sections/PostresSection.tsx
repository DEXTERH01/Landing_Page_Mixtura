import { useEffect, useRef, useState, useCallback } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import gsap from 'gsap';

const POSTRES = [
  { title: 'Queque de Naranja',              price: 'S/ 2.00' },
  { title: 'Queque de Chocolate',            price: 'S/ 2.00' },
  { title: 'Arroz con leche + Mazamorra',    price: 'S/ 3.00' },
  { title: 'Picarones',                      price: 'S/ 5.00', image: '/images/picarones.jpg' },
];

export function PostresSection() {
  const cardsRef  = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.glass-card');
    gsap.fromTo(cards,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.55, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const handleScroll = useCallback(() => {
    const el = cardsRef.current;
    if (!el) return;
    const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setScrollProgress(isNaN(pct) ? 0 : pct);
  }, []);

  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 1rem',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      aria-label="Postres"
    >
      <SectionHeader title="Postres" count="4 delicias dulces" />

      <div
        ref={cardsRef}
        className="cards-scroll"
        onScroll={handleScroll}
        role="list"
        aria-label="Lista de postres"
      >
        {POSTRES.map((postre, i) => (
          <div key={i} role="listitem">
            <GlassCard title={postre.title} price={postre.price} image={postre.image} variant="large" />
          </div>
        ))}
        <div className="flex-shrink-0 w-4 md:w-8" aria-hidden="true" />
      </div>

      {/* Progress bar */}
      <div className="mt-4 mx-2 md:mx-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #9c27b0, #e91e63)',
            boxShadow: '0 0 6px rgba(233,30,99,0.5)',
          }}
        />
      </div>
    </section>
  );
}
