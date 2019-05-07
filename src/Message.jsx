import React, { Component } from "react";

class Message extends Component {
  render() {
    const message = this.props.messages;
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default Message;