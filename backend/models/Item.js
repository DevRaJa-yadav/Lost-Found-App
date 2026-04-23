const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  description: String,
  type: String,
  location: String,
  date: {
    type: Date,
    default: Date.now
  },
  contact: String
});

module.exports = mongoose.model("Item", itemSchema);
