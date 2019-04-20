import React, { Component } from 'react';

//为了避免命名冲突，我们可以做的是让我们的 withHover 高阶组件能够允许用户支持定义传入子组件的 prop 名。
function withHover(wrappedComponent, propName = 'hovering') {
  return class withHover extends Component {
    state = { hovering: false };

    mouseOver = () => this.setState({ hovering: true });
    mouseOut = () => this.setState({ hovering: false });

    render() {
      const { hovering } = this.state;
      const injected = {
        [propName]: hovering
      };
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <wrappedComponent {...injected} {...this.props} />
        </div>
      );
    }
  };
}

export default withHover;
