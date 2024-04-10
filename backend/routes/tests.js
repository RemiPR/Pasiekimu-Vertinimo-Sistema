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

module.exports = router;
