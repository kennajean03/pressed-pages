import { Component } from "react"

export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Pressed Pages route failed to render:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="route-error-card" role="alert">
          <span aria-hidden="true">▥</span>
          <h1>This page lost its place.</h1>
          <p>
            Your library is still safe. Reload Pressed Pages to reopen this page.
          </p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload Pressed Pages
          </button>
        </section>
      )
    }

    return this.props.children
  }
}
