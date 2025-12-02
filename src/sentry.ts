import * as Sentry from '@sentry/react';
import { Replay } from '@sentry/replay';

export function initSentry() {
  const isDevelopment = import.meta.env.DEV;
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn && !isDevelopment) {
    console.warn('Sentry DSN not configured');
    return;
  }

  Sentry.init({
    // Replace with your actual Sentry DSN
    dsn: dsn || 'https://examplePublicKey@o0.ingest.sentry.io/0',
    
    // Environment configuration
    environment: import.meta.env.MODE,
    
    // Enable tracing
    // Enable tracing
    integrations: [
      Sentry.browserTracingIntegration(),
      new Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
    // Adjust in production to reduce costs
    tracesSampleRate: isDevelopment ? 1.0 : 0.1,
    
    // Capture Replay for 10% of all sessions
    replaysSessionSampleRate: 0.1,
    
    // Capture Replay for 100% of sessions with an error
    replaysOnErrorSampleRate: 1.0,
    
    // Enable debug mode in development
    debug: isDevelopment,
    
    // Ignore certain errors
    ignoreErrors: [
      // Random plugins/extensions
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
    ],
  });
}
