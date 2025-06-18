"use client";
import { useState } from "react";
import Logo from "@/components/ui/Logo/Logo";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <a href="#home" className={styles.logoLink} aria-label="Home">
        <Logo size="xlarge" className={styles.logo} />
      </a>
      <button
        className={styles.hamburger}
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.hamburgerBox}>
          <span className={styles.hamburgerInner} />
        </span>
      </button>
      {/* Overlay menu */}
      {open && (
        <div className={styles.overlayMenu} onClick={() => setOpen(false)}>
          <nav className={styles.overlayNav} onClick={e => e.stopPropagation()}>
            <ul className={styles.overlayNavList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href} className={styles.overlayNavItem}>
                  <a href={link.href} className={styles.overlayNavLink} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
