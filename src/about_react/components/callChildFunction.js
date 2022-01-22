import React, { Component } from "react";

class Parent extends Component {
  onRef = ref => {
    this.child = ref;
  };
  click = e => {
    if (e) e.stopPropagation();
    this.child.myName();
  };
  render() {
    return (
      <div>
        <Child onRef={this.onRef} />
        <button onClick={this.click}>click</button>
      </div>
    );
  }
}

class Child extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  myName = () => alert("i'm the child method.");

  render() {
    return <div>i'm the child component.</div>;
  }
}

export default Parent;
