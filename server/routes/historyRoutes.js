import express from "express";
import { getLoginHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getLoginHistory);

export default router;