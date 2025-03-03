// installing express and models
const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/userModel");

app.use(express.json());

// auth routes controllers

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);

  try {
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      fullname,
      email,
      password,
    });

    await newUser.save();

    res.json(newUser);
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = (req, res) => {
  res.send("Login route");
};

const logout = (req, res) => {
  res.send("Logout route");
};

// exporting auth routes controllers
module.exports = {
  signup,
  login,
  logout,
};
