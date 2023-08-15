const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = Schema(
  {
    sender: { type: String, required: true },
    reciever: { type: String, required: true },
    msgType: { type: String, required: true },
    msg: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
