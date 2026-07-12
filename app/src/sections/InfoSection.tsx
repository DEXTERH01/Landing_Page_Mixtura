import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ⚠️  Reemplaza XXXXXXXXXX con el número de WhatsApp real */
const WHATSAPP_NUMBER = 'XXXXXXXXXX';
const WHATSAPP_MSG    = encodeURIComponent('Hola! Quisiera más información sobre el evento Mixtura 2026 🍽️');
const MAPS_LINK = 'https://maps.app.goo.gl/uUQAwiVu7aE6Y1oW8';

export function InfoSection() {
  const panelRef  = useRef<HTMLDivElement>(null);
  const itemsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const children = itemsRef.current ? Array.from(itemsRef.current.children) : [];
    tl.fromTo(panelRef.current,
        { scale: 0.94, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.7, delay: 0.2 })
      .fromTo(
        children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
        '-=0.3'
      );
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        flexShrink: 0,
      }}
      aria-label="Información del evento"
    >
      <div
        ref={panelRef}
        className="glass-panel px-7 py-9 md:px-12 md:py-12 max-w-[600px] w-full text-center opacity-0"
      >
        <div ref={itemsRef}>

          {/* Pin icon */}
          <div className="flex justify-center mb-5">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,179,0,0.1)', border: '1px solid rgba(255,179,0,0.25)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffb300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-1">
            Encuéntranos
          </h2>

          {/* Gold divider */}
          <div
            className="mx-auto mt-3 mb-6 h-[1px]"
            style={{
              width: '50px',
              background: 'linear-gradient(90deg, transparent, #ffb300, transparent)',
            }}
          />

          {/* Address */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group block mb-1"
            aria-label="Ver ubicación en Google Maps"
          >
            <p className="text-white/80 text-base leading-relaxed font-sans group-hover:text-amber-400 transition-colors duration-300">
              Av. Próceres, Mz. 15 Lt. 8 — 3 de Octubre de Villa
              <br />
              <span className="font-semibold">Chorrillos</span>
            </p>
            <p className="text-white/40 text-xs mt-1.5 font-sans">
              A 2 cuadras del mercado Túpac Amaru, al frente del Colegio José María Arguedas de Túpac.
            </p>
            <span className="inline-flex items-center gap-1 mt-2 text-amber-400/70 text-[11px] font-sans group-hover:text-amber-400 transition-colors duration-300 uppercase tracking-wide">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Ver en Google Maps
            </span>
          </a>

          {/* Payments */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <span className="text-white/40 text-xs uppercase tracking-wider font-sans">Aceptamos:</span>
            {/* Yape */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#722F89] flex items-center justify-center">
                <span className="text-white font-bold" style={{ fontSize: '9px' }}>Y</span>
              </div>
              <span className="text-white font-medium text-sm font-sans">Yape</span>
            </div>
            <span className="text-white/20">|</span>
            {/* Plin */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#00B4D8] flex items-center justify-center">
                <span className="text-white font-bold" style={{ fontSize: '8px' }}>P</span>
              </div>
              <span className="text-white font-medium text-sm font-sans">Plin</span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            id="info-whatsapp-btn"
            className="
              mt-7 inline-flex items-center gap-3
              px-8 py-3.5
              bg-[#25D366] text-white
              font-sans font-medium text-sm
              rounded-full
              hover:scale-105 active:scale-95
              transition-transform duration-200
            "
            style={{ boxShadow: '0 4px 24px rgba(37, 211, 102, 0.4)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pedir por WhatsApp
          </a>

          {/* Footer branding */}
          <p className="mt-8 text-white/25 text-[10px] font-sans tracking-wider uppercase">
            Iglesia Palabra de Vida · Chorrillos · 2026
          </p>
        </div>
      </div>
    </section>
  );
}
