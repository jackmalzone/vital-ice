'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from '@/components/ui/LoadingScreen/LoadingScreen';

interface NavigationLoadingContextType {
  startNavigation: () => void;
  isLoading: boolean;
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType | undefined>(undefined);

export const useNavigationLoading = () => {
  const context = useContext(NavigationLoadingContext);
  if (!context) {
    throw new Error('useNavigationLoading must be used within NavigationLoadingProvider');
  }
  return context;
};

interface NavigationLoadingProviderProps {
  children: React.ReactNode;
}

export default function NavigationLoadingProvider({ children }: NavigationLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 2000); // Shorter initial load time

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Handle navigation loading
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(true);

      // Simulate navigation loading time (adjust as needed)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // 800ms for navigation

      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad]);

  const startNavigation = () => {
    if (!isInitialLoad) {
      setIsLoading(true);
    }
  };

  const value = {
    startNavigation,
    isLoading: isInitialLoad || isLoading,
  };

  if (isInitialLoad) {
    return <LoadingScreen onComplete={() => setIsInitialLoad(false)} duration={2000} />;
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} duration={800} />;
  }

  return (
    <NavigationLoadingContext.Provider value={value}>{children}</NavigationLoadingContext.Provider>
  );
}
