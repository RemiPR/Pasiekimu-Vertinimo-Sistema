const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  questions: [
    {
      text: String,
      answers: [
        {
          text: String,
          correct: Boolean,
        },
      ],
    },
  ],
  group: String,
  timeLimit: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Test = mongoose.model("test", TestSchema);
