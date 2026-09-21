const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    // Stores the exact time the message was sent
    time: {
      type: String,
      default: () => {
        return new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);