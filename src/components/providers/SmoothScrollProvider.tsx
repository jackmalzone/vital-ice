'use client';

import { FC, ReactNode, useEffect } from 'react';
import { setupSmoothScroll } from '@/lib/utils/animations';

interface ISmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider: FC<ISmoothScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    const lenis = setupSmoothScroll();
    
    if (!lenis) return;

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}; 