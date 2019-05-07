import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = { loading: true };
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
    }, 500);
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
          <ChatBar currentUser={this.state.currentUser} />
        </div>
      );
    }
  }
}

export default App;
