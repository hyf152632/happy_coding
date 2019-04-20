//组件作为 props
import React from 'react';

const SplitPane = ({ left, right }) => {
  return (
    <div>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

const Contacts = () => <div>Contacts</div>;
const Chat = () => <div>Chat</div>;

const App = () => {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
};
