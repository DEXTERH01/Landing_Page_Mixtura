import { useState } from 'react';

interface GlassCardProps {
  title: string;
  price: string;
  image?: string;
  badge?: string;
  variant?: 'normal' | 'large';
}

/* ---- Gradient fallbacks by category ---- */
const GRADIENTS = {
  platos:  'linear-gradient(145deg, #4a1500 0%, #8B2500 40%, #D2691E 100%)',
  postres: 'linear-gradient(145deg, #3a1060 0%, #7B2D8B 50%, #C1549C 100%)',
  bebidas: 'linear-gradient(145deg, #1a0a40 0%, #4A2080 50%, #8B5CF6 100%)',
};

function getGradient(title: string): string {
  const lower = title.toLowerCase();
  const desserts = ['queque', 'arroz con leche', 'mazamorra', 'picarones'];
  const drinks   = ['chicha', 'cebada', 'café', 'cafe', 'infusion', 'infusión'];
  if (desserts.some(d => lower.includes(d))) return GRADIENTS.postres;
  if (drinks.some(d => lower.includes(d)))   return GRADIENTS.bebidas;
  return GRADIENTS.platos;
}

/* ---- Category icons ---- */
function FoodIcon({ title }: { title: string }) {
  const lower = title.toLowerCase();

  if (lower.includes('chicha') || lower.includes('cebada') || lower.includes('café') || lower.includes('cafe') || lower.includes('infusion')) {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    );
  }

  if (lower.includes('queque') || lower.includes('arroz con leche') || lower.includes('picarones') || lower.includes('mazamorra')) {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1" />
        <path d="M2 21h20" />
        <path d="M7 8v2" />
        <path d="M12 8v2" />
        <path d="M17 8v2" />
        <path d="M7 4h0.01" />
        <path d="M17 4h0.01" />
        <path d="M12 2v2" />
      </svg>
    );
  }

  /* default: plato de comida */
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}

export function GlassCard({ title, price, image, badge, variant = 'normal' }: GlassCardProps) {
  const [imgError, setImgError] = useState(false);

  const width  = variant === 'large' ? 'w-[300px] md:w-[320px]' : 'w-[260px] md:w-[280px]';
  const height = variant === 'large' ? 'h-[400px]' : 'h-[370px]';
  const imgHeight = variant === 'large' ? 'h-[58%]' : 'h-[55%]';

  const showImage = image && !imgError;
  const gradient  = getGradient(title);

  return (
    <div className={`${width} ${height} glass-card flex flex-col overflow-hidden flex-shrink-0 group`}>

      {/* ---- Image / Fallback area ---- */}
      <div
        className={`${imgHeight} w-full relative overflow-hidden`}
        style={{ background: !showImage ? gradient : undefined }}
      >
        {showImage ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-80">
            <FoodIcon title={title} />
          </div>
        )}

        {/* Gradient overlay at bottom for readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Badge */}
        {badge && (
          <span className="absolute top-3 right-3 bg-amber-400 text-black text-[10px] font-semibold font-sans px-2.5 py-1 rounded-full leading-none shadow-md">
            {badge}
          </span>
        )}
      </div>

      {/* ---- Info area ---- */}
      <div className="flex-1 w-full px-5 py-4 flex flex-col justify-between">
        <h3 className="font-serif text-base md:text-lg text-white leading-snug line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <p className="font-serif text-2xl text-amber-400 font-bold tracking-tight">
            {price}
          </p>
          {/* Subtle arrow indicator */}
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="rgba(255,179,0,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
