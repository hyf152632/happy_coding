import React, { useRef, useEffect } from "react";
import Button from "./Button";

function ButtonInner(props) {
  const { wrapperRef } = props;
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.color = "red";
    }
  });
  return <>innerText</>;
}

function CustomButton(props) {
  const btnRef = useRef(null);
  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.fontWeight = "900";
    }
  }, []);
  return (
    <>
      <h1>use forwardRef</h1>
      <Button ref={btnRef}>
        <ButtonInner wrapperRef={btnRef} />
      </Button>
    </>
  );
}

export default CustomButton;
