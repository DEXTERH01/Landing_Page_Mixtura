import { useEffect, useRef, useState, useCallback } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import gsap from 'gsap';

const PLATOS = [
  { title: 'Chancho caja china',               price: 'S/ 20.00', image: '/images/chancho-caja-china.jpg' },
  { title: 'Chancho al cilindro',              price: 'S/ 20.00', image: '/images/chancho-cilindro.jpg' },
  { title: 'Anticuchos',                       price: 'S/ 12.00', image: '/images/anticuchos.jpg' },
  { title: 'Carapulcra + Sopa Seca',           price: 'S/ 12.00', image: '/images/carapulcra.jpg' },
  { title: 'Frejol con seco',                  price: 'S/ 12.00' },
  { title: 'Caldo de gallina',                 price: 'S/ 12.00', image: '/images/caldo-gallina.jpg' },
  { title: 'Arroz con Pollo + Papa a la Huancaína', price: 'S/ 12.00', image: '/images/arroz-pollo.jpg' },
  { title: 'Pollo Broster + papas/arroz',      price: 'S/ 12.00', image: '/images/pollo-broster.jpg' },
  { title: 'Alita Broster + papas/arroz',      price: 'S/ 10.00' },
  { title: 'Cau-Cau',                          price: 'S/ 10.00' },
  { title: 'Causa Limeña',                     price: 'S/ 7.00',  image: '/images/causa-limena.jpg' },
  { title: 'Papa Rellena',                     price: 'S/ 5.00' },
];

export function PlatosSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Entrance animation */
  useEffect(() => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.glass-card');
    gsap.fromTo(cards,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.06, duration: 0.55, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  /* Scroll progress tracker */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
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
      aria-label="Platos principales"
    >
      <SectionHeader title="Platos" count="12 especialidades" />

      {/* Cards carousel */}
      <div
        ref={scrollRef}
        className="cards-scroll"
        onScroll={handleScroll}
        role="list"
        aria-label="Lista de platos"
      >
        {PLATOS.map((plato, i) => (
          <div key={i} role="listitem">
            <GlassCard title={plato.title} price={plato.price} image={plato.image} />
          </div>
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-4 md:w-8" aria-hidden="true" />
      </div>

      {/* Scroll progress bar */}
      <div className="mt-4 mx-2 md:mx-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #ff3d00, #ffb300)',
            boxShadow: '0 0 6px rgba(255,179,0,0.5)',
          }}
        />
      </div>

      {/* Mobile swipe hint */}
      <p className="mt-2 text-center text-white/25 text-[10px] font-sans tracking-widest uppercase md:hidden">
        ← desliza para ver más →
      </p>
    </section>
  );
}
