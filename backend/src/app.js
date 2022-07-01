const express = require("express");
const path = require("path");

const http = require("http");

const cors = require("cors");
const { Server } = require("socket.io");
// let's create express app

const app = express();
const server = http.createServer(app);

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.warn(`Utilisateur connecté ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.warn(`Utilisateur avec ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.warn(data);
  });

  socket.on("disconnect", () => {
    console.warn("user disconnected", socket.id);
  });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// load router

const router = require("./router");

app.use(router);

// ready to export
module.exports = server;
