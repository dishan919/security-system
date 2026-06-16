import Account from "../models/Account.js";

// ➕ Add Account
export const addAccount = async (req, res) => {
  try {
    const { userId, platform, username, email } = req.body;

    const account = await Account.create({
      userId,
      platform,
      username,
      email,
    });

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get Accounts
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({
      userId: req.params.userId,
    });

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};