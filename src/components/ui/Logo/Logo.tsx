'use client';

import Image from 'next/image';
import { FC } from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <Image
        src="/images/logo-dark.png"
        alt="Vital Ice Logo"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
};

export default Logo;
