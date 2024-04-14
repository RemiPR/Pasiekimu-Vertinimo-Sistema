const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {});

// Define the schema based on the updated model
const TestSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
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
  date: { type: Date, default: Date.now },
});

// Create a Mongoose model
const Test = mongoose.model("test", TestSchema);

// Helper function to generate random test data
const generateTestData = () => {
  const testData = [];
  for (let i = 1; i <= 20; i++) {
    const questions = [];
    for (let j = 1; j <= 5; j++) {
      // Each test will have 5 questions
      const answers = [];
      for (let k = 1; k <= 4; k++) {
        // Each question will have 4 answers
        answers.push({
          text: `Answer ${k} of Question ${j}`,
          correct: k === 1, // Let's say the first answer is always correct
        });
      }
      questions.push({
        text: `What is the answer to Question ${j}?`,
        answers: answers,
      });
    }
    testData.push({
      name: `Test ${i}`,
      url: `http://example.com/test/${i}`,
      questions: questions,
      group: `Group ${((i - 1) % 5) + 1}`, // Group 1 to 5
      timeLimit: `${15 + (i % 2) * 15} min`, // 15 or 30 minutes
      date: new Date(2023, 0, i),
    });
  }
  return testData;
};

// Generate test data
const tests = generateTestData();

// Insert generated tests into the database
Test.insertMany(tests)
  .then(() => {
    console.log("Tests inserted successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error inserting tests:", err);
    mongoose.disconnect();
  });
