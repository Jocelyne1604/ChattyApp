import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
    this.nameChange = this.nameChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  nameChange(event) {
    this.setState({ username: event.target.value });
  }

  updateContent(event) {
    this.setState({ content: event.target.value });
  }

  onInputKeyDown(event) {
    if (event.key == "Enter") {
      var username = this.state.username;
      this.props.onNewPost(event.target.value, username);
      this.setState({ content: "" });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.user.name}
          onChange={this.nameChange}
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
