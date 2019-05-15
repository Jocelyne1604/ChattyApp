import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./Nav.jsx";
import { WSASERVICE_NOT_FOUND } from "constants";

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      onlineUser: 0,
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: "",
        username: "",
        content: "",
        type: "incomingMessage"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 500);

    var webSocket = new WebSocket("ws://localhost:3001");
    webSocket.onopen = function(event) {
      console.log("Connected to server");
    };

    //Store webSocket in this.socket.
    this.socket = webSocket;

    this.socket.onmessage = event => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.type == "newUserCount") {
        this.setState({
          onlineUser: data.data
        });
        console.log(this.state);
        console.log("test1 " + this.state.onlineUser);
        // console.log("test2" + data);
      }
      // this.setState({
      //   messages: this.state.messages.concat(JSON.parse(event.data))
      // });
      console.log("componentDidMount <App />");
      // this.socket = new WebSocket("ws://localhost:3001");

      this.socket.onopen = event => {
        console.log("Connected to server");
      };

      this.socket.onmessage = event => {
        console.log(event);
        // The socket event data is encoded as a JSON string.
        // This line turns it into an object
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "incomingMessage":
            this.setState({ messages: this.state.messages.concat(data) });
            break;
          case "incomingNotification":
            this.setState({ messages: this.state.messages.concat(data) });
            break;
          case "newUserCount":
            this.setState({
              onlineUser: data.data
            });
            break;
          default:
            this.setState({ error: "error" });
            throw new Error("Unknown event type " + data.type);
        }
      };
    };
  }

  showNotification = message => {
    console.log("im here" + message);
    this.socket.send(
      JSON.stringify({
        type: "postNotification",
        newName: message,
        oldName: this.state.currentUser.name
      })
    );
    this.setState({
      currentUser: { name: message }
    });
  };

  addMessage(content, username) {
    this.socket.send(
      JSON.stringify({
        type: "postMessage",
        username: username || this.state.currentUser.name,
        content: content
      })
    );
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    } else {
      return (
        <div>
          <Navbar onlineUser={this.state.onlineUser} />
          <MessageList messages={this.state.messages} />
          <ChatBar
            user={this.state.currentUser}
            userName={this.state.currentUser.name}
            addMessage={this.addMessage}
            showNotification={this.showNotification}
          />
        </div>
      );
    }
  }
}

export default App;
