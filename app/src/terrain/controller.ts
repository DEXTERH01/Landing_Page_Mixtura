import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from 'postprocessing';
import { MeshLine, MeshLineMaterial } from 'three.meshline';

// --- Constants ---
const W = 200;
const D = 200;
const RW = W + 1;
const RD = D + 1;
const NS = 0.5;
const H_SCALE = 40;
const N_F = 0.015;
const S_F = 0.05;
// PI2 available for future use with circular animations

const Base = '#000000';
const Line = '#ff3d00';
const palette = ['#0a0807', '#ff3d00', '#ff6b35', '#ffccbc'];

// --- Types ---
export type CameraMode = 'orbit' | 'drone' | 'walk' | 'overview';

interface TerrainState {
  currentMode: CameraMode;
  angle: number;
  hover: boolean;
}

interface DroneState {
  maxX: number;
  maxY: number;
  mScale: number;
  lookAtTarget: THREE.Vector3;
  camH: number;
  clamp: (v: number, min: number, max: number) => number;
}

interface MouseState {
  x: number;
  y: number;
  mx: number;
  my: number;
}

// --- State ---
const state: TerrainState = {
  currentMode: 'orbit',
  angle: 0,
  hover: false,
};

const mouse: MouseState = { x: 0, y: 0, mx: 0, my: 0 };

let droneState: DroneState | null = null;
let switched = false;
let animationId: number | null = null;
let angleFadeGlobal = 0.5;

// --- Three.js objects ---
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let composer: EffectComposer;
let wMesh: THREE.Mesh;
let wMeshB: THREE.Mesh;
let plane: THREE.PlaneGeometry;
let planeB: THREE.PlaneGeometry;
let geo: THREE.PlaneGeometry;
let floor: THREE.Mesh;
let top: THREE.Mesh;
let bandB: THREE.Mesh;
let bandA: THREE.Mesh;
let noise2D: ReturnType<typeof createNoise2D>;

// --- Helper ---
function createClampFn(min: number, max: number) {
  return (v: number) => (v > max ? max : v < min ? min : v);
}

// --- Terrain Generation ---
function createTerrainGeometry() {
  noise2D = createNoise2D();

  plane = new THREE.PlaneGeometry(W, D, RW - 1, RD - 1);
  planeB = new THREE.PlaneGeometry(W, D, RW / 10, RD / 10);
  plane.rotateX(-Math.PI / 2);
  planeB.rotateX(-Math.PI / 2);

  // Base surface
  const posAttr = plane.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    const d = Math.sqrt(x * x + z * z);
    const fa = 1 - Math.min(d / 180, 1);
    const a = Math.acos(Math.abs(z) / d || 0);
    let angleFade = (a * a * a * 7) * fa;

    if (Math.abs(x) > 95 || Math.abs(z) > 95) {
      angleFade = Math.max(angleFade, 0.18);
    }

    const height =
      (((1 + noise2D(x * N_F, z * N_F)) / 2) *
        ((1 + noise2D(x * N_F * 2 + 131, z * N_F * 2 + 173)) / 2)) *
      angleFade *
      H_SCALE;

    posAttr.setY(i, height);
  }
  posAttr.needsUpdate = true;
  plane.computeVertexNormals();

  // Noise surface
  const posAttrB = planeB.attributes.position;
  for (let i = 0; i < posAttrB.count; i++) {
    const vB = {
      x: posAttrB.getX(i),
      y: (Math.random() - 0.5) * NS,
      z: posAttrB.getZ(i),
    };
    posAttrB.setY(i, vB.y);
  }
  posAttrB.needsUpdate = true;
}

// --- Wireframe Meshes ---
function createWireframeMeshes() {
  const wMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(Line),
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  wMesh = new THREE.Mesh(plane, wMaterial);
  scene.add(wMesh);
  wMesh.visible = true;

  const wMaterialB = new THREE.MeshBasicMaterial({
    color: new THREE.Color(Line),
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  wMeshB = new THREE.Mesh(planeB, wMaterialB);
  scene.add(wMeshB);
  wMeshB.visible = false;
}

// --- MeshLine Bands ---
function createTerrainBand(
  geometry: THREE.PlaneGeometry,
  yOffset: number,
  lineWidth: number
): THREE.Mesh {
  const count = geometry.attributes.position.count;
  const line = new MeshLine();
  const l: number[] = [];

  for (let i = 0; i <= count; i++) {
    const idx = Math.min(i, count - 1);
    l.push(geometry.attributes.position.getX(idx));
    l.push(geometry.attributes.position.getY(idx) + yOffset);
    l.push(geometry.attributes.position.getZ(idx));
  }

  line.setGeometry(l, false);

  const mat = new MeshLineMaterial({
    color: new THREE.Color(Line),
    lineWidth: lineWidth,
    sizeAttenuation: false,
    transparent: true,
    depthWrite: false,
    opacity: 1,
  });

  return new THREE.Mesh(line.geometry, mat);
}

function createBands() {
  geo = plane.clone();

  floor = createTerrainBand(geo, 0.5, 0.005);
  top = createTerrainBand(geo, 0.4, 0.003);
  bandB = createTerrainBand(geo, 0.35, 0.003);
  bandA = createTerrainBand(geo, 0.3, 0.003);

  scene.add(floor);
  scene.add(top);
  scene.add(bandB);
  scene.add(bandA);

  floor.visible = false;
}

// --- Update Terrain ---
const vec3 = new THREE.Vector3();

function updateTerrain(time: number) {
  const s = Math.sin(time);
  const c = Math.cos(time);
  const noise = noise2D(c * 0.1, s * 0.1) * 0.5;
  const noiseB = noise2D(s * 0.1, c * 0.1) * 0.5;
  const tScale = 1 + noise * 0.015;

  const posAttr = geo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    const d = Math.sqrt(x * x + z * z);
    const fa = 1 - Math.min(d / 180, 1);
    const a = Math.acos(Math.abs(z) / d || 0);
    let angleFade = (a * a * a * 7) * fa;

    if (Math.abs(x) > 95 || Math.abs(z) > 95) {
      angleFade = Math.max(angleFade, 0.18);
    }

    const h1 = (1 + noise2D(x * N_F * tScale + 131 + c, z * N_F + 173)) / 2;
    const h2 = (1 + noise2D(x * N_F * 0.5 * tScale + 331 + s, z * N_F * 0.5 + 473)) / 2;
    const h3 = (1 + noise2D(x * N_F * 0.1 * tScale, z * N_F * 0.1)) / 2;

    const height = h1 * h2 * h3 * angleFade * H_SCALE;
    const ns = noise2D(x * S_F, z * S_F) * NS;
    const y = height + ns;

    vec3.set(x, y, z);
    posAttr.setXYZ(i, x, y, z);

    // Accumulate scale values for band update
    angleFadeGlobal = angleFade;
  }
  posAttr.needsUpdate = true;
  geo.computeVertexNormals();

  // Update bands
  (floor.material as any).uniforms.color.value.set(palette[0]);
  (floor.material as any).uniforms.lineWidth.value = 0.005 + (Math.sin(time) + angleFadeGlobal) * 0.01;

  (top.material as any).uniforms.color.value.set(palette[3]);
  (top.material as any).uniforms.lineWidth.value = 0.003 + (noiseB + angleFadeGlobal) * 0.003;

  (bandB.material as any).uniforms.color.value.set(palette[1]);
  (bandB.material as any).uniforms.lineWidth.value = 0.003 + (noiseB + angleFadeGlobal) * 0.003;

  (bandA.material as any).uniforms.color.value.set(palette[2]);
  (bandA.material as any).uniforms.lineWidth.value = 0.003 + (noiseB + angleFadeGlobal) * 0.003;
}

// --- Camera Modes ---
function initDroneMode() {
  const lookAtTarget = new THREE.Vector3();
  const camH = 90 + Math.max((window.innerHeight / window.innerWidth - 1) * 40, 0);
  const maxW = 200;
  const maxD = 200;
  const mScale = Math.max(maxD, maxW);

  const dH = camH * Math.tan((camera.fov / 2) * (Math.PI / 180));
  const dW = dH * camera.aspect;
  const maxY = dH;
  const maxX = dW;

  const clamp = createClampFn(-maxX, maxX);

  droneState = { maxX, maxY, mScale, lookAtTarget, camH, clamp };
}

function droneUpdate(mx: number, my: number) {
  if (state.currentMode !== 'drone' || !droneState) return;

  const dW = (mx - 0.5) * 2;
  const dH = (my - 0.5) * 2;

  camera.position.x += (droneState.maxX * dW * droneState.mScale - camera.position.x) * 0.1;
  camera.position.z += (droneState.maxY * -dH * droneState.mScale - camera.position.z) * 0.1;
  camera.position.y += (droneState.camH - camera.position.y) * 0.1;

  droneState.lookAtTarget.set(
    droneState.maxX * dW * droneState.mScale,
    0,
    droneState.maxY * -dH * droneState.mScale
  );
  camera.lookAt(droneState.lookAtTarget);
  droneState.clamp(camera.position.x, -droneState.maxX, droneState.maxX);
  droneState.clamp(camera.position.z, -droneState.maxY, droneState.maxY);
}

function orbitUpdate() {
  if (state.currentMode !== 'orbit') return;

  state.angle += 0.001;
  camera.position.x = Math.sin(state.angle) * 80;
  camera.position.z = Math.cos(state.angle) * 80;
  camera.position.y = 40;
  camera.lookAt(0, 0, 0);
}

function overviewUpdate() {
  if (state.currentMode !== 'overview') return;

  camera.position.x += (0 - camera.position.x) * 0.03;
  camera.position.y += (120 - camera.position.y) * 0.03;
  camera.position.z += (0 - camera.position.z) * 0.03;
  camera.lookAt(0, 0, 0);
}

function walkUpdate() {
  if (state.currentMode !== 'walk') return;

  camera.position.x += (0 - camera.position.x) * 0.03;
  camera.position.y += (10 - camera.position.y) * 0.03;
  camera.position.z += (60 - camera.position.z) * 0.03;
  camera.lookAt(0, 0, 0);
}

// --- Mode Switching ---
export function switchMode(mode: CameraMode) {
  const time = performance.now() * 0.0005;
  updateTerrain(time);

  if (switched) {
    setTimeout(() => switchMode(mode), 10);
    return;
  }

  switched = true;
  state.currentMode = mode;
  floor.visible = true;
  wMesh.visible = false;

  if (mode === 'drone') {
    initDroneMode();
  }

  setTimeout(() => {
    switched = false;
  }, 2500);
}

// --- Interaction Handlers ---
function attachInteractionHandlers() {
  const body = document.body;

  body.addEventListener('mouseenter', () => {
    state.hover = true;
  });
  body.addEventListener('mouseleave', () => {
    state.hover = false;
  });
  body.addEventListener('mousemove', (e) => {
    if (state.hover) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.mx = e.clientX / window.innerWidth;
      mouse.my = e.clientY / window.innerHeight;
    }
  });
}

// --- Render Loop ---
function render() {
  const time = performance.now() * 0.0005;

  orbitUpdate();

  if (state.hover) {
    droneUpdate(mouse.mx, mouse.my);
  }

  walkUpdate();
  overviewUpdate();
  updateTerrain(time);

  composer.render();
  animationId = requestAnimationFrame(render);
}

// --- Resize Handler ---
function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);

  if (state.currentMode === 'drone') {
    initDroneMode();
  }
}

// --- Init ---
export function initTerrain(container: HTMLElement) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  // Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 40, 80);

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(new THREE.Color(Base), 100, 400);

  // Ambient Light
  scene.add(new THREE.AmbientLight(0xffffff, 1));

  // Terrain
  createTerrainGeometry();
  createWireframeMeshes();
  createBands();

  // Post-processing
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(
    new EffectPass(
      camera,
      new BloomEffect({
        intensity: 0.5,
        luminanceThreshold: 0.1,
        luminanceSmoothing: 0.3,
      })
    )
  );

  // Interaction
  attachInteractionHandlers();

  // Resize
  window.addEventListener('resize', onResize);

  // Start render loop
  render();

  // Return cleanup
  return {
    destroy() {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    },
  };
}

export function getCurrentMode(): CameraMode {
  return state.currentMode;
}
