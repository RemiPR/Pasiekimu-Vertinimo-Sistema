// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

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
    res.status(200).send({ token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
});

router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: false, // Should be true in production when using HTTPS
    })
    .send("Logout successful");
});

module.exports = router;
