import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionProps } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Common animation variants
export const fadeInUp: MotionProps['variants'] = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer: MotionProps['variants'] = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// GSAP animations
export const scrollReveal = (element: string, options = {}) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    ...options,
  });
};

export const parallaxEffect = (element: HTMLElement, speed = 0.5) => {
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    element.style.transform = `translate3d(0, ${rate}px, 0)`;
  };

  window.addEventListener('scroll', updateParallax);
  return () => window.removeEventListener('scroll', updateParallax);
};

// Lenis smooth scroll setup
export const setupSmoothScroll = () => {
  if (typeof window === 'undefined') return null;

  const lenis = new (window as any).Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenis;
}; 