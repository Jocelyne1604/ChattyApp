import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <span className="onlineUser">
            {" "}
            {this.props.onlineUser} user online
          </span>
        </nav>
      </div>
    );
  }
}
export default Navbar;
