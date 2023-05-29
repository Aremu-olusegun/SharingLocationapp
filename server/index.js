const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket");
console.log(server);

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

io.on("connection", (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
