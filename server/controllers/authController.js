
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs"; 
import User from "../models/User.js";
 import LoginHistory from "../models/LoginHistory.js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";
import { UAParser } from "ua-parser-js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userAgent = req.headers["user-agent"];
    const ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // ======================
    // FIND USER
    // ======================
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ======================
    // CHECK PASSWORD
    // ======================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ======================
    // DEVICE INFO
    // ======================
    const parser = new UAParser(userAgent);

    const browser = parser.getBrowser().name || "Unknown";
    const os = parser.getOS().name || "Unknown";
    const device = parser.getDevice().type || "desktop";

    // ======================
    // LAST LOGIN CHECK (NEW LOGIC IMPROVED)
    // ======================
    const lastLogin = await LoginHistory.findOne({ userId: user._id })
      .sort({ createdAt: -1 });

    let isNewDevice = true;

    if (lastLogin) {
      const sameBrowser = lastLogin.browser === browser;
      const sameOS = lastLogin.os === os;
      const sameIP = lastLogin.ip === ip;

      if (sameBrowser && sameOS && sameIP) {
        isNewDevice = false;
      }
    }

    // ======================
    // SAVE LOGIN HISTORY
    // ======================
    await LoginHistory.create({
      userId: user._id,
      email: user.email,
      device,
      browser,
      os,
      ip,
      isNewDevice,
    });

    // ======================
    // TOKEN CREATE
    // ======================
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ======================
    // NEW DEVICE ALERT
    // ======================
    if (isNewDevice) {
      console.log("🚨 NEW DEVICE DETECTED");

      await Notification.create({
        userId: user._id,
        message: `New login detected from ${browser} (${os})`,
      });

      await sendEmail(
        user.email,
        "🚨 New Login Detected",
        `Your account was accessed from a new device.

Device: ${device}
Browser: ${browser}
OS: ${os}
IP: ${ip}
Time: ${new Date().toLocaleString()}`
      );
    }

    // ======================
    // RESPONSE
    // ======================
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};