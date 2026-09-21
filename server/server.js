const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect("mongodb://127.0.0.1:27017/chatapp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

let onlineUsers = [];

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user_online", (username) => {
    if (username && !onlineUsers.includes(username)) {
      onlineUsers.push(username);
    }

    io.emit("online_users", onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// GET ALL MESSAGES
app.get("/api/messages/all", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// SEND MESSAGE
app.post("/api/messages/send", async (req, res) => {
  try {
    const { username, text, avatar, time } = req.body;

    const msg = new Message({
      username,
      text,
      avatar,
      time,
    });

    await msg.save();

    io.emit("receive_message", msg);

    res.status(201).json(msg);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const PORT = 5001;

server.listen(5001, () => {
  console.log(`Server running on port ${PORT}`);
});