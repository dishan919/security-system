import User from "../models/User.js";
import LoginHistory from "../models/LoginHistory.js";
import Notification from "../models/Notification.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalLogins = await LoginHistory.countDocuments();

    const totalNotifications =
      await Notification.countDocuments();

    const recentLogins = await LoginHistory
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalLogins,
      totalNotifications,
      recentLogins,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};