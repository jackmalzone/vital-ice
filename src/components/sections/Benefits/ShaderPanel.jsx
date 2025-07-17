'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ShaderPlane() {
  const mesh = useRef();

  useEffect(() => {
    console.log('🔵 ShaderPlane: Component mounted');
    console.log('🔵 ShaderPlane: mesh ref:', mesh.current);
  }, []);

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
            float n = sin(st.x *10 + uTime) * sin(st.y * 8.0 + uTime);
            float intensity = n * 0.3;
            vec3 color = vec310;
            gl_FragColor = vec4olor, intensity);
          }
        `}
      />
    </mesh>
  );
}

export default function ShaderPanel() {
  useEffect(() => {
    console.log('🔵 ShaderPanel: Component mounted');
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ alpha: true }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          console.log('🔵 ShaderPanel: Canvas created successfully');
          console.log('🔵 ShaderPanel: Canvas size:', gl.domElement.width, gl.domElement.height);
        }}
        onError={error => {
          console.error('🔵 ShaderPanel: Canvas error:', error);
        }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
