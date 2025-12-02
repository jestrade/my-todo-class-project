import React from 'react';
import * as Sentry from '@sentry/react';

// Este componente es una plantilla si necesitas hacer pruebas de Sentry en el futuro
function SentryTestComponent() {
  return null;
}

export default Sentry.withProfiler(SentryTestComponent);
