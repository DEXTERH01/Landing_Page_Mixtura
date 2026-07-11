import { useState, useCallback } from 'react';
import { switchMode, type CameraMode } from '@/terrain/controller';

export type Section = 'hero' | 'platos' | 'postres' | 'bebidas' | 'info';

const SECTIONS: Section[] = ['hero', 'platos', 'postres', 'bebidas', 'info'];

const MODE_MAP: Record<Section, CameraMode> = {
  hero: 'orbit',
  platos: 'drone',
  postres: 'walk',
  bebidas: 'walk',
  info: 'overview',
};

export function useSectionNavigator() {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= SECTIONS.length) return;
    const section = SECTIONS[index];
    setActiveIndex(index);
    setActiveSection(section);
    switchMode(MODE_MAP[section]);
  }, []);

  const goNext = useCallback(() => {
    goTo(Math.min(activeIndex + 1, SECTIONS.length - 1));
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(Math.max(activeIndex - 1, 0));
  }, [activeIndex, goTo]);

  return {
    activeSection,
    activeIndex,
    totalSections: SECTIONS.length,
    goTo,
    goNext,
    goPrev,
    sections: SECTIONS,
  };
}
