import React from 'react';
import * as Sentry from '@sentry/react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Algo salió mal</h1>
          <p>La aplicación encontró un error. Por favor, recarga la página.</p>
          {import.meta.env.DEV && (
            <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
              {this.state.error?.toString()}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default Sentry.withErrorBoundary(ErrorBoundary, {
  fallback: (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Algo salió mal</h1>
      <p>La aplicación encontró un error. Por favor, recarga la página.</p>
    </div>
  ),
  showDialog: false,
});
