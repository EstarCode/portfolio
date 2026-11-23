import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: undefined });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-card" role="alert">
          <p className="error-fallback-title">
            {this.props.fallbackTitle || "Unable to display this section"}
          </p>
          <button
            type="button"
            className="ghost"
            style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", marginTop: "0.5rem" }}
            onClick={this.handleRetry}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

