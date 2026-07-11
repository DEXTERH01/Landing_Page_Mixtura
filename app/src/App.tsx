import { useState, useCallback, useEffect } from 'react';
import { MENU, CATEGORIES, type MenuItem, type Category } from '@/data/menu';

/* ── WhatsApp ───────────────────────────────────────────────── */
const WA_NUM = 'XXXXXXXXXX'; // Reemplaza con el número real
const WA_MSG = encodeURIComponent('Hola! Quisiera más información sobre el evento Mixtura 2026. ¿Dónde y cuándo es?');

/* ── Dish Modal ──────────────────────────────────────────────── */
function DishModal({ dish, onClose }: { dish: MenuItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="dish-modal-card"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #1a0000 0%, #0d0000 100%)',
          border: '1px solid rgba(210,40,40,0.4)',
          borderRadius: '20px',
          maxWidth: '500px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 60px rgba(210,40,40,0.15)',
          animation: 'slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Image */}
        {dish.image && (
          <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
            <img
              src={dish.image}
              alt={dish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, #1a0000 0%, transparent 60%)',
            }} />
            {dish.tag && (
              <span style={{
                position: 'absolute', top: '1rem', left: '1rem',
                background: '#D62828', color: '#fff',
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
                padding: '0.3rem 0.75rem', borderRadius: '999px',
                textTransform: 'uppercase',
              }}>{dish.tag}</span>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
              fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0,
            }}>{dish.name}</h2>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '1.1rem', fontWeight: 700,
              color: '#E8A020', whiteSpace: 'nowrap', paddingTop: '0.1rem',
            }}>{dish.price}</span>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.75, fontSize: '0.95rem', margin: '0 0 1.5rem',
          }}>{dish.description}</p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Quiero pedir: ${dish.name} (${dish.price})`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: '#25D366', color: '#fff',
                padding: '0.75rem 1.25rem', borderRadius: '12px',
                fontWeight: 600, fontSize: '0.9rem',
                textDecoration: 'none', border: 'none', cursor: 'pointer',
                transition: 'transform 0.15s, opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Pedir este plato
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
                padding: '0.75rem 1.25rem', borderRadius: '12px',
                cursor: 'pointer', fontSize: '0.9rem',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Menu Card ───────────────────────────────────────────────── */
function MenuCard({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const hasImage = Boolean(item.image);
  return (
    <article
      className="menu-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`Ver ${item.name}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {/* Image or gradient placeholder */}
      <div style={{ position: 'relative', height: '170px', overflow: 'hidden', flexShrink: 0 }}>
        {hasImage ? (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            className="menu-card-img"
            onError={e => { (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #1a0000, #300010)'; (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #1a0000 0%, #350015 50%, #1a0000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '3rem', opacity: 0.35 }}>
              {item.category === 'platos' ? '🍽️' : item.category === 'postres' ? '🍮' : '🥤'}
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,0,0,0.85) 0%, transparent 55%)',
        }} />
        {/* Tag badge */}
        {item.tag && (
          <span style={{
            position: 'absolute', top: '0.65rem', right: '0.65rem',
            background: '#D62828', color: '#fff',
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            padding: '0.2rem 0.6rem', borderRadius: '999px',
            textTransform: 'uppercase',
          }}>{item.tag}</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem 1.1rem 1.1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.05rem', fontWeight: 700,
          color: '#fff', margin: '0 0 0.4rem', lineHeight: 1.25,
        }}>{item.name}</h3>
        <p style={{
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)',
          margin: '0 0 0.8rem', lineHeight: 1.5, flexGrow: 1,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{item.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '1rem', fontWeight: 700, color: '#E8A020',
          }}>{item.price}</span>
          <span style={{
            fontSize: '0.75rem', color: 'rgba(210,40,40,0.9)',
            fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}>
            Ver más <span style={{ fontSize: '0.9rem' }}>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

/* ── Main App ─────────────────────────────────────────────────── */
export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('platos');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = MENU.filter(item => item.category === activeCategory);

  const handleCardClick = useCallback((dish: MenuItem) => {
    setSelectedDish(dish);
    setMenuOpen(false);
  }, []);

  const handleCloseModal = useCallback(() => setSelectedDish(null), []);

  return (
    <>
      {/* ── STICKY HEADER ─────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,0,0,0.92)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(210,40,40,0.25)',
        padding: '0.85rem 1.25rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}>
            <span style={{ color: '#D62828' }}>MIXTURA</span>
            <span style={{ color: 'rgba(255,255,255,0.25)', margin: '0 0.4rem' }}>·</span>
            <span style={{ fontSize: '0.75em', fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}>2026</span>
          </div>
          <div style={{
            fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginTop: '0.2rem', fontFamily: "'IBM Plex Mono', monospace",
          }}>Dom 20 Jul · Chorrillos, Lima</div>
        </div>

        {/* Nav pill — desktop */}
        <nav style={{ display: 'flex', gap: '0.25rem' }} className="nav-pills-desktop" aria-label="Categorías">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                border: activeCategory === cat.id ? '1.5px solid #D62828' : '1.5px solid rgba(255,255,255,0.12)',
                background: activeCategory === cat.id ? '#D62828' : 'transparent',
                color: activeCategory === cat.id ? '#fff' : 'rgba(255,255,255,0.55)',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s ease',
                letterSpacing: '0.04em',
              }}
            >{cat.icon} {cat.label}</button>
          ))}
        </nav>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            background: '#25D366', color: '#fff',
            padding: '0.55rem 1rem', borderRadius: '999px',
            fontSize: '0.8rem', fontWeight: 700,
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Reservar
        </a>
      </header>

      {/* ── HERO BANNER ───────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0000 0%, #2d0000 40%, #1a0000 100%)',
        padding: 'clamp(2.5rem, 6vw, 4rem) 1.5rem clamp(2rem, 5vw, 3.5rem)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative red glows */}
        <div style={{
          position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%,-50%)',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(214,40,40,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', right: '10%', transform: 'translate(50%,-50%)',
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(214,40,40,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(214,40,40,0.9)', marginBottom: '0.75rem',
          }}>🇵🇪 &nbsp; Iglesia Palabra de Vida · Chorrillos</p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 700, color: '#fff', lineHeight: 1.1,
            margin: '0 0 0.5rem',
            textShadow: '0 0 60px rgba(214,40,40,0.4)',
          }}>
            La Carta<br />
            <span style={{ color: '#D62828' }}>Mixtura 2026</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            marginBottom: '2rem', lineHeight: 1.6,
          }}>
            Sabores del Perú preparados con amor.<br />
            Domingo 20 de Julio — Chorrillos, Lima
          </p>

          {/* Category tabs — hero (mobile primary) */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: 'clamp(0.6rem,2vw,0.85rem) clamp(1.2rem,4vw,2rem)',
                  borderRadius: '999px',
                  border: activeCategory === cat.id ? '2px solid #D62828' : '2px solid rgba(255,255,255,0.15)',
                  background: activeCategory === cat.id
                    ? 'linear-gradient(135deg, #D62828, #a01818)'
                    : 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(0.85rem,2.5vw,1rem)', fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: activeCategory === cat.id ? 'scale(1.06)' : 'scale(1)',
                  boxShadow: activeCategory === cat.id ? '0 8px 30px rgba(214,40,40,0.4)' : 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {cat.icon} &nbsp;{cat.label}
                <span style={{
                  marginLeft: '0.5rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.75em',
                }}>
                  {MENU.filter(m => m.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION TITLE ─────────────────────────────────────── */}
      <div style={{
        padding: '2rem 1.5rem 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1,
          }}>
            {CATEGORIES.find(c => c.id === activeCategory)?.icon}&nbsp;
            {CATEGORIES.find(c => c.id === activeCategory)?.label}
          </h2>
          <p style={{
            color: 'rgba(214,40,40,0.8)', fontSize: '0.8rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            fontFamily: "'IBM Plex Mono', monospace",
            margin: '0.4rem 0 0',
          }}>{filtered.length} opciones disponibles</p>
        </div>
        <div style={{
          height: '2px', flex: 1, maxWidth: '120px',
          background: 'linear-gradient(90deg, #D62828, transparent)',
          marginLeft: '1.5rem', borderRadius: '999px',
        }} />
      </div>

      {/* ── MENU GRID ─────────────────────────────────────────── */}
      <main style={{ padding: '0 1rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.1rem',
        }}>
          {filtered.map(item => (
            <MenuCard key={item.id} item={item} onClick={() => handleCardClick(item)} />
          ))}
        </div>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{
        background: 'linear-gradient(180deg, transparent, rgba(214,40,40,0.08) 30%, #0a0000)',
        borderTop: '1px solid rgba(214,40,40,0.15)',
        padding: '3rem 1.5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.5rem', fontWeight: 700, color: '#fff',
          marginBottom: '0.5rem', letterSpacing: '0.04em',
        }}>
          <span style={{ color: '#D62828' }}>MIXTURA</span> · 2026
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '0 0 1.5rem' }}>
          Iglesia Palabra de Vida · Domingo 20 de Julio · Chorrillos, Lima
        </p>
        <a
          href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: '#25D366', color: '#fff',
            padding: '0.85rem 2rem', borderRadius: '999px',
            fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(37,211,102,0.3)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar por WhatsApp
        </a>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', marginTop: '2rem' }}>
          🇵🇪 &nbsp; Hecho con ❤️ para la familia de Palabra de Vida
        </p>
      </footer>

      {/* ── DISH MODAL ────────────────────────────────────────── */}
      {selectedDish && <DishModal dish={selectedDish} onClose={handleCloseModal} />}
    </>
  );
}
