import React, { forwardRef } from "react";

const ButtonWithForwardRef = forwardRef((props, ref) => {
  const { children } = props;

  return <button ref={ref}>{children}</button>;
});

export default ButtonWithForwardRef;
