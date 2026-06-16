import express from "express";
import LoginHistory from "../models/LoginHistory.js";

const router = express.Router();

// FULL login history
router.get("/history/:email", async (req, res) => {
  const { email } = req.params;

  const history = await LoginHistory.find({ email }).sort({ createdAt: -1 });

  res.json(history);
});

export default router;