'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import {
  GiSnowflake1,
  GiFire,
  GiCampfire,
  GiLightningTrio,
  GiLeg,
  GiVibratingBall,
} from 'react-icons/gi';
import { servicesData } from '@/lib/data/services';
import VILogo from '@/components/ui/Logo/VILogo';
import Footer from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

const SERVICE_COLORS = {
  'cold-plunge': '#00bcd4', // Water - Vital Ice Blue
  'infrared-sauna': '#ff3e36', // Fire/Light - Blood Orange
  'traditional-sauna': '#d45700', // Earth/Wood - Deep Umber
  'red-light-therapy': '#e63e80', // Light - Rose Gold
  'compression-boots': '#80cbc4', // Air - Pale Silver
  'percussion-massage': '#64b5f6', // Motion - Electric Cyan
};

// React Icons for each service
const ServiceIcons = {
  'cold-plunge': <GiSnowflake1 size={24} />,
  'infrared-sauna': <GiFire size={24} />,
  'traditional-sauna': <GiCampfire size={24} />,
  'red-light-therapy': <GiLightningTrio size={24} />,
  'compression-boots': <GiLeg size={24} />,
  'percussion-massage': <GiVibratingBall size={24} />,
};

// Enhanced Three.js Background with starfield effect
function BackgroundShader() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[4, 4]} />
      <shaderMaterial
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
          
          // Fractal noise
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
          
          // Starfield effect
          float stars(vec2 uv) {
            float star = 0.0;
            for (int i = 0; i < 50; i++) {
              vec2 pos = vec2(
                fract(sin(float(i) * 123.456) * 789.012),
                fract(sin(float(i) * 456.789) * 123.456)
              );
              float dist = length(uv - pos);
              float brightness = smoothstep(0.02, 0.0, dist);
              star += brightness * 0.5;
            }
            return star;
          }
          
          void main() {
            vec2 uv = vUv;
            vec2 movement = vec2(uTime * 0.01, uTime * 0.005);
            
            // Multiple layers of noise for depth
            float noise1 = fractalNoise(uv * 2.0 + movement);
            float noise2 = fractalNoise(uv * 4.0 - movement * 0.5);
            float noise3 = fractalNoise(uv * 8.0 + movement * 0.3);
            
            // Combine noise layers
            float fog = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
            
            // Starfield
            float starfield = stars(uv + movement * 0.1);
            
            // Radial gradient for center focus
            float radial = 1.0 - length(uv - vec2(0.5));
            radial = smoothstep(0.0, 0.8, radial);
            
            // Final color with subtle blue tint and stars
            vec3 color = vec3(0.02, 0.05, 0.08) + fog * 0.1 * radial + starfield * 0.3;
            
            gl_FragColor = vec4(color, 0.4);
          }
        `}
        transparent={true}
        blending={2} // Additive blending
        depthWrite={false}
      />
    </mesh>
  );
}

// Enhanced Service Node Component
interface ServiceNodeProps {
  service: {
    id: string;
    title: string;
    subtitle: string;
  };
  angle: number;
  radius: number;
  index: number;
  onHover: (index: number) => void;
  onLeave: () => void;
  onSelect: (serviceId: string) => void;
  isHovered: boolean;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({
  service,
  angle,
  radius,
  index,
  onHover,
  onLeave,
  onSelect,
  isHovered,
}) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const accentColor = SERVICE_COLORS[service.id as keyof typeof SERVICE_COLORS] || '#00bcd4';

  return (
    <motion.div
      className={styles.serviceNode}
      style={
        {
          '--x': `${x}px`,
          '--y': `${y}px`,
          '--accent-color': accentColor,
          '--index': index,
        } as React.CSSProperties
      }
      initial={{
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: x,
        y: y,
      }}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={onLeave}
      onClick={() => onSelect(service.id)}
    >
      <div className={styles.serviceIcon}>
        <div
          className={styles.serviceIconInner}
          style={{
            borderColor: accentColor,
            boxShadow: isHovered ? `0 0 20px ${accentColor}40` : 'none',
          }}
        >
          {ServiceIcons[service.id as keyof typeof ServiceIcons]}
        </div>
      </div>

      {/* Trailing particles effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles.trailEffect}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ExperiencePage: React.FC = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typewriterIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Service data for the radial menu
  const services = [
    servicesData['cold-plunge'],
    servicesData['infrared-sauna'],
    servicesData['traditional-sauna'],
    servicesData['red-light-therapy'],
    servicesData['compression-boots'],
    servicesData['percussion-massage'],
  ];

  const handleServiceSelect = (serviceId: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Add a brief delay for the transition animation
    setTimeout(() => {
      router.push(`/services/${serviceId}`);
    }, 300);
  };

  const typewriterEffect = (text: string) => {
    setIsTyping(true);
    setDisplayText('');
    let index = 0;

    // Clear any existing interval
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
    }

    typewriterIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        const newText = text.substring(0, index + 1);
        setDisplayText(newText);
        index++;
      } else {
        setIsTyping(false);
        if (typewriterIntervalRef.current) {
          clearInterval(typewriterIntervalRef.current);
        }
      }
    }, 40); // Slightly slower for better visibility
  };

  const handleHover = (hoverIndex: number) => {
    setHoveredIndex(hoverIndex);
    const service = services[hoverIndex];

    if (!service) {
      return;
    }

    // Create better console text based on service
    let consoleText = '';

    // Use a more robust approach with explicit text
    const serviceTexts: Record<string, string> = {
      'cold-plunge':
        'COLD PLUNGE\n\nImmerse in 40-50°F water\nfor 2-5 minutes\n\nBenefits: Recovery, mental clarity,\nstress resilience',
      'infrared-sauna':
        'INFRARED SAUNA\n\nDeep tissue warming at\n120-150°F for 20-30 min\n\nBenefits: Detoxification, relaxation,\ncirculation boost',
      'traditional-sauna':
        'TRADITIONAL SAUNA\n\nFinnish-style dry heat\n160-200°F for 10-20 min\n\nBenefits: Cardiovascular health,\nmuscle recovery, mental clarity',
      'compression-boots':
        'COMPRESSION BOOTS\n\nPneumatic compression therapy\nfor 20-30 minutes\n\nBenefits: Circulation, recovery,\nlymphatic drainage',
      'percussion-massage':
        'PERCUSSION MASSAGE\n\nDeep tissue percussion therapy\nfor targeted muscle relief\n\nBenefits: Muscle recovery, tension relief,\nimproved mobility',
      'red-light-therapy':
        'RED LIGHT THERAPY\n\nTherapeutic light treatment\nfor 10-20 minutes\n\nBenefits: Cellular regeneration,\nskin health, pain relief',
    };

    consoleText =
      serviceTexts[service.id] ||
      `${service.title.toUpperCase()}\n\n${service.subtitle || 'Service information'}`;

    typewriterEffect(consoleText);
  };

  // Determine panel position based on service location
  const getPanelPosition = () => {
    if (hoveredIndex === null) return 'right';

    // Left side: Compression Boots, Red Light Therapy, Traditional Sauna
    // Right side: Percussion Massage, Cold Plunge, Infrared Sauna
    const leftSideServices = ['compression-boots', 'red-light-therapy', 'traditional-sauna'];
    const currentService = services[hoveredIndex];
    return leftSideServices.includes(currentService.id) ? 'left' : 'right';
  };

  const handleLeave = () => {
    setHoveredIndex(null);
    setDisplayText('');
    setIsTyping(false);
  };

  return (
    <div className={styles.experiencePage}>
      {/* Three.js Background */}
      <div className={styles.background}>
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }} gl={{ alpha: true, antialias: true }}>
          <BackgroundShader />
        </Canvas>
      </div>

      {/* Page Title - Separate Container */}
      <motion.div
        className={styles.pageTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h1 className={styles.pageTitleHeading}>Choose Your Experience</h1>
        <p className={styles.pageTitleSubheading}>
          Select a service to begin your recovery journey
        </p>
      </motion.div>

      {/* Radial Service Menu */}
      <div className={styles.radialMenu}>
        {/* Background Ring */}
        <motion.div
          className={styles.backgroundRing}
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Central VI Logo */}
        <motion.div
          className={styles.centralLogo}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <VILogo width={120} height={60} color="#ffffff" strokeWidth={2} className={styles.logo} />
        </motion.div>

        {/* Service Nodes */}
        {services.map((service, index) => {
          const angle = index * 60 * (Math.PI / 180); // 60 degrees apart
          const radius = 160; // Distance from center - adjusted to match ring size

          return (
            <ServiceNode
              key={service.id}
              service={service}
              angle={angle}
              radius={radius}
              index={index}
              onHover={handleHover}
              onLeave={handleLeave}
              onSelect={handleServiceSelect}
              isHovered={hoveredIndex === index}
            />
          );
        })}
      </div>

      {/* Console-style Info Panel */}
      <motion.div
        className={`${styles.infoPanel} ${styles[`infoPanel--${getPanelPosition()}`]}`}
        initial={{ opacity: 0, x: getPanelPosition() === 'left' ? -50 : 50 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          x: hoveredIndex !== null ? 0 : getPanelPosition() === 'left' ? -50 : 50,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.infoPanel__header}>
          <div className={styles.infoPanel__status}>
            <span className={styles.infoPanel__dot} />
            <span className={styles.infoPanel__statusText}>
              {hoveredIndex !== null ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>
          <div className={styles.infoPanel__title}>SERVICE INFO</div>
        </div>
        <div className={styles.infoPanel__content}>
          <pre className={styles.infoPanel__text}>
            {displayText || 'No text loaded'}
            {isTyping && <span className={styles.infoPanel__cursor}>|</span>}
          </pre>
          {/* Debug info */}
          <div
            style={{
              fontSize: '10px',
              color: 'red',
              marginTop: '10px',
            }}
          >
            Debug: {displayText ? displayText.length : 0} chars
          </div>
        </div>
      </motion.div>

      {/* Spacing before footer */}
      <div className={styles.footerSpacing} />

      {/* Floating Particles */}
      <div className={styles.particles}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            style={
              {
                '--delay': `${i * 0.3}s`,
                '--duration': `${4 + i * 0.5}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExperiencePage;
