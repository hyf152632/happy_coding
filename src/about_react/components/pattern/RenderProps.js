import React, { Component } from "react";

class NameProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "andy"
    };
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}

export const ShowName = ({ name }) => <div>{name}</div>;

const NameProviderRender = () => (
  <NameProvider render={data => <ShowName name={data.name} />} />
);

export default NameProviderRender;
