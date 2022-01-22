import React, { Component } from "react";

//为了避免命名冲突。我们可以做的是让我们的 withHover 高阶组件能够允许用户自己定义传入子组件的 prop 名。
function withHover(wrapperedComponent, propName = "hovering") {
  return class withHover extends Component {
    state = { hovering: false };

    mouseOver = () => this.setState({ hovering: true });
    mouseOut = () => this.setState({ hovering: false });

    render() {
      const props = {
        [propName]: this.state.hovering
      };
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <wrapperedComponent {...props} />
        </div>
      );
    }
  };
}

export default withHover;
