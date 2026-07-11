import { useEffect, useRef } from 'react';
import { TypewriterText } from '@/components/TypewriterText';
import gsap from 'gsap';

interface HeroSectionProps {
  onOpenMenu: () => void;
}

export function HeroSection({ onOpenMenu }: HeroSectionProps) {
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);
  const dateRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLButtonElement>(null);
  const arrowRef    = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(titleRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' })
      .fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4')
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3')
      .fromTo(taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3')
      .fromTo(dateRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2')
      .fromTo(ctaRef.current,
        { opacity: 0, y: 12, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2')
      .fromTo(arrowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.1');

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 1rem',
        flexShrink: 0,
      }}
      aria-label="Bienvenida Mixtura 2026"
    >
      {/* Glass panel */}
      <div className="glass-panel px-8 py-12 md:px-14 md:py-14 max-w-[92vw] md:max-w-[580px] w-full text-center">

        {/* Cross / brand icon */}
        <div className="flex justify-center mb-5">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,61,0,0.12)', border: '1px solid rgba(255,61,0,0.3)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff3d00" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-serif text-[clamp(3.5rem,10vw,6.5rem)] font-bold text-white uppercase leading-none tracking-[0.04em] opacity-0"
          style={{ textShadow: '0 0 60px rgba(255,61,0,0.2)' }}
        >
          Mixtura
        </h1>

        {/* Gold divider */}
        <div
          ref={dividerRef}
          className="mx-auto mt-3 h-[1px] opacity-0"
          style={{
            width: '60px',
            transformOrigin: 'center',
            background: 'linear-gradient(90deg, transparent, #ffb300, transparent)',
            boxShadow: '0 0 8px rgba(255,179,0,0.4)',
          }}
        />

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-4 opacity-0">
          <h2 className="font-serif text-[clamp(1.2rem,3.5vw,2rem)] text-white/80 font-normal italic">
            Edición 2026
          </h2>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="mt-5 text-white/60 text-sm md:text-[0.95rem] leading-relaxed font-mono opacity-0 min-h-[3em]">
          <TypewriterText
            text="Construyamos juntos el Templo de la Iglesia Palabra de Vida"
            speed={45}
            delay={900}
          />
        </div>

        {/* Date + location */}
        <p
          ref={dateRef}
          className="mt-5 text-white/50 text-[10px] md:text-xs uppercase tracking-[0.22em] font-sans font-light opacity-0"
        >
          Domingo 20 de Julio · 6:00 a.m. · Chorrillos
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          id="hero-cta-btn"
          onClick={onOpenMenu}
          className="btn-cta mt-7 opacity-0"
        >
          Ver la Carta
        </button>
      </div>

      {/* Scroll indicator */}
      <div ref={arrowRef} className="absolute bottom-10 flex flex-col items-center gap-1 opacity-0">
        <span className="text-white/30 text-[9px] font-sans uppercase tracking-[0.2em]">Desliza</span>
        <div className="bounce-arrow text-white/40">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
