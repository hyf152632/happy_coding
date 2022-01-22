import React from "react";
const FunctionalWithDefaultProps = ({ name }) => {
  return <div>i'm a functional component and has a defaultProps:{name}</div>;
};

FunctionalWithDefaultProps.defaultProps = {
  name: "andy"
};
export default FunctionalWithDefaultProps;
