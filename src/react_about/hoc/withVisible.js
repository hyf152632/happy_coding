import React, { Component } from 'react';

function withVisible(WrappedComponent) {
  return class extends Component {
    render() {
      const { visible, ...props } = this.props;
      if (visible === false) return null;
      return <WrappedComponent {...props} />;
    }
  };
}

export default withVisible;
