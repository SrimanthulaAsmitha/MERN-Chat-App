console.log("MESSAGE ROUTES LOADED");

const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Send message
router.post("/send", async (req, res) => {
  try {
    console.log("Incoming message:", req.body);

    const { username, text, avatar, time } = req.body;

    const newMessage = new Message({
      username,
      text,
      avatar,
      time,
    });

    await newMessage.save();

    // send response
    res.status(201).json(newMessage);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving message");
  }
});

// Get all messages
router.get("/all", async (req, res) => {
  try {
    console.log("GET /all HIT");

    const messages = await Message.find();

    res.json(messages);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching messages");
  }
});

module.exports = router;