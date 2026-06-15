import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema({
  userId: String,
  email: String,
  device: String,
  os: String,
  ip: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("LoginHistory", loginHistorySchema);