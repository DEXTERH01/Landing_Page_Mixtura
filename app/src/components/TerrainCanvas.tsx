import { useEffect, useRef, useState } from 'react';
import { registerTerrainSwitch } from '@/hooks/useSectionNavigator';

export function TerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef   = useRef<(() => void) | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current || cleanupRef.current) return;

    let mounted = true;

    // Lazy import so the rest of the app never fails if THREE has issues
    import('@/terrain/controller')
      .then(({ initTerrain, switchMode }) => {
        if (!mounted || !containerRef.current) return;
        try {
          const cleanup = initTerrain(containerRef.current);
          cleanupRef.current = cleanup.destroy;
          // Register the terrain mode switcher now that 3D is ready
          registerTerrainSwitch(switchMode);
        } catch (err) {
          console.warn('[TerrainCanvas] initTerrain failed:', err);
          if (mounted) setFailed(true);
        }
      })
      .catch((err) => {
        console.warn('[TerrainCanvas] Failed to load terrain controller:', err);
        if (mounted) setFailed(true);
      });

    return () => {
      mounted = false;
      if (cleanupRef.current) {
        try { cleanupRef.current(); } catch (_) { /* ignore */ }
        cleanupRef.current = null;
      }
    };
  }, []);

  // Beautiful CSS fallback if WebGL unavailable
  if (failed) {
    return (
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 70%, rgba(255,61,0,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(255,179,0,0.06) 0%, transparent 50%),
            linear-gradient(180deg, #0a0807 0%, #050303 100%)
          `,
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
