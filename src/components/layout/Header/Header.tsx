'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo/Logo';
import VILogo from '@/components/ui/Logo/VILogo';
import { servicesData } from '@/lib/data/services';
import { useServiceColor } from '@/lib/hooks/useServiceColor';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Experience', href: '/experience' },
  { label: 'Vision', href: '/vision' },
  { label: 'Our Story', href: '/about' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const serviceColor = useServiceColor();

  // Determine logo color based on current service page
  const getLogoColor = () => {
    // Check if we're on a service page
    if (pathname.startsWith('/services/')) {
      const serviceId = pathname.split('/').pop();
      if (serviceId && servicesData[serviceId]) {
        return servicesData[serviceId].accentColor;
      }
    }
    // Default to white for other pages
    return '#ffffff';
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink} aria-label="Home">
        <Logo className={styles.logo} />
      </Link>

      {/* Center VI Logo */}
      <div className={styles.centerLogo}>
        <VILogo className={styles.viLogo} color={getLogoColor()} />
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <ul className={styles.desktopNavList}>
          {NAV_LINKS.map(link => (
            <li key={link.href} className={styles.desktopNavItem}>
              <Link
                href={link.href}
                className={`${styles.desktopNavLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button - Ice Cube */}
      <button
        className={`${styles.iceCube} ${open ? styles.active : ''}`}
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => {
          setOpen(v => !v);
        }}
      >
        <div className={styles.iceCubeContainer}>
          {/* Ice Cube Faces */}
          <div className={styles.iceCubeFace} />
          <div className={styles.iceCubeFace} />
          <div className={styles.iceCubeFace} />
          <div className={styles.iceCubeFace} />
          <div className={styles.iceCubeFace} />
          <div className={styles.iceCubeFace} />
        </div>
      </button>

      {/* Mobile Overlay Menu */}
      {open && (
        <div className={styles.overlayMenu} onClick={closeMenu}>
          <nav className={styles.overlayNav} onClick={e => e.stopPropagation()}>
            <ul className={styles.overlayNavList}>
              {NAV_LINKS.map(link => (
                <li key={link.href} className={styles.overlayNavItem}>
                  <Link
                    href={link.href}
                    className={`${styles.overlayNavLink} ${pathname === link.href ? styles.active : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className={styles.overlayNavItem}>
                <button
                  className={styles.mobileBookButton}
                  onClick={() => {
                    closeMenu();
                    window.open('https://mindbody.com', '_blank');
                  }}
                >
                  Book Now
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
