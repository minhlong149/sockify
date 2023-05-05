const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
