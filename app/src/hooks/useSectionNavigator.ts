import { useState, useCallback } from 'react';

export type Section = 'hero' | 'platos' | 'postres' | 'bebidas' | 'info';

const SECTIONS: Section[] = ['hero', 'platos', 'postres', 'bebidas', 'info'];

// Optional terrain mode switcher registered by TerrainCanvas once 3D is ready
let _terrainSwitch: ((mode: string) => void) | null = null;
export function registerTerrainSwitch(fn: (mode: string) => void) {
  _terrainSwitch = fn;
}

const MODE_MAP: Record<Section, string> = {
  hero:    'orbit',
  platos:  'drone',
  postres: 'walk',
  bebidas: 'walk',
  info:    'overview',
};

export function useSectionNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= SECTIONS.length) return;
    setActiveIndex(index);
    // Fire terrain mode switch only if 3D terrain is available
    try { _terrainSwitch?.(MODE_MAP[SECTIONS[index]]); } catch (_) { /* 3D is optional */ }
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex(prev => {
      const next = Math.min(prev + 1, SECTIONS.length - 1);
      try { _terrainSwitch?.(MODE_MAP[SECTIONS[next]]); } catch (_) { /* 3D is optional */ }
      return next;
    });
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex(prev => {
      const next = Math.max(prev - 1, 0);
      try { _terrainSwitch?.(MODE_MAP[SECTIONS[next]]); } catch (_) { /* 3D is optional */ }
      return next;
    });
  }, []);

  return {
    activeSection: SECTIONS[activeIndex],
    activeIndex,
    totalSections: SECTIONS.length,
    goTo,
    goNext,
    goPrev,
    sections: SECTIONS,
  };
}
