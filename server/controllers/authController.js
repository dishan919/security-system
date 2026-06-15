import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import LoginHistory from "../models/LoginHistory.js";
import { UAParser } from "ua-parser-js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
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

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ==========================
    // DEVICE + OS DETECTION (DAY 7)
    // ==========================
    const parser = new UAParser(req.headers["user-agent"]);

    const browser = parser.getBrowser().name || "Unknown";
    const os = parser.getOS().name || "Unknown";

    // ==========================
    // SAVE LOGIN HISTORY
    // ==========================
    await LoginHistory.create({
      userId: user._id,
      email: user.email,
      device: browser,
      os: os,
      ip: req.ip,
    });

    // response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("❌ ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
  const existingDevice = await LoginHistory.findOne({
  userId: user._id,
  device: req.headers["user-agent"]
});
if (!existingDevice) {
  console.log("NEW DEVICE");
}
if (!existingDevice) {
  await Notification.create({
    userId: user._id,
    message: "New Login Detected"
  });
  
}
if (!existingDevice) {
  await sendEmail(
    user.email,
    "New Login Detected",
    `Device: ${req.headers["user-agent"]}\nTime: ${new Date()}`
  );
}
};