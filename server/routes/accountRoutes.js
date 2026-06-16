import express from "express";
import { addAccount, getAccounts } from "../controllers/accountController.js";
import { getLoginHistory } from "../controllers/historyController.js";

const router = express.Router();

router.post("/add", addAccount);
router.get("/:userId", getAccounts);
router.get("/:userId", getLoginHistory);
export default router;