interface NavArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  showPrev: boolean;
  showNext: boolean;
  prevLabel?: string;
  nextLabel?: string;
}

export function NavArrows({ onPrev, onNext, showPrev, showNext, prevLabel = '', nextLabel = '' }: NavArrowsProps) {
  return (
    <>
      {/* Previous arrow */}
      <button
        onClick={onPrev}
        aria-label={prevLabel ? `Ir a: ${prevLabel}` : 'Sección anterior'}
        className={`
          fixed left-5 top-1/2 -translate-y-1/2 z-50
          w-11 h-11 glass-nav rounded-full
          flex items-center justify-center
          text-white/70 hover:text-amber-400
          transition-all duration-300
          hidden md:flex
          ${showPrev ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{ transitionProperty: 'opacity, background, border-color, color, box-shadow' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={onNext}
        aria-label={nextLabel ? `Ir a: ${nextLabel}` : 'Sección siguiente'}
        className={`
          fixed right-5 top-1/2 -translate-y-1/2 z-50
          w-11 h-11 glass-nav rounded-full
          flex items-center justify-center
          text-white/70 hover:text-amber-400
          transition-all duration-300
          hidden md:flex
          ${showNext ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{ transitionProperty: 'opacity, background, border-color, color, box-shadow' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </>
  );
}
