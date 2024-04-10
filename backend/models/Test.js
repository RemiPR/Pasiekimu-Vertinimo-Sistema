// models/Test.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  questions: Number,
  group: String,
  timeLimit: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Test = mongoose.model("test", TestSchema);
