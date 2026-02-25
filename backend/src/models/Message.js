const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatSession",
      required: true
    },
    sender: {
      type: String,
      enum: ["user", "ai"],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    emotion: {
      type: String,
      default: "neutral"
    },
    gesture: {
      type: String,
      default: "idle"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
