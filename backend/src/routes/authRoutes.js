const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login");
});

router.post("/logout", (req, res) => {
  res.send("Logout");
});

router.get("/signup", (req, res) => {
  res.send("Signup");
});

module.exports = router;
