import { Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.tsx';

/* ── Error Boundary ────────────────────────────────────────── */
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; message: string }> {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message ?? 'Error desconocido' };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[Mixtura] Error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#0a0000', color: '#fff',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '2rem',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
          <h1 style={{ fontSize: '2rem', color: '#D62828', marginBottom: '0.5rem' }}>Mixtura 2026</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', maxWidth: '400px' }}>
            Ocurrió un error al cargar la página. Por favor intenta de nuevo.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#D62828', color: '#fff', border: 'none',
              padding: '0.85rem 2.5rem', borderRadius: '999px',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700,
            }}
          >Reintentar</button>
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
