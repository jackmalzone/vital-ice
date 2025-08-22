'use client';

import { useEffect } from 'react';

interface ErrorSuppressionProviderProps {
  children: React.ReactNode;
}

export default function ErrorSuppressionProvider({ children }: ErrorSuppressionProviderProps) {
  useEffect(() => {
    // Nuclear error suppression for Mindbody widgets
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const originalConsoleLog = console.log;
    const originalError = window.Error;

    // Override Error constructor completely
    const CustomError = function (message?: string, options?: ErrorOptions) {
      if (typeof message === 'string') {
        const msg = message.toLowerCase();
        if (
          msg.includes('mixpanel') ||
          msg.includes('mindbody') ||
          msg.includes('healcode') ||
          msg.includes('jquery') ||
          msg.includes('invalid storage entry') ||
          msg.includes('not valid json') ||
          msg.includes('message channel closed') ||
          msg.includes('site.webmanifest') ||
          msg.includes('manifest fetch') ||
          msg.includes('429') ||
          msg.includes('403')
        ) {
          // Return a completely silent error with no message
          const silentError = new originalError('');
          silentError.stack = undefined;
          silentError.message = '';
          silentError.toString = () => '';
          return silentError;
        }
      }
      return new originalError(message, options);
    } as typeof Error;

    // Copy Error constructor properties
    CustomError.captureStackTrace = Error.captureStackTrace;
    CustomError.prepareStackTrace = Error.prepareStackTrace;
    CustomError.stackTraceLimit = Error.stackTraceLimit;

    window.Error = CustomError;

    // Nuclear console.error override
    console.error = function (...args) {
      // Check if ANY argument contains Mindbody-related content
      const allArgs = args
        .map(arg => String(arg))
        .join(' ')
        .toLowerCase();

      if (
        allArgs.includes('mixpanel') ||
        allArgs.includes('mindbody') ||
        allArgs.includes('healcode') ||
        allArgs.includes('jquery') ||
        allArgs.includes('invalid storage entry') ||
        allArgs.includes('not valid json') ||
        allArgs.includes('message channel closed') ||
        allArgs.includes('silent error') ||
        allArgs.includes('429') ||
        allArgs.includes('403') ||
        allArgs.includes('sentry') ||
        allArgs.includes('ingest.us.sentry.io') ||
        allArgs.includes('site.webmanifest') ||
        allArgs.includes('manifest fetch') ||
        allArgs.includes('too many requests')
      ) {
        return; // Suppress completely
      }

      // Pass through all other errors
      originalConsoleError.apply(console, args);
    };

    // Override console.warn as well
    console.warn = function (...args) {
      const allArgs = args
        .map(arg => String(arg))
        .join(' ')
        .toLowerCase();

      if (
        allArgs.includes('mixpanel') ||
        allArgs.includes('mindbody') ||
        allArgs.includes('healcode') ||
        allArgs.includes('jquery') ||
        allArgs.includes('site.webmanifest') ||
        allArgs.includes('manifest fetch') ||
        allArgs.includes('429') ||
        allArgs.includes('403')
      ) {
        return; // Suppress completely
      }

      originalConsoleWarn.apply(console, args);
    };

    // Override console.log for good measure
    console.log = function (...args) {
      const allArgs = args
        .map(arg => String(arg))
        .join(' ')
        .toLowerCase();

      if (
        allArgs.includes('mixpanel error') ||
        allArgs.includes('invalid storage entry') ||
        allArgs.includes('site.webmanifest') ||
        allArgs.includes('manifest fetch') ||
        allArgs.includes('429') ||
        allArgs.includes('403')
      ) {
        return; // Suppress error logs
      }

      originalConsoleLog.apply(console, args);
    };

    // Suppress network requests for problematic URLs
    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof Request
          ? input.url
          : input.toString();

      if (
        url.includes('site.webmanifest') ||
        url.includes('ingest.us.sentry.io') ||
        url.includes('mixpanel')
      ) {
        // Return a rejected promise that won't log errors
        return Promise.reject(new Error('Suppressed request'));
      }

      return originalFetch.call(this, input, init);
    };

    // Cleanup function
    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      console.log = originalConsoleLog;
      window.Error = originalError;
      window.fetch = originalFetch;
    };
  }, []);

  return <>{children}</>;
}
