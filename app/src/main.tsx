import { Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

/* ---- Global Error Boundary ---- */
interface ErrorBoundaryState { hasError: boolean; message: string; }
class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message ?? 'Error desconocido' };
  }
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: '100vh', background: '#0a0807', color: '#fff',
          fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '2rem',
        }}>
          <h1 style={{ fontSize: '3rem', color: '#ff3d00', marginBottom: '0.5rem' }}>Mixtura</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
            Ocurrió un error al cargar la página.<br />
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>{this.state.message}</span>
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#ff3d00', color: '#fff', border: 'none',
              padding: '0.75rem 2rem', borderRadius: '999px',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
