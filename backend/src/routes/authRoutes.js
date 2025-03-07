// express setup
const express = require("express");
const router = express.Router();

// importing auth routes controllers
const { signup, login, logout, updateProfile, checkAuth } = require("../controllers/authController");
const {protectRoute} = require("../middlewares/protectRoute");

// auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.put("/updateProfile", protectRoute, updateProfile);

router.get("/checkAuth",protectRoute, checkAuth);

// exporting auth routes
module.exports = router;
