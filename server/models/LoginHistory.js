import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema(
  {
    userId: String,
    email: String,
    device: String,
    browser: String,
    os: String,
    ip: String,
    isNewDevice: Boolean,
    
  },
  { timestamps: true }
);

// ✅ FIX (important line)
const LoginHistory =
  mongoose.models.LoginHistory ||
  mongoose.model("LoginHistory", loginHistorySchema);


export default LoginHistory;