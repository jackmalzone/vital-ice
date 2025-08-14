// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://87a54d85ac4fa0d12bba04869c5fa53e@o4509843732496384.ingest.us.sentry.io/4509843734265856',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1.0, // Capture 100% of the transactions

  // Enable profiling
  profileSessionSampleRate: 1.0, // Profile 100% of sessions
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
});
