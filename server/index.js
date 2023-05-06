const express = require("express");
const app = express();

const path = require('path');
app.use(express.static(path.resolve(__dirname, '../app/dist')));

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
