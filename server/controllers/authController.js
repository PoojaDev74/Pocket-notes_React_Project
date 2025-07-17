const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Register new user //
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists //
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password //
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user //
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login user //
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
