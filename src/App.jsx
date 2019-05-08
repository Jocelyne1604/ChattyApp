import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?"
          },
          {
            id: 2,
            username: "Anonymous",
            content:
              "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      });
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  onNewPost(content, username) {
    this.setState({
      messages: this.state.messages.concat({
        id: this.state.messages.length + 1,
        username: username,
        content: content
      })
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">
              Chatty
            </a>
          </nav>
          <Message messages={this.state.messages} />
          <MessageList messages={this.state.messages} />
          <ChatBar user={this.state.currentUser} onNewPost={this.onNewPost} />
        </div>
      );
    }
  }
}

export default App;
