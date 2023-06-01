const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  date: { type: Date, required: true }, 
  location: { type: [Number], required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, 
});

module.exports = mongoose.model("event", eventSchema);