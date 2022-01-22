import React, { Component } from "react";

class Step3 extends Component {
  render() {
    const { email, userName, birthday } = this.props.allValues;
    return (
      <div className="wizard-finish-step">
        <ul>
          <li>
            <label>Email:</label>
            <span>{email}</span>
          </li>
          <li>
            <label>ç¨æ·å:</label>
            <span>{userName}</span>
          </li>
          <li>
            <label>çæ¥:</label>
            <span>{birthday ? birthday.format("MæDæ¥") : ""}</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Step3;
