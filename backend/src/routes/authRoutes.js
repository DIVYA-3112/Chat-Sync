// express setup
const express = require("express");
const router = express.Router();

// importing auth routes controllers
const { signup, login, logout } = require("../controllers/authController");

// auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

// exporting auth routes
module.exports = router;
