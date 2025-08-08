'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import VILogo from '@/components/ui/Logo/VILogo';
import { servicesData } from '@/lib/data/services';
import { springConfigs } from '@/lib/utils/animations';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Our Story', href: '/about' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
      <Link
        href="/"
        className={`${styles.logoLink} ${open ? styles.logoLinkOpen : ''}`}
        aria-label="Home"
      >
        <VILogo className={styles.logo} color={getLogoColor()} />
      </Link>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <ul className={styles.desktopNavList}>
          {NAV_LINKS.map((link, index) => (
            <motion.li
              key={link.href}
              className={styles.desktopNavItem}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...springConfigs.gentle,
                delay: index * 0.1,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springConfigs.quick}
              >
                <Link
                  href={link.href}
                  className={`${styles.desktopNavLink} ${pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button - Ice Cube */}
      <button
        className={`${styles.iceCube} ${open ? styles.active : ''} ${open ? styles.iceCubeOpen : ''}`}
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
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  className={styles.overlayNavItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    ...springConfigs.responsive,
                    delay: index * 0.1,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springConfigs.quick}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.overlayNavLink} ${pathname === link.href ? styles.active : ''}`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
              <motion.li
                className={styles.overlayNavItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...springConfigs.responsive,
                  delay: NAV_LINKS.length * 0.1,
                }}
              >
                <motion.button
                  className={styles.mobileBookButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springConfigs.quick}
                  onClick={() => {
                    closeMenu();
                    window.open('https://mindbody.com', '_blank');
                  }}
                >
                  Book Now
                </motion.button>
              </motion.li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
