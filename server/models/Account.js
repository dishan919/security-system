import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: String,
  platform: String,   // Instagram / Gmail / Facebook
  username: String,
  email: String,
}, { timestamps: true });

export default mongoose.model("Account", accountSchema);