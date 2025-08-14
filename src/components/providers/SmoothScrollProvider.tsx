'use client';

import { FC, ReactNode, useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { setupSmoothScroll } from '@/lib/utils/animations';

interface ISmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider: FC<ISmoothScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    return Sentry.startSpan(
      {
        op: 'ui.smooth_scroll',
        name: 'Smooth Scroll Setup',
      },
      span => {
        try {
          const lenis = setupSmoothScroll();

          if (!lenis) {
            span.setAttribute('lenis_initialized', false);
            return;
          }

          span.setAttribute('lenis_initialized', true);

          return () => {
            try {
              lenis.destroy();
            } catch (error) {
              Sentry.captureException(error, {
                tags: {
                  component: 'SmoothScrollProvider',
                  error_type: 'lenis_destroy_failed',
                },
              });
            }
          };
        } catch (error) {
          Sentry.captureException(error, {
            tags: {
              component: 'SmoothScrollProvider',
              error_type: 'smooth_scroll_setup_failed',
            },
          });
        }
      }
    );
  }, []);

  return <>{children}</>;
};
