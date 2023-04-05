const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Project"
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    developers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Developers",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developers",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;