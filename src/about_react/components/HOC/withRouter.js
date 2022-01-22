//withRouter 将会在任何被它包裹的组件渲染时， 将 match, location 和 history prop 传递给它们
import React, { Component } from "react";

class Game extends Component {
  render() {
    const { match, location, history } = this.props;
    return <div />;
  }
}

export default Game;

//当我们使用高阶组件时，会发生一些**控制反转**的情况。

//但是在使用第三方高阶组件的时候，我们没有这个配置项。
//如果我们的 Game 组件已经使用了 match、location 或者  history 的话，
//就没有（像使用我们自己的组件）那没幸运了。
//我们除了改变我们之前所需要使用的 props 名之外就只能不使用 withRouter 高阶组件了。
