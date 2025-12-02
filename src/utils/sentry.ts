import * as Sentry from '@sentry/react';

/**
 * Capture an exception and send to Sentry
 */
export const captureException = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  });
};

/**
 * Capture a message to Sentry
 */
export const captureMessage = (
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info'
) => {
  Sentry.captureMessage(message, level);
};

/**
 * Set user context for error tracking
 */
export const setUserContext = (userId: string, email?: string, username?: string) => {
  Sentry.setUser({
    id: userId,
    email,
    username,
  });
};

/**
 * Clear user context (e.g., on logout)
 */
export const clearUserContext = () => {
  Sentry.setUser(null);
};

/**
 * Add breadcrumb for debugging
 */
export const addBreadcrumb = (
  message: string,
  category: string = 'user-action',
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info',
  data?: Record<string, any>
) => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
  });
};
