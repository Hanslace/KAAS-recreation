import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the structural traceback directly to the console pipeline
    console.error("💥 Crashed Component Boundary Tree:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '0.75rem', margin: '1rem' }}>
          <h2 style={{ color: '#991B1B', margin: '0 0 0.5rem 0' }}>Something went wrong.</h2>
          <p style={{ color: '#7F1D1D', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.stack || this.state.error?.toString()}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#991B1B', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
