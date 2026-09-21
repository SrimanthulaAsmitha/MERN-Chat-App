const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request:", req.body);

    const { email } = req.body;

    // ❌ Prevent duplicate users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User(req.body);
    await user.save();

    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in signup" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("Login request:", req.body);

    const { email, password } = req.body;

    // ❌ better validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in login" });
  }
});

module.exports = router;