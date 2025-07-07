'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styles from './FogTransition.module.css';

function FogPlane({ position = [0, 0, 0], scale = [1, 1, 1], speed = 1 }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const viewport = useThree(state => state.viewport);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position as [number, number, number]}
      scale={scale as [number, number, number]}
    >
      <planeGeometry args={[viewport.width * 3, 10, 128, 32]} />
      <shaderMaterial
        args={[
          {
            uniforms: {
              uTime: { value: 0 },
              uColor: { value: new THREE.Color(0xe8e6e0) },
            },
            vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
              vUv = uv;
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
            fragmentShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform float uTime;
            uniform vec3 uColor;

            // Improved noise function
            float noise(vec2 p) {
              return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }

            // Smooth noise
            float smoothNoise(vec2 p) {
              vec2 i = floor(p);
              vec2 f = fract(p);
              vec2 u = f * f * (3.0 - 2.0 * f);
              
              float a = noise(i);
              float b = noise(i + vec2(1.0, 0.0));
              float c = noise(i + vec2(0.0, 1.0));
              float d = noise(i + vec2(1.0, 1.0));
              
              return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
            }

            // Fractal noise for more organic movement
            float fractalNoise(vec2 p) {
              float value = 0.0;
              float amplitude = 0.5;
              float frequency = 1.0;
              
              for (int i = 0; i < 4; i++) {
                value += amplitude * smoothNoise(p * frequency);
                amplitude *= 0.5;
                frequency *= 2.0;
              }
              
              return value;
            }

            void main() {
              // Create organic fog movement
              vec2 uv = vUv;
              vec2 movement = vec2(uTime * 0.08, uTime * 0.04);
              
              // Multiple layers of noise for depth
              float noise1 = fractalNoise(uv * 3.0 + movement);
              float noise2 = fractalNoise(uv * 6.0 - movement * 0.5);
              float noise3 = fractalNoise(uv * 12.0 + movement * 0.3);
              
              // Combine noise layers
              float fog = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
              
              // Improved edge falloff - more center-focused
              float edgeFalloff = smoothstep(0.2, 0.5, uv.y) * smoothstep(0.8, 0.5, uv.y);
              edgeFalloff *= smoothstep(0.1, 0.4, uv.x) * smoothstep(0.9, 0.6, uv.x);
              
              // Final fog density with increased opacity
              float density = fog * edgeFalloff * 0.6;
              
              gl_FragColor = vec4(uColor, density);
            }
          `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          },
        ]}
      />
    </mesh>
  );
}

export default function FogTransition() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className={styles.fogTransition}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100vw', height: '100%' }}
      >
        {/* Primary fog layer */}
        <FogPlane position={[0, 0, 0]} scale={[1, 1, 1]} speed={1} />

        {/* Secondary fog layer for depth */}
        <FogPlane position={[0, 0.2, -0.5]} scale={[1.2, 1.2, 1]} speed={0.7} />

        {/* Tertiary fog layer for atmosphere */}
        <FogPlane position={[0, -0.1, 0.3]} scale={[0.8, 0.8, 1]} speed={1.3} />
      </Canvas>
    </div>
  );
}
