import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SectionHeaderProps {
  title: string;
  count: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function SectionHeader({ title, count, subtitle, icon }: SectionHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);
  const metaRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1 })
      .fromTo(barRef.current,   { width: 0, opacity: 0 }, { width: '80px', opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(metaRef.current,  { opacity: 0, y: 8 },    { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="mb-6 px-2 md:px-4">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="text-amber-400 opacity-80">{icon}</span>
        )}
        <h2
          ref={titleRef}
          className="font-serif text-4xl md:text-5xl text-white font-bold opacity-0"
          style={{ textShadow: '0 2px 20px rgba(255,61,0,0.2)' }}
        >
          {title}
        </h2>
      </div>

      {/* Animated gold bar */}
      <div
        ref={barRef}
        className="mt-3 h-[2px] rounded-full opacity-0"
        style={{
          width: 0,
          background: 'linear-gradient(90deg, #ff3d00, #ffb300)',
          boxShadow: '0 0 8px rgba(255,179,0,0.5)',
        }}
      />

      <p ref={metaRef} className="mt-2 text-sm text-white/50 font-sans font-light tracking-widest uppercase opacity-0">
        {count}
        {subtitle && <span className="ml-2 text-white/30 normal-case tracking-normal">{subtitle}</span>}
      </p>
    </div>
  );
}
