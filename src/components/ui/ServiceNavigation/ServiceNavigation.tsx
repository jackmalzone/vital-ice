'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { servicesData } from '@/lib/data/services';
import styles from './ServiceNavigation.module.css';

const serviceOrder = [
  'cold-plunge',
  'infrared-sauna',
  'traditional-sauna',
  'compression-boots',
  'percussion-massage',
  'red-light-therapy',
];

const SERVICE_COLORS = {
  'cold-plunge': '#00bcd4', // Water - Vital Ice Blue
  'infrared-sauna': '#ff3e36', // Fire/Light - Blood Orange
  'traditional-sauna': '#d45700', // Earth/Wood - Deep Umber
  'red-light-therapy': '#e63e80', // Light - Rose Gold
  'compression-boots': '#80cbc4', // Air - Pale Silver
  'percussion-massage': '#64b5f6', // Motion - Electric Cyan
};

export default function ServiceNavigation() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get current service index
  const currentServiceId = pathname.split('/').pop();
  const currentIndex = serviceOrder.indexOf(currentServiceId || '');

  // Get previous and next services
  const prevService = currentIndex > 0 ? serviceOrder[currentIndex - 1] : null;
  const nextService =
    currentIndex < serviceOrder.length - 1 ? serviceOrder[currentIndex + 1] : null;

  // Get service data
  const currentService = currentServiceId ? servicesData[currentServiceId] : null;
  const prevServiceData = prevService ? servicesData[prevService] : null;
  const nextServiceData = nextService ? servicesData[nextService] : null;

  if (!currentService) return null;

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className={styles.sidebarToggle}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle service navigation"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Right Arrow for Next Service */}
      {nextService && (
        <Link
          href={`/services/${nextService}`}
          className={styles.rightArrow}
          aria-label={`Next: ${nextServiceData?.title}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}

      {/* Left Arrow for Previous Service */}
      {prevService && (
        <Link
          href={`/services/${prevService}`}
          className={styles.leftArrow}
          aria-label={`Previous: ${prevServiceData?.title}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h3>Services</h3>
          <button
            className={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {serviceOrder.map(serviceId => {
            const service = servicesData[serviceId];
            if (!service) return null;

            const isActive = serviceId === currentServiceId;
            const serviceColor =
              SERVICE_COLORS[serviceId as keyof typeof SERVICE_COLORS] || service.accentColor;

            return (
              <Link
                key={serviceId}
                href={`/services/${serviceId}`}
                className={`${styles.sidebarLink} ${isActive ? styles.active : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className={styles.serviceIcon} style={{ backgroundColor: serviceColor }}>
                  {service.title.charAt(0)}
                </div>
                <div className={styles.serviceInfo}>
                  <span className={styles.serviceTitle}>{service.title}</span>
                  <span className={styles.serviceSubtitle}>{service.subtitle}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && <div className={styles.backdrop} onClick={() => setIsSidebarOpen(false)} />}
    </>
  );
}
