import { useEffect, useRef, useState } from 'react';
import { initTerrain } from '@/terrain/controller';

export function TerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef   = useRef<(() => void) | null>(null);
  const [terrainError, setTerrainError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (cleanupRef.current) return;

    try {
      const cleanup = initTerrain(containerRef.current);
      cleanupRef.current = cleanup.destroy;
    } catch (err) {
      console.warn('[TerrainCanvas] Failed to initialize 3D terrain, falling back to static background.', err);
      setTerrainError(true);
    }

    return () => {
      if (cleanupRef.current) {
        try { cleanupRef.current(); } catch (_) { /* ignore cleanup errors */ }
        cleanupRef.current = null;
      }
    };
  }, []);

  /* Fallback: gradient background if WebGL fails */
  if (terrainError) {
    return (
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, #1a0a00 0%, #0a0807 50%, #000000 100%)',
          pointerEvents: 'none',
        }}
      />
    );
  }

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
