import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  onNameKeyDown = event => {
    if (event.key == "Enter") {
      var newName = message;
      var oldName = this.state.currentUser;
      this.props.showNotification(event.target.value);
      let message = `${oldName} Changed their name to ${newName}`;
      console.log(message);
      this.setState({ username: event.target.value });
    }
  };

  nameChange = event => {
    this.setState({ username: event.target.value });
  };

  updateContent = event => {
    this.setState({ content: event.target.value });
  };

  onInputKeyDown = event => {
    if (event.key == "Enter") {
      var username = this.state.username;
      this.props.addMessage(event.target.value, username);
      this.setState({ content: "" });
    }
  };

  render() {
    console.log(this);
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.user.name}
          onChange={this.nameChange}
          onKeyDown={this.onNameKeyDown}
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onKeyDown={this.onInputKeyDown}
          onChange={this.updateContent}
        />
      </footer>
    );
  }
}
export default ChatBar;
