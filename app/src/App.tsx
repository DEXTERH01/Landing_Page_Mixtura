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

export default function App() {
  const { activeIndex, totalSections, goTo, goNext, goPrev } = useSectionNavigator();
  const wheelCooldownRef = useRef(false);

  /* ---- Keyboard navigation ---- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  /* ---- Mouse wheel navigation (desktop) ---- */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelCooldownRef.current) return;

      // Only trigger on significant horizontal or vertical scroll
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX < 30 && absY < 30) return;

      wheelCooldownRef.current = true;
      setTimeout(() => { wheelCooldownRef.current = false; }, 800);

      if (e.deltaX > 0 || e.deltaY > 0) {
        goNext();
      } else {
        goPrev();
      }
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

  const handleOpenMenu = useCallback(() => {
    goTo(1);
  }, [goTo]);

  const prevLabel = activeIndex > 0 ? SECTION_LABELS[activeIndex - 1] : '';
  const nextLabel = activeIndex < totalSections - 1 ? SECTION_LABELS[activeIndex + 1] : '';

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Three.js Terrain Background */}
      <TerrainCanvas />

      {/* Horizontal Content Slider */}
      <div
        className="relative z-10 flex h-full will-change-transform"
        style={{
          transform: `translateX(-${activeIndex * 100}vw)`,
          width: `${totalSections * 100}vw`,
          transition: 'transform 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
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
        total={totalSections}
        active={activeIndex}
        onDotClick={goTo}
      />

      {/* Navigation Arrows (desktop only) */}
      <NavArrows
        onPrev={goPrev}
        onNext={goNext}
        showPrev={activeIndex > 0}
        showNext={activeIndex < totalSections - 1}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
      />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
