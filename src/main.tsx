import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { initSentry } from './sentry'
import { useEffect } from "react";
import { initAnalytics } from "./analytics";
import * as Sentry from '@sentry/react'
useEffect(() => {
  initAnalytics();
}, []);


// Initialize Sentry before rendering the app
initSentry()

const SentryApp = Sentry.withProfiler(App)

createRoot(document.getElementById('root')!).render(
  <SentryApp />
)
