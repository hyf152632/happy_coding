import React from "react";

const SplitPane = ({ left, right }) => {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{left}</div>
      <div className="SplitPane-right">{right}</div>
    </div>
  );
};

const Contacts = () => <div>Contacts</div>;
const Chat = () => <div>Chat</div>;

//use
const App = () => {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
};
