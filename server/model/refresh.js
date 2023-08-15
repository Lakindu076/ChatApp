const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Refresh = Schema(
  {
    token: { type: String, required: true },
    userId: { type: String, ref: "User" },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Refresh',Refresh);