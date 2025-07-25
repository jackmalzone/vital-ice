'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ShaderPlane() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime();
      mesh.current.material.uniforms.uTime.value = time;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          
          void main() {
            vec2 st = vUv;
            
            // Very subtle gradient shift
            float shift = sin(uTime * 0.1) * 0.01;
            
            // Simple radial gradient with subtle movement
            float dist = length(st - vec2(0.5 + shift, 0.5));
            float gradient = 1.0 - dist * 0.5;
            
            // Nearly imperceptible intensity
            float intensity = gradient * 0.003 + 0.001;
            
            // Very dark blue, almost black
            vec3 color = vec3(0.01, 0.02, 0.03);
            
            gl_FragColor = vec4(color, intensity);
          }
        `}
      />
    </mesh>
  );
}

export default function ShaderPanel() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ alpha: true }}
        style={{ width: '100%', height: '100%' }}
        onError={error => {
          // Only log actual errors, not debug info
          if (error && error.message) {
            console.error('ShaderPanel error:', error.message);
          }
        }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
