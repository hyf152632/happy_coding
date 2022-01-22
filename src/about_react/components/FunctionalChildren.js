import React, { Component } from "react";
import { ShowName } from "./pattern/RenderProps";

class FunctionalChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "andy huo"
    };
  }

  render() {
    const { children } = this.props;
    const state = this.state;
    return <div>{children(state)}</div>;
  }
}

const FunctionalChildrenShowName = () => (
  <FunctionalChildren>
    {data => <ShowName name={data.name} />}
  </FunctionalChildren>
);

export default FunctionalChildrenShowName;

// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {index => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
