# Mixtura 2026 — Especificacion Tecnica

## Dependencias

| Paquete | Version | Proposito |
|---------|---------|-----------|
| react | ^18.3.1 | Framework UI |
| react-dom | ^18.3.1 | Renderizado DOM |
| three | ^0.170.0 | Motor WebGL para el terreno 3D |
| @types/three | ^0.170.0 | Tipos TypeScript para Three.js |
| simplex-noise | ^4.0.3 | Generacion de ruido simplex para el terreno |
| three.meshline | ^1.4.0 | Lineas malladas para las bandas del terreno |
| postprocessing | ^6.36.4 | Pipeline de post-procesado (Bloom) |
| gsap | ^3.12.5 | Motor de animacion para transiciones, stagger, tweens |
| lenis | ^1.1.13 | Smooth scroll (uso minimo, solo para elasticidad en navegacion) |
| tailwindcss | ^3.4.19 | Utilidades CSS |
| @tailwindcss/typography | ^0.5.15 | Plugin tipografia |
| typescript | ^5.6.0 | Tipado estatico |
| vite | ^6.0.0 | Bundler / dev server |
| @vitejs/plugin-react | ^4.3.0 | Plugin React para Vite |

> **Nota**: No se usa Swiper.js. La navegacion horizontal es nativa (container flex + translateX animado con GSAP) para mayor control sobre la integracion con el terreno 3D.

---

## Inventario de Componentes

### Layout (persistentes)

| Componente | Fuente | Notas |
|------------|--------|-------|
| AppLayout | Custom | Contenedor raiz: canvas Three.js fijo (z-0) + capa de contenido (z-1) |
| TerrainCanvas | Custom | Contenedor del renderer Three.js. Monta la escena, gestiona el loop de render, expone `switchMode()` via ref |
| NavigationDots | Custom | 4 dots circulares, posicion fixed bottom-center. Activo en Warm Gold |
| NavArrows | Custom | Flechas izq/der flotantes, glassmorphism. Solo desktop |
| WhatsAppButton | Custom | Boton fijo bottom-right (encima del minimap). Icono SVG inline |
| Minimap | Custom | Canvas 150x150px, fixed bottom-right. Replica del terreno en wireframe tenue |

### Secciones (paginas de la carta)

| Componente | Fuente | Notas |
|------------|--------|-------|
| HeroSection | Custom | Full viewport, centrado. Titulo, tagline typewriter, CTA, scroll indicator |
| PlatosSection | Custom | Header sticky + carousel horizontal de 12 GlassCards |
| PostresSection | Custom | Header sticky + carousel horizontal de 4 GlassCards (size large) |
| BebidasSection | Custom | Header sticky + carousel horizontal de 4 GlassCards con badges |
| InfoSection | Custom | Panel glassmorphism centrado: direccion, pagos, CTA WhatsApp |

### Componentes Reutilizables

| Componente | Fuente | Props | Notas |
|------------|--------|-------|-------|
| GlassCard | Custom | `title`, `price`, `image?`, `badge?`, `variant: 'normal' \| 'large'` | Tarjeta glassmorphism con fallback gradiente + icono SVG |
| SectionHeader | Custom | `title`, `count`, `label?` | Titulo serif + linea decorativa Warm Gold + contador |
| TypewriterText | Custom | `text`, `speed?`, `delay?` | Efecto maquina de escribir con cursor parpadeante |
| HorizontalCarousel | Custom | `children`, `activeIndex` | Wrapper flex con translateX animado via GSAP |

### Hooks

| Hook | Proposito |
|------|-----------|
| useSectionNavigator | Gestiona el indice de seccion activa (0-4), expone `goTo(index)`, `goNext()`, `goPrev()`. Sincroniza el modo del terreno |
| useTerrainController | Expone `switchMode(mode)` y mantiene la ref al TerrainCanvas. Puente entre React y Three.js |
| useTypewriter | Logica del efecto typewriter: interval de caracteres, cursor blink, delay inicial |
| useSwipe | Detecta swipe horizontal en touch. Umbrales: 50px min, 300ms max |

---

## Plan de Implementacion

### Paso 1: Estructura base
- Inicializar proyecto con `init-webapp.sh`
- Instalar dependencias adicionales (three, simplex-noise, postprocessing, three.meshline, gsap)
- Configurar fuentes (Google Fonts: Playfair Display, Inter, IBM Plex Mono) en `index.html`
- Estructura de carpetas: `src/sections/`, `src/components/`, `src/hooks/`, `src/terrain/`

### Paso 2: Modulo Terrain (Three.js)
Implementar en `src/terrain/` como modulo independiente sin dependencia de React:
- `scene.ts` — Setup del renderer, camera, scene, fog, composer + bloom
- `terrain.ts` — Generacion del terreno (PlaneGeometry, simplex-noise, vertex displacement)
- `bands.ts` — MeshLine bands (floor, top, bandA, bandB) con colores del palette
- `modes.ts` — 5 modos de camara: orbit, drone, walk, overview + funciones de update
- `controller.ts` — Modulo principal que exporta `init(container)` y `switchMode()`. Gestiona el render loop

> **Decision critica**: El terrain es un modulo vanilla JS/TS que opera fuera del ciclo de React. Se comunica con React via callbacks o una ref expuesta.

### Paso 3: Layout y Contenedores
- `TerrainCanvas.tsx` — Componente React que crea un div ref, llama a `init()` en mount, expone `switchMode` via `useImperativeHandle`
- `AppLayout.tsx` — Posiciona TerrainCanvas (fixed, z-0) y el contenido (relative, z-1)
- Montar NavigationDots, NavArrows, WhatsAppButton en el layout

### Paso 4: Sistema de Navegacion
- Implementar `useSectionNavigator` hook
- Conectar dots, flechas, swipe, y teclado (flechas izq/der) al hook
- Sincronizar: cambio de seccion → `terrain.switchMode(modoCorrespondiente)`
- Implementar `HorizontalCarousel` con GSAP para animar translateX

### Paso 5: Secciones de Contenido
- HeroSection: TypewriterText para el tagline, CTA pulsante, scroll indicator animado
- PlatosSection: 12 GlassCards con variant 'normal'
- PostresSection: 4 GlassCards con variant 'large'
- BebidasSection: 4 GlassCards con badges para vaso/jarra
- InfoSection: Panel glassmorphism con direccion, Yape/Plin, CTA WhatsApp

### Paso 6: Animaciones de Entrada
- GSAP entrance animations para cada seccion (fade + translate, stagger en tarjetas)
- TypewriterText implementado con `useTypewriter` hook
- Scroll indicator con bounce animation CSS
- Hover effects en GlassCards (CSS transitions)

### Paso 7: Minimap
- Segundo canvas en esquina inferior derecha
- Replica la geometria del terreno principal con wireframe tenue
- Camara siempre cenital, no interactiva

### Paso 8: Responsive y Polish
- Breakpoints: <768px (mobile), 768-1024px (tablet), >1024px (desktop)
- Mobile: tarjetas 85vw, minimap oculto, flechas ocultas, swipe habilitado
- Desktop: minimap visible, flechas visibles
- Ajustar camera FOV y altura del terreno segun aspect ratio

---

## Decisiones Arquitectonicas

### Terrain fuera de React
El modulo Three.js opera completamente fuera del Virtual DOM de React. El componente `TerrainCanvas` solo crea el contenedor DOM y mantiene una ref al controller del terrain. Esto evita re-renders innecesarios y problemas de performance. La comunicacion se hace via `useImperativeHandle` para exponer `switchMode()`.

### Navegacion horizontal nativa (sin Swiper)
Se usa un contenedor flex con `transform: translateX()` animado via GSAP en lugar de Swiper.js. Esto permite:
- Control total sobre la sincronizacion con el terreno 3D
- Animaciones de entrada custom (stagger) por seccion
- Integracion limpia con el sistema de seccion activa

### postprocessing en lugar de EffectComposer de Three.js
Se usa la libreria `postprocessing` (pmndrs) que es mas moderna y performante que el EffectComposer legacy de Three.js. El Bloom se configura como unico pass de post-procesado.

### three.meshline
Las bandas de color del terreno usan MeshLine (de @lume/three-meshline o three.meshline) para lograr lineas con grosor constante independiente de la distancia de la camara (`sizeAttenuation: false`). Esto es critico para el look visual de las bandas de elevacion.

---

## Notas de Implementacion

### Coexistencia Typewriter + Terrain
El efecto typewriter opera en el DOM (HTML elements) mientras el terrain opera en WebGL (canvas). No hay conflicto. El canvas del terrain tiene `position: fixed; inset: 0; z-index: 0` y todo el contenido esta en `position: relative; z-index: 1` con `pointer-events: none` en el contenedor del canvas (solo el contenido recibe interaccion).

### Glassmorphism sobre WebGL
Las tarjetas glassmorphism usan `backdrop-filter: blur(16px)` que aplica blur sobre el canvas de Three.js detras. Esto funciona porque el canvas es un elemento DOM normal con `position: fixed`. El efecto frosted-glass es gratuito y visualmente impactante.

### Compute Vertex Normals (performance)
`geo.computeVertexNormals()` se llama cada frame en `updateTerrain()`. En dispositivos de baja gama, se puede optimizar llamandolo cada 3 frames en lugar de cada frame, con impacto visual minimo.
