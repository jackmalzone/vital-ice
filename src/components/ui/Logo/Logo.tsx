'use client';

import Image from 'next/image';
import { FC } from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const Logo: FC<LogoProps> = ({ className = '', width, height, priority = false }) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <Image
        src="/images/logo-dark.png"
        alt="Vital Ice Logo"
        width={width || 300}
        height={height || 150}
        style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
        priority={priority}
      />
    </div>
  );
};

export default Logo;
