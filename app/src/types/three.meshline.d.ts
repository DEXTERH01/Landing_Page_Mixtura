declare module 'three.meshline' {
  import * as THREE from 'three';

  export class MeshLine {
    geometry: THREE.BufferGeometry;
    setGeometry(geometry: number[] | THREE.BufferGeometry, c: boolean): void;
  }

  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(parameters?: {
      color?: THREE.Color | string | number;
      lineWidth?: number;
      sizeAttenuation?: boolean;
      transparent?: boolean;
      depthWrite?: boolean;
      opacity?: number;
      [key: string]: any;
    });
    uniforms: {
      color: { value: THREE.Color };
      lineWidth: { value: number };
      [key: string]: any;
    };
  }
}
