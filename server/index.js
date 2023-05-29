const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { disconnect } = require("process");

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

function disconnectEventHandler(id) {
  console.log(`user ${id} disconnected from the socket server`);
}

io.on("connection", (socket) => {
  console.log(`user ${id} connected to the socket server`);
  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id);
  });
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
