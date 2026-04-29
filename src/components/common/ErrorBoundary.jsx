import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
            Please try refreshing the page.
          </p>
          <button
            className="btn btn-primary bg-gradient-primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
