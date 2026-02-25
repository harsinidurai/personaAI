const mongoose = require("mongoose");

const ChatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    persona: {
      type: String,
      enum: ["Teacher", "Student", "Friend", "Doctor"],
      default: "Teacher"
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "female"
    },
    title: {
      type: String,
      default: "New Chat"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatSession", ChatSessionSchema);
