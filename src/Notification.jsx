import React, { Component } from "react";

class Notification extends Component {
  render() {
    return (
      <div className="notification">
        <span className="message-system">
          {this.props.message.oldName} Changed their name to{" "}
          {this.props.message.newName}
        </span>
      </div>
    );
  }
}
export default Notification;
