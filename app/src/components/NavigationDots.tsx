interface NavigationDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
}

const LABELS = ['Inicio', 'Platos', 'Postres', 'Bebidas', 'Info'];

export function NavigationDots({ total, active, onDotClick }: NavigationDotsProps) {
  return (
    <nav
      aria-label="Secciones de la carta"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        const label    = LABELS[i] ?? `Sección ${i + 1}`;
        return (
          <button
            key={i}
            id={`nav-dot-${i}`}
            onClick={() => onDotClick(i)}
            aria-label={`Ir a: ${label}`}
            aria-current={isActive ? 'page' : undefined}
            title={label}
            className={`
              group relative rounded-full flex items-center justify-center
              transition-all duration-400 ease-out overflow-hidden
              ${isActive
                ? 'bg-amber-400 shadow-[0_0_12px_rgba(255,179,0,0.6)]'
                : 'bg-white/30 hover:bg-white/60'}
            `}
            style={{
              width:  isActive ? '32px' : '10px',
              height: '10px',
            }}
          >
            {/* Active label text */}
            {isActive && (
              <span
                className="text-black font-sans font-semibold leading-none whitespace-nowrap"
                style={{ fontSize: '9px', letterSpacing: '0.04em' }}
              >
                {label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
