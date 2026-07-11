import './App.css';
import { useCallback, useEffect, useRef } from 'react';
import { TerrainCanvas } from '@/components/TerrainCanvas';
import { NavigationDots } from '@/components/NavigationDots';
import { NavArrows } from '@/components/NavArrows';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { HeroSection } from '@/sections/HeroSection';
import { PlatosSection } from '@/sections/PlatosSection';
import { PostresSection } from '@/sections/PostresSection';
import { BebidasSection } from '@/sections/BebidasSection';
import { InfoSection } from '@/sections/InfoSection';
import { useSectionNavigator } from '@/hooks/useSectionNavigator';
import { useSwipe } from '@/hooks/useSwipe';

const SECTION_LABELS = ['Inicio', 'Platos', 'Postres', 'Bebidas', 'Info'];
const TOTAL = 5;

export default function App() {
  const { activeIndex, goTo, goNext, goPrev } = useSectionNavigator();
  const wheelCooldownRef = useRef(false);

  /* ---- Keyboard navigation ---- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault(); goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  /* ---- Mouse wheel navigation ---- */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelCooldownRef.current) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX < 30 && absY < 30) return;
      wheelCooldownRef.current = true;
      setTimeout(() => { wheelCooldownRef.current = false; }, 900);
      if (e.deltaX > 0 || e.deltaY > 0) goNext(); else goPrev();
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  /* ---- Touch swipe navigation ---- */
  const { onTouchStart, onTouchEnd } = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    threshold: 45,
    maxDuration: 400,
  });

  const handleOpenMenu = useCallback(() => goTo(1), [goTo]);

  const prevLabel = activeIndex > 0 ? SECTION_LABELS[activeIndex - 1] : '';
  const nextLabel = activeIndex < TOTAL - 1 ? SECTION_LABELS[activeIndex + 1] : '';

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0807',
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 3D Terrain Background (optional - app works without it) */}
      <TerrainCanvas />

      {/* Horizontal Content Slider */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          height: '100vh',
          width: `${TOTAL * 100}vw`,
          transform: `translateX(-${activeIndex * 100}vw)`,
          transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
          willChange: 'transform',
        }}
      >
        <HeroSection onOpenMenu={handleOpenMenu} />
        <PlatosSection />
        <PostresSection />
        <BebidasSection />
        <InfoSection />
      </div>

      {/* Navigation Dots */}
      <NavigationDots
        total={TOTAL}
        active={activeIndex}
        onDotClick={goTo}
      />

      {/* Navigation Arrows */}
      <NavArrows
        onPrev={goPrev}
        onNext={goNext}
        showPrev={activeIndex > 0}
        showNext={activeIndex < TOTAL - 1}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
      />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
