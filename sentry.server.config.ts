// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://87a54d85ac4fa0d12bba04869c5fa53e@o4509843732496384.ingest.us.sentry.io/4509843734265856',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 0.05, // Reduced to 5% to prevent rate limiting

  // Enable profiling
  profileSessionSampleRate: 0.05, // Reduced to 5% to prevent rate limiting
  profileLifecycle: 'trace', // Enable profiling during active traces

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Integrations for server-side tracking
  integrations: [
    // Node.js performance monitoring with profiling
    nodeProfilingIntegration(),
  ],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out certain events to reduce volume
  beforeSend(event) {
    // Filter out 429 errors from Sentry itself to prevent feedback loops
    if (event.exception && event.exception.values) {
      const has429Error = event.exception.values.some(
        (exception: any) => exception.value && exception.value.includes('429')
      );
      if (has429Error) {
        return null;
      }
    }
    return event;
  },

  // Reduce the number of events sent
  maxBreadcrumbs: 5, // Reduced from 10 to 5
  attachStacktrace: false, // Disable stack traces for performance
});
