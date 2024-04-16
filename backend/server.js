const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001; // Fallback to port 3001 if PORT isn't in .env

const authRoutes = require("./routes/auth");
const testsRoute = require("./routes/tests");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // This is your Nuxt.js frontend
    credentials: true,
  })
);
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tests", testsRoute); // All test-related API calls should be in here

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
