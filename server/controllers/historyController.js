import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import LoginHistory from "../models/LoginHistory.js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
// LOGIN USER (SECURITY VERSION)
// ==========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Device info
    const userAgent = req.headers["user-agent"] || "Unknown";
    const ip = req.ip;

    // Check last login
    const lastLogin = await LoginHistory.findOne({ userId: user._id })
      .sort({ createdAt: -1 });

    let isNewDevice = true;

    if (lastLogin && lastLogin.device === userAgent) {
      isNewDevice = false;
    }

    // Save login history
    await LoginHistory.create({
      userId: user._id,
      email: user.email,
      device: userAgent,
      browser: userAgent,
      os: userAgent,
      ip,
      isNewDevice,
    });

    // 🚨 NEW DEVICE ALERT SYSTEM
    if (isNewDevice) {
      await Notification.create({
        userId: user._id,
        message: "🚨 New device login detected",
      });

      await sendEmail(
        user.email,
        "Security Alert 🚨",
        `New login detected from a new device.

Device: ${userAgent}
IP: ${ip}

If this was not you, change your password immediately.`
      );
    }

    // Remove password
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

// ==========================
// GET LOGIN HISTORY
// ==========================
export const getLoginHistory = async (req, res) => {
  try {
    const history = await LoginHistory.find()
      .sort({ createdAt: -1 });

    res.status(200).json(history);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};