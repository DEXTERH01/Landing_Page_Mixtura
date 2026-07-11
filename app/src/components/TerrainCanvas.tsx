import { useEffect, useRef } from 'react';
import { initTerrain } from '@/terrain/controller';

export function TerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef   = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (cleanupRef.current) return;

    const cleanup = initTerrain(containerRef.current);
    cleanupRef.current = cleanup.destroy;

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      aria-hidden="true"
      role="presentation"
      style={{ pointerEvents: 'none' }}
    />
  );
}
