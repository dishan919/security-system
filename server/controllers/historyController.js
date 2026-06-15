import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import LoginHistory from "../models/LoginHistory.js";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// LOGIN USER
// ==========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Save Login History
    await LoginHistory.create({
      userId: user._id,
      email: user.email,
      device: req.headers["user-agent"] || "Unknown",
      os: req.headers["user-agent"] || "Unknown",
      ip: req.ip,
    });

    // Remove password before sending
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      message: "Login successful",
      user: safeUser,
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getLoginHistory = async (req, res) => {
  try {
    const history = await LoginHistory.find();

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};