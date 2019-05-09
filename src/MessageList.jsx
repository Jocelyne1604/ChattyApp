import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      if (message.type === "incomingMessage") {
        return (
          <Message
            username={message.username}
            content={message.content}
            key={message.id}
          />
        );
      } else {
        return <Notification key={message.id} message={message} />;
      }
    });

    return <div id="message-list">{messages}</div>;
  }
}
export default MessageList;
