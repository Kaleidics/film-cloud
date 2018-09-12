import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {

  // Ensures that page loads at the top when routing
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
