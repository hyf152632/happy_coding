import React from "react";

const SwitchComponent = ({ type }) => {
  const Header = () => <div>header</div>;
  const Side = () => <div>side</div>;
  const Footer = () => <div>footer</div>;
  const DefaultNode = () => <div>default</div>;

  const types = new Map([
    [/header/gi, Header],
    [/side/gi, Side],
    [/footer/gi, Footer],
    [/.*/, DefaultNode]
  ]);
  //array.find return this first match element.
  const getType = type => [...types].find(([key]) => key.test(type));
  const [, Node] = getType(type);
  return (
    <>
      <Node />
    </>
  );
};

SwitchComponent.defaultProps = {
  type: "default"
};

export default SwitchComponent;
