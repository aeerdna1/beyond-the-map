import { Component, type ReactNode } from 'react';

/**
 * For optional extras such as the globe and the map: if their code cannot be downloaded
 * (offline, or an old version after a deploy), show `fallback` instead of letting the error
 * reach the page-level boundary, which would replace the whole page with an error message.
 */
export default class OptionalBoundary extends Component<{ fallback?: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
