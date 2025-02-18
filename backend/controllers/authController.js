// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
// Register new user

const jwtSecret = process.env.JWT_SECRET;
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, userInformation: {} });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, userId: newUser._id, name: newUser.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, isAdmin: user.isAdmin },
      jwtSecret,
      { expiresIn: "1h" }
    );
    res.json({ token, userId: user._id, name: user.name , isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Verify Token
const verifyToken = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // Verify token
    const user = await User.findById(decoded.userId); // Find the user by ID from the token

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userId: user._id, name: user.name, isAdmin: user.isAdmin }); // Return user data
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports = { registerUser, loginUser, verifyToken };
