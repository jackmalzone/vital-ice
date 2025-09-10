'use client';

import React, { useState } from 'react';
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
import { SmartPanel } from '@/components/ui/SmartPanel/SmartPanel';
import styles from './page.module.css';

const SERVICE_COLORS = {
  'cold-plunge': '#00bcd4',
  'infrared-sauna': '#ff3e36',
  'traditional-sauna': '#d45700',
  'red-light-therapy': '#e63e80',
  'compression-boots': '#80cbc4',
  'percussion-massage': '#64b5f6',
};

const ServiceIcons = {
  'cold-plunge': GiSnowflake1,
  'infrared-sauna': GiFire,
  'traditional-sauna': GiCampfire,
  'red-light-therapy': GiLightningTrio,
  'compression-boots': GiLeg,
  'percussion-massage': GiVibratingBall,
} as const;

interface ServiceNodeProps {
  service: {
    id: string;
    title: string;
    subtitle: string;
  };
  angle: number;
  radius: number;
  index: number;
  onHover: (_index: number) => void;
  onLeave: () => void;
  onSelect: (_id: string) => void;
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
      data-service-index={index}
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
            const IconComponent = ServiceIcons[service.id as keyof typeof ServiceIcons];
            return IconComponent ? <IconComponent size={24} /> : <GiSnowflake1 size={24} />;
          })()}
        </div>
      </div>

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

  const services = [
    servicesData['cold-plunge'],
    servicesData['infrared-sauna'],
    servicesData['traditional-sauna'],
    servicesData['red-light-therapy'],
    servicesData['compression-boots'],
    servicesData['percussion-massage'],
  ];

  const serviceDescriptions = {
    'cold-plunge': 'Cold water immersion therapy for muscle recovery and inflammation reduction',
    'infrared-sauna': 'Infrared heat therapy for detoxification and stress relief',
    'traditional-sauna': 'Finnish sauna therapy for cardiovascular health and wellness',
    'red-light-therapy': 'Red light phototherapy for skin health and muscle recovery',
    'compression-boots': 'Compression therapy for improved circulation and recovery',
    'percussion-massage': 'Percussive massage therapy for deep tissue muscle relief',
  };

  const getLogoColor = () => {
    if (hoveredIndex === null) return '#ffffff';
    const serviceId = services[hoveredIndex]?.id;
    return SERVICE_COLORS[serviceId as keyof typeof SERVICE_COLORS] || '#ffffff';
  };

  const handleServiceSelect = (id: string) => {
    router.push(`/services/${id}`);
  };

  const handleHover = (hoverIndex: number) => {
    setHoveredIndex(hoverIndex);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const getPanelSideForIndex = (index: number | null) => {
    if (index === null) return 'right';
    const rightSideIndices = [0, 1, 5];
    const isRightSide = rightSideIndices.includes(index);
    return isRightSide ? 'right' : 'left';
  };

  const hoveredService = hoveredIndex !== null ? services[hoveredIndex] : null;
  const panelSide = getPanelSideForIndex(hoveredIndex);

  return (
    <div className={styles.experiencePage}>
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

      <div className={styles.mainGridNew}>
        <div className={styles.radialMenu}>
          <motion.div
            className={styles.backgroundRing}
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

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
            <VILogo
              width={140}
              height={80}
              color={getLogoColor()}
              strokeWidth={4}
              className={styles.logo}
            />
          </motion.div>

          {services.map((service, index) => {
            if (!service) return null;

            const angle = index * 60 * (Math.PI / 180);
            const radius = 160;

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
      </div>

      {hoveredService && hoveredService.id && (
        <SmartPanel
          isVisible={hoveredIndex !== null}
          title=""
          accentColor={
            SERVICE_COLORS[hoveredService.id as keyof typeof SERVICE_COLORS] || '#00bcd4'
          }
          anchorSelector={`[data-service-index="${hoveredIndex}"]`}
          panelSide={panelSide}
        >
          <div>
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '1.4rem',
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: '400',
                color: SERVICE_COLORS[hoveredService.id as keyof typeof SERVICE_COLORS],
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textAlign: 'left',
                lineHeight: '1.2',
              }}
            >
              {hoveredService.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: '0.95rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.4',
                textAlign: 'left',
              }}
            >
              {serviceDescriptions[hoveredService.id as keyof typeof serviceDescriptions]}
            </p>
          </div>
        </SmartPanel>
      )}

      <div className={styles.footerSpacing} />

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
    </div>
  );
};

export default ExperiencePage;
