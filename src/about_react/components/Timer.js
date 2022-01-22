import React, { Component } from "react";

const Timer = class extends Component {
  state = {
    now: new Date().toLocaleTimeString()
  };
  tick = () => {
    this.setState(() => ({
      now: new Date().toLocaleTimeString()
    }));
  };
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { now } = this.state;
    return (
      <div>
        <p>Time now:</p>
        <div>{now}</div>
      </div>
    );
  }
};

export default Timer;
