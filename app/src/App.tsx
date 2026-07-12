import {
  useState, useCallback, useEffect, useRef,
  type MouseEvent as RMouseEvent, type TouchEvent as RTouchEvent,
} from 'react';
import { MENU, CATEGORIES, FEATURED, type MenuItem, type Category } from '@/data/menu';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTANTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const WA_NUM = 'XXXXXXXXXX';
const WA_MSG = encodeURIComponent('¡Hola! Quisiera información sobre el evento Mixtura 2026. ¿Dónde y cuándo es?');

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3D TILT CARD WRAPPER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TiltCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: RMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 14;
    const y = ((e.clientY - top)  / height - 0.5) * -10;
    ref.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.03,1.03,1.03)`;
    ref.current.style.boxShadow = `${-x * 1.5}px ${y * 1.5}px 40px rgba(214,40,40,0.25), 0 20px 60px rgba(0,0,0,0.5)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    ref.current.style.boxShadow = '';
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="tilt-card"
    >
      {children}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FEATURED CAROUSEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FeaturedCarousel({ onSelect }: { onSelect: (dish: MenuItem) => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [failedImage, setFailedImage] = useState<string | null>(null);

  const go = useCallback((newIdx: number, direction: 'next' | 'prev' = 'next') => {
    setDir(direction);
    setIdx(newIdx);
  }, []);

  const advance = useCallback(() => go((idx + 1) % FEATURED.length, 'next'), [go, idx]);
  const retreat = useCallback(() => go((idx - 1 + FEATURED.length) % FEATURED.length, 'prev'), [go, idx]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(advance, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 5500);
  };

  const dish = FEATURED[idx];

  // Touch swipe on carousel
  const touchX = useRef(0);
  const handleTouchStart = (e: RTouchEvent<HTMLDivElement>) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: RTouchEvent<HTMLDivElement>) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) { resetTimer(); if (dx < 0) advance(); else retreat(); }
  };

  return (
    <div
      className="carousel-root"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide */}
      <div key={idx} className={`carousel-slide carousel-${dir}-in`}>
        {/* Background image */}
        {dish.image && failedImage !== dish.image ? (
          <img src={dish.image} alt={dish.name} className="carousel-bg-img"
            onError={() => setFailedImage(dish.image ?? null)} />
        ) : (
          <div className="carousel-bg-placeholder" />
        )}
        {/* Overlays */}
        <div className="carousel-overlay-bottom" />
        <div className="carousel-overlay-top" />

        {/* Content */}
        <div className="carousel-content">
          {dish.tag && <span className="carousel-tag">{dish.tag}</span>}
          <h2 className="carousel-title">{dish.name}</h2>
          <p className="carousel-tagline">{dish.tagline}</p>
          <div className="carousel-actions">
            <span className="carousel-price">{dish.price}</span>
            <button className="carousel-cta" onClick={() => onSelect(dish)}>
              Ver receta &amp; pedir →
            </button>
          </div>
        </div>
      </div>

      {/* Arrow buttons */}
      <button className="carousel-arrow carousel-arrow-left"
        onClick={() => { resetTimer(); retreat(); }} aria-label="Anterior">‹</button>
      <button className="carousel-arrow carousel-arrow-right"
        onClick={() => { resetTimer(); advance(); }} aria-label="Siguiente">›</button>

      {/* Dot indicators */}
      <div className="carousel-dots">
        {FEATURED.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === idx ? ' active' : ''}`}
            onClick={() => { resetTimer(); go(i, i > idx ? 'next' : 'prev'); }}
            aria-label={`Ir a ${FEATURED[i].name}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DISH MODAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DishModal({ dish, onClose }: { dish: MenuItem; onClose: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {dish.image && !imageFailed && (
          <div className="modal-img-wrap">
            <img src={dish.image} alt={dish.name} className="modal-img"
              onError={() => setImageFailed(true)} />
            <div className="modal-img-overlay" />
            {dish.tag && <span className="modal-tag">{dish.tag}</span>}
          </div>
        )}
        <div className="modal-body">
          <div className="modal-header-row">
            <h2 className="modal-title">{dish.name}</h2>
            <span className="modal-price">{dish.price}</span>
          </div>
          <p className="modal-tagline">{dish.tagline}</p>
          <div className="modal-divider" />
          <p className="modal-description">{dish.description}</p>
          <div className="modal-actions">
            <a
              href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(`¡Quiero pedir: ${dish.name} (${dish.price})! 🍽️`)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WaIcon /> Pedir por WhatsApp
            </a>
            <button className="btn-close-modal" onClick={onClose}>✕ Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MENU CARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MenuCard({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <TiltCard onClick={onClick}>
      <div className="card-img-wrap">
        {item.image && !imageFailed ? (
          <img src={item.image} alt={item.name} className="card-img"
            onError={() => setImageFailed(true)} />
        ) : (
          <div className="card-no-img">
            <span>{item.category === 'platos' ? '🍽️' : item.category === 'postres' ? '🍮' : '🥤'}</span>
          </div>
        )}
        <div className="card-img-gradient" />
        {item.tag && <span className="card-tag">{item.tag}</span>}
      </div>
      <div className="card-body">
        <h3 className="card-name">{item.name}</h3>
        <p className="card-tagline">{item.tagline}</p>
        <div className="card-footer">
          <span className="card-price">{item.price}</span>
          <span className="card-more">Ver más →</span>
        </div>
      </div>
      {/* 3D shine layer */}
      <div className="card-shine" />
    </TiltCard>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ICONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App() {
  const [category, setCategory] = useState<Category>('platos');
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const filtered = MENU.filter(m => m.category === category);

  const handleSelect = useCallback((dish: MenuItem) => setSelected(dish), []);
  const handleClose  = useCallback(() => setSelected(null), []);

  return (
    <>
      {/* ══ HEADER ══════════════════════════════════════════════════ */}
      <header className="site-header">
        <div className="header-brand">
          <span className="brand-mixtura">MIXTURA</span>
          <span className="brand-dot">·</span>
          <span className="brand-year">2026</span>
          <span className="brand-flag">🇵🇪</span>
        </div>
        <nav className="header-nav">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`header-nav-btn${category === c.id ? ' active' : ''}`}
              style={{ '--cat-color': c.color } as React.CSSProperties}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </nav>
        <a href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="header-wa">
          <WaIcon /> <span className="header-wa-text">Reservar</span>
        </a>
      </header>

      {/* ══ FEATURED CAROUSEL ═══════════════════════════════════════ */}
      <FeaturedCarousel onSelect={handleSelect} />

      {/* ══ SECTION HEADER ══════════════════════════════════════════ */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">
            {CATEGORIES.find(c => c.id === category)?.icon}&nbsp;
            {CATEGORIES.find(c => c.id === category)?.label}
          </h2>
          <p className="section-subtitle">{filtered.length} opciones disponibles</p>
        </div>

        {/* Category tabs (mobile) */}
        <div className="cat-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`cat-tab${category === c.id ? ' active' : ''}`}
              style={{ '--cat-color': c.color } as React.CSSProperties}
            >
              {c.icon} {c.label}
              <span className="cat-tab-count">{MENU.filter(m => m.category === c.id).length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══ MENU GRID ═══════════════════════════════════════════════ */}
      <main className="menu-grid" role="list" aria-label="Menú">
        {filtered.map((item, i) => (
          <div key={item.id} className="menu-grid-item" style={{ '--delay': `${i * 0.06}s` } as React.CSSProperties}>
            <MenuCard item={item} onClick={() => handleSelect(item)} />
          </div>
        ))}
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════════════ */}
      <footer className="site-footer">
        <p className="footer-brand">
          <span style={{ color: '#D62828' }}>MIXTURA</span> · 2026
        </p>
        <p className="footer-info">
          Iglesia Palabra de Vida · Dom 20 de Julio · Chorrillos, Lima
        </p>
        <a
          href="https://maps.app.goo.gl/uUQAwiVu7aE6Y1oW8"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-location"
          aria-label="Abrir ubicación del evento en Google Maps"
        >
          <span>Av. Próceres, Mz. 15 Lt. 8 · 3 de Octubre de Villa, Chorrillos</span>
          <small>Referencia: a 2 cuadras del mercado Túpac Amaru, al frente del Colegio José María Arguedas de Túpac.</small>
          <strong>Ver ubicación en Google Maps ↗</strong>
        </a>
        <a href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="footer-wa">
          <WaIcon /> Consultar por WhatsApp
        </a>
        <p className="footer-credit">¡Te esperamos!</p>
      </footer>

      {/* ══ MODAL ═══════════════════════════════════════════════════ */}
      {selected && <DishModal dish={selected} onClose={handleClose} />}
    </>
  );
}
