// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received email: ", email);
    console.log("Received password: ", password);

    const user = await User.findOne({ email });
    console.log("User found: ", user);

    if (!user) {
      console.log("User not found for email: ", email);
      return res.status(401).send("Invalid email or password");
    }

    // Since passwords are not hashed for debugging, we compare directly
    if (password !== user.password) {
      console.log("Password does not match for user: ", user);
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token created:", token);

    // Setting the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict", // or 'lax' depending on your requirements
      path: "/",
      secure: false, // Should be true in production when using HTTPS
    });

    // You can still send a response back to the client, if needed
    res.status(200).send("Login successful");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
