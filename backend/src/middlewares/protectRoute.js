const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Please login to access this route" });
    }
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: verifyUser.id });
    if (!user) {
      return res.status(400).json({ error: "User not found - Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in protectRoute middleware" });
  }
};

module.exports = { protectRoute };
