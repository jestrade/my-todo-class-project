
import "./App.css";
import { AuthenticatorProvider } from "./contexts/Authenticator";
import Root from "./pages/root";
import ErrorBoundary from "./components/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthenticatorProvider>
        <Root />
      </AuthenticatorProvider>
    </ErrorBoundary>
  )
}

export default App
