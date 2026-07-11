import { useEffect, useRef, useState, useCallback } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import gsap from 'gsap';

const BEBIDAS = [
  { title: 'Chicha morada',  price: 'S/ 1.50', image: '/images/chicha-morada.jpg' },
  { title: 'Cebada',         price: 'S/ 1.50', badge: 'Jarra S/ 5.00' },
  { title: 'Café',           price: 'S/ 2.00' },
  { title: 'Infusiones',     price: 'S/ 2.00' },
];

export function BebidasSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
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
      aria-label="Bebidas"
    >
      <SectionHeader title="Bebidas" count="4 refrescos naturales" />

      <div
        ref={cardsRef}
        className="cards-scroll"
        onScroll={handleScroll}
        role="list"
        aria-label="Lista de bebidas"
      >
        {BEBIDAS.map((bebida, i) => (
          <div key={i} role="listitem">
            <GlassCard
              title={bebida.title}
              price={bebida.price}
              image={bebida.image}
              badge={bebida.badge}
              variant="large"
            />
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
            background: 'linear-gradient(90deg, #1a237e, #7c4dff)',
            boxShadow: '0 0 6px rgba(124,77,255,0.5)',
          }}
        />
      </div>
    </section>
  );
}
