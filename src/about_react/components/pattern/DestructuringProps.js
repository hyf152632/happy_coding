import React from "react";

const DestructuringProps = ({ name, ...props }) => {
  return (
    <div>
      <div>{name}</div>
      <div {...props}>other props.</div>
    </div>
  );
};

DestructuringProps.defaultProps = {
  name: "destructuringProps",
  style: {
    color: "red"
  }
};

export default DestructuringProps;
