'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
import PanelZone from '@/components/ui/PanelZone/PanelZone';
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
} as const;



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
          {(() => {
            const icon = ServiceIcons[service.id as keyof typeof ServiceIcons];
            return icon || <GiSnowflake1 size={24} />;
          })()}
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
  const [isStackedLayout, setIsStackedLayout] = useState<boolean>(true); // Default to stacked layout
  const typewriterIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect screen size for responsive panel rendering
  useEffect(() => {
    const checkScreenSize = () => {
      const isStacked = window.innerWidth <= 1400;
      setIsStackedLayout(isStacked);
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

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

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Panel Zone - Only render in desktop layout */}
        {!isStackedLayout && (
          <PanelZone position="left" isVisible={hoveredIndex !== null && getPanelPosition() === 'left'}>
            <div className={styles.panelContent}>
              <div className={styles.panelHeader}>
                <div className={styles.panelStatus}>
                  <span className={styles.panelDot} />
                  <span className={styles.panelStatusText}>
                    {hoveredIndex !== null ? 'ACTIVE' : 'STANDBY'}
                  </span>
                  <span style={{ marginLeft: '1rem' }}>&nbsp;</span>
                </div>
                <div className={styles.panelTitle}>SERVICE INFO</div>
              </div>
              <pre className={styles.panelText}>
                {displayText || 'No text loaded'}
                {isTyping && <span className={styles.panelCursor}>|</span>}
              </pre>
            </div>
          </PanelZone>
        )}

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
            <VILogo width={140} height={80} color="#ffffff" strokeWidth={4} className={styles.logo} />
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

        {/* Right Panel Zone - Only render in desktop layout */}
        {!isStackedLayout && (
          <PanelZone position="right" isVisible={hoveredIndex !== null && getPanelPosition() === 'right'}>
            <div className={styles.panelContent}>
              <div className={styles.panelHeader}>
                <div className={styles.panelStatus}>
                  <span className={styles.panelDot} />
                  <span className={styles.panelStatusText}>
                    {hoveredIndex !== null ? 'ACTIVE' : 'STANDBY'}
                  </span>
                  <span style={{ marginLeft: '1rem' }}>&nbsp;</span>
                </div>
                <div className={styles.panelTitle}>SERVICE INFO</div>
              </div>
              <pre className={styles.panelText}>
                {displayText || 'No text loaded'}
                {isTyping && <span className={styles.panelCursor}>|</span>}
              </pre>
            </div>
          </PanelZone>
        )}

        {/* Stacked Panel Zone - Only render in stacked layout */}
        {isStackedLayout && (
          <PanelZone position="stacked" isVisible={hoveredIndex !== null}>
            <div className={styles.panelContent}>
              <div className={styles.panelHeader}>
                <div className={styles.panelStatus}>
                  <span className={styles.panelDot} />
                  <span className={styles.panelStatusText}>
                    {hoveredIndex !== null ? 'ACTIVE' : 'STANDBY'}
                  </span>
                  <span style={{ marginLeft: '1rem' }}>&nbsp;</span>
                </div>
                <div className={styles.panelTitle}>SERVICE INFO</div>
              </div>
              <pre className={styles.panelText}>
                {displayText || 'No text loaded'}
                {isTyping && <span className={styles.panelCursor}>|</span>}
              </pre>
            </div>
          </PanelZone>
        )}
      </div>

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
