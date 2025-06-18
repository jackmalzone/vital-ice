import { useEffect } from 'react';
import { setupSmoothScroll } from '../utils/animations';

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = setupSmoothScroll();
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);
}; 