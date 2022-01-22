import React, { Component } from "react";
import ReactDOM from "react-dom";

//defaultProps
class CustomButton extends Component {
  render() {
    const { color } = this.props;
    return (
      <>
        <button styles={{ color }}>button</button>
      </>
    );
  }
}

CustomButton.defaultProps = {
  color: "blue"
};

//If props.color is not provided, it will be set by default to 'blue':

// render() {
//   return <CustomButton />; // props.color will be set to blue
// }

//If props.color is set to null, it will remain null:
// render() {
//   return <CustomButton color={null} />; // props.color will remain null
// }

//returning multiple elements
const MultipleElement = () => {
  //Don't forget the keys
  return [<li key="A">First item</li>, <li key="B">Second item</li>];
  //or
  //Fragments don't require keys
  return (
    <React.Fragment>
      <li>First item</li>
      <li>Second item</li>
    </React.Fragment>
  );
};

//Returning strings
const StringEle = () => {
  return "Look ma, no spans!";
};

//componentDidCatch

class ComponentWithCatch extends Component {
  //...
  componentDidCatch(error, info) {
    this.setState({ error });
  }
  render() {
    return null;
  }
}

//Portals
//This renders this props children into any location in the DOM.
const PortalEle = ({ children }) =>
  React.createPortal(children, document.getElementById("menu"));

//render prop 是一个组件用来了解要渲染什么内容的函数 prop。

//这一技术使得共享代码间变得相当便利。为了实现这一行为，渲染一个带有 render prop 的 < Mouse > 组件能够告诉它当前鼠标坐标(x, y) 要渲染什么。

//关于 render props 一个有趣的事情是你可以使用一个带有 render props 的常规组件来实现大量的 高阶组件(HOC) 。例如，
//如果你更偏向于使用一个 withMouse 的高阶组件而不是一个 < Mouse > 组件，你可以轻松的创建一个带有 render prop 的常规 < Mouse > 组件的高阶组件。

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!

class Mouse extends Component {
  state = {
    mouse: {
      X: 0,
      Y: 0
    }
  };
  handleMousemove = event => {
    this.setState({
      mouse: {
        X: event.clientX,
        Y: event.clientY
      }
    });
  };
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMousemove);
  }
  render() {
    const { render } = this.props;
    const { mouse } = this.state;
    return <div>{render(mouse)}</div>;
  }
}

function withMouse(WrapperComponent) {
  return class extends Component {
    render() {
      return (
        <Mouse
          render={mouse => <WrapperComponent {...this.props} mouse={mouse} />}
        />
      );
    }
  };
}

// 在 React.PureComponent 中使用 render props 要注意
// 如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 React.PureComponent 带来的优势。
//这是因为浅 prop 比较对于新 props 总会返回 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。

// 在 React.PureComponent 中使用 render props 要注意
// 如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 React.PureComponent 带来的优势。
//这是因为浅 prop 比较对于新 props 总会返回 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。

//为了绕过这一问题，有时你可以定义一个 prop 作为实例方法，类似如下：
const Cat = ({ mouse }) => {
  return <div>{mouse}</div>;
};

class MouseTracker extends Component {
  constructor(props) {
    super(props);

    //this binding ensuers that `this.renderTheCat` always refers
    //to the same function when we use it in render
    this.renderTheCat = this.renderTheCat.bind(this);
  }

  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}

//<Mouse> 应继承React.Component，万一你没法提前在构造函数中绑定实例方法（如因为你可能要掩盖组件的 props 和/或 state)。
