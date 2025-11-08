const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Standard health check endpoint
app.get("/", (req, res) => {
  console.log("Health Check successfull");
  res.send("Welcome!");
});

server.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
