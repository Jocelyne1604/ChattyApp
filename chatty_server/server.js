// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuidv4 = require("uuid/v4");
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("#", wss.client.size, "people online");
  ws.on("message", function incoming(message) {
    console.log("received: ", message);
    let parsed = JSON.parse(message);
    parsed.id = uuidv4();
    if (parsed.type == "postNotification") {
      parsed.type = "incomingNotification";
    } else {
      parsed.type = "incomingMessage";
    }
    // type = {type: "incomingMessage"};

    wss.clients.forEach(client => {
      let message = JSON.stringify(parsed);
      console.log(message);
      client.send(message);
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => console.log("Client disconnected"));
  console.log("#", wss.client.size, "people online");
});
