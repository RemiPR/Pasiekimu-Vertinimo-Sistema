const express = require("express");
const router = express.Router();

// Load the Test model
const Test = require("../models/Test");

router.get("/", (req, res) => {
  Test.find()
    .sort({ date: -1 }) // Sort tests by date in descending order
    .then((tests) => res.json(tests))
    .catch((err) => res.status(404).json({ notestsfound: "No tests found" }));
});
router.get("/:id", (req, res) => {
  Test.findById(req.params.id)
    .then((test) => {
      if (!test) {
        return res
          .status(404)
          .json({ notestfound: "No test found with that ID" });
      }
      res.json(test);
    })
    .catch((err) =>
      res.status(500).json({ error: "Error fetching test by ID" })
    );
});
router.delete("/:id", (req, res) => {
  Test.findByIdAndDelete(req.params.id)
    .then((test) => {
      if (!test) {
        return res
          .status(404)
          .json({ notestfound: "No test found with that ID" });
      }
      res.json({ success: true });
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.status(500).json({ error: "Internal server error" });
    });
});

// POST endpoint to add a question to a test
router.post("/:testId/questions", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) {
      return res
        .status(404)
        .json({ notestfound: "No test found with that ID" });
    }

    // Push the new question data into the test's questions array
    const newQuestion = test.questions.create({
      text: req.body.text,
      answers: req.body.answers, // Initially, this will be an empty array
    });

    test.questions.push(newQuestion);
    const savedTest = await test.save();

    // Return the newly added question subdocument with its generated _id
    const addedQuestion = savedTest.questions.find((q) =>
      q._id.equals(newQuestion._id)
    );
    if (!addedQuestion) {
      throw new Error("Newly added question not found after save.");
    }
    res.json(addedQuestion);
  } catch (err) {
    console.error("Error on adding question:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE endpoint to remove a question from a test
router.delete("/:testId/questions/:questionId", (req, res) => {
  const { testId, questionId } = req.params;

  Test.findByIdAndUpdate(
    testId,
    { $pull: { questions: { _id: questionId } } }, // Pull the question from the questions array
    { new: true }
  )
    .then((updatedTest) => res.json(updatedTest))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// POST endpoint to add an answer to a specific question in a test
// Assuming questions are subdocuments and not referenced
router.post("/:testId/questions/:questionId/answers", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) {
      return res
        .status(404)
        .json({ notestfound: "No test found with that ID" });
    }

    const question = test.questions.id(req.params.questionId);
    if (!question) {
      return res
        .status(404)
        .json({ noquestionfound: "No question found with that ID" });
    }

    const newAnswer = { text: req.body.text, correct: req.body.correct }; // Ensure the new answer is constructed correctly
    question.answers.push(newAnswer);
    await test.save();

    // Since `question.answers.pop()` might not be reliable, use another method to get the last added answer
    const addedAnswer = question.answers[question.answers.length - 1];
    if (!addedAnswer) {
      return res.status(500).json({ error: "Failed to add new answer" });
    }
    res.json(addedAnswer); // Send back the newly added answer object
  } catch (err) {
    console.error("Error on adding answer:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE endpoint to remove an answer from a question
router.delete(
  "/:testId/questions/:questionId/answers/:answerId",
  (req, res) => {
    const { testId, questionId, answerId } = req.params;

    Test.findById(testId, (err, test) => {
      if (err) {
        console.error("Error finding test:", err);
        return res.status(500).json({ error: err.message });
      }
      if (!test)
        return res
          .status(404)
          .json({ notestfound: "No test found with that ID" });

      const question = test.questions.id(questionId);
      if (!question)
        return res
          .status(404)
          .json({ noquestionfound: "No question found with that ID" });

      question.answers.id(answerId).remove();
      test
        .save()
        .then((updatedTest) => res.json(updatedTest))
        .catch((saveErr) => res.status(500).json({ error: saveErr.message }));
    });
  }
);

// Update question
router.put("/:testId/questions/:questionId", async (req, res) => {
  const { testId, questionId } = req.params;
  const { text, answers } = req.body;

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res
        .status(404)
        .json({ notestfound: "No test found with that ID" });
    }

    const question = test.questions.id(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ noquestionfound: "No question found with that ID" });
    }

    question.text = text;
    question.answers = answers;
    await test.save();

    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update answer
router.put(
  "/:testId/questions/:questionId/answers/:answerId",
  async (req, res) => {
    const { testId, questionId, answerId } = req.params;
    const { text, correct } = req.body; // Destructure the properties directly if they are sent as separate fields

    try {
      const test = await Test.findOne({
        _id: testId,
        "questions._id": questionId,
      });

      if (!test) {
        return res
          .status(404)
          .json({ notestfound: "No test found with that ID" });
      }

      const question = test.questions.id(questionId);
      const answerToUpdate = question.answers.id(answerId);

      if (!answerToUpdate) {
        return res
          .status(404)
          .json({ noanswerfound: "No answer found with that ID" });
      }

      // Update the fields directly
      answerToUpdate.text = text;
      answerToUpdate.correct = correct;

      await test.save(); // Save the whole test document
      res.json(test);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Create completely new test from scratch
router.post("/", async (req, res) => {
  try {
    const newTest = new Test({
      name: req.body.name,
      url: req.body.url,
    });

    const savedTest = await newTest.save();
    console.log("New test created:", savedTest); // Logging the saved test
    res.json(savedTest);
  } catch (err) {
    console.error("Error on creating new test:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
