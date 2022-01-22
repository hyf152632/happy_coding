import React, { Component } from "react";
import { throttle } from "./../utils/throttle";
export default class extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = throttle(this.handleMouseMove, 50);
    this.state = {
      offsetX: 30
    };
  }
  counter = 0;
  handleMouseMove = e => {
    // if (e) e.stopPropagation();
    const { pageX } = e;
    const { offsetX } = this.state;
    this.setState({
      offsetX: offsetX + 1
    });
    this.counter++;
    console.log(`------over ${this.counter} -------------`);
  };
  render() {
    const { offsetX } = this.state;
    return (
      <div
        style={{ margin: "50px", textAlign: "center", position: "relative" }}
      >
        <div
          onMouseMove={this.handleMouseMove}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "red",
            position: "absolute",
            left: offsetX + "px"
          }}
        />
      </div>
    );
  }
}
