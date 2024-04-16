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

// Assuming your Question and Answer are subdocuments of the Test model
// POST endpoint to add a question to a test
router.post("/:id/questions", (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  Test.findById(id, (err, test) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!test)
      return res
        .status(404)
        .json({ notestfound: "No test found with that ID" });

    test.questions.push(question); // Push the new question into the questions array
    test
      .save()
      .then((updatedTest) => res.json(updatedTest))
      .catch((saveErr) => res.status(500).json({ error: saveErr.message }));
  });
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
router.post("/:testId/questions/:questionId/answers", (req, res) => {
  console.log(req.body);
  const { testId, questionId } = req.params;
  const { answer } = req.body;

  Test.findById(testId, (err, test) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!test)
      return res
        .status(404)
        .json({ notestfound: "No test found with that ID" });

    const question = test.questions.id(questionId);
    if (!question)
      return res
        .status(404)
        .json({ noquestionfound: "No question found with that ID" });

    question.answers.push(answer);
    test
      .save()
      .then((updatedTest) => res.json(updatedTest))
      .catch((saveErr) => res.status(500).json({ error: saveErr.message }));
  });
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

module.exports = router;
