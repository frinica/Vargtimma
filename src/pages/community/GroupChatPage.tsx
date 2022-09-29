import React, { FC } from "react";
import { isConstructorTypeNode } from "typescript";

// Using class component to implement stateful component

class GroupChat extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <div className="chatWindow"></div>;
  }
}
export default GroupChat;
