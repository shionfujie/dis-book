import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("logging error");
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      this.setState({ hasError: false });
      return null;
    }

    return this.props.children;
  }
}
