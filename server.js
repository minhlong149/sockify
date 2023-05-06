require("dotenv").config();

const http = require("http");
const app = require("./app.js");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGINS.split(",")
        : "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
