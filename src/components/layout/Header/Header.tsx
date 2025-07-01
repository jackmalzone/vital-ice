'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo/Logo';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { 
    label: 'Services', 
    href: '/services',
    dropdown: [
      { label: 'Infrared Sauna', href: '/services/infrared-sauna' },
      { label: 'Traditional Sauna', href: '/services/traditional-sauna' },
      { label: 'Cold Plunge', href: '/services/cold-plunge' },
      { label: 'Compression Boots', href: '/services/compression-boots' },
      { label: 'Percussion Massage', href: '/services/percussion-massage' },
      { label: 'Red Light Therapy', href: '/services/red-light-therapy' },
    ]
  },
  { label: 'Vision', href: '/vision' },
  { label: 'Historical Timeline', href: '/historical-timeline' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeMenu = () => {
    setOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink} aria-label="Home">
        <Logo className={styles.logo} />
      </Link>
      
      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <ul className={styles.desktopNavList}>
          {NAV_LINKS.map(link => (
            <li key={link.href} className={styles.desktopNavItem}>
              {link.dropdown ? (
                <div className={styles.dropdownContainer}>
                  <button
                    className={`${styles.dropdownTrigger} ${activeDropdown === link.label ? styles.active : ''}`}
                    onClick={() => handleDropdownToggle(link.label)}
                    onMouseEnter={() => setActiveDropdown(link.label)}
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.dropdownIcon}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {activeDropdown === link.label && (
                    <div 
                      className={styles.dropdown}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <ul className={styles.dropdownList}>
                        {link.dropdown.map(dropdownItem => (
                          <li key={dropdownItem.href} className={styles.dropdownItem}>
                            <Link
                              href={dropdownItem.href}
                              className={styles.dropdownLink}
                              onClick={closeMenu}
                            >
                              {dropdownItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`${styles.desktopNavLink} ${pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Book Now Button */}
      <motion.button
        className={styles.bookButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open('https://mindbody.com', '_blank')}
      >
        Book Now
      </motion.button>

      {/* Mobile Menu Button */}
      <button
        className={styles.hamburger}
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span className={styles.hamburgerBox}>
          <span className={styles.hamburgerInner} />
        </span>
      </button>

      {/* Mobile Overlay Menu */}
      {open && (
        <div className={styles.overlayMenu} onClick={closeMenu}>
          <nav className={styles.overlayNav} onClick={e => e.stopPropagation()}>
            <ul className={styles.overlayNavList}>
              {NAV_LINKS.map(link => (
                <li key={link.href} className={styles.overlayNavItem}>
                  {link.dropdown ? (
                    <div className={styles.mobileDropdownContainer}>
                      <button
                        className={`${styles.mobileDropdownTrigger} ${activeDropdown === link.label ? styles.active : ''}`}
                        onClick={() => handleDropdownToggle(link.label)}
                      >
                        {link.label}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.mobileDropdownIcon}
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {activeDropdown === link.label && (
                        <ul className={styles.mobileDropdownList}>
                          {link.dropdown.map(dropdownItem => (
                            <li key={dropdownItem.href} className={styles.mobileDropdownItem}>
                              <Link
                                href={dropdownItem.href}
                                className={styles.mobileDropdownLink}
                                onClick={closeMenu}
                              >
                                {dropdownItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`${styles.overlayNavLink} ${pathname === link.href ? styles.active : ''}`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  )}
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
