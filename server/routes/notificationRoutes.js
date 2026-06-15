import express from "express";
import Notification from "../models/Notification.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const data = await Notification.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(data);
});

export default router;