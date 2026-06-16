import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  ip: {
    type: String,
  },

  device: {
    type: String, // e.g: "iPhone", "Windows PC"
  },

  browser: {
    type: String, // e.g: "Chrome", "Firefox"
  },

  os: {
    type: String, // e.g: "Windows 11", "Android"
  },

  isNewDevice: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("LoginHistory", loginHistorySchema);