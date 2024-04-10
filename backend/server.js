const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const authRoutes = require("./routes/auth");
const Tests = require("./models/Test");

const testsRoute = require("./routes/tests");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use("/api/tests", testsRoute);
app.get("/api/test", (req, res) => {
  Test.find()
    .sort({ date: -1 })
    .then((tests) => res.json(tests));
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
